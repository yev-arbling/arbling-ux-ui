'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TypingCursorDemo() {
  const [text, setText] = React.useState('');
  const fullText = 'Hello, I am an AI assistant. How can I help you today?';
  const [isTyping, setIsTyping] = React.useState(true);

  React.useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 50 + Math.random() * 50);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [text]);

  const restart = () => {
    setText('');
    setIsTyping(true);
  };

  return (
    <>
      <h2 className="demo-title">Typing Animation</h2>
      <p className="demo-subtitle">AI chat-style typing effect with blinking cursor.</p>
      <div className="demo-area">
        <div style={{
          width: 450,
          padding: 24,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.1)',
          minHeight: 80
        }}>
          <span style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            {text}
            <motion.span
              style={{
                display: 'inline-block',
                width: 2,
                height: '1.2em',
                background: '#667eea',
                marginLeft: 2,
                verticalAlign: 'text-bottom'
              }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </span>
        </div>
        <button className="replay-btn" style={{ marginTop: 20 }} onClick={restart}>
          Restart
        </button>
      </div>
    </>
  );
}
