

import React from 'react';
import { Volume2 } from "lucide-react";


const TranscriptionDisplay = ({ transcription }) => {
  if (!transcription) return null;

  return (
    <div className="w-full max-w-2xl mt-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-start space-x-3">
          <Volume2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2">You said:</h3>
            <p className="text-gray-700 leading-relaxed italic">"{transcription}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionDisplay;