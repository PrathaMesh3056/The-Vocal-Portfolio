import React from 'react';

// Header (from Image 2)
const Header = () => (
  <header className="w-full flex justify-between items-center py-4 px-6 absolute top-0 left-0 z-20">
    <div className="flex items-center space-x-2">
      <div className="bg-gray-800 p-2 rounded-lg text-white font-bold text-xl">P</div>
      <span className="text-white font-bold text-xl uppercase">Portfolio</span>
    </div>
    <div className="bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center">
      <span className="text-white text-lg">?</span>
    </div>
  </header>
);

export default Header;