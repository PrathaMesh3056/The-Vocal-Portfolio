import React from 'react';
import { CheckCircle, AlertCircle } from "lucide-react";

const MessageDisplay = ({ message }) => {
  if (!message) return null;

  // This logic is great, no changes needed
  const isError = message.toLowerCase().includes('error') || message.toLowerCase().includes('unknown');

  return (
    <div className={`w-full max-w-2xl mt-6 animate-fadeIn ${isError ? 'animate-shake' : ''}`}>
      {/* This block is updated to show two different dark-mode styles:
        1. A white card for errors (like your screenshot).
        2. A dark green card for success.
      */}
      <div className={`rounded-xl shadow-lg p-6 border ${
        isError 
          ? 'bg-white border-red-300' 
          : 'bg-green-900/50 border-green-700'
      }`}>
        <div className="flex items-start space-x-3">
          {isError ? (
            // Error icon (fine on white)
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          ) : (
            // Success icon (updated for dark bg)
            <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
          )}
          <p className={`text-lg font-medium ${
            isError 
              ? 'text-red-800' // Error text (fine on white)
              : 'text-green-200' // Success text (updated for dark bg)
          }`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;