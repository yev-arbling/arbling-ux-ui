'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TypewriterDemo() {
  const text = "Building the future...";
  const [display, setDisplay] = React.useState('');
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    setDisplay('');
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) { setDisplay(text.slice(0, i + 1)); i++; }
      else clearInterval(iv);
    }, 80);
    return () => clearInterval(iv);
  }, [key]);

  return (
    <>
      <h2 className="demo-title">Typewriter</h2>
      <p className="demo-subtitle">Character-by-character typing with blinking cursor.</p>
      <div className="demo-area">
        <div>
          <span className="typewriter-text">{display}</span>
          <motion.span
            className="typewriter-cursor"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
        <button className="replay-btn" onClick={() => setKey(k => k + 1)}>Replay</button>
      </div>
    </>
  );
}
