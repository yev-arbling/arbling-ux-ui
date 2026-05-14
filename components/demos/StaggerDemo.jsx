'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function StaggerDemo() {
  const [key, setKey] = React.useState(0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <>
      <h2 className="demo-title">Stagger Grid</h2>
      <p className="demo-subtitle">Grid items animate in sequence with staggerChildren. Spring physics for bounce.</p>
      <div className="demo-area">
        <motion.div
          key={key}
          className="stagger-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {[...Array(32)].map((_, i) => (
            <motion.div
              key={i}
              className="stagger-item"
              variants={item}
              style={{ background: `linear-gradient(135deg, hsl(${240 + i * 3}, 70%, 50%), hsl(${260 + i * 3}, 70%, 40%))` }}
            />
          ))}
        </motion.div>
        <button className="replay-btn" onClick={() => setKey(k => k + 1)}>Replay</button>
      </div>
    </>
  );
}
