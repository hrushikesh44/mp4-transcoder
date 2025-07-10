import { CustomSettings, QualityPreset } from '@/types/video';

export const buildFFmpegCommand = (
  inputName: string,
  outputName: string,
  outputFormat: string,
  quality: QualityPreset,
  customSettings: CustomSettings
): string[] => {
  const args = ['-i', inputName];
  
  // Add custom resolution if specified
  if (customSettings.width && customSettings.height) {
    args.push('-s', `${customSettings.width}x${customSettings.height}`);
  }
  
  // Add custom frame rate if specified
  if (customSettings.fps) {
    args.push('-r', customSettings.fps);
  }
  
  // Add quality settings
  if (outputFormat === 'mp4') {
    args.push('-c:v', 'libx264', '-crf', quality.crf, '-preset', 'medium');
  } else if (outputFormat === 'webm') {
    args.push('-c:v', 'libvpx-vp9', '-b:v', quality.bitrate, '-c:a', 'libopus');
  } else {
    args.push('-b:v', quality.bitrate);
  }
  
  // Add custom arguments if specified
  if (customSettings.customArgs) {
    args.push(...customSettings.customArgs.split(' ').filter(arg => arg.trim()));
  }
  
  args.push(outputName);
  return args;
};