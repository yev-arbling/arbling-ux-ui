'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const workflowNodes = [
  { id: 1, x: 100, y: 200, label: 'HTTP Trigger', type: 'trigger', duration: 0.5 },
  { id: 2, x: 300, y: 150, label: 'Parse JSON', type: 'transform', duration: 0.3 },
  { id: 3, x: 300, y: 250, label: 'Validate', type: 'transform', duration: 0.4 },
  { id: 4, x: 500, y: 200, label: 'If Valid', type: 'condition', duration: 0.2 },
  { id: 5, x: 700, y: 150, label: 'Send Email', type: 'action', duration: 1.2 },
  { id: 6, x: 700, y: 250, label: 'Log Error', type: 'action', duration: 0.3 },
];

const connections = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
  { from: 4, to: 5, label: 'true' },
  { from: 4, to: 6, label: 'false' },
];

export default function NodeExecutionDemo() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentNode, setCurrentNode] = React.useState(null);
  const [completedNodes, setCompletedNodes] = React.useState([]);
  const [executionLog, setExecutionLog] = React.useState([]);
  const [dataFlow, setDataFlow] = React.useState({});
  const [speed, setSpeed] = React.useState(1); // 1x, 2x, 0.5x

  const getNodeColor = (type) => {
    const colors = {
      trigger: '#667eea',
      transform: '#f093fb',
      condition: '#fbbf24',
      action: '#43e97b',
    };
    return colors[type] || '#888';
  };

  const addLog = (nodeId, message, type = 'info') => {
    const node = workflowNodes.find(n => n.id === nodeId);
    setExecutionLog(prev => [...prev, {
      id: Date.now(),
      nodeId,
      nodeName: node.label,
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    }]);
  };

  const executeWorkflow = async () => {
    setIsRunning(true);
    setCompletedNodes([]);
    setExecutionLog([]);
    setDataFlow({});

    // Node 1: HTTP Trigger
    setCurrentNode(1);
    addLog(1, 'Received HTTP POST request', 'success');
    setDataFlow({ 1: { method: 'POST', body: '{"user":"john","age":25}' } });
    await new Promise(r => setTimeout(r, (workflowNodes[0].duration * 1000) / speed));
    setCompletedNodes([1]);

    // Node 2 & 3: Parse and Validate (parallel)
    setCurrentNode(2);
    setTimeout(() => setCurrentNode(3), 50);
    addLog(2, 'Parsing JSON payload...', 'info');
    addLog(3, 'Validating data schema...', 'info');

    await new Promise(r => setTimeout(r, (300) / speed));
    setDataFlow(prev => ({ ...prev, 2: { parsed: true, user: 'john' } }));
    addLog(2, 'JSON parsed successfully', 'success');
    setCompletedNodes(prev => [...prev, 2]);

    await new Promise(r => setTimeout(r, (100) / speed));
    setDataFlow(prev => ({ ...prev, 3: { valid: true } }));
    addLog(3, 'Data validation passed', 'success');
    setCompletedNodes(prev => [...prev, 3]);

    // Node 4: Condition
    setCurrentNode(4);
    addLog(4, 'Evaluating condition...', 'info');
    await new Promise(r => setTimeout(r, (200) / speed));
    const isValid = Math.random() > 0.3;
    setDataFlow(prev => ({ ...prev, 4: { condition: isValid, path: isValid ? 'true' : 'false' } }));
    addLog(4, `Condition evaluated to: ${isValid}`, isValid ? 'success' : 'warning');
    setCompletedNodes(prev => [...prev, 4]);

    // Node 5 or 6: Action based on condition
    if (isValid) {
      setCurrentNode(5);
      addLog(5, 'Sending email notification...', 'info');
      await new Promise(r => setTimeout(r, (1200) / speed));
      setDataFlow(prev => ({ ...prev, 5: { sent: true, to: 'user@example.com' } }));
      addLog(5, 'Email sent successfully', 'success');
      setCompletedNodes(prev => [...prev, 5]);
    } else {
      setCurrentNode(6);
      addLog(6, 'Logging error to database...', 'warning');
      await new Promise(r => setTimeout(r, (300) / speed));
      setDataFlow(prev => ({ ...prev, 6: { logged: true, error: 'Validation failed' } }));
      addLog(6, 'Error logged', 'warning');
      setCompletedNodes(prev => [...prev, 6]);
    }

    setCurrentNode(null);
    setIsRunning(false);
    addLog(0, 'Workflow execution completed', 'success');
  };

  const getLogIcon = (type) => {
    const icons = {
      success: '✓',
      error: '✗',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[type] || 'ℹ';
  };

  const getLogColor = (type) => {
    const colors = {
      success: '#43e97b',
      error: '#ff6b6b',
      warning: '#fbbf24',
      info: '#667eea',
    };
    return colors[type] || '#888';
  };

  return (
    <>
      <h2 className="demo-title">Node Execution</h2>
      <p className="demo-subtitle">Live workflow execution with data flow visualization. Watch nodes execute in real-time.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 30 }}>
            {/* Canvas */}
            <div>
              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  gap: 12,
                  marginBottom: 20,
                  alignItems: 'center',
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={executeWorkflow}
                  disabled={isRunning}
                  style={{
                    padding: '12px 24px',
                    background: isRunning
                      ? 'rgba(255,255,255,0.1)'
                      : 'linear-gradient(135deg, #43e97b, #38b2ac)',
                    border: 'none',
                    borderRadius: 10,
                    color: isRunning ? '#666' : '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {isRunning ? '⏸' : '▶'} {isRunning ? 'Running...' : 'Execute Workflow'}
                </motion.button>

                <div style={{ flex: 1 }} />

                <div style={{ fontSize: '0.75rem', color: '#888' }}>Speed:</div>
                {[0.5, 1, 2].map(s => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSpeed(s)}
                    style={{
                      padding: '6px 12px',
                      background: speed === s ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${speed === s ? '#667eea' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 6,
                      color: speed === s ? '#667eea' : '#aaa',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {s}x
                  </motion.button>
                ))}
              </motion.div>

              {/* Workflow Canvas */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  height: 500,
                  background: 'rgba(10, 10, 20, 0.5)',
                  borderRadius: 16,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Grid */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />

                {/* Connections */}
                <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  <defs>
                    <linearGradient id="execGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#667eea" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#43e97b" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  {connections.map((conn, idx) => {
                    const fromNode = workflowNodes.find(n => n.id === conn.from);
                    const toNode = workflowNodes.find(n => n.id === conn.to);
                    const startX = fromNode.x + 90;
                    const startY = fromNode.y + 30;
                    const endX = toNode.x + 10;
                    const endY = toNode.y + 30;
                    const isActive = currentNode === toNode.id && completedNodes.includes(fromNode.id);

                    return (
                      <g key={idx}>
                        <motion.path
                          d={`M ${startX} ${startY} L ${endX} ${endY}`}
                          stroke={isActive ? '#43e97b' : 'rgba(102, 126, 234, 0.3)'}
                          strokeWidth={isActive ? 4 : 2}
                          fill="none"
                          animate={{
                            opacity: isActive ? [0.6, 1, 0.6] : 0.3,
                            filter: isActive ? ['drop-shadow(0 0 2px #43e97b)', 'drop-shadow(0 0 8px #43e97b)', 'drop-shadow(0 0 2px #43e97b)'] : 'none'
                          }}
                          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                        />
                        {isActive && (
                          <>
                            <motion.circle
                              r="6"
                              fill="#43e97b"
                              animate={{
                                cx: [startX, endX],
                                cy: [startY, endY],
                                opacity: [0, 1, 1, 0],
                              }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.circle
                              r="3"
                              fill="#fff"
                              animate={{
                                cx: [startX, endX],
                                cy: [startY, endY],
                                opacity: [0, 1, 1, 0],
                              }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Nodes */}
                {workflowNodes.map((node, i) => {
                  const color = getNodeColor(node.type);
                  const isActive = currentNode === node.id;
                  const isCompleted = completedNodes.includes(node.id);

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        position: 'absolute',
                        left: node.x,
                        top: node.y,
                        width: 180,
                        padding: 12,
                        background: isActive
                          ? `linear-gradient(135deg, ${color}40, ${color}20)`
                          : isCompleted
                          ? `linear-gradient(135deg, #43e97b30, #43e97b15)`
                          : 'rgba(20, 20, 35, 0.95)',
                        border: `2px solid ${isActive ? color : isCompleted ? '#43e97b' : 'rgba(255,255,255,0.15)'}`,
                        borderRadius: 12,
                        backdropFilter: 'blur(10px)',
                        zIndex: isActive ? 20 : 10,
                        boxShadow: isActive ? `0 0 30px ${color}60` : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <motion.div
                          animate={{
                            scale: isActive ? [1, 1.2, 1] : 1,
                            rotate: isActive ? [0, 360] : 0,
                          }}
                          transition={{ duration: isActive ? 1 : 0, repeat: isActive ? Infinity : 0 }}
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: isActive ? color : isCompleted ? '#43e97b' : '#666',
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.65rem', color: color, textTransform: 'uppercase', fontWeight: 600 }}>
                            {node.type}
                          </div>
                        </div>
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{ fontSize: '0.9rem', color: '#43e97b' }}
                          >
                            ✓
                          </motion.div>
                        )}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>{node.label}</div>
                      {dataFlow[node.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          style={{
                            padding: 8,
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: 6,
                            fontSize: '0.7rem',
                            color: '#43e97b',
                            fontFamily: 'monospace',
                            overflow: 'hidden',
                          }}
                        >
                          {JSON.stringify(dataFlow[node.id], null, 2).substring(0, 50)}...
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Execution Log */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  height: 572,
                  background: 'rgba(20, 20, 35, 0.8)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ padding: 20, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>Execution Log</div>
                  <div style={{ fontSize: '0.7rem', color: '#888' }}>
                    {executionLog.length} events
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                  <AnimatePresence initial={false}>
                    {executionLog.map((log, i) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        style={{
                          marginBottom: 12,
                          padding: 12,
                          background: 'rgba(255,255,255,0.03)',
                          borderLeft: `3px solid ${getLogColor(log.type)}`,
                          borderRadius: 8,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'start', gap: 10 }}>
                          <div style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: `${getLogColor(log.type)}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.9rem',
                            color: getLogColor(log.type),
                            flexShrink: 0,
                          }}>
                            {getLogIcon(log.type)}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 4, color: getLogColor(log.type) }}>
                              {log.nodeName || 'System'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#aaa', marginBottom: 4 }}>
                              {log.message}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#666' }}>
                              {log.timestamp}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {executionLog.length === 0 && (
                    <div style={{
                      padding: 40,
                      textAlign: 'center',
                      color: '#666',
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: 12 }}>📋</div>
                      <div style={{ fontSize: '0.85rem' }}>No execution logs yet</div>
                      <div style={{ fontSize: '0.7rem', marginTop: 6 }}>Click "Execute Workflow" to start</div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
