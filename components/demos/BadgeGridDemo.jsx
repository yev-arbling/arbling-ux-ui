'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function BadgeGridDemo() {
  const [badges] = React.useState([
    { id: 1, name: 'Early Adopter', description: 'Joined in first month', icon: '🌟', category: 'Community', progress: 100, unlocked: true, color: '#ffd93d' },
    { id: 2, name: 'Code Master', description: '50 challenges', icon: '💻', category: 'Skills', progress: 85, unlocked: false, color: '#667eea' },
    { id: 3, name: 'Helper', description: 'Helped 100 users', icon: '🤝', category: 'Community', progress: 60, unlocked: false, color: '#43e97b' },
    { id: 4, name: 'Streak Champion', description: '30-day streak', icon: '🔥', category: 'Engagement', progress: 100, unlocked: true, color: '#ff6b6b' },
    { id: 5, name: 'Bug Hunter', description: 'Found 10 bugs', icon: '🐛', category: 'Skills', progress: 40, unlocked: false, color: '#f093fb' },
    { id: 6, name: 'Top Contributor', description: 'Top 10 this month', icon: '🏆', category: 'Community', progress: 75, unlocked: false, color: '#4facfe' },
    { id: 7, name: 'Quick Learner', description: '5 tutorials in one day', icon: '⚡', category: 'Engagement', progress: 100, unlocked: true, color: '#ffd93d' },
    { id: 8, name: 'Mentor', description: 'Mentored 5 new users', icon: '👨‍🏫', category: 'Community', progress: 20, unlocked: false, color: '#43e97b' },
  ]);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const categories = ['All', 'Community', 'Skills', 'Engagement'];
  const filteredBadges = selectedCategory === 'All' ? badges : badges.filter(b => b.category === selectedCategory);
  const unlockedCount = badges.filter(b => b.unlocked).length;
  return (
    <>
      <h2 className="demo-title">Badge Grid</h2>
      <p className="demo-subtitle">Achievement badges with progress tracking, filtering by category.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255, 217, 61, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div style={{ width: 1300, height: 750, background: 'rgba(20, 20, 30, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: 35, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
        <div style={{ marginBottom: 25 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #ffd93d, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Achievement Badges</h2>
          <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#888' }}>Track progress and unlock rewards</p>
        </div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 25 }}>
          <motion.div style={{ flex: 1, padding: '20px 25px', borderRadius: 16, background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 20 }}><div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #ffd93d, #ff6b6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏆</div><div><div style={{ fontSize: '2rem', fontWeight: 700, background: 'linear-gradient(135deg, #ffd93d, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{unlockedCount}/{badges.length}</div><div style={{ fontSize: '0.85rem', color: '#888' }}>Badges Unlocked</div></div></motion.div>
          <motion.div style={{ flex: 1, padding: '20px 25px', borderRadius: 16, background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 20 }}><div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #43e97b, #4facfe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>⭐</div><div><div style={{ fontSize: '2rem', fontWeight: 700, background: 'linear-gradient(135deg, #43e97b, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{Math.round(badges.reduce((sum, b) => sum + b.progress, 0) / badges.length)}%</div><div style={{ fontSize: '0.85rem', color: '#888' }}>Overall Progress</div></div></motion.div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 25 }}>
          {categories.map(category => <motion.button key={category} onClick={() => setSelectedCategory(category)} style={{ padding: '10px 20px', borderRadius: 25, background: selectedCategory === category ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.05)', border: selectedCategory === category ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.1)', color: selectedCategory === category ? '#667eea' : '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{category}</motion.button>)}
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, overflowY: 'auto' }}>
          <AnimatePresence>{filteredBadges.map((badge, index) => <motion.div key={badge.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.05 }} style={{ padding: 25, borderRadius: 20, background: badge.unlocked ? `${badge.color}11` : 'rgba(15, 15, 25, 0.9)', border: badge.unlocked ? `1px solid ${badge.color}` : '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }} whileHover={{ scale: 1.03, borderColor: badge.color }}><motion.div style={{ width: 70, height: 70, borderRadius: '50%', background: badge.unlocked ? `linear-gradient(135deg, ${badge.color}, ${badge.color}cc)` : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 15px', filter: badge.unlocked ? 'none' : 'grayscale(1)' }}>{badge.icon}</motion.div><div style={{ fontSize: '1rem', fontWeight: 700, color: badge.unlocked ? badge.color : '#888', textAlign: 'center', marginBottom: 8 }}>{badge.name}</div><div style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginBottom: 15 }}>{badge.description}</div><div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#888', marginBottom: 5 }}><span>Progress</span><span>{badge.progress}%</span></div><div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}><motion.div style={{ height: '100%', background: `linear-gradient(90deg, ${badge.color}, ${badge.color}cc)`, borderRadius: 3 }} initial={{ width: 0 }} animate={{ width: `${badge.progress}%` }} /></div></div></motion.div>)}</AnimatePresence>
        </div>
      </motion.div>
    </div>
    </>
  );
}
