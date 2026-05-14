'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FeatureShowcaseDemo() {
  const [activeFeature, setActiveFeature] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const features = [
    {
      title: 'Real-time Collaboration',
      subtitle: 'Work together, anywhere',
      desc: 'See live cursors, instant updates, and seamless sync across all devices. Collaborate like you\'re in the same room.',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      stats: [{ label: 'Active users', value: '2.4M' }, { label: 'Sync latency', value: '<50ms' }],
      visual: 'collab'
    },
    {
      title: 'AI-Powered Workflows',
      subtitle: 'Intelligence at every step',
      desc: 'Let AI handle the repetitive work. Smart suggestions, auto-completion, and predictive actions that learn from you.',
      color: '#f5576c',
      gradient: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
      stats: [{ label: 'Time saved', value: '40hrs/wk' }, { label: 'Accuracy', value: '99.2%' }],
      visual: 'ai'
    },
    {
      title: 'Deep Analytics',
      subtitle: 'Insights that matter',
      desc: 'Beautiful dashboards, real-time metrics, and predictive analytics. Know what\'s happening before it happens.',
      color: '#43e97b',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      stats: [{ label: 'Data points', value: '1B+/day' }, { label: 'Reports', value: '50+ types' }],
      visual: 'analytics'
    },
  ];

  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setActiveFeature(f => (f + 1) % features.length);
          return 0;
        }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isHovered]);

  const PhoneMockup = ({ children, color }) => (
    <motion.div
      style={{
        width: 160, height: 280,
        background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)',
        borderRadius: '28px',
        padding: '8px',
        boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)`,
        position: 'relative',
      }}
      initial={{ rotateY: -15, rotateX: 5 }}
      animate={{ rotateY: isHovered ? 0 : -15, rotateX: isHovered ? 0 : 5 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div style={{
        width: '100%', height: '100%',
        background: '#0a0a12',
        borderRadius: '22px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 50, height: 4, background: '#222', borderRadius: 2 }} />
        {children}
      </div>
      <motion.div
        style={{
          position: 'absolute', inset: -2,
          borderRadius: '30px',
          background: `linear-gradient(135deg, ${color}40, transparent, ${color}20)`,
          opacity: 0, zIndex: -1,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );

  const VisualDemo = ({ type, color }) => {
    if (type === 'collab') {
      const cursors = [
        { name: 'Sarah', color: '#667eea', x: 60, y: 80 },
        { name: 'Mike', color: '#f5576c', x: 100, y: 140 },
        { name: 'Alex', color: '#43e97b', x: 40, y: 180 },
      ];
      return (
        <PhoneMockup color={color}>
          <div style={{ padding: '20px 12px', height: '100%' }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {[1, 2, 3].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 1 ? '#ef4444' : i === 2 ? '#fbbf24' : '#22c55e' }} />)}
            </div>
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                style={{ height: i === 0 ? 30 : 10, background: 'rgba(255,255,255,0.08)', borderRadius: 4, marginBottom: 8, width: i === 3 ? '60%' : '100%' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
            {cursors.map((c, i) => (
              <motion.div
                key={c.name}
                style={{ position: 'absolute', left: c.x, top: c.y }}
                animate={{ x: [0, 20, -10, 15, 0], y: [0, -15, 10, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill={c.color}>
                  <path d="M0 0L16 12L8 12L4 20L0 0Z" />
                </svg>
                <motion.span
                  style={{
                    position: 'absolute', left: 12, top: 12,
                    background: c.color, color: '#fff',
                    fontSize: '0.5rem', padding: '2px 4px', borderRadius: 3,
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  {c.name}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </PhoneMockup>
      );
    }
    if (type === 'ai') {
      return (
        <PhoneMockup color={color}>
          <div style={{ padding: '20px 12px', height: '100%' }}>
            <motion.div
              style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${color}, #f093fb)`, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <span style={{ fontSize: '0.9rem' }}>✨</span>
            </motion.div>
            <div style={{ fontSize: '0.65rem', color: '#888', marginBottom: 8 }}>AI is thinking...</div>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                style={{ marginBottom: 8 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.4 }}
              >
                <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', background: `linear-gradient(90deg, ${color}, #f093fb)`, borderRadius: 4 }}
                    initial={{ width: 0 }}
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 1.5, delay: i * 0.4 }}
                  />
                </div>
              </motion.div>
            ))}
            <motion.div
              style={{
                marginTop: 16, padding: '10px', background: `${color}20`,
                borderRadius: 10, border: `1px solid ${color}40`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
            >
              <div style={{ fontSize: '0.6rem', color: color, fontWeight: 600, marginBottom: 4 }}>💡 Suggestion</div>
              <div style={{ fontSize: '0.55rem', color: '#aaa', lineHeight: 1.4 }}>Based on your data, try scheduling posts at 9am for 3x engagement.</div>
            </motion.div>
          </div>
        </PhoneMockup>
      );
    }
    return (
      <PhoneMockup color={color}>
        <div style={{ padding: '20px 12px', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.65rem', color: '#888' }}>Dashboard</span>
            <motion.span
              style={{ fontSize: '0.55rem', color: color, background: `${color}20`, padding: '2px 6px', borderRadius: 4 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LIVE
            </motion.span>
          </div>
          <motion.div
            style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            $128,420
          </motion.div>
          <motion.div style={{ fontSize: '0.6rem', color: '#43e97b', marginBottom: 16 }}>
            ↑ 23.5% from last week
          </motion.div>
          <svg width="100%" height="60" viewBox="0 0 140 60" preserveAspectRatio="none">
            <motion.path
              d="M0 50 Q20 45, 35 35 T70 30 T105 20 T140 10"
              fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />
            <motion.path
              d="M0 50 Q20 45, 35 35 T70 30 T105 20 T140 10 L140 60 L0 60 Z"
              fill={`${color}30`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </svg>
          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            {['1D', '1W', '1M', '1Y'].map((t, i) => (
              <motion.div
                key={t}
                style={{
                  flex: 1, textAlign: 'center', padding: '4px',
                  background: i === 2 ? color : 'rgba(255,255,255,0.05)',
                  borderRadius: 4, fontSize: '0.5rem', color: i === 2 ? '#fff' : '#666',
                }}
                whileHover={{ scale: 1.1 }}
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </PhoneMockup>
    );
  };

  const f = features[activeFeature];

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Feature Showcase</h2>
        <p className="demo-subtitle">3D device mockups with live UI demos, auto-cycling with progress indicator</p>
      </div>
      <div className="demo-area">
        <div
          style={{ maxWidth: '620px', margin: '0 auto' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', justifyContent: 'center' }}>
            {features.map((feat, i) => (
              <motion.button
                key={i}
                onClick={() => { setActiveFeature(i); setProgress(0); }}
                style={{
                  padding: '10px 18px', borderRadius: '10px', border: 'none',
                  background: activeFeature === i ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: activeFeature === i ? '#fff' : '#666', fontSize: '0.8rem',
                  cursor: 'pointer', fontWeight: 600, position: 'relative', overflow: 'hidden',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.08)' }}
              >
                {feat.title.split(' ')[0]}
                {activeFeature === i && (
                  <motion.div
                    style={{
                      position: 'absolute', bottom: 0, left: 0, height: 2,
                      background: feat.color,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              style={{
                background: 'rgba(15,15,25,0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                overflow: 'hidden',
                border: `1px solid ${f.color}30`,
                boxShadow: `0 30px 60px rgba(0,0,0,0.4), 0 0 80px ${f.color}10`,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '320px' }}>
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <motion.div
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: `${f.color}15`, padding: '6px 12px', borderRadius: '20px',
                      width: 'fit-content', marginBottom: '16px',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <motion.span
                      style={{ width: 6, height: 6, borderRadius: '50%', background: f.color }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span style={{ fontSize: '0.7rem', color: f.color, fontWeight: 600 }}>{f.subtitle}</span>
                  </motion.div>

                  <motion.h3
                    style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {f.title}
                  </motion.h3>

                  <motion.p
                    style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '20px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {f.desc}
                  </motion.p>

                  <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    {f.stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: f.color }}>{stat.value}</div>
                        <div style={{ fontSize: '0.7rem', color: '#666' }}>{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    style={{
                      padding: '12px 24px', borderRadius: '10px', border: 'none',
                      background: f.gradient, color: '#fff',
                      fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem',
                      boxShadow: `0 10px 30px ${f.color}40`,
                    }}
                    whileHover={{ scale: 1.03, boxShadow: `0 15px 40px ${f.color}50` }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Explore {f.title.split(' ')[0]} →
                  </motion.button>
                </div>

                <div style={{
                  background: `radial-gradient(circle at 70% 30%, ${f.color}20 0%, transparent 60%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  perspective: '1000px', padding: '20px',
                }}>
                  <VisualDemo type={f.visual} color={f.color} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
