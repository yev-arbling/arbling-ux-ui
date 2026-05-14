'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const triggers = [
  { id: 'webhook', name: 'Webhook', icon: '🔗', desc: 'HTTP webhook endpoint', color: '#667eea' },
  { id: 'schedule', name: 'Schedule', icon: '⏰', desc: 'Cron-based timing', color: '#f093fb' },
  { id: 'email', name: 'Email Received', icon: '📧', desc: 'Incoming email', color: '#43e97b' },
  { id: 'form', name: 'Form Submit', icon: '📝', desc: 'Form submission', color: '#fbbf24' },
  { id: 'database', name: 'Database Event', icon: '💾', desc: 'DB insert/update', color: '#ff6b6b' },
  { id: 'file', name: 'File Upload', icon: '📁', desc: 'File received', color: '#a78bfa' },
];

export default function AutomationTriggerDemo() {
  const [selected, setSelected] = React.useState(null);
  const [config, setConfig] = React.useState({
    schedule: '0 9 * * *',
    webhook: 'https://api.example.com/webhook',
  });

  return (
    <>
      <h2 className="demo-title">Automation Triggers</h2>
      <p className="demo-subtitle">Configure workflow triggers. Select a trigger type and set up its parameters.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Trigger Grid */}
          <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 30 }}>
            {triggers.map((trigger, i) => (
              <motion.div
                key={trigger.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.05, y: -4, boxShadow: `0 10px 30px ${trigger.color}30` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(trigger.id)}
                style={{
                  padding: 20,
                  background: selected === trigger.id ? `linear-gradient(135deg, ${trigger.color}30, ${trigger.color}15)` : 'rgba(20, 20, 35, 0.6)',
                  border: `2px solid ${selected === trigger.id ? trigger.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 16,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {selected === trigger.id && (
                  <motion.div
                    layoutId="activeTrigger"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${trigger.color}15, transparent)`,
                      borderRadius: 16,
                    }}
                  />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ rotate: selected === trigger.id ? [0, -10, 10, -10, 0] : 0, scale: selected === trigger.id ? 1.1 : 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '2rem', marginBottom: 8 }}
                  >
                    {trigger.icon}
                  </motion.div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4 }}>{trigger.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{trigger.desc}</div>
                  {selected === trigger.id && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: trigger.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        color: '#000',
                        fontWeight: 700,
                        boxShadow: `0 4px 15px ${trigger.color}60`,
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Configuration Panel */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  padding: 30,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${triggers.find(t => t.id === selected)?.color}, ${triggers.find(t => t.id === selected)?.color}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {triggers.find(t => t.id === selected)?.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>Configure {triggers.find(t => t.id === selected)?.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#888' }}>Set up trigger parameters</p>
                  </div>
                </div>

                {selected === 'schedule' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: 8 }}>Cron Expression</label>
                    <input
                      type="text"
                      value={config.schedule}
                      onChange={(e) => setConfig(prev => ({ ...prev, schedule: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                      }}
                    />
                    <p style={{ fontSize: '0.75rem', color: '#666', marginTop: 8 }}>Runs daily at 9:00 AM</p>
                  </div>
                )}

                {selected === 'webhook' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: 8 }}>Webhook URL</label>
                    <input
                      type="text"
                      value={config.webhook}
                      onChange={(e) => setConfig(prev => ({ ...prev, webhook: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        marginTop: 16,
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none',
                        borderRadius: 8,
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Test Webhook
                    </motion.button>
                  </div>
                )}

                {!['schedule', 'webhook'].includes(selected) && (
                  <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 12 }}>{triggers.find(t => t.id === selected)?.icon}</div>
                    <p>Configuration panel for {triggers.find(t => t.id === selected)?.name}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
