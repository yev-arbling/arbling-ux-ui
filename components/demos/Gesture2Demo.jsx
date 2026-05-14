'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function Gesture2Demo() {
  const x = useMotionValue(0);
  const [unlocked, setUnlocked] = React.useState(false);
  const bg = useTransform(x, [0, 220], ['#667eea', '#4ade80']);
  const trackBg = useTransform(x, [0, 220], ['rgba(255,255,255,0.1)', 'rgba(74, 222, 128, 0.2)']);

  const handleDragEnd = () => {
    if (x.get() > 180) setUnlocked(true);
    else x.set(0);
  };

  const reset = () => { setUnlocked(false); x.set(0); };

  return (
    <>
      <h2 className="demo-title">Slide to Unlock</h2>
      <p className="demo-subtitle">Drag gesture with threshold detection. Color transforms based on drag position.</p>
      <div className="demo-area">
        <motion.div className="gesture-track" style={{ background: trackBg }}>
          {!unlocked ? (
            <motion.div
              className="gesture-thumb"
              drag="x"
              dragConstraints={{ left: 0, right: 220 }}
              dragElastic={0}
              onDragEnd={handleDragEnd}
              style={{ x, background: bg }}
              whileDrag={{ scale: 1.1 }}
            >
              →
            </motion.div>
          ) : (
            <motion.div
              className="gesture-thumb"
              initial={{ x: 220 }}
              animate={{ scale: [1, 1.2, 1] }}
              style={{ x: 220, background: '#4ade80' }}
            >
              ✓
            </motion.div>
          )}
        </motion.div>
        {unlocked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#4ade80', marginTop: 20 }}>
            Unlocked! <button className="replay-btn" style={{ marginLeft: 15 }} onClick={reset}>Reset</button>
          </motion.div>
        )}
      </div>
    </>
  );
}
