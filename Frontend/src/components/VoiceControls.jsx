import React from "react";
import { Loader2, Sparkles } from "lucide-react";
import AnimatedVoiceOrb from "./Animatedvoiceorb.jsx"; // <-- 1. Import is correct

const VoiceControls = ({ name, recording, loading, startRecording, stopRecording }) => {
  return (
    <div className="w-full max-w-2xl animate-fadeIn">
      {/* CHANGES:
        - bg-slate -> bg-slate-800 (needs a shade)
        - border-gray-100 -> border-slate-700
      */}
      <div className="bg-black rounded-2xl shadow-2xl p-8 border border-cyan-200">
        {/* Header */}
        <div className="text-center mb-6">
          {/* CHANGES:
            - text-gray-800 -> text-slate-100
          */}
          <h2 className="text-2xl font-bold text-slate-100 mb-2">
            Hello, {name}! 👋
          </h2>
          {/* CHANGES:
            - text-gray-600 -> text-slate-400
          */}
          <p className="text-slate-400">
            Tap the circle and speak to control your portfolio
          </p>
        </div>

        {/* Voice Button */}
        <div className="flex flex-col items-center space-y-6">
          {/* This component is now correct */}
          <AnimatedVoiceOrb
            isRecording={recording}
            isLoading={loading}
            onClick={recording ? stopRecording : startRecording}
          />

          {/* Status text */}
          {loading && (
            // Blue text on dark background is fine
            <div className="flex items-center space-x-2 text-blue-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">Processing your voice...</span>
            </div>
          )}

          {recording && !loading && (
            // CHANGE: text-gray-600 -> text-slate-400
            <div className="text-sm text-slate-400">Listening...</div>
          )}
        </div>

        {/* Example Commands */}
        {/* CHANGES:
          - bg-gradient-to-r from-blue-50... -> bg-slate-900 (matches page bg)
          - border-blue-100 -> border-slate-700
        */}
        <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-slate-700">
          {/* CHANGES:
            - text-gray-700 -> text-slate-400
            - Added text-sky-400 to icon
          */}
          <p className="text-sm text-slate-400 text-center">
            <Sparkles className="w-4 h-4 inline mr-1 text-sky-500" />
            Try saying: "Open About", "Show Projects", "Open Resume", "Contact", "Open GitHub"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;