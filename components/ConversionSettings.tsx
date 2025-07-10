
import { QUALITY_PRESETS, VIDEO_FORMATS } from "@/constants/video";
import { CustomSettings, QualityPreset } from "@/types/video";
import { Settings } from "lucide-react";

export const ConversionSettings = ({
  outputFormat,
  quality,
  customSettings,
  onFormatChange,
  onQualityChange,
  onCustomSettingsChange,
}: {
  outputFormat: string;
  quality: QualityPreset;
  customSettings: CustomSettings;
  onFormatChange: (format: string) => void;
  onQualityChange: (quality: QualityPreset) => void;
  onCustomSettingsChange: (settings: CustomSettings) => void;
}) => {
  const handleCustomSettingChange = (key: keyof CustomSettings, value: string) => {
    onCustomSettingsChange({
      ...customSettings,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h3 className="text-lg font-semibold text-gray-800">Conversion Settings</h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Output Format
        </label>
        <select
          value={outputFormat}
          onChange={(e) => onFormatChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {VIDEO_FORMATS.map(format => (
            <option key={format.extension} value={format.extension}>
              {format.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quality Preset
        </label>
        <select
          value={quality.name}
          onChange={(e) => {
            const selectedQuality = QUALITY_PRESETS.find(q => q.name === e.target.value);
            if (selectedQuality) onQualityChange(selectedQuality);
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {QUALITY_PRESETS.map(preset => (
            <option key={preset.name} value={preset.name}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width
          </label>
          <input
            type="number"
            value={customSettings.width}
            onChange={(e) => handleCustomSettingChange('width', e.target.value)}
            placeholder="1920"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height
          </label>
          <input
            type="number"
            value={customSettings.height}
            onChange={(e) => handleCustomSettingChange('height', e.target.value)}
            placeholder="1080"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Frame Rate (FPS)
        </label>
        <input
          type="number"
          value={customSettings.fps}
          onChange={(e) => handleCustomSettingChange('fps', e.target.value)}
          placeholder="30"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom FFmpeg Arguments
        </label>
        <input
          type="text"
          value={customSettings.customArgs}
          onChange={(e) => handleCustomSettingChange('customArgs', e.target.value)}
          placeholder="-filter:v scale=1280:720"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}