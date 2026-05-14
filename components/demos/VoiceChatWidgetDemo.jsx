'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function VoiceChatWidgetDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [state, setState] = React.useState('idle'); // idle, connecting, listening, processing, speaking
  const [audioLevels, setAudioLevels] = React.useState(Array(32).fill(0.1));
  const [particles, setParticles] = React.useState(() =>
    Array(24).fill(0).map((_, i) => ({ id: i, angle: (i / 24) * Math.PI * 2, distance: 60 + Math.random() * 20, size: 2 + Math.random() * 3, speed: 0.5 + Math.random() * 0.5 }))
  );
  const [transcript, setTranscript] = React.useState({ words: [], currentIndex: -1 });
  const [response, setResponse] = React.useState({ text: '', words: [], currentIndex: -1 });
  const [connectionQuality, setConnectionQuality] = React.useState(98);
  const [showTooltip, setShowTooltip] = React.useState(true);
  const [minimized, setMinimized] = React.useState(false);
  const [callDuration, setCallDuration] = React.useState(0);

  const samplePhrases = [
    'I need help tracking my recent order please',
    'What are your customer support hours today',
    'Can I speak with a human representative'
  ];
  const agentResponses = [
    'Let me pull up your order details right away. I can see your most recent order is currently in transit and expected to arrive by tomorrow.',
    'Our support team is available Monday through Friday from 9 AM to 8 PM Eastern. You can also reach us via email anytime.',
    'Of course! I\'m connecting you with one of our specialists now. They\'ll be with you in just a moment.'
  ];

  // Audio levels animation
  React.useEffect(() => {
    if (state === 'listening' || state === 'speaking') {
      const interval = setInterval(() => {
        setAudioLevels(prev => prev.map((_, i) => {
          const time = Date.now() / 100;
          const wave = Math.sin(time + i * 0.3) * 0.3;
          const noise = Math.random() * 0.4;
          const base = state === 'speaking' ? 0.4 : 0.3;
          return Math.max(0.1, Math.min(1, base + wave + noise));
        }));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setAudioLevels(Array(32).fill(0.1));
    }
  }, [state]);

  // Particle animation
  React.useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        angle: p.angle + (state === 'idle' ? 0.01 : state === 'listening' ? 0.03 : 0.02) * p.speed,
        distance: state === 'listening' ? 55 + Math.sin(Date.now() / 200 + p.id) * 15 :
                 state === 'speaking' ? 70 + Math.sin(Date.now() / 300 + p.id) * 10 : 60 + Math.sin(Date.now() / 500 + p.id) * 5
      })));
    }, 30);
    return () => clearInterval(interval);
  }, [isOpen, state]);

  // Call duration timer
  React.useEffect(() => {
    if (isOpen && state !== 'idle') {
      const interval = setInterval(() => setCallDuration(d => d + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, state]);

  // Connection quality simulation
  React.useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setConnectionQuality(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 4)));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // State machine for demo
  const startListening = () => {
    if (state !== 'idle') return;
    setState('connecting');
    setCallDuration(0);
    setTimeout(() => {
      setState('listening');
      const phrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
      const words = phrase.split(' ');
      setTranscript({ words, currentIndex: -1 });
      let idx = 0;
      const wordInterval = setInterval(() => {
        if (idx < words.length) {
          setTranscript(prev => ({ ...prev, currentIndex: idx }));
          idx++;
        } else {
          clearInterval(wordInterval);
          setState('processing');
          setTimeout(() => {
            setState('speaking');
            const respText = agentResponses[Math.floor(Math.random() * agentResponses.length)];
            const respWords = respText.split(' ');
            setResponse({ text: respText, words: respWords, currentIndex: -1 });
            let ridx = 0;
            const respInterval = setInterval(() => {
              if (ridx < respWords.length) {
                setResponse(prev => ({ ...prev, currentIndex: ridx }));
                ridx++;
              } else {
                clearInterval(respInterval);
                setTimeout(() => {
                  setState('idle');
                  setTranscript({ words: [], currentIndex: -1 });
                  setResponse({ text: '', words: [], currentIndex: -1 });
                }, 1500);
              }
            }, 80);
          }, 1200);
        }
      }, 120);
    }, 800);
  };

  const formatDuration = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // Circular spectrum visualization
  const CircularSpectrum = ({ levels, radius, color }) => {
    const bars = levels.length;
    return (
      <svg width={radius * 2 + 40} height={radius * 2 + 40} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {levels.map((level, i) => {
          const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
          const innerR = radius - 5;
          const outerR = radius + level * 25;
          const x1 = radius + 20 + Math.cos(angle) * innerR;
          const y1 = radius + 20 + Math.sin(angle) * innerR;
          const x2 = radius + 20 + Math.cos(angle) * outerR;
          const y2 = radius + 20 + Math.sin(angle) * outerR;
          return (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={color} strokeWidth={3} strokeLinecap="round" opacity={0.6 + level * 0.4}
              initial={false} animate={{ x2, y2 }} transition={{ duration: 0.05 }} />
          );
        })}
      </svg>
    );
  };

  // Voice Orb component
  const VoiceOrb = () => {
    const orbColors = {
      idle: { primary: '#667eea', secondary: '#764ba2', glow: 'rgba(102,126,234,0.4)' },
      connecting: { primary: '#f5af19', secondary: '#f12711', glow: 'rgba(245,175,25,0.4)' },
      listening: { primary: '#f5576c', secondary: '#f093fb', glow: 'rgba(245,87,108,0.5)' },
      processing: { primary: '#4facfe', secondary: '#00f2fe', glow: 'rgba(79,172,254,0.4)' },
      speaking: { primary: '#43e97b', secondary: '#38f9d7', glow: 'rgba(67,233,123,0.5)' }
    };
    const colors = orbColors[state];

    return (
      <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Circular spectrum */}
        {(state === 'listening' || state === 'speaking') && (
          <CircularSpectrum levels={audioLevels} radius={70} color={colors.primary} />
        )}

        {/* Particle ring */}
        {particles.map(p => (
          <motion.div key={p.id}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: state === 'listening' ? colors.primary : state === 'speaking' ? colors.secondary : '#667eea',
              left: 90 + Math.cos(p.angle) * p.distance - p.size / 2,
              top: 90 + Math.sin(p.angle) * p.distance - p.size / 2,
              opacity: 0.6,
              boxShadow: `0 0 ${p.size * 2}px ${colors.primary}`,
            }}
            animate={{ scale: state === 'idle' ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity, delay: p.id * 0.1 }}
          />
        ))}

        {/* Pulse rings */}
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            style={{
              position: 'absolute',
              inset: 40 - i * 15,
              borderRadius: '50%',
              border: `2px solid ${colors.primary}`,
              opacity: 0,
            }}
            animate={state !== 'idle' ? {
              scale: [1, 1.5 + i * 0.2],
              opacity: [0.4, 0],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        {/* Main orb */}
        <motion.div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            boxShadow: `0 0 60px ${colors.glow}, inset 0 -10px 30px rgba(0,0,0,0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          animate={state === 'listening' ? { scale: [1, 1.05, 1] } : state === 'speaking' ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {/* Inner glow */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />

          {/* State indicator */}
          <motion.div style={{ position: 'relative', zIndex: 1 }}>
            {state === 'idle' && <span style={{ fontSize: '2.5rem' }}>🎙️</span>}
            {state === 'connecting' && (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <span style={{ fontSize: '2rem' }}>⏳</span>
              </motion.div>
            )}
            {state === 'listening' && (
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                <span style={{ fontSize: '2.5rem' }}>👂</span>
              </motion.div>
            )}
            {state === 'processing' && (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                <span style={{ fontSize: '2rem' }}>🧠</span>
              </motion.div>
            )}
            {state === 'speaking' && (
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.4, repeat: Infinity }}>
                <span style={{ fontSize: '2.5rem' }}>🗣️</span>
              </motion.div>
            )}
          </motion.div>

          {/* Processing spinner */}
          {state === 'processing' && (
            <motion.div
              style={{
                position: 'absolute',
                inset: -5,
                borderRadius: '50%',
                border: '3px solid transparent',
                borderTopColor: '#fff',
                borderRightColor: 'rgba(255,255,255,0.5)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Voice Chat Widget</h2>
        <p className="demo-subtitle">ULTIMATE Premium voice assistant with reactive orb, circular spectrum, particles, and live word-by-word transcription</p>
      </div>
      <div className="demo-area">
        <div style={{ position: 'relative', width: '100%', height: '550px', background: 'linear-gradient(135deg, #0a0a12 0%, #12121f 50%, #0d1117 100%)', borderRadius: '24px', overflow: 'hidden' }}>
          {/* Background grid */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Demo page content */}
          <div style={{ padding: '30px', color: '#888' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TechStore</span>
              <span style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'rgba(102,126,234,0.2)', borderRadius: '12px', color: '#667eea' }}>PRO</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '500px' }}>Welcome to our premium store. Need assistance? Our AI voice assistant is ready to help you 24/7.</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {['Browse Products', 'Track Order', 'Support'].map((btn, i) => (
                <motion.div key={btn} whileHover={{ scale: 1.02, y: -2 }}
                  style={{ padding: '12px 24px', borderRadius: '12px', background: i === 0 ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', border: i !== 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>{btn}</motion.div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  position: 'absolute', bottom: '100px', right: '24px', width: '380px',
                  background: 'linear-gradient(180deg, rgba(18,18,30,0.98) 0%, rgba(10,10,18,0.98) 100%)',
                  borderRadius: '28px', overflow: 'hidden',
                  border: '1px solid rgba(102,126,234,0.2)',
                  backdropFilter: 'blur(40px)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(102,126,234,0.1)',
                }}
              >
                {/* Header */}
                <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(102,126,234,0.15), rgba(118,75,162,0.15))', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <motion.div style={{ width: 40, height: 40, borderRadius: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
                      animate={state === 'speaking' ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}>🤖</motion.div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>AI Voice Assistant</div>
                      <div style={{ fontSize: '0.7rem', color: state === 'idle' ? '#43e97b' : state === 'listening' ? '#f5576c' : state === 'speaking' ? '#43e97b' : '#f5af19', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <motion.span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                        {state === 'idle' ? 'Ready' : state === 'connecting' ? 'Connecting...' : state === 'listening' ? 'Listening...' : state === 'processing' ? 'Processing...' : 'Speaking...'}
                        {state !== 'idle' && <span style={{ color: '#666' }}>• {formatDuration(callDuration)}</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Connection quality */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', padding: '6px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ width: 3, height: 4 + i * 3, borderRadius: 1, background: connectionQuality > (100 - i * 15) ? '#43e97b' : 'rgba(255,255,255,0.2)' }} />
                      ))}
                      <span style={{ fontSize: '0.65rem', color: '#888', marginLeft: '4px' }}>{Math.round(connectionQuality)}%</span>
                    </div>
                    <motion.button onClick={() => setMinimized(!minimized)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem' }}>
                      {minimized ? '▼' : '▲'}
                    </motion.button>
                    <motion.button onClick={() => setIsOpen(false)} whileHover={{ scale: 1.1, background: 'rgba(245,87,108,0.2)' }} whileTap={{ scale: 0.9 }}
                      style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }}>×</motion.button>
                  </div>
                </div>

                <AnimatePresence>
                  {!minimized && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      {/* Voice Orb Section */}
                      <div style={{ padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'radial-gradient(circle at center, rgba(102,126,234,0.05) 0%, transparent 70%)' }}>
                        <VoiceOrb />

                        {/* Status text */}
                        <motion.div style={{ marginTop: '20px', textAlign: 'center' }}>
                          {state === 'idle' && <div style={{ color: '#888', fontSize: '0.85rem' }}>Tap the microphone to start speaking</div>}
                          {state === 'connecting' && <div style={{ color: '#f5af19', fontSize: '0.85rem' }}>Establishing secure connection...</div>}
                        </motion.div>
                      </div>

                      {/* Live Transcription */}
                      {transcript.words.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '0 20px 16px' }}>
                          <div style={{ fontSize: '0.7rem', color: '#667eea', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>You said:</div>
                          <div style={{ padding: '14px 18px', background: 'rgba(245,87,108,0.1)', borderRadius: '16px', borderLeft: '3px solid #f5576c' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {transcript.words.map((word, i) => (
                                <motion.span key={i}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: i <= transcript.currentIndex ? 1 : 0.3, y: 0, color: i === transcript.currentIndex ? '#f5576c' : '#fff' }}
                                  style={{ fontSize: '0.9rem', fontWeight: i === transcript.currentIndex ? 600 : 400 }}>
                                  {word}
                                </motion.span>
                              ))}
                              {state === 'listening' && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ color: '#f5576c' }}>▌</motion.span>}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Agent Response */}
                      {response.words.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '0 20px 16px' }}>
                          <div style={{ fontSize: '0.7rem', color: '#43e97b', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assistant:</div>
                          <div style={{ padding: '14px 18px', background: 'rgba(67,233,123,0.1)', borderRadius: '16px', borderLeft: '3px solid #43e97b' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {response.words.map((word, i) => (
                                <motion.span key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: i <= response.currentIndex ? 1 : 0.2, scale: 1, color: i === response.currentIndex ? '#43e97b' : '#fff' }}
                                  style={{ fontSize: '0.9rem', fontWeight: i === response.currentIndex ? 600 : 400 }}>
                                  {word}
                                </motion.span>
                              ))}
                              {state === 'speaking' && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.3, repeat: Infinity }} style={{ color: '#43e97b' }}>▌</motion.span>}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Quick Actions */}
                      {state === 'idle' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '0 20px 20px' }}>
                          <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '10px', fontWeight: 500 }}>Quick actions:</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {[{ icon: '📦', label: 'Track Order' }, { icon: '💬', label: 'Live Chat' }, { icon: '📞', label: 'Call Back' }].map((action, i) => (
                              <motion.button key={i} onClick={startListening}
                                whileHover={{ scale: 1.03, background: 'rgba(102,126,234,0.2)' }} whileTap={{ scale: 0.97 }}
                                style={{ flex: 1, padding: '12px 8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '1.2rem' }}>{action.icon}</span>
                                <span style={{ fontSize: '0.7rem', color: '#888' }}>{action.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Main Action Button */}
                      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                        <motion.button onClick={startListening} disabled={state !== 'idle'}
                          whileHover={state === 'idle' ? { scale: 1.02 } : {}} whileTap={state === 'idle' ? { scale: 0.98 } : {}}
                          style={{
                            width: '100%', height: 56, borderRadius: '16px', border: 'none', cursor: state === 'idle' ? 'pointer' : 'default',
                            background: state === 'idle' ? 'linear-gradient(135deg, #667eea, #764ba2)' :
                                        state === 'listening' ? 'linear-gradient(135deg, #f5576c, #f093fb)' :
                                        state === 'speaking' ? 'linear-gradient(135deg, #43e97b, #38f9d7)' :
                                        'linear-gradient(135deg, #4facfe, #00f2fe)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            boxShadow: state === 'idle' ? '0 10px 30px rgba(102,126,234,0.3)' : 'none',
                            opacity: state !== 'idle' ? 0.8 : 1,
                          }}>
                          <span style={{ fontSize: '1.4rem' }}>{state === 'idle' ? '🎙️' : state === 'listening' ? '👂' : state === 'speaking' ? '🔊' : '⏳'}</span>
                          <span style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>
                            {state === 'idle' ? 'Start Speaking' : state === 'listening' ? 'Listening...' : state === 'processing' ? 'Thinking...' : 'Speaking...'}
                          </span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
          <motion.div style={{ position: 'absolute', bottom: '24px', right: '24px' }}>
            {/* Tooltip */}
            <AnimatePresence>
              {!isOpen && showTooltip && (
                <motion.div initial={{ opacity: 0, x: 20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  style={{ position: 'absolute', right: '80px', bottom: '12px', background: 'linear-gradient(135deg, rgba(30,30,45,0.98), rgba(20,20,30,0.98))', padding: '12px 18px', borderRadius: '16px', whiteSpace: 'nowrap', boxShadow: '0 15px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(102,126,234,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>👋</motion.span>
                    <div>
                      <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>Need help?</div>
                      <div style={{ color: '#888', fontSize: '0.7rem' }}>Talk to our AI assistant</div>
                    </div>
                  </div>
                  <motion.button onClick={() => setShowTooltip(false)} whileHover={{ scale: 1.1 }}
                    style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', background: '#333', border: 'none', color: '#888', fontSize: '0.7rem', cursor: 'pointer' }}>×</motion.button>
                  {/* Arrow */}
                  <div style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '8px solid rgba(30,30,45,0.98)' }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', cursor: 'pointer', boxShadow: '0 15px 50px rgba(102,126,234,0.5)', position: 'relative', overflow: 'visible' }}>
              {/* Pulse rings */}
              {!isOpen && [0, 1].map(i => (
                <motion.div key={i}
                  style={{ position: 'absolute', inset: -4 - i * 6, borderRadius: '50%', border: '2px solid #667eea' }}
                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
              ))}
              {/* Notification badge */}
              {!isOpen && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  style={{ position: 'absolute', top: -4, right: -4, width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #f5576c, #f093fb)', border: '3px solid #0a0a12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff' }}>1</span>
                </motion.div>
              )}
              {/* Icon */}
              <motion.span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 0.85 : 1 }}>
                {isOpen ? '×' : '🎙️'}
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
