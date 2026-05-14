'use client';

import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Reorder } from 'framer-motion';

export default function TerminalDemo() {
      const [input, setInput] = React.useState('');
      const [history, setHistory] = React.useState([
        { command: null, output: '╔══════════════════════════════════════════════════════════╗\n║  Welcome to Terminal Pro v3.0                            ║\n║  Type "help" for available commands                      ║\n╚══════════════════════════════════════════════════════════╝', type: 'ascii' },
      ]);
      const [theme, setTheme] = React.useState('dracula');
      const [isTyping, setIsTyping] = React.useState(false);
      const [historyIndex, setHistoryIndex] = React.useState(-1);
      const [commandHistory, setCommandHistory] = React.useState([]);

      const themes = {
        dracula: { bg: 'linear-gradient(135deg, rgba(40, 42, 54, 0.98) 0%, rgba(30, 32, 44, 0.98) 100%)', text: '#f8f8f2', prompt: '#50fa7b', accent: '#bd93f9', error: '#ff5555', comment: '#6272a4' },
        tokyo: { bg: 'linear-gradient(135deg, rgba(26, 27, 38, 0.98) 0%, rgba(20, 21, 30, 0.98) 100%)', text: '#a9b1d6', prompt: '#9ece6a', accent: '#7aa2f7', error: '#f7768e', comment: '#565f89' },
        nord: { bg: 'linear-gradient(135deg, rgba(46, 52, 64, 0.98) 0%, rgba(36, 42, 54, 0.98) 100%)', text: '#eceff4', prompt: '#a3be8c', accent: '#88c0d0', error: '#bf616a', comment: '#4c566a' },
        monokai: { bg: 'linear-gradient(135deg, rgba(39, 40, 34, 0.98) 0%, rgba(29, 30, 24, 0.98) 100%)', text: '#f8f8f2', prompt: '#a6e22e', accent: '#66d9ef', error: '#f92672', comment: '#75715e' },
      };

      const commands = {
        help: () => `📚 Available commands:
  help     - Show this message
  clear    - Clear terminal
  echo     - Print text
  date     - Current date/time
  whoami   - Show current user
  ls       - List files
  pwd      - Print working directory
  neofetch - System info
  theme    - Change theme (${Object.keys(themes).join(', ')})`,
        clear: () => { setHistory([]); return ''; },
        echo: (args) => args.join(' ') || '',
        date: () => `📅 ${new Date().toLocaleString()}`,
        whoami: () => '👤 developer',
        ls: () => `📁 Documents/  📁 Downloads/  📁 Projects/  📁 .config/
📄 README.md   📄 .bashrc     📄 .gitconfig`,
        pwd: () => '📍 /home/developer',
        neofetch: () => `
╭─────────────────────────────────╮
│  developer@workstation          │
│  ─────────────────────────────  │
│  OS: Linux x86_64               │
│  Kernel: 6.1.0                  │
│  Shell: bash 5.2                │
│  Terminal: v3.0                 │
│  Memory: 16GB / 32GB            │
╰─────────────────────────────────╯`,
        theme: (args) => { if (themes[args[0]]) { setTheme(args[0]); return `🎨 Theme changed to: ${args[0]}`; } return `🎨 Available themes: ${Object.keys(themes).join(', ')}`; },
      };

      const executeCommand = (cmd) => {
        const [command, ...args] = cmd.trim().toLowerCase().split(' ');
        const output = commands[command] ? commands[command](args) : `❌ Command not found: ${command}\n   Type "help" for available commands`;
        return { command: cmd.trim(), output, type: commands[command] ? 'success' : 'error', timestamp: new Date().toLocaleTimeString() };
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setIsTyping(true);
        setCommandHistory(prev => [...prev, input]);
        setHistoryIndex(-1);
        const result = executeCommand(input);
        await new Promise(r => setTimeout(r, 150));
        if (result.output !== '') setHistory(prev => [...prev, result]);
        setInput('');
        setIsTyping(false);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[commandHistory.length - 1 - newIndex]);
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[commandHistory.length - 1 - newIndex]);
          } else {
            setHistoryIndex(-1);
            setInput('');
          }
        }
      };

      const currentTheme = themes[theme];

      return (
        <>
          <h2 className="demo-title">Terminal</h2>
          <p className="demo-subtitle">Interactive terminal with commands, history, and multiple color themes.</p>
          <div className="demo-area" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative' }}>
          {/* Ambient glow */}
          <div style={{ position: 'absolute', top: '20%', left: '30%', width: 400, height: 400, background: `radial-gradient(circle, ${currentTheme.accent}15 0%, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ width: '100%', maxWidth: 950, background: currentTheme.bg, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}>
            {/* Title bar */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 0, 0, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <motion.div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} whileHover={{ scale: 1.2 }} />
                  <motion.div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', cursor: 'pointer' }} whileHover={{ scale: 1.2 }} />
                  <motion.div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c940', cursor: 'pointer' }} whileHover={{ scale: 1.2 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1rem' }}>🖥️</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: currentTheme.text }}>Terminal Pro</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '0.8rem', color: currentTheme.comment, fontFamily: 'monospace' }}>developer@localhost:~</span>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentTheme.prompt, boxShadow: `0 0 10px ${currentTheme.prompt}` }} />
              </div>
            </div>

            {/* Terminal content */}
            <div style={{ padding: 25, minHeight: 420, maxHeight: 500, overflowY: 'auto', fontFamily: "'Fira Code', 'Consolas', monospace" }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {history.map((entry, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                    {entry.command && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                        <span style={{ color: currentTheme.prompt, fontWeight: 700, fontSize: '0.9rem' }}>❯</span>
                        <span style={{ color: currentTheme.text, fontSize: '0.9rem' }}>{entry.command}</span>
                        {entry.timestamp && <span style={{ marginLeft: 'auto', color: currentTheme.comment, fontSize: '0.75rem' }}>{entry.timestamp}</span>}
                      </div>
                    )}
                    {entry.output && (
                      <pre style={{ margin: 0, marginLeft: entry.command ? 22 : 0, color: entry.type === 'error' ? currentTheme.error : entry.type === 'ascii' ? currentTheme.accent : currentTheme.text, fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {entry.output}
                      </pre>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Input line */}
              <form onSubmit={handleSubmit} style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <motion.span style={{ color: currentTheme.prompt, fontWeight: 700, fontSize: '0.9rem' }}
                  animate={{ opacity: isTyping ? 0.5 : 1 }}>❯</motion.span>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: currentTheme.text, fontSize: '0.95rem', fontFamily: "'Fira Code', monospace", caretColor: currentTheme.prompt }}
                    placeholder="Type a command..." autoFocus />
                  {/* Blinking cursor */}
                  {!input && (
                    <motion.div style={{ position: 'absolute', left: 0, width: 10, height: '1.2em', background: currentTheme.prompt, borderRadius: 2 }}
                      animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  )}
                </div>
              </form>
            </div>

            {/* Status bar */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 0, 0, 0.2)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {Object.keys(themes).map((t) => (
                  <motion.button key={t} onClick={() => setTheme(t)}
                    style={{ padding: '8px 14px', borderRadius: 8, background: theme === t ? `${themes[t].accent}25` : 'rgba(255,255,255,0.03)', border: theme === t ? `1px solid ${themes[t].accent}50` : '1px solid rgba(255,255,255,0.06)', color: theme === t ? themes[t].accent : currentTheme.comment, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}
                    whileHover={{ scale: 1.05, background: `${themes[t].accent}15` }} whileTap={{ scale: 0.97 }}>
                    {t}
                  </motion.button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: '0.75rem', color: currentTheme.comment }}>
                <span>↑↓ history</span>
                <span>bash</span>
                <span>UTF-8</span>
              </div>
            </div>
          </motion.div>
        </div>
        </>
      );
    }
