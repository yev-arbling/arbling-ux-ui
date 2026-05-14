'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TextGenerateDemo() {
  const [key, setKey] = React.useState(0);
  const text = "The future of animation is here. Build beautiful, performant interfaces with Framer Motion.";
  const words = text.split(' ');

  return (
    <>
      <h2 className="demo-title">Text Generate</h2>
      <p className="demo-subtitle">Words appear one by one with blur-fade effect, simulating AI text generation.</p>
      <div className="demo-area">
        <div key={key} style={{ maxWidth: 500, textAlign: 'center', minHeight: 80 }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block', marginRight: 8, fontSize: '1.5rem', fontWeight: 500, color: '#ccc' }}
            >
              {word}
            </motion.span>
          ))}
        </div>
        <button className="replay-btn" style={{ marginTop: 30 }} onClick={() => setKey(k => k + 1)}>Replay</button>
      </div>
    </>
  );
}
