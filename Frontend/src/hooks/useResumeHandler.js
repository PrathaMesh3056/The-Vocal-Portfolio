import { useEffect } from 'react';

export const useResumeHandler = (activeSection) => {
  useEffect(() => {
    if (activeSection === "resume") {
      window.open("/resume.pdf", "_blank");
    }
  }, [activeSection]);
};
