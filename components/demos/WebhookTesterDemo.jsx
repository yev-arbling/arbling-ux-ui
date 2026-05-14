'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testHistory = [
  { id: 1, timestamp: '10:45:22', method: 'POST', status: 200, duration: '145ms', success: true },
  { id: 2, timestamp: '10:43:15', method: 'POST', status: 200, duration: '132ms', success: true },
  { id: 3, timestamp: '10:40:08', method: 'POST', status: 500, duration: '1024ms', success: false },
  { id: 4, timestamp: '10:38:45', method: 'POST', status: 200, duration: '156ms', success: true },
];

export default function WebhookTesterDemo() {
  const [url, setUrl] = React.useState('https://api.example.com/webhook');
  const [method, setMethod] = React.useState('POST');
  const [headers, setHeaders] = React.useState('{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer token123"\n}');
  const [payload, setPayload] = React.useState('{\n  "event": "order.created",\n  "order_id": "12345",\n  "amount": 149.99\n}');
  const [testing, setTesting] = React.useState(false);
  const [lastResponse, setLastResponse] = React.useState(null);

  const runTest = () => {
    setTesting(true);
    setTimeout(() => {
      setLastResponse({
        status: 200,
        duration: '142ms',
        body: '{\n  "success": true,\n  "message": "Webhook received",\n  "processed_at": "2024-01-20T10:45:22Z"\n}'
      });
      setTesting(false);
    }, 1500);
  };

  return (
    <>
      <h2 className="demo-title">Webhook Tester</h2>
      <p className="demo-subtitle">Test webhook endpoints. Send requests and inspect responses.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 30 }}>
            {/* Configuration */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 8 }}>Webhook URL</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option>POST</option>
                    <option>PUT</option>
                    <option>PATCH</option>
                    <option>DELETE</option>
                  </select>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 8 }}>Headers</label>
                <textarea
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 12,
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: '#f093fb',
                    fontSize: '0.85rem',
                    fontFamily: 'monospace',
                    minHeight: 100,
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 8 }}>Payload</label>
                <textarea
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 12,
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: '#43e97b',
                    fontSize: '0.85rem',
                    fontFamily: 'monospace',
                    minHeight: 150,
                    resize: 'vertical',
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={runTest}
                disabled={testing}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: testing
                    ? 'rgba(255,255,255,0.1)'
                    : 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: testing ? 'not-allowed' : 'pointer',
                  opacity: testing ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                {testing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }}
                    />
                    Sending Request...
                  </>
                ) : (
                  <>▶ Send Test Request</>
                )}
              </motion.button>

              {/* Response */}
              <AnimatePresence>
                {lastResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{
                      marginTop: 20,
                      padding: 20,
                      background: 'rgba(20, 20, 35, 0.8)',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Response</h4>
                      <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem' }}>
                        <span style={{
                          padding: '3px 10px',
                          background: 'rgba(67, 233, 123, 0.15)',
                          color: '#43e97b',
                          borderRadius: 6,
                          fontWeight: 600,
                        }}>
                          {lastResponse.status}
                        </span>
                        <span style={{ color: '#888' }}>{lastResponse.duration}</span>
                      </div>
                    </div>
                    <pre style={{
                      padding: 12,
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: 8,
                      fontSize: '0.8rem',
                      color: '#43e97b',
                      fontFamily: 'monospace',
                      overflow: 'auto',
                      margin: 0,
                    }}>
                      {lastResponse.body}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Test history */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Test History</h3>

              {testHistory.map((test, i) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: -4 }}
                  style={{
                    marginBottom: 12,
                    padding: 14,
                    background: test.success ? 'rgba(67, 233, 123, 0.05)' : 'rgba(255, 107, 107, 0.05)',
                    border: `1px solid ${test.success ? '#43e97b30' : '#ff6b6b30'}`,
                    borderRadius: 10,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{test.method}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: test.success ? '#43e97b' : '#ff6b6b',
                    }}>
                      {test.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>{test.timestamp}</div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>{test.duration}</div>
                </motion.div>
              ))}

              {/* Quick actions */}
              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>Quick Actions</h4>
                {['Clear History', 'Export Results', 'Save as Template'].map((action, i) => (
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: 30,
              padding: 20,
              background: 'rgba(20, 20, 35, 0.6)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {[
              { label: 'Total Tests', value: testHistory.length, color: '#667eea' },
              { label: 'Success Rate', value: `${Math.round((testHistory.filter(t => t.success).length / testHistory.length) * 100)}%`, color: '#43e97b' },
              { label: 'Avg Response', value: '145ms', color: '#f093fb' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 300 }}
                  style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color, marginBottom: 4 }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
