import React, { useState } from 'react';
import { Sparkles, Check, RotateCcw, X, Loader2 } from 'lucide-react';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { generateSwedishWords, translateToPersiansWithDetails } from '../../services/aiService';
import { 
  addFlashcard, 
  getFolders,
  addFolder,
  updateFolderCardCounts 
} from '../../services/storageService';
import { Flashcard } from '../../types/flashcard';
import { generateId } from '../../utils/helpers';

interface PromptFormProps {
  onComplete?: (folderName: string, count: number) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ onComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [folderName, setFolderName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [step, setStep] = useState<'prompt' | 'review' | 'process'>('prompt');
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setIsGenerating(true);
    setError('');
    
    try {
      const words = await generateSwedishWords(prompt);
      setGeneratedWords(words);
      setFolderName(prompt.length > 20 ? `${prompt.slice(0, 20)}...` : prompt);
      setStep('review');
    } catch (err) {
      setError('Failed to generate words. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCreateFlashcards = async () => {
    setIsCreating(true);
    setError('');
    setStep('process');
    
    try {
      // Create a new folder
      const folderId = generateId();
      const newFolder = {
        id: folderId,
        name: folderName || 'Generated Words',
        createdAt: Date.now(),
        cardCount: 0,
      };
      
      addFolder(newFolder);
      
      // Create flashcards for each word
      let completedCount = 0;
      
      for (const word of generatedWords) {
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
          setProcessingProgress(Math.round((completedCount / generatedWords.length) * 100));
        } catch (err) {
          console.error(`Error processing word "${word}":`, err);
          // Continue with the next word if one fails
        }
      }
      
      updateFolderCardCounts();
      
      if (onComplete) {
        onComplete(folderName, generatedWords.length);
      }
      
      // Reset the component
      setPrompt('');
      setFolderName('');
      setGeneratedWords([]);
      setStep('prompt');
    } catch (err) {
      setError('Failed to create flashcards. Please try again.');
      console.error(err);
    } finally {
      setIsCreating(false);
      setProcessingProgress(0);
    }
  };
  
  const handleRegenerate = () => {
    setStep('prompt');
    setGeneratedWords([]);
  };
  
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Generate Words with AI</h2>
      
      {step === 'prompt' && (
        <>
          <div className="space-y-4">
            <TextArea
              label="Prompt"
              placeholder="کلماتی را یادم بده که در مورد غذا باشد"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              error={error}
            />
            
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full"
              loading={isGenerating}
              icon={<Sparkles className="h-5 w-5" />}
            >
              Generate Words
            </Button>
            
            <p className="text-sm text-gray-500">
              Enter a prompt in Persian describing what kind of Swedish words you want to learn.
              The AI will generate a list of relevant words.
            </p>
          </div>
        </>
      )}
      
      {step === 'review' && (
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
              Generated Words ({generatedWords.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {generatedWords.map((word) => (
                <div
                  key={word}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
          
          {error && <p className="text-fiery-red text-sm mt-2">{error}</p>}
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setStep('prompt')}
              className="flex-1"
              icon={<X className="h-5 w-5" />}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={handleRegenerate}
              className="flex-1"
              icon={<RotateCcw className="h-5 w-5" />}
            >
              Regenerate
            </Button>
            <Button
              onClick={handleCreateFlashcards}
              className="flex-1"
              icon={<Check className="h-5 w-5" />}
            >
              Confirm
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

export default PromptForm;