import React from 'react';
import { User } from "lucide-react";

const NameInput = ({ name, setName, handleSaveName }) => {
  return (
    <div className="w-full max-w-md animate-fadeIn">
      <div className="bg-black rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="flex justify-center mb-6">
          {/*
            ICON:
            - Changed gradient to a simple, darker slate.
          */}
          <div className="bg-slate-700 p-4 rounded-full">
            <User className="w-8 h-8 text-cyan" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-cyan-700 mb-2">
          Welcome!
        </h2>
        <p className="text-center text-white mb-6">
          Let's personalize your experience
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
          /*
            INPUT FIELD:
            - We'll use the 'sky' blue for focus, as it's a standard accent.
          */
          className="w-full p-4 border-2 border-slate-600 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all mb-4 text-slate-100 bg-slate-900 placeholder:text-slate-500"
        />
        {/*
          BUTTON:
          - Replaced the bright gradient with a clean, light button.
          - This "pops" against the dark card and looks very professional.
        */}
        <button
          onClick={handleSaveName}
          className="w-full bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-semibold hover:bg-slate-200 transition-all transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default NameInput;