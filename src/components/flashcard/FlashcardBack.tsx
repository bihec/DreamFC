import React from 'react';
import { Flashcard } from '../../types/flashcard';

interface FlashcardBackProps {
  flashcard: Flashcard;
}

const FlashcardBack: React.FC<FlashcardBackProps> = ({ flashcard }) => {
  return (
    <div className="flashcard-back">
      <div className="flex flex-col h-full w-full overflow-auto items-center justify-center text-center px-4 py-6">
        <h3 className="text-2xl font-bold mb-3 text-gray-800">
          {flashcard.persian}
        </h3>

        {flashcard.example && (
          <div className="text-sm text-gray-700 mt-4">
            <p className="italic mb-2">
              <span className="font-semibold">مثال سوئدی:</span><br />
              {flashcard.example.swedish}
            </p>
            <p>
              <span className="font-semibold">ترجمه فارسی:</span><br />
              {flashcard.example.persian}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardBack;
