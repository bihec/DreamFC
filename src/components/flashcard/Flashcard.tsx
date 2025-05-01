import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Flashcard as FlashcardType } from '../../types/flashcard';
import FlashcardFront from './FlashcardFront';
import FlashcardBack from './FlashcardBack';

interface FlashcardProps {
  flashcard: FlashcardType;
  onReview?: (flashcard: FlashcardType, quality: number) => void;
  showControls?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  flashcard,
  onReview,
  showControls = true,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleReview = (quality: number) => {
    if (onReview) {
      onReview(flashcard, quality);
      setFlipped(false); // Reset to front after review
    }
  };

  return (
    <div className="my-6 flex flex-col items-center">
      <div
        className={cn(
          'flashcard preserve-3d cursor-pointer',
          flipped ? 'flipped' : ''
        )}
        onClick={handleFlip}
      >
        {flipped ? (
          <div className="flashcard-back">
            <FlashcardBack flashcard={flashcard} />
          </div>
        ) : (
          <div className="flashcard-front">
            <FlashcardFront flashcard={flashcard} />
          </div>
        )}
      </div>

      {showControls && flipped && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="btn bg-fiery-red text-white hover:bg-fiery-red-dark px-6 py-3 rounded-full shadow-md transition-transform duration-200 hover:scale-105"
            onClick={() => handleReview(0)}
          >
            Review Again
          </button>
          <button
            className="btn bg-pistachio text-white hover:bg-pistachio-dark px-6 py-3 rounded-full shadow-md transition-transform duration-200 hover:scale-105"
            onClick={() => handleReview(1)}
          >
            I Know This
          </button>
        </div>
      )}

      <div className="text-center mt-4 text-gray-500 text-sm">
        Click the card to flip
      </div>
    </div>
  );
};

export default Flashcard;