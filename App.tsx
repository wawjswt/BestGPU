
import React, { useState, useCallback } from 'react';
import { CodeEditor } from './components/CodeViewer';
import { ConsoleOutput } from './components/ConsoleOutput';
import { simulatePythonExecution } from './services/geminiService';
import { DEFAULT_PYTHON_CODE } from './constants';

const App: React.FC = () => {
  const [output, setOutput] = useState<string>('Click "Run Script" to simulate execution...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>(DEFAULT_PYTHON_CODE);

  const handleRunScript = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const result = await simulatePythonExecution(code);
      setOutput(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Simulation failed: ${errorMessage}`);
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  }, [code]);
  
  const handleResetCode = useCallback(() => {
    setCode(DEFAULT_PYTHON_CODE);
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
            Python GPU Script Simulator
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleResetCode}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            >
              Reset Code
            </button>
            <button
              onClick={handleRunScript}
              disabled={isLoading}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 flex items-center w-40 justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running...
                </>
              ) : (
                'Run Script'
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3 text-gray-400">Python Script (Editable)</h2>
          <div className="flex-grow bg-gray-800 rounded-lg shadow-inner overflow-hidden border border-gray-700">
            <CodeEditor code={code} onChange={setCode} />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3 text-gray-400">Simulated Console Output</h2>
          <div className="flex-grow bg-black rounded-lg shadow-inner overflow-hidden border border-gray-700">
            <ConsoleOutput output={output} error={error} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
