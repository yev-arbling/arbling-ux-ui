'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function CodeSnippetDemo() {
      const [activeLanguage, setActiveLanguage] = React.useState('javascript');
      const [copied, setCopied] = React.useState(false);
      const [theme, setTheme] = React.useState('dark');

      const snippets = {
        javascript: { icon: '🟨', color: '#f7df1e', code: `import { motion } from 'framer-motion';

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello, World!
    </motion.div>
  );
};

export default MyComponent;` },
        typescript: { icon: '🔷', color: '#3178c6', code: `interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  return response.json();
};

export type { User };` },
        python: { icon: '🐍', color: '#3776ab', code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.get("/users")
async def get_users():
    return {"users": [], "total": 0}

@app.post("/users")
async def create_user(user: User):
    return {"id": 1, **user.dict()}` },
      };

      const langKeys = Object.keys(snippets);
      const currentSnippet = snippets[activeLanguage];
      const lines = currentSnippet.code.split('\n');

      const copyToClipboard = () => {
        navigator.clipboard.writeText(currentSnippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      const themes = {
        dark: { bg: 'rgba(15, 15, 25, 0.95)', gutter: 'rgba(255,255,255,0.03)', text: '#e5e7eb', lineNum: '#555' },
        light: { bg: 'rgba(250, 250, 252, 0.95)', gutter: 'rgba(0,0,0,0.03)', text: '#1f2937', lineNum: '#999' },
      };
      const currentTheme = themes[theme];

      return (
        <>
          <h2 className="demo-title">Code Snippet</h2>
          <p className="demo-subtitle">Multi-language code viewer with syntax highlighting, copy button, and themes.</p>
          <div className="demo-area" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative' }}>
          {/* Ambient glow */}
          <div style={{ position: 'absolute', top: '15%', right: '20%', width: 300, height: 300, background: `radial-gradient(circle, ${currentSnippet.color}15 0%, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ width: '100%', maxWidth: 950, background: currentTheme.bg, backdropFilter: 'blur(20px)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.4)' }}>
            {/* Header */}
            <div style={{ padding: '18px 25px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                {/* Window controls */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c940' }} />
                </div>
                <div style={{ fontSize: '0.85rem', color: '#888', fontWeight: 500 }}>code-snippet.{activeLanguage === 'typescript' ? 'ts' : activeLanguage === 'python' ? 'py' : 'jsx'}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Theme toggle */}
                <motion.button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                  style={{ padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                  whileHover={{ background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.97 }}>
                  {theme === 'dark' ? '🌙' : '☀️'} {theme}
                </motion.button>
                {/* Copy button */}
                <motion.button onClick={copyToClipboard}
                  style={{ padding: '10px 20px', borderRadius: 10, background: copied ? 'rgba(67, 233, 123, 0.2)' : `${currentSnippet.color}20`, border: copied ? '1px solid rgba(67, 233, 123, 0.4)' : `1px solid ${currentSnippet.color}40`, color: copied ? '#43e97b' : currentSnippet.color, fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                  whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${copied ? 'rgba(67, 233, 123, 0.2)' : currentSnippet.color + '30'}` }} whileTap={{ scale: 0.97 }}>
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </motion.button>
              </div>
            </div>

            {/* Language tabs */}
            <div style={{ display: 'flex', gap: 4, padding: '12px 20px', background: 'rgba(0, 0, 0, 0.15)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {langKeys.map((lang) => {
                const langData = snippets[lang];
                return (
                  <motion.button key={lang} onClick={() => setActiveLanguage(lang)}
                    style={{ padding: '10px 18px', borderRadius: 10, background: activeLanguage === lang ? `${langData.color}15` : 'transparent', border: activeLanguage === lang ? `1px solid ${langData.color}40` : '1px solid transparent', color: activeLanguage === lang ? langData.color : '#888', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 8 }}
                    whileHover={{ background: `${langData.color}10` }} whileTap={{ scale: 0.97 }}>
                    <span style={{ fontSize: '1rem' }}>{langData.icon}</span>
                    {lang}
                  </motion.button>
                );
              })}
            </div>

            {/* Code area with line numbers */}
            <div style={{ display: 'flex', maxHeight: 450, overflow: 'auto' }}>
              {/* Line numbers */}
              <div style={{ padding: '20px 0', background: currentTheme.gutter, borderRight: '1px solid rgba(255,255,255,0.04)', userSelect: 'none', minWidth: 55, textAlign: 'right' }}>
                {lines.map((_, i) => (
                  <div key={i} style={{ padding: '0 15px', fontSize: '0.85rem', fontFamily: "'Fira Code', monospace", color: currentTheme.lineNum, lineHeight: 1.8 }}>
                    {i + 1}
                  </div>
                ))}
              </div>
              {/* Code */}
              <div style={{ flex: 1, padding: 20, overflow: 'auto' }}>
                <AnimatePresence mode="wait">
                  <motion.pre key={activeLanguage} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                    style={{ margin: 0, fontFamily: "'Fira Code', monospace", fontSize: '0.9rem', lineHeight: 1.8, color: currentTheme.text }}>
                    <code>{currentSnippet.code}</code>
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>

            {/* Footer stats */}
            <div style={{ padding: '12px 25px', borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 20, fontSize: '0.75rem', color: '#888' }}>
                <span>{lines.length} lines</span>
                <span>{currentSnippet.code.length} characters</span>
                <span>UTF-8</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentSnippet.color }} />
                <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'capitalize' }}>{activeLanguage}</span>
              </div>
            </div>
          </motion.div>
        </div>
        </>
      );
    }
