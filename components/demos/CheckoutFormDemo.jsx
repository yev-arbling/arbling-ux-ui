'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CheckoutFormDemo() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zipCode: '',
    country: 'United States', cardNumber: '', cardName: '', expiryDate: '', cvv: '', saveCard: false,
  });
  const [errors, setErrors] = React.useState({});
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  const totalSteps = 3;

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }
    if (currentStep === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }
    if (currentStep === 3) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handlePayment = () => {
    if (validateStep(step)) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
      }, 2000);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const Input = ({ label, field, type = 'text', placeholder, error }) => (
    <div style={{ marginBottom: 15 }}>
      <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>
        {label}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.05)',
          border: error ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10,
          color: '#fff',
          fontSize: '0.95rem',
          outline: 'none',
        }}
      />
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: 5 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );

  if (isComplete) {
    return (
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: 60,
            background: 'rgba(20, 20, 35, 0.8)',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{ fontSize: '5rem', marginBottom: 20 }}
          >
            ✓
          </motion.div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 10, color: '#22c55e' }}>
            Order Confirmed!
          </h2>
          <p style={{ color: '#888', fontSize: '1rem' }}>
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 600 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, gap: 10 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <React.Fragment key={i}>
              <motion.div
                animate={{
                  width: step >= i + 1 ? 45 : 35,
                  height: step >= i + 1 ? 45 : 35,
                  background: step >= i + 1 ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                  borderColor: step >= i + 1 ? 'transparent' : 'rgba(255,255,255,0.2)',
                }}
                style={{
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid',
                  fontWeight: 700,
                  fontSize: step >= i + 1 ? '1rem' : '0.9rem',
                  color: step >= i + 1 ? '#fff' : '#888',
                }}
              >
                {i + 1}
              </motion.div>
              {i < totalSteps - 1 && (
                <div style={{
                  flex: 1,
                  height: 2,
                  background: step >= i + 2 ? 'linear-gradient(90deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
                  maxWidth: 60,
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{
          padding: 40,
          background: 'rgba(20, 20, 35, 0.8)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 8 }}>Contact Information</h2>
                  <p style={{ color: '#888', marginBottom: 30 }}>Enter your contact details to continue</p>
                  <Input label="Email Address" field="email" type="email" placeholder="you@example.com" error={errors.email} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                    <Input label="First Name" field="firstName" placeholder="John" error={errors.firstName} />
                    <Input label="Last Name" field="lastName" placeholder="Doe" error={errors.lastName} />
                  </div>
                  <div style={{ marginTop: 25 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.saveCard}
                        onChange={(e) => updateField('saveCard', e.target.checked)}
                        style={{ width: 18, height: 18 }}
                      />
                      <span style={{ fontSize: '0.9rem', color: '#888' }}>Save my information for faster checkout</span>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 8 }}>Shipping Address</h2>
                  <p style={{ color: '#888', marginBottom: 30 }}>Where should we send your order?</p>
                  <Input label="Street Address" field="address" placeholder="123 Main Street" error={errors.address} />
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 15 }}>
                    <Input label="City" field="city" placeholder="New York" error={errors.city} />
                    <Input label="ZIP Code" field="zipCode" placeholder="10001" error={errors.zipCode} />
                  </div>
                  <div style={{ marginBottom: 15 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => updateField('country', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10,
                        color: '#fff',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 8 }}>Payment Method</h2>
                  <p style={{ color: '#888', marginBottom: 30 }}>Enter your payment details securely</p>

                  <div style={{
                    padding: 25,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: 16,
                    marginBottom: 25,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ fontSize: '2rem', marginBottom: 20, letterSpacing: 2 }}>
                        {formData.cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: 3 }}>CARDHOLDER</div>
                          <div style={{ fontWeight: 600 }}>{formData.cardName || 'YOUR NAME'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: 3 }}>EXPIRES</div>
                          <div style={{ fontWeight: 600 }}>{formData.expiryDate || 'MM/YY'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Input label="Card Number" field="cardNumber" placeholder="1234 5678 9012 3456" error={errors.cardNumber} />
                  <Input label="Cardholder Name" field="cardName" placeholder="JOHN DOE" error={errors.cardName} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                    <Input label="Expiry Date" field="expiryDate" placeholder="MM/YY" error={errors.expiryDate} />
                    <Input label="CVV" field="cvv" placeholder="123" error={errors.cvv} />
                  </div>

                  <div style={{
                    padding: 20,
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: 12,
                    marginTop: 25,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <span style={{ color: '#888', fontSize: '0.95rem' }}>Total Amount</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#667eea' }}>$599.96</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', gap: 15, marginTop: 30 }}>
            {step > 1 && (
              <motion.button
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.98 }}
                onClick={prevStep}
              >
                ← Back
              </motion.button>
            )}
            <motion.button
              style={{
                flex: step === 1 ? 1 : 2,
                padding: '16px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={step === totalSteps ? handlePayment : nextStep}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : step === totalSteps ? 'Pay $599.96 →' : 'Continue →'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
