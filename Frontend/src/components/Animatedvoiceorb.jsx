import React from 'react';

// --- INLINE SVGs ---
const Loader2 = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const MicIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
    <g fill="none" className="mic">
      <rect width={8} height={13} x={8} y={2} fill="currentColor" rx={4} />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11a7 7 0 1 0 14 0m-7 10v-2" />
    </g>
  </svg>
);

// AnimatedVoiceOrb (extracted from VoiceControls)
const AnimatedVoiceOrb = ({ isRecording, isLoading, onClick }) => {
  return (
    <div
      className="container-vao"
      data-is-recording={isRecording}
      data-is-loading={isLoading}
    >
      <div className="orb" onClick={isLoading ? undefined : onClick}>
        <div className="icons">
          {isLoading ? (
            <Loader2 className="svg-icon loader" />
          ) : (
            <MicIcon className="svg-icon" />
          )}
        </div>
        <div className="ball">
          <div className="container-lines" />
          <div className="container-rings" />
        </div>
        <svg style={{ pointerEvents: 'none', position: 'absolute' }}>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation={6} />
            <feColorMatrix values="1 0 0 0 0
                                  0 1 0 0 0 
                                  0 0 1 0 0
                                  0 0 0 20 -10" />
          </filter>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedVoiceOrb;
