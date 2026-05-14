'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function StackDemo() {
  const initialCards = [
    { id: 1, emoji: '🎨', title: 'Creative', subtitle: 'Design your vision', color: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', tags: ['Design', 'Art'] },
    { id: 2, emoji: '🚀', title: 'Launch', subtitle: 'Ship with confidence', color: '#f5576c', gradient: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)', tags: ['Startup', 'Growth'] },
    { id: 3, emoji: '💎', title: 'Premium', subtitle: 'Quality matters', color: '#4facfe', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', tags: ['Quality', 'Pro'] },
    { id: 4, emoji: '⚡', title: 'Fast', subtitle: 'Speed is everything', color: '#43e97b', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', tags: ['Speed', 'Perf'] },
    { id: 5, emoji: '🔥', title: 'Trending', subtitle: 'Stay ahead of the curve', color: '#fbbf24', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', tags: ['Hot', 'New'] },
  ];
  const [cards, setCards] = React.useState(initialCards);
  const [dragX, setDragX] = React.useState(0);
  const [liked, setLiked] = React.useState([]);
  const [passed, setPassed] = React.useState([]);

  const handleDragEnd = (info, index) => {
    const card = cards[index];
    if (info.offset.x > 100) {
      setLiked(prev => [...prev, card.id]);
      setCards(prev => prev.filter((_, i) => i !== index));
    } else if (info.offset.x < -100) {
      setPassed(prev => [...prev, card.id]);
      setCards(prev => prev.filter((_, i) => i !== index));
    }
    setDragX(0);
  };

  const resetCards = () => { setCards(initialCards); setLiked([]); setPassed([]); };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Card Stack</h2>
        <p className="demo-subtitle">Tinder-style swipe cards with like/pass actions, stacked depth, and momentum physics</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '10px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>✕</div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444' }}>{passed.length}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '10px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>♥</div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#22c55e' }}>{liked.length}</span>
            </div>
          </motion.div>

          {/* Card stack area */}
          <div style={{ position: 'relative', height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Swipe indicators */}
            <motion.div style={{ position: 'absolute', left: -30, top: '50%', transform: 'translateY(-50%)' }}
              animate={{ opacity: dragX < -30 ? Math.min(1, Math.abs(dragX) / 120) : 0, scale: dragX < -30 ? 1 + Math.abs(dragX) / 400 : 1 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.2)', border: '2px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '0 0 30px rgba(239,68,68,0.3)' }}>✕</div>
            </motion.div>
            <motion.div style={{ position: 'absolute', right: -30, top: '50%', transform: 'translateY(-50%)' }}
              animate={{ opacity: dragX > 30 ? Math.min(1, dragX / 120) : 0, scale: dragX > 30 ? 1 + dragX / 400 : 1 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,197,94,0.2)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}>♥</div>
            </motion.div>

            <AnimatePresence>
              {cards.map((card, i) => (
                <motion.div key={card.id}
                  style={{
                    position: 'absolute', width: '280px', height: '320px', borderRadius: '24px', padding: '24px',
                    background: 'linear-gradient(145deg, rgba(20,20,35,0.98) 0%, rgba(15,15,30,0.98) 100%)',
                    border: `1px solid ${i === 0 ? `${card.color}40` : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: i === 0 ? 'grab' : 'default', zIndex: cards.length - i,
                    boxShadow: i === 0 ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${card.color}20` : '0 10px 30px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                  }}
                  initial={{ scale: 1 - i * 0.06, y: i * -10 }}
                  animate={{ scale: 1 - i * 0.06, y: i * -10, rotate: i === 0 ? dragX * 0.08 : 0, x: i === 0 ? dragX * 0.1 : 0 }}
                  exit={{ x: dragX > 0 ? 350 : -350, opacity: 0, rotate: dragX > 0 ? 25 : -25, scale: 0.9, transition: { duration: 0.4, ease: 'easeOut' } }}
                  drag={i === 0 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  onDrag={(e, info) => i === 0 && setDragX(info.offset.x)}
                  onDragEnd={(e, info) => i === 0 && handleDragEnd(info, i)}
                  whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
                >
                  {/* Gradient accent */}
                  <motion.div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '140%', height: '100%', background: card.gradient, opacity: 0.15, filter: 'blur(60px)', pointerEvents: 'none' }} />

                  {/* Like/Pass overlay */}
                  {i === 0 && (
                    <>
                      <motion.div style={{ position: 'absolute', top: 20, left: 20, padding: '8px 16px', borderRadius: '8px', background: 'rgba(34,197,94,0.2)', border: '2px solid #22c55e', color: '#22c55e', fontWeight: 700, fontSize: '1rem', transform: 'rotate(-15deg)' }}
                        animate={{ opacity: dragX > 50 ? Math.min(1, dragX / 150) : 0 }}>
                        LIKE
                      </motion.div>
                      <motion.div style={{ position: 'absolute', top: 20, right: 20, padding: '8px 16px', borderRadius: '8px', background: 'rgba(239,68,68,0.2)', border: '2px solid #ef4444', color: '#ef4444', fontWeight: 700, fontSize: '1rem', transform: 'rotate(15deg)' }}
                        animate={{ opacity: dragX < -50 ? Math.min(1, Math.abs(dragX) / 150) : 0 }}>
                        NOPE
                      </motion.div>
                    </>
                  )}

                  {/* Card content */}
                  <motion.div style={{ width: 80, height: 80, borderRadius: '20px', background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '16px', boxShadow: `0 10px 30px ${card.color}40` }}
                    animate={{ rotate: i === 0 && Math.abs(dragX) > 20 ? [0, -5, 5, 0] : 0 }}
                    transition={{ duration: 0.3 }}>
                    {card.emoji}
                  </motion.div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{card.title}</div>
                  <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>{card.subtitle}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {card.tags.map(tag => (
                      <span key={tag} style={{ padding: '4px 12px', borderRadius: '20px', background: `${card.color}20`, color: card.color, fontSize: '0.75rem', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {cards.length === 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>All done!</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>Liked {liked.length} • Passed {passed.length}</div>
                <motion.button onClick={resetCards} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                  Start Over
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Action buttons */}
          {cards.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
              <motion.button onClick={() => { setPassed(prev => [...prev, cards[0].id]); setCards(prev => prev.slice(1)); }}
                whileHover={{ scale: 1.1, background: 'rgba(239,68,68,0.2)' }} whileTap={{ scale: 0.95 }}
                style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </motion.button>
              <motion.button onClick={resetCards}
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.95 }}
                style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ↻
              </motion.button>
              <motion.button onClick={() => { setLiked(prev => [...prev, cards[0].id]); setCards(prev => prev.slice(1)); }}
                whileHover={{ scale: 1.1, background: 'rgba(34,197,94,0.2)' }} whileTap={{ scale: 0.95 }}
                style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ♥
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
