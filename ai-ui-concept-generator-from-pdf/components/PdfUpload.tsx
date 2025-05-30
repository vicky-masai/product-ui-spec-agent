
import React, { useRef, useState } from 'react';
import { MAX_FILE_SIZE_MB } from '../constants';

interface PdfUploadProps {
  onFileChange: (file: File | null) => void;
  disabled: boolean;
  currentFile: File | null;
}

export const PdfUpload: React.FC<PdfUploadProps> = ({ onFileChange, disabled, currentFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  React.useEffect(() => {
    setFileName(currentFile ? currentFile.name : null);
  }, [currentFile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    } else {
      onFileChange(null); // Clears if selection is cancelled
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;

    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
        ref={fileInputRef}
        disabled={disabled}
      />
      <div 
        className={`w-full p-6 border-2 border-dashed border-slate-600 hover:border-primary-500 rounded-lg text-center cursor-pointer transition-colors duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && handleButtonClick()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-slate-500 mb-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <p className="text-slate-400">
          Drag & drop a PDF here, or click to select.
        </p>
        <p className="text-xs text-slate-500 mt-1">Max file size: ${MAX_FILE_SIZE_MB}MB</p>
      </div>
      {fileName && (
        <div className="text-sm text-slate-300 bg-slate-700 p-3 rounded-md flex justify-between items-center">
          <span>Selected: <span className="font-semibold">{fileName}</span></span>
           <button 
            onClick={() => { onFileChange(null); setFileName(null); if(fileInputRef.current) fileInputRef.current.value = ''; }} 
            disabled={disabled}
            className="text-red-400 hover:text-red-300 text-xs"
            aria-label="Remove file"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
    