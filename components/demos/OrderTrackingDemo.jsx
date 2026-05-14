'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function OrderTrackingDemo() {
  const [orderStatus, setOrderStatus] = React.useState('shipped');
  const [expandedStep, setExpandedStep] = React.useState(2);

  const steps = [
    { id: 1, status: 'confirmed', title: 'Order Confirmed', description: 'Your order has been received', time: 'Jan 15, 10:30 AM', icon: '✓', completed: true },
    { id: 2, status: 'processing', title: 'Processing', description: 'Preparing your items for shipment', time: 'Jan 15, 2:45 PM', icon: '⚙️', completed: true },
    { id: 3, status: 'shipped', title: 'Shipped', description: 'Your package is on its way', time: 'Jan 16, 9:15 AM', icon: '📦', completed: true },
    { id: 4, status: 'outForDelivery', title: 'Out for Delivery', description: 'Package will arrive today', time: 'Jan 17, 8:00 AM', icon: '🚚', completed: false },
    { id: 5, status: 'delivered', title: 'Delivered', description: 'Package delivered successfully', time: 'Estimated by 8 PM', icon: '🎁', completed: false },
  ];

  const deliveryProgress = 60;

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 30 }}
      >
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 8 }}>Order Tracking</h2>
          <p style={{ color: '#888', marginBottom: 30 }}>Order #ORD-2024-78542</p>

          <div style={{ marginBottom: 35 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.85rem' }}>
              <span style={{ color: '#888' }}>Delivery Progress</span>
              <span style={{ color: '#667eea', fontWeight: 600 }}>{deliveryProgress}%</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)' }}
                initial={{ width: 0 }}
                animate={{ width: `${deliveryProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: 24,
              top: 30,
              bottom: 30,
              width: 2,
              background: 'rgba(255,255,255,0.1)',
            }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(180deg, #667eea, #764ba2)' }}
                initial={{ height: 0 }}
                animate={{ height: `${(deliveryProgress / 100) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            {steps.map((step, index) => {
              const isExpanded = expandedStep === step.id;
              const isActive = step.completed || (index === steps.findIndex(s => s.status === orderStatus));

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ marginBottom: 25 }}
                >
                  <div style={{ display: 'flex', gap: 20 }}>
                    <motion.div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: isActive ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                        border: isActive ? '2px solid #667eea' : '2px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        flexShrink: 0,
                        cursor: 'pointer',
                        zIndex: 1,
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    >
                      {step.icon}
                    </motion.div>

                    <div style={{ flex: 1, paddingBottom: index === steps.length - 1 ? 0 : 25 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: isActive ? '#fff' : '#888' }}>
                          {step.title}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{step.time}</span>
                      </div>

                      <AnimatePresence>
                        {(isExpanded || isActive) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.6 }}
                          >
                            {step.description}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              padding: 25,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 20,
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>

            {[
              { name: 'Wireless Headphones', quantity: 2, price: 299.99 },
              { name: 'Smart Watch Pro', quantity: 1, price: 499.99 },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15, paddingBottom: 15, borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 3 }}>{item.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#667eea' }}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}

            <div style={{ paddingTop: 15, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ color: '#667eea' }}>$1,099.97</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              padding: 25,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 20,
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 15 }}>Shipping Address</h3>
            <div style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.8 }}>
              John Doe<br />
              123 Main Street, Apt 4B<br />
              New York, NY 10001<br />
              United States
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              padding: 25,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 15 }}>Live Tracking</h3>

            <div style={{
              height: 200,
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: 12,
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}>
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <motion.path
                  d="M 50 150 Q 100 100 150 80 T 250 50"
                  stroke="url(#mapGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.7 }}
                />
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                style={{
                  position: 'absolute',
                  left: 45,
                  top: 145,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#667eea',
                  border: '2px solid #fff',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.div
                style={{
                  position: 'absolute',
                  fontSize: '1.5rem',
                }}
                initial={{ left: 50, top: 130 }}
                animate={{ left: 150, top: 65 }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              >
                🚚
              </motion.div>

              <motion.div
                style={{
                  position: 'absolute',
                  right: 40,
                  top: 45,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '2px solid #fff',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#667eea' }} />
                <span style={{ color: '#888' }}>Origin</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ color: '#888' }}>Destination</span>
              </div>
            </div>
          </motion.div>

          <motion.button
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 20,
            }}
            whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Support
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
