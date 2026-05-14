'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TestimonialsDemo() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO at TechCorp',
      company: 'TechCorp',
      text: 'This product completely transformed how our team works. We shipped 3x faster and our developers are happier than ever.',
      avatar: '👩‍💼',
      rating: 5,
      color: '#667eea'
    },
    {
      name: 'Mike Johnson',
      role: 'Senior Developer',
      company: 'StartupXYZ',
      text: 'The best development tool I have ever used. The DX is incredible and the performance is outstanding.',
      avatar: '👨‍💻',
      rating: 5,
      color: '#00ff88'
    },
    {
      name: 'Emily Davis',
      role: 'Lead Designer',
      company: 'DesignStudio',
      text: 'Beautiful, intuitive, and powerful. It bridges the gap between design and development perfectly.',
      avatar: '👩‍🎨',
      rating: 5,
      color: '#f093fb'
    }
  ];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => setActive(a => (a + 1) % testimonials.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2 className="demo-title">Testimonials</h2>
      <p className="demo-subtitle">Premium testimonial carousel with ratings, company info, and navigation.</p>
      <div className="demo-area">
        <div style={{ width: '100%', maxWidth: 700 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                background: 'rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 20,
                marginBottom: 20
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#667eea' }}>💬 Testimonials</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '2rem', marginBottom: 10 }}
            >
              Loved by{' '}
              <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>thousands</span>
            </motion.h2>
          </div>

          {/* Testimonial card */}
          <div style={{
            padding: 50,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background glow */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 300,
                height: 300,
                marginLeft: -150,
                marginTop: -150,
                background: `radial-gradient(circle, ${testimonials[active].color}15 0%, transparent 70%)`,
                filter: 'blur(40px)',
                pointerEvents: 'none'
              }}
              key={active}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />

            {/* Quote mark */}
            <div style={{
              position: 'absolute',
              top: 30,
              left: 40,
              fontSize: '6rem',
              color: 'rgba(102, 126, 234, 0.1)',
              fontFamily: 'Georgia, serif',
              lineHeight: 1
            }}>
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative' }}
              >
                {/* Avatar */}
                <motion.div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `${testimonials[active].color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    margin: '0 auto 20px',
                    border: `3px solid ${testimonials[active].color}40`,
                    boxShadow: `0 0 30px ${testimonials[active].color}30`
                  }}
                >
                  {testimonials[active].avatar}
                </motion.div>

                {/* Rating */}
                <div style={{ marginBottom: 20 }}>
                  {[...Array(testimonials[active].rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ color: '#ffd700', fontSize: '1.2rem', margin: '0 2px' }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: '1.3rem',
                  marginBottom: 25,
                  color: '#ddd',
                  lineHeight: 1.6,
                  maxWidth: 500,
                  margin: '0 auto 25px'
                }}>
                  "{testimonials[active].text}"
                </p>

                {/* Author info */}
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{testimonials[active].name}</div>
                <div style={{ color: '#888', fontSize: '0.9rem', marginTop: 5 }}>
                  {testimonials[active].role}
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 10,
                  padding: '4px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 20
                }}>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>@ {testimonials[active].company}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              left: 20,
              right: 20,
              top: '50%',
              marginTop: -20,
              pointerEvents: 'none'
            }}>
              {[
                { dir: -1, icon: '←' },
                { dir: 1, icon: '→' }
              ].map((btn, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(a => (a + btn.dir + testimonials.length) % testimonials.length)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#888',
                    cursor: 'pointer',
                    pointerEvents: 'auto'
                  }}
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {btn.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 25 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? t.color : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer'
                }}
                whileHover={{ scale: 1.2 }}
                layout
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
