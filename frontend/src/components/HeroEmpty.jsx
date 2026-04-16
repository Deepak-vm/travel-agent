import React, { useState } from 'react';

const CHIPS = [
  { label: 'Tokyo · 4d · $1500', prompt: 'Plan a 4-day trip to Tokyo with a budget of $1500 focusing on ramen and tech spots' },
  { label: 'Kyoto · 3d · $1000', prompt: 'Plan a 3-day trip to Kyoto with a budget of $1000 focusing on temples and matcha' },
  { label: 'Paris · Weekend', prompt: 'Plan a 3-day romantic weekend trip to Paris with a budget of $1350' },
  { label: 'Iceland · 5d · Adventure', prompt: 'Plan a 5-day Iceland adventure roadtrip with a budget of $2000' },
];

export default function HeroEmpty({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const submit = (q) => {
    if (!q.trim() || isLoading) return;
    onSearch(q.trim());
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated route SVG */}
      <svg viewBox="0 0 900 260" preserveAspectRatio="none"
        style={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: 900, height: 220, pointerEvents: 'none', opacity: 0.5 }}>
        <style>{`
          .rp{fill:none;stroke:#7a9e00;stroke-width:1;stroke-dasharray:900;stroke-dashoffset:900;animation:draw 2.4s ease-out 0.2s forwards;}
          .rd{fill:#c6ff00;opacity:0;animation:appear 0.4s ease-out 2.4s forwards,pdot 2.2s ease-in-out 2.6s infinite;}
          @keyframes draw{to{stroke-dashoffset:0}}
          @keyframes appear{to{opacity:1}}
          @keyframes pdot{0%,100%{r:3;opacity:1}50%{r:5.5;opacity:0.5}}
        `}</style>
        <path className="rp" d="M20,220 C 220,220 260,40 460,40 C 660,40 700,180 880,60"/>
        <circle className="rd" cx="880" cy="60" r="4"/>
      </svg>

      {/* Content */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 680, padding: '0 32px', textAlign: 'center' }}>

        {/* Eyebrow */}
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.16em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 24, animation: 'rise 0.6s ease-out 0.1s both' }}>
          LangGraph · Multi-Agent Runtime
        </p>

        {/* Heading */}
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(38px, 5.5vw, 68px)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 18, animation: 'rise 0.7s ease-out 0.2s both' }}>
          Plan less.<br/>
          <span style={{ background: 'linear-gradient(90deg, #c6ff00, #eaffb0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            Orchestrate more.
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 15, color: 'var(--text-dim)', marginBottom: 36, animation: 'rise 0.7s ease-out 0.3s both' }}>
          Flight, hotel, and budget agents work your trip in parallel.
        </p>

        {/* Input row */}
        <div style={{ animation: 'rise 0.7s ease-out 0.4s both' }}>
          <div style={{ display: 'flex', alignItems: 'stretch', background: 'var(--bg-elevated)', border: '1px solid var(--line)', borderRadius: 8, transition: 'border-color 0.15s' }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--lime-dim)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--line)'}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit(query)}
              disabled={isLoading}
              placeholder="4 days in Tokyo, $1500, ramen and temples"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, padding: '14px 18px' }}
            />
            <button onClick={() => submit(query)} disabled={isLoading || !query.trim()}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', borderLeft: '1px solid var(--line)', color: query.trim() && !isLoading ? 'var(--lime)' : 'var(--text-mute)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, letterSpacing: '0.03em', padding: '0 20px', cursor: query.trim() && !isLoading ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap', transition: 'background 0.15s, color 0.15s' }}
              onMouseEnter={e => { if (query.trim() && !isLoading) { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.color = '#05070a'; }}}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = query.trim() && !isLoading ? 'var(--lime)' : 'var(--text-mute)'; }}>
              {isLoading ? 'Running...' : 'Orchestrate →'}
            </button>
          </div>

          {/* Preset chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            {CHIPS.map((c, i) => (
              <button key={i} onClick={() => submit(c.prompt)} disabled={isLoading}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: 'var(--text-dim)', border: '1px solid var(--line)', background: 'transparent', padding: '7px 13px', borderRadius: 20, cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime-dim)'; e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-dim)'; }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ position: 'absolute', bottom: 24, left: 28, right: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-mute)' }}>
          Agent Execution Graph
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-mute)' }}>
          Console
        </span>
      </div>

      <style>{`
        @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
