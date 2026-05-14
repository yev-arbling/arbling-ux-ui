'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function BentoDemo() {
  const items = [
    { span: 2, icon: '🚀', title: 'Ship Faster', desc: 'Deploy in seconds' },
    { span: 1, icon: '🔒', title: 'Secure', desc: 'Enterprise ready' },
    { span: 1, icon: '📊', title: 'Analytics', desc: 'Real-time insights' },
    { span: 1, icon: '🎨', title: 'Design', desc: 'Beautiful UI' },
    { span: 2, icon: '⚡', title: 'Performance', desc: 'Blazing fast' }
  ];

  return (
    <>
      <h2 className="demo-title">Bento Grid</h2>
      <p className="demo-subtitle">Interactive bento-style grid with staggered animations and hover effects.</p>
      <div className="demo-area">
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 140px)', gap: 15 }}
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
              whileHover={{ scale: 1.05, y: -5 }}
              style={{
                gridColumn: `span ${item.span}`,
                padding: 20,
                borderRadius: 16,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 4 }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '0.75rem' }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
