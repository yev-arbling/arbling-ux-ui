'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function ReviewCardDemo() {
  const [reviews, setReviews] = React.useState([
    {
      id: 1, user: 'Sarah Johnson', avatar: '👩', rating: 5, date: '2 days ago',
      title: 'Absolutely love it!',
      content: 'This product exceeded all my expectations. The quality is outstanding and it arrived quickly.',
      helpful: 42, notHelpful: 3, verified: true, images: ['📸', '📸'],
    },
    {
      id: 2, user: 'Michael Chen', avatar: '👨', rating: 4, date: '1 week ago',
      title: 'Great value for money',
      content: 'Very satisfied with my purchase. The build quality is excellent.',
      helpful: 28, notHelpful: 5, verified: true, images: [],
    },
    {
      id: 3, user: 'Emily Davis', avatar: '👩‍🦰', rating: 5, date: '2 weeks ago',
      title: 'Best purchase ever!',
      content: 'I\'ve been using this for a month now and it\'s been amazing.',
      helpful: 35, notHelpful: 2, verified: true, images: ['📸'],
    },
  ]);

  const [filter, setFilter] = React.useState('all');
  const [showWriteReview, setShowWriteReview] = React.useState(false);
  const [newReview, setNewReview] = React.useState({ rating: 5, title: '', content: '' });

  const markHelpful = (id) => {
    setReviews(prev => prev.map(review => review.id === id ? { ...review, helpful: review.helpful + 1 } : review));
  };

  const submitReview = () => {
    if (newReview.title && newReview.content) {
      setReviews(prev => [{
        id: Date.now(), user: 'You', avatar: '😊', rating: newReview.rating,
        date: 'Just now', title: newReview.title, content: newReview.content,
        helpful: 0, notHelpful: 0, verified: true, images: [],
      }, ...prev]);
      setNewReview({ rating: 5, title: '', content: '' });
      setShowWriteReview(false);
    }
  };

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => reviews.filter(r => r.rating === star).length);

  const StarRating = ({ rating, onRate, interactive = false }) => {
    return (
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.button
            key={i}
            style={{
              background: 'none', border: 'none', fontSize: '1.2rem', cursor: interactive ? 'pointer' : 'default',
              color: i < rating ? '#ffc107' : 'rgba(255,255,255,0.2)', padding: 0,
            }}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={() => interactive && onRate(i + 1)}
          >
            ★
          </motion.button>
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === '5') return review.rating === 5;
    if (filter === 'verified') return review.verified;
    if (filter === 'withImages') return review.images.length > 0;
    return true;
  });

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 1100, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 30 }}
      >
        <div>
          <motion.div
            style={{
              padding: 30,
              background: 'rgba(20, 20, 35, 0.8)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 25,
            }}
          >
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 25 }}>Customer Reviews</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: 25, marginBottom: 30 }}>
              <div>
                <div style={{ fontSize: '4rem', fontWeight: 700, color: '#667eea', lineHeight: 1 }}>
                  {averageRating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(averageRating)} />
                <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 8 }}>
                  Based on {reviews.length} reviews
                </div>
              </div>

              <div style={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map((star, i) => (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: '0.85rem', color: '#888', width: 50 }}>{star} star</span>
                    <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                      <motion.div
                        style={{ height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(ratingDistribution[i] / reviews.length) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#888', width: 30, textAlign: 'right' }}>
                      {ratingDistribution[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              style={{
                width: '100%', padding: '16px', borderRadius: 12,
                background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none',
                color: '#fff', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowWriteReview(!showWriteReview)}
            >
              {showWriteReview ? 'Cancel' : 'Write a Review'}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {showWriteReview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  padding: 25, background: 'rgba(20, 20, 35, 0.8)', borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.08)', marginBottom: 25,
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20 }}>Share Your Thoughts</h3>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 10 }}>Your Rating</label>
                  <StarRating rating={newReview.rating} onRate={(r) => setNewReview(prev => ({ ...prev, rating: r }))} interactive />
                </div>

                <div style={{ marginBottom: 15 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>Review Title</label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Sum up your review"
                    style={{
                      width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff',
                      fontSize: '0.95rem', outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>Your Review</label>
                  <textarea
                    value={newReview.content}
                    onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Tell us about your experience"
                    rows={4}
                    style={{
                      width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff',
                      fontSize: '0.95rem', outline: 'none', resize: 'vertical',
                    }}
                  />
                </div>

                <motion.button
                  style={{
                    width: '100%', padding: '14px', borderRadius: 10,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none',
                    color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitReview}
                >
                  Submit Review
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <div style={{ display: 'flex', gap: 15, marginBottom: 25, flexWrap: 'wrap' }}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: '10px 16px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff',
                fontSize: '0.9rem', outline: 'none', cursor: 'pointer',
              }}
            >
              <option value="all">All Reviews</option>
              <option value="5">5 Stars</option>
              <option value="verified">Verified Purchases</option>
              <option value="withImages">With Images</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <AnimatePresence>
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    padding: 25, background: 'rgba(20, 20, 35, 0.8)', borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 45, height: 45, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                      }}>
                        {review.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 2 }}>
                          {review.user}
                          {review.verified && (
                            <span style={{
                              marginLeft: 8, padding: '2px 8px', background: 'rgba(34, 197, 94, 0.2)',
                              borderRadius: 4, fontSize: '0.7rem', color: '#22c55e', fontWeight: 500,
                            }}>✓ Verified</span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{review.date}</div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 10 }}>{review.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#bbb', lineHeight: 1.7, marginBottom: 15 }}>
                    {review.content}
                  </p>

                  {review.images.length > 0 && (
                    <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                      {review.images.map((img, i) => (
                        <motion.div
                          key={i}
                          style={{
                            width: 60, height: 60, borderRadius: 10, background: 'rgba(102, 126, 234, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.8rem', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)',
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {img}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 15, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.85rem', color: '#888' }}>Was this helpful?</span>
                    <motion.button
                      style={{
                        padding: '8px 16px', borderRadius: 8,
                        background: review.helpful > 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: review.helpful > 0 ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                        color: review.helpful > 0 ? '#22c55e' : '#fff', fontSize: '0.85rem', fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => markHelpful(review.id)}
                    >
                      👍 {review.helpful > 0 && `(${review.helpful})`}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
