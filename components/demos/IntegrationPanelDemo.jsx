'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const integrations = [
  { id: 'slack', name: 'Slack', icon: '💼', color: '#4A154B', connected: true, desc: 'Team communication' },
  { id: 'gmail', name: 'Gmail', icon: '📧', color: '#EA4335', connected: true, desc: 'Email service' },
  { id: 'stripe', name: 'Stripe', icon: '💳', color: '#635BFF', connected: false, desc: 'Payment processing' },
  { id: 'github', name: 'GitHub', icon: '🐙', color: '#24292e', connected: true, desc: 'Code repository' },
  { id: 'notion', name: 'Notion', icon: '📝', color: '#000000', connected: false, desc: 'Workspace & docs' },
  { id: 'airtable', name: 'Airtable', icon: '🗂️', color: '#18BFFF', connected: false, desc: 'Database platform' },
  { id: 'twilio', name: 'Twilio', icon: '📱', color: '#F22F46', connected: true, desc: 'SMS & voice' },
  { id: 'hubspot', name: 'HubSpot', icon: '🎯', color: '#FF7A59', connected: false, desc: 'CRM platform' },
  { id: 'salesforce', name: 'Salesforce', icon: '☁️', color: '#00A1E0', connected: false, desc: 'Sales CRM' },
];

export default function IntegrationPanelDemo() {
  const [filter, setFilter] = React.useState('all');
  const [selectedIntegration, setSelectedIntegration] = React.useState(null);

  const filteredIntegrations = filter === 'all'
    ? integrations
    : integrations.filter(i => filter === 'connected' ? i.connected : !i.connected);

  const stats = {
    total: integrations.length,
    connected: integrations.filter(i => i.connected).length,
    available: integrations.filter(i => !i.connected).length,
  };

  return (
    <>
      <h2 className="demo-title">Integration Panel</h2>
      <p className="demo-subtitle">Third-party app connections. Connect your favorite tools and services.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginBottom: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {[
              { label: 'Total', value: stats.total, color: '#667eea' },
              { label: 'Connected', value: stats.connected, color: '#43e97b' },
              { label: 'Available', value: stats.available, color: '#fbbf24' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {['all', 'connected', 'available'].map(f => (
              <motion.button
                key={f}
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
              </motion.button>
            ))}
          </div>

          {/* Integrations grid */}
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredIntegrations.map((integration, i) => (
                <motion.div
                  key={integration.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedIntegration(integration)}
                  style={{
                    padding: 20,
                    background: selectedIntegration?.id === integration.id ? `${integration.color}15` : 'rgba(20, 20, 35, 0.6)',
                    border: `2px solid ${selectedIntegration?.id === integration.id ? integration.color : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 16,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {integration.connected && (
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#43e97b',
                      boxShadow: '0 0 10px rgba(67, 233, 123, 0.6)',
                    }} />
                  )}

                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{integration.icon}</div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>{integration.name}</h3>

                  <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: 16 }}>{integration.desc}</p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: integration.connected ? 'rgba(255, 107, 107, 0.15)' : `linear-gradient(135deg, ${integration.color}, ${integration.color}cc)`,
                      border: integration.connected ? '1px solid rgba(255, 107, 107, 0.3)' : 'none',
                      borderRadius: 8,
                      color: integration.connected ? '#ff6b6b' : '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Selected integration details */}
          <AnimatePresence>
            {selectedIntegration && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  marginTop: 30,
                  padding: 24,
                  background: 'rgba(20, 20, 35, 0.8)',
                  border: `1px solid ${selectedIntegration.color}50`,
                  borderRadius: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${selectedIntegration.color}, ${selectedIntegration.color}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}>
                    {selectedIntegration.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>{selectedIntegration.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>{selectedIntegration.desc}</p>
                  </div>
                  <div style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    background: selectedIntegration.connected ? 'rgba(67, 233, 123, 0.15)' : 'rgba(255, 107, 107, 0.15)',
                    color: selectedIntegration.connected ? '#43e97b' : '#ff6b6b',
                  }}>
                    {selectedIntegration.connected ? 'Connected' : 'Not connected'}
                  </div>
                </div>

                {selectedIntegration.connected && (
                  <div style={{
                    padding: 16,
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 8, textTransform: 'uppercase' }}>Connection Details</div>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', fontFamily: 'monospace' }}>
                      Last synced: 2 minutes ago<br />
                      Status: Active<br />
                      API calls: 1,234 / 10,000
                    </div>
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
