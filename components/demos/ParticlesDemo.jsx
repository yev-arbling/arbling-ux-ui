'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ParticlesDemo() {
  const [particles, setParticles] = React.useState([]);
  const ref = React.useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const p = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      color: `hsl(${Math.random() * 60 + 220}, 80%, 60%)`
    };
    setParticles(prev => [...prev.slice(-25), p]);
  };

  return (
    <>
      <h2 className="demo-title">Particle Trail</h2>
      <p className="demo-subtitle">Move your mouse. Particles spawn and fade with AnimatePresence lifecycle.</p>
      <div className="demo-area">
        <div className="particles-area" ref={ref} onMouseMove={handleMove}>
          <AnimatePresence>
            {particles.map(p => (
              <motion.div
                key={p.id}
                className="particle"
                style={{ left: p.x, top: p.y, background: p.color, boxShadow: `0 0 15px ${p.color}` }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.5, 0], opacity: [1, 0.8, 0], y: [0, -40] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            ))}
          </AnimatePresence>
          <span className="particles-text">Move Mouse</span>
        </div>
      </div>
    </>
  );
}
