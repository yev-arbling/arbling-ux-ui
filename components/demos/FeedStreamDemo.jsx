'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FeedStreamDemo() {
  const [activities, setActivities] = React.useState([
    { id: 1, type: 'comment', user: { name: 'Alice Johnson', avatar: '👩‍💼', color: '#667eea' }, action: 'commented on', target: 'Design System', time: '2 min ago', content: 'Great work on the new palette!' },
    { id: 2, type: 'commit', user: { name: 'Bob Smith', avatar: '👨‍💻', color: '#43e97b' }, action: 'pushed', target: '3 commits', time: '15 min ago', content: 'Fixed responsive issues.' },
    { id: 3, type: 'review', user: { name: 'Carol White', avatar: '👩‍🎨', color: '#f093fb' }, action: 'approved', target: 'PR #234', time: '1 hour ago', content: 'LGTM! Ready to merge.' },
    { id: 4, type: 'deployment', user: { name: 'Eve Davis', avatar: '👩‍🚀', color: '#ff6b6b' }, action: 'deployed', target: 'v2.4.0', time: '3 hours ago', content: 'Release includes new dashboard.' },
    { id: 5, type: 'star', user: { name: 'Frank Miller', avatar: '👨‍🎓', color: '#4facfe' }, action: 'starred', target: 'frontend-app', time: '5 hours ago', content: '' },
  ]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const loadMore = () => { setLoading(true); setTimeout(() => { setActivities([...activities, { id: 6, type: 'comment', user: { name: 'Grace Lee', avatar: '👩‍💼', color: '#667eea' }, action: 'commented on', target: 'API Docs', time: '1 day ago', content: 'Found a typo.' }]); setLoading(false); setHasMore(false); }, 1500); };
  const getIcon = (type) => ({ comment: '💬', commit: '📦', review: '✅', deployment: '🚀', star: '⭐' }[type] || '•');
  const getTypeColor = (type) => ({ comment: '#667eea', commit: '#43e97b', review: '#f093fb', deployment: '#ff6b6b', star: '#4facfe' }[type] || '#888');
  return (
    <>
      <h2 className="demo-title">Feed Stream</h2>
      <p className="demo-subtitle">Activity feed with timeline, user actions, and load more functionality.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '25%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div style={{ width: 900, height: 750, background: 'rgba(20, 20, 30, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: 35, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
        <div style={{ marginBottom: 25 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #667eea, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Activity Feed</h2>
          <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#888' }}>Stay updated with team activity</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: 10 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.1)' }} />
            <AnimatePresence>{activities.map((activity, index) => <motion.div key={activity.id} layout initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ delay: index * 0.05 }} style={{ display: 'flex', gap: 20, marginBottom: 25, position: 'relative' }}><motion.div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${activity.user.color}, ${activity.user.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, zIndex: 1, border: '3px solid rgba(20, 20, 30, 1)' }} whileHover={{ scale: 1.1 }}>{activity.user.avatar}</motion.div><motion.div style={{ flex: 1, padding: 20, borderRadius: 16, background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.08)' }} whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.15)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><div style={{ width: 28, height: 28, borderRadius: '50%', background: `${getTypeColor(activity.type)}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{getIcon(activity.type)}</div><div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}><span style={{ color: activity.user.color }}>{activity.user.name}</span><span style={{ color: '#888', fontWeight: 400 }}> {activity.action} </span><span style={{ color: '#667eea' }}>{activity.target}</span></div></div>{activity.content && <div style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.6, marginBottom: 10 }}>{activity.content}</div>}<div style={{ fontSize: '0.75rem', color: '#666' }}>⏰ {activity.time}</div></motion.div></motion.div>)}</AnimatePresence>
            <AnimatePresence>{loading && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', gap: 20, marginBottom: 25, paddingLeft: 60 }}>{[1, 2, 3].map((i) => <motion.div key={i} style={{ flex: 1, padding: 20, borderRadius: 16, background: 'rgba(15, 15, 25, 0.5)', border: '1px dashed rgba(255,255,255,0.1)' }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}><div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', marginBottom: 15 }} /><div style={{ height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.05)', marginBottom: 8, width: '60%' }} /><div style={{ height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.05)', width: '40%' }} /></motion.div>)}</motion.div>}</AnimatePresence>
          </div>
        </div>
        {hasMore && <motion.button onClick={loadMore} disabled={loading} style={{ width: '100%', padding: '15px 20px', borderRadius: 12, background: loading ? 'rgba(255,255,255,0.05)' : 'rgba(102, 126, 234, 0.2)', border: loading ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(102, 126, 234, 0.3)', color: loading ? '#666' : '#667eea', fontSize: '0.95rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }} whileHover={loading ? {} : { scale: 1.02 }} whileTap={loading ? {} : { scale: 0.98 }}>{loading ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⚡</motion.span> Loading...</> : <><span>📥</span> Load More Activity</>}</motion.button>}
        {!hasMore && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '15px 20px', borderRadius: 12, background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}><span style={{ fontSize: '1.2rem', marginRight: 8 }}>✓</span>You're all caught up!</motion.div>}
      </motion.div>
    </div>
    </>
  );
}
