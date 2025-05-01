import * as pdfjsLib from 'pdfjs-dist';
import { extractImportantWords } from './aiService';
import { ExtractedWord } from '../types/flashcard';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from a PDF file
 * @param file The PDF file to extract text from
 */
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let extractedText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      extractedText += pageText + '\n';
    }

    return extractedText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

/**
 * Extract text from a text file
 * @param file The text file to extract text from
 */
export const extractTextFromTXT = async (file: File): Promise<string> => {
  try {
    const text = await file.text();
    return text;
  } catch (error) {
    console.error('Error extracting text from TXT:', error);
    throw new Error('Failed to extract text from text file');
  }
};

/**
 * Process a file and extract important words
 * @param file The file to process
 */
export const processFile = async (file: File): Promise<ExtractedWord[]> => {
  try {
    let text = '';
    
    if (file.type === 'application/pdf') {
      text = await extractTextFromPDF(file);
    } else if (file.type === 'text/plain') {
      text = await extractTextFromTXT(file);
    } else {
      throw new Error('Unsupported file type');
    }
    
    // Extract important words from the text
    const importantWords = await extractImportantWords(text);
    return importantWords;
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
};

/**
 * Validate file size
 * @param file The file to validate
 * @param maxSizeMB Maximum file size in MB
 */
export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const fileSizeInMB = file.size / (1024 * 1024);
  return fileSizeInMB <= maxSizeMB;
};

/**
 * Validate file type
 * @param file The file to validate
 */
export const validateFileType = (file: File): boolean => {
  return file.type === 'application/pdf' || file.type === 'text/plain';
};