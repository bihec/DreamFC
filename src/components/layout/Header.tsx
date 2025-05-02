import React from 'react';
import { NavLink } from 'react-router-dom';
// Importing necessary icons from lucide-react
import { BookOpen, Settings, BarChart2, Home, LogIn, UserPlus } from 'lucide-react'; // UserPlus icon for Sign Up
// Importing the utility function for conditional class names
import { cn } from '../../utils/cn'; // Path to your cn utility

// Importing the logo image
// Please ensure logo.png exists at src/assets/logo.png
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pastel-orange to-pastel-orange-light text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        {/* Flex container for header content, centered horizontally */}
        <div className="flex items-center justify-center">
          {/* Logo and App Title group */}
          <div className="flex items-center space-x-2">
            {/* Displaying the logo image */}
            <img src={logo} alt="Dream Flashcards Logo" className="h-6 w-6 rounded-full" />
            {/* App Title */}
            <h1 className="text-xl font-bold">Dream Flashcards</h1>
          </div>

          {/* Desktop Navigation (hidden on small screens) */}
          {/* Adjusted margin-left to space out from the title */}
          <nav className="hidden md:flex space-x-4 ml-6">
            <NavLink
              to="/"
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover-bg-opacity-10'
              )}
              end // Ensures this link is only active for the exact path "/"
            >
              Home
            </NavLink>
            <NavLink
              to="/review"
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover-bg-opacity-10'
              )}
            >
              Review
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover-bg-opacity-10'
              )}
            >
              Create
            </NavLink>
            <NavLink
              to="/stats"
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover-bg-opacity-10'
              )}
            >
              Stats
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) => cn(
                'px-3 py-2 rounded-lg transition-colors',
                isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover-bg-opacity-10'
              )}
            >
              Settings
            </NavLink>

            {/* Login/Sign Up Dropdown Container */}
            {/* Use group class and relative positioning for the container */}
            {/* Removed inline-block as it might interfere with flex alignment */}
            <div className="relative group">
              {/* Login Link - stays in normal flow within the flex item */}
              <NavLink
                to="/login"
                className={({ isActive }) => cn(
                  'px-3 py-2 rounded-lg transition-colors',
                  isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover-bg-opacity-10'
                )}
              >
                Login
              </NavLink>

              {/* Dropdown Menu - positioned absolutely below the Login link */}
              {/* Hidden by default, visible on group hover */}
              {/* top-full positions the top of the dropdown at the bottom of the parent */}
              <div className="absolute left-0 top-full mt-0 w-48 bg-white text-gray-800 rounded-md shadow-lg z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                {/* Sign Up Link inside the dropdown */}
                <NavLink
                  to="/signup"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                >
                  Sign Up
                </NavLink>
                {/* You can add other links here if needed */}
              </div>
            </div>
          </nav>

          {/* This div can be used for mobile navigation toggle or other elements if needed */}
          <div className="md:hidden flex">
            {/* Mobile navigation elements if needed */}
            {/* Note: Dropdown on hover is not ideal for mobile.
                 Consider a separate mobile menu toggle for navigation. */}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (fixed at the bottom) */}
      {/* Mobile navigation remains as is, without the dropdown */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-10">
        <div className="flex justify-around">
          {/* Home Link for Mobile */}
          <NavLink to="/" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )} end>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          {/* Review Link for Mobile */}
          <NavLink to="/review" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
             {/* Using BookOpen icon for Review in mobile navigation */}
            <BookOpen className="h-6 w-6" />
            <span className="text-xs mt-1">Review</span>
          </NavLink>
          {/* Create Link for Mobile */}
          <NavLink to="/create" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            {/* SVG icon for Create */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span className="text-xs mt-1">Create</span>
          </NavLink>
          {/* Stats Link for Mobile */}
          <NavLink to="/stats" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            <BarChart2 className="h-6 w-6" />
            <span className="text-xs mt-1">Stats</span>
          </NavLink>
          {/* Settings Link for Mobile */}
          <NavLink to="/settings" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </NavLink>
           {/* Login Link for Mobile */}
           {/* Sign Up link is kept separate in mobile for better usability */}
           <NavLink to="/login" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            <LogIn className="h-6 w-6" />
            <span className="text-xs mt-1">Login</span>
          </NavLink>
           {/* Sign Up Link for Mobile */}
           <NavLink to="/signup" className={({ isActive }) => cn(
            'flex flex-col items-center p-2 w-full',
            isActive ? 'text-pastel-orange' : 'text-gray-500'
          )}>
            <UserPlus className="h-6 w-6" /> {/* Using UserPlus icon */}
            <span className="text-xs mt-1">Sign Up</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
