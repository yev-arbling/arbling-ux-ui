'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function NotificationsDemo() {
  const [notifs, setNotifs] = React.useState([
    { id: 1, type: 'success', title: 'Payment successful', desc: 'Order #12345 confirmed', actions: ['View Order'] },
    { id: 2, type: 'info', title: 'New message', desc: 'Sarah sent you a message', actions: ['Reply', 'Dismiss'] },
  ]);
  const [style, setStyle] = React.useState('toast');
  const [position, setPosition] = React.useState('top-right');

  const types = {
    success: { icon: '✓', color: '#43e97b', bg: 'rgba(67, 233, 123, 0.15)', border: 'rgba(67, 233, 123, 0.3)' },
    error: { icon: '✕', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)' },
    warning: { icon: '!', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.3)' },
    info: { icon: 'i', color: '#4facfe', bg: 'rgba(79, 172, 254, 0.15)', border: 'rgba(79, 172, 254, 0.3)' },
  };

  const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
  const styles = ['toast', 'alert', 'minimal'];

  const add = (type) => {
    const messages = {
      success: [{ title: 'Changes saved', desc: 'Your settings have been updated' }, { title: 'File uploaded', desc: 'report.pdf uploaded successfully' }],
      error: [{ title: 'Upload failed', desc: 'File size exceeds 10MB limit' }, { title: 'Connection lost', desc: 'Please check your internet' }],
      warning: [{ title: 'Storage almost full', desc: '90% of quota used' }, { title: 'Session expiring', desc: 'Please save your work' }],
      info: [{ title: 'New feature', desc: 'Check out dark mode!' }, { title: 'Maintenance', desc: 'Scheduled for 2am UTC' }],
    };
    const msgs = messages[type];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    const newNotif = {
      id: Date.now(),
      type,
      ...msg,
      actions: type === 'error' ? ['Retry', 'Dismiss'] : type === 'warning' ? ['Fix Now'] : ['View'],
      progress: 100,
    };
    setNotifs(prev => [newNotif, ...prev].slice(0, 5));

    // Auto-dismiss after 5 seconds
    const interval = setInterval(() => {
      setNotifs(prev => prev.map(n => n.id === newNotif.id ? { ...n, progress: Math.max(0, (n.progress || 100) - 2) } : n));
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setNotifs(prev => prev.filter(n => n.id !== newNotif.id));
    }, 5000);
  };

  const dismiss = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  const getPositionStyle = () => {
    const base = { position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, width: 340 };
    return base;
  };

  const getEntryAnimation = () => {
    if (position.includes('right')) return { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 50, opacity: 0 } };
    return { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -50, opacity: 0 } };
  };

  return (
    <>
      <h2 className="demo-title">Notifications</h2>
      <p className="demo-subtitle">Multiple styles (toast, alert, minimal), severity levels, action buttons, and auto-dismiss with progress</p>
      <div className="demo-area">
        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {styles.map(s => (
              <motion.button
                key={s}
                onClick={() => setStyle(s)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: style === s ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  color: '#fff', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
                }}
              >
                {s}
              </motion.button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {Object.keys(types).map(t => (
              <motion.button
                key={t}
                onClick={() => add(t)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: `1px solid ${types[t].border}`,
                  background: types[t].bg, color: types[t].color,
                  fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
                }}
              >
                + {t}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Notifications container */}
        <div style={getPositionStyle()}>
          <AnimatePresence mode="popLayout">
            {notifs.map(n => {
              const t = types[n.type];
              const anim = getEntryAnimation();
              return (
                <motion.div
                  key={n.id}
                  layout
                  {...anim}
                  style={{
                    background: style === 'minimal' ? 'transparent' : 'rgba(15, 15, 25, 0.95)',
                    backdropFilter: style === 'minimal' ? 'none' : 'blur(10px)',
                    borderRadius: style === 'alert' ? 8 : 14,
                    border: style === 'minimal' ? 'none' : `1px solid ${t.border}`,
                    padding: style === 'minimal' ? '8px 0' : style === 'alert' ? 12 : 16,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: style === 'toast' ? `0 10px 30px ${t.color}20` : 'none',
                  }}
                >
                  {/* Progress bar */}
                  {n.progress !== undefined && style === 'toast' && (
                    <motion.div
                      style={{
                        position: 'absolute', bottom: 0, left: 0, height: 3,
                        background: t.color, width: `${n.progress}%`,
                      }}
                    />
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    {/* Icon */}
                    <motion.div
                      style={{
                        width: style === 'minimal' ? 24 : 36, height: style === 'minimal' ? 24 : 36,
                        borderRadius: style === 'alert' ? 6 : '50%',
                        background: t.bg, border: `1px solid ${t.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: t.color, fontWeight: 800, fontSize: style === 'minimal' ? '0.7rem' : '0.9rem',
                        flexShrink: 0,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring' }}
                    >
                      {t.icon}
                    </motion.div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: style === 'minimal' ? '0.8rem' : '0.9rem', color: '#fff', marginBottom: 2 }}>{n.title}</div>
                      <div style={{ fontSize: style === 'minimal' ? '0.7rem' : '0.75rem', color: '#888' }}>{n.desc}</div>

                      {/* Actions */}
                      {n.actions && style !== 'minimal' && (
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                          {n.actions.map((action, i) => (
                            <motion.button
                              key={action}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => action === 'Dismiss' && dismiss(n.id)}
                              style={{
                                padding: '5px 12px', borderRadius: 6, border: 'none',
                                background: i === 0 ? t.color : 'rgba(255,255,255,0.08)',
                                color: i === 0 ? '#000' : '#888',
                                fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                              }}
                            >
                              {action}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Close button */}
                    <motion.button
                      onClick={() => dismiss(n.id)}
                      whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: 24, height: 24, borderRadius: 6,
                        background: 'transparent', border: 'none',
                        color: '#666', cursor: 'pointer', fontSize: '0.8rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      ✕
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {notifs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: 40, color: '#666', fontSize: '0.85rem' }}
            >
              No notifications. Click the buttons above to add some.
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
