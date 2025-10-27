import React from 'react';

// --- Helper for Background Elements ---
const generateRandomElements = (count, isIcon = false) => {
  const elements = [
    'function design() {', 'const portfolio = () => {', 'import React from "react"',
    'filter(x => x)', 'map(item =>', 'reduce(acc, val)', 'async/await',
    'npm install', 'onClick={handler}', 'useState', 'useEffect(() => {',
    'return', '{...props}', 'className="Flex"', '--> []', 'const [state, setState]',
    'interface Data {', 'type VoiceCommand = {', 'const api = new API()',
    'await response.json()', '<span>', '<div />', 'z-index: 10;', 'overflow: hidden;',
    'display: flex;', 'justify-content: center;', 'align-items: center;',
    'width: 100%;', 'height: 100vh;', 'transform: scale(1.2);', 'opacity: 0.8;'
  ];
  const icons = ['✨', '📦', '⚡', '⚙️', '▲', '●', '⭐', '🟨', '🟦', '◇'];

  return Array.from({ length: count }).map((_, i) => {
    const content = isIcon ? icons[Math.floor(Math.random() * icons.length)] : elements[Math.floor(Math.random() * elements.length)];
    const xStart = Math.random() * 100 - 20 + 'vw';
    const yStart = Math.random() * 100 - 20 + 'vh';
    const xEnd = Math.random() * 100 + 20 + 'vw';
    const yEnd = Math.random() * 100 + 20 + 'vh';
    const duration = 15 + Math.random() * 15 + 's';
    const delay = Math.random() * 10 + 's';

    return (
      <div
        key={i}
        className={`animated-element ${isIcon ? 'icon' : ''}`}
        style={{
          '--x-start': xStart,
          '--y-start': yStart,
          '--x-end': xEnd,
          '--y-end': yEnd,
          animationDuration: duration,
          animationDelay: delay,
          left: Math.random() * 100 + 'vw',
          top: Math.random() * 100 + 'vh',
          transform: `translate(-50%, -50%)`,
        }}
      >
        {content}
      </div>
    );
  });
};

const AnimatedBackground = () => (
  <div className="animated-background-grid">
    {generateRandomElements(30)}
    {generateRandomElements(15, true)}
  </div>
);

export default AnimatedBackground;
