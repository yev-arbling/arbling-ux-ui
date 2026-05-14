'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function FormWizardDemo() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '', email: '', company: '', plan: '', payment: ''
  });

  const steps = [
    { title: 'Account', icon: '👤', fields: ['name', 'email'] },
    { title: 'Company', icon: '🏢', fields: ['company', 'plan'] },
    { title: 'Payment', icon: '💳', fields: ['payment'] },
  ];

  const validateStep = (stepIndex) => {
    return steps[stepIndex].fields.every(field => formData[field].trim() !== '');
  };

  const canProceed = validateStep(currentStep);
  const canGoBack = currentStep > 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 600, background: 'rgba(20, 20, 35, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 40 }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 10 }}>Form Wizard</h2>
        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: 30 }}>Multi-step form with animated progress</p>

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  style={{
                    width: 50, height: 50, borderRadius: 16,
                    background: index <= currentStep
                      ? 'linear-gradient(135deg, #667eea, #764ba2)'
                      : 'rgba(255,255,255,0.05)',
                    border: index <= currentStep ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', position: 'relative',
                  }}
                  animate={{ scale: index === currentStep ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.3, delay: index === currentStep ? 0 : undefined }}
                >
                  {step.icon}
                  {index < currentStep && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ position: 'absolute', top: -5, right: -5, width: 20, height: 20,
                        borderRadius: '50%', background: '#22c55e',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600,
                  color: index <= currentStep ? '#fff' : '#666',
                  textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>

          <div style={{ position: 'relative', height: 4, borderRadius: 2,
            background: 'rgba(255,255,255,0.1)', marginTop: 10 }}>
            <motion.div
              style={{ position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 2,
                background: 'linear-gradient(90deg, #667eea, #764ba2)' }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {currentStep === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8, fontWeight: 500 }}>Full Name</label>
                  <motion.input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                    whileFocus={{ borderColor: '#667eea', background: 'rgba(102, 126, 234, 0.05)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8, fontWeight: 500 }}>Email</label>
                  <motion.input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                    whileFocus={{ borderColor: '#667eea', background: 'rgba(102, 126, 234, 0.05)' }}
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8, fontWeight: 500 }}>Company</label>
                  <motion.input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Inc."
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                    whileFocus={{ borderColor: '#667eea', background: 'rgba(102, 126, 234, 0.05)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8, fontWeight: 500 }}>Plan</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {['Starter', 'Professional', 'Enterprise'].map((plan) => (
                      <motion.div
                        key={plan}
                        onClick={() => setFormData({ ...formData, plan })}
                        style={{ padding: '14px 18px', borderRadius: 12,
                          background: formData.plan === plan
                            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))'
                            : 'rgba(255,255,255,0.03)',
                          border: formData.plan === plan ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500 }}>{plan}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8, fontWeight: 500 }}>Payment</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {['Credit Card', 'PayPal', 'Bank Transfer'].map((method) => (
                      <motion.div
                        key={method}
                        onClick={() => setFormData({ ...formData, payment: method })}
                        style={{ flex: 1, padding: '14px', borderRadius: 12,
                          background: formData.payment === method
                            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))'
                            : 'rgba(255,255,255,0.03)',
                          border: formData.payment === method ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                          textAlign: 'center', cursor: 'pointer' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500 }}>{method}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ padding: 20, borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
                    border: '1px solid rgba(34, 197, 94, 0.2)' }}
                >
                  <div style={{ fontSize: '0.8rem', color: '#22c55e', marginBottom: 10,
                    textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Summary</div>
                  <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: 5 }}>
                    <strong style={{ color: '#fff' }}>{formData.name}</strong> - {formData.email}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#888' }}>
                    {formData.company} • {formData.plan} • {formData.payment}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
          <motion.button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={!canGoBack}
            style={{ flex: 1, padding: '14px 24px', borderRadius: 12,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: canGoBack ? '#fff' : '#666', fontSize: '0.95rem', fontWeight: 600,
              cursor: canGoBack ? 'pointer' : 'not-allowed' }}
            whileHover={canGoBack ? { background: 'rgba(255,255,255,0.08)' } : {}}
            whileTap={canGoBack ? { scale: 0.98 } : {}}
          >
            ← Back
          </motion.button>

          <motion.button
            onClick={() => {
              if (isLastStep) {
                alert('Form submitted! 🎉');
                setCurrentStep(0);
                setFormData({ name: '', email: '', company: '', plan: '', payment: '' });
              } else {
                setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
              }
            }}
            disabled={!canProceed}
            style={{ flex: 1, padding: '14px 24px', borderRadius: 12,
              background: canProceed ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
              border: canProceed ? 'none' : '1px solid rgba(255,255,255,0.1)',
              color: canProceed ? '#fff' : '#666', fontSize: '0.95rem', fontWeight: 600,
              cursor: canProceed ? 'pointer' : 'not-allowed' }}
            whileHover={canProceed ? { scale: 1.02, boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)' } : {}}
            whileTap={canProceed ? { scale: 0.98 } : {}}
          >
            {isLastStep ? 'Complete ✓' : 'Next →'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
