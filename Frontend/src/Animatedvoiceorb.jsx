import React from 'react';
import styled from 'styled-components';
import { Loader2 } from 'lucide-react';



const AnimatedVoiceOrb = ({ isRecording, isLoading, onClick }) => {
  return (

    <StyledWrapper $isRecording={isRecording} $isLoading={isLoading}>
      <div className="container-vao">
        <div className="orb" onClick={isLoading ? undefined : onClick}>
          <div className="icons">
            {isLoading ? (
              <Loader2 className="svg loader" />
            ) : (
              // Show original mic SVG
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <g fill="none" className="mic">
                  <rect width={8} height={13} x={8} y={2} fill="black" rx={4} />
                  <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11a7 7 0 1 0 14 0m-7 10v-2" />
                </g>
              </svg>
            )}
          </div>
          <div className="ball">
            <div className="container-lines" />
            <div className="container-rings" />
          </div>
          <svg style={{ pointerEvents: 'none' }}>
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
    </StyledWrapper>
  );
};

// --- STYLES ---
// All the styles from your original orb, but refactored to use props
// instead of the .input-orb:checked hack.

const StyledWrapper = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .container-vao {
    position: relative;
    /* Set a fixed size for the container so it fits in your layout */
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .orb {
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    width: 64px;
    height: 64px;
    display: flex;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    z-index: 99;

    /* --- Base State (Not Recording) --- */
    filter: drop-shadow(0 0 4px rgba(255, 255, 255))
      drop-shadow(0 0 12px rgba(255, 255, 255))
      drop-shadow(0 0 12px rgba(145, 71, 255, 0.3))
      drop-shadow(0 0 5px rgba(255, 0, 0, 0.3));
    transform: scale(1.2) translate(-50%, -50%);

    & .ball {
      /* Breathing animation */
      animation: circle2 4.2s ease-in-out infinite;
    }
    
    /* Hide animations when not recording */
    & .container-lines,
    & .container-rings::before,
    & .container-rings::after {
        animation: none;
    }

    &:hover {
      transform: scale(1.4) translate(-50%, -50%);
      filter: drop-shadow(0 0 4px rgba(255, 255, 255))
        drop-shadow(0 0 8px rgba(255, 255, 255))
        drop-shadow(0 0 12px rgba(255, 255, 255))
        drop-shadow(0 0 10px rgba(145, 71, 255, 0.3))
        drop-shadow(0 6px 26px rgba(255, 0, 0, 0.3));

      & .icons .svg {
        transform: scale(1.1);
        filter: drop-shadow(0 0 4px #ffffff);
        opacity: 1;
      }
    }

    &:active {
      transform: scale(1.2) translate(-50%, -50%);
    }
  }

  /* --- Recording State --- */
  /* When $isRecording is true, turn on the complex animations */
  ${(props) =>
    props.$isRecording &&
    `
    & .orb {
      & .container-lines {
        animation: animation-ball 15s both ease;
      }
      & .container-rings::before {
        animation: ring180 10s linear infinite;
      }
      & .container-rings::after {
        animation: ring90 10s linear infinite;
      }
    }
  `}

  /* --- Loading State --- */
  /* When $isLoading is true, disable clicks and grayscale */
  ${(props) =>
    props.$isLoading &&
    `
    & .orb {
      cursor: not-allowed;
      filter: grayscale(80%);

      /* Override hover effects when loading */
      &:hover {
        transform: scale(1.2) translate(-50%, -50%);
        filter: grayscale(80%);
        
        & .icons .svg {
          transform: none;
        }
      }
    }
  `}


  /* --- ICONS --- */
  .icons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
    z-index: 999;

    & .svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      opacity: 0.5;
      transition: all 0.3s ease-in-out;
    }
    
    & .svg.loader {
        opacity: 1;
        animation: spin 1.5s linear infinite;
    }
  }

  .ball {
    display: flex;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 50px;
    background-color: #ff0002;
    filter: url(#gooey);
  }

  /* --- ALL KEYFRAMES --- */

  @keyframes circle2 {
    0% {
      transform: scale(1.5);
    }
    15% {
      transform: scale(1.53);
    }
    30% {
      transform: scale(1.48);
    }
    45% {
      transform: scale(1.44);
    }
    60% {
      transform: scale(1.47);
    }
    85% {
      transform: scale(1.53);
    }
    100% {
      transform: scale(1.5);
    }
  }

  .container-lines {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-image: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.75) 15%,
      #3b82f6 50%
    );
    clip-path: polygon(
      50% 25%,
      65% 30%,
      75% 42%,
      75% 58%,
      65% 70%,
      50% 75%,
      35% 70%,
      26% 58%,
      25% 42%,
      35% 30%
    );
    pointer-events: none;
  }

  @keyframes animation-ball {
    2% {
      clip-path: polygon(
        50% 25%,
        50% 0,
        75% 42%,
        75% 58%,
        65% 70%,
        50% 75%,
        35% 70%,
        26% 58%,
        25% 42%,
        50% 0
      );
    }
    4% {
      clip-path: polygon(
        50% 25%,
        70% 0,
        75% 42%,
        85% 66%,
        65% 100%,
        50% 75%,
        35% 100%,
        15% 65%,
        25% 42%,
        30% 0
      );
    }
    6% {
      clip-path: polygon(
        50% 25%,
        50% 15%,
        75% 42%,
        75% 58%,
        65% 70%,
        50% 75%,
        35% 70%,
        26% 58%,
        25% 42%,
        50% 15%
      );
    }
    7%,
    59% {
      clip-path: polygon(
        50% 25%,
        100% 12%,
        75% 42%,
        85% 66%,
        65% 70%,
        50% 75%,
        35% 70%,
        15% 65%,
        25% 42%,
        0 12%
      );
    }
    9%,
    57% {
      clip-path: polygon(
        50% 25%,
        50% 0,
        75% 42%,
        75% 58%,
        65% 70%,
        50% 75%,
        35% 70%,
        26% 58%,
        25% 42%,
        50% 0
      );
    }
    12%,
    55%,
    61% {
      clip-path: polygon(
        50% 25%,
        65% 30%,
        75% 42%,
        75% 58%,
        65% 70%,
        50% 75%,
        35% 70%,
        26% 58%,
        25% 42%,
        35% 30%
      );
    }
  }

  .container-rings {
    aspect-ratio: 1;
    border-radius: 50%;
    position: absolute;
    inset: 0;
    perspective: 11rem;

    &:before,
    &:after {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(255, 0, 0, 1);
      border-radius: 50%;
      border: 6px solid transparent;
      mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      background: linear-gradient(white, blue, magenta, violet, lightyellow)
        border-box;
      mask-composite: exclude;
    }
  }

  @keyframes ring180 {
    0% {
      transform: rotateY(180deg) rotateX(180deg) rotateZ(180deg);
    }
    50% {
      transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg) scale(1.1);
    }
    100% {
      transform: rotateY(540deg) rotateX(540deg) rotateZ(540deg);
    }
  }

  @keyframes ring90 {
    0% {
      transform: rotateY(90deg) rotateX(90deg) rotateZ(90deg);
    }
    50% {
      transform: rotateY(270deg) rotateX(270deg) rotateZ(270deg) scale(1.1);
    }
    100% {
      transform: rotateY(450deg) rotateX(450deg) rotateZ(450deg);
    }
  }
`;

export default AnimatedVoiceOrb;