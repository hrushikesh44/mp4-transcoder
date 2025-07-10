import { ConversionProgress } from "@/types/video";
import { formatTime } from "@/utils/format";

export const ProgressBar = ({ progress }: { progress: ConversionProgress }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-gray-600">
      <span>Progress: {Math.round(progress.ratio * 100)}%</span>
      <span>Time: {formatTime(progress.time)}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-200"
        style={{ width: `${progress.ratio * 100}%` }}
      ></div>
    </div>
  </div>
);