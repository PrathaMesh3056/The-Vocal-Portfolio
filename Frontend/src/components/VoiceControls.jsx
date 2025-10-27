import React from "react";
import { Loader2, Sparkles } from "lucide-react";
import AnimatedVoiceOrb from "../Animatedvoiceorb.jsx"; // <-- 1. Import is correct

const VoiceControls = ({ name, recording, loading, startRecording, stopRecording }) => {
  return (
    <div className="w-full max-w-2xl animate-fadeIn">
      <div className="bg-black rounded-2xl shadow-2xl  ">
        <div className="text-center mb-6">
          
          <p className="text-slate-400 ">
            Tap the circle and speak to control your portfolio
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          
          <AnimatedVoiceOrb
            isRecording={recording}
            isLoading={loading}
            onClick={recording ? stopRecording : startRecording}
          />

         
          {loading && (
            
            <div className="flex items-center space-x-2 text-blue-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">Processing your voice...</span>
            </div>
          )}

          {recording && !loading && (
           
            <div className="text-sm text-slate-400">Listening...</div>
          )}
        </div>

        <div className="mt-10 p-3 bg-slate-900 rounded-lg  border-slate-700">
         
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