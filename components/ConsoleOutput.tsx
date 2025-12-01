
import React from 'react';

interface ConsoleOutputProps {
  output: string;
  error: string | null;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ output, error }) => {
  return (
    <div className="h-full w-full bg-black text-sm p-4 overflow-auto font-mono">
      {error ? (
        <pre className="text-red-500 whitespace-pre-wrap">{error}</pre>
      ) : (
        <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
      )}
    </div>
  );
};
