'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

// App Store Layout
const apps = [
  { id: 1, title: 'Mindful', category: 'Health', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: 2, title: 'Explorer', category: 'Travel', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400' },
  { id: 3, title: 'Beats', category: 'Music', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
];

export default function AppStoreDemo() {
  const [selected, setSelected] = React.useState(null);

  return (
    <>
      <h2 className="demo-title">App Store Transition</h2>
      <p className="demo-subtitle">Click a card. layoutId creates seamless morphing between states. This is Framer Motion's killer feature.</p>
      <div className="demo-area">
        <div className="app-grid">
          {apps.map(app => (
            <motion.div
              key={app.id}
              layoutId={`app-${app.id}`}
              className="app-card"
              onClick={() => setSelected(app)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.img src={app.image} layoutId={`img-${app.id}`} alt="" />
              <div className="app-card-content">
                <motion.h3 layoutId={`title-${app.id}`}>{app.title}</motion.h3>
                <motion.p layoutId={`cat-${app.id}`}>{app.category}</motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div className="modal-card" layoutId={`app-${selected.id}`} onClick={e => e.stopPropagation()}>
              <div className="modal-image">
                <motion.img src={selected.image} layoutId={`img-${selected.id}`} alt="" />
                <button className="close-btn" onClick={() => setSelected(null)}>×</button>
              </div>
              <div className="modal-body">
                <motion.h2 layoutId={`title-${selected.id}`}>{selected.title}</motion.h2>
                <motion.p className="tag" layoutId={`cat-${selected.id}`}>{selected.category}</motion.p>
                <motion.p
                  className="desc"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Experience next-gen mobile applications designed with attention to detail. Transform how you interact with the world.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
