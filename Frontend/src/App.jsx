import React, { useState, useEffect } from "react";
import Github from "./components/github.jsx";
import About from "./components/About.jsx";
import Contact from "./components/contact.jsx";
import Projects from "./components/projects.jsx";
import Resume from "./components/Resume.jsx";
import NameInput from "./components/NameInput.jsx";
import VoiceControls from "./components/VoiceControls.jsx";
import MessageDisplay from "./components/MessageDisplay.jsx";
import SectionRenderer from "./components/SectionRenderer.jsx";
import Header from "./components/Header.jsx";
import AnimatedBackground from "./components/AnimatedBackground.jsx";

import { useVoiceRecorder } from "./hooks/useVoiceRecorder.js";
import { useTextToSpeech } from "./hooks/useTextToSpeech.js";
import { useResumeHandler } from "./hooks/useResumeHandler.js";
import { useGithubHandler } from "./hooks/useGithubHandler.js";

// Import all styles
import "./index.css";
import "./OrbStyles.css";
import "./BackgroundAnimationStyles.css";

function App() {
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [transcription, setTranscription] = useState(""); // Kept for potential future use
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("");

  const { recording, loading, startRecording, stopRecording } =
    useVoiceRecorder();

  useTextToSpeech(message, activeSection);
  useResumeHandler(activeSection);
  useGithubHandler(activeSection);

  // 3-second timer for toast messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSaveName = () => {
    if (!name.trim()) {
      // Use the toast message instead of alert
      setMessage("Error: Please enter your name");
      return;
    }
    setNameSaved(true);
    setMessage(`Hello ${name}, your voice assistant is ready!`);
  };

  const handleTranscriptionComplete = (data) => {
    setTranscription(data.transcribed_text || "");

    if (data.action === "open_section") {
      setActiveSection(data.section);
      setMessage(data.greetings || `Opening ${data.section} section...`);
    } else {
      setActiveSection("");
      setMessage(data.greetings || data.message || "Unknown command.");
    }
  };

  const handleStartRecording = () => {
    startRecording(name, handleTranscriptionComplete);
  };

  // New layout structure
  return (
    <div className="min-h-screen app-container p-4 flex flex-col items-center justify-center text-white">
     
      <AnimatedBackground />
      <Header />
      <MessageDisplay message={message} />

      {/* Content area (z-index 10) */}
      <div className="relative z-10 w-full flex flex-col items-center px-4">
        {!nameSaved ? (
          // --- STATE 1: Name Input ---
          <div className="flex justify-center w-full">
            <NameInput
              name={name}
              setName={setName}
              handleSaveName={handleSaveName}
            />
          </div>
        ) : (
          // --- STATE 2: Voice Controls ---
          <div className="flex flex-col items-center  mt-22 w-full">
            {" "}
            {/* mt-24 to clear header */}
            <h1 className="text-4xl font-bold text-cyan-500 mb-3 animate-fadeIn">
              Voice-Controlled Portfolio
            </h1>
            <p className="text-slate-400 text-lg mb-8 animate-fadeIn">
              Navigate using your voice, {name}!
            </p>
            <VoiceControls
              name={name}
              recording={recording}
              loading={loading}
              startRecording={handleStartRecording}
              stopRecording={stopRecording}
            />
            <SectionRenderer
              activeSection={activeSection}
              About={About}
              Projects={Projects}
              Resume={Resume}
              Contact={Contact}
              Github={Github}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;