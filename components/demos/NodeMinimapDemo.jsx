'use client';

import React from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, x: 100, y: 150, w: 180, h: 80, type: 'trigger', color: '#667eea' },
  { id: 2, x: 350, y: 100, w: 180, h: 80, type: 'transform', color: '#f093fb' },
  { id: 3, x: 600, y: 150, w: 180, h: 100, type: 'condition', color: '#fbbf24' },
  { id: 4, x: 850, y: 80, w: 180, h: 80, type: 'action', color: '#43e97b' },
  { id: 5, x: 850, y: 220, w: 180, h: 80, type: 'action', color: '#43e97b' },
  { id: 6, x: 100, y: 350, w: 180, h: 80, type: 'trigger', color: '#667eea' },
  { id: 7, x: 350, y: 350, w: 180, h: 80, type: 'transform', color: '#f093fb' },
  { id: 8, x: 600, y: 380, w: 180, h: 100, type: 'condition', color: '#fbbf24' },
];

export default function NodeMinimapDemo() {
  const [viewport, setViewport] = React.useState({ x: 200, y: 100, width: 600, height: 400 });
  const scale = 0.15;

  return (
    <>
      <h2 className="demo-title">Node Minimap</h2>
      <p className="demo-subtitle">Canvas overview navigator. Minimap for large node workflows.</p>
      <div className="demo-area" style={{ padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 30 }}>

          {/* Main canvas */}
          <div style={{
            height: 600,
            background: 'rgba(10, 10, 20, 0.5)',
            borderRadius: 16,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Grid */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

            {/* Viewport indicator */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={(e, info) => {
                setViewport(v => ({
                  ...v,
                  x: Math.max(0, Math.min(800, v.x + info.offset.x)),
                  y: Math.max(0, Math.min(400, v.y + info.offset.y)),
                }));
              }}
              style={{
                position: 'absolute',
                left: viewport.x,
                top: viewport.y,
                width: viewport.width,
                height: viewport.height,
                border: '3px solid #667eea',
                borderRadius: 12,
                background: 'rgba(102, 126, 234, 0.1)',
                cursor: 'move',
                zIndex: 10,
              }}
            />

            {/* Sample nodes in viewport */}
            {nodes.filter(n =>
              n.x >= viewport.x && n.x <= viewport.x + viewport.width &&
              n.y >= viewport.y && n.y <= viewport.y + viewport.height
            ).map((node) => (
              <motion.div
                key={node.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  left: node.x,
                  top: node.y,
                  width: node.w,
                  height: node.h,
                  background: `${node.color}30`,
                  border: `2px solid ${node.color}`,
                  borderRadius: 10,
                }}
              />
            ))}
          </div>

          {/* Minimap */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: 16,
                background: 'rgba(20, 20, 35, 0.8)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>Minimap</div>

              <div style={{
                position: 'relative',
                width: '100%',
                height: 300,
                background: 'rgba(10, 10, 20, 0.8)',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
                {/* All nodes */}
                {nodes.map((node) => (
                  <motion.div
                    key={node.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: node.id * 0.05 }}
                    whileHover={{ scale: 1.15, boxShadow: `0 0 15px ${node.color}` }}
                    style={{
                      position: 'absolute',
                      left: node.x * scale,
                      top: node.y * scale,
                      width: node.w * scale,
                      height: node.h * scale,
                      background: node.color,
                      borderRadius: 3,
                      cursor: 'pointer',
                    }}
                  />
                ))}

                {/* Viewport indicator */}
                <motion.div
                  drag
                  dragMomentum={false}
                  onDrag={(e, info) => {
                    setViewport(v => ({
                      ...v,
                      x: Math.max(0, Math.min(800, (info.point.x / scale))),
                      y: Math.max(0, Math.min(400, (info.point.y / scale))),
                    }));
                  }}
                  animate={{
                    x: viewport.x * scale,
                    y: viewport.y * scale,
                  }}
                  style={{
                    position: 'absolute',
                    width: viewport.width * scale,
                    height: viewport.height * scale,
                    border: '2px solid #667eea',
                    borderRadius: 4,
                    background: 'rgba(102, 126, 234, 0.2)',
                    cursor: 'move',
                  }}
                />
              </div>

              {/* Stats */}
              <div style={{ marginTop: 16, fontSize: '0.75rem', color: '#888' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Total Nodes:</span>
                  <span style={{ color: '#667eea', fontWeight: 600 }}>{nodes.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>In Viewport:</span>
                  <span style={{ color: '#43e97b', fontWeight: 600 }}>
                    {nodes.filter(n =>
                      n.x >= viewport.x && n.x <= viewport.x + viewport.width &&
                      n.y >= viewport.y && n.y <= viewport.y + viewport.height
                    ).length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Zoom:</span>
                  <span style={{ color: '#f093fb', fontWeight: 600 }}>100%</span>
                </div>
              </div>
            </motion.div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                marginTop: 16,
                padding: 16,
                background: 'rgba(20, 20, 35, 0.8)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 12 }}>Node Types</div>
              {[
                { type: 'Trigger', color: '#667eea' },
                { type: 'Transform', color: '#f093fb' },
                { type: 'Condition', color: '#fbbf24' },
                { type: 'Action', color: '#43e97b' },
              ].map((item, i) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                    fontSize: '0.75rem',
                    color: '#aaa',
                  }}
                >
                  <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: 3,
                    background: item.color,
                  }} />
                  {item.type}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
