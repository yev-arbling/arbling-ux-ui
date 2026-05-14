'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FeatureTabsDemo() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [isAutoCycling, setIsAutoCycling] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: '📊', color: '#667eea', title: 'Real-Time Analytics', desc: 'Live dashboards with customizable widgets, predictive insights, and AI-powered recommendations.', features: ['Live dashboards', 'Predictive AI', 'Custom reports', '50+ integrations'], metrics: { users: '2.4M', growth: '+127%', rating: '4.9' } },
    { id: 'automation', label: 'Automation', icon: '⚡', color: '#43e97b', title: 'Smart Workflows', desc: 'Visual workflow builder with 500+ triggers, conditional logic, and webhook support.', features: ['Visual builder', 'Webhooks', 'Conditional logic', 'API access'], metrics: { saved: '12hrs', tasks: '50K+', accuracy: '99.9%' } },
    { id: 'security', label: 'Security', icon: '🔐', color: '#f5576c', title: 'Enterprise Security', desc: 'Bank-level encryption, SOC2 Type II compliance, and advanced threat detection.', features: ['AES-256', 'SOC2 Type II', 'SSO/SAML', 'Audit logs'], metrics: { uptime: '99.99%', threats: '0', certified: 'ISO 27001' } },
    { id: 'collab', label: 'Collaborate', icon: '👥', color: '#4facfe', title: 'Team Collaboration', desc: 'Real-time editing, comments, version history, and seamless team permissions.', features: ['Real-time sync', 'Comments', 'Version history', 'Permissions'], metrics: { teams: '10K+', files: '5M', countries: '120+' } },
  ];

  React.useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setActiveTab(t => (t + 1) % tabs.length); setDirection(1); return 0; }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isAutoCycling, tabs.length]);

  const handleTabChange = (newTab) => {
    setDirection(newTab > activeTab ? 1 : -1);
    setActiveTab(newTab);
    setProgress(0);
    setIsAutoCycling(false);
  };

  const TabVisual = ({ type, color }) => {
    if (type === 'analytics') {
      const bars = [40, 65, 45, 80, 55, 90, 70, 85];
      return (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px', marginBottom: '12px' }}>
            {bars.map((h, i) => (
              <motion.div key={i} style={{ flex: 1, background: i === bars.length - 1 ? color : `${color}60`, borderRadius: '4px 4px 0 0' }}
                initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.08, duration: 0.4, type: 'spring' }} />
            ))}
          </div>
          <motion.div style={{ display: 'flex', gap: '8px' }}>
            {[{ label: 'Views', val: '24.5K' }, { label: 'Conv.', val: '8.2%' }].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color }}>{m.val}</div>
                <div style={{ fontSize: '0.6rem', color: '#888' }}>{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      );
    }
    if (type === 'automation') {
      const steps = [{ icon: '📥', label: 'Trigger' }, { icon: '⚙️', label: 'Process' }, { icon: '📤', label: 'Action' }];
      return (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div style={{ textAlign: 'center' }}
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.2, type: 'spring' }}>
                  <motion.div style={{ width: 44, height: 44, borderRadius: '12px', background: `${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', margin: '0 auto 4px' }}
                    animate={{ boxShadow: [`0 0 0 0 ${color}00`, `0 0 0 8px ${color}30`, `0 0 0 0 ${color}00`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                    {step.icon}
                  </motion.div>
                  <div style={{ fontSize: '0.65rem', color: '#888' }}>{step.label}</div>
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.1)', margin: '0 8px', position: 'relative', marginBottom: '16px' }}>
                    <motion.div style={{ height: '100%', background: color, borderRadius: 1 }}
                      initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.3 + i * 0.3, duration: 0.5 }} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            style={{ marginTop: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.7rem', color: '#43e97b' }}>
            ✓ Workflow running • 1,247 tasks completed today
          </motion.div>
        </div>
      );
    }
    if (type === 'security') {
      return (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <motion.div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 12px' }}>
            <motion.div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${color}` }}
              animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
            <motion.div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', border: `2px dashed ${color}50` }}
              animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🔐</div>
          </motion.div>
          <motion.div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
            {['AES', 'SOC2', 'ISO'].map((cert, i) => (
              <motion.span key={cert} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                style={{ fontSize: '0.6rem', padding: '3px 8px', background: `${color}20`, color, borderRadius: '4px', fontWeight: 600 }}>
                {cert}
              </motion.span>
            ))}
          </motion.div>
        </div>
      );
    }
    return (
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {[1, 2, 3].map(i => (
            <motion.div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: `${color}${i === 1 ? '' : '40'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginLeft: i > 1 ? '-12px' : 0, border: '2px solid #1a1a2e' }}
              initial={{ scale: 0, x: 20 }} animate={{ scale: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              {['👤', '👩', '👨'][i-1]}
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ marginLeft: '8px', fontSize: '0.7rem', color: '#888', display: 'flex', alignItems: 'center' }}>
            +12 editing
          </motion.div>
        </div>
        <motion.div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px' }}>
          {[1, 2, 3].map(i => (
            <motion.div key={i} initial={{ width: 0 }} animate={{ width: `${90 - i * 20}%` }} transition={{ delay: 0.5 + i * 0.1 }}
              style={{ height: 6, background: i === 1 ? color : 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: i < 3 ? 6 : 0 }} />
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Feature Tabs</h2>
        <p className="demo-subtitle">Auto-cycling tabs with animated indicator, metrics, and live demos</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '0', background: 'rgba(20,20,30,0.8)', borderRadius: '16px', padding: '6px', position: 'relative' }}>
              <motion.div layoutId="tabBg" style={{ position: 'absolute', top: 6, bottom: 6, borderRadius: '12px', background: tabs[activeTab].color }}
                animate={{ left: `calc(${activeTab * 25}% + 6px)`, width: 'calc(25% - 6px)' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
              {tabs.map((tab, i) => (
                <motion.button key={tab.id} onClick={() => handleTabChange(i)}
                  style={{ flex: 1, padding: '12px 8px', borderRadius: '10px', border: 'none', background: 'transparent', color: activeTab === i ? '#fff' : '#888', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  whileHover={{ color: '#fff' }} whileTap={{ scale: 0.98 }}>
                  <span>{tab.icon}</span>
                  <span style={{ display: 'none' }}>{tab.label}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>
            {isAutoCycling && (
              <motion.div style={{ position: 'absolute', bottom: 0, left: `calc(${activeTab * 25}% + 6px)`, width: 'calc(25% - 6px)', height: 2 }}>
                <motion.div style={{ height: '100%', background: '#fff', borderRadius: 1 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.08 }} />
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={activeTab} custom={direction}
              initial={{ opacity: 0, x: direction * 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -60, scale: 0.95 }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
              style={{ background: 'rgba(20,20,30,0.9)', borderRadius: '20px', overflow: 'hidden', border: `1px solid ${tabs[activeTab].color}30`, backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
                <div style={{ padding: '24px' }}>
                  <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${tabs[activeTab].color}20`, padding: '6px 12px', borderRadius: '20px', marginBottom: '12px' }}
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <span style={{ fontSize: '1.2rem' }}>{tabs[activeTab].icon}</span>
                    <span style={{ fontSize: '0.75rem', color: tabs[activeTab].color, fontWeight: 600 }}>{tabs[activeTab].label}</span>
                  </motion.div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em' }}>{tabs[activeTab].title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#999', lineHeight: 1.6, marginBottom: '16px' }}>{tabs[activeTab].desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {tabs[activeTab].features.map((feat, i) => (
                      <motion.span key={feat} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        style={{ fontSize: '0.7rem', padding: '5px 10px', background: `${tabs[activeTab].color}15`, color: tabs[activeTab].color, borderRadius: '6px', fontWeight: 500 }}>
                        ✓ {feat}
                      </motion.span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {Object.entries(tabs[activeTab].metrics).map(([key, val], i) => (
                      <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{val}</div>
                        <div style={{ fontSize: '0.65rem', color: '#666', textTransform: 'capitalize' }}>{key}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div style={{ background: `linear-gradient(135deg, ${tabs[activeTab].color}15 0%, ${tabs[activeTab].color}05 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '220px', position: 'relative', overflow: 'hidden' }}>
                  <motion.div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${tabs[activeTab].color}20 0%, transparent 70%)` }}
                    animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} />
                  <TabVisual type={tabs[activeTab].id} color={tabs[activeTab].color} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', gap: '8px' }}>
            <motion.button onClick={() => setIsAutoCycling(!isAutoCycling)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(30,30,40,0.6)', color: '#888', cursor: 'pointer', fontSize: '0.75rem' }}>
              {isAutoCycling ? '⏸ Pause' : '▶ Auto-play'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
