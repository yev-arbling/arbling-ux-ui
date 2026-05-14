'use client';

import React from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

export default function WorkflowBuilderDemo() {
  const [nodes, setNodes] = React.useState([
    { id: 1, type: 'trigger', label: 'Form Submitted', x: 100, y: 100, icon: '⚡', color: '#667eea', status: 'active' },
    { id: 2, type: 'action', label: 'Send Email', x: 350, y: 100, icon: '✉️', color: '#f093fb', status: 'active' },
    { id: 3, type: 'condition', label: 'Check Status', x: 600, y: 100, icon: '🔀', color: '#fbbf24', status: 'inactive' },
  ]);

  const [connections, setConnections] = React.useState([
    { from: 1, to: 2, animated: true },
    { from: 2, to: 3, animated: false },
  ]);

  const [selectedNode, setSelectedNode] = React.useState(null);
  const [draggingNode, setDraggingNode] = React.useState(null);
  const [hoveredNode, setHoveredNode] = React.useState(null);

  // Simulate workflow execution
  React.useEffect(() => {
    const interval = setInterval(() => {
      setConnections(prev => prev.map((conn, i) => ({
        ...conn,
        animated: Math.random() > 0.5
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const deleteNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
    setConnections(connections.filter(c => c.from !== id && c.to !== id));
    setSelectedNode(null);
  };

  return (
    <>
      <h2 className="demo-title">Workflow Builder</h2>
      <p className="demo-subtitle">Drag nodes to build automation workflows. Visual workflow designer with animated connections.</p>
      <div className="demo-area" style={{ minHeight: 600, background: 'rgba(10, 10, 20, 0.5)', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>

        {/* Animated grid background */}
        <motion.div
          animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />

        {/* Connections */}
        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f093fb" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const startX = fromNode.x + 75;
            const startY = fromNode.y + 30;
            const endX = toNode.x;
            const endY = toNode.y + 30;
            const midX = (startX + endX) / 2;

            return (
              <motion.g key={i}>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    strokeDashoffset: conn.animated ? [0, -20] : 0
                  }}
                  transition={{
                    pathLength: { duration: 0.5, delay: i * 0.1 },
                    strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: 'linear' }
                  }}
                  d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                  filter="url(#glow)"
                />
                <motion.circle
                  cx={endX}
                  cy={endY}
                  r="5"
                  fill="#667eea"
                  initial={{ scale: 0 }}
                  animate={{ scale: conn.animated ? [1, 1.5, 1] : 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.g>
            );
          })}
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              dragElastic={0.1}
              onDragStart={() => setDraggingNode(node.id)}
              onDragEnd={(e, info) => {
                setDraggingNode(null);
                setNodes(prev => prev.map(n => n.id === node.id ? { ...n, x: n.x + info.offset.x, y: n.y + info.offset.y } : n));
              }}
              onClick={() => setSelectedNode(node.id)}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                boxShadow: hoveredNode === node.id ? `0 10px 40px ${node.color}40` : 'none'
              }}
              exit={{ scale: 0, opacity: 0, rotate: 10 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                width: 150,
                padding: '12px 16px',
                background: selectedNode === node.id
                  ? `linear-gradient(135deg, ${node.color}40, ${node.color}20)`
                  : 'rgba(20, 20, 35, 0.95)',
                border: `2px solid ${selectedNode === node.id ? node.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 12,
                cursor: draggingNode === node.id ? 'grabbing' : 'grab',
                zIndex: draggingNode === node.id ? 10 : 2,
                backdropFilter: 'blur(10px)',
              }}
            >
              {node.status === 'active' && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#43e97b',
                    boxShadow: '0 0 10px #43e97b',
                  }}
                />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <motion.span
                  animate={{ rotate: hoveredNode === node.id ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ fontSize: '1.2rem' }}
                >
                  {node.icon}
                </motion.span>
                <span style={{ fontSize: '0.7rem', color: node.color, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>{node.type}</span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#fff', marginBottom: 8 }}>{node.label}</div>

              {selectedNode === node.id && (
                <motion.button
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNode(node.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: '#ff6b6b',
                    border: '2px solid rgba(10, 10, 20, 0.9)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ×
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Enhanced Toolbar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
            padding: 12,
            background: 'rgba(15, 15, 25, 0.95)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            zIndex: 20,
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          }}
        >
          {[
            { icon: '⚡', label: 'Trigger', color: '#667eea' },
            { icon: '⚙️', label: 'Action', color: '#f093fb' },
            { icon: '🔀', label: 'Condition', color: '#fbbf24' },
            { icon: '⏱️', label: 'Delay', color: '#43e97b' },
          ].map((tool, i) => (
            <motion.button
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.05, y: -3, boxShadow: `0 5px 20px ${tool.color}40` }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newNode = {
                  id: Date.now(),
                  type: tool.label.toLowerCase(),
                  label: `New ${tool.label}`,
                  x: 150 + Math.random() * 400,
                  y: 150 + Math.random() * 250,
                  icon: tool.icon,
                  color: tool.color,
                  status: 'inactive',
                };
                setNodes(prev => [...prev, newNode]);
              }}
              style={{
                padding: '8px 16px',
                background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}10)`,
                border: `1px solid ${tool.color}40`,
                borderRadius: 8,
                color: '#fff',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{tool.icon}</span>
              <span>{tool.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Node count indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            padding: '8px 16px',
            background: 'rgba(15, 15, 25, 0.9)',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.85rem',
            color: '#aaa',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ color: '#667eea', fontWeight: 600 }}>{nodes.length}</span> nodes
        </motion.div>
      </div>
    </>
  );
}
