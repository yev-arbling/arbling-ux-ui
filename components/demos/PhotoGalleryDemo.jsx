'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function PhotoGalleryDemo() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

  const images = [
    { id: 1, src: '🏔️', title: 'Mountains', category: 'nature', color: '#667eea' },
    { id: 2, src: '🌊', title: 'Ocean', category: 'nature', color: '#4facfe' },
    { id: 3, src: '🌸', title: 'Cherry Blossom', category: 'nature', color: '#f093fb' },
    { id: 4, src: '🏙️', title: 'City Skyline', category: 'urban', color: '#764ba2' },
    { id: 5, src: '🌅', title: 'Sunset', category: 'nature', color: '#fa709a' },
    { id: 6, src: '🌆', title: 'City Night', category: 'urban', color: '#43e97b' },
    { id: 7, src: '🌺', title: 'Tropical', category: 'nature', color: '#00f2fe' },
    { id: 8, src: '🏜️', title: 'Desert', category: 'nature', color: '#f093fb' },
    { id: 9, src: '🌉', title: 'Bridge', category: 'urban', color: '#667eea' },
  ];

  const categories = ['all', 'nature', 'urban'];
  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  return (
    <>
      <h2 className="demo-title">Photo Gallery</h2>
      <p className="demo-subtitle">Interactive gallery with filtering, lightbox view, and smooth transitions</p>
      <div className="demo-area">
        <motion.div
          style={{
            width: '100%',
            maxWidth: 800,
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 30, justifyContent: 'center' }}>
            {categories.map(cat => (
              <motion.button
                key={cat}
                style={{
                  padding: '10px 24px',
                  borderRadius: 25,
                  background: filter === cat ? `linear-gradient(135deg, #667eea, #764ba2)` : 'rgba(255,255,255,0.05)',
                  border: filter === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 15,
            }}
            layout
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    layout: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  style={{
                    aspectRatio: 1,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${image.color}22, ${image.color}11)`,
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={{ scale: 1.05, borderColor: `${image.color}60` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <motion.div
                    style={{ fontSize: '4rem', marginBottom: 10 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {image.src}
                  </motion.div>
                  <motion.div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: image.color,
                      textTransform: 'capitalize',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    {image.title}
                  </motion.div>
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontSize: '0.7rem',
                      padding: '4px 10px',
                      borderRadius: 10,
                      background: 'rgba(0,0,0,0.5)',
                      color: '#888',
                      textTransform: 'capitalize',
                    }}
                  >
                    {image.category}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: 40,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                style={{
                  maxWidth: 600,
                  width: '100%',
                  background: 'rgba(20, 20, 30, 0.9)',
                  borderRadius: 24,
                  border: `1px solid ${selectedImage.color}40`,
                  padding: 40,
                  textAlign: 'center',
                  position: 'relative',
                }}
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </motion.button>

                <motion.div
                  style={{ fontSize: '8rem', marginBottom: 20 }}
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {selectedImage.src}
                </motion.div>

                <motion.h3
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    marginBottom: 10,
                    background: `linear-gradient(135deg, ${selectedImage.color}, #fff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {selectedImage.title}
                </motion.h3>

                <motion.p
                  style={{ fontSize: '1.1rem', color: '#888', textTransform: 'capitalize' }}
                >
                  {selectedImage.category} Photography
                </motion.p>

                <motion.div
                  style={{
                    marginTop: 25,
                    display: 'flex',
                    gap: 15,
                    justifyContent: 'center',
                  }}
                >
                  {['Download', 'Share', 'Delete'].map((action, i) => (
                    <motion.button
                      key={action}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 20,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                      whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
