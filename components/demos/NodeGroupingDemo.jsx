'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialNodes = [
  { id: 1, x: 120, y: 150, label: 'HTTP Request', type: 'trigger', groupId: 1 },
  { id: 2, x: 320, y: 120, label: 'Parse JSON', type: 'transform', groupId: 1 },
  { id: 3, x: 320, y: 200, label: 'Validate', type: 'transform', groupId: 1 },
  { id: 4, x: 550, y: 100, label: 'Send Email', type: 'action', groupId: 2 },
  { id: 5, x: 550, y: 180, label: 'Slack Notify', type: 'action', groupId: 2 },
  { id: 6, x: 550, y: 260, label: 'Log Error', type: 'action', groupId: 2 },
  { id: 7, x: 120, y: 350, label: 'Schedule', type: 'trigger', groupId: null },
  { id: 8, x: 320, y: 350, label: 'Filter', type: 'transform', groupId: null },
];

const groups = [
  { id: 1, name: 'Data Processing', color: '#667eea', collapsed: false },
  { id: 2, name: 'Notifications', color: '#43e97b', collapsed: false },
];

export default function NodeGroupingDemo() {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [nodeGroups, setNodeGroups] = React.useState(groups);
  const [selectedNodes, setSelectedNodes] = React.useState([]);
  const [hoveredGroup, setHoveredGroup] = React.useState(null);

  const getNodeColor = (type) => {
    const colors = {
      trigger: '#667eea',
      transform: '#f093fb',
      action: '#43e97b',
    };
    return colors[type] || '#888';
  };

  const getGroupBounds = (groupId) => {
    const groupNodes = nodes.filter(n => n.groupId === groupId);
    if (groupNodes.length === 0) return null;

    const xs = groupNodes.map(n => n.x);
    const ys = groupNodes.map(n => n.y);
    const padding = 30;

    return {
      x: Math.min(...xs) - padding,
      y: Math.min(...ys) - padding,
      width: Math.max(...xs) - Math.min(...xs) + 160 + padding * 2,
      height: Math.max(...ys) - Math.min(...ys) + 70 + padding * 2,
    };
  };

  const toggleNodeSelection = (nodeId) => {
    setSelectedNodes(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const createGroup = () => {
    if (selectedNodes.length === 0) return;
    const newGroupId = Math.max(...nodeGroups.map(g => g.id), 0) + 1;
    setNodeGroups([...nodeGroups, {
      id: newGroupId,
      name: `Group ${newGroupId}`,
      color: '#a78bfa',
      collapsed: false,
    }]);
    setNodes(nodes.map(n =>
      selectedNodes.includes(n.id) ? { ...n, groupId: newGroupId } : n
    ));
    setSelectedNodes([]);
  };

  const toggleGroupCollapse = (groupId) => {
    setNodeGroups(nodeGroups.map(g =>
      g.id === groupId ? { ...g, collapsed: !g.collapsed } : g
    ));
  };

  return (
    <>
      <h2 className="demo-title">Node Grouping</h2>
      <p className="demo-subtitle">Organize nodes into collapsible groups. Select multiple nodes and group them together.</p>
      <div className="demo-area" style={{ minHeight: 700, background: 'rgba(10, 10, 20, 0.5)', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            display: 'flex',
            gap: 10,
            zIndex: 30,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={createGroup}
            disabled={selectedNodes.length === 0}
            style={{
              padding: '10px 16px',
              background: selectedNodes.length > 0 ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 10,
              color: selectedNodes.length > 0 ? '#fff' : '#666',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: selectedNodes.length > 0 ? 'pointer' : 'not-allowed',
              opacity: selectedNodes.length > 0 ? 1 : 0.5,
            }}
          >
            Group Selected ({selectedNodes.length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedNodes([])}
            disabled={selectedNodes.length === 0}
            style={{
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: '#aaa',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: selectedNodes.length > 0 ? 'pointer' : 'not-allowed',
              opacity: selectedNodes.length > 0 ? 1 : 0.5,
            }}
          >
            Clear Selection
          </motion.button>
        </motion.div>

        {/* Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        {/* Canvas */}
        <div style={{
          position: 'absolute',
          inset: 0,
          padding: 40,
        }}>
          {/* Group bounds */}
          <AnimatePresence>
            {nodeGroups.map((group) => {
              const bounds = getGroupBounds(group.id);
              if (!bounds || group.collapsed) return null;
              const isHovered = hoveredGroup === group.id;

              return (
                <motion.div
                  key={`group-${group.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ boxShadow: `0 0 40px ${group.color}40` }}
                  onMouseEnter={() => setHoveredGroup(group.id)}
                  onMouseLeave={() => setHoveredGroup(null)}
                  style={{
                    position: 'absolute',
                    left: bounds.x,
                    top: bounds.y,
                    width: bounds.width,
                    height: bounds.height,
                    background: `${group.color}10`,
                    border: `2px dashed ${group.color}`,
                    borderRadius: 16,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  {/* Group header */}
                  <motion.div
                    animate={{ y: isHovered ? -2 : 0 }}
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: 12,
                      padding: '6px 14px',
                      background: `${group.color}`,
                      borderRadius: 8,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#000',
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGroupCollapse(group.id);
                    }}
                  >
                    <span>{group.name}</span>
                    <motion.span
                      animate={{ rotate: isHovered ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.span>
                  </motion.div>

                  {/* Node count badge */}
                  <div style={{
                    position: 'absolute',
                    top: -12,
                    right: 12,
                    padding: '6px 12px',
                    background: 'rgba(20, 20, 35, 0.95)',
                    border: `1px solid ${group.color}`,
                    borderRadius: 8,
                    fontSize: '0.7rem',
                    color: group.color,
                    fontWeight: 600,
                  }}>
                    {nodes.filter(n => n.groupId === group.id).length} nodes
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map((node, i) => {
              const group = nodeGroups.find(g => g.id === node.groupId);
              const isCollapsed = group?.collapsed;
              const isSelected = selectedNodes.includes(node.id);
              const color = getNodeColor(node.type);

              if (isCollapsed) return null;

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: i * 0.03, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.08, y: -4, boxShadow: `0 8px 25px ${color}40` }}
                  onClick={() => toggleNodeSelection(node.id)}
                  style={{
                    position: 'absolute',
                    left: node.x,
                    top: node.y,
                    width: 140,
                    padding: 12,
                    background: isSelected
                      ? `linear-gradient(135deg, ${color}40, ${color}20)`
                      : 'rgba(20, 20, 35, 0.95)',
                    border: `2px solid ${isSelected ? color : group ? group.color + '80' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 10,
                    cursor: 'pointer',
                    zIndex: 10,
                    backdropFilter: 'blur(10px)',
                    boxShadow: isSelected ? `0 4px 20px ${color}50` : 'none',
                  }}
                >
                  <div style={{
                    fontSize: '0.65rem',
                    color: group ? group.color : '#888',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: 6,
                  }}>
                    {node.type}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: 4,
                  }}>
                    {node.label}
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        color: '#000',
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Collapsed groups */}
          {nodeGroups.filter(g => g.collapsed).map((group, i) => {
            const groupNodes = nodes.filter(n => n.groupId === group.id);
            const avgX = groupNodes.reduce((sum, n) => sum + n.x, 0) / groupNodes.length;
            const avgY = groupNodes.reduce((sum, n) => sum + n.y, 0) / groupNodes.length;

            return (
              <motion.div
                key={`collapsed-${group.id}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => toggleGroupCollapse(group.id)}
                style={{
                  position: 'absolute',
                  left: avgX,
                  top: avgY,
                  width: 120,
                  padding: 14,
                  background: `${group.color}20`,
                  border: `2px solid ${group.color}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  zIndex: 10,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: group.color,
                  }}>
                    {group.name}
                  </div>
                  <motion.span
                    animate={{ rotate: 90 }}
                    style={{ fontSize: '0.8rem', color: group.color }}
                  >
                    ▶
                  </motion.span>
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#aaa',
                }}>
                  {groupNodes.length} nodes
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Group legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            padding: 16,
            background: 'rgba(15, 15, 25, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            backdropFilter: 'blur(20px)',
            zIndex: 30,
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 12, textTransform: 'uppercase' }}>
            Groups
          </div>
          {nodeGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: group.color,
              }} />
              <div style={{ fontSize: '0.75rem', flex: 1 }}>{group.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>
                {nodes.filter(n => n.groupId === group.id).length}
              </div>
            </motion.div>
          ))}
          <div style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              background: '#666',
            }} />
            <div style={{ fontSize: '0.75rem', flex: 1 }}>Ungrouped</div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>
              {nodes.filter(n => !n.groupId).length}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
