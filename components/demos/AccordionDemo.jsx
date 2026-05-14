'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function AccordionDemo() {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: 'What is Framer Motion?', a: 'A production-ready motion library for React with declarative animations and gestures.' },
    { q: 'How does it compare to GSAP?', a: 'Framer Motion integrates with React components. GSAP is more powerful for complex timelines but requires imperative code.' },
    { q: 'Is it performant?', a: 'Yes! Uses hardware acceleration and runs at 60fps. Supports reduced motion preferences.' },
  ];

  return (
    <>
      <h2 className="demo-title">Accordion</h2>
      <p className="demo-subtitle">Animated height transitions. Click items to expand/collapse with smooth animations.</p>
      <div className="demo-area">
        <div className="accordion-wrap">
          {items.map((item, i) => (
            <div key={i} className="accordion-item">
              <div className="accordion-header" onClick={() => setOpen(open === i ? -1 : i)}>
                <h4>{item.q}</h4>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }}>▼</motion.span>
              </div>
              <motion.div
                className="accordion-content"
                initial={false}
                animate={{
                  height: open === i ? 'auto' : 0,
                  opacity: open === i ? 1 : 0,
                  marginBottom: open === i ? 18 : 0
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>{item.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
