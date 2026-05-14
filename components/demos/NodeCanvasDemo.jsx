'use client';

import React from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

const initialNodes = [
  { id: 1, type: 'trigger', label: 'HTTP Request', x: 100, y: 200, config: { method: 'POST', url: '/api/webhook' }, outputs: ['success'] },
  { id: 2, type: 'transform', label: 'Parse JSON', x: 350, y: 150, config: { path: '$.data' }, inputs: ['input'], outputs: ['output'] },
  { id: 3, type: 'condition', label: 'If/Else', x: 600, y: 200, config: { condition: 'status === "active"' }, inputs: ['input'], outputs: ['true', 'false'] },
  { id: 4, type: 'action', label: 'Send Email', x: 850, y: 120, config: { to: 'user@example.com' }, inputs: ['input'] },
  { id: 5, type: 'action', label: 'Log Error', x: 850, y: 280, config: { level: 'error' }, inputs: ['input'] },
];

const initialConnections = [
  { id: 'c1', from: 1, fromPort: 'success', to: 2, toPort: 'input' },
  { id: 'c2', from: 2, fromPort: 'output', to: 3, toPort: 'input' },
  { id: 'c3', from: 3, fromPort: 'true', to: 4, toPort: 'input' },
  { id: 'c4', from: 3, fromPort: 'false', to: 5, toPort: 'input' },
];

