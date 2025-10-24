import React from "react";
import { Loader2, Mic, MicOff, Sparkles } from "lucide-react";
import AnimatedVoiceOrb from "./Animatedvoiceorb.jsx"; // <-- 1. Import the new orb

const VoiceControls = ({ name, recording, loading, startRecording, stopRecording }) => {
  return (
    <div className="w-full max-w-2xl animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header (No change) */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Hello, {name}! 👋
          </h2>
          <p className="text-gray-600">
            Tap the circle and speak to control your portfolio
          </p>
        </div>

        {/* Voice Button */}
        <div className="flex flex-col items-center space-y-6">
          {/* 2. Replace the <button> with the new <AnimatedVoiceOrb> */}
          <AnimatedVoiceOrb
            isRecording={recording}
            isLoading={loading}
            onClick={recording ? stopRecording : startRecording}
          />

          {/* Status text (No change) */}
          {/* This text will now appear *below* your new animated orb */}
          {loading && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">Processing your voice...</span>
            </div>
          )}

          {recording && !loading && (
            <div className="text-sm text-gray-600">Listening...</div>
          )}
        </div>

        {/* Example Commands (No change) */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-700 text-center">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Try saying: "Open About", "Show Projects", "Open Resume", "Contact", "Open GitHub"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;