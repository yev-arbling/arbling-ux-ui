'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function SearchFilterDemo() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState([0, 1000]);

  const categories = ['Electronics', 'Clothing', 'Books', 'Home'];
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 199, category: 'Electronics', image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 299, category: 'Electronics', image: '⌚' },
    { id: 3, name: 'Running Shoes', price: 89, category: 'Clothing', image: '👟' },
    { id: 4, name: 'Coffee Maker', price: 149, category: 'Home', image: '☕' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ width: '100%', maxWidth: 700, background: 'rgba(20, 20, 35, 0.9)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: 40 }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 10 }}>Search & Filter</h2>
        <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: 30 }}>Advanced search with real-time filtering</p>

        <motion.div style={{ position: 'relative', marginBottom: 20 }}>
          <motion.input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            style={{ width: '100%', padding: '16px 50px 16px 20px', borderRadius: 16,
              background: 'rgba(15, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', fontSize: '1rem', outline: 'none' }}
            whileFocus={{ borderColor: '#667eea', boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)' }}
          />
          <motion.div style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem' }}>
            🔍
          </motion.div>
        </motion.div>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ width: '100%', padding: '14px 20px', borderRadius: 12,
            background: 'rgba(15, 15, 25, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff', fontSize: '0.9rem', fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
            marginBottom: isExpanded ? 20 : 0 }}
          whileHover={{ background: 'rgba(255,255,255,0.05)' }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>▼</motion.span>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ padding: 24, borderRadius: 16, background: 'rgba(15, 15, 25, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)', marginBottom: 20, overflow: 'hidden' }}
            >
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 12, fontWeight: 600 }}>Categories</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {categories.map(cat => (
                    <motion.button
                      key={cat}
                      onClick={() => {
                        setSelectedCategories(prev =>
                          prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                        );
                      }}
                      style={{ padding: '8px 16px', borderRadius: 20,
                        background: selectedCategories.includes(cat)
                          ? 'linear-gradient(135deg, #667eea, #764ba2)'
                          : 'rgba(255,255,255,0.05)',
                        border: selectedCategories.includes(cat) ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        color: '#fff', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: 12, fontWeight: 600 }}>
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  style={{ width: '100%', accentColor: '#667eea' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: 20, borderRadius: 16, background: 'rgba(15, 15, 25, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}
                whileHover={{ scale: 1.03 }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>{product.image}</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 6 }}>{product.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>{product.category}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#667eea' }}>${product.price}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
