export const ConversionLogs = ({ logs }: { logs: string[] }) => {
  if (logs.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversion Logs</h3>
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg max-h-60 overflow-y-auto font-mono text-sm">
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};