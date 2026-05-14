'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ReorderDemo() {
  const [items, setItems] = React.useState([
    { id: 1, title: 'Design System', tag: 'In Progress' },
    { id: 2, title: 'API Integration', tag: 'Review' },
    { id: 3, title: 'User Testing', tag: 'Planned' },
    { id: 4, title: 'Documentation', tag: 'Done' },
  ]);

  return (
    <>
      <h2 className="demo-title">Drag to Reorder</h2>
      <p className="demo-subtitle">Reorder.Group handles all the complexity. Drag items to rearrange. Layout animations smooth the transitions.</p>
      <div className="demo-area">
        <div className="reorder-wrap">
          <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.map(item => (
              <Reorder.Item
                key={item.id}
                value={item}
                className="reorder-item"
                whileDrag={{ scale: 1.02, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)' }}
              >
                <span className="handle">⋮⋮</span>
                <h4>{item.title}</h4>
                <span>{item.tag}</span>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </>
  );
}
