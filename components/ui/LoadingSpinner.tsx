import { AlertCircle } from "lucide-react";

export const LoadingSpinner = ({ loadError, onRetry }: { loadError?: string | null; onRetry?: () => void }) => {
  if (loadError) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4 max-w-md mx-auto">
          <AlertCircle className="w-6 h-6 mx-auto mb-2" />
          <h3 className="font-medium mb-2">Failed to Load FFmpeg</h3>
          <p className="text-sm mb-4">{loadError}</p>
          <p className="text-xs text-red-600 mb-4">
            This might be due to network issues or browser security settings. 
            Please ensure you're using HTTPS and try refreshing the page.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Retry Loading
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading FFmpeg...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a moment on first load</p>
    </div>
  );
}
