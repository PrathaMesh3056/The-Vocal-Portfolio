import React from 'react';

import { Mic, MicOff, Loader2, Sparkles } from "lucide-react";

const VoiceControls = ({ name, recording, loading, startRecording, stopRecording }) => {
  return (
    <div className="w-full max-w-2xl animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hello, {name}! 👋
          </h2>
          <p className="text-gray-600">
            Click the button and speak to control your portfolio
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {!recording ? (
            <button
              onClick={startRecording}
              disabled={loading}
              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-6 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
            >
              <Mic className="w-6 h-6" />
              <span className="text-lg">Start Recording</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="group relative bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-6 rounded-2xl font-semibold hover:from-red-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-xl flex items-center space-x-3 animate-pulse"
            >
              <MicOff className="w-6 h-6" />
              <span className="text-lg">Stop Recording</span>
            </button>
          )}

          {loading && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">Processing your voice...</span>
            </div>
          )}

          {recording && (
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="flex space-x-1">
                <div className="w-2 h-8 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-10 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-6 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-9 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
              </div>
              <span className="text-sm">Listening...</span>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-700 text-center">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Try saying: "Open About", "Show Projects", "Open Resume","Contact","Open GitHub"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;