import React, { useState, useRef } from 'react';
import { UploadCloud, File, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import { FlashcardCreateInput, Flashcard, ExtractedWord } from '../../types/flashcard';
import { 
  translateToPersiansWithDetails 
} from '../../services/aiService';
import { 
  addFlashcard, 
  getFolders, 
  addFolder,
  updateFolderCardCounts,
  getSettings
} from '../../services/storageService';
import { 
  processFile, 
  validateFileSize, 
  validateFileType 
} from '../../services/fileService';
import { generateId } from '../../utils/helpers';

interface FileUploadProps {
  onComplete?: (folderName: string, count: number) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [extractedWords, setExtractedWords] = useState<ExtractedWord[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'upload' | 'select' | 'process'>('upload');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const settings = getSettings();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!validateFileType(selectedFile)) {
        setError('Only .txt and .pdf files are supported.');
        return;
      }
      
      // Validate file size
      if (!validateFileSize(selectedFile, settings.fileSizeLimit)) {
        setError(`File size exceeds the limit of ${settings.fileSizeLimit} MB.`);
        return;
      }
      
      setFile(selectedFile);
      setFolderName(selectedFile.name.split('.')[0]);
      setError('');
    }
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError('');
    
    try {
      // Process the file and extract important words
      const words = await processFile(file);
      setExtractedWords(words);
      setSelectedWords(words.map(w => w.word));
      setStep('select');
    } catch (err) {
      setError('Failed to process file. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleToggleWord = (word: string) => {
    setSelectedWords(prev => 
      prev.includes(word)
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };
  
  const handleCreateFlashcards = async () => {
    if (selectedWords.length === 0) {
      setError('Please select at least one word.');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    setStep('process');
    
    try {
      // Create a new folder
      const folderId = generateId();
      const newFolder = {
        id: folderId,
        name: folderName || 'Extracted Words',
        createdAt: Date.now(),
        cardCount: 0,
      };
      
      addFolder(newFolder);
      
      // Create flashcards for each selected word
      let completedCount = 0;
      
      for (const word of selectedWords) {
        try {
          const translation = await translateToPersiansWithDetails(word);
          
          const newFlashcard: Flashcard = {
            id: generateId(),
            swedish: word,
            persian: translation.persian,
            conjugations: translation.conjugations,
            example: translation.example,
            slang: translation.slang,
            createdAt: Date.now(),
            tags: [],
            folder: folderId,
          };
          
          addFlashcard(newFlashcard);
          
          // Update progress
          completedCount++;
          setProcessingProgress(Math.round((completedCount / selectedWords.length) * 100));
        } catch (err) {
          console.error(`Error processing word "${word}":`, err);
          // Continue with the next word if one fails
        }
      }
      
      updateFolderCardCounts();
      
      if (onComplete) {
        onComplete(folderName, selectedWords.length);
      }
      
      // Reset the component
      setFile(null);
      setExtractedWords([]);
      setSelectedWords([]);
      setFolderName('');
      setStep('upload');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to create flashcards. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };
  
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Upload File</h2>
      
      {step === 'upload' && (
        <>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pastel-teal transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            
            {file ? (
              <div className="flex flex-col items-center">
                <File className="h-12 w-12 text-pastel-teal mb-2" />
                <p className="text-lg font-medium text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-lg font-medium text-gray-700">Click to upload a file</p>
                <p className="text-sm text-gray-500">
                  .txt or .pdf files, max {settings.fileSizeLimit} MB
                </p>
              </div>
            )}
          </div>
          
          {error && <p className="text-fiery-red text-sm mt-2">{error}</p>}
          
          <div className="mt-4">
            <Button
              onClick={handleUpload}
              disabled={!file || isProcessing}
              className="w-full"
              loading={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Extract Words'}
            </Button>
          </div>
        </>
      )}
      
      {step === 'select' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-teal-light focus:border-transparent"
              placeholder="Enter folder name"
            />
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">
              Selected Words ({selectedWords.length}/{extractedWords.length})
            </h3>
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
              <div className="flex flex-wrap gap-2">
                {extractedWords.map((item) => (
                  <div
                    key={item.word}
                    className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                      selectedWords.includes(item.word)
                        ? 'bg-pastel-teal text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleToggleWord(item.word)}
                  >
                    {item.word}
                    <span className="ml-1 opacity-60">
                      ({item.importance})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {error && <p className="text-fiery-red text-sm mt-2">{error}</p>}
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFile(null);
                setExtractedWords([]);
                setSelectedWords([]);
                setStep('upload');
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFlashcards}
              disabled={selectedWords.length === 0 || isProcessing}
              className="flex-1"
              loading={isProcessing}
            >
              Create Flashcards
            </Button>
          </div>
        </>
      )}
      
      {step === 'process' && (
        <div className="text-center py-8">
          <Loader2 className="h-12 w-12 text-pastel-teal animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Creating Flashcards...
          </h3>
          <p className="text-gray-500 mb-4">
            This may take a moment as we generate translations and details for each word.
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-pastel-teal h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${processingProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {processingProgress}% complete
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;