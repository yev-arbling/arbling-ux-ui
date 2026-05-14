'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const nodeConfig = {
  id: 'node-123',
  type: 'HTTP POST',
  category: 'action',
  inputs: [
    { id: 'url', label: 'URL', type: 'string', value: 'https://api.example.com/users', required: true },
    { id: 'method', label: 'Method', type: 'select', value: 'POST', options: ['GET', 'POST', 'PUT', 'DELETE'], required: true },
    { id: 'headers', label: 'Headers', type: 'json', value: '{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer {{token}}"\n}', required: false },
    { id: 'body', label: 'Request Body', type: 'json', value: '{\n  "name": "{{user.name}}",\n  "email": "{{user.email}}"\n}', required: false },
    { id: 'timeout', label: 'Timeout (ms)', type: 'number', value: '5000', required: false },
    { id: 'retry', label: 'Retry on Failure', type: 'boolean', value: true, required: false },
  ],
  outputs: [
    { id: 'success', label: 'Success', type: 'data', desc: 'Response on successful request' },
    { id: 'error', label: 'Error', type: 'error', desc: 'Error details on failure' },
  ],
};

export default function NodeInspectorDemo() {
  const [activeTab, setActiveTab] = React.useState('config');
  const [config, setConfig] = React.useState(nodeConfig);

  const updateValue = (id, value) => {
    setConfig({
      ...config,
      inputs: config.inputs.map(input =>
        input.id === id ? { ...input, value } : input
      ),
    });
  };

  return (
    <>
      <h2 className="demo-title">Node Inspector</h2>
      <p className="demo-subtitle">Detailed node configuration panel. Edit properties, inputs, and outputs.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: 20,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: '16px 16px 0 0',
              border: '1px solid rgba(255,255,255,0.1)',
              borderBottom: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #43e97b, #38b2ac)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              📤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4 }}>Node ID: {config.id}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{config.type}</div>
            </div>
            <div style={{
              padding: '6px 12px',
              background: 'rgba(67, 233, 123, 0.15)',
              borderRadius: 8,
              fontSize: '0.75rem',
              color: '#43e97b',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}>
              {config.category}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'flex',
              gap: 4,
              padding: '0 20px',
              background: 'rgba(20, 20, 35, 0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderTop: 'none',
              borderBottom: 'none',
            }}
          >
            {['config', 'inputs', 'outputs'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 0 }}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  background: activeTab === tab ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${activeTab === tab ? '#667eea' : 'transparent'}`,
                  color: activeTab === tab ? '#667eea' : '#888',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: 24,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: '0 0 16px 16px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderTop: 'none',
              minHeight: 500,
            }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'config' && (
                <motion.div
                  key="config"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {config.inputs.map((input, i) => (
                    <motion.div
                      key={input.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{ marginBottom: 20 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <label style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: 600 }}>
                          {input.label}
                          {input.required && <span style={{ color: '#ff6b6b', marginLeft: 4 }}>*</span>}
                        </label>
                        <span style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase' }}>
                          {input.type}
                        </span>
                      </div>

                      {input.type === 'string' && (
                        <input
                          type="text"
                          value={input.value}
                          onChange={(e) => updateValue(input.id, e.target.value)}
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
                      )}

                      {input.type === 'number' && (
                        <input
                          type="number"
                          value={input.value}
                          onChange={(e) => updateValue(input.id, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            color: '#fff',
                            fontSize: '0.9rem',
                          }}
                        />
                      )}

                      {input.type === 'select' && (
                        <select
                          value={input.value}
                          onChange={(e) => updateValue(input.id, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            color: '#fff',
                            fontSize: '0.9rem',
                          }}
                        >
                          {input.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      )}

                      {input.type === 'json' && (
                        <textarea
                          value={input.value}
                          onChange={(e) => updateValue(input.id, e.target.value)}
                          style={{
                            width: '100%',
                            padding: 12,
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            color: '#43e97b',
                            fontSize: '0.85rem',
                            fontFamily: 'monospace',
                            minHeight: 120,
                            resize: 'vertical',
                          }}
                        />
                      )}

                      {input.type === 'boolean' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateValue(input.id, !input.value)}
                          style={{
                            padding: '12px 20px',
                            background: input.value ? 'rgba(67, 233, 123, 0.15)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${input.value ? '#43e97b50' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: 8,
                            color: input.value ? '#43e97b' : '#aaa',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {input.value ? '✓ Enabled' : 'Disabled'}
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'inputs' && (
                <motion.div
                  key="inputs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: 20 }}>
                    Input ports for incoming data connections
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: 12 }}>
                    This node receives data from upstream nodes through input ports
                  </div>
                  <div style={{
                    padding: 20,
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid #667eea30',
                    borderRadius: 12,
                  }}>
                    <div style={{ fontSize: '0.8rem', color: '#667eea', marginBottom: 10 }}>Available Variables</div>
                    <code style={{ fontSize: '0.8rem', color: '#f093fb', fontFamily: 'monospace' }}>
                      {`{{data}}     // Incoming data from previous node\n{{context}}  // Workflow context variables\n{{env}}      // Environment variables`}
                    </code>
                  </div>
                </motion.div>
              )}

              {activeTab === 'outputs' && (
                <motion.div
                  key="outputs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: 20 }}>
                    Output ports for data flow
                  </div>
                  {config.outputs.map((output, i) => (
                    <motion.div
                      key={output.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        marginBottom: 16,
                        padding: 16,
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'start',
                        gap: 12,
                      }}
                    >
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: output.type === 'error' ? '#ff6b6b' : '#43e97b',
                        marginTop: 4,
                        flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 4 }}>{output.label}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{output.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 20,
              display: 'flex',
              gap: 12,
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                padding: '14px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: 12,
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '14px 24px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#aaa',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
