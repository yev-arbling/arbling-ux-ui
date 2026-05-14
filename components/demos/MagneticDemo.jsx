'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function MagneticDemo() {
  const [activeStyle, setActiveStyle] = React.useState('primary');

  const MagneticButton = ({ children, gradient, shadowColor, style = 'filled' }) => {
    const ref = React.useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
    const textX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.05 });
    const textY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.05 });
    const glowOpacity = useMotionValue(0);
    const springGlow = useSpring(glowOpacity, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(y, [-20, 20], [10, -10]);
    const rotateY = useTransform(x, [-20, 20], [-10, 10]);

    const handleMouse = (e) => {
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
      glowOpacity.set(1);
    };
    const reset = () => { x.set(0); y.set(0); glowOpacity.set(0); };

    return (
      <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset}
        style={{ x: springX, y: springY, perspective: 500 }}>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          style={{ rotateX, rotateY, padding: style === 'outline' ? '18px 44px' : '20px 48px', fontSize: '1rem', fontWeight: 700, background: style === 'outline' ? 'transparent' : gradient, border: style === 'outline' ? `2px solid ${shadowColor}` : 'none', borderRadius: '16px', color: 'white', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: style === 'outline' ? 'none' : `0 15px 50px ${shadowColor}50` }}>
          <motion.div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${shadowColor}40 0%, transparent 70%)`, opacity: springGlow, pointerEvents: 'none' }} />
          <motion.span style={{ x: textX, y: textY, display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 2 }}>{children}</motion.span>
        </motion.button>
      </motion.div>
    );
  };

  const MagneticIcon = ({ icon, color, size = 60 }) => {
    const ref = React.useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15 });
    const springY = useSpring(y, { stiffness: 200, damping: 15 });
    const [isHovered, setIsHovered] = React.useState(false);
    const handleMouse = (e) => {
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.5);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.5);
    };
    const reset = () => { x.set(0); y.set(0); };
    return (
      <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { reset(); setIsHovered(false); }} onMouseEnter={() => setIsHovered(true)}
        style={{ x: springX, y: springY }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
        <motion.div style={{ width: size, height: size, borderRadius: '18px', background: isHovered ? `${color}30` : `${color}15`, border: `2px solid ${isHovered ? color : `${color}40`}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4, cursor: 'pointer', position: 'relative', transition: 'background 0.3s, border-color 0.3s' }}
          animate={{ boxShadow: isHovered ? `0 10px 40px ${color}40, 0 0 0 4px ${color}20` : `0 5px 20px ${color}20` }}>
          {isHovered && <motion.div style={{ position: 'absolute', inset: -2, borderRadius: '20px', background: `linear-gradient(135deg, ${color}40, transparent)` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />}
          <span style={{ position: 'relative', zIndex: 2 }}>{icon}</span>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Magnetic Button</h2>
        <p className="demo-subtitle">Awwwards-style magnetic effect with 3D rotation, spring physics, and glow trails</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'linear-gradient(145deg, rgba(15,15,25,0.95) 0%, rgba(10,10,20,0.95) 100%)', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.08)', padding: '40px', overflow: 'hidden' }}>

            {/* Style selector */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '36px' }}>
              {['primary', 'gradient', 'outline'].map(s => (
                <motion.button key={s} onClick={() => setActiveStyle(s)} whileHover={{ scale: 1.05 }}
                  style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: activeStyle === s ? 'rgba(102,126,234,0.2)' : 'rgba(255,255,255,0.05)', color: activeStyle === s ? '#667eea' : 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                  {s}
                </motion.button>
              ))}
            </div>

            {/* Main button showcase */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
              {activeStyle === 'primary' && (
                <MagneticButton gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" shadowColor="rgba(102,126,234,0.5)">
                  Get Started <span style={{ fontSize: '1.2rem' }}>→</span>
                </MagneticButton>
              )}
              {activeStyle === 'gradient' && (
                <MagneticButton gradient="linear-gradient(135deg, #f5576c 0%, #f093fb 50%, #4facfe 100%)" shadowColor="rgba(245,87,108,0.5)">
                  ✨ Explore Magic
                </MagneticButton>
              )}
              {activeStyle === 'outline' && (
                <MagneticButton gradient="transparent" shadowColor="#43e97b" style="outline">
                  Learn More
                </MagneticButton>
              )}
            </div>

            {/* Secondary buttons row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '36px' }}>
              <MagneticButton gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" shadowColor="rgba(67,233,123,0.5)">
                ✓ Accept
              </MagneticButton>
              <MagneticButton gradient="linear-gradient(135deg, #f5576c 0%, #f093fb 100%)" shadowColor="rgba(245,87,108,0.5)">
                ✕ Decline
              </MagneticButton>
            </div>

            {/* Icon buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <MagneticIcon icon="🎨" color="#f093fb" />
              <MagneticIcon icon="⚡" color="#fbbf24" />
              <MagneticIcon icon="🔥" color="#f5576c" />
              <MagneticIcon icon="💎" color="#4facfe" />
              <MagneticIcon icon="🚀" color="#43e97b" />
            </div>

            {/* Instructions */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
              Move your cursor over buttons to see the magnetic effect
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
