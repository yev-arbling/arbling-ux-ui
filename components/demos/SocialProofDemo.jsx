'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function SocialProofDemo() {
  const [hoveredStat, setHoveredStat] = React.useState(null);
  const [stats, setStats] = React.useState([
    { key: 'users', value: 0, target: 2400000, suffix: '', label: 'Active Users', sublabel: '+12K this week', color: '#667eea', icon: '👥' },
    { key: 'companies', value: 0, target: 50000, suffix: '', label: 'Companies', sublabel: 'Fortune 500 included', color: '#43e97b', icon: '🏢' },
    { key: 'countries', value: 0, target: 190, suffix: '', label: 'Countries', sublabel: 'Global coverage', color: '#f5576c', icon: '🌍' },
    { key: 'uptime', value: 0, target: 99.99, suffix: '%', label: 'Uptime SLA', sublabel: 'Enterprise grade', color: '#4facfe', icon: '⚡' },
  ]);

  const logos = [
    { name: 'Stripe', letters: 'STRIPE', color: '#635bff' },
    { name: 'Vercel', letters: '▲ VERCEL', color: '#fff' },
    { name: 'Linear', letters: 'LINEAR', color: '#5e6ad2' },
    { name: 'Notion', letters: 'NOTION', color: '#fff' },
    { name: 'Figma', letters: 'FIGMA', color: '#f24e1e' },
    { name: 'Slack', letters: 'SLACK', color: '#4a154b' },
    { name: 'Discord', letters: 'DISCORD', color: '#5865f2' },
    { name: 'Spotify', letters: 'SPOTIFY', color: '#1db954' },
  ];

  const certifications = [
    { name: 'SOC 2 Type II', icon: '🛡️', desc: 'Certified Secure', color: '#667eea' },
    { name: 'GDPR', icon: '🇪🇺', desc: 'EU Compliant', color: '#43e97b' },
    { name: 'HIPAA', icon: '🏥', desc: 'Healthcare Ready', color: '#f5576c' },
    { name: 'ISO 27001', icon: '📋', desc: 'Info Security', color: '#4facfe' },
  ];

  const reviews = [
    { source: 'G2 Crowd', rating: '4.9', reviews: '2,847', color: '#ff492c' },
    { source: 'Capterra', rating: '4.8', reviews: '1,923', color: '#ff9d28' },
    { source: 'TrustPilot', rating: '4.9', reviews: '5,412', color: '#00b67a' },
  ];

  React.useEffect(() => {
    stats.forEach((stat, idx) => {
      const duration = 2500;
      const steps = 60;
      const increment = stat.target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(interval);
        }
        setStats(prev => prev.map((s, i) => i === idx ? { ...s, value: current } : s));
      }, duration / steps);
    });
  }, []);

  const formatNumber = (num, stat) => {
    if (stat.suffix === '%') return num.toFixed(2);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return Math.floor(num).toString();
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Social Proof</h2>
        <p className="demo-subtitle">Enterprise trust section with logo marquee, live stats, certifications, and reviews</p>
      </div>
      <div className="demo-area">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            <div style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '2px', marginBottom: '16px' }}>
              TRUSTED BY 50,000+ COMPANIES WORLDWIDE
            </div>

            <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)', marginBottom: '24px' }}>
              <motion.div
                style={{ display: 'flex', gap: '40px', width: 'max-content' }}
                animate={{ x: [0, -640] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {[...logos, ...logos].map((logo, i) => (
                  <motion.div
                    key={`${logo.name}-${i}`}
                    style={{
                      fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1px',
                      color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap',
                    }}
                    whileHover={{ color: logo.color, scale: 1.1 }}
                  >
                    {logo.letters}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px',
              marginBottom: '20px',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                onHoverStart={() => setHoveredStat(i)}
                onHoverEnd={() => setHoveredStat(null)}
                style={{
                  background: 'rgba(15,15,25,0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  textAlign: 'center',
                  border: `1px solid ${hoveredStat === i ? stat.color : 'rgba(255,255,255,0.08)'}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ y: -3, boxShadow: `0 15px 30px ${stat.color}20` }}
              >
                <motion.div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredStat === i ? 1 : 0 }}
                />
                <div style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{stat.icon}</div>
                <motion.div
                  style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color, marginBottom: '2px' }}
                  animate={{ scale: hoveredStat === i ? 1.05 : 1 }}
                >
                  {formatNumber(stat.value, stat)}{stat.suffix}
                </motion.div>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '4px' }}>{stat.label}</div>
                <motion.div
                  style={{ fontSize: '0.6rem', color: '#555' }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: hoveredStat === i ? 1 : 0, height: hoveredStat === i ? 'auto' : 0 }}
                >
                  {stat.sublabel}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px',
              marginBottom: '20px',
            }}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.03, borderColor: cert.color }}
                style={{
                  background: `${cert.color}10`,
                  border: `1px solid ${cert.color}30`,
                  borderRadius: '12px',
                  padding: '12px 8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{cert.icon}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: cert.color, marginBottom: '2px' }}>{cert.name}</div>
                <div style={{ fontSize: '0.55rem', color: '#666' }}>{cert.desc}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              display: 'flex', justifyContent: 'center', gap: '16px',
              padding: '16px',
              background: 'rgba(15,15,25,0.6)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {reviews.map((review, i) => (
              <motion.div
                key={review.source}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{ textAlign: 'center', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', marginBottom: '4px' }}>
                  <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>★</span>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>{review.rating}</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#888' }}>{review.reviews} reviews</div>
                <div style={{ fontSize: '0.6rem', color: review.color, fontWeight: 600, marginTop: '2px' }}>{review.source}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
