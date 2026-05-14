'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ScrollProgressDemo() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const percentValue = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const sections = [
    { title: 'Getting Started', text: 'Scroll down to see progress tracking in action. The gradient bar at the top reflects your scroll position.', icon: '🚀', color: '#667eea' },
    { title: 'Core Features', text: 'Cards animate smoothly when they enter the viewport using useInView hook. Combined with spring physics for natural motion.', icon: '✨', color: '#f093fb' },
    { title: 'Best Practices', text: 'Use scroll-linked animations sparingly. They work best for progress indicators and parallax effects.', icon: '💡', color: '#43e97b' },
  ];

  return (
    <div className="scroll-progress-wrap">
      <motion.div
        className="scroll-progress-bar"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
          boxShadow: '0 0 20px rgba(102,126,234,0.5)'
        }}
      />
      <motion.div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        padding: '8px 16px',
        background: 'rgba(20,20,30,0.9)',
        borderRadius: 20,
        fontSize: '0.85rem',
        fontWeight: 700,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 1000
      }}>
        <motion.span style={{ color: '#667eea' }}>{useTransform(percentValue, v => Math.round(v))}</motion.span>%
      </motion.div>
      <div className="scroll-content">
        {sections.map((s, i) => (
          <ScrollSection key={i} {...s} index={i} />
        ))}
      </div>
    </div>
  );
}
