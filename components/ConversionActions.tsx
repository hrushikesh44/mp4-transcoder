'use client';

import { ConversionProgress } from '@/types/video';
import ProgressBar from './ui/ProgressBar';
import ErrorDisplay from './ui/ErrorDisplay';

interface ConversionActionsProps {
  isConverting: boolean;
  progress: ConversionProgress;
  convertedVideo: string | null;
  error: string | null;
  onConvert: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export default function ConversionActions({
  isConverting,
  progress,
  convertedVideo,
  error,
  onConvert,
  onDownload,
  onReset,
}: ConversionActionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Actions</h3>
      
      <div className="space-y-3">
        <button
          onClick={onConvert}
          disabled={isConverting}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isConverting ? 'Converting...' : 'Convert Video'}
        </button>

        {convertedVideo && (
          <button
            onClick={onDownload}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Download Converted Video
          </button>
        )}

        <button
          onClick={onReset}
          className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Progress Bar */}
      {isConverting && <ProgressBar progress={progress} />}

      {/* Error Display */}
      {error && <ErrorDisplay error={error} />}
    </div>
  );
}