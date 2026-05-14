'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function UnfoldDemo() {
  const [openCards, setOpenCards] = React.useState({});
  const [unfoldStyle, setUnfoldStyle] = React.useState('slide');

  const cards = [
    {
      id: 1,
      icon: '📦',
      title: 'Package Details',
      subtitle: 'Shipping #TRK-8492',
      gradient: 'linear-gradient(145deg, #667eea, #764ba2)',
      details: [
        { label: 'Weight', value: '2.5 kg', icon: '⚖️' },
        { label: 'Dimensions', value: '30×20×10 cm', icon: '📏' },
        { label: 'Status', value: 'In Transit', icon: '🚚', color: '#43e97b' },
        { label: 'ETA', value: 'Tomorrow, 2 PM', icon: '⏰', color: '#fbbf24' },
      ]
    },
    {
      id: 2,
      icon: '👤',
      title: 'User Profile',
      subtitle: 'Active Member',
      gradient: 'linear-gradient(145deg, #f093fb, #f5576c)',
      details: [
        { label: 'Email', value: 'user@example.com', icon: '✉️' },
        { label: 'Joined', value: 'Jan 2024', icon: '📅' },
        { label: 'Posts', value: '142 articles', icon: '📝', color: '#667eea' },
        { label: 'Followers', value: '2.4K', icon: '👥', color: '#43e97b' },
      ]
    },
    {
      id: 3,
      icon: '💳',
      title: 'Payment Method',
      subtitle: 'Visa ****4242',
      gradient: 'linear-gradient(145deg, #4facfe, #00f2fe)',
      details: [
        { label: 'Cardholder', value: 'John Doe', icon: '👤' },
        { label: 'Expires', value: '12/26', icon: '📅' },
        { label: 'Type', value: 'Credit Card', icon: '💳' },
        { label: 'Default', value: 'Yes', icon: '⭐', color: '#fbbf24' },
      ]
    },
  ];

  const toggleCard = (id) => {
    setOpenCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const unfoldStyles = [
    { id: 'slide', label: 'Slide Down', icon: '⬇️' },
    { id: 'fade', label: 'Fade Scale', icon: '✨' },
    { id: 'spring', label: 'Spring', icon: '🔄' },
  ];

  return (
    <>
      <h2 className="demo-title">Unfold Card</h2>
      <p className="demo-subtitle">Multiple cards with slide, fade, and spring animations. Rich expandable content.</p>
      <div className="demo-area">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          {unfoldStyles.map(s => (
            <motion.button
              key={s.id}
              onClick={() => setUnfoldStyle(s.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                border: 'none',
                background: unfoldStyle === s.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {s.icon} {s.label}
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', width: '100%' }}>
          {cards.map((card, index) => {
            const isOpen = openCards[card.id];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <motion.div
                    onClick={() => toggleCard(card.id)}
                    style={{
                      background: card.gradient,
                      borderRadius: 16,
                      padding: 24,
                      border: '1px solid rgba(255,255,255,0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 120,
                        height: 120,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        filter: 'blur(40px)',
                      }}
                      animate={{ x: isOpen ? 20 : 0, y: isOpen ? -20 : 0 }}
                    />
                    <div style={{ position: 'relative' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{card.icon}</div>
                      <h3 style={{ marginBottom: 4, fontSize: '1.2rem', fontWeight: 700 }}>{card.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: 12 }}>{card.subtitle}</p>
                      <motion.div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.8)',
                          fontWeight: 600,
                        }}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                      >
                        {isOpen ? '▲' : '▼'} {isOpen ? 'Hide' : 'Show'} Details
                      </motion.div>
                    </div>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={unfoldStyle === 'slide' ? { height: 0, opacity: 0 } : unfoldStyle === 'fade' ? { scale: 0.9, opacity: 0, height: 0 } : { scaleY: 0, opacity: 0 }}
                        animate={unfoldStyle === 'slide' ? { height: 'auto', opacity: 1 } : unfoldStyle === 'fade' ? { scale: 1, opacity: 1, height: 'auto' } : { scaleY: 1, opacity: 1 }}
                        exit={unfoldStyle === 'slide' ? { height: 0, opacity: 0 } : unfoldStyle === 'fade' ? { scale: 0.9, opacity: 0, height: 0 } : { scaleY: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          background: 'rgba(15, 15, 25, 0.95)',
                          borderRadius: '0 0 16px 16px',
                          marginTop: -8,
                          transformOrigin: 'top center',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderTop: 'none',
                          overflow: 'hidden',
                        }}
                      >
                        <div style={{ padding: 24, paddingTop: 16 }}>
                          {card.details.map((detail, i) => (
                            <motion.div
                              key={`${card.id}-detail-${i}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: i < card.details.length - 1 ? 16 : 0,
                                padding: '12px 16px',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.05)',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.2rem' }}>{detail.icon}</span>
                                <span style={{ color: '#888', fontSize: '0.9rem' }}>{detail.label}</span>
                              </div>
                              <span style={{
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                color: detail.color || '#fff'
                              }}>
                                {detail.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
