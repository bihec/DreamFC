import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>
      <footer className="mt-auto bg-gray-100 py-4 hidden md:block">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Swedish Flashcards App &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;