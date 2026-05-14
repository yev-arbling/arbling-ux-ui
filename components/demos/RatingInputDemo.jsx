'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function RatingInputDemo() {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 600, background: 'rgba(20, 20, 35, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 40 }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 10 }}>Rating Input</h2>
        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: 30 }}>Interactive star rating with hover effects</p>

        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 20,
            textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
            Rate Your Experience
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
            {stars.map((star) => (
              <motion.button
                key={star}
                onClick={() => setRating(star)}
                onHoverStart={() => setHoverRating(star)}
                onHoverEnd={() => setHoverRating(0)}
                style={{ width: 50, height: 50, borderRadius: 12,
                  background: star <= (hoverRating || rating)
                    ? 'linear-gradient(135deg, #ffd93d, #f5a623)'
                    : 'rgba(255,255,255,0.05)',
                  border: star <= (hoverRating || rating) ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', cursor: 'pointer' }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                {star <= (hoverRating || rating) ? '⭐' : '☆'}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {rating > 0 && (
              <motion.div
                key={rating}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 700,
                  background: 'linear-gradient(135deg, #ffd93d, #f5a623)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {rating}.0
                </div>
                <div style={{ fontSize: '0.9rem', color: '#888', marginTop: 10 }}>
                  {rating === 5 && 'Excellent! ⭐⭐⭐⭐⭐'}
                  {rating === 4 && 'Very Good ⭐⭐⭐⭐'}
                  {rating === 3 && 'Good ⭐⭐⭐'}
                  {rating === 2 && 'Fair ⭐⭐'}
                  {rating === 1 && 'Poor ⭐'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {rating > 0 && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden', marginTop: 20, marginBottom: 20 }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(rating / 5) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #ffd93d, #f5a623)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => { if (rating > 0) alert(`Thanks for rating ${rating} stars! 🎉`); }}
            disabled={rating === 0}
            style={{ padding: '14px 40px', borderRadius: 12,
              background: rating > 0 ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
              border: rating > 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
              color: rating > 0 ? '#fff' : '#666', fontSize: '0.95rem', fontWeight: 600,
              cursor: rating > 0 ? 'pointer' : 'not-allowed' }}
            whileHover={rating > 0 ? { scale: 1.05, boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)' } : {}}
            whileTap={rating > 0 ? { scale: 0.95 } : {}}
          >
            Submit Rating
          </motion.button>
        </div>

        {/* Rating Stats */}
        <div style={{ padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff' }}>4.7</div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>Average Rating</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem' }}>⭐⭐⭐⭐⭐</div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>128 reviews</div>
            </div>
          </div>

          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: '0.85rem', color: '#888', width: 40 }}>{star} ⭐</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : 5}%` }}
                  transition={{ delay: star * 0.1 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #ffd93d, #f5a623)', borderRadius: 3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
