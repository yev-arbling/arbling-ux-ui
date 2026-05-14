'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function SplitTextDemo() {
  const [key, setKey] = React.useState(0);
  const words = ['MOTION', 'IS', 'MAGIC'];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const word = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } }
  };

  const char = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 12 } }
  };

  return (
    <>
      <h2 className="demo-title">Split Text</h2>
      <p className="demo-subtitle">Characters animate individually with staggered timing. Per-character spring physics.</p>
      <div className="demo-area">
        <motion.div
          key={key}
          className="split-text"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words.map((w, wi) => (
            <motion.span key={wi} className="split-word" variants={word}>
              {w.split('').map((c, ci) => (
                <motion.span key={ci} className="split-char" variants={char}>{c}</motion.span>
              ))}
            </motion.span>
          ))}
        </motion.div>
        <button className="replay-btn" onClick={() => setKey(k => k + 1)}>Replay</button>
      </div>
    </>
  );
}
