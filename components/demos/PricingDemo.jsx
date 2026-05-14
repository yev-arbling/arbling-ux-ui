'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function PricingDemo() {
  const [isAnnual, setIsAnnual] = React.useState(true);
  const [hoveredPlan, setHoveredPlan] = React.useState(null);

  const plans = [
    {
      name: 'Starter',
      desc: 'Perfect for side projects',
      monthlyPrice: 12,
      annualPrice: 9,
      features: [
        { text: '5 projects', included: true },
        { text: '10GB storage', included: true },
        { text: 'Basic support', included: true },
        { text: 'API access', included: false },
        { text: 'Custom domain', included: false }
      ],
      color: '#4facfe'
    },
    {
      name: 'Pro',
      desc: 'For growing teams',
      monthlyPrice: 39,
      annualPrice: 29,
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '100GB storage', included: true },
        { text: 'Priority support', included: true },
        { text: 'API access', included: true },
        { text: 'Custom domain', included: true }
      ],
      popular: true,
      color: '#667eea'
    },
    {
      name: 'Enterprise',
      desc: 'For large organizations',
      monthlyPrice: 129,
      annualPrice: 99,
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Unlimited storage', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'SLA guarantee', included: true }
      ],
      color: '#f093fb'
    }
  ];

  return (
    <>
      <h2 className="demo-title">Pricing Cards</h2>
      <p className="demo-subtitle">Premium pricing with annual/monthly toggle, feature comparison, and hover effects.</p>
      <div className="demo-area">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '2.2rem', marginBottom: 10 }}
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ color: '#888', marginBottom: 30 }}
          >
            No hidden fees. Cancel anytime.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 15,
              padding: '6px 8px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 30,
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <motion.button
              onClick={() => setIsAnnual(false)}
              style={{
                padding: '10px 20px',
                borderRadius: 20,
                border: 'none',
                background: !isAnnual ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                color: !isAnnual ? '#fff' : '#888',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setIsAnnual(true)}
              style={{
                padding: '10px 20px',
                borderRadius: 20,
                border: 'none',
                background: isAnnual ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                color: isAnnual ? '#fff' : '#888',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Annual
              <span style={{
                padding: '2px 8px',
                background: '#00ff88',
                borderRadius: 10,
                fontSize: '0.7rem',
                color: '#000',
                fontWeight: 600
              }}>
                -25%
              </span>
            </motion.button>
          </motion.div>
        </div>

        <div style={{
          display: 'flex',
          gap: 20,
          alignItems: 'stretch',
          justifyContent: 'center'
        }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 100 }}
              onHoverStart={() => setHoveredPlan(i)}
              onHoverEnd={() => setHoveredPlan(null)}
              whileHover={{ y: -10 }}
              style={{
                width: 280,
                padding: 30,
                background: plan.popular
                  ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))'
                  : 'rgba(255,255,255,0.02)',
                borderRadius: 24,
                border: plan.popular ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: plan.popular ? '0 20px 40px rgba(102, 126, 234, 0.2)' : 'none'
              }}
            >
              {/* Background glow on hover */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: `${plan.color}20`,
                  filter: 'blur(40px)'
                }}
                animate={{
                  scale: hoveredPlan === i ? 1.5 : 1,
                  opacity: hoveredPlan === i ? 1 : 0.5
                }}
              />

              {plan.popular && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  style={{
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    right: -1,
                    padding: '6px 0',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: '24px 24px 0 0'
                  }}
                >
                  ⭐ MOST POPULAR
                </motion.div>
              )}

              <div style={{ position: 'relative', marginTop: plan.popular ? 20 : 0 }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: 5 }}>{plan.name}</div>
                <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: 20 }}>{plan.desc}</div>

                <div style={{ marginBottom: 25 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}
                    >
                      <span style={{
                        fontSize: '3.5rem',
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${plan.color}, ${plan.color}aa)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span style={{ color: '#666' }}>/month</span>
                    </motion.div>
                  </AnimatePresence>
                  {isAnnual && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ fontSize: '0.8rem', color: '#00ff88', marginTop: 5 }}
                    >
                      Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                    </motion.div>
                  )}
                </div>

                <div style={{ marginBottom: 25 }}>
                  {plan.features.map((f, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + j * 0.05 }}
                      style={{
                        color: f.included ? '#aaa' : '#555',
                        fontSize: '0.9rem',
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                      }}
                    >
                      <span style={{
                        color: f.included ? '#00ff88' : '#ff4444',
                        fontSize: '0.8rem'
                      }}>
                        {f.included ? '✓' : '✕'}
                      </span>
                      <span style={{ textDecoration: f.included ? 'none' : 'line-through' }}>
                        {f.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className={plan.popular ? 'primary-btn replay-btn' : 'replay-btn'}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '0.95rem',
                    background: plan.popular ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                    border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: plan.popular ? '0 10px 30px rgba(102, 126, 234, 0.4)' : 'none'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.popular ? 'Get Started →' : 'Choose Plan'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
