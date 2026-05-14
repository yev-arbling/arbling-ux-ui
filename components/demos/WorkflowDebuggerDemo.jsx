'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const breakpoints = [
  { id: 1, step: 'Send Email', line: 12, enabled: true, hitCount: 3 },
  { id: 2, step: 'Check Status', line: 24, enabled: true, hitCount: 1 },
  { id: 3, step: 'Update Database', line: 36, enabled: false, hitCount: 0 },
];

const variables = [
  { name: 'user_email', value: '"john@example.com"', type: 'string' },
  { name: 'order_total', value: '149.99', type: 'number' },
  { name: 'is_verified', value: 'true', type: 'boolean' },
  { name: 'items', value: '[Object Array(3)]', type: 'array' },
  { name: 'timestamp', value: '1705276800', type: 'number' },
];

const callStack = [
  { function: 'sendEmail()', file: 'email.js:12' },
  { function: 'processOrder()', file: 'workflow.js:45' },
  { function: 'handleCheckout()', file: 'checkout.js:89' },
  { function: 'executeWorkflow()', file: 'main.js:156' },
];

export default function WorkflowDebuggerDemo() {
  const [isPaused, setIsPaused] = React.useState(true);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [showVariables, setShowVariables] = React.useState(true);

  const stepForward = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const stepBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <h2 className="demo-title">Workflow Debugger</h2>
      <p className="demo-subtitle">Debug panel with breakpoints. Step through workflow execution and inspect state.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Control bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 24,
              padding: 16,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.1)',
              alignItems: 'center',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPaused(!isPaused)}
              style={{
                padding: '10px 20px',
                background: isPaused ? 'linear-gradient(135deg, #43e97b, #38b2ac)' : 'rgba(255, 107, 107, 0.15)',
                border: isPaused ? 'none' : '1px solid #ff6b6b50',
                borderRadius: 8,
                color: isPaused ? '#fff' : '#ff6b6b',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stepForward}
              disabled={!isPaused}
              style={{
                padding: '10px 16px',
                background: isPaused ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255,255,255,0.05)',
                border: '1px solid #667eea50',
                borderRadius: 8,
                color: isPaused ? '#667eea' : '#666',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: isPaused ? 'pointer' : 'not-allowed',
                opacity: isPaused ? 1 : 0.5,
              }}
            >
              Step Over →
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stepBack}
              disabled={!isPaused || currentStep === 1}
              style={{
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: isPaused && currentStep > 1 ? '#aaa' : '#666',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: isPaused && currentStep > 1 ? 'pointer' : 'not-allowed',
                opacity: isPaused && currentStep > 1 ? 1 : 0.5,
              }}
            >
              ← Step Back
            </motion.button>

            <div style={{ flex: 1 }} />

            <div style={{
              padding: '8px 16px',
              background: isPaused ? 'rgba(251, 191, 36, 0.15)' : 'rgba(67, 233, 123, 0.15)',
              borderRadius: 8,
              fontSize: '0.8rem',
              fontWeight: 600,
              color: isPaused ? '#fbbf24' : '#43e97b',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <motion.div
                animate={{ scale: isPaused ? 1 : [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: isPaused ? '#fbbf24' : '#43e97b',
                }}
              />
              {isPaused ? 'PAUSED' : 'RUNNING'}
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 24 }}>
            {/* Main panel */}
            <div>
              {/* Breakpoints */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Breakpoints</h3>
                {breakpoints.map((bp, i) => (
                  <motion.div
                    key={bp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 6, scale: 1.01, boxShadow: bp.enabled ? '0 4px 20px rgba(255, 107, 107, 0.2)' : 'none' }}
                    style={{
                      marginBottom: 12,
                      padding: 14,
                      background: bp.enabled ? 'rgba(255, 107, 107, 0.12)' : 'rgba(20, 20, 35, 0.6)',
                      border: `2px solid ${bp.enabled ? '#ff6b6b' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: bp.enabled ? '#ff6b6b' : 'rgba(255,255,255,0.1)',
                        border: `2px solid ${bp.enabled ? '#ff6b6b' : '#666'}`,
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 2 }}>{bp.step}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'monospace' }}>Line {bp.line}</div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                      {bp.hitCount} hits
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call stack */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Call Stack</h3>
                {callStack.map((call, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ x: 4 }}
                    style={{
                      marginBottom: 8,
                      padding: 12,
                      background: i === 0 ? 'rgba(102, 126, 234, 0.1)' : 'rgba(20, 20, 35, 0.6)',
                      border: `1px solid ${i === 0 ? '#667eea50' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: i === 0 ? '#667eea' : '#aaa', fontFamily: 'monospace', marginBottom: 2 }}>
                      {call.function}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'monospace' }}>
                      {call.file}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Side panel */}
            <div>
              {/* Variables */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 20,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Variables</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowVariables(!showVariables)}
                    style={{
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 6,
                      color: '#aaa',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    {showVariables ? 'Hide' : 'Show'}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showVariables && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {variables.map((variable, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          style={{
                            marginBottom: 10,
                            padding: 10,
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 8,
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: '0.8rem', color: '#f093fb', fontFamily: 'monospace', fontWeight: 600 }}>
                              {variable.name}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#666' }}>
                              {variable.type}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#43e97b', fontFamily: 'monospace' }}>
                            {variable.value}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Execution info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  padding: 16,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>Execution Info</h4>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>Current Step:</span>
                    <span style={{ color: '#667eea', fontWeight: 600 }}>{currentStep} / 5</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>Execution Time:</span>
                    <span style={{ color: '#f093fb', fontWeight: 600 }}>2.4s</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Memory Usage:</span>
                    <span style={{ color: '#43e97b', fontWeight: 600 }}>45 MB</span>
                  </div>
                </div>

                <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden', marginTop: 12 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: 2,
                    }}
                  />
                </div>
              </motion.div>

              {/* Quick actions */}
              <div style={{ marginTop: 20 }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>Actions</h4>
                {['Clear All Breakpoints', 'Reset Execution', 'Export Debug Log'].map((action, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      marginBottom: 8,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 8,
                      color: '#aaa',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
