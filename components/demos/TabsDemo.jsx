'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TabsDemo() {
  const [active, setActive] = React.useState(0);
  const tabs = [
    { label: 'Overview', icon: '📊' },
    { label: 'Features', icon: '✨' },
    { label: 'Pricing', icon: '💎' }
  ];
  const content = [
    { title: 'Build Stunning UIs', desc: 'Framer Motion is the most powerful animation library for React. Create fluid, physics-based animations with minimal code.', stats: [{ label: 'Downloads', value: '2M+' }, { label: 'Stars', value: '20k+' }] },
    { title: 'Everything You Need', desc: 'Layout animations, gestures, exit animations, scroll-linked effects, and SVG path morphing - all in one library.', stats: [{ label: 'Components', value: '50+' }, { label: 'Examples', value: '100+' }] },
    { title: 'Free Forever', desc: 'Open source under MIT license. Use in personal and commercial projects without any restrictions.', stats: [{ label: 'Price', value: '$0' }, { label: 'License', value: 'MIT' }] },
  ];

  return (
    <>
      <h2 className="demo-title">Animated Tabs</h2>
      <p className="demo-subtitle">Sliding indicator with spring physics. Rich content transitions smoothly between tabs.</p>
      <div className="demo-area">
        <div style={{ width: '100%', maxWidth: 500 }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, position: 'relative' }}>
            <motion.div
              layoutId="tab-bg"
              style={{
                position: 'absolute',
                top: 4,
                height: 'calc(100% - 8px)',
                width: `calc(${100/tabs.length}% - 4px)`,
                left: `calc(${active * (100/tabs.length)}% + 2px)`,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: 10,
                boxShadow: '0 4px 15px rgba(102,126,234,0.4)'
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: active === i ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'color 0.2s'
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 24, minHeight: 150 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 10 }}>{content[active].title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 20 }}>{content[active].desc}</p>
                <div style={{ display: 'flex', gap: 30 }}>
                  {content[active].stats.map((stat, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
