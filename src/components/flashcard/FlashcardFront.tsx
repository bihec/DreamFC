import React from 'react';
import { Flashcard } from '../../types/flashcard';
import { formatDate } from '../../utils/helpers';

interface FlashcardFrontProps {
  flashcard: Flashcard;
}

const FlashcardFront: React.FC<FlashcardFrontProps> = ({ flashcard }) => {
  return (
    <div className="flashcard-front">
      <div className="flex flex-col items-center justify-center h-full w-full text-center px-4 py-6">
        <div className="absolute top-3 left-3 text-xs text-gray-400">
          {formatDate(flashcard.createdAt)}
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          {flashcard.swedish}
        </h2>
      </div>
    </div>
  );
};

export default FlashcardFront;
