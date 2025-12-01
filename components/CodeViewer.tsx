
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
    <div className="h-full w-full bg-gray-800 text-sm overflow-auto">
      <textarea
        value={code}
        onChange={handleChange}
        className="h-full w-full bg-transparent text-gray-300 font-mono p-4 resize-none border-none focus:outline-none"
        aria-label="Python code editor"
        spellCheck="false"
      />
    </div>
  );
};
