import React, { useState, useRef } from 'react';

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#05070a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Composer({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  const submit = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue('');
    if (ref.current) { ref.current.style.height = 'auto'; }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div style={{ padding: '16px 24px 20px', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, background: 'var(--bg-elevated)', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 8px 8px 16px', transition: 'border-color 0.15s' }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--lime-dim)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--line)'}>
          <textarea
            ref={ref}
            rows={1}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKey}
            disabled={isLoading}
            placeholder="Refine this trip, or start a new one..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', color: 'var(--text)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.5, padding: '6px 0', maxHeight: 120, overflowY: 'auto' }}
          />
          <button onClick={submit} disabled={isLoading}
            style={{ background: isLoading ? 'var(--lime-dim)' : 'var(--lime)', color: '#05070a', border: 'none', borderRadius: 7, width: 34, height: 34, flexShrink: 0, cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
            <SendIcon/>
          </button>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: 'var(--text-mute)', textAlign: 'center', marginTop: 8 }}>
          LangGraph agents · Tavily MCP · AviationStack MCP · Groq Llama-3
        </div>
      </div>
    </div>
  );
}
