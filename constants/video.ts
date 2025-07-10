import { QualityPreset, SupportedFormat } from "@/types/video";

export const VIDEO_FORMATS: SupportedFormat[] = [
  { extension: 'mp4', name: 'MP4 (H.264)', mime: 'video/mp4' },
  { extension: 'webm', name: 'WebM', mime: 'video/webm' },
  { extension: 'avi', name: 'AVI', mime: 'video/avi' },
  { extension: 'mov', name: 'MOV (QuickTime)', mime: 'video/quicktime' },
  { extension: 'mkv', name: 'MKV (Matroska)', mime: 'video/x-matroska' },
  { extension: 'wmv', name: 'WMV', mime: 'video/x-ms-wmv' },
  { extension: 'flv', name: 'FLV (Flash Video)', mime: 'video/x-flv' },
  { extension: '3gp', name: '3GP', mime: 'video/3gpp' },
  { extension: 'ogv', name: 'OGV (Ogg Video)', mime: 'video/ogg' },
  { extension: 'm4v', name: 'M4V', mime: 'video/x-m4v' },
];

export const QUALITY_PRESETS: QualityPreset[] = [
  { name: 'High Quality', crf: '18', bitrate: '5000k' },
  { name: 'Medium Quality', crf: '23', bitrate: '2500k' },
  { name: 'Low Quality', crf: '28', bitrate: '1000k' },
  { name: 'Very Low Quality', crf: '32', bitrate: '500k' },
];