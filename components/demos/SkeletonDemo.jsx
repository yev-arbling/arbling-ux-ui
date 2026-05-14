'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function SkeletonDemo() {
  const [loading, setLoading] = React.useState(true);
  const [layout, setLayout] = React.useState('card');
  const [shimmer, setShimmer] = React.useState('wave');

  React.useEffect(() => {
    const t = setInterval(() => setLoading(l => !l), 4000);
    return () => clearInterval(t);
  }, []);

  const layouts = [
    { id: 'card', label: 'Card', icon: '🃏' },
    { id: 'list', label: 'List', icon: '📋' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  ];

  const shimmers = [
    { id: 'wave', label: 'Wave' },
    { id: 'pulse', label: 'Pulse' },
    { id: 'gradient', label: 'Gradient' },
  ];

  const getShimmerAnimation = () => {
    if (shimmer === 'pulse') return { opacity: [0.4, 0.8, 0.4] };
    if (shimmer === 'gradient') return { background: ['linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)', 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)'] };
    return { backgroundPosition: ['200% 0', '-200% 0'] };
  };

  const SkeletonBox = ({ w = '100%', h = 12, radius = 6, delay = 0 }) => (
    <motion.div
      style={{
        width: w, height: h, borderRadius: radius,
        background: shimmer === 'wave' ? 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.03) 100%)' : 'rgba(255,255,255,0.06)',
        backgroundSize: '200% 100%',
      }}
      animate={getShimmerAnimation()}
      transition={{ duration: shimmer === 'pulse' ? 1 : 1.5, repeat: Infinity, delay }}
    />
  );

  return (
    <>
      <h2 className="demo-title">Skeleton Loading</h2>
      <p className="demo-subtitle">Multiple layouts (card, list, dashboard) with wave, pulse, and gradient shimmer styles</p>
      <div className="demo-area">
        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {layouts.map(l => (
              <motion.button
                key={l.id}
                onClick={() => setLayout(l.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: layout === l.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  color: '#fff', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {l.icon} {l.label}
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {shimmers.map(s => (
              <motion.button
                key={s.id}
                onClick={() => setShimmer(s.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: shimmer === s.id ? 'rgba(67, 233, 123, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: shimmer === s.id ? '#43e97b' : '#888', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {s.label}
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={() => setLoading(l => !l)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '6px 12px', borderRadius: '8px', border: 'none',
              background: loading ? 'rgba(245, 87, 108, 0.2)' : 'rgba(67, 233, 123, 0.2)',
              color: loading ? '#f5576c' : '#43e97b', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
            }}
          >
            {loading ? '⏸ Stop' : '▶ Start'}
          </motion.button>
        </div>

        {/* Card Layout */}
        {layout === 'card' && (
          <motion.div layout style={{ width: 320, padding: 20, background: 'rgba(15,15,25,0.9)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SkeletonBox w="100%" h={140} radius={12} />
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                      <SkeletonBox w={48} h={48} radius={12} delay={0.1} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <SkeletonBox w="70%" h={14} delay={0.2} />
                        <SkeletonBox w="50%" h={10} delay={0.3} />
                      </div>
                    </div>
                    <SkeletonBox w="100%" h={10} delay={0.4} />
                    <div style={{ marginTop: 8 }}><SkeletonBox w="80%" h={10} delay={0.5} /></div>
                    <div style={{ marginTop: 8 }}><SkeletonBox w="60%" h={10} delay={0.6} /></div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ height: 140, borderRadius: 12, background: 'linear-gradient(135deg, #667eea, #764ba2)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🎨</div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #f5576c, #f093fb)' }} />
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>Sarah Johnson</div>
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>Product Designer</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.5 }}>Creating beautiful interfaces that users love. Passionate about motion design.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* List Layout */}
        {layout === 'list' && (
          <motion.div layout style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[0, 1, 2, 3].map(i => (
              <motion.div key={i} style={{ padding: 16, background: 'rgba(15,15,25,0.9)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="skel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <SkeletonBox w={44} h={44} radius="50%" delay={i * 0.1} />
                      <div style={{ flex: 1 }}>
                        <SkeletonBox w="60%" h={12} delay={i * 0.1 + 0.1} />
                        <div style={{ marginTop: 8 }}><SkeletonBox w="40%" h={10} delay={i * 0.1 + 0.2} /></div>
                      </div>
                      <SkeletonBox w={60} h={28} radius={8} delay={i * 0.1 + 0.3} />
                    </motion.div>
                  ) : (
                    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: ['#667eea', '#f5576c', '#43e97b', '#fbbf24'][i] }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{['Alex Chen', 'Maria Garcia', 'James Wilson', 'Emma Davis'][i]}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{['Engineer', 'Designer', 'Manager', 'Analyst'][i]}</div>
                      </div>
                      <div style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(67, 233, 123, 0.15)', color: '#43e97b', fontSize: '0.7rem', fontWeight: 600 }}>Active</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Dashboard Layout */}
        {layout === 'dashboard' && (
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: 500 }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} style={{ padding: 16, background: 'rgba(15,15,25,0.9)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="skel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <SkeletonBox w={32} h={32} radius={8} delay={i * 0.1} />
                      <div style={{ marginTop: 12 }}><SkeletonBox w="50%" h={24} delay={i * 0.1 + 0.1} /></div>
                      <div style={{ marginTop: 8 }}><SkeletonBox w="70%" h={10} delay={i * 0.1 + 0.2} /></div>
                      <div style={{ marginTop: 12 }}><SkeletonBox w="100%" h={6} radius={3} delay={i * 0.1 + 0.3} /></div>
                    </motion.div>
                  ) : (
                    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div style={{ fontSize: '1.5rem' }}>{['📈', '👥', '💰'][i]}</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 8, color: ['#667eea', '#43e97b', '#fbbf24'][i] }}>{['2,847', '1,234', '$45.2K'][i]}</div>
                      <div style={{ fontSize: '0.7rem', color: '#888', marginTop: 4 }}>{['Total Views', 'Active Users', 'Revenue'][i]}</div>
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 12, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: ['75%', '60%', '85%'][i], background: `linear-gradient(90deg, ${['#667eea', '#43e97b', '#fbbf24'][i]}, ${['#764ba2', '#38f9d7', '#f97316'][i]})`, borderRadius: 3 }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
