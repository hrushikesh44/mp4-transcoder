export interface ConversionProgress {
  ratio: number;
  time: number;
}

export interface SupportedFormat {
  extension: string;
  name: string;
  mime: string;
}

export interface QualityPreset {
  name: string;
  crf: string;
  bitrate: string;
}

export interface CustomSettings {
  width: string;
  height: string;
  fps: string;
  customArgs: string;
}