'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function Card3DDemo() {
  const ref = React.useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / -10;
    const y = (e.clientX - rect.left - rect.width / 2) / 10;
    rotateX.set(x);
    rotateY.set(y);
  };

  const handleLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <>
      <h2 className="demo-title">3D Card</h2>
      <p className="demo-subtitle">Mouse tracking with 3D transforms. Spring physics creates smooth perspective shifts.</p>
      <div className="demo-area">
        <div className="card-3d-wrap">
          <motion.div
            ref={ref}
            className="card-3d"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX: springX, rotateY: springY }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-3d-icon" />
            <h3>Premium Card</h3>
            <p>3D transforms respond to cursor position with spring physics for a premium feel.</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
