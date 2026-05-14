'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkflowVariablesDemo() {
  const [variables, setVariables] = React.useState([
    { id: 1, key: 'api_key', value: '••••••••••••', type: 'secret', desc: 'API authentication key' },
    { id: 2, key: 'webhook_url', value: 'https://api.example.com/webhook', type: 'string', desc: 'Webhook endpoint' },
    { id: 3, key: 'retry_limit', value: '3', type: 'number', desc: 'Maximum retry attempts' },
    { id: 4, key: 'enable_notifications', value: 'true', type: 'boolean', desc: 'Send email notifications' },
  ]);

  const [showAddVariable, setShowAddVariable] = React.useState(false);
  const [newVariable, setNewVariable] = React.useState({ key: '', value: '', type: 'string', desc: '' });

  const addVariable = () => {
    if (newVariable.key && newVariable.value) {
      setVariables([...variables, { ...newVariable, id: Date.now() }]);
      setNewVariable({ key: '', value: '', type: 'string', desc: '' });
      setShowAddVariable(false);
    }
  };

  const removeVariable = (id) => {
    setVariables(variables.filter(v => v.id !== id));
  };

  const getTypeColor = (type) => {
    const colors = {
      secret: '#ff6b6b',
      string: '#667eea',
      number: '#fbbf24',
      boolean: '#43e97b',
    };
    return colors[type] || '#888';
  };

  return (
    <>
      <h2 className="demo-title">Workflow Variables</h2>
      <p className="demo-subtitle">Manage workflow variables and context. Store secrets, configs, and dynamic values.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Variables list */}
          <AnimatePresence mode="popLayout">
            {variables.map((variable, i) => (
              <motion.div
                key={variable.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ delay: i * 0.03 }}
                style={{
                  marginBottom: 16,
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: 16 }}>
                  {/* Type indicator */}
                  <div style={{
                    marginTop: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: getTypeColor(variable.type),
                    boxShadow: `0 0 12px ${getTypeColor(variable.type)}80`,
                    flexShrink: 0,
                  }} />

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <code style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f093fb' }}>{variable.key}</code>
                      <div style={{
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: `${getTypeColor(variable.type)}20`,
                        color: getTypeColor(variable.type),
                      }}>
                        {variable.type}
                      </div>
                    </div>

                    <div style={{
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 8,
                      fontSize: '0.85rem',
                      color: '#aaa',
                      fontFamily: 'monospace',
                      marginBottom: 8,
                      wordBreak: 'break-all',
                    }}>
                      {variable.value}
                    </div>

                    {variable.desc && (
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>{variable.desc}</div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: 32,
                        height: 32,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 6,
                        color: '#aaa',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ✏️
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeVariable(variable.id)}
                      style={{
                        width: 32,
                        height: 32,
                        background: 'rgba(255, 107, 107, 0.1)',
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                        borderRadius: 6,
                        color: '#ff6b6b',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ×
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add variable form */}
          <AnimatePresence>
            {showAddVariable ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  marginBottom: 16,
                  padding: 20,
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid #667eea50',
                  borderRadius: 12,
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 6 }}>Key</label>
                    <input
                      type="text"
                      value={newVariable.key}
                      onChange={(e) => setNewVariable({ ...newVariable, key: e.target.value })}
                      placeholder="variable_name"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 6 }}>Type</label>
                    <select
                      value={newVariable.type}
                      onChange={(e) => setNewVariable({ ...newVariable, type: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        color: '#fff',
                        fontSize: '0.9rem',
                      }}
                    >
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="secret">Secret</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 6 }}>Value</label>
                  <input
                    type="text"
                    value={newVariable.value}
                    onChange={(e) => setNewVariable({ ...newVariable, value: e.target.value })}
                    placeholder="Value"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#aaa', marginBottom: 6 }}>Description (optional)</label>
                  <input
                    type="text"
                    value={newVariable.desc}
                    onChange={(e) => setNewVariable({ ...newVariable, desc: e.target.value })}
                    placeholder="What is this variable for?"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addVariable}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Add Variable
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddVariable(false)}
                    style={{
                      padding: '10px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#aaa',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddVariable(true)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '2px dashed #667eea50',
                  borderRadius: 12,
                  color: '#667eea',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>+</span>
                Add Variable
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
