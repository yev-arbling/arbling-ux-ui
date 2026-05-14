'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function VoiceOrbDemo() {
  const [state, setState] = React.useState('idle');
  const [intensity, setIntensity] = React.useState(0.7);
  const [particles, setParticles] = React.useState([]);

  const states = ['idle', 'listening', 'processing', 'speaking'];
  const stateConfig = {
    idle: { colors: ['#6366f1', '#8b5cf6', '#a78bfa'], label: 'Tap to speak', sublabel: 'Voice assistant ready' },
    listening: { colors: ['#ec4899', '#f43f5e', '#fb7185'], label: 'Listening...', sublabel: 'Speak now' },
    processing: { colors: ['#f59e0b', '#fbbf24', '#fcd34d'], label: 'Processing...', sublabel: 'Analyzing your request' },
    speaking: { colors: ['#10b981', '#34d399', '#6ee7b7'], label: 'Speaking...', sublabel: 'AI is responding' },
  };

  const config = stateConfig[state];

  // Particle system
  React.useEffect(() => {
    if (state === 'idle') {
      setParticles([]);
      return;
    }
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      angle: (i / 30) * Math.PI * 2,
      radius: 80 + Math.random() * 40,
      speed: 0.5 + Math.random() * 1.5,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, [state]);

  // Audio bars animation
  const AudioBars = () => (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          style={{ width: 4, background: '#fff', borderRadius: 2, opacity: 0.9 }}
          animate={{ height: [12, 20 + Math.random() * 35 * intensity, 12] }}
          transition={{ duration: 0.2 + Math.random() * 0.2, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  );

  // Concentric rings
  const PulseRings = ({ count = 4, color }) => (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', inset: -15 - i * 20, borderRadius: '50%', border: `1px solid ${color}` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </>
  );

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Voice Orb</h2>
        <p className="demo-subtitle">Organic AI orb with particle system, layered glow, and state-reactive animations</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          {/* Main orb container */}
          <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto' }}>
            {/* Ambient glow */}
            <motion.div
              style={{ position: 'absolute', inset: -40, borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }}
              animate={{ background: `radial-gradient(circle, ${config.colors[0]}40, transparent 70%)`, scale: state !== 'idle' ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Particle ring */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                style={{ position: 'absolute', width: p.size, height: p.size, borderRadius: '50%', background: config.colors[1], left: '50%', top: '50%', marginLeft: -p.size/2, marginTop: -p.size/2, boxShadow: `0 0 ${p.size * 2}px ${config.colors[0]}` }}
                animate={{ x: [Math.cos(p.angle) * p.radius, Math.cos(p.angle + Math.PI) * p.radius, Math.cos(p.angle) * p.radius], y: [Math.sin(p.angle) * p.radius, Math.sin(p.angle + Math.PI) * p.radius, Math.sin(p.angle) * p.radius], opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3 / p.speed, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* Pulse rings */}
            {state !== 'idle' && <PulseRings count={4} color={config.colors[0]} />}

            {/* Processing spinner */}
            {state === 'processing' && (
              <>
                <motion.div
                  style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid transparent', borderTopColor: config.colors[0], borderRightColor: config.colors[1] }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '1px solid transparent', borderBottomColor: config.colors[1], borderLeftColor: config.colors[2] }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </>
            )}

            {/* Main orb */}
            <motion.div
              onClick={() => setState(states[(states.indexOf(state) + 1) % states.length])}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', cursor: 'pointer', overflow: 'hidden' }}
              animate={{ scale: state === 'speaking' ? [1, 1.06, 1] : state === 'listening' ? [1, 1.04, 1] : 1 }}
              transition={{ duration: state === 'speaking' ? 0.25 : 0.8, repeat: state !== 'idle' && state !== 'processing' ? Infinity : 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient background */}
              <motion.div
                style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
                animate={{ background: `radial-gradient(circle at 35% 35%, ${config.colors[2]}, ${config.colors[0]} 50%, ${config.colors[1]} 100%)` }}
                transition={{ duration: 0.5 }}
              />

              {/* Inner glow layer */}
              <motion.div
                style={{ position: 'absolute', inset: '10%', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%)' }}
                animate={{ opacity: state === 'listening' ? [0.4, 0.7, 0.4] : 0.4 }}
                transition={{ duration: 1, repeat: Infinity }}
              />

              {/* Highlight */}
              <div style={{ position: 'absolute', top: '12%', left: '20%', width: '30%', height: '20%', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', filter: 'blur(10px)' }} />

              {/* Content */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {state === 'speaking' && <AudioBars />}
                {state === 'listening' && (
                  <motion.div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    animate={{ scale: [1, 1.2, 1], borderWidth: ['3px', '2px', '3px'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <motion.div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </motion.div>
                )}
                {state === 'idle' && (
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                  </svg>
                )}
                {state === 'processing' && (
                  <motion.div style={{ display: 'flex', gap: '6px' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }}
                        animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Border glow */}
              <motion.div
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', boxShadow: `inset 0 0 30px ${config.colors[0]}80` }}
                animate={{ boxShadow: state !== 'idle' ? [`inset 0 0 30px ${config.colors[0]}60`, `inset 0 0 50px ${config.colors[0]}90`, `inset 0 0 30px ${config.colors[0]}60`] : `inset 0 0 30px ${config.colors[0]}60` }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Status label */}
          <motion.div key={state} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '32px' }}>
            <motion.div style={{ fontSize: '1.3rem', fontWeight: 700 }}
              animate={{ color: config.colors[0] }}
            >{config.label}</motion.div>
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '4px' }}>{config.sublabel}</div>
          </motion.div>

          {/* Intensity slider */}
          <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Intensity</span>
            <input type="range" min="0.3" max="1" step="0.05" value={intensity}
              onChange={(e) => setIntensity(parseFloat(e.target.value))}
              style={{ width: '140px', accentColor: config.colors[0] }}
            />
            <span style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'monospace' }}>{Math.round(intensity * 100)}%</span>
          </div>

          {/* State buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '24px', justifyContent: 'center' }}>
            {states.map(s => (
              <motion.button key={s} onClick={() => setState(s)} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '10px 18px', borderRadius: '12px', border: 'none',
                  background: state === s ? `linear-gradient(135deg, ${stateConfig[s].colors[0]}, ${stateConfig[s].colors[1]})` : 'rgba(255,255,255,0.08)',
                  color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', textTransform: 'capitalize',
                  boxShadow: state === s ? `0 4px 20px ${stateConfig[s].colors[0]}50` : 'none',
                }}
              >{s}</motion.button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
