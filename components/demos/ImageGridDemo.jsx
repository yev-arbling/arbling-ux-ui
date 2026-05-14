'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ImageGridDemo() {
  const [key, setKey] = React.useState(0);
  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
  ];

  return (
    <>
      <h2 className="demo-title">Image Reveal</h2>
      <p className="demo-subtitle">Images reveal with clip-path animation. Staggered entrance.</p>
      <div className="demo-area">
        <div className="image-reveal-wrap" key={key}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="image-reveal-item"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={img}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: i * 0.15 }}
              />
            </motion.div>
          ))}
        </div>
        <button className="replay-btn" onClick={() => setKey(k => k + 1)}>Replay</button>
      </div>
    </>
  );
}
