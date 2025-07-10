'use client'
import { QUALITY_PRESETS, VIDEO_FORMATS } from "@/constants/video";
import { ConversionProgress, CustomSettings, QualityPreset } from "@/types/video";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { FileUpload } from "./FileUpload";
import { ConversionSettings } from "./ConversionSettings";
import { Download, Play, RotateCcw } from "lucide-react";
import { ProgressBar } from "./ui/ProgressBar";
import { ErrorDisplay } from "./ui/ErrorDisplay";
import { VideoPreview } from "./VideoPreview";
import { ConversionLogs } from "./ui/ConversionLogs";

export default function VideoTranscoder() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [quality, setQuality] = useState<QualityPreset>(QUALITY_PRESETS[1]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedVideo, setConvertedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<ConversionProgress>({ ratio: 0, time: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [customSettings, setCustomSettings] = useState<CustomSettings>({
    width: '',
    height: '',
    fps: '',
    customArgs: '',
  });

  // FFmpeg instance
  const ffmpegRef = useRef<FFmpeg | null>(null);

  // Load FFmpeg
  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;

        // Set up progress listener
        ffmpeg.on('progress', ({ progress: progressRatio, time }) => {
          setProgress({
            ratio: progressRatio / 100,
            time: time / 1000000 // Convert from microseconds to seconds
          });
        });

        // Set up log listener
        ffmpeg.on('log', ({ message }) => {
          setLogs(prev => [...prev, message]);
        });

        // Load FFmpeg core
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });

        setFfmpegLoaded(true);
      } catch (err) {
        console.error('Failed to load FFmpeg:', err);
        setLoadError(`Failed to load FFmpeg: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    loadFFmpeg();
  }, []);

  const handleFileSelect = useCallback((file: File | null) => {
    setSelectedFile(file);
    setConvertedVideo(null);
    setError(null);
    setProgress({ ratio: 0, time: 0 });
  }, []);

  const convertVideo = useCallback(async () => {
    if (!selectedFile || !ffmpegRef.current) return;

    const ffmpeg = ffmpegRef.current;
    setIsConverting(true);
    setError(null);
    setProgress({ ratio: 0, time: 0 });
    setLogs([]);

    try {
      // Get input file extension
      const inputExtension = selectedFile.name.split('.').pop() || 'mp4';
      const inputFileName = `input.${inputExtension}`;
      const outputFileName = `output.${outputFormat}`;

      // Write input file to FFmpeg file system
      setLogs(['Loading input file...']);
      await ffmpeg.writeFile(inputFileName, await fetchFile(selectedFile));

      // Build FFmpeg command
      const args = ['-i', inputFileName];

      // Add custom resolution if specified
      if (customSettings.width && customSettings.height) {
        args.push('-s', `${customSettings.width}x${customSettings.height}`);
      }

      // Add frame rate if specified
      if (customSettings.fps) {
        args.push('-r', customSettings.fps);
      }

      // Add quality settings based on output format
      if (outputFormat === 'mp4' || outputFormat === 'mov' || outputFormat === 'm4v') {
        args.push('-c:v', 'libx264');
        args.push('-crf', quality.crf);
        args.push('-preset', 'medium');
      } else if (outputFormat === 'webm') {
        args.push('-c:v', 'libvpx-vp9');
        args.push('-b:v', quality.bitrate);
      } else if (outputFormat === 'avi') {
        args.push('-c:v', 'libx264');
        args.push('-b:v', quality.bitrate);
      }

      // Add custom arguments if specified
      if (customSettings.customArgs) {
        const customArgs = customSettings.customArgs.split(' ').filter(arg => arg.length > 0);
        args.push(...customArgs);
      }

      // Add output file
      args.push(outputFileName);

      setLogs(prev => [...prev, `Starting conversion with command: ffmpeg ${args.join(' ')}`]);

      // Execute FFmpeg command
      await ffmpeg.exec(args);

      // Read the output file
      const outputData = await ffmpeg.readFile(outputFileName);
      //@ts-ignore
      const outputBlob = new Blob([outputData], { 
        type: VIDEO_FORMATS.find(f => f.extension === outputFormat)?.mime || 'video/mp4' 
      });
      const outputUrl = URL.createObjectURL(outputBlob);

      setConvertedVideo(outputUrl);
      setLogs(prev => [...prev, 'Conversion completed successfully!']);

      // Clean up files from FFmpeg file system
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);

    } catch (err) {
      console.error('Conversion error:', err);
      setError(`Conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsConverting(false);
    }
  }, [selectedFile, outputFormat, quality, customSettings]);

  const downloadVideo = useCallback(() => {
    if (!convertedVideo || !selectedFile) return;

    const a = document.createElement('a');
    a.href = convertedVideo;
    a.download = `${selectedFile.name.split('.')[0]}_converted.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [convertedVideo, selectedFile, outputFormat]);

  const resetAll = useCallback(() => {
    setSelectedFile(null);
    if (convertedVideo) {
      URL.revokeObjectURL(convertedVideo);
    }
    setConvertedVideo(null);
    setError(null);
    setProgress({ ratio: 0, time: 0 });
    setLogs([]);
    setCustomSettings({ width: '', height: '', fps: '', customArgs: '' });
  }, [convertedVideo]);

  const retryLoad = useCallback(() => {
    setLoadError(null);
    setFfmpegLoaded(false);
    // Reload the component to retry FFmpeg loading
    window.location.reload();
  }, []);

  if (!ffmpegLoaded) {
    return (
      <div className="min-h-screen bg-[#fefefe] p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Video Transcoder</h1>
              <p className="text-gray-600">Convert any video format to any other format</p>
            </div>
            <LoadingSpinner loadError={loadError} onRetry={retryLoad} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Video Transcoder</h1>
            <p className="text-gray-600">Convert any video format to any other format</p>
          </div>
          
          <div className="space-y-6">
            <FileUpload
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
            />

            {selectedFile && (
              <div className="grid md:grid-cols-2 gap-6">
                <ConversionSettings
                  outputFormat={outputFormat}
                  quality={quality}
                  customSettings={customSettings}
                  onFormatChange={setOutputFormat}
                  onQualityChange={setQuality}
                  onCustomSettingsChange={setCustomSettings}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Actions</h3>
                  
                  <div className="space-y-3">
                    <button
                      onClick={convertVideo}
                      disabled={isConverting}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {isConverting ? 'Converting...' : 'Convert Video'}
                    </button>

                    {convertedVideo && (
                      <button
                        onClick={downloadVideo}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Converted Video
                      </button>
                    )}

                    <button
                      onClick={resetAll}
                      className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset All
                    </button>
                  </div>

                  {isConverting && <ProgressBar progress={progress} />}
                  {error && <ErrorDisplay error={error} />}
                </div>
              </div>
            )}

            {convertedVideo && (
              <VideoPreview src={convertedVideo} />
            )}

            <ConversionLogs logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}