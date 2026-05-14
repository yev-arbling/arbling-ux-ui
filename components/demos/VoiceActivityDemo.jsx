'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function VoiceActivityDemo() {
  const [isVoiceDetected, setIsVoiceDetected] = React.useState(false);
  const [level, setLevel] = React.useState(0);
  const [confidence, setConfidence] = React.useState(0);
  const [noiseFloor, setNoiseFloor] = React.useState(0.15);
  const [threshold, setThreshold] = React.useState(0.35);
  const [history, setHistory] = React.useState(Array(80).fill({ level: 0, voice: false }));
  const [frequencyBands, setFrequencyBands] = React.useState({ sub: 0, bass: 0, mid: 0, high: 0 });
  const [speakingDuration, setSpeakingDuration] = React.useState(0);
  const [silenceDuration, setSilenceDuration] = React.useState(0);
  const [waveform, setWaveform] = React.useState(Array(60).fill(0));

  React.useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      // Simulate realistic voice patterns
      const voiceActive = Math.sin(time * 0.5) > -0.3;
      const baseLevel = voiceActive ? 0.4 + Math.random() * 0.4 : 0.05 + Math.random() * 0.15;
      const newLevel = baseLevel * (0.8 + Math.random() * 0.4);
      const detected = newLevel > threshold && newLevel > noiseFloor + 0.1;
      const conf = detected ? Math.min(1, (newLevel - threshold) / 0.4 + 0.5) : 0;

      setLevel(newLevel);
      setIsVoiceDetected(detected);
      setConfidence(conf);

      // Frequency bands (simulated)
      setFrequencyBands({
        sub: detected ? newLevel * 0.6 + Math.random() * 0.2 : Math.random() * 0.1,
        bass: detected ? newLevel * 0.8 + Math.random() * 0.15 : Math.random() * 0.1,
        mid: detected ? newLevel * 1.0 + Math.random() * 0.1 : Math.random() * 0.08,
        high: detected ? newLevel * 0.5 + Math.random() * 0.3 : Math.random() * 0.15,
      });

      // Speaking/silence duration
      if (detected) {
        setSpeakingDuration(d => d + 0.05);
        setSilenceDuration(0);
      } else {
        setSilenceDuration(d => d + 0.05);
        if (silenceDuration > 1) setSpeakingDuration(0);
      }

      // Update noise floor (adaptive)
      if (!detected) {
        setNoiseFloor(n => n * 0.99 + newLevel * 0.01);
      }

      // History
      setHistory(prev => [...prev.slice(1), { level: newLevel, voice: detected }]);

      // Waveform
      setWaveform(prev => {
        const next = [...prev.slice(1)];
        next.push(detected ? (Math.random() - 0.5) * newLevel * 2 : (Math.random() - 0.5) * 0.1);
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [threshold, noiseFloor, silenceDuration]);

  const formatTime = (s) => s < 1 ? `${Math.round(s * 1000)}ms` : `${s.toFixed(1)}s`;

  // Circular confidence meter
  const ConfidenceMeter = () => {
    const radius = 45, stroke = 8;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - confidence * circumference;
    return (
      <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={60} cy={60} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
        <motion.circle cx={60} cy={60} r={radius} fill="none" stroke={isVoiceDetected ? '#10b981' : '#6b7280'} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference} animate={{ strokeDashoffset: offset }} transition={{ duration: 0.1 }}
        />
      </svg>
    );
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Voice Activity</h2>
        <p className="demo-subtitle">Advanced VAD with frequency analysis, confidence scoring, and adaptive noise floor</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <motion.div style={{ background: 'rgba(12, 12, 20, 0.95)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>

            {/* Status header */}
            <motion.div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              animate={{ background: isVoiceDetected ? 'rgba(16, 185, 129, 0.1)' : 'transparent' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative', width: 120, height: 120 }}>
                  <ConfidenceMeter />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div animate={{ scale: isVoiceDetected ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.3 }}>
                      <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={isVoiceDetected ? '#10b981' : '#6b7280'} strokeWidth="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      </svg>
                    </motion.div>
                    <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '4px' }}>{Math.round(confidence * 100)}%</div>
                  </div>
                  {/* Pulse rings */}
                  {isVoiceDetected && [0, 1].map(i => (
                    <motion.div key={i} style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1px solid #10b981' }}
                      animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }}
                    />
                  ))}
                </div>
                <div>
                  <motion.div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}
                    animate={{ color: isVoiceDetected ? '#10b981' : '#6b7280' }}
                  >{isVoiceDetected ? 'Voice Detected' : 'Silence'}</motion.div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {isVoiceDetected ? `Speaking for ${formatTime(speakingDuration)}` : `Silent for ${formatTime(silenceDuration)}`}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'right' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{Math.round(level * 100)}%</div>
                  <div style={{ fontSize: '0.65rem', color: '#666' }}>Level</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#888' }}>{Math.round(noiseFloor * 100)}%</div>
                  <div style={{ fontSize: '0.65rem', color: '#666' }}>Noise Floor</div>
                </div>
              </div>
            </motion.div>

            {/* Waveform */}
            <div style={{ padding: '0 24px', marginBottom: '16px' }}>
              <div style={{ height: 60, background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '8px', display: 'flex', alignItems: 'center', gap: '1px' }}>
                {waveform.map((val, i) => (
                  <motion.div key={i} style={{ width: 2, background: isVoiceDetected ? '#10b981' : '#374151', borderRadius: '1px', transformOrigin: 'center' }}
                    animate={{ height: Math.abs(val) * 80 + 4 }} transition={{ duration: 0.05 }}
                  />
                ))}
              </div>
            </div>

            {/* Frequency bands */}
            <div style={{ padding: '0 24px 20px' }}>
              <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Frequency Bands</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { label: 'Sub', value: frequencyBands.sub, color: '#ef4444' },
                  { label: 'Bass', value: frequencyBands.bass, color: '#f59e0b' },
                  { label: 'Mid', value: frequencyBands.mid, color: '#10b981' },
                  { label: 'High', value: frequencyBands.high, color: '#3b82f6' },
                ].map(band => (
                  <div key={band.label} style={{ flex: 1 }}>
                    <div style={{ height: 60, background: 'rgba(0,0,0,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '4px', marginBottom: '6px' }}>
                      <motion.div style={{ width: '80%', background: `linear-gradient(0deg, ${band.color}, ${band.color}80)`, borderRadius: '4px 4px 0 0' }}
                        animate={{ height: `${band.value * 100}%` }} transition={{ duration: 0.05 }}
                      />
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#666' }}>{band.label}</div>
                    <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: band.color }}>{Math.round(band.value * 100)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Level meter with threshold */}
            <div style={{ padding: '0 24px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.7rem', color: '#666' }}>
                <span>Input Level</span>
                <span>Threshold: {Math.round(threshold * 100)}%</span>
              </div>
              <div style={{ height: 16, background: 'rgba(0,0,0,0.4)', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                {/* Noise floor indicator */}
                <motion.div style={{ position: 'absolute', top: 0, bottom: 0, background: 'rgba(239, 68, 68, 0.2)' }}
                  animate={{ width: `${noiseFloor * 100}%` }}
                />
                {/* Threshold line */}
                <motion.div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: '#fbbf24', zIndex: 2 }}
                  animate={{ left: `${threshold * 100}%` }}
                />
                {/* Level bar */}
                <motion.div style={{ height: '100%', borderRadius: 8, background: isVoiceDetected ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #4b5563, #6b7280)' }}
                  animate={{ width: `${level * 100}%` }} transition={{ duration: 0.05 }}
                />
              </div>
            </div>

            {/* Activity history */}
            <div style={{ padding: '0 24px 20px' }}>
              <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Activity History</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '50px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '8px' }}>
                {history.map((h, i) => (
                  <motion.div key={i} style={{ flex: 1, borderRadius: '1px', background: h.voice ? '#10b981' : 'rgba(107, 114, 128, 0.3)' }}
                    animate={{ height: `${Math.max(h.level * 100, 3)}%` }} transition={{ duration: 0.05 }}
                  />
                ))}
              </div>
            </div>

            {/* Threshold slider */}
            <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>Sensitivity</span>
              <input type="range" min="0.15" max="0.6" step="0.01" value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                style={{ flex: 1, accentColor: '#10b981' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'monospace', width: '40px' }}>{Math.round(threshold * 100)}%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
