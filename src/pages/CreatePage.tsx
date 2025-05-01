import React, { useState } from 'react';
import { PlusCircle, Upload, Sparkles } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CreateFlashcard from '../components/flashcard/CreateFlashcard';
import FileUpload from '../components/fileUpload/FileUpload';
import PromptForm from '../components/promptGeneration/PromptForm';

const CreatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'file' | 'prompt'>('single');
  const [success, setSuccess] = useState<{ message: string; count?: number } | null>(null);
  
  const handleSuccess = (message: string, count?: number) => {
    setSuccess({ message, count });
    
    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  };
  
  const handleFolderCreated = (folderName: string, count: number) => {
    handleSuccess(`Created ${count} flashcards in folder "${folderName}"`, count);
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create Flashcards</h1>
        
        {success && (
          <div className="bg-pistachio bg-opacity-20 border border-pistachio rounded-lg p-4 mb-6">
            <p className="text-green-800">
              {success.message}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
              activeTab === 'single'
                ? 'bg-pastel-teal text-white'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('single')}
          >
            <PlusCircle className="h-6 w-6 mb-2" />
            <span>Single Word</span>
          </button>
          
          <button
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
              activeTab === 'file'
                ? 'bg-pastel-teal text-white'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('file')}
          >
            <Upload className="h-6 w-6 mb-2" />
            <span>File Upload</span>
          </button>
          
          <button
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
              activeTab === 'prompt'
                ? 'bg-pastel-teal text-white'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('prompt')}
          >
            <Sparkles className="h-6 w-6 mb-2" />
            <span>Generate</span>
          </button>
        </div>
        
        {activeTab === 'single' && (
          <CreateFlashcard 
            onCreated={() => handleSuccess('Flashcard created successfully!')}
          />
        )}
        
        {activeTab === 'file' && (
          <FileUpload onComplete={handleFolderCreated} />
        )}
        
        {activeTab === 'prompt' && (
          <PromptForm onComplete={handleFolderCreated} />
        )}
      </div>
    </Layout>
  );
};

export default CreatePage;