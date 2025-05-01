import { Flashcard, SRSSettings } from '../types/flashcard';
import { getSettings } from '../services/storageService';

/**
 * Calculate the next review date for a flashcard
 * @param flashcard The flashcard to calculate for
 * @param responseQuality 0 = again/hard, 1 = good/easy
 */
export const calculateNextReview = (
  flashcard: Flashcard,
  responseQuality: number
): Flashcard => {
  const settings = getSettings();
  const { srs } = settings;
  
  // Initialize properties if this is the first review
  const interval = flashcard.interval || srs.initialInterval;
  const easeFactor = flashcard.easeFactor || srs.defaultEaseFactor;
  
  // Calculate new interval based on response quality
  let newInterval: number;
  let newEaseFactor = easeFactor;
  
  if (responseQuality === 0) {
    // Hard response - shorter interval
    newInterval = interval * srs.hardInterval;
    newEaseFactor = Math.max(1.3, easeFactor - 0.15); // Reduce ease but not below 1.3
  } else {
    // Easy response - longer interval
    newInterval = interval * srs.easyInterval;
    newEaseFactor = easeFactor + 0.1; // Increase ease slightly
  }
  
  // Convert hours to milliseconds for the next review date
  const nextReviewDate = Date.now() + newInterval * 60 * 60 * 1000;
  
  return {
    ...flashcard,
    lastReviewed: Date.now(),
    nextReview: nextReviewDate,
    interval: newInterval,
    easeFactor: newEaseFactor,
  };
};

/**
 * Format time until next review in a human-readable format
 * @param nextReview Timestamp of next review
 */
export const formatTimeUntilNextReview = (nextReview?: number): string => {
  if (!nextReview) return 'Never reviewed';
  
  const now = Date.now();
  
  if (nextReview <= now) {
    return 'Due now';
  }
  
  const diffInMs = nextReview - now;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return `In ${Math.round(diffInHours)} hours`;
  } else {
    const diffInDays = diffInHours / 24;
    return `In ${Math.round(diffInDays)} days`;
  }
};

/**
 * Get the statistics for the flashcard collection
 * @param flashcards Array of flashcards
 */
export const getFlashcardStats = (flashcards: Flashcard[]) => {
  const now = Date.now();
  const dueCount = flashcards.filter(fc => !fc.nextReview || fc.nextReview <= now).length;
  const totalCount = flashcards.length;
  const learnedCount = flashcards.filter(fc => fc.lastReviewed).length;
  
  return {
    total: totalCount,
    due: dueCount,
    learned: learnedCount,
    completion: totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0,
  };
};