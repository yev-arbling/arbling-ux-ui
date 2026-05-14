'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function VoiceOrbNebulaDemo() {
  const [state, setState] = React.useState('idle');
  const [stars, setStars] = React.useState([]);
  const states = ['idle', 'listening', 'processing', 'speaking'];
  const stateConfig = {
    idle: { colors: ['#1e1b4b', '#312e81', '#4338ca'], label: 'Awaiting', glow: '#6366f1' },
    listening: { colors: ['#500724', '#9f1239', '#e11d48'], label: 'Sensing', glow: '#f43f5e' },
    processing: { colors: ['#3b0764', '#6b21a8', '#9333ea'], label: 'Dreaming', glow: '#a855f7' },
    speaking: { colors: ['#022c22', '#065f46', '#059669'], label: 'Emanating', glow: '#10b981' },
  };
  const config = stateConfig[state];

  // Generate stars
  React.useEffect(() => {
    setStars(Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 1 + Math.random() * 2,
      delay: Math.random() * 2,
    })));
  }, []);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Voice Orb - Nebula</h2>
        <p className="demo-subtitle">Cosmic nebula effect with twinkling stars and swirling gases</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '450px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto' }}>
            {/* Outer nebula glow */}
            <motion.div
              style={{ position: 'absolute', inset: -50, borderRadius: '50%', filter: 'blur(40px)', opacity: 0.6 }}
              animate={{ background: `radial-gradient(ellipse at center, ${config.glow}40, transparent 70%)`, rotate: [0, 360] }}
              transition={{ rotate: { duration: 60, repeat: Infinity, ease: 'linear' } }}
            />

            {/* Swirling gas layers */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute', inset: -20 + i * 10, borderRadius: '50%', opacity: 0.4,
                  background: `conic-gradient(from ${i * 60}deg, ${config.colors[0]}, ${config.colors[1]}, ${config.colors[2]}, ${config.colors[0]})`,
                  filter: 'blur(8px)',
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: state !== 'idle' ? [1, 1.05, 1] : 1 }}
                transition={{ rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity } }}
              />
            ))}

            {/* Main orb */}
            <motion.div
              onClick={() => setState(states[(states.indexOf(state) + 1) % states.length])}
              style={{
                position: 'absolute', inset: 15, borderRadius: '50%', overflow: 'hidden', cursor: 'pointer',
                background: `radial-gradient(circle at 40% 40%, ${config.colors[2]}, ${config.colors[1]} 50%, ${config.colors[0]})`,
                boxShadow: `0 0 50px ${config.glow}50, inset 0 0 50px ${config.colors[0]}`,
              }}
              animate={{ scale: state === 'speaking' ? [1, 1.05, 1] : state === 'listening' ? [1, 1.03, 1] : 1 }}
              transition={{ duration: state === 'speaking' ? 0.4 : 1, repeat: state !== 'idle' && state !== 'processing' ? Infinity : 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Stars */}
              {stars.map((star, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute', left: `${star.x}%`, top: `${star.y}%`,
                    width: star.size, height: star.size, borderRadius: '50%', background: '#fff',
                  }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
                />
              ))}

              {/* Core glow */}
              <motion.div
                style={{
                  position: 'absolute', inset: '25%', borderRadius: '50%',
                  background: `radial-gradient(circle, ${config.glow}80, transparent 70%)`,
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Center icon */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {state === 'idle' && <span style={{ fontSize: '2.5rem', opacity: 0.8 }}>✧</span>}
                {state === 'listening' && (
                  <motion.div style={{ display: 'flex', gap: '8px' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}
                        animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                )}
                {state === 'processing' && (
                  <motion.div
                    style={{ width: 50, height: 50, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#fff' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                {state === 'speaking' && (
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <motion.div key={i} style={{ width: 3, background: '#fff', borderRadius: 2 }}
                        animate={{ height: [8, 25 + Math.random() * 15, 8] }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Orbiting particles */}
            {state !== 'idle' && (
              <>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    style={{ position: 'absolute', inset: -10, borderRadius: '50%' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <div style={{
                      position: 'absolute', top: -4, left: '50%', marginLeft: -4,
                      width: 8, height: 8, borderRadius: '50%', background: config.glow,
                      boxShadow: `0 0 10px ${config.glow}`,
                    }} />
                  </motion.div>
                ))}
              </>
            )}
          </div>

          {/* Label */}
          <motion.div key={state} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '36px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: config.glow, fontStyle: 'italic' }}>{config.label}</div>
          </motion.div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '28px', justifyContent: 'center' }}>
            {states.map(s => (
              <motion.button key={s} onClick={() => setState(s)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '10px 18px', borderRadius: '20px', border: 'none',
                  background: state === s ? `linear-gradient(135deg, ${stateConfig[s].colors[1]}, ${stateConfig[s].colors[2]})` : 'rgba(255,255,255,0.05)',
                  color: state === s ? '#fff' : '#666', fontWeight: 600, cursor: 'pointer', fontSize: '0.75rem', textTransform: 'capitalize',
                  boxShadow: state === s ? `0 0 20px ${stateConfig[s].glow}40` : 'none',
                }}
              >{s}</motion.button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
