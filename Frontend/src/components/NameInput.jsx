import React from 'react';

// --- INLINE SVGs ---
const MicIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
    <g fill="none" className="mic">
      <rect width={8} height={13} x={8} y={2} fill="currentColor" rx={4} />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11a7 7 0 1 0 14 0m-7 10v-2" />
    </g>
  </svg>
);

const SendIcon = ({ className }) => (
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
    <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    <path d="M22 2 11 13" />
  </svg>
);


// NameInput (from your file)
const NameInput = ({ name, setName, handleSaveName }) => {
  return (
    <div className="w-full max-w-lg mt-24 animate-fadeIn flex flex-col items-center">
      {/* Top section: Subtitle, Title, Description */}
      <div className="text-center mb-6">
        
        <h2 className="text-6xl font-extrabold text-white">Wellcome!!</h2>
        <p className="text-gray-500 text-l mt-4">Enter your name to begin your journey</p>
      </div>

      {/* Input Card */}
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-xl w-full">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
          className="w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-800 text-white placeholder-gray-500 transition-all text-lg mb-6"
        />
        <button
          onClick={handleSaveName}
          className="w-full bg-gray-700 text-white px-5 py-3 rounded-lg font-semibold text-lg
                     flex items-center justify-center space-x-2
                     hover:bg-gray-600 transition-all transform hover:scale-[1.01] shadow-lg"
        >
          <span>Submit</span>
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
       <p className="text-gray-500 text-sm mt-8">MADE BY PRATHAMESH</p>
       <p className="text-gray-400 text-sm\ mb-2 flex items-center justify-center space-x-2">
          <MicIcon className="w-4 h-4 text-gray-400" />
          <span>This portfolio is directed by voice commands</span>
        </p>
    </div>
  );
};

export default NameInput;
