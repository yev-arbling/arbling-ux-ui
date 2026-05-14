'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function StatsDashboardDemo() {
  const [timeRange, setTimeRange] = React.useState('7d');
  const [stats] = React.useState({ revenue: { value: '$48,295', change: '+12.5%', trend: 'up', data: [30, 35, 32, 38, 42, 45, 48] }, users: { value: '12,847', change: '+8.2%', trend: 'up', data: [10, 11, 10.5, 11.2, 11.8, 12.2, 12.8] }, orders: { value: '1,284', change: '-3.1%', trend: 'down', data: [15, 14, 13, 14, 13, 12, 12.8] }, conversion: { value: '3.24%', change: '+0.8%', trend: 'up', data: [2.8, 2.9, 3.0, 3.1, 3.15, 3.2, 3.24] } });
  const barData = [{ label: 'Mon', value: 65 }, { label: 'Tue', value: 78 }, { label: 'Wed', value: 52 }, { label: 'Thu', value: 85 }, { label: 'Fri', value: 92 }, { label: 'Sat', value: 68 }, { label: 'Sun', value: 45 }];
  return (
    <>
      <h2 className="demo-title">Stats Dashboard</h2>
      <p className="demo-subtitle">Analytics dashboard with revenue, users, orders metrics and charts.</p>
      <div className="demo-area" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '5%', left: '10%', width: 550, height: 550, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(67, 233, 123, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div style={{ width: 1400, height: 800, background: 'rgba(20, 20, 30, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: 35, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <div><h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Analytics Dashboard</h2><p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#888' }}>Real-time metrics and insights</p></div>
          <div style={{ display: 'flex', gap: 10 }}>{['24h', '7d', '30d', '90d'].map(range => <motion.button key={range} onClick={() => setTimeRange(range)} style={{ padding: '10px 20px', borderRadius: 10, background: timeRange === range ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.05)', border: timeRange === range ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.1)', color: timeRange === range ? '#667eea' : '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{range}</motion.button>)}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 30 }}>
          {Object.entries(stats).map(([key, stat], index) => <motion.div key={key} style={{ padding: 25, borderRadius: 16, background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, borderColor: stat.trend === 'up' ? 'rgba(67, 233, 123, 0.3)' : 'rgba(255, 107, 107, 0.3)' }}><svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 80, opacity: 0.3 }}><polyline fill="none" stroke={stat.trend === 'up' ? '#43e97b' : '#ff6b6b'} strokeWidth="2" points={stat.data.map((val, i) => `${i * (100 / (stat.data.length - 1))},${80 - (val / Math.max(...stat.data)) * 80}`).join(' ')} /></svg><div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{key}</div><div style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>{stat.value}</div><div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 600, color: stat.trend === 'up' ? '#43e97b' : '#ff6b6b' }}><span>{stat.trend === 'up' ? '↑' : '↓'}</span><span>{stat.change}</span><span style={{ color: '#888', fontWeight: 400 }}>vs last period</span></div></motion.div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, flex: 1 }}>
          <motion.div style={{ padding: 25, borderRadius: 16, background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 700 }}>Performance Trends</h3>
            <div style={{ flex: 1, position: 'relative' }}><svg style={{ width: '100%', height: '100%' }}>{[0, 25, 50, 75, 100].map((y, i) => <line key={i} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}<motion.polyline fill="none" stroke="#667eea" strokeWidth="3" points="0,70 16.6,60 33.3,65 50,50 66.6,40 83.3,35 100,25" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} strokeLinecap="round" /><motion.polyline fill="none" stroke="#43e97b" strokeWidth="3" points="0,80 16.6,75 33.3,78 50,70 66.6,65 83.3,60 100,55" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }} strokeLinecap="round" /></svg></div>
            <div style={{ display: 'flex', gap: 20, marginTop: 15 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: '#667eea' }} /><span style={{ fontSize: '0.85rem', color: '#888' }}>Revenue</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: '#43e97b' }} /><span style={{ fontSize: '0.85rem', color: '#888' }}>Users</span></div></div>
          </motion.div>
          <motion.div style={{ padding: 25, borderRadius: 16, background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 700 }}>Weekly Activity</h3>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 15, paddingBottom: 20 }}>{barData.map((item, index) => <motion.div key={item.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + index * 0.1 }}><motion.div style={{ width: '100%', height: `${item.value * 3}px`, minHeight: 20, borderRadius: 8, background: 'linear-gradient(180deg, #667eea, #764ba2)', position: 'relative' }} initial={{ height: 0 }} animate={{ height: `${item.value * 3}px` }} transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }} whileHover={{ background: 'linear-gradient(180deg, #4facfe, #00f2fe)' }} /><div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500 }}>{item.label}</div></motion.div>)}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
    </>
  );
}
