
import React, { useState, useCallback } from 'react';
import { PdfUpload } from './components/PdfUpload';
import { UiDisplay } from './components/UiDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateUiIdeasFromPdf } from './services/geminiService';
import type { GeneratedUiOutput } from './types';
import { MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES } from './constants';

const App: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<GeneratedUiOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  React.useEffect(() => {
    if (!process.env.API_KEY) {
      setApiKeyError(`API Key is not configured. Please ensure the API_KEY environment variable is set. AI-powered generation will not be available. For development, you might need to set this in a .env file or your deployment configuration.`);
    }
  }, []);

  const handleFileChange = useCallback((file: File | null) => {
    setError(null);
    setGeneratedOutput(null);
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`);
        setPdfFile(null);
        return;
      }
      if (file.type !== "application/pdf") {
        setError("Invalid file type. Please upload a PDF file.");
        setPdfFile(null);
        return;
      }
    }
    setPdfFile(file);
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Content = result.split(',')[1];
        if (base64Content) {
          resolve(base64Content);
        } else {
          reject(new Error("Failed to extract base64 content from file."));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerateConcepts = useCallback(async () => {
    if (!pdfFile) {
      setError("Please upload a PDF file first.");
      return;
    }

    if (!process.env.API_KEY) {
      setError("API Key is not configured. Cannot proceed with generation.");
       setApiKeyError(`API Key is not configured. Please ensure the API_KEY environment variable is set. AI-powered generation will not be available.`);
      return;
    }
    setApiKeyError(null); 

    setIsLoading(true);
    setError(null);
    setGeneratedOutput(null);

    try {
      const pdfBase64 = await fileToBase64(pdfFile);
      const result = await generateUiIdeasFromPdf(pdfBase64, pdfFile.name, setLoadingMessage);
      setGeneratedOutput(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during UI design specification and image generation.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [pdfFile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-pink-500 to-orange-500">
          AI UI Design Spec Generator
        </h1>
        <p className="text-slate-300 mt-2 text-lg">
          Upload product docs (PDF) for AI-generated UI design specifications, preview images & Figma guidance.
        </p>
      </header>

      {apiKeyError && !process.env.API_KEY && (
         <div className="w-full max-w-2xl mb-6 p-4 bg-red-800 border border-red-700 rounded-lg text-white" role="alert">
            <h3 className="font-bold text-lg mb-2">Configuration Error</h3>
            <p>{apiKeyError}</p>
         </div>
      )}

      <main className="w-full max-w-2xl bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 space-y-6">
        <PdfUpload onFileChange={handleFileChange} disabled={isLoading} currentFile={pdfFile} />

        {error && <ErrorMessage message={error} />}

        <button
          onClick={handleGenerateConcepts}
          disabled={!pdfFile || isLoading || !!apiKeyError}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              {loadingMessage || 'Generating...'}
            </>
          ) : (
            "✨ Generate Design Specs, Images & Tips"
          )}
        </button>

        {generatedOutput && !isLoading && (
          <UiDisplay webUi={generatedOutput.webApp} mobileUi={generatedOutput.mobileApp} />
        )}
      </main>
      
      <footer className="w-full max-w-4xl text-center mt-12 text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} AI UI Design Spec Generator. Powered by Gemini.</p>
        <p className="text-xs mt-1">Figma is a trademark of Figma, Inc. This tool provides AI-generated suggestions for Figma design and is not affiliated with Figma, Inc. Images are AI-generated previews.</p>
      </footer>
    </div>
  );
};

export default App;
