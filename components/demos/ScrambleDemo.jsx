'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ScrambleDemo() {
  const phrases = ["FRAMER MOTION", "REACT MAGIC", "ANIMATION PRO", "CREATIVE CODE"];
  const CHARS = "!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [text, setText] = React.useState(phrases[0]);
  const [isScrambling, setIsScrambling] = React.useState(false);
  const intervalRef = React.useRef(null);

  const scramble = (targetText) => {
    if (isScrambling) return;
    setIsScrambling(true);
    let pos = 0;
    intervalRef.current = setInterval(() => {
      setText(targetText.split('').map((c, i) => {
        if (c === ' ') return ' ';
        if (pos / 2 > i) return targetText[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      pos++;
      if (pos >= targetText.length * 2) {
        clearInterval(intervalRef.current);
        setText(targetText);
        setIsScrambling(false);
      }
    }, 35);
  };

  const cycleText = () => {
    const nextIndex = (currentIndex + 1) % phrases.length;
    setCurrentIndex(nextIndex);
    scramble(phrases[nextIndex]);
  };

  React.useEffect(() => {
    scramble(phrases[0]);
  }, []);

  return (
    <>
      <h2 className="demo-title">Text Scramble</h2>
      <p className="demo-subtitle">Matrix-style character scrambling. Click to cycle through phrases with glitch effect.</p>
      <div className="demo-area">
        <div style={{
          padding: '60px 40px',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.9) 100%)',
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(102,126,234,0.1) 50%, transparent 100%)',
            animation: 'shimmer 3s infinite'
          }} />
          <motion.div
            onClick={cycleText}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontSize: '3rem',
              fontWeight: 900,
              fontFamily: 'monospace',
              background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              textShadow: '0 0 40px rgba(102,126,234,0.5)',
              userSelect: 'none',
              position: 'relative'
            }}
          >
            {text}
          </motion.div>
          <div style={{
            marginTop: 20,
            display: 'flex',
            gap: 8,
            justifyContent: 'center'
          }}>
            {phrases.map((_, i) => (
              <motion.div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i === currentIndex ? '#667eea' : 'rgba(255,255,255,0.2)'
                }}
                animate={{ scale: i === currentIndex ? 1.2 : 1 }}
              />
            ))}
          </div>
          <p style={{
            marginTop: 16,
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.85rem'
          }}>
            Click to cycle
          </p>
        </div>
      </div>
    </>
  );
}
