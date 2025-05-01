import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { FlashcardCreateInput, Flashcard } from '../../types/flashcard';
import { translateToPersiansWithDetails } from '../../services/aiService';
import { addFlashcard, getFolders, updateFolderCardCounts } from '../../services/storageService';
import { generateId } from '../../utils/helpers';

interface CreateFlashcardProps {
  onCreated?: (flashcard: Flashcard) => void;
}

const CreateFlashcard: React.FC<CreateFlashcardProps> = ({ onCreated }) => {
  const [swedish, setSwedish] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('default');
  
  const folders = getFolders();
  
  const handleCreate = async () => {
    if (!swedish.trim()) {
      setError('Please enter a Swedish word or phrase');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const translation = await translateToPersiansWithDetails(swedish);
      
      const newFlashcard: Flashcard = {
        id: generateId(),
        swedish: swedish.trim(),
        persian: translation.persian,
        conjugations: translation.conjugations,
        example: translation.example,
        slang: translation.slang,
        createdAt: Date.now(),
        tags: [],
        folder: selectedFolder,
      };
      
      addFlashcard(newFlashcard);
      updateFolderCardCounts();
      
      setSwedish('');
      
      if (onCreated) {
        onCreated(newFlashcard);
      }
    } catch (err) {
      setError('Failed to create flashcard. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Flashcard</h2>
      
      <div className="space-y-4">
        <Input 
          label="Swedish Word or Phrase"
          placeholder="Enter a Swedish word or phrase"
          value={swedish}
          onChange={(e) => setSwedish(e.target.value)}
          icon={<Search className="h-5 w-5 text-gray-400" />}
          error={error}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Folder
          </label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-teal-light focus:border-transparent"
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name} ({folder.cardCount})
              </option>
            ))}
          </select>
        </div>
        
        <Button
          onClick={handleCreate}
          disabled={isLoading || !swedish.trim()}
          className="w-full"
          loading={isLoading}
          icon={isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : undefined}
        >
          Create Flashcard
        </Button>
        
        <p className="text-sm text-gray-500">
          This will use AI to generate a translation and additional information for your flashcard.
        </p>
      </div>
    </div>
  );
};

export default CreateFlashcard;