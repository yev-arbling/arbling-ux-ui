'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function Book3DDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <h2 className="demo-title">3D Book</h2>
      <p className="demo-subtitle">Click to open/close the book. Uses perspective and rotateY on the cover.</p>
      <div className="demo-area">
        <div style={{ perspective: 1200 }}>
          <div
            style={{
              width: 200,
              height: 280,
              position: 'relative',
              transformStyle: 'preserve-3d',
              cursor: 'pointer'
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Pages (back) */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #f5f5f5, #e0e0e0)',
              borderRadius: '0 8px 8px 0',
              boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ padding: 20, color: '#333', fontSize: '0.8rem' }}>
                <h4 style={{ marginBottom: 10, color: '#667eea' }}>Chapter 1</h4>
                <p>The story begins with a simple animation...</p>
              </div>
            </div>
            {/* Cover */}
            <motion.div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '0 8px 8px 0',
                transformOrigin: 'left center',
                boxShadow: '5px 5px 20px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              animate={{ rotateY: isOpen ? -160 : 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 50, damping: 15 }}
            >
              <div style={{ fontSize: '3rem', marginBottom: 15 }}>📖</div>
              <h3 style={{ fontSize: '1rem' }}>The Motion Book</h3>
              <p style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: 5 }}>Click to {isOpen ? 'close' : 'open'}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
