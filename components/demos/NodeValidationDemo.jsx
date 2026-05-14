'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const workflowNodes = [
  { id: 1, label: 'HTTP Trigger', type: 'trigger', config: { url: '/webhook', method: 'POST' }, errors: [] },
  { id: 2, label: 'Parse JSON', type: 'transform', config: { path: '$.data' }, errors: [] },
  { id: 3, label: 'Validate Email', type: 'transform', config: {}, errors: ['Missing email regex pattern'] },
  { id: 4, label: 'Send Email', type: 'action', config: { to: '', subject: 'Hello' }, errors: ['Email recipient is required', 'SMTP server not configured'] },
  { id: 5, label: 'Log Success', type: 'action', config: { level: 'info' }, errors: [] },
];

const validationRules = [
  { id: 'required-config', name: 'Required Configuration', desc: 'All required fields must be filled', severity: 'error', enabled: true },
  { id: 'valid-connections', name: 'Valid Connections', desc: 'All nodes must have valid input/output connections', severity: 'error', enabled: true },
  { id: 'unique-names', name: 'Unique Node Names', desc: 'Node names should be unique', severity: 'warning', enabled: true },
  { id: 'circular-deps', name: 'No Circular Dependencies', desc: 'Workflow must not have circular references', severity: 'error', enabled: true },
  { id: 'deprecated-nodes', name: 'No Deprecated Nodes', desc: 'Avoid using deprecated node types', severity: 'warning', enabled: false },
  { id: 'performance', name: 'Performance Best Practices', desc: 'Check for performance issues', severity: 'info', enabled: true },
];

