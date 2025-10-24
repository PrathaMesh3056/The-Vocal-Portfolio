import React from 'react';
import { User } from "lucide-react";

const NameInput = ({ name, setName, handleSaveName }) => {
  return (
    <div className="w-full max-w-md animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Let's personalize your experience
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mb-4 text-gray-800"
        />
        <button
          onClick={handleSaveName}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
        

      </div>
    </div>
    
  );
};

export default NameInput;
