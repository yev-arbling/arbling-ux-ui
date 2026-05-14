'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ClipPathDemo() {
  const [key, setKey] = React.useState(0);
  const directions = ['left', 'right', 'top', 'bottom', 'circle'];
  const [direction, setDirection] = React.useState('left');

  const clipPaths = {
    left: {
      initial: 'inset(0 100% 0 0)',
      animate: 'inset(0 0% 0 0)'
    },
    right: {
      initial: 'inset(0 0 0 100%)',
      animate: 'inset(0 0 0 0%)'
    },
    top: {
      initial: 'inset(0 0 100% 0)',
      animate: 'inset(0 0 0% 0)'
    },
    bottom: {
      initial: 'inset(100% 0 0 0)',
      animate: 'inset(0% 0 0 0)'
    },
    circle: {
      initial: 'circle(0% at 50% 50%)',
      animate: 'circle(100% at 50% 50%)'
    }
  };

  return (
    <>
      <h2 className="demo-title">Clip Path Reveal</h2>
      <p className="demo-subtitle">Content reveals using CSS clip-path animations. Various directions available.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
          {directions.map(d => (
            <button
              key={d}
              className={`replay-btn ${direction === d ? 'primary-btn' : ''}`}
              onClick={() => { setDirection(d); setKey(k => k + 1); }}
            >
              {d}
            </button>
          ))}
        </div>
        <motion.div
          key={key + direction}
          initial={{ clipPath: clipPaths[direction].initial }}
          animate={{ clipPath: clipPaths[direction].animate }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 350,
            height: 200,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 600
          }}
        >
          Clip Path Reveal
        </motion.div>
      </div>
    </>
  );
}
