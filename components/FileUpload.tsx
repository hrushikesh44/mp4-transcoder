import { formatFileSize } from "@/utils/format";
import { Upload } from "lucide-react";
import { useRef } from "react";

export const FileUpload = ({ selectedFile, onFileSelect }: { selectedFile: File | null; onFileSelect: (file: File | null) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <button
        onClick={() => fileInputRef.current?.click()}
        className= "text-white px-6 py-3 rounded-lg bg-gradient-to-tr from-purple-600 via-purple-400 to-pink-400  font-medium hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        Select Video File
      </button>
      <p className="text-sm text-gray-500 mt-2">Or drag and drop a video file here</p>
      {selectedFile && (
        <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <p className="font-medium">{selectedFile.name}</p>
          <p>Size: {formatFileSize(selectedFile.size)}</p>
          <p>Type: {selectedFile.type}</p>
        </div>
      )}
    </div>
  );
};
