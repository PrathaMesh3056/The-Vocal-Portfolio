import React from 'react';
import { CheckCircle, AlertCircle } from "lucide-react";

const MessageDisplay = ({ message }) => {
  if (!message) return null;

  const isError = message.toLowerCase().includes('error') || message.toLowerCase().includes('unknown');

  return (
    <div className={`w-full max-w-2xl mt-6 animate-fadeIn ${isError ? 'animate-shake' : ''}`}>
      <div className={`rounded-xl shadow-lg p-6 border ${
        isError 
          ? 'bg-red-50 border-red-200' 
          : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-start space-x-3">
          {isError ? (
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          )}
          <p className={`text-lg font-medium ${isError ? 'text-red-800' : 'text-green-800'}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
