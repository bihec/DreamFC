import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { getSettings, saveSettings } from '../../services/storageService';
import { AppSettings } from '../../types/flashcard';

const SettingsForm: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(getSettings());
  const [isSaved, setIsSaved] = useState(false);
  
  const handleChange = (field: keyof AppSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSRSChange = (field: keyof AppSettings['srs'], value: any) => {
    setSettings(prev => ({
      ...prev,
      srs: {
        ...prev.srs,
        [field]: value,
      },
    }));
  };
  
  const handleSave = () => {
    saveSettings(settings);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };
  
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">API Settings</h3>
          <Input
            label="Gemini API Key"
            value={settings.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}
            placeholder="Enter your Gemini API key"
            type="password"
          />
          <p className="text-sm text-gray-500 mt-1">
            Default key: AIzaSyD8nfl1K-SNaPO-dkGh2c7XIZLCxwBLsqE
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">File Upload Settings</h3>
          <div className="flex items-center">
            <Input
              label="Maximum File Size (MB)"
              type="number"
              min={1}
              max={100}
              value={settings.fileSizeLimit}
              onChange={(e) => handleChange('fileSizeLimit', Number(e.target.value))}
            />
            <span className="ml-2 pt-6">MB</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Spaced Repetition Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Initial Interval (hours)"
                type="number"
                min={1}
                value={settings.srs.initialInterval}
                onChange={(e) => handleSRSChange('initialInterval', Number(e.target.value))}
              />
              <p className="text-sm text-gray-500 mt-1">
                How long to wait before the first review
              </p>
            </div>
            
            <div>
              <Input
                label="Easy Interval Multiplier"
                type="number"
                min={1}
                step={0.1}
                value={settings.srs.easyInterval}
                onChange={(e) => handleSRSChange('easyInterval', Number(e.target.value))}
              />
              <p className="text-sm text-gray-500 mt-1">
                Multiplier for "I Know This" responses
              </p>
            </div>
            
            <div>
              <Input
                label="Hard Interval Multiplier"
                type="number"
                min={0.1}
                max={1}
                step={0.1}
                value={settings.srs.hardInterval}
                onChange={(e) => handleSRSChange('hardInterval', Number(e.target.value))}
              />
              <p className="text-sm text-gray-500 mt-1">
                Multiplier for "Review Again" responses
              </p>
            </div>
            
            <div>
              <Input
                label="Default Ease Factor"
                type="number"
                min={1.3}
                step={0.1}
                value={settings.srs.defaultEaseFactor}
                onChange={(e) => handleSRSChange('defaultEaseFactor', Number(e.target.value))}
              />
              <p className="text-sm text-gray-500 mt-1">
                Base ease factor for new flashcards
              </p>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleSave}
          className="w-full"
          icon={<Save className="h-5 w-5" />}
        >
          {isSaved ? 'Settings Saved!' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsForm;