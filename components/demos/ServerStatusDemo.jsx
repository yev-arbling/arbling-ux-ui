'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ServerStatusDemo() {
  const [serverData, setServerData] = React.useState({
    cpu: 45, memory: 62, disk: 78, uptime: '15d 8h 32m', status: 'healthy'
  });
  const [cpuHistory, setCpuHistory] = React.useState([45, 52, 48, 61, 55, 43, 50, 58, 62, 55]);
  const [memoryHistory, setMemoryHistory] = React.useState([62, 65, 60, 68, 72, 65, 63, 70, 68, 62]);
  const [selectedServer, setSelectedServer] = React.useState('server-01');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setServerData(prev => ({
        ...prev,
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 15)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 10)),
      }));
      setCpuHistory(prev => [...prev.slice(1), Math.round(serverData.cpu)]);
      setMemoryHistory(prev => [...prev.slice(1), Math.round(serverData.memory)]);
    }, 2000);
    return () => clearInterval(interval);
  }, [serverData.cpu, serverData.memory]);

  const servers = [
    { id: 'server-01', name: 'Production', region: 'US-East', status: 'healthy' },
    { id: 'server-02', name: 'Staging', region: 'EU-West', status: 'healthy' },
    { id: 'server-03', name: 'Dev', region: 'Asia-Pacific', status: 'warning' },
  ];

  const metrics = [
    { label: 'CPU Usage', value: Math.round(serverData.cpu), unit: '%', color: '#667eea', history: cpuHistory, icon: '⚡', trend: '+2.3%' },
    { label: 'Memory', value: Math.round(serverData.memory), unit: '%', color: '#f093fb', history: memoryHistory, icon: '💾', trend: '-1.5%' },
    { label: 'Disk', value: 78, unit: '%', color: '#43e97b', icon: '💿', static: true, trend: '+0.1%' },
    { label: 'Network', value: '1.2', unit: 'GB/s', color: '#ffd93d', icon: '🌐', static: true, trend: '+12%' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'High CPU usage detected on server-01', time: '2 min ago', icon: '⚠️' },
    { id: 2, type: 'info', message: 'Backup completed successfully', time: '15 min ago', icon: 'ℹ️' },
    { id: 3, type: 'success', message: 'All services operational', time: '1 hour ago', icon: '✅' },
  ];

  const getAlertColors = (type) => ({
    warning: { bg: 'rgba(255, 193, 7, 0.15)', border: 'rgba(255, 193, 7, 0.3)', text: '#ffc107' },
    info: { bg: 'rgba(102, 126, 234, 0.15)', border: 'rgba(102, 126, 234, 0.3)', text: '#667eea' },
    success: { bg: 'rgba(67, 233, 123, 0.15)', border: 'rgba(67, 233, 123, 0.3)', text: '#43e97b' },
  }[type]);

  return (
    <>
      <h2 className="demo-title">Server Status</h2>
      <p className="demo-subtitle">Real-time infrastructure monitoring with CPU, memory, uptime, and alerts dashboard.</p>
      <div className="demo-area" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(67, 233, 123, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ width: '100%', maxWidth: 1300, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
          {/* Header with server selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, background: 'linear-gradient(135deg, #fff 0%, #a5b3ce 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Server Status</h2>
              <p style={{ fontSize: '0.95rem', color: '#888' }}>Real-time infrastructure monitoring</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              {/* Server tabs */}
              <div style={{ display: 'flex', gap: 8, padding: 6, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                {servers.map(server => (
                  <motion.button key={server.id} onClick={() => setSelectedServer(server.id)}
                    style={{ padding: '8px 16px', borderRadius: 8, background: selectedServer === server.id ? 'rgba(102, 126, 234, 0.2)' : 'transparent', border: 'none', color: selectedServer === server.id ? '#667eea' : '#888', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    whileHover={{ background: 'rgba(102, 126, 234, 0.1)' }} whileTap={{ scale: 0.97 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: server.status === 'healthy' ? '#43e97b' : '#ffc107' }} />
                    {server.name}
                  </motion.button>
                ))}
              </div>
              {/* Status badge */}
              <motion.div style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(67, 233, 123, 0.15)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(67, 233, 123, 0.3)', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 0 30px rgba(67, 233, 123, 0.2)' }}
                animate={{ boxShadow: ['0 0 20px rgba(67, 233, 123, 0.2)', '0 0 40px rgba(67, 233, 123, 0.3)', '0 0 20px rgba(67, 233, 123, 0.2)'] }}
                transition={{ duration: 2, repeat: Infinity }}>
                <motion.div style={{ width: 10, height: 10, borderRadius: '50%', background: '#43e97b' }}
                  animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 0px #43e97b', '0 0 15px #43e97b', '0 0 0px #43e97b'] }}
                  transition={{ duration: 1.5, repeat: Infinity }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#43e97b', letterSpacing: '0.5px' }}>ONLINE</span>
              </motion.div>
            </div>
          </div>

          {/* Uptime bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ padding: 20, borderRadius: 16, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <div style={{ fontSize: '1.5rem' }}>⏱️</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500, marginBottom: 4 }}>UPTIME</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{serverData.uptime}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 30 }}>
              {[{ label: 'Requests/s', value: '12.4K' }, { label: 'Latency', value: '24ms' }, { label: 'Errors', value: '0.02%' }].map((stat, i) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500, marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: i === 2 ? '#43e97b' : '#fff' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metrics grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {metrics.map((metric, index) => (
              <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.2 }}
                style={{ padding: 25, borderRadius: 20, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}
                whileHover={{ borderColor: `${metric.color}40`, y: -4, boxShadow: `0 20px 40px ${metric.color}15` }}>
                {/* Subtle glow */}
                <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: `radial-gradient(circle, ${metric.color}15 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 45, height: 45, borderRadius: 12, background: `${metric.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{metric.icon}</div>
                    <div style={{ fontSize: '0.85rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{metric.label}</div>
                  </div>
                  <div style={{ padding: '4px 10px', borderRadius: 20, background: metric.trend.startsWith('+') ? 'rgba(67, 233, 123, 0.15)' : 'rgba(255, 107, 107, 0.15)', fontSize: '0.75rem', fontWeight: 600, color: metric.trend.startsWith('+') ? '#43e97b' : '#ff6b6b' }}>
                    {metric.trend}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20, position: 'relative' }}>
                  <motion.span style={{ fontSize: '3rem', fontWeight: 800, color: metric.color, textShadow: `0 0 30px ${metric.color}40` }}
                    key={metric.value} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    {metric.value}
                  </motion.span>
                  <span style={{ fontSize: '1.3rem', color: '#888', fontWeight: 600 }}>{metric.unit}</span>
                </div>
                {!metric.static && metric.history.length > 0 && (
                  <svg width="100%" height="70" style={{ overflow: 'visible' }}>
                    <defs>
                      <linearGradient id={`grad-${metric.label}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={metric.color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={`M0,${70 - (metric.history[0] / 100) * 70} ${metric.history.map((v, i) => `L${(i / (metric.history.length - 1)) * 280},${70 - (v / 100) * 70}`).join(' ')} L280,70 L0,70 Z`}
                      fill={`url(#grad-${metric.label})`} />
                    <path d={`M0,${70 - (metric.history[0] / 100) * 70} ${metric.history.map((v, i) => `L${(i / (metric.history.length - 1)) * 280},${70 - (v / 100) * 70}`).join(' ')}`}
                      fill="none" stroke={metric.color} strokeWidth="3" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 10px ${metric.color}80)` }} />
                    <circle cx="280" cy={70 - (metric.history[metric.history.length - 1] / 100) * 70} r="5" fill={metric.color} style={{ filter: `drop-shadow(0 0 8px ${metric.color})` }} />
                  </svg>
                )}
                {metric.static && (
                  <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <motion.div style={{ height: '100%', background: `linear-gradient(90deg, ${metric.color}, ${metric.color}aa)`, boxShadow: `0 0 20px ${metric.color}50` }}
                      initial={{ width: 0 }} animate={{ width: `${metric.value}%` }} transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alerts panel */}
        <div style={{ padding: 25, borderRadius: 20, background: 'rgba(20, 20, 35, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Recent Alerts</h3>
            <div style={{ padding: '6px 12px', borderRadius: 20, background: 'rgba(255, 107, 107, 0.15)', fontSize: '0.75rem', fontWeight: 700, color: '#ff6b6b' }}>
              3 NEW
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {alerts.map((alert, index) => {
              const colors = getAlertColors(alert.type);
              return (
                <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                  style={{ padding: 16, borderRadius: 14, background: colors.bg, border: `1px solid ${colors.border}`, cursor: 'pointer' }}
                  whileHover={{ x: 4, borderColor: colors.text }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: '1rem' }}>{alert.icon}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {alert.type}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>{alert.message}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{alert.time}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick actions */}
          <div style={{ marginTop: 25, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#888', marginBottom: 12 }}>Quick Actions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[{ label: 'Restart', icon: '🔄' }, { label: 'Logs', icon: '📋' }, { label: 'Scale', icon: '📈' }, { label: 'Backup', icon: '💾' }].map(action => (
                <motion.button key={action.label}
                  style={{ padding: '12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                  whileHover={{ background: 'rgba(102, 126, 234, 0.1)', borderColor: 'rgba(102, 126, 234, 0.3)' }} whileTap={{ scale: 0.97 }}>
                  {action.icon} {action.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
}
