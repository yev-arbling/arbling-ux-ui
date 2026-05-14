'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CallStatusDemo() {
  const [status, setStatus] = React.useState('idle');
  const [duration, setDuration] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [networkQuality, setNetworkQuality] = React.useState(4);
  const [userLevel, setUserLevel] = React.useState(0);
  const [agentLevel, setAgentLevel] = React.useState(0);
  const statuses = ['idle', 'connecting', 'connected', 'speaking', 'listening', 'ended'];

  const statusConfig = {
    idle: { color: '#6b7280', icon: 'phone', label: 'Ready to Call', sublabel: 'Tap to start', bg: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)' },
    connecting: { color: '#fbbf24', icon: 'signal', label: 'Connecting', sublabel: 'Establishing connection...', bg: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' },
    connected: { color: '#10b981', icon: 'check', label: 'Connected', sublabel: 'Call in progress', bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    speaking: { color: '#8b5cf6', icon: 'volume', label: 'Agent Speaking', sublabel: 'AI is responding...', bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
    listening: { color: '#ef4444', icon: 'mic', label: 'Listening', sublabel: 'Speak now...', bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
    ended: { color: '#6b7280', icon: 'phoneOff', label: 'Call Ended', sublabel: 'Session complete', bg: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)' },
  };

  const config = statusConfig[status];
  const isActive = ['connected', 'speaking', 'listening'].includes(status);

  // Duration timer
  React.useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => setDuration(d => d + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Simulate audio levels
  React.useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setUserLevel(status === 'listening' ? Math.random() * 0.8 + 0.2 : Math.random() * 0.2);
      setAgentLevel(status === 'speaking' ? Math.random() * 0.8 + 0.2 : Math.random() * 0.2);
      setNetworkQuality(Math.min(5, Math.max(1, networkQuality + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))));
    }, 100);
    return () => clearInterval(interval);
  }, [status, isActive]);

  // Reset on status change
  React.useEffect(() => {
    if (status === 'idle' || status === 'ended') setDuration(0);
  }, [status]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const IconComponent = ({ type, size = 24 }) => {
    const icons = {
      phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
      phoneOff: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />,
      signal: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />,
      check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
      volume: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />,
      mic: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />,
      micOff: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm7.07-10.657a4.5 4.5 0 000 6.364M15.536 8.464a5 5 0 010 7.072M17.788 5.212a8 8 0 010 11.314" />,
    };
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor">{icons[type]}</svg>;
  };

  // Audio level bar component
  const AudioLevelBar = ({ level, color, label, isRight }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: isRight ? 'row-reverse' : 'row' }}>
      <div style={{ fontSize: '0.7rem', color: '#888', width: '50px', textAlign: isRight ? 'left' : 'right' }}>{label}</div>
      <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: color, borderRadius: '3px', transformOrigin: isRight ? 'right' : 'left' }}
          animate={{ scaleX: level }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Call Status</h2>
        <p className="demo-subtitle">Professional call interface with real-time status, audio levels, and controls</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <motion.div
            layout
            style={{
              background: 'rgba(15, 15, 25, 0.95)', borderRadius: '28px', padding: '0',
              border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden',
              boxShadow: `0 20px 60px -20px ${config.color}40`,
            }}
          >
            {/* Status header bar */}
            <motion.div
              style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              animate={{ background: `${config.color}15` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <motion.div
                  animate={{ background: config.color }}
                  style={{ width: '10px', height: '10px', borderRadius: '50%' }}
                />
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600, fontFamily: 'monospace', letterSpacing: '1px' }}
                  >
                    {formatTime(duration)}
                  </motion.div>
                )}
              </div>

              {/* Network quality indicator */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '16px' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    style={{ width: '3px', borderRadius: '1px', background: i <= networkQuality ? (networkQuality >= 3 ? '#10b981' : '#fbbf24') : 'rgba(255,255,255,0.2)' }}
                    animate={{ height: 4 + i * 2.5 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Main status area */}
            <div style={{ padding: '32px 24px', textAlign: 'center' }}>
              <motion.div
                style={{ width: 120, height: 120, borderRadius: '50%', margin: '0 auto 24px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {/* Outer glow rings */}
                {isActive && (
                  <>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        style={{ position: 'absolute', inset: -10 - i * 15, borderRadius: '50%', border: `1px solid ${config.color}` }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </>
                )}

                {/* Status spinner for connecting */}
                {status === 'connecting' && (
                  <motion.div
                    style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '2px solid transparent', borderTopColor: config.color, borderRightColor: config.color }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {/* Inner orb */}
                <motion.div
                  animate={{ background: config.bg, scale: status === 'listening' ? [1, 1.05, 1] : status === 'speaking' ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: status === 'speaking' ? 0.3 : 0.8, repeat: isActive ? Infinity : 0 }}
                  style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${config.color}40` }}
                >
                  <motion.div
                    key={status}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ color: '#fff' }}
                  >
                    <IconComponent type={config.icon} size={40} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Status text */}
              <motion.div key={status} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{config.label}</div>
                <div style={{ fontSize: '0.85rem', color: '#888' }}>{config.sublabel}</div>
              </motion.div>

              {/* Audio waveform for active states */}
              {(status === 'speaking' || status === 'listening') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginTop: '24px' }}
                >
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      style={{ width: 3, background: config.color, borderRadius: 2 }}
                      animate={{ height: [8, 8 + Math.random() * 28, 8] }}
                      transition={{ duration: 0.15 + Math.random() * 0.2, repeat: Infinity, delay: i * 0.02 }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Audio levels for connected state */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', padding: '0 20px' }}
                >
                  <AudioLevelBar level={userLevel} color="#ef4444" label="You" isRight={false} />
                  <AudioLevelBar level={agentLevel} color="#8b5cf6" label="Agent" isRight={true} />
                </motion.div>
              )}
            </div>

            {/* Control buttons */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', gap: '16px' }}
              >
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.1)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <IconComponent type={isMuted ? 'micOff' : 'mic'} size={22} />
                </motion.button>

                <motion.button
                  onClick={() => setIsRecording(!isRecording)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: isRecording ? '#ef4444' : 'rgba(255,255,255,0.1)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: isRecording ? '#fff' : '#ef4444' }} />
                  {isRecording && (
                    <motion.div
                      style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #ef4444' }}
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                <motion.button
                  onClick={() => setStatus('ended')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: '#ef4444', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <IconComponent type="phoneOff" size={22} />
                </motion.button>
              </motion.div>
            )}

            {/* Status selector */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Simulate State</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                {statuses.map(s => (
                  <motion.button
                    key={s}
                    onClick={() => setStatus(s)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '6px 12px', borderRadius: '6px', border: 'none',
                      background: status === s ? statusConfig[s].color : 'rgba(255,255,255,0.05)',
                      color: status === s ? '#fff' : '#666', fontWeight: 600, cursor: 'pointer',
                      fontSize: '0.7rem', textTransform: 'capitalize',
                    }}
                  >{s}</motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
