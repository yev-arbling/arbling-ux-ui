'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FAQDemo() {
  const faqs = [
    {
      q: 'How do I get started?',
      a: 'Sign up for a free account and follow our interactive quick start guide. You\'ll be up and running in less than 5 minutes.',
      icon: '🚀'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, bank transfers, and crypto payments.',
      icon: '💳'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Absolutely! You can cancel your subscription at any time with no penalties or hidden fees. Your data will be available for export for 30 days.',
      icon: '✅'
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes! All plans come with a 14-day free trial with full access to all features. No credit card required to start.',
      icon: '🎁'
    },
    {
      q: 'Do you offer team discounts?',
      a: 'Yes, we offer volume discounts for teams of 10 or more. Contact our sales team for custom enterprise pricing.',
      icon: '👥'
    }
  ];
  const [open, setOpen] = React.useState(0);

  return (
    <>
      <h2 className="demo-title">FAQ Accordion</h2>
      <p className="demo-subtitle">Premium FAQ with icons, smooth height animations, and detailed answers.</p>
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
              <span style={{ fontSize: '0.85rem', color: '#667eea' }}>❓ FAQ</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '2rem', marginBottom: 10 }}
            >
              Frequently asked{' '}
              <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>questions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: '#888' }}
            >
              Everything you need to know about our product
            </motion.p>
          </div>

          {/* FAQ items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{
                  background: open === i ? 'rgba(102, 126, 234, 0.08)' : 'rgba(255,255,255,0.02)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: open === i ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s'
                }}
              >
                <motion.div
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    padding: '22px 25px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 15
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <motion.span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: open === i ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}
                      animate={{
                        scale: open === i ? 1.1 : 1,
                        rotate: open === i ? 10 : 0
                      }}
                    >
                      {faq.icon}
                    </motion.span>
                    <span style={{
                      fontWeight: 500,
                      color: open === i ? '#fff' : '#ccc',
                      transition: 'color 0.3s'
                    }}>
                      {faq.q}
                    </span>
                  </div>
                  <motion.div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: open === i ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ color: open === i ? '#667eea' : '#888', fontSize: '0.8rem' }}>↓</span>
                  </motion.div>
                </motion.div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 25px 25px 80px',
                        color: '#888',
                        lineHeight: 1.7
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: 30,
              padding: 25,
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'center'
            }}
          >
            <p style={{ color: '#888', marginBottom: 15 }}>Still have questions?</p>
            <motion.button
              className="replay-btn"
              style={{
                background: 'transparent',
                border: '1px solid rgba(102, 126, 234, 0.5)',
                color: '#667eea'
              }}
              whileHover={{ scale: 1.02, borderColor: '#667eea' }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Support →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
