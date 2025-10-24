import { useEffect, useRef } from 'react';

export const useTextToSpeech = (message, activeSection) => {
  const spokenRef = useRef("");

  useEffect(() => {
    let textToSpeak = "";

    if (message) {
      textToSpeak = message;
    }

    if (activeSection) {
      const sectionTexts = {
        about: `Opening the About section.`,
        projects: `Showing your Projects section.`,
        resume: `Opening your Resume.`,
        contact: `Opening the Contact section.`,
        github: `Opening your GitHub profile.`,
        
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
};
