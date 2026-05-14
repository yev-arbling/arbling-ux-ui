'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ConversationHistoryDemo() {
  const [messages, setMessages] = React.useState([
    { id: 1, type: 'agent', text: 'Hello! How can I assist you today?', time: '10:30:15', duration: 2.1, sentiment: 'positive', confidence: 0.95, waveform: Array.from({length: 30}, () => Math.random()) },
    { id: 2, type: 'user', text: "Hi, I'd like to check my order status please.", time: '10:30:22', duration: 3.2, sentiment: 'neutral', confidence: 0.88, waveform: Array.from({length: 40}, () => Math.random()) },
    { id: 3, type: 'agent', text: 'Of course! Could you please provide your order number?', time: '10:30:28', duration: 3.8, sentiment: 'positive', confidence: 0.92, waveform: Array.from({length: 45}, () => Math.random()) },
    { id: 4, type: 'user', text: "Yes, it's ORD-2024-7829", time: '10:30:35', duration: 1.8, sentiment: 'neutral', confidence: 0.97, waveform: Array.from({length: 25}, () => Math.random()) },
    { id: 5, type: 'agent', text: 'Great! I found your order. It shipped yesterday and should arrive by Friday.', time: '10:30:42', duration: 4.5, sentiment: 'positive', confidence: 0.94, waveform: Array.from({length: 55}, () => Math.random()) },
    { id: 6, type: 'user', text: "That's perfect, thank you so much!", time: '10:30:50', duration: 2.0, sentiment: 'positive', confidence: 0.99, waveform: Array.from({length: 28}, () => Math.random()) },
  ]);
  const [isPlaying, setIsPlaying] = React.useState(null);
  const [playProgress, setPlayProgress] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showWaveforms, setShowWaveforms] = React.useState(true);
  const [isTyping, setIsTyping] = React.useState(false);

  const sentimentConfig = {
    positive: { color: '#10b981', icon: '😊', label: 'Positive' },
    neutral: { color: '#6b7280', icon: '😐', label: 'Neutral' },
    negative: { color: '#ef4444', icon: '😔', label: 'Negative' },
  };

  // Playback simulation
  React.useEffect(() => {
    if (!isPlaying) return;
    const msg = messages.find(m => m.id === isPlaying);
    if (!msg) return;
    const interval = setInterval(() => {
      setPlayProgress(prev => {
        const current = prev[isPlaying] || 0;
        if (current >= 1) {
          setIsPlaying(null);
          return { ...prev, [isPlaying]: 0 };
        }
        return { ...prev, [isPlaying]: current + (0.05 / msg.duration) };
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, messages]);

  // Typing indicator simulation
  React.useEffect(() => {
    const interval = setInterval(() => setIsTyping(Math.random() > 0.7), 3000);
    return () => clearInterval(interval);
  }, []);

  const totalDuration = messages.reduce((acc, m) => acc + m.duration, 0);
  const filteredMessages = messages.filter(m => searchQuery === '' || m.text.toLowerCase().includes(searchQuery.toLowerCase()));
  const formatDuration = (s) => `${Math.floor(s / 60)}:${(s % 60).toFixed(0).padStart(2, '0')}`;

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Conversation History</h2>
        <p className="demo-subtitle">Rich voice transcript with waveforms, sentiment analysis, and playback controls</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(12, 12, 20, 0.95)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" /></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>Voice Conversation</div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>{messages.length} messages • {formatDuration(totalDuration)} total</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setShowWaveforms(!showWaveforms)}
                  style={{ padding: '8px 12px', borderRadius: '8px', background: showWaveforms ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)', border: 'none', color: showWaveforms ? '#818cf8' : '#666', cursor: 'pointer', fontSize: '0.7rem' }}>
                  Waveforms
                </motion.button>
              </div>
            </div>

            {/* Search bar */}
            <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '8px 14px' }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input type="text" placeholder="Search conversation..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '0.85rem' }}
                />
                {searchQuery && <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: '2px' }}>✕</motion.button>}
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '400px', overflowY: 'auto' }}>
              <AnimatePresence>
                {filteredMessages.map((msg, i) => {
                  const sentiment = sentimentConfig[msg.sentiment];
                  const progress = playProgress[msg.id] || 0;
                  const isCurrentlyPlaying = isPlaying === msg.id;

                  return (
                    <motion.div key={msg.id} initial={{ opacity: 0, x: msg.type === 'user' ? 30 : -30 }}
                      animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>

                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        {msg.type === 'agent' && <div style={{ width: 24, height: 24, borderRadius: '6px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>AI</div>}
                        <span style={{ fontSize: '0.7rem', color: '#666' }}>{msg.type === 'user' ? 'You' : 'Assistant'}</span>
                        <span style={{ fontSize: '0.65rem', color: '#555' }}>{msg.time}</span>
                        <span style={{ fontSize: '0.7rem' }} title={sentiment.label}>{sentiment.icon}</span>
                        {msg.type === 'user' && <div style={{ width: 24, height: 24, borderRadius: '6px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#fff' }}>👤</div>}
                      </div>

                      {/* Message bubble */}
                      <motion.div whileHover={{ scale: 1.01 }}
                        style={{
                          maxWidth: '88%', padding: '14px 18px', borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          background: msg.type === 'user' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.08)',
                          color: '#fff', fontSize: '0.9rem', lineHeight: 1.6, position: 'relative',
                        }}>
                        {msg.text}

                        {/* Waveform inside bubble */}
                        {showWaveforms && (
                          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '1px', height: 24, opacity: 0.6 }}>
                            {msg.waveform.map((val, wi) => {
                              const playedIndex = Math.floor(progress * msg.waveform.length);
                              return <div key={wi} style={{ width: 2, height: `${val * 100}%`, borderRadius: 1, background: wi < playedIndex ? '#fff' : (msg.type === 'user' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.3)'), transition: 'background 0.1s' }} />;
                            })}
                          </div>
                        )}

                        {/* Duration badge */}
                        <div style={{ position: 'absolute', bottom: -6, [msg.type === 'user' ? 'left' : 'right']: -6, padding: '2px 8px', borderRadius: '10px', background: 'rgba(12, 12, 20, 0.95)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.65rem', color: '#888' }}>{msg.duration.toFixed(1)}s</div>
                      </motion.div>

                      {/* Playback controls */}
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px', alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                        <motion.button onClick={() => setIsPlaying(isCurrentlyPlaying ? null : msg.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer', background: isCurrentlyPlaying ? sentiment.color : 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isCurrentlyPlaying ? <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg> : <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
                        </motion.button>
                        <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                          <motion.div style={{ height: '100%', background: sentiment.color, borderRadius: 2 }} animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.05 }} />
                        </div>
                        <div style={{ fontSize: '0.6rem', color: '#555', padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>{Math.round(msg.confidence * 100)}%</div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '6px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>AI</div>
                  <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: 'rgba(255,255,255,0.08)', display: 'flex', gap: '4px' }}>
                    {[0, 1, 2].map(i => <motion.div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#666' }} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer stats */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-around' }}>
              {[{ label: 'Messages', value: messages.length }, { label: 'Duration', value: formatDuration(totalDuration) }, { label: 'Avg Confidence', value: `${Math.round(messages.reduce((a, m) => a + m.confidence, 0) / messages.length * 100)}%` }].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
