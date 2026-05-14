'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const errorScenarios = [
  { id: 1, type: 'Network Timeout', desc: 'API request exceeds timeout', color: '#ff6b6b', icon: '⏱️' },
  { id: 2, type: 'Rate Limit', desc: 'Too many requests', color: '#fbbf24', icon: '🚫' },
  { id: 3, type: 'Authentication', desc: 'Invalid credentials', color: '#f093fb', icon: '🔒' },
  { id: 4, type: 'Data Validation', desc: 'Invalid input format', color: '#a78bfa', icon: '✗' },
];

const strategies = [
  { id: 'retry', label: 'Retry with Backoff', desc: 'Exponential backoff strategy', icon: '🔄', enabled: true },
  { id: 'fallback', label: 'Fallback Action', desc: 'Execute alternative workflow', icon: '↩️', enabled: true },
  { id: 'notify', label: 'Send Notification', desc: 'Alert team via Slack', icon: '📢', enabled: false },
  { id: 'log', label: 'Log to Database', desc: 'Store error details', icon: '📝', enabled: true },
];

export default function ErrorHandlingDemo() {
  const [selectedScenario, setSelectedScenario] = React.useState(errorScenarios[0]);
  const [retryCount, setRetryCount] = React.useState(3);
  const [backoffDelay, setBackoffDelay] = React.useState(5);
  const [simulating, setSimulating] = React.useState(false);
  const [attempts, setAttempts] = React.useState([]);

  const simulateError = () => {
    setSimulating(true);
    setAttempts([]);

    let delay = 0;
    for (let i = 1; i <= retryCount; i++) {
      delay += backoffDelay * Math.pow(2, i - 1) * 1000;
      setTimeout(() => {
        setAttempts(prev => [...prev, {
          id: i,
          timestamp: new Date().toLocaleTimeString(),
          status: i === retryCount ? 'success' : 'failed',
          delay: backoffDelay * Math.pow(2, i - 1),
        }]);
        if (i === retryCount) setSimulating(false);
      }, delay);
    }
  };

  return (
    <>
      <h2 className="demo-title">Error Handling</h2>
      <p className="demo-subtitle">Retry logic and fallback strategies. Configure how workflows handle failures.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
            {/* Error scenarios */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Error Scenarios</h3>
              {errorScenarios.map((scenario, i) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedScenario(scenario)}
                  style={{
                    marginBottom: 12,
                    padding: 16,
                    background: selectedScenario.id === scenario.id ? `${scenario.color}20` : 'rgba(20, 20, 35, 0.6)',
                    border: `2px solid ${selectedScenario.id === scenario.id ? scenario.color : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${scenario.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                    }}>
                      {scenario.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 2 }}>{scenario.type}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>{scenario.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Strategies */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 30, marginBottom: 16 }}>Recovery Strategies</h3>
              {strategies.map((strategy, i) => (
                <motion.div
                  key={strategy.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  style={{
                    marginBottom: 12,
                    padding: 16,
                    background: strategy.enabled ? 'rgba(67, 233, 123, 0.1)' : 'rgba(20, 20, 35, 0.6)',
                    border: `1px solid ${strategy.enabled ? '#43e97b50' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: strategy.enabled ? '#43e97b' : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${strategy.enabled ? '#43e97b' : '#666'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: '#000',
                    }}
                  >
                    {strategy.enabled && '✓'}
                  </motion.div>
                  <div style={{ fontSize: '1rem' }}>{strategy.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{strategy.label}</div>
                    <div style={{ fontSize: '0.7rem', color: '#888' }}>{strategy.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Configuration */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: 24,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 20,
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Retry Configuration</h3>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 8 }}>
                    Max Retry Attempts: <span style={{ color: '#667eea', fontWeight: 600 }}>{retryCount}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={retryCount}
                    onChange={(e) => setRetryCount(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 8 }}>
                    Initial Delay: <span style={{ color: '#f093fb', fontWeight: 600 }}>{backoffDelay}s</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={backoffDelay}
                    onChange={(e) => setBackoffDelay(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{
                  padding: 16,
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: 10,
                  marginBottom: 20,
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#667eea', marginBottom: 8 }}>Backoff Schedule</div>
                  {Array.from({ length: retryCount }).map((_, i) => {
                    const delay = backoffDelay * Math.pow(2, i);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          fontSize: '0.8rem',
                          color: '#aaa',
                          marginBottom: 4,
                          fontFamily: 'monospace',
                        }}
                      >
                        Attempt {i + 1}: {delay}s delay
                      </motion.div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={simulateError}
                  disabled={simulating}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: simulating
                      ? 'rgba(255,255,255,0.1)'
                      : 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                    border: 'none',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: simulating ? 'not-allowed' : 'pointer',
                    opacity: simulating ? 0.6 : 1,
                  }}
                >
                  {simulating ? 'Simulating...' : 'Simulate Error & Recovery'}
                </motion.button>
              </motion.div>

              {/* Execution log */}
              <AnimatePresence>
                {attempts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                      padding: 20,
                      background: 'rgba(20, 20, 35, 0.8)',
                      borderRadius: 16,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>Execution Log</h4>
                    {attempts.map((attempt, i) => (
                      <motion.div
                        key={attempt.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                          padding: 12,
                          marginBottom: 8,
                          background: attempt.status === 'success' ? 'rgba(67, 233, 123, 0.1)' : 'rgba(255, 107, 107, 0.1)',
                          border: `1px solid ${attempt.status === 'success' ? '#43e97b50' : '#ff6b6b50'}`,
                          borderRadius: 8,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span style={{ color: '#aaa' }}>Attempt {attempt.id} • {attempt.timestamp}</span>
                          <span style={{
                            color: attempt.status === 'success' ? '#43e97b' : '#ff6b6b',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                          }}>
                            {attempt.status}
                          </span>
                        </div>
                        {attempt.status === 'failed' && (
                          <div style={{ fontSize: '0.7rem', color: '#666', marginTop: 4 }}>
                            Next retry in {attempt.delay}s
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
