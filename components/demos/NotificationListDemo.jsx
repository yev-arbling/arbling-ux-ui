'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function NotificationListDemo() {
  const [notifications, setNotifications] = React.useState([
    { id: 1, type: 'like', user: 'Sarah Chen', avatar: '👩‍💻', action: 'liked your post', time: '2m ago', read: false, color: '#f093fb' },
    { id: 2, type: 'comment', user: 'Mike Johnson', avatar: '👨‍🎨', action: 'commented: "This is amazing!"', time: '15m ago', read: false, color: '#667eea' },
    { id: 3, type: 'follow', user: 'Emma Wilson', avatar: '👩‍🔬', action: 'started following you', time: '1h ago', read: false, color: '#43e97b' },
    { id: 4, type: 'mention', user: 'Alex Rivera', avatar: '🧑‍🎤', action: 'mentioned you in a comment', time: '2h ago', read: true, color: '#fa709a' },
    { id: 5, type: 'system', user: 'System', avatar: '🔔', action: 'Your post reached 1K likes!', time: '5h ago', read: true, color: '#764ba2' },
    { id: 6, type: 'like', user: 'Jordan Lee', avatar: '👨‍💼', action: 'and 15 others liked your post', time: '1d ago', read: true, color: '#4facfe' },
  ]);
  const [filter, setFilter] = React.useState('all');
  const typeIcons = { like: '❤️', comment: '💬', follow: '👤', mention: '@', system: '🔔' };
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const deleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const filteredNotifications = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.read);
  return (
    <>
      <h2 className="demo-title">Notification List</h2>
      <p className="demo-subtitle">Real-time alerts with read/unread states, filtering, and quick actions</p>
      <div className="demo-area">
        <motion.div style={{ width: '100%', maxWidth: 480, background: 'rgba(20, 20, 30, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
          <div style={{ padding: '25px 25px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 4 }}>Notifications</h3><p style={{ fontSize: '0.85rem', color: '#888' }}>{unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}</p></div>
            <motion.div style={{ width: 45, height: 45, borderRadius: '50%', background: unreadCount > 0 ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', position: 'relative' }} animate={unreadCount > 0 ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.3 }}>🔔{unreadCount > 0 && <motion.div style={{ position: 'absolute', top: -2, right: -2, width: 20, height: 20, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }} initial={{ scale: 0 }} animate={{ scale: 1 }}>{unreadCount}</motion.div>}</motion.div>
          </div>
          <div style={{ display: 'flex', padding: '15px 25px', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['all', 'unread', 'read'].map((f) => <motion.button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', borderRadius: 20, background: filter === f ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)', border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{f}</motion.button>)}
            {unreadCount > 0 && <motion.button onClick={markAllAsRead} style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: 20, background: 'transparent', border: '1px solid rgba(102, 126, 234, 0.5)', color: '#667eea', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.1)' }} whileTap={{ scale: 0.95 }}>Mark all read</motion.button>}
          </div>
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <motion.div key={notification.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }} transition={{ delay: index * 0.05 }} onClick={() => !notification.read && markAsRead(notification.id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 15, padding: '18px 25px', borderBottom: index < filteredNotifications.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: notification.read ? 'transparent' : 'rgba(102, 126, 234, 0.08)', cursor: 'pointer', position: 'relative' }} whileHover={{ background: notification.read ? 'rgba(255,255,255,0.03)' : 'rgba(102, 126, 234, 0.12)' }}>
                  {!notification.read && <motion.div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#667eea' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.05 + 0.2 }} />}
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${notification.color}22, ${notification.color}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{typeIcons[notification.type]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{notification.user}</span><span style={{ fontSize: '0.85rem', color: '#aaa' }}>{notification.action}</span></div><div style={{ fontSize: '0.75rem', color: '#888' }}>{notification.time}</div></div>
                  <motion.button onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }} style={{ width: 32, height: 32, borderRadius: '50%', background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ scale: 1.1, color: '#ef4444' }} whileTap={{ scale: 0.9 }}>✕</motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredNotifications.length === 0 && <motion.div style={{ padding: 60, textAlign: 'center', color: '#666' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div style={{ fontSize: '3rem', marginBottom: 15 }}>🔔</div><div style={{ fontSize: '1rem' }}>No notifications here</div></motion.div>}
          </div>
        </motion.div>
      </div>
    </>
  );
}
