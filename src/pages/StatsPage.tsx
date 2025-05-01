import React from 'react';
import { Clock, CheckCircle, BarChart2, BookOpen } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { getFlashcards, getFolders } from '../services/storageService';
import { formatDate } from '../utils/helpers';

const StatsPage: React.FC = () => {
  const flashcards = getFlashcards();
  const folders = getFolders();
  
  // Calculate stats
  const totalCards = flashcards.length;
  const reviewedCards = flashcards.filter(card => card.lastReviewed).length;
  const reviewPercentage = totalCards > 0 ? Math.round((reviewedCards / totalCards) * 100) : 0;
  
  // Get the date of the oldest card
  const oldestCard = flashcards.length > 0 
    ? flashcards.reduce((oldest, current) => 
        current.createdAt < oldest.createdAt ? current : oldest
      ) 
    : null;
  
  // Get the date of the most recently created card
  const newestCard = flashcards.length > 0 
    ? flashcards.reduce((newest, current) => 
        current.createdAt > newest.createdAt ? current : newest
      ) 
    : null;
  
  // Calculate cards by folder
  const cardsByFolder = folders.map(folder => {
    const folderCards = flashcards.filter(card => card.folder === folder.id);
    const reviewedFolderCards = folderCards.filter(card => card.lastReviewed);
    const folderCompletionPercentage = folderCards.length > 0 
      ? Math.round((reviewedFolderCards.length / folderCards.length) * 100) 
      : 0;
    
    return {
      folder,
      count: folderCards.length,
      reviewedCount: reviewedFolderCards.length,
      completionPercentage: folderCompletionPercentage,
    };
  });
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-pastel-teal-light rounded-full mr-4">
                <BookOpen className="h-6 w-6 text-pastel-teal" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{totalCards}</h3>
                <p className="text-gray-600">Total Flashcards</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-pastel-orange-light rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-pastel-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{reviewedCards}</h3>
                <p className="text-gray-600">Reviewed Cards</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-pistachio-light rounded-full mr-4">
                <BarChart2 className="h-6 w-6 text-pistachio" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{reviewPercentage}%</h3>
                <p className="text-gray-600">Completion Rate</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-full mr-4">
                <Clock className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{folders.length}</h3>
                <p className="text-gray-600">Folders</p>
              </div>
            </div>
          </div>
        </div>
        
        {totalCards > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Overall Progress
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {reviewPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-pastel-teal h-2.5 rounded-full" 
                    style={{ width: `${reviewPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="mb-1">
                  First card created: {oldestCard ? formatDate(oldestCard.createdAt) : 'N/A'}
                </p>
                <p>
                  Most recent card: {newestCard ? formatDate(newestCard.createdAt) : 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Card Distribution</h2>
              <div className="space-y-4">
                {cardsByFolder.filter(item => item.count > 0).map((item) => (
                  <div key={item.folder.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {item.folder.name}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {item.reviewedCount}/{item.count}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-pastel-orange h-2.5 rounded-full" 
                        style={{ width: `${item.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {totalCards === 0 && (
          <div className="text-center bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">No Statistics Available</h2>
            <p className="text-gray-600 mb-6">
              Create some flashcards to see your statistics.
            </p>
            <a href="/create" className="btn btn-primary">
              Create Your First Flashcard
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StatsPage;