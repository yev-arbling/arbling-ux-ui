'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notifications = [
  { id: 1, type: 'success', workflow: 'Lead Capture', message: 'Workflow completed successfully', time: '2 mins ago', read: false },
  { id: 2, type: 'error', workflow: 'Payment Processing', message: 'API timeout after 3 retries', time: '5 mins ago', read: false },
  { id: 3, type: 'warning', workflow: 'Email Campaign', message: 'Rate limit approaching (85%)', time: '10 mins ago', read: true },
  { id: 4, type: 'info', workflow: 'Data Sync', message: 'Scheduled execution started', time: '15 mins ago', read: true },
  { id: 5, type: 'success', workflow: 'Invoice Generation', message: '15 invoices generated', time: '1 hour ago', read: true },
];

export default function NotificationCenterDemo() {
  const [items, setItems] = React.useState(notifications);
  const [filter, setFilter] = React.useState('all');

  const filtered = filter === 'all' ? items : filter === 'unread' ? items.filter(n => !n.read) : items.filter(n => n.type === filter);
  const unreadCount = items.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setItems(items.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setItems(items.map(n => ({ ...n, read: true })));
  };

  const getTypeConfig = (type) => {
    const configs = {
      success: { color: '#43e97b', icon: '✓', bg: 'rgba(67, 233, 123, 0.1)' },
      error: { color: '#ff6b6b', icon: '✗', bg: 'rgba(255, 107, 107, 0.1)' },
      warning: { color: '#fbbf24', icon: '⚠', bg: 'rgba(251, 191, 36, 0.1)' },
      info: { color: '#667eea', icon: 'ℹ', bg: 'rgba(102, 126, 234, 0.1)' },
    };
    return configs[type];
  };

  return (
    <>
      <h2 className="demo-title">Notification Center</h2>
      <p className="demo-subtitle">Workflow notifications and alerts. Real-time updates on workflow execution.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Notifications</h3>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>
                {unreadCount} unread • {items.length} total
              </div>
            </div>
            {unreadCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Mark All Read
              </motion.button>
            )}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {['all', 'unread', 'success', 'error', 'warning', 'info'].map((f, i) => (
              <motion.button
                key={f}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 16px',
                  background: filter === f ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${filter === f ? '#667eea' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {f}
                {f === 'unread' && unreadCount > 0 && (
                  <span style={{
                    marginLeft: 6,
                    padding: '2px 6px',
                    background: '#ff6b6b',
                    borderRadius: 10,
                    fontSize: '0.7rem',
                  }}>
                    {unreadCount}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Notifications list */}
          <AnimatePresence mode="popLayout">
            {filtered.map((notif, i) => {
              const config = getTypeConfig(notif.type);
              return (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ x: 4 }}
                  onClick={() => markAsRead(notif.id)}
                  style={{
                    marginBottom: 12,
                    padding: 16,
                    background: notif.read ? 'rgba(20, 20, 35, 0.6)' : config.bg,
                    border: `1px solid ${notif.read ? 'rgba(255,255,255,0.08)' : config.color + '30'}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    gap: 16,
                  }}
                >
                  {!notif.read && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: config.color,
                        boxShadow: `0 0 10px ${config.color}`,
                      }}
                    />
                  )}

                  <motion.div
                    animate={{ rotate: !notif.read ? [0, 10, -10, 0] : 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${config.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: config.color,
                      flexShrink: 0,
                    }}
                  >
                    {config.icon}
                  </motion.div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{
                        padding: '3px 8px',
                        background: `${config.color}20`,
                        borderRadius: 6,
                        fontSize: '0.7rem',
                        color: config.color,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}>
                        {notif.type}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{notif.workflow}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: 6 }}>
                      {notif.message}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                      {notif.time}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: 60,
                textAlign: 'center',
                color: '#666',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔔</div>
              <div style={{ fontSize: '0.9rem' }}>No {filter} notifications</div>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {['success', 'error', 'warning', 'info'].map((type, i) => {
              const count = items.filter(n => n.type === type).length;
              const config = getTypeConfig(type);
              return (
                <div key={type} style={{ textAlign: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300 }}
                    style={{ fontSize: '1.8rem', fontWeight: 700, color: config.color, marginBottom: 4 }}
                  >
                    {count}
                  </motion.div>
                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {type}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}
