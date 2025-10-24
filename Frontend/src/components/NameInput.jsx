import React from 'react';
import { User } from "lucide-react";

const NameInput = ({ name, setName, handleSaveName }) => {
  return (
    <div className="w-full max-w-md animate-fadeIn">
      {/*
        CARD:
        - Changed bg-gray-900 -> bg-slate-800 (slightly lighter than the page)
        - Changed border-gray-700 -> border-slate-700
      */}
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        <div className="flex justify-center mb-6">
          {/*
            ICON:
            - Changed gradient to Tailwind's brand colors
            - from-blue-500 to-purple-600 -> from-sky-500 to-cyan-500
          */}
          <div className="bg-gradient-to-br from-sky-500 to-cyan-500 p-4 rounded-full">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>

        {/*
          TEXT:
          - Changed text-gray-100 -> text-slate-100
          - Changed text-gray-400 -> text-slate-400
        */}
        <h2 className="text-2xl font-bold text-center text-slate-100 mb-2">
          Welcome!
        </h2>
        <p className="text-center text-slate-400 mb-6">
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
            - Changed bg-gray-800 -> bg-slate-900 (to match the page bg)
            - Changed border-gray-700 -> border-slate-600
            - Changed text-gray-100 -> text-slate-100
            - Changed placeholder:text-gray-500 -> placeholder:text-slate-500
            - Changed focus:border-blue-500 -> focus:border-sky-500
            - Changed focus:ring-blue-500/50 -> focus:ring-sky-500/50
          */
          className="w-full p-4 border-2 border-slate-600 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all mb-4 text-slate-100 bg-slate-900 placeholder:text-slate-500"
        />
        {/*
          BUTTON:
          - Changed gradient to Tailwind's brand colors
          - from-blue-500 to-purple-600 -> from-sky-500 to-cyan-500
        */}
        <button
          onClick={handleSaveName}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-sky-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default NameInput;