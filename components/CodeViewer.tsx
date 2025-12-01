
import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="h-full w-full bg-[#1e1e1e] flex text-sm">
      {/* 假的行号栏 - 纯装饰 */}
      <div className="hidden sm:flex flex-col items-end gap-[2px] py-6 px-3 bg-[#1e1e1e] text-gray-600 border-r border-white/5 font-mono select-none text-xs">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
        <div className="opacity-30">...</div>
      </div>

      {/* 编辑区域 */}
      <div className="flex-grow h-full relative group">
        <textarea
          value={code}
          onChange={handleChange}
          className="h-full w-full bg-transparent text-gray-300 font-['JetBrains_Mono'] p-6 leading-relaxed resize-none border-none focus:outline-none selection:bg-blue-500/30 selection:text-blue-100 overflow-auto"
          aria-label="Python code editor"
          spellCheck="false"
          style={{ tabSize: 4 }}
        />
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             <span className="text-xs text-gray-500 bg-black/50 px-2 py-1 rounded">Python</span>
        </div>
      </div>
    </div>
  );
};
