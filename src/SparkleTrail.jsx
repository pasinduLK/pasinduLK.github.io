import React, { useEffect, useRef } from "react";

const SparkleTrail = ({
  character = "✧",      // Your sparkle character (Unicode or emoji)
  color = "#00FFAA",      // Sparkle color
  fontSize = 20,          // Size of the character
  sparkleCount = 0.2,     // Probability of a sparkle per move (0 to 1)
  lifetime = 700,        // Time before disappearing (ms)
  fallSpeed = 0.2          // Adjust for fall speed (pixels per frame)
}) => {
  const sparkleContainerRef = useRef(null);

  useEffect(() => {
    const sparkles = [];

    const createSparkle = (x, y) => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle-char";
      sparkle.innerText = character;
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.color = color;
      sparkle.style.fontSize = `${fontSize}px`;
      sparkle.style.zIndex = "9999"; // Ensure it's on top
      sparkle.style.position = "fixed";
      sparkle.style.pointerEvents = "none";
      sparkle.style.transform = "translate(-50%, -50%)";
      sparkle.style.opacity = "0.9";
      sparkle.style.fontWeight = "bold";

      document.body.appendChild(sparkle);
      sparkles.push(sparkle);

      let currentY = y;
      const animationStartTime = performance.now();

      const animateSparkle = (currentTime) => {
        const timeElapsed = currentTime - animationStartTime;
        const fallOffset = timeElapsed * fallSpeed;
        sparkle.style.top = `${currentY + fallOffset}px`;
        sparkle.style.opacity = 1 - (timeElapsed / lifetime);
        const scale = 1 - (timeElapsed / lifetime) * 0.5;
        sparkle.style.transform = `translate(-50%, -50%) scale(${scale})`;

        if (timeElapsed < lifetime) {
          requestAnimationFrame(animateSparkle);
        } else {
          sparkle.remove();
          const index = sparkles.indexOf(sparkle);
          if (index > -1) {
            sparkles.splice(index, 1);
          }
        }
      };

      requestAnimationFrame(animateSparkle);
    };

    const handleMouseMove = (e) => {
      if (Math.random() < sparkleCount) {
        const offsetX = Math.random() * 20 - 10;
        const offsetY = Math.random() * 20 - 10;
        createSparkle(e.clientX + offsetX, e.clientY + offsetY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [character, color, fontSize, sparkleCount, lifetime, fallSpeed]);

  return null; // This component doesn't render any visible element itself
};

export default SparkleTrail;