'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder, useMotionTemplate } from 'framer-motion';

export default function AuroraDemo() {
  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
  const color = useMotionValue(COLORS[0]);
  const border = useMotionTemplate`2px solid ${color}`;
  const shadow = useMotionTemplate`0 0 25px ${color}`;

  React.useEffect(() => {
    animate(color, [...COLORS, COLORS[0]], { duration: 6, repeat: Infinity, ease: 'linear' });
  }, []);

  return (
    <>
      <h2 className="demo-title">Aurora Button</h2>
      <p className="demo-subtitle">Animated gradient border using useMotionTemplate. Cycles through colors infinitely.</p>
      <div className="demo-area">
        <motion.button className="aurora-btn" style={{ border, boxShadow: shadow }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          GLOWING BUTTON
        </motion.button>
      </div>
    </>
  );
}
