
import React from 'react';

const SectionRenderer = ({ activeSection, About, Projects, Resume, Contact,Github }) => {
  if (!activeSection) return null;

  return (
    <div className="w-full max-w-2xl mt-8 animate-fadeIn">
      {activeSection === "about" && <About />}
      {activeSection === "projects" && <Projects />}
      {activeSection === "resume" && <Resume />}
      {activeSection === "contact" && <Contact />}
      {activeSection === "github" && <Github/>}
    </div>
  );
};

export default SectionRenderer;
