'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function BlurFadeDemo() {
  const [key, setKey] = React.useState(0);
  const items = ['Design', 'Develop', 'Deploy', 'Iterate'];

  const blurFadeVariants = {
    hidden: { y: -8, opacity: 0, filter: 'blur(8px)' },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <>
      <h2 className="demo-title">Blur Fade</h2>
      <p className="demo-subtitle">Elements reveal with a combined blur and fade effect. Popular in modern landing pages.</p>
      <div className="demo-area">
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          {items.map((item, i) => (
            <motion.div
              key={item}
              custom={i}
              variants={blurFadeVariants}
              initial="hidden"
              animate="visible"
              style={{
                padding: '20px 50px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                borderRadius: 12,
                fontSize: '1.5rem',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
        <button className="replay-btn" onClick={() => setKey(k => k + 1)}>Replay</button>
      </div>
    </>
  );
}