export default function NodeValidationDemo() {
  const [nodes, setNodes] = React.useState(workflowNodes);
  const [rules, setRules] = React.useState(validationRules);
  const [isValidating, setIsValidating] = React.useState(false);
  const [validationComplete, setValidationComplete] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState(null);

  const errorCount = nodes.reduce((sum, n) => sum + n.errors.length, 0);
  const warningCount = 1; // Simulated
  const infoCount = 2; // Simulated

  const runValidation = async () => {
    setIsValidating(true);
    setValidationComplete(false);

    // Simulate validation process
    await new Promise(r => setTimeout(r, 1500));

    setIsValidating(false);
    setValidationComplete(true);

    // Auto-hide after 3 seconds
    setTimeout(() => setValidationComplete(false), 3000);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      error: '#ff6b6b',
      warning: '#fbbf24',
      info: '#667eea',
    };
    return colors[severity] || '#888';
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      error: '✗',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[severity] || '○';
  };

  const getNodeColor = (type) => {
    const colors = {
      trigger: '#667eea',
      transform: '#f093fb',
      action: '#43e97b',
    };
    return colors[type] || '#888';
  };

  const toggleRule = (ruleId) => {
    setRules(rules.map(r =>
      r.id === ruleId ? { ...r, enabled: !r.enabled } : r
    ));
  };

  return (
    <>
      <h2 className="demo-title">Node Validation</h2>
      <p className="demo-subtitle">Validate workflow configurations and connections. Ensure workflows are error-free before deployment.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 30 }}>
            {/* Main Area */}
            <div>
              {/* Validation Controls */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>Workflow Validation</div>
                  <div style={{ fontSize: '0.75rem', color: '#888', display: 'flex', gap: 16 }}>
                    <span style={{ color: '#ff6b6b' }}>{errorCount} errors</span>
                    <span style={{ color: '#fbbf24' }}>{warningCount} warnings</span>
                    <span style={{ color: '#667eea' }}>{infoCount} info</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={runValidation}
                  disabled={isValidating}
                  style={{
                    padding: '12px 24px',
                    background: isValidating
                      ? 'rgba(255,255,255,0.1)'
                      : errorCount === 0
                      ? 'linear-gradient(135deg, #43e97b, #38b2ac)'
                      : 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: 10,
                    color: isValidating ? '#666' : '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: isValidating ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {isValidating ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⟳
                      </motion.span>
                      Validating...
                    </>
                  ) : validationComplete ? (
                    <>✓ Validated</>
                  ) : (
                    <>▶ Run Validation</>
                  )}
                </motion.button>
              </motion.div>

              {/* Validation Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                {[
                  { label: 'Errors', count: errorCount, color: '#ff6b6b', icon: '✗' },
                  { label: 'Warnings', count: warningCount, color: '#fbbf24', icon: '⚠' },
                  { label: 'Info', count: infoCount, color: '#667eea', icon: 'ℹ' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    style={{
                      padding: 20,
                      background: `${stat.color}10`,
                      border: `1px solid ${stat.color}30`,
                      borderRadius: 12,
                      textAlign: 'center',
                    }}
                  >
                    <motion.div
                      animate={{ scale: validationComplete ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: stat.color,
                        marginBottom: 8,
                      }}
                    >
                      {stat.count}
                    </motion.div>
                    <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {stat.icon} {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Nodes with Errors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 16 }}>Node Issues</div>

                <AnimatePresence>
                  {nodes.map((node, i) => {
                    const hasErrors = node.errors.length > 0;
                    const color = getNodeColor(node.type);
                    const isSelected = selectedNode?.id === node.id;

                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: hasErrors ? 1 : 0.4, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ x: 4 }}
                        onClick={() => setSelectedNode(node)}
                        style={{
                          padding: 14,
                          marginBottom: 12,
                          background: isSelected
                            ? `${hasErrors ? '#ff6b6b' : color}15`
                            : 'rgba(255,255,255,0.03)',
                          border: `2px solid ${isSelected ? (hasErrors ? '#ff6b6b' : color) : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 10,
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'start', gap: 12 }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: `${hasErrors ? '#ff6b6b' : color}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            color: hasErrors ? '#ff6b6b' : color,
                            flexShrink: 0,
                          }}>
                            {hasErrors ? '✗' : '✓'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{node.label}</div>
                              <div style={{
                                padding: '2px 8px',
                                background: `${color}20`,
                                borderRadius: 4,
                                fontSize: '0.65rem',
                                color: color,
                                textTransform: 'uppercase',
                                fontWeight: 600,
                              }}>
                                {node.type}
                              </div>
                              {hasErrors && (
                                <div style={{
                                  padding: '2px 8px',
                                  background: 'rgba(255, 107, 107, 0.2)',
                                  borderRadius: 4,
                                  fontSize: '0.65rem',
                                  color: '#ff6b6b',
                                  fontWeight: 600,
                                }}>
                                  {node.errors.length} issues
                                </div>
                              )}
                            </div>

                            {hasErrors && (
                              <AnimatePresence>
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  style={{ overflow: 'hidden' }}
                                >
                                  {node.errors.map((error, idx) => (
                                    <div
                                      key={idx}
                                      style={{
                                        padding: '6px 10px',
                                        marginTop: 6,
                                        background: 'rgba(255, 107, 107, 0.1)',
                                        borderLeft: '2px solid #ff6b6b',
                                        borderRadius: 4,
                                        fontSize: '0.75rem',
                                        color: '#ff6b6b',
                                      }}
                                    >
                                      • {error}
                                    </div>
                                  ))}
                                </motion.div>
                              </AnimatePresence>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Validation Rules Panel */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  padding: 20,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Validation Rules</div>
                    <div style={{ fontSize: '0.7rem', color: '#888' }}>
                      {rules.filter(r => r.enabled).length} of {rules.length} enabled
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {rules.map((rule, i) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        padding: 14,
                        marginBottom: 12,
                        background: rule.enabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${rule.enabled ? getSeverityColor(rule.severity) + '40' : 'rgba(255,255,255,0.05)'}`,
                        borderRadius: 10,
                        opacity: rule.enabled ? 1 : 0.5,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'start', gap: 10, marginBottom: 10 }}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleRule(rule.id)}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 4,
                            background: rule.enabled ? getSeverityColor(rule.severity) : 'rgba(255,255,255,0.1)',
                            border: `2px solid ${rule.enabled ? getSeverityColor(rule.severity) : 'rgba(255,255,255,0.2)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        >
                          {rule.enabled && '✓'}
                        </motion.button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                            {rule.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: 8 }}>
                            {rule.desc}
                          </div>
                          <div style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            background: `${getSeverityColor(rule.severity)}20`,
                            borderRadius: 4,
                            fontSize: '0.65rem',
                            color: getSeverityColor(rule.severity),
                            textTransform: 'uppercase',
                            fontWeight: 600,
                          }}>
                            {getSeverityIcon(rule.severity)} {rule.severity}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRules(rules.map(r => ({ ...r, enabled: true })))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginTop: 12,
                    background: 'rgba(102, 126, 234, 0.15)',
                    border: '1px solid #667eea40',
                    borderRadius: 8,
                    color: '#667eea',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Enable All Rules
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
