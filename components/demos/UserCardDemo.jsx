'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function UserCardDemo() {
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Alex Thompson', username: '@alexthompson', avatar: '👨‍💻', cover: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', bio: 'Full-stack developer | Open source enthusiast | Building the future one commit at a time 🚀', location: 'San Francisco, CA', website: 'alexthompson.dev', stats: { posts: 248, followers: '12.4K', following: 892 }, skills: ['React', 'Node.js', 'Python', 'AWS'], isFollowing: false, isVerified: true },
    { id: 2, name: 'Sarah Chen', username: '@sarahchen', avatar: '👩‍🎨', cover: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', bio: 'UI/UX Designer | Creating beautiful experiences | Coffee lover ☕ | Always learning', location: 'New York, NY', website: 'sarahchen.design', stats: { posts: 156, followers: '8.7K', following: 445 }, skills: ['Figma', 'Sketch', 'React', 'Animation'], isFollowing: true, isVerified: false },
    { id: 3, name: 'Marcus Johnson', username: '@marcusj', avatar: '🧑‍🚀', cover: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', bio: 'Startup founder | Tech speaker | Building AI tools that matter | Let\'s connect!', location: 'Austin, TX', website: 'marcusj.io', stats: { posts: 412, followers: '45.2K', following: 1203 }, skills: ['AI/ML', 'Product', 'Leadership', 'Strategy'], isFollowing: false, isVerified: true },
  ]);
  const [selectedUser, setSelectedUser] = React.useState(users[0]);
  const toggleFollow = (userId) => {
    setUsers(prev => prev.map(user => user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user));
    if (selectedUser.id === userId) setSelectedUser(prev => ({ ...prev, isFollowing: !prev.isFollowing }));
  };
  return (
    <>
      <h2 className="demo-title">User Card</h2>
      <p className="demo-subtitle">Rich profile cards with avatar, stats, bio, skills, and social actions</p>
      <div className="demo-area">
        <div style={{ display: 'flex', gap: 30, width: '100%', maxWidth: 1000, flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.div style={{ flex: '0 0 280px', display: 'flex', flexDirection: 'column', gap: 12 }} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
            {users.map((user, index) => (
              <motion.div key={user.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} onClick={() => setSelectedUser(user)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: selectedUser.id === user.id ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255,255,255,0.03)', border: selectedUser.id === user.id ? '1px solid rgba(102, 126, 234, 0.4)' : '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }} whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.06)' }} whileTap={{ scale: 0.98 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: user.cover, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{user.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}><span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{user.name}</span>{user.isVerified && <span style={{ color: '#3b82f6' }}>✓</span>}</div><div style={{ fontSize: '0.8rem', color: '#888' }}>{user.username}</div></div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div key={selectedUser.id} style={{ flex: 1, minWidth: 320, maxWidth: 450, background: 'rgba(20, 20, 30, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
            <div style={{ height: 140, background: selectedUser.cover, position: 'relative' }}>
              <motion.div style={{ position: 'absolute', top: 15, right: 15, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.9 }}>⋯</motion.div>
            </div>
            <div style={{ padding: 25 }}>
              <motion.div style={{ width: 100, height: 100, borderRadius: '50%', background: selectedUser.cover, border: '4px solid rgba(20, 20, 30, 1)', marginTop: -50, marginBottom: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}>
                {selectedUser.avatar}
                {selectedUser.isVerified && <motion.div style={{ position: 'absolute', bottom: 5, right: 5, width: 28, height: 28, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', border: '3px solid rgba(20, 20, 30, 1)' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>✓</motion.div>}
              </motion.div>
              <div style={{ marginBottom: 15 }}><h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{selectedUser.name}</h3><div style={{ color: '#888', fontSize: '0.95rem' }}>{selectedUser.username}</div></div>
              <p style={{ color: '#ccc', lineHeight: 1.6, fontSize: '0.9rem', marginBottom: 15 }}>{selectedUser.bio}</p>
              <div style={{ display: 'flex', gap: 20, marginBottom: 20, fontSize: '0.85rem', color: '#888' }}><span>📍 {selectedUser.location}</span><span>🔗 {selectedUser.website}</span></div>
              <div style={{ display: 'flex', gap: 30, marginBottom: 20, padding: '15px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {[{ label: 'Posts', value: selectedUser.stats.posts }, { label: 'Followers', value: selectedUser.stats.followers }, { label: 'Following', value: selectedUser.stats.following }].map((stat, index) => (
                  <motion.div key={stat.label} style={{ flex: 1, textAlign: 'center' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 2 }}>{stat.value}</div><div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}><div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Skills</div><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{selectedUser.skills.map((skill, index) => <motion.span key={skill} style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(102, 126, 234, 0.15)', border: '1px solid rgba(102, 126, 234, 0.3)', color: '#a5b4fc', fontSize: '0.8rem' }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + index * 0.05 }} whileHover={{ scale: 1.05, background: 'rgba(102, 126, 234, 0.25)' }}>{skill}</motion.span>)}</div></div>
              <div style={{ display: 'flex', gap: 12 }}>
                <motion.button onClick={() => toggleFollow(selectedUser.id)} style={{ flex: 1, padding: '12px 20px', background: selectedUser.isFollowing ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #667eea, #764ba2)', border: selectedUser.isFollowing ? '1px solid rgba(255,255,255,0.2)' : 'none', borderRadius: 12, color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{selectedUser.isFollowing ? '✓ Following' : '+ Follow'}</motion.button>
                <motion.button style={{ flex: 1, padding: '12px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.98 }}>Message</motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
