'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function LogoCloudDemo() {
  const logos = [
    { name: 'Google', icon: '🔍', color: '#4285f4' },
    { name: 'Meta', icon: '📘', color: '#0668e1' },
    { name: 'Apple', icon: '🍎', color: '#a2aaad' },
    { name: 'Amazon', icon: '📦', color: '#ff9900' },
    { name: 'Netflix', icon: '🎬', color: '#e50914' },
    { name: 'Spotify', icon: '🎵', color: '#1db954' },
    { name: 'Stripe', icon: '💳', color: '#635bff' },
    { name: 'Slack', icon: '💬', color: '#4a154b' }
  ];

  const [hoveredLogo, setHoveredLogo] = React.useState(null);

  return (
    <>
      <h2 className="demo-title">Logo Cloud</h2>
      <p className="demo-subtitle">Premium logo showcase with hover effects, icons, and grayscale-to-color transitions.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 900,
          padding: 50,
          borderRadius: 24,
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Subtle glow */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 400,
              height: 200,
              marginLeft: -200,
              marginTop: -100,
              background: 'radial-gradient(ellipse, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
          />

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
            <span style={{ fontSize: '0.85rem', color: '#667eea' }}>🏆 Trusted Partners</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ color: '#888', marginBottom: 40, fontSize: '1.1rem' }}
          >
            Powering the world's most innovative companies
          </motion.p>

          {/* Logo grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20
          }}>
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 100 }}
                onHoverStart={() => setHoveredLogo(i)}
                onHoverEnd={() => setHoveredLogo(null)}
                whileHover={{ y: -5 }}
                style={{
                  padding: '25px 20px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Hover glow */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at center, ${logo.color}15 0%, transparent 70%)`
                  }}
                  animate={{
                    opacity: hoveredLogo === i ? 1 : 0
                  }}
                />

                {/* Top accent line */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: logo.color,
                    originX: 0
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredLogo === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div style={{ position: 'relative' }}>
                  <motion.div
                    style={{
                      fontSize: '2rem',
                      marginBottom: 10,
                      filter: hoveredLogo === i ? 'none' : 'grayscale(100%)',
                      transition: 'filter 0.3s'
                    }}
                    animate={{
                      scale: hoveredLogo === i ? 1.1 : 1
                    }}
                  >
                    {logo.icon}
                  </motion.div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: hoveredLogo === i ? logo.color : 'rgba(255,255,255,0.4)',
                    transition: 'color 0.3s'
                  }}>
                    {logo.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: 40,
              display: 'flex',
              justifyContent: 'center',
              gap: 50
            }}
          >
            {[
              { value: '500+', label: 'Companies' },
              { value: '50M+', label: 'Users' },
              { value: '99.9%', label: 'Uptime' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stat.value}
                </div>
                <div style={{ color: '#666', fontSize: '0.85rem', marginTop: 5 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
