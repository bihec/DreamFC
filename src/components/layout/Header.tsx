import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Settings, BarChart2, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pastel-orange to-pastel-orange-light text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">Swedish Flashcards</h1>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
              )}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/review" 
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
              )}
            >
              Review
            </NavLink>
            <NavLink 
              to="/create" 
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
              )}
            >
              Create
            </NavLink>
            <NavLink 
              to="/stats" 
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
              )}
            >
              Stats
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
              )}
            >
              Settings
            </NavLink>
          </nav>
          
          <div className="md:hidden flex">
            {/* Mobile navigation */}
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-10">
        <div className="flex justify-around">
          <NavLink to="/" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )} end>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink to="/review" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            <BookOpen className="h-6 w-6" />
            <span className="text-xs mt-1">Review</span>
          </NavLink>
          <NavLink to="/create" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span className="text-xs mt-1">Create</span>
          </NavLink>
          <NavLink to="/stats" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            <BarChart2 className="h-6 w-6" />
            <span className="text-xs mt-1">Stats</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;