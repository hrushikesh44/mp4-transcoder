import { Play } from "lucide-react";
import { useRef } from "react";

export const VideoPreview = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Play className="w-5 h-5" />
        <h3 className="text-lg font-semibold text-gray-800">Converted Video Preview</h3>
      </div>
      <video
        ref={videoRef}
        src={src}
        controls
        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
      />
    </div>
  );
};