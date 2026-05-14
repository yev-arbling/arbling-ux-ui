'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function DockDemo() {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const dockItems = [
    { emoji: '🏠', label: 'Home', color: '#667eea' },
    { emoji: '📁', label: 'Files', color: '#f093fb' },
    { emoji: '💬', label: 'Messages', color: '#43e97b' },
    { emoji: '🎵', label: 'Music', color: '#f5576c' },
    { emoji: '📷', label: 'Photos', color: '#4facfe' },
    { emoji: '⚙️', label: 'Settings', color: '#764ba2' },
    { emoji: '🗑️', label: 'Trash', color: '#9ca3af' }
  ];

  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    const diff = Math.abs(hoveredIndex - index);
    if (diff === 0) return 1.5;
    if (diff === 1) return 1.25;
    return 1;
  };

  return (
    <>
      <h2 className="demo-title">macOS Dock</h2>
      <p className="demo-subtitle">Hover to magnify icons. Adjacent items scale proportionally with smooth spring physics.</p>
      <div className="demo-area">
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 4,
          padding: '14px 20px',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}>
          {dockItems.map((item, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale: getScale(i),
                y: hoveredIndex === i ? -12 : 0
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                borderRadius: 12,
                cursor: 'pointer',
                position: 'relative',
                transformOrigin: 'bottom center'
              }}
            >
              {item.emoji}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: -36,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '5px 10px',
                      background: 'rgba(20,20,30,0.95)',
                      borderRadius: 6,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
        </div>
      </div>
    </>
  );
}
