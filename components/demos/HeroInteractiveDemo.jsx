'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder, useMotionTemplate } from 'framer-motion';

export default function HeroInteractiveDemo() {
  const containerRef = React.useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const textX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['20%', '80%']);
  const gradientAngle = useTransform(mouseX, [-0.5, 0.5], [0, 360]);

  // Generate floating particles
  const particles = React.useMemo(() =>
    [...Array(30)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      depth: 0.3 + Math.random() * 0.7
    })), []);

  return (
    <>
      <h2 className="demo-title">Hero Interactive</h2>
      <p className="demo-subtitle">Fully reactive parallax with particles, glows, and depth layers.</p>
      <div className="demo-area">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          style={{
            width: '100%',
            maxWidth: 900,
            height: 450,
            borderRadius: 24,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'none',
            background: '#0a0a15'
          }}
        >
          {/* Dynamic gradient background */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, rgba(102, 126, 234, 0.15), transparent 60%)`
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: useMotionTemplate`radial-gradient(400px circle at ${glowX} ${glowY}, rgba(240, 147, 251, 0.1), transparent 50%)`
            }}
          />

          {/* Grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          {/* Floating particles with parallax */}
          {particles.map((particle, i) => {
            const px = useTransform(smoothX, [-0.5, 0.5], [-(30 * particle.depth), (30 * particle.depth)]);
            const py = useTransform(smoothY, [-0.5, 0.5], [-(30 * particle.depth), (30 * particle.depth)]);
            return (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  borderRadius: '50%',
                  background: `rgba(102, 126, 234, ${0.2 + particle.depth * 0.4})`,
                  boxShadow: `0 0 ${particle.size * 2}px rgba(102, 126, 234, ${particle.depth * 0.3})`,
                  x: px,
                  y: py
                }}
              />
            );
          })}

          {/* Concentric rings with parallax */}
          {[...Array(6)].map((_, i) => {
            const depth = (i + 1) / 6;
            const x = useTransform(smoothX, [-0.5, 0.5], [-(50 * depth), (50 * depth)]);
            const y = useTransform(smoothY, [-0.5, 0.5], [-(50 * depth), (50 * depth)]);
            const opacity = 0.15 - i * 0.02;
            return (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: 120 + i * 60,
                  height: 120 + i * 60,
                  border: `1px solid rgba(102, 126, 234, ${opacity})`,
                  borderRadius: '50%',
                  left: '50%',
                  top: '50%',
                  marginLeft: -(60 + i * 30),
                  marginTop: -(60 + i * 30),
                  x,
                  y
                }}
              />
            );
          })}

          {/* Main content */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              x: textX,
              y: textY
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '8px 16px',
                background: 'rgba(102, 126, 234, 0.2)',
                borderRadius: 20,
                marginBottom: 20,
                border: '1px solid rgba(102, 126, 234, 0.3)'
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#667eea' }}>✦ Interactive Experience</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '3.2rem',
                marginBottom: 15,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Move your cursor
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#888', marginBottom: 30 }}
            >
              Watch every element respond to your movement
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.85rem',
                color: '#888'
              }}
            >
              <span style={{ color: '#667eea' }}>X:</span> {Math.round(mouseX.get() * 100)}% <span style={{ margin: '0 10px', color: '#333' }}>|</span>
              <span style={{ color: '#764ba2' }}>Y:</span> {Math.round(mouseY.get() * 100)}%
            </motion.div>
          </motion.div>

          {/* Custom cursor */}
          <motion.div
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: '2px solid #667eea',
              pointerEvents: 'none',
              left: useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']),
              top: useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']),
              marginLeft: -10,
              marginTop: -10,
              boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#667eea',
              pointerEvents: 'none',
              left: useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']),
              top: useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']),
              marginLeft: -3,
              marginTop: -3
            }}
          />

          {/* Border glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 24,
            border: '1px solid rgba(102, 126, 234, 0.2)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>
    </>
  );
}
