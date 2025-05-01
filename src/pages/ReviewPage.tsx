import React, { useState, useEffect } from 'react';
import { Check, X, List, AlertCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Flashcard from '../components/flashcard/Flashcard';
import Button from '../components/common/Button';
import { 
  getDueFlashcards, 
  updateFlashcard,
  getFolders,
  getFlashcardsByFolder
} from '../services/storageService';
import { calculateNextReview, formatTimeUntilNextReview } from '../utils/srsUtils';
import { Flashcard as FlashcardType } from '../types/flashcard';
import { shuffleArray } from '../utils/helpers';

const ReviewPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dueFlashcards, setDueFlashcards] = useState<FlashcardType[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | 'all'>('all');
  const [isReviewing, setIsReviewing] = useState(false);
  const [hasMoreCards, setHasMoreCards] = useState(true);
  const [reviewComplete, setReviewComplete] = useState(false);
  
  const folders = getFolders();
  
  useEffect(() => {
    loadFlashcards();
  }, [selectedFolder]);
  
  const loadFlashcards = () => {
    let cards: FlashcardType[] = [];
    
    if (selectedFolder === 'all') {
      cards = getDueFlashcards();
    } else {
      cards = getFlashcardsByFolder(selectedFolder).filter(
        card => !card.nextReview || card.nextReview <= Date.now()
      );
    }
    
    if (cards.length > 0) {
      setDueFlashcards(shuffleArray(cards));
      setCurrentIndex(0);
      setIsReviewing(true);
      setHasMoreCards(true);
      setReviewComplete(false);
    } else {
      setDueFlashcards([]);
      setIsReviewing(false);
      setHasMoreCards(false);
    }
  };
  
  const handleReview = (flashcard: FlashcardType, quality: number) => {
    const updatedFlashcard = calculateNextReview(flashcard, quality);
    updateFlashcard(updatedFlashcard);
    
    if (currentIndex < dueFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setReviewComplete(true);
      setIsReviewing(false);
    }
  };
  
  const handleRestartReview = () => {
    loadFlashcards();
  };
  
  const handleFolderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFolder(event.target.value);
  };
  
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Review Flashcards</h1>
          
          <div className="flex items-center">
            <select
              value={selectedFolder}
              onChange={handleFolderChange}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-teal-light focus:border-transparent"
            >
              <option value="all">All Folders</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name} ({folder.cardCount})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {isReviewing && dueFlashcards.length > 0 && (
          <div>
            <div className="mb-4 text-center">
              <p className="text-gray-500">
                Card {currentIndex + 1} of {dueFlashcards.length}
              </p>
            </div>
            
            <Flashcard
              flashcard={dueFlashcards[currentIndex]}
              onReview={handleReview}
            />
            
            <div className="mt-4 text-center">
              <p className="text-gray-500">
                {dueFlashcards.length - currentIndex - 1} cards remaining
              </p>
            </div>
          </div>
        )}
        
        {!isReviewing && reviewComplete && (
          <div className="text-center bg-pistachio bg-opacity-10 border border-pistachio rounded-lg p-8">
            <Check className="h-12 w-12 text-pistachio mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Review Complete!</h2>
            <p className="text-gray-600 mb-6">
              You've reviewed all the due flashcards in this set.
            </p>
            <Button onClick={handleRestartReview}>
              Check for More Cards
            </Button>
          </div>
        )}
        
        {!isReviewing && !reviewComplete && dueFlashcards.length === 0 && (
          <div className="text-center bg-gray-50 p-8 rounded-lg border border-gray-200">
            <AlertCircle className="h-12 w-12 text-pastel-orange mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Cards Due</h2>
            <p className="text-gray-600 mb-6">
              There are no flashcards due for review in this folder.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="secondary" onClick={handleRestartReview}>
                Check Again
              </Button>
              <a href="/create">
                <Button>
                  Create New Flashcards
                </Button>
              </a>
            </div>
          </div>
        )}
        
        {folders.length > 0 && dueFlashcards.length === 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">All Folders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {folders.map((folder) => {
                const folderCards = getFlashcardsByFolder(folder.id);
                const dueCount = folderCards.filter(
                  card => !card.nextReview || card.nextReview <= Date.now()
                ).length;
                
                return (
                  <div key={folder.id} className="card p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{folder.name}</h3>
                      <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                        {dueCount} / {folder.cardCount}
                      </span>
                    </div>
                    <button
                      className="mt-2 text-pastel-teal text-sm hover:underline"
                      onClick={() => {
                        setSelectedFolder(folder.id);
                        loadFlashcards();
                      }}
                    >
                      Review this folder
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReviewPage;