'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ComparisonTableDemo() {
  const [hoveredRow, setHoveredRow] = React.useState(null);
  const [selectedPlan, setSelectedPlan] = React.useState('pro');
  const [billingCycle, setBillingCycle] = React.useState('annual');
  const [showConfirm, setShowConfirm] = React.useState(false);

  const plans = [
    { id: 'starter', name: 'Starter', monthlyPrice: 12, annualPrice: 9, color: '#888', gradient: 'linear-gradient(135deg, #667 0%, #555 100%)', desc: 'For individuals', users: '1' },
    { id: 'pro', name: 'Pro', monthlyPrice: 39, annualPrice: 29, color: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', desc: 'For growing teams', users: '10', popular: true },
    { id: 'enterprise', name: 'Enterprise', monthlyPrice: 149, annualPrice: 99, color: '#f5576c', gradient: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)', desc: 'For large orgs', users: '∞' },
  ];

  const features = [
    { name: 'Team Members', icon: '👥', starter: '1 user', pro: 'Up to 10', enterprise: 'Unlimited', category: 'core' },
    { name: 'Storage', icon: '💾', starter: '5 GB', pro: '100 GB', enterprise: '1 TB', category: 'core' },
    { name: 'API Requests', icon: '🔌', starter: '1K/mo', pro: '100K/mo', enterprise: 'Unlimited', category: 'core' },
    { name: 'Analytics', icon: '📊', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom + AI', category: 'features' },
    { name: 'Integrations', icon: '🔗', starter: '5', pro: '50+', enterprise: '500+', category: 'features' },
    { name: 'Support', icon: '💬', starter: 'Email', pro: 'Priority Chat', enterprise: '24/7 Phone + Slack', category: 'support' },
    { name: 'SSO/SAML', icon: '🔐', starter: false, pro: true, enterprise: true, category: 'security' },
    { name: 'Audit Logs', icon: '📋', starter: false, pro: '30 days', enterprise: 'Unlimited', category: 'security' },
    { name: 'SLA', icon: '✅', starter: false, pro: '99.9%', enterprise: '99.99%', category: 'support' },
    { name: 'Custom Domain', icon: '🌐', starter: false, pro: true, enterprise: true, category: 'features' },
  ];

  const getPrice = (plan) => billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  const savings = (plan) => Math.round((1 - plan.annualPrice / plan.monthlyPrice) * 100);

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Comparison Table</h2>
        <p className="demo-subtitle">Premium pricing comparison with billing toggle, feature categories, and selection flow</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
          >
            <div style={{
              display: 'flex', gap: '4px', padding: '4px',
              background: 'rgba(255,255,255,0.05)', borderRadius: '10px',
            }}>
              {['monthly', 'annual'].map(cycle => (
                <motion.button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  style={{
                    padding: '8px 20px', borderRadius: '8px', border: 'none',
                    background: billingCycle === cycle ? '#667eea' : 'transparent',
                    color: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 500,
                    position: 'relative',
                  }}
                  whileHover={{ scale: billingCycle === cycle ? 1 : 1.02 }}
                >
                  {cycle === 'annual' ? 'Annual' : 'Monthly'}
                  {cycle === 'annual' && (
                    <motion.span
                      style={{
                        position: 'absolute', top: -8, right: -8,
                        background: '#43e97b', color: '#000',
                        fontSize: '0.55rem', padding: '2px 5px', borderRadius: '4px', fontWeight: 700,
                      }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      -25%
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(15,15,25,0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)' }}>
              <div style={{ padding: '20px 16px' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', fontWeight: 600 }}>COMPARE PLANS</div>
              </div>
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    padding: '16px 12px', textAlign: 'center', cursor: 'pointer',
                    background: selectedPlan === plan.id ? `${plan.color}15` : 'transparent',
                    borderBottom: `3px solid ${selectedPlan === plan.id ? plan.color : 'transparent'}`,
                    position: 'relative',
                  }}
                  whileHover={{ background: `${plan.color}10` }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {plan.popular && (
                    <motion.div
                      style={{
                        position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                        background: plan.gradient, color: '#fff',
                        fontSize: '0.55rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 700,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      MOST POPULAR
                    </motion.div>
                  )}
                  <div style={{ marginTop: plan.popular ? 20 : 0 }}>
                    <div style={{ fontWeight: 700, color: selectedPlan === plan.id ? plan.color : '#fff', fontSize: '0.95rem' }}>{plan.name}</div>
                    <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '6px' }}>{plan.desc}</div>
                    <motion.div
                      key={`${plan.id}-${billingCycle}`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}
                    >
                      <span style={{ fontSize: '1.6rem', fontWeight: 800, color: plan.color }}>${getPrice(plan)}</span>
                      <span style={{ fontSize: '0.7rem', color: '#666' }}>/mo</span>
                    </motion.div>
                    {billingCycle === 'annual' && plan.id !== 'starter' && (
                      <div style={{ fontSize: '0.6rem', color: '#43e97b', marginTop: '2px' }}>Save {savings(plan)}%</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {features.map((feature, i) => {
              const isHovered = hoveredRow === i;
              return (
                <motion.div
                  key={feature.name}
                  onHoverStart={() => setHoveredRow(i)}
                  onHoverEnd={() => setHoveredRow(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    background: isHovered ? 'rgba(255,255,255,0.02)' : 'transparent',
                  }}
                >
                  <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem' }}>{feature.icon}</span>
                    <span style={{ color: isHovered ? '#fff' : '#999', fontSize: '0.8rem', transition: 'color 0.2s' }}>{feature.name}</span>
                  </div>
                  {plans.map(plan => {
                    const value = feature[plan.id];
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <motion.div
                        key={plan.id}
                        style={{
                          padding: '12px', textAlign: 'center',
                          background: isSelected ? `${plan.color}08` : 'transparent',
                        }}
                        animate={{ scale: isHovered && isSelected ? 1.02 : 1 }}
                      >
                        {typeof value === 'boolean' ? (
                          <motion.span
                            style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              width: 22, height: 22, borderRadius: '50%',
                              background: value ? '#43e97b20' : '#ef444420',
                              color: value ? '#43e97b' : '#ef4444',
                              fontSize: '0.75rem',
                            }}
                            animate={isHovered && value ? { scale: [1, 1.2, 1] } : {}}
                          >
                            {value ? '✓' : '—'}
                          </motion.span>
                        ) : (
                          <span style={{
                            color: isSelected ? '#fff' : '#888',
                            fontSize: '0.8rem',
                            fontWeight: isSelected ? 600 : 400,
                          }}>
                            {value}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              );
            })}

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div />
              {plans.map(plan => (
                <div key={plan.id} style={{ textAlign: 'center', padding: '0 8px' }}>
                  <motion.button
                    onClick={() => setShowConfirm(true)}
                    whileHover={{ scale: 1.03, boxShadow: selectedPlan === plan.id ? `0 10px 25px ${plan.color}40` : 'none' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '10px', border: 'none',
                      background: selectedPlan === plan.id ? plan.gradient : 'rgba(255,255,255,0.08)',
                      color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem',
                    }}
                  >
                    {selectedPlan === plan.id ? 'Get Started' : 'Select'}
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.7rem', color: '#666' }}
          >
            💳 No credit card required • 14-day free trial • Cancel anytime
          </motion.div>
        </div>
      </div>
    </>
  );
}
