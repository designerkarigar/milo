import styled, { keyframes } from "styled-components";

const floatUp = keyframes`
  0% {
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    transform: translateY(50vh) translateX(20px) rotate(180deg);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(0) rotate(360deg);
    opacity: 0;
  }
`;

export const StyledHeartBalloons = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;

  .heart-balloon {
    position: absolute;
    bottom: -100px;
    font-size: 40px;
    animation: ${floatUp} 15s linear infinite;
    filter: drop-shadow(0 0 10px rgba(255, 20, 147, 0.5));
    will-change: transform;
    user-select: none;
    line-height: 1;
  }

`;

