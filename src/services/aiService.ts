import { GoogleGenerativeAI } from '@google/generative-ai';
import { AITranslationResponse, ExtractedWord } from '../types/flashcard';
import { getSettings } from './storageService';

// Initialize the Google Generative AI with the API key
const getGeminiAI = () => {
  const settings = getSettings();
  return new GoogleGenerativeAI(settings.apiKey);
};

/**
 * Translate a Swedish word/phrase to Persian and get additional information
 * @param swedishText The Swedish text to translate
 */
export const translateToPersiansWithDetails = async (swedishText: string): Promise<AITranslationResponse> => {
  try {
    const genAI = getGeminiAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Translate the following Swedish word/phrase to Persian and provide additional details.
      
      Word/Phrase: "${swedishText}"
      
      Return the result in the following JSON format:
      {
        "persian": "Persian translation",
        "conjugations": {
          "present": "Present tense conjugation (if it's a verb)",
          "past": "Past tense conjugation (if it's a verb)",
          "future": "Future tense conjugation (if it's a verb)"
        },
        "example": {
          "swedish": "An example sentence in Swedish using the word",
          "persian": "Translation of the example sentence in Persian"
        },
        "slang": "Slang version if available"
      }
      
      Only include the conjugations if the word is a verb. If any field is not applicable, omit it from the JSON.
      Return ONLY the JSON, nothing else.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    // Find JSON in the text (it might be wrapped in backticks or other markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Unable to parse AI response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]) as AITranslationResponse;
    return parsed;
    
  } catch (error) {
    console.error('Error translating text:', error);
    
    // Return a basic response in case of error
    return {
      persian: 'Translation error. Please try again.',
    };
  }
};

/**
 * Extract important words from a text
 * @param text The text to analyze
 * @param count Number of words to extract
 */
export const extractImportantWords = async (text: string, count: number = 12): Promise<ExtractedWord[]> => {
  try {
    const genAI = getGeminiAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      Analyze the following Swedish text and extract the ${count} most important and difficult words 
      that would be valuable for a language learner to know. Focus on words that are:
      1. Frequently used in the text but may be challenging
      2. Unique or specialized vocabulary
      3. Essential for understanding the context
      
      Text:
      "${text.slice(0, 4000)}" // Limit text length
      
      Return the results in JSON format:
      [
        {"word": "word1", "importance": 5},
        {"word": "word2", "importance": 4}
      ]
      
      The importance should be a number between 1-5, with 5 being most important.
      Return ONLY the JSON, nothing else.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Parse the JSON response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Unable to parse AI response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]) as ExtractedWord[];
    return parsed;
    
  } catch (error) {
    console.error('Error extracting important words:', error);
    return [];
  }
};

/**
 * Generate Swedish words based on a Persian prompt
 * @param prompt The Persian prompt describing what kind of words to generate
 * @param count Number of words to generate
 */
export const generateSwedishWords = async (prompt: string, count: number = 12): Promise<string[]> => {
  try {
    const genAI = getGeminiAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const aiPrompt = `
      Based on the following Persian prompt, generate ${count} Swedish words or phrases that match the description.
      
      Persian prompt: "${prompt}"
      
      Return the results in a JSON array format:
      ["word1", "word2", "word3", ...]
      
      Return ONLY the JSON array, nothing else.
    `;
    
    const result = await model.generateContent(aiPrompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Parse the JSON response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Unable to parse AI response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]) as string[];
    return parsed;
    
  } catch (error) {
    console.error('Error generating Swedish words:', error);
    return [];
  }
};