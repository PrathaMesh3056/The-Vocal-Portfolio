import React, { use, useState } from "react";
import Github from "./components/github.jsx";
import About from "./components/About.jsx";
import Contact from "./components/contact.jsx";
import Projects from "./components/projects.jsx";
import Resume from "./components/Resume.jsx";
import NameInput from "./components/NameInput.jsx";
import VoiceControls from "./components/VoiceControls.jsx";
import TranscriptionDisplay from "./components/TranscriptionDisplay.jsx"; // This import is now unused
import MessageDisplay from "./components/MessageDisplay.jsx";
import SectionRenderer from "./components/SectionRenderer.jsx";
import { useVoiceRecorder } from "./hooks/useVoiceRecorder.js";
import { useTextToSpeech } from "./hooks/useTextToSpeech.js";
import { useResumeHandler } from "./hooks/useResumeHandler.js";
import { useGithubHandler } from "./hooks/useGithubHandler.js";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("");

  const { recording, loading, startRecording, stopRecording } = useVoiceRecorder();

  useTextToSpeech(message, activeSection);
  useResumeHandler(activeSection);
  useGithubHandler(activeSection);

  const handleSaveName = () => {
    if (!name.trim()) {
      alert("Please enter your name");
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

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl py-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-cyan-500">
            Voice-Controlled Portfolio
          </h1>
          <p className="text-slate-400">
            Navigate using your voice...
          </p>
        </div>

        {!nameSaved ? (
          <div className="flex justify-center">
            <NameInput
              name={name}
              setName={setName}
              handleSaveName={handleSaveName}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <VoiceControls
              name={name}
              recording={recording}
              loading={loading}
              startRecording={handleStartRecording}
              stopRecording={stopRecording}
            />

            {/* --- DELETE OR COMMENT OUT THIS LINE --- */}
            {/* <TranscriptionDisplay transcription={transcription} /> */}

            <MessageDisplay message={message} />

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