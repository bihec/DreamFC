import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, BookOpen, Upload, Sparkles } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { getFlashcards, getFolders } from '../services/storageService';
import { getFlashcardStats } from '../utils/srsUtils';

const HomePage: React.FC = () => {
  const flashcards = getFlashcards();
  const folders = getFolders();
  const stats = getFlashcardStats(flashcards);
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Learn Swedish with AI
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create and study flashcards powered by AI. Master Swedish vocabulary with our smart spaced repetition system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {stats.total}
            </h2>
            <p className="text-gray-600">Total Flashcards</p>
          </div>
          
          <div className="card text-center p-6">
            <h2 className="text-2xl font-bold text-pastel-teal mb-2">
              {stats.due}
            </h2>
            <p className="text-gray-600">Due for Review</p>
          </div>
          
          <div className="card text-center p-6">
            <h2 className="text-2xl font-bold text-pastel-orange mb-2">
              {folders.length}
            </h2>
            <p className="text-gray-600">Folders</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link to="/create" className="block">
            <div className="card p-6 hover:transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-pastel-teal-light rounded-full mr-4">
                  <PlusCircle className="h-6 w-6 text-pastel-teal" />
                </div>
                <h3 className="text-xl font-semibold">Create Flashcard</h3>
              </div>
              <p className="text-gray-600">
                Create a new flashcard with a Swedish word or phrase.
              </p>
            </div>
          </Link>
          
          <Link to="/review" className="block">
            <div className="card p-6 hover:transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-pastel-orange-light rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-pastel-orange" />
                </div>
                <h3 className="text-xl font-semibold">Review Flashcards</h3>
              </div>
              <p className="text-gray-600">
                Review your flashcards using our spaced repetition system.
              </p>
            </div>
          </Link>
          
          <Link to="/create?tab=file" className="block">
            <div className="card p-6 hover:transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-pistachio-light rounded-full mr-4">
                  <Upload className="h-6 w-6 text-pistachio" />
                </div>
                <h3 className="text-xl font-semibold">Upload File</h3>
              </div>
              <p className="text-gray-600">
                Extract important words from a text file or PDF.
              </p>
            </div>
          </Link>
          
          <Link to="/create?tab=prompt" className="block">
            <div className="card p-6 hover:transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-indigo-100 rounded-full mr-4">
                  <Sparkles className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold">Generate Words</h3>
              </div>
              <p className="text-gray-600">
                Generate flashcards using a Persian prompt.
              </p>
            </div>
          </Link>
        </div>
        
        {flashcards.length > 0 ? (
          <div className="text-center">
            <Link to="/review">
              <Button size="lg">
                Start Reviewing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="text-center bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">No Flashcards Yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first flashcard to start learning Swedish!
            </p>
            <Link to="/create">
              <Button size="lg">
                Create Your First Flashcard
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;