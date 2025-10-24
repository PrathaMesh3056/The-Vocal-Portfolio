import { useState, useRef } from 'react';

export const useVoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async (name, onTranscriptionComplete) => {
    if (!name) {
      alert("Please enter your name first.");
      return;
    }

    try {
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
          onTranscriptionComplete(data);
        } catch (err) {
          console.error("Error connecting to backend:", err);
          onTranscriptionComplete({
            message: "Error connecting to backend.",
            error: true,
          });
        }
        setLoading(false);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please grant permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  return { recording, loading, startRecording, stopRecording };
};