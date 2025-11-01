"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
}

interface Meteor {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  animationDuration: number;
}

export const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const densityFactor =
        window.innerWidth < 640
          ? 14000 // mobile → fewer stars
          : window.innerWidth < 1024
          ? 10000 // tablet → medium density
          : 9000; // desktop and above → full density

      const numberOfStars = Math.floor(
        (window.innerWidth * window.innerHeight) / densityFactor
      );

      const newStars: Star[] = Array.from(
        { length: numberOfStars },
        (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          animationDuration: Math.random() * 4 + 2,
        })
      );

      setStars(newStars);
    };

    const generateMeteors = () => {
      const numberOfMeteors = window.innerWidth < 640 ? 2 : 4;

      const newMeteors: Meteor[] = Array.from(
        { length: numberOfMeteors },
        (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 20,
          size: Math.random() * 1.5 + 0.5,
          delay: Math.random() * 10,
          animationDuration: Math.random() * 3 + 2,
        })
      );

      setMeteors(newMeteors);
    };

    // Initial render
    generateStars();
    generateMeteors();

    // Responsive re-render with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        generateStars();
        generateMeteors();
      }, 300);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.y}%`,
            left: `${star.x}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}

      {/* Meteors */}
      {/* {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 80}px`,
            height: `${meteor.size * 2}px`,
            top: `${meteor.y}%`,
            left: `${meteor.x}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))} */}
    </div>
  );
};
