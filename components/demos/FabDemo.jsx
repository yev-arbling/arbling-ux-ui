'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FabDemo() {
  const [open, setOpen] = React.useState(false);
  const items = [
    { icon: '📝', label: 'New Note', bg: '#667eea' },
    { icon: '📷', label: 'Upload Photo', bg: '#f093fb' },
    { icon: '🎵', label: 'Record Audio', bg: '#43e97b' },
    { icon: '📎', label: 'Attach File', bg: '#4facfe' }
  ];

  return (
    <>
      <h2 className="demo-title">Floating Action Button</h2>
      <p className="demo-subtitle">Click to expand. Clean vertical menu with staggered spring animations.</p>
      <div className="demo-area">
        <div style={{ position: 'relative', height: 300, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <AnimatePresence>
              {open && items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24, delay: i * 0.05 }}
                  style={{
                    position: 'absolute',
                    bottom: 70 + (i * 60),
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    style={{
                      padding: '8px 14px',
                      background: 'rgba(20,20,30,0.95)',
                      borderRadius: 8,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    {item.label}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      border: 'none',
                      background: item.bg,
                      fontSize: '1.3rem',
                      cursor: 'pointer',
                      boxShadow: `0 4px 20px ${item.bg}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.button
              onClick={() => setOpen(!open)}
              animate={{ rotate: open ? 45 : 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: 'none',
                background: open ? 'linear-gradient(135deg, #ef4444, #f97316)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                fontSize: '2rem',
                fontWeight: 300,
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 6px 25px rgba(102,126,234,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              +
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
