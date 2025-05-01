export interface Flashcard {
  id: string;
  swedish: string;
  persian: string;
  createdAt: number;
  lastReviewed?: number;
  nextReview?: number;
  interval?: number;
  easeFactor?: number;
  conjugations?: {
    present?: string;
    past?: string;
    future?: string;
  };
  example?: {
    swedish: string;
    persian: string;
  };
  slang?: string;
  tags: string[];
  folder: string;
}

export type FlashcardCreateInput = Omit<Flashcard, 'id' | 'createdAt' | 'lastReviewed' | 'nextReview' | 'interval' | 'easeFactor'>;

export interface FlashcardFolder {
  id: string;
  name: string;
  createdAt: number;
  cardCount: number;
}

export interface SRSSettings {
  initialInterval: number; // in hours
  easyInterval: number; // multiplier
  hardInterval: number; // multiplier
  defaultEaseFactor: number;
}

export interface AppSettings {
  apiKey: string;
  fileSizeLimit: number; // in MB
  srs: SRSSettings;
  theme: 'light' | 'dark';
}

export interface AITranslationResponse {
  persian: string;
  conjugations?: {
    present?: string;
    past?: string;
    future?: string;
  };
  example?: {
    swedish: string;
    persian: string;
  };
  slang?: string;
}

export interface ExtractedWord {
  word: string;
  importance: number;
}