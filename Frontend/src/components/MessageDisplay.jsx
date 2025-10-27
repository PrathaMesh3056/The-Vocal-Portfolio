import React from 'react';
import { CheckCircle, AlertCircle } from "lucide-react";

const MessageDisplay = ({ message }) => {
  if (!message) return null;

  const isError = message.toLowerCase().includes('error') || message.toLowerCase().includes('unknown');

  return (
    
    <div className={`fixed top-6 right-6 z-50 w-auto max-w-sm animate-fadeIn ${isError ? 'animate-shake' : ''}`}>
      
      <div className={`rounded-xl shadow-lg p-4 border ${ 
        isError 
          ? 'bg-white border-red-300' 
          : 'bg-green-900/50 border-green-700'
      }`}>
        <div className="flex items-start space-x-2">
          {isError ? (
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
          )}
          <p className={`text-sm font-medium ${
            isError 
              ? 'text-red-800' 
              : 'text-green-200' 
          }`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;