'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function Cube3DDemo() {
  const [rotation, setRotation] = React.useState({ x: -20, y: 30 });
  const [autoRotate, setAutoRotate] = React.useState(true);

  React.useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotation(r => ({ x: r.x, y: r.y + 1 }));
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMouseMove = (e) => {
    setAutoRotate(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -60;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    setRotation({ x, y });
  };

  const faces = [
    { icon: '🎯', label: 'Focus', bg: 'linear-gradient(135deg, #667eea, #764ba2)', transform: 'translateZ(70px)' },
    { icon: '🎨', label: 'Create', bg: 'linear-gradient(135deg, #764ba2, #f093fb)', transform: 'translateZ(-70px) rotateY(180deg)' },
    { icon: '🚀', label: 'Launch', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', transform: 'translateX(-70px) rotateY(-90deg)' },
    { icon: '⚡', label: 'Speed', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', transform: 'translateX(70px) rotateY(90deg)' },
    { icon: '🔥', label: 'Power', bg: 'linear-gradient(135deg, #f5576c, #ffc371)', transform: 'translateY(-70px) rotateX(90deg)' },
    { icon: '💎', label: 'Premium', bg: 'linear-gradient(135deg, #00f2fe, #43e97b)', transform: 'translateY(70px) rotateX(-90deg)' },
  ];

  return (
    <>
      <h2 className="demo-title">3D Cube</h2>
      <p className="demo-subtitle">Move mouse to control. Click to toggle auto-rotation. Each face has a gradient.</p>
      <div className="demo-area">
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(102,126,234,0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }} />
          <div
            style={{ perspective: 1000, width: 280, height: 280, cursor: 'grab' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setAutoRotate(true)}
            onClick={() => setAutoRotate(!autoRotate)}
          >
            <motion.div
              style={{
                width: 140,
                height: 140,
                position: 'relative',
                transformStyle: 'preserve-3d',
                margin: '70px auto'
              }}
              animate={{ rotateX: rotation.x, rotateY: rotation.y }}
              transition={{ type: 'spring', stiffness: 80, damping: 12 }}
            >
              {faces.map((face, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: 140,
                  height: 140,
                  background: face.bg,
                  transform: face.transform,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: 12,
                  boxShadow: 'inset 0 0 30px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{face.icon}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.9 }}>{face.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 10, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            {autoRotate ? '🔄 Auto-rotating' : '✋ Manual mode'}
          </div>
        </div>
      </div>
    </>
  );
}
