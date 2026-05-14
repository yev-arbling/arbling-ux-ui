'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder, useMotionTemplate } from 'framer-motion';

export default function FeatureGridDemo() {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-millisecond response times with edge deployment and smart caching', color: '#ffd700', gradient: 'linear-gradient(135deg, #ffd700, #ff9500)' },
    { icon: '🔐', title: 'Bank-Level Security', desc: 'SOC2 compliant with end-to-end encryption and zero-trust architecture', color: '#00ff88', gradient: 'linear-gradient(135deg, #00ff88, #00d4ff)' },
    { icon: '📱', title: 'Responsive Design', desc: 'Pixel-perfect on every device from mobile to 4K displays', color: '#00d4ff', gradient: 'linear-gradient(135deg, #00d4ff, #667eea)' },
    { icon: '🎨', title: 'Fully Customizable', desc: 'Extensive theming system with CSS variables and design tokens', color: '#f093fb', gradient: 'linear-gradient(135deg, #f093fb, #764ba2)' },
    { icon: '🔄', title: 'Real-time Sync', desc: 'Instant updates with WebSocket connections and CRDT conflict resolution', color: '#667eea', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { icon: '📊', title: 'Advanced Analytics', desc: 'AI-powered insights with custom dashboards and automated reporting', color: '#ff6b6b', gradient: 'linear-gradient(135deg, #ff6b6b, #ffd700)' }
  ];

  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const containerRef = React.useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <>
      <h2 className="demo-title">Feature Grid</h2>
      <p className="demo-subtitle">Premium feature showcase with spotlight effect, icons, and detailed descriptions.</p>
      <div className="demo-area">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          style={{
            width: '100%',
            maxWidth: 900,
            position: 'relative'
          }}
        >
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                background: 'rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 20,
                marginBottom: 20
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#667eea' }}>✦ Features</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '2.5rem', marginBottom: 15 }}
            >
              Everything you need to{' '}
              <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>ship faster</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#888', maxWidth: 500, margin: '0 auto' }}
            >
              A complete toolkit designed for modern development teams
            </motion.p>
          </div>

          {/* Feature grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20
          }}>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 100 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                style={{
                  padding: 30,
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Spotlight effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${feature.color}15, transparent 80%)`,
                    opacity: hoveredIndex === i ? 1 : 0,
                    transition: 'opacity 0.3s'
                  }}
                />

                {/* Top line accent */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: feature.gradient,
                    originX: 0
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon with glow */}
                <motion.div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                    fontSize: '2rem',
                    position: 'relative'
                  }}
                  animate={{
                    boxShadow: hoveredIndex === i ? `0 0 30px ${feature.color}40` : '0 0 0 transparent'
                  }}
                >
                  <motion.span
                    animate={{ scale: hoveredIndex === i ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.span>
                </motion.div>

                <div style={{ position: 'relative' }}>
                  <div style={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    marginBottom: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    {feature.title}
                    <motion.span
                      style={{ color: feature.color, fontSize: '0.9rem' }}
                      animate={{ x: hoveredIndex === i ? 5 : 0 }}
                    >
                      →
                    </motion.span>
                  </div>
                  <div style={{
                    color: '#777',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}>
                    {feature.desc}
                  </div>
                </div>

                {/* Corner decoration */}
                <div style={{
                  position: 'absolute',
                  bottom: -30,
                  right: -30,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: `${feature.color}05`,
                  filter: 'blur(20px)',
                  pointerEvents: 'none'
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
