import { Flashcard, FlashcardFolder, AppSettings } from '../types/flashcard';

const FLASHCARDS_KEY = 'swedish-flashcards';
const FOLDERS_KEY = 'swedish-flashcard-folders';
const SETTINGS_KEY = 'swedish-flashcard-settings';

// Default settings
const defaultSettings: AppSettings = {
  apiKey: 'AIzaSyD8nfl1K-SNaPO-dkGh2c7XIZLCxwBLsqE', // Default Gemini API key
  fileSizeLimit: 10, // 10 MB
  srs: {
    initialInterval: 24, // 24 hours
    easyInterval: 2.5, // 2.5x
    hardInterval: 0.5, // 0.5x
    defaultEaseFactor: 2.5,
  },
  theme: 'light',
};

// Get all flashcards
export const getFlashcards = (): Flashcard[] => {
  const flashcardsJSON = localStorage.getItem(FLASHCARDS_KEY);
  return flashcardsJSON ? JSON.parse(flashcardsJSON) : [];
};

// Save flashcards
export const saveFlashcards = (flashcards: Flashcard[]): void => {
  localStorage.setItem(FLASHCARDS_KEY, JSON.stringify(flashcards));
};

// Add a new flashcard
export const addFlashcard = (flashcard: Flashcard): void => {
  const flashcards = getFlashcards();
  flashcards.push(flashcard);
  saveFlashcards(flashcards);
};

// Update a flashcard
export const updateFlashcard = (updatedFlashcard: Flashcard): void => {
  const flashcards = getFlashcards();
  const index = flashcards.findIndex(fc => fc.id === updatedFlashcard.id);
  
  if (index !== -1) {
    flashcards[index] = updatedFlashcard;
    saveFlashcards(flashcards);
  }
};

// Delete a flashcard
export const deleteFlashcard = (id: string): void => {
  const flashcards = getFlashcards();
  const updatedFlashcards = flashcards.filter(fc => fc.id !== id);
  saveFlashcards(updatedFlashcards);
};

// Get flashcards due for review
export const getDueFlashcards = (): Flashcard[] => {
  const flashcards = getFlashcards();
  const now = Date.now();
  return flashcards.filter(fc => !fc.nextReview || fc.nextReview <= now);
};

// Get flashcards by folder
export const getFlashcardsByFolder = (folderId: string): Flashcard[] => {
  const flashcards = getFlashcards();
  return flashcards.filter(fc => fc.folder === folderId);
};

// Get all folders
export const getFolders = (): FlashcardFolder[] => {
  const foldersJSON = localStorage.getItem(FOLDERS_KEY);
  const folders = foldersJSON ? JSON.parse(foldersJSON) : [];
  
  // If no folders exist, create a default one
  if (folders.length === 0) {
    const defaultFolder: FlashcardFolder = {
      id: 'default',
      name: 'My Flashcards',
      createdAt: Date.now(),
      cardCount: 0,
    };
    return [defaultFolder];
  }
  
  return folders;
};

// Save folders
export const saveFolders = (folders: FlashcardFolder[]): void => {
  localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
};

// Add a new folder
export const addFolder = (folder: FlashcardFolder): void => {
  const folders = getFolders();
  folders.push(folder);
  saveFolders(folders);
};

// Update folder
export const updateFolder = (updatedFolder: FlashcardFolder): void => {
  const folders = getFolders();
  const index = folders.findIndex(f => f.id === updatedFolder.id);
  
  if (index !== -1) {
    folders[index] = updatedFolder;
    saveFolders(folders);
  }
};

// Delete folder
export const deleteFolder = (id: string): void => {
  const folders = getFolders();
  const updatedFolders = folders.filter(f => f.id !== id);
  saveFolders(updatedFolders);
  
  // Move flashcards to default folder
  const flashcards = getFlashcards();
  const updatedFlashcards = flashcards.map(fc => {
    if (fc.folder === id) {
      return { ...fc, folder: 'default' };
    }
    return fc;
  });
  
  saveFlashcards(updatedFlashcards);
};

// Get app settings
export const getSettings = (): AppSettings => {
  const settingsJSON = localStorage.getItem(SETTINGS_KEY);
  return settingsJSON ? JSON.parse(settingsJSON) : defaultSettings;
};

// Save app settings
export const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Update folder card counts
export const updateFolderCardCounts = (): void => {
  const folders = getFolders();
  const flashcards = getFlashcards();
  
  const updatedFolders = folders.map(folder => {
    const count = flashcards.filter(fc => fc.folder === folder.id).length;
    return { ...folder, cardCount: count };
  });
  
  saveFolders(updatedFolders);
};