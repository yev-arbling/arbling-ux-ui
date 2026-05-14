'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function HeroCardsDemo() {
  const cards = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-millisecond response times globally', color: '#ffd700', gradient: 'linear-gradient(135deg, #ffd700 0%, #ff9500 100%)' },
    { icon: '🔒', title: 'Bank-Level Security', desc: 'Enterprise encryption at rest and in transit', color: '#00ff88', gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)' },
    { icon: '🌍', title: 'Global Scale', desc: '99.99% uptime with edge deployment', color: '#00d4ff', gradient: 'linear-gradient(135deg, #00d4ff 0%, #667eea 100%)' }
  ];

  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <>
      <h2 className="demo-title">Hero Cards</h2>
      <p className="demo-subtitle">Floating 3D feature cards with spotlight effects and staggered entrance.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 900,
          padding: 60,
          borderRadius: 24,
          position: 'relative',
          overflow: 'hidden',
          perspective: 1000
        }}>
          {/* Background glow based on hovered card */}
          <AnimatePresence>
            {hoveredCard !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: hoveredCard === 0 ? '20%' : hoveredCard === 1 ? '50%' : '80%',
                  width: 300,
                  height: 300,
                  marginLeft: -150,
                  marginTop: -150,
                  background: `radial-gradient(circle, ${cards[hoveredCard].color}30 0%, transparent 70%)`,
                  filter: 'blur(40px)',
                  pointerEvents: 'none'
                }}
              />
            )}
          </AnimatePresence>

          {/* Dot pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '25px 25px'
          }} />

          <div style={{ position: 'relative', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: 15 }}
            >
              <span style={{
                padding: '6px 14px',
                background: 'rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: 20,
                fontSize: '0.85rem',
                color: '#667eea'
              }}>
                Why choose us
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '2.8rem', marginBottom: 15 }}
            >
              Everything you need to{' '}
              <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>succeed</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#888', marginBottom: 50, fontSize: '1.1rem' }}
            >
              Built for teams who demand excellence
            </motion.p>

            <div style={{
              display: 'flex',
              gap: 25,
              justifyContent: 'center'
            }}>
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 60, rotateX: -30, rotateY: i === 0 ? 10 : i === 2 ? -10 : 0 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 80, damping: 15 }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    rotateY: i === 0 ? -5 : i === 2 ? 5 : 0,
                    boxShadow: `0 25px 50px ${card.color}30`
                  }}
                  style={{
                    width: 220,
                    padding: 30,
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 24,
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Top glow line */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: card.gradient
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                  />

                  {/* Icon with glow */}
                  <motion.div
                    style={{
                      fontSize: '3.5rem',
                      marginBottom: 20,
                      filter: `drop-shadow(0 0 20px ${card.color}60)`
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  >
                    {card.icon}
                  </motion.div>

                  <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 10 }}>{card.title}</div>
                  <div style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.5 }}>{card.desc}</div>

                  {/* Animated progress bar */}
                  <div style={{
                    marginTop: 20,
                    height: 4,
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      style={{
                        height: '100%',
                        background: card.gradient,
                        borderRadius: 2
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.7 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Corner decoration */}
                  <div style={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `${card.color}08`,
                    filter: 'blur(20px)'
                  }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
