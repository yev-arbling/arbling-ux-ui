'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HeroStatsDemo() {
  const stats = [
    { value: 10000, suffix: '+', label: 'Active Users', icon: '👥', color: '#667eea' },
    { value: 99.9, suffix: '%', label: 'Uptime', icon: '⚡', color: '#00d4ff' },
    { value: 150, suffix: 'ms', label: 'Avg Response', icon: '🚀', color: '#00ff88' },
    { value: 24, suffix: '/7', label: 'Support', icon: '💬', color: '#f093fb' }
  ];

  const [key, setKey] = React.useState(0);

  const AnimatedNumber = ({ value, suffix, delay }) => {
    const [display, setDisplay] = React.useState(0);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });

    React.useEffect(() => {
      const timer = setTimeout(() => motionValue.set(value), delay * 1000);
      return () => clearTimeout(timer);
    }, [value, delay, key]);

    React.useEffect(() => {
      return springValue.on('change', (latest) => {
        setDisplay(value >= 100 ? Math.round(latest) : Math.round(latest * 10) / 10);
      });
    }, [springValue, value]);

    return <span>{display.toLocaleString()}{suffix}</span>;
  };

  return (
    <>
      <h2 className="demo-title">Hero Stats</h2>
      <p className="demo-subtitle">Spring-animated counters with icons and progress rings.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 900,
          padding: 60,
          borderRadius: 24,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            borderRadius: 24
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          <div style={{ position: 'relative', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                background: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                borderRadius: 20,
                marginBottom: 25
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88' }}
              />
              <span style={{ fontSize: '0.85rem', color: '#00ff88' }}>All systems operational</span>
            </motion.div>

            <motion.h1
              key={`title-${key}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: '2.8rem', marginBottom: 15 }}
            >
              Trusted by <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>thousands</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ color: '#888', marginBottom: 50, fontSize: '1.1rem' }}
            >
              Join the community of forward-thinking teams building the future
            </motion.p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 25
            }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={`${i}-${key}`}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 100 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  style={{
                    padding: 25,
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 20,
                    border: '1px solid rgba(255,255,255,0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  />

                  <motion.div
                    style={{ fontSize: '1.8rem', marginBottom: 12 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                  >
                    {stat.icon}
                  </motion.div>

                  <div style={{
                    fontSize: '2.8rem',
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}aa)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1
                  }}>
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={0.4 + i * 0.15} />
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem', marginTop: 8 }}>{stat.label}</div>

                  {/* Mini progress ring */}
                  <svg style={{ position: 'absolute', bottom: 10, right: 10, width: 30, height: 30, opacity: 0.3 }}>
                    <motion.circle
                      cx="15"
                      cy="15"
                      r="12"
                      fill="none"
                      stroke={stat.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="75"
                      initial={{ strokeDashoffset: 75 }}
                      animate={{ strokeDashoffset: 75 * (1 - (stat.value / (stat.value + 20))) }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 1 }}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                    />
                  </svg>
                </motion.div>
              ))}
            </div>

            <button className="replay-btn" style={{ marginTop: 30 }} onClick={() => setKey(k => k + 1)}>
              Replay Animation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
