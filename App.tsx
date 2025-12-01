
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
    <div className="h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black flex flex-col relative overflow-hidden">
      {/* 顶部背景光效 */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

      {/* 导航栏 / 头部 */}
      <header className="flex-none px-6 lg:px-8 py-5 flex justify-between items-center z-20 backdrop-blur-sm bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            GPU Simulator
          </h1>
        </div>

        <div className="flex items-center gap-4">
           <button
            onClick={handleResetCode}
            disabled={isLoading}
            className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors duration-200 px-3 py-1 font-medium disabled:opacity-50"
          >
            Reset Default
          </button>
          <button
            onClick={handleRunScript}
            disabled={isLoading}
            className={`
              relative group overflow-hidden px-5 py-2 lg:px-6 lg:py-2.5 rounded-full font-medium text-white shadow-xl shadow-cyan-900/20 
              transition-all duration-300 ease-out transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
              bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-sm lg:text-base
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Run
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full duration-700 transition-transform -skew-x-12 -translate-x-full ease-out" />
          </button>
        </div>
      </header>

      {/* 主要内容区域 
          修改点：
          1. overflow-hidden -> overflow-y-auto lg:overflow-hidden (移动端允许页面滚动，桌面端固定)
          2. grid-cols-1 lg:grid-cols-2 (移动端上下排列，桌面端左右排列)
      */}
      <main className="flex-grow p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full overflow-y-auto lg:overflow-hidden">
        
        {/* 左侧：代码编辑器 */}
        {/* 修改点：min-h-[500px] 确保在移动端不会被压缩得太小 */}
        <div className="flex flex-col min-h-[500px] lg:h-full fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4 px-2">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Editor</h2>
             </div>
             <div className="flex items-center gap-3">
               <button 
                  onClick={handleResetCode} 
                  className="sm:hidden text-xs text-gray-500 hover:text-white"
                >
                  Reset
               </button>
               <span className="text-xs text-gray-600 font-mono">main.py</span>
             </div>
          </div>
          <div className="flex-grow relative rounded-2xl overflow-hidden bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/5">
            <CodeEditor code={code} onChange={setCode} />
          </div>
        </div>

        {/* 右侧：终端输出 */}
        {/* 修改点：min-h-[500px] */}
        <div className="flex flex-col min-h-[500px] lg:h-full fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Terminal</h2>
            </div>
             <span className="text-xs text-gray-600 font-mono">bash</span>
          </div>
          <div className="flex-grow relative rounded-2xl overflow-hidden bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/5">
            <ConsoleOutput output={output} error={error} />
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default App;
