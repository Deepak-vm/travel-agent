import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const CHIPS = [
  'Swap Day 2 afternoon for a modern art museum',
  'Find cheaper hotels near city center',
  'Add vegetarian restaurant options',
  'Include more budget breakdown',
];

export default function RefinementDrawer({ isOpen, onClose, onRefine, isProcessing }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { from: 'ai', text: 'Ask me to swap activities, adjust budget, or refine any part of your trip.' }
  ]);

  const send = async (msg) => {
    if (!msg.trim() || isProcessing) return;
    setInput('');
    setHistory(h => [...h, { from: 'user', text: msg }]);
    const res = await onRefine(msg);
    setHistory(h => [...h, { from: 'ai', text: res?.aiReply || 'Itinerary updated.' }]);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', justifyContent: 'flex-end', background: 'rgba(5,7,10,0.7)', backdropFilter: 'blur(4px)' }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--bg)', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Header */}
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="font-display" style={{ fontWeight: 600, fontSize: 14 }}>Refine itinerary</div>
            <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)', marginTop: 2 }}>LangGraph agent re-synthesis</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={18}/></button>
        </div>

        {/* Chat history */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {history.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className="font-mono" style={{
                fontSize: 12, maxWidth: '80%', padding: '10px 14px', borderRadius: 6, lineHeight: 1.6,
                background: m.from === 'user' ? 'var(--lime)' : 'var(--bg-elevated)',
                color: m.from === 'user' ? '#05070a' : 'var(--text-dim)',
                border: m.from === 'user' ? 'none' : '1px solid var(--line)',
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="font-mono" style={{ fontSize: 11, color: 'var(--lime)', letterSpacing: '0.1em' }}>···</div>
          )}
        </div>

        {/* Quick chips */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CHIPS.map((c, i) => (
            <button key={i} onClick={() => send(c)} className="font-mono"
              style={{ fontSize: 10, color: 'var(--text-mute)', border: '1px solid var(--line)', background: 'transparent', padding: '4px 10px', borderRadius: 20, cursor: 'pointer' }}>
              {c}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', display: 'flex', gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Swap, adjust, or refine..."
            className="font-mono"
            style={{ flex: 1, background: 'var(--bg-elevated)', border: '1px solid var(--line)', borderRadius: 6, padding: '10px 14px', fontSize: 12, color: 'var(--text)', outline: 'none' }}
          />
          <button onClick={() => send(input)} disabled={isProcessing}
            style={{ background: 'var(--lime)', border: 'none', color: '#05070a', borderRadius: 6, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Send size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}
