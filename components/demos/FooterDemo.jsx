'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FooterDemo() {
  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', badge: null },
        { name: 'Pricing', badge: null },
        { name: 'Integrations', badge: 'New' },
        { name: 'Changelog', badge: null }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', badge: null },
        { name: 'Careers', badge: '3 open' },
        { name: 'Blog', badge: null },
        { name: 'Press', badge: null }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', badge: null },
        { name: 'Help Center', badge: null },
        { name: 'Community', badge: null },
        { name: 'Status', badge: null }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', badge: null },
        { name: 'Terms', badge: null },
        { name: 'Security', badge: null }
      ]
    }
  ];

  const socials = [
    { name: 'Twitter', icon: '𝕏', color: '#1da1f2' },
    { name: 'GitHub', icon: '◐', color: '#fff' },
    { name: 'Discord', icon: '◈', color: '#5865f2' },
    { name: 'LinkedIn', icon: '▣', color: '#0077b5' }
  ];

  return (
    <>
      <h2 className="demo-title">Footer</h2>
      <p className="demo-subtitle">Premium footer with newsletter, social icons, badges, and hover animations.</p>
      <div className="demo-area">
        <div style={{
          width: '100%',
          maxWidth: 950,
          borderRadius: 24,
          overflow: 'hidden'
        }}>
          {/* Main footer */}
          <div style={{
            padding: 50,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '24px 24px 0 0',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr repeat(4, 1fr)',
              gap: 40
            }}>
              {/* Brand column */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: 20 }}
                >
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: 15,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <span style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1rem'
                    }}>
                      ◆
                    </span>
                    Acme
                  </div>
                  <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
                    Building the future of digital experiences. One pixel at a time.
                  </p>

                  {/* Mini newsletter */}
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    padding: 4,
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <input
                      type="email"
                      placeholder="Email"
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        border: 'none',
                        background: 'transparent',
                        color: '#fff',
                        outline: 'none',
                        fontSize: '0.85rem'
                      }}
                    />
                    <motion.button
                      style={{
                        padding: '10px 16px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none',
                        borderRadius: 8,
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      →
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Link columns */}
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <div style={{
                    fontWeight: 600,
                    marginBottom: 20,
                    fontSize: '0.9rem',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: 1
                  }}>
                    {section.title}
                  </div>
                  {section.links.map((link, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + j * 0.05 }}
                      whileHover={{ x: 5 }}
                      style={{
                        color: '#777',
                        fontSize: '0.9rem',
                        marginBottom: 12,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <motion.span
                        whileHover={{ color: '#667eea' }}
                        style={{ transition: 'color 0.2s' }}
                      >
                        {link.name}
                      </motion.span>
                      {link.badge && (
                        <span style={{
                          padding: '2px 8px',
                          background: link.badge === 'New' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(102, 126, 234, 0.2)',
                          color: link.badge === 'New' ? '#00ff88' : '#667eea',
                          borderRadius: 10,
                          fontSize: '0.7rem'
                        }}>
                          {link.badge}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            padding: '25px 50px',
            background: 'rgba(0,0,0,0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20
          }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ color: '#555', fontSize: '0.85rem' }}
            >
              © 2024 Acme Inc. All rights reserved.
            </motion.span>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', gap: 12 }}
            >
              {socials.map((social, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, scale: 1.1 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#888',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.color = social.color;
                    e.currentTarget.style.boxShadow = `0 0 20px ${social.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#888';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </motion.div>
              ))}
            </motion.div>

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                background: 'rgba(0, 255, 136, 0.1)',
                borderRadius: 20,
                border: '1px solid rgba(0, 255, 136, 0.2)'
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#00ff88',
                  boxShadow: '0 0 10px #00ff88'
                }}
              />
              <span style={{ color: '#00ff88', fontSize: '0.8rem' }}>All systems operational</span>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
