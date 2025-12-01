
import React, { useEffect, useRef } from 'react';

interface ConsoleOutputProps {
  output: string;
  error: string | null;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ output, error }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, error]);

  return (
    <div className="flex flex-col h-full w-full bg-black/90 backdrop-blur">
      {/* 仿 macOS 窗口头部 */}
      <div className="flex-none h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors shadow-sm"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors shadow-sm"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 transition-colors shadow-sm"></div>
        <div className="flex-grow text-center text-xs text-gray-500 font-medium opacity-50 select-none">
          user@gpu-server:~
        </div>
      </div>

      {/* 内容区域 */}
      <div 
        ref={scrollRef}
        className="flex-grow w-full p-6 pb-10 overflow-auto font-mono text-sm leading-relaxed scroll-smooth"
      >
        {output === 'Click "Run Script" to simulate execution...' && !error ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-3 opacity-60">
            <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Ready to run simulation.</p>
          </div>
        ) : (
          <div className="animate-pulse-quick">
            {error ? (
              <pre className="text-red-400 whitespace-pre-wrap font-['JetBrains_Mono']">{error}</pre>
            ) : (
              <pre className="text-emerald-400 whitespace-pre-wrap font-['JetBrains_Mono'] shadow-green-500/10 drop-shadow-sm">
                {output}
                <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse align-middle"></span>
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
