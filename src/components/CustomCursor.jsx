import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const dotsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      let { x, y } = cursor;

      dotsRef.current.forEach((dot, index) => {
        const nextDot = dotsRef.current[index + 1] || dotsRef.current[0];

        // Smooth trailing effect between dots
        dot.style.left = `${x - 8}px`;
        dot.style.top = `${y - 10}px`;

        x += (nextDot.offsetLeft - dot.offsetLeft) * 0.3;
        y += (nextDot.offsetTop - dot.offsetTop) * 0.3;

        // Add slight scaling for animation
        dot.style.transform = `scale(${1 - index * 0.01})`;
      });
    };

    const intervalId = setInterval(draw, 1);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursor]);

  return (
    <>
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="dot"
          style={{
            width: `${24 - i * 0.3}px`,
            height: `${24 - i * 0.3}px`,
            opacity: `${1 - i * 0.02}`,

            position: 'absolute',
            backgroundColor: 'aquamarine',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '1000',
            transition: 'transform 0.2s ease-out, opacity 0.1s',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        />
      ))}
    </>
  );
}
