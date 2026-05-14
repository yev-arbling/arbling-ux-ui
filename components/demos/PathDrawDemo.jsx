'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function PathDrawDemo() {
  const [key, setKey] = React.useState(0);

  return (
    <>
      <h2 className="demo-title">Path Drawing</h2>
      <p className="demo-subtitle">SVG path draws itself using pathLength animation.</p>
      <div className="demo-area">
        <div className="path-wrap">
          <svg className="path-svg" viewBox="0 0 350 180" key={key}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="50%" stopColor="#764ba2" />
                <stop offset="100%" stopColor="#f093fb" />
              </linearGradient>
            </defs>
            <motion.path
              d="M20,140 Q70,40 120,90 T220,90 Q270,90 290,50 T340,70"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
          <button className="replay-btn" onClick={() => setKey(k => k + 1)}>Replay</button>
        </div>
      </div>
    </>
  );
}
