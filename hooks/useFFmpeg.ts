'use client';

import { useState, useEffect, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { ConversionProgress } from '@/types/video';

export const useFFmpeg = () => {
  const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<ConversionProgress>({ ratio: 0, time: 0 });

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const ffmpegInstance = new FFmpeg();
      
      ffmpegInstance.on('log', ({ message }) => {
        setLogs(prev => [...prev.slice(-50), message]);
      });

      ffmpegInstance.on('progress', ({ progress, time }) => {
        setProgress({
          ratio: progress,
          time: time / 1000000, // Convert to seconds
        });
      });

      // Try multiple CDN sources
      const cdnSources = [
        'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm',
        'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm',
        'https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm',
      ];

      let loaded = false;
      let lastError = null;

      for (const baseURL of cdnSources) {
        try {
          console.log(`Attempting to load FFmpeg from: ${baseURL}`);
          
          await ffmpegInstance.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
          });
          
          loaded = true;
          console.log(`Successfully loaded FFmpeg from: ${baseURL}`);
          break;
        } catch (err) {
          lastError = err;
          console.warn(`Failed to load from ${baseURL}:`, err);
          continue;
        }
      }

      if (!loaded) {
        throw lastError || new Error('Failed to load from all CDN sources');
      }

      setFfmpeg(ffmpegInstance);
      setLoaded(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('FFmpeg loading error:', err);
      setLoadError(`Failed to load FFmpeg: ${errorMessage}`);
    }
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ ratio: 0, time: 0 });
    setLogs([]);
  }, []);

  const retry = useCallback(() => {
    setLoaded(false);
    setLoadError(null);
    load();
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  return { ffmpeg, loaded, loadError, logs, progress, resetProgress, retry };
};