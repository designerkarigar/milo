import React from "react";
import { StyledHeartBalloons } from "./styledComponent";

export const HeartBalloons = () => {
  const pastelHeartColors = [
    "#FFB3C6",
    "#FFD6A5",
    "#FDFFB6",
    "#CAFFBF",
    "#BDE0FE",
    "#CDB4DB",
    "#FFC6FF",
    "#B8F2E6",
  ];

  // Generate multiple heart balloons with different positions and delays
  const balloons = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${10 + (i * 6) + Math.random() * 3}%`, // More evenly distributed
    delay: `${i * 0.5}s`, // Staggered delays
    duration: `${12 + Math.random() * 6}s`, // 12-18 seconds
    size: `${35 + Math.random() * 15}px`, // 35-50px
    color: pastelHeartColors[Math.floor(Math.random() * pastelHeartColors.length)],
  }));

  return (
    <StyledHeartBalloons>
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="heart-balloon"
          style={{
            left: balloon.left,
            animationDelay: balloon.delay,
            animationDuration: balloon.duration,
            fontSize: balloon.size,
            color: balloon.color,
          }}
        >
          ♥
        </div>
      ))}
    </StyledHeartBalloons>
  );
};

