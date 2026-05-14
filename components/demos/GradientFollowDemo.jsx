'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder, useMotionTemplate } from 'framer-motion';

export default function GradientFollowDemo() {
  const containerRef = React.useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.2) 40%, transparent 70%)`;

  return (
    <>
      <h2 className="demo-title">Gradient Follow</h2>
      <p className="demo-subtitle">Large gradient blob smoothly follows cursor with spring physics.</p>
      <div className="demo-area">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          style={{
            width: 500,
            height: 300,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'crosshair'
          }}
        >
          <motion.div style={{ position: 'absolute', inset: 0, background, pointerEvents: 'none' }} />
          <p style={{ color: '#666', fontSize: '0.9rem', position: 'relative' }}>Move your cursor around</p>
        </motion.div>
      </div>
    </>
  );
}
