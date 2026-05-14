'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function PaginationDemo() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [jumpInput, setJumpInput] = React.useState('');
  const totalPages = 10;
  const itemsPerPage = 5;
  const totalItems = 48;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        // Near start: [1] 2 3 4 5 ... 10
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near end: 1 ... 6 7 8 9 [10]
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        // Middle: 1 ... 4 [5] 6 ... 10
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleJump = () => {
    const page = parseInt(jumpInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setJumpInput('');
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container" style={{ position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '10%', left: '25%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '50%', right: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      <h2 className="demo-title">Pagination</h2>
      <p className="demo-subtitle">
        Smart pagination with page numbers, navigation buttons, ellipsis for large page counts, and jump-to-page functionality.
      </p>

      {/* Pagination */}
      <motion.div
        className="pagination"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Previous Button */}
        <motion.button
          className="pagination-btn"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          whileHover={{ scale: currentPage !== 1 ? 1.1 : 1 }}
          whileTap={{ scale: currentPage !== 1 ? 0.9 : 1 }}
        >
          ‹
        </motion.button>

        {/* Page Numbers */}
        <AnimatePresence mode="popLayout">
          {getPageNumbers().map((page, index) =>
            page === 'ellipsis' ? (
              <motion.div
                key={`ellipsis-${index}`}
                className="pagination-ellipsis"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                ...
              </motion.div>
            ) : (
              <motion.button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {page}
              </motion.button>
            )
          )}
        </AnimatePresence>

        {/* Next Button */}
        <motion.button
          className="pagination-btn"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          whileHover={{ scale: currentPage !== totalPages ? 1.1 : 1 }}
          whileTap={{ scale: currentPage !== totalPages ? 0.9 : 1 }}
        >
          ›
        </motion.button>

        {/* Jump to Page */}
        <div className="pagination-jump">
          <label>Go to:</label>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpInput}
            onChange={(e) => setJumpInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJump()}
            placeholder="page"
          />
          <motion.button
            onClick={handleJump}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go
          </motion.button>
        </div>
      </motion.div>

      {/* Info Display */}
      <motion.div
        className="pagination-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        key={currentPage}
      >
        Showing {startItem}-{endItem} of {totalItems} items (Page {currentPage} of {totalPages})
      </motion.div>

      {/* Demo Content */}
      <motion.div
        style={{
          width: '100%',
          maxWidth: 600,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 16,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {Array.from({ length: itemsPerPage }, (_, i) => {
          const itemIndex = (currentPage - 1) * itemsPerPage + i;
          return (
            <motion.div
              key={itemIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: 20,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(102, 126, 234, 0.5)',
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>
                Item #{itemIndex + 1}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                Content Title
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 8 }}>
                Sample content for demonstration purposes.
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
