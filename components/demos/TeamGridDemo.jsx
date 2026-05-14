'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TeamGridDemo() {
  const [hoveredMember, setHoveredMember] = React.useState(null);
  const [flippedCards, setFlippedCards] = React.useState({});

  const team = [
    {
      name: 'Alex Chen', role: 'CEO & Founder', initials: 'AC',
      color: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      bio: 'Former Google engineer turned entrepreneur. 10+ years building products used by millions.',
      location: 'San Francisco', education: 'Stanford CS',
      social: { x: '@alexchen', linkedin: 'alexchen' },
      skills: ['Leadership', 'Strategy', 'Product Vision'],
      experience: '12 years',
      availability: 'online'
    },
    {
      name: 'Sarah Kim', role: 'CTO', initials: 'SK',
      color: '#f5576c', gradient: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
      bio: 'MIT PhD in distributed systems. Scaled infrastructure at Meta to serve billions.',
      location: 'New York', education: 'MIT PhD',
      social: { x: '@sarahkim', github: 'sarahkim' },
      skills: ['System Design', 'Cloud', 'AI/ML'],
      experience: '10 years',
      availability: 'online'
    },
    {
      name: 'Mike Johnson', role: 'Head of Design', initials: 'MJ',
      color: '#43e97b', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      bio: 'Award-winning designer. Led design systems at Apple for iOS and macOS.',
      location: 'Los Angeles', education: 'RISD',
      social: { x: '@mikej', dribbble: 'mikej' },
      skills: ['UI/UX', 'Design Systems', 'Prototyping'],
      experience: '8 years',
      availability: 'busy'
    },
    {
      name: 'Emma Davis', role: 'VP Engineering', initials: 'ED',
      color: '#4facfe', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      bio: 'Engineering leader at 3 unicorns. Passionate about building inclusive teams.',
      location: 'Seattle', education: 'CMU',
      social: { x: '@emmad', linkedin: 'emmadavis' },
      skills: ['Team Building', 'Architecture', 'DevOps'],
      experience: '11 years',
      availability: 'online'
    },
    {
      name: 'James Wilson', role: 'Head of Sales', initials: 'JW',
      color: '#fa709a', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      bio: 'Closed $100M+ in enterprise deals. Built sales teams from 0 to 100.',
      location: 'Chicago', education: 'Wharton MBA',
      social: { x: '@jamesw', linkedin: 'jameswilson' },
      skills: ['Enterprise Sales', 'Negotiation', 'Growth'],
      experience: '9 years',
      availability: 'away'
    },
    {
      name: 'Lisa Park', role: 'Head of Product', initials: 'LP',
      color: '#fbbf24', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
      bio: 'Product at Stripe, then Notion. Shipped features used by Fortune 500.',
      location: 'Austin', education: 'Berkeley',
      social: { x: '@lisap', linkedin: 'lisapark' },
      skills: ['Product Strategy', 'User Research', 'Analytics'],
      experience: '7 years',
      availability: 'online'
    },
  ];

  const toggleFlip = (i) => {
    setFlippedCards(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const getAvailabilityColor = (status) => {
    switch(status) {
      case 'online': return '#43e97b';
      case 'busy': return '#fbbf24';
      case 'away': return '#f5576c';
      default: return '#888';
    }
  };

  return (
    <>
      <div className="demo-header">
        <h2 className="demo-title">Team Grid</h2>
        <p className="demo-subtitle">Interactive cards with 3D flip animations, rich profiles, and real-time status</p>
      </div>
      <div className="demo-area">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', maxWidth: '640px', margin: '0 auto', perspective: '1400px' }}>
          {team.map((member, i) => {
            const isHovered = hoveredMember === i;
            const isFlipped = flippedCards[i];
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40, rotateX: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 100, damping: 15 }}
                onHoverStart={() => setHoveredMember(i)}
                onHoverEnd={() => setHoveredMember(null)}
                onClick={() => toggleFlip(i)}
                style={{
                  height: '220px',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer',
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute', inset: 0,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    scale: isHovered && !isFlipped ? 1.03 : 1
                  }}
                  transition={{
                    rotateY: { duration: 0.7, type: 'spring', stiffness: 70, damping: 12 },
                    scale: { duration: 0.3 }
                  }}
                >
                  {/* Front Card */}
                  <motion.div
                    style={{
                      position: 'absolute', inset: 0,
                      background: isHovered
                        ? `linear-gradient(135deg, rgba(15,15,25,0.95) 0%, rgba(${parseInt(member.color.slice(1,3), 16)},${parseInt(member.color.slice(3,5), 16)},${parseInt(member.color.slice(5,7), 16)},0.15) 100%)`
                        : 'rgba(15,15,25,0.92)',
                      backdropFilter: 'blur(24px)',
                      borderRadius: '24px',
                      padding: '24px 20px',
                      border: `1.5px solid ${isHovered ? member.color : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isHovered
                        ? `0 24px 48px ${member.color}35, 0 0 0 1px ${member.color}20 inset`
                        : '0 12px 36px rgba(0,0,0,0.4)',
                      backfaceVisibility: 'hidden',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                    animate={{ y: isHovered && !isFlipped ? -6 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Animated Background Orbs */}
                    <motion.div
                      style={{
                        position: 'absolute', top: -30, right: -30,
                        width: 120, height: 120, borderRadius: '50%',
                        background: `radial-gradient(circle, ${member.color}25 0%, transparent 70%)`,
                        filter: 'blur(30px)',
                      }}
                      animate={{
                        scale: isHovered ? [1, 1.3, 1] : 1,
                        opacity: isHovered ? [0.3, 0.5, 0.3] : 0.2,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    <motion.div
                      style={{
                        position: 'absolute', bottom: -20, left: -20,
                        width: 100, height: 100, borderRadius: '50%',
                        background: `radial-gradient(circle, ${member.color}20 0%, transparent 70%)`,
                        filter: 'blur(25px)',
                      }}
                      animate={{
                        scale: isHovered ? [1, 1.2, 1] : 1,
                        opacity: isHovered ? [0.2, 0.4, 0.2] : 0.15,
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Avatar */}
                    <motion.div
                      style={{
                        width: 72, height: 72, borderRadius: '20px',
                        background: member.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.3rem', fontWeight: 800, color: '#fff',
                        boxShadow: isHovered
                          ? `0 12px 32px ${member.color}60, 0 0 0 3px ${member.color}30`
                          : `0 10px 28px ${member.color}50`,
                        marginBottom: '16px', position: 'relative',
                      }}
                      animate={{
                        scale: isHovered ? 1.12 : 1,
                        rotate: isHovered ? [0, -4, 4, 0] : 0
                      }}
                      transition={{
                        scale: { type: 'spring', stiffness: 300 },
                        rotate: { duration: 0.5 }
                      }}
                    >
                      {member.initials}

                      {/* Availability Indicator */}
                      <motion.div
                        style={{
                          position: 'absolute', bottom: -3, right: -3,
                          width: 18, height: 18, borderRadius: '50%',
                          background: getAvailabilityColor(member.availability),
                          border: '3px solid rgba(15,15,25,0.95)',
                          boxShadow: `0 0 12px ${getAvailabilityColor(member.availability)}80`,
                        }}
                        animate={{
                          scale: member.availability === 'online' ? [1, 1.15, 1] : 1,
                          boxShadow: member.availability === 'online'
                            ? [`0 0 12px ${getAvailabilityColor(member.availability)}80`, `0 0 20px ${getAvailabilityColor(member.availability)}`, `0 0 12px ${getAvailabilityColor(member.availability)}80`]
                            : `0 0 12px ${getAvailabilityColor(member.availability)}60`
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />

                      {/* Shine Effect */}
                      <motion.div
                        style={{
                          position: 'absolute', inset: 0, borderRadius: '20px',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                          opacity: 0,
                        }}
                        animate={{ opacity: isHovered ? 0.2 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    {/* Member Info */}
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <motion.div
                        style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem', marginBottom: '6px', letterSpacing: '-0.01em' }}
                        animate={{ scale: isHovered ? 1.02 : 1 }}
                      >
                        {member.name}
                      </motion.div>
                      <motion.div style={{
                        fontSize: '0.72rem', color: member.color, fontWeight: 600,
                        background: `${member.color}18`, padding: '5px 12px', borderRadius: '8px',
                        border: `1px solid ${member.color}30`,
                        display: 'inline-block',
                      }}
                      animate={{
                        boxShadow: isHovered ? `0 0 20px ${member.color}30` : '0 0 0px transparent'
                      }}
                      >
                        {member.role}
                      </motion.div>
                    </div>

                    {/* Experience Badge */}
                    <motion.div
                      style={{
                        marginTop: '12px',
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.6)',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      animate={{
                        background: isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                        borderColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      {member.experience} experience
                    </motion.div>

                    {/* Flip Hint */}
                    <motion.div
                      style={{
                        position: 'absolute', bottom: '14px',
                        fontSize: '0.62rem', color: '#666', fontWeight: 500,
                        display: 'flex', alignItems: 'center', gap: '4px',
                      }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 4,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>Click to view details</span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  {/* Back Card */}
                  <motion.div
                    style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(135deg, rgba(15,15,25,0.98) 0%, rgba(${parseInt(member.color.slice(1,3), 16)},${parseInt(member.color.slice(3,5), 16)},${parseInt(member.color.slice(5,7), 16)},0.12) 100%)`,
                      backdropFilter: 'blur(24px)',
                      borderRadius: '24px',
                      padding: '18px',
                      border: `1.5px solid ${member.color}50`,
                      boxShadow: `0 24px 48px ${member.color}25, 0 0 0 1px ${member.color}15 inset`,
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      display: 'flex', flexDirection: 'column',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '12px',
                        background: member.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                        boxShadow: `0 6px 16px ${member.color}50`,
                      }}>
                        {member.initials}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginBottom: '2px' }}>{member.name}</div>
                        <div style={{ fontSize: '0.62rem', color: '#999', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{member.location}</span>
                          <span style={{ opacity: 0.5 }}>•</span>
                          <span>{member.education}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p style={{
                      fontSize: '0.72rem',
                      color: 'rgba(255,255,255,0.75)',
                      lineHeight: 1.55,
                      margin: '0 0 12px',
                      flex: 1,
                    }}>
                      {member.bio}
                    </p>

                    {/* Skills Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                      {member.skills.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + (idx * 0.05) }}
                          whileHover={{ scale: 1.08, y: -1 }}
                          style={{
                            fontSize: '0.6rem',
                            fontWeight: 600,
                            color: member.color,
                            background: `${member.color}12`,
                            border: `1px solid ${member.color}25`,
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '7px' }}>
                      {Object.entries(member.social).map(([platform, handle]) => (
                        <motion.div
                          key={platform}
                          whileHover={{ scale: 1.08, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            flex: 1, padding: '9px 8px', borderRadius: '10px',
                            background: `${member.color}15`,
                            border: `1px solid ${member.color}35`,
                            textAlign: 'center',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {/* Hover Glow */}
                          <motion.div
                            style={{
                              position: 'absolute', inset: 0,
                              background: `${member.color}10`,
                              opacity: 0,
                            }}
                            whileHover={{ opacity: 1 }}
                          />

                          <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              color: member.color,
                              textTransform: 'capitalize',
                              marginBottom: '2px',
                            }}>
                              {platform}
                            </div>
                            <div style={{ fontSize: '0.58rem', color: '#aaa', fontWeight: 500 }}>
                              {handle.replace('@', '')}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
