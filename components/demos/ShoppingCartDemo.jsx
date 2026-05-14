'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ShoppingCartDemo() {
  const [cartItems, setCartItems] = React.useState([
    { id: 1, name: 'Wireless Headphones', price: 299.99, quantity: 2, image: '🎧', color: '#667eea' },
    { id: 2, name: 'Smart Watch Pro', price: 499.99, quantity: 1, image: '⌚', color: '#764ba2' },
    { id: 3, name: 'USB-C Hub', price: 79.99, quantity: 3, image: '🔌', color: '#f093fb' },
  ]);

  const [promoCode, setPromoCode] = React.useState('');
  const [promoApplied, setPromoApplied] = React.useState(false);
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 30 }}
      >
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 25 }}>Shopping Cart ({cartItems.length} items)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    padding: 20,
                    background: 'rgba(20, 20, 35, 0.8)',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    gap: 20,
                    alignItems: 'center',
                  }}
                  whileHover={{ borderColor: 'rgba(102, 126, 234, 0.3)' }}
                >
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    background: item.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                  }}>
                    {item.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 5 }}>{item.name}</h3>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#667eea' }}>
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <motion.button
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </motion.button>
                    <span style={{ fontSize: '1rem', fontWeight: 600, minWidth: 30, textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <motion.button
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </motion.button>
                  </div>
                  <motion.button
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    whileHover={{ scale: 1.1, background: 'rgba(239, 68, 68, 0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.id)}
                  >
                    🗑️
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <motion.div
            style={{
              padding: 30,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'sticky',
              top: 20,
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 25 }}>Order Summary</h2>

            <div style={{ marginBottom: 25 }}>
              <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 10 }}>Promo Code</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Try 'SAVE20'"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
                <motion.button
                  style={{
                    padding: '12px 20px',
                    borderRadius: 10,
                    background: promoApplied ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: promoApplied ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                    color: promoApplied ? '#22c55e' : '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={applyPromo}
                  disabled={promoApplied}
                >
                  {promoApplied ? '✓ Applied' : 'Apply'}
                </motion.button>
              </div>
            </div>

            <div style={{ marginBottom: 25 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: '0.95rem' }}>
                <span style={{ color: '#888' }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: '0.95rem' }}
                >
                  <span style={{ color: '#22c55e' }}>Discount (20%)</span>
                  <span style={{ fontWeight: 600, color: '#22c55e' }}>-${discount.toFixed(2)}</span>
                </motion.div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: '0.95rem' }}>
                <span style={{ color: '#888' }}>Shipping</span>
                <span style={{ fontWeight: 600, color: shipping === 0 ? '#22c55e' : '#fff' }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: '0.95rem' }}>
                <span style={{ color: '#888' }}>Tax (8%)</span>
                <span style={{ fontWeight: 600 }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '15px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ color: '#667eea' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 500 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginBottom: 25, padding: 15, background: 'rgba(102, 126, 234, 0.1)', borderRadius: 10, border: '1px solid rgba(102, 126, 234, 0.2)' }}
              >
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>
                  Add ${(500 - subtotal).toFixed(2)} more for free shipping
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div
                    style={{ height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(subtotal / 500) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            <motion.button
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 12,
                background: isCheckingOut ? 'rgba(34, 197, 94, 0.2)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCheckingOut(!isCheckingOut)}
            >
              {isCheckingOut ? '✓ Order Placed!' : 'Checkout →'}
            </motion.button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, fontSize: '0.8rem', color: '#888' }}>
              <span>🔒</span>
              <span>Secure Checkout</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