export default function NodeCanvasDemo() {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [connections, setConnections] = React.useState(initialConnections);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [connecting, setConnecting] = React.useState(null);
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });

  const getNodeColor = (type) => {
    const colors = {
      trigger: '#667eea',
      transform: '#f093fb',
      condition: '#fbbf24',
      action: '#43e97b',
    };
    return colors[type] || '#888';
  };

  const getNodeIcon = (type) => {
    const icons = {
      trigger: '⚡',
      transform: '⚙️',
      condition: '🔀',
      action: '▶️',
    };
    return icons[type] || '○';
  };

  return (
    <>
      <h2 className="demo-title">Node Canvas</h2>
      <p className="demo-subtitle">Visual node editor with connections. Drag nodes and connect ports to build flows.</p>
      <div className="demo-area" style={{ minHeight: 700, background: 'rgba(10, 10, 20, 0.5)', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>

        {/* Canvas controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            display: 'flex',
            gap: 8,
            zIndex: 30,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setZoom(Math.min(zoom + 0.1, 2))}
            style={{
              width: 36,
              height: 36,
              background: 'rgba(15, 15, 25, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: '#fff',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
            style={{
              width: 36,
              height: 36,
              background: 'rgba(15, 15, 25, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: '#fff',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            −
          </motion.button>
          <div style={{
            padding: '0 12px',
            background: 'rgba(15, 15, 25, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#aaa',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
          }}>
            {Math.round(zoom * 100)}%
          </div>
        </motion.div>

        {/* Grid background */}
        <motion.div
          animate={{
            backgroundPosition: [`${pan.x}px ${pan.y}px`, `${pan.x + 40}px ${pan.y + 40}px`],
            backgroundSize: `${40 * zoom}px ${40 * zoom}px`
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)',
          }}
        />

        {/* Canvas */}
        <div style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}>
          {/* Connections SVG */}
          <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
            <defs>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f093fb" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {connections.map((conn) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const startX = fromNode.x + 180;
              const startY = fromNode.y + 35;
              const endX = toNode.x;
              const endY = toNode.y + 35;
              const controlDist = Math.abs(endX - startX) * 0.5;

              return (
                <motion.g key={conn.id}>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    d={`M ${startX} ${startY} C ${startX + controlDist} ${startY}, ${endX - controlDist} ${endY}, ${endX} ${endY}`}
                    stroke="url(#connectionGradient)"
                    strokeWidth="3"
                    fill="none"
                    filter="url(#nodeGlow)"
                  />
                  {/* Animated particle */}
                  <motion.circle
                    animate={{
                      offsetDistance: ['0%', '100%'],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    r="4"
                    fill="#667eea"
                    style={{
                      offsetPath: `path('M ${startX} ${startY} C ${startX + controlDist} ${startY}, ${endX - controlDist} ${endY}, ${endX} ${endY}')`,
                    }}
                  />
                  <circle cx={endX} cy={endY} r="5" fill="#667eea" filter="url(#nodeGlow)" />
                </motion.g>
              );
            })}
          </svg>

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map((node, i) => {
              const color = getNodeColor(node.type);
              const isSelected = selectedNode?.id === node.id;

              return (
                <motion.div
                  key={node.id}
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(e, info) => {
                    setNodes(prev => prev.map(n =>
                      n.id === node.id ? { ...n, x: n.x + info.offset.x, y: n.y + info.offset.y } : n
                    ));
                  }}
                  onClick={() => setSelectedNode(node)}
                  initial={{ scale: 0, opacity: 0, rotate: -20 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    boxShadow: isSelected ? `0 10px 50px ${color}40` : 'none',
                  }}
                  exit={{ scale: 0, opacity: 0, rotate: 20 }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  style={{
                    position: 'absolute',
                    left: node.x,
                    top: node.y,
                    width: 180,
                    background: isSelected
                      ? `linear-gradient(135deg, ${color}30, ${color}15)`
                      : 'rgba(20, 20, 35, 0.95)',
                    border: `2px solid ${isSelected ? color : 'rgba(255,255,255,0.15)'}`,
                    borderRadius: 12,
                    backdropFilter: 'blur(10px)',
                    cursor: 'move',
                    zIndex: isSelected ? 20 : 10,
                  }}
                >
                  {/* Header */}
                  <div style={{
                    padding: '10px 12px',
                    background: `${color}20`,
                    borderBottom: `1px solid ${color}30`,
                    borderRadius: '10px 10px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <motion.span
                      animate={{ rotate: isSelected ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ fontSize: '1.1rem' }}
                    >
                      {getNodeIcon(node.type)}
                    </motion.span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.7rem', color, textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>
                        {node.type}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                        {node.label}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: 12 }}>
                    {Object.entries(node.config).slice(0, 2).map(([key, value]) => (
                      <div key={key} style={{ fontSize: '0.7rem', color: '#888', marginBottom: 4 }}>
                        <span style={{ color: '#f093fb' }}>{key}:</span> {String(value).substring(0, 20)}...
                      </div>
                    ))}
                  </div>

                  {/* Input ports */}
                  {node.inputs?.map((port, idx) => (
                    <motion.div
                      key={port}
                      whileHover={{ scale: 1.3 }}
                      style={{
                        position: 'absolute',
                        left: -8,
                        top: 35 + idx * 20,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: color,
                        border: '2px solid rgba(20, 20, 35, 0.95)',
                        cursor: 'pointer',
                        boxShadow: `0 0 10px ${color}80`,
                      }}
                    />
                  ))}

                  {/* Output ports */}
                  {node.outputs?.map((port, idx) => (
                    <motion.div
                      key={port}
                      whileHover={{ scale: 1.3 }}
                      style={{
                        position: 'absolute',
                        right: -8,
                        top: 35 + idx * 20,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: color,
                        border: '2px solid rgba(20, 20, 35, 0.95)',
                        cursor: 'pointer',
                        boxShadow: `0 0 10px ${color}80`,
                      }}
                    />
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Node info panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 280,
                padding: 20,
                background: 'rgba(15, 15, 25, 0.98)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                backdropFilter: 'blur(20px)',
                zIndex: 30,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4 }}>Selected Node</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedNode.label}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedNode(null)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#aaa',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </motion.button>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 12 }}>Configuration</div>
              {Object.entries(selectedNode.config).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: 4 }}>{key}</div>
                  <div style={{
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 6,
                    fontSize: '0.8rem',
                    color: '#f093fb',
                    fontFamily: 'monospace',
                  }}>
                    {String(value)}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            display: 'flex',
            gap: 12,
            zIndex: 30,
          }}
        >
          <div style={{
            padding: '8px 14px',
            background: 'rgba(15, 15, 25, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            fontSize: '0.75rem',
            color: '#aaa',
          }}>
            <span style={{ color: '#667eea', fontWeight: 600 }}>{nodes.length}</span> nodes
          </div>
          <div style={{
            padding: '8px 14px',
            background: 'rgba(15, 15, 25, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            fontSize: '0.75rem',
            color: '#aaa',
          }}>
            <span style={{ color: '#f093fb', fontWeight: 600 }}>{connections.length}</span> connections
          </div>
        </motion.div>
      </div>
    </>
  );
}
