
import React, { useState, useEffect, useRef } from "react";
import About from "./About";
import Contact from "./contact.jsx";
import Projects from "./projects.jsx";
import Resume from "./Resume.jsx";

function App() {
  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const spokenRef = useRef("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSaveName = () => {
    if (!name.trim()) return alert("Please enter your name");
    setNameSaved(true);
    setMessage(`Hello ${name}, your voice assistant is ready!`);
  };

  const startRecording = async () => {
    if (!name) return alert("Please enter your name first.");

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", audioBlob, "voice.wav");
      formData.append("name", name);

      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/transcribe", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setTranscription(data.transcribed_text || "");

        if (data.action === "open_section") {
          setActiveSection(data.section);
          setMessage(data.greetings || `Opening ${data.section} section...`);
        } else {
          setActiveSection("");
          setMessage(data.greetings || data.message || "Unknown command.");
        }
      } catch (err) {
        console.error("Error connecting to backend:", err);
        setMessage("Error connecting to backend.");
      }
      setLoading(false);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  useEffect(() => {
    let textToSpeak = "";

    if (message) {
      textToSpeak = message;
    }

    if (activeSection) {
    const sectionTexts = {
      about: `Opening the About section.`,
      project: `Showing your Projects section.`,
      resume: `Opening your Resume.`,
      contact: `Opening the Contact section.`,
    };
    textToSpeak = sectionTexts[activeSection];
  }

    if (textToSpeak && spokenRef.current !== textToSpeak) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      spokenRef.current = textToSpeak;
    }
  }, [message, activeSection]);

  useEffect(() => {
    if (activeSection === "resume") {
      window.open("/resume.pdf", "_blank");
    }
  }, [activeSection]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Voice-Controlled Portfolio
        </h1>

        {!nameSaved && (
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSaveName}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Name
            </button>
          </div>
        )}

        {nameSaved && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <p className="mb-4 text-gray-700">
              Hello, {name}! Start speaking to control your portfolio.
            </p>

            {!recording ? (
              <button
                onClick={startRecording}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mb-2"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mb-2"
              >
                Stop Recording
              </button>
            )}

            {loading && <p className="mt-4 text-gray-700">Transcribing...</p>}

            {transcription && (
              <div className="mt-6 p-4 bg-white rounded shadow w-full max-w-xl">
                <h2 className="font-semibold text-lg mb-2">Transcription:</h2>
                <p className="text-gray-700">{transcription}</p>
              </div>
            )}

            {message && (
              <p className="mt-4 text-lg font-semibold text-gray-800">{message}</p>
            )}

            <div className="mt-8 w-full max-w-xl">
              {activeSection === "about" && <About />}
              {activeSection === "project" && <Projects/>}
              {activeSection === "resume" && <Resume/>}
              {activeSection === "contact" && <Contact/>}
                
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
