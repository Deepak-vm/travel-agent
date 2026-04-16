import React, { useState } from 'react';

const CHIPS = [
  { label: 'Tokyo · 4d · $1500', prompt: 'Plan a 4-day trip to Tokyo with a budget of $1500 focusing on ramen and tech spots' },
  { label: 'Kyoto · 3d · $1000', prompt: 'Plan a 3-day trip to Kyoto with a budget of $1000 focusing on temples and matcha' },
  { label: 'Paris · Weekend',    prompt: 'Plan a 3-day romantic weekend trip to Paris with a budget of $1350' },
  { label: 'Iceland · 5d · Adventure', prompt: 'Plan a 5-day Iceland adventure roadtrip with a budget of $2000' },
];

export default function HeroSearch({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const submit = (q) => {
    if (!q.trim() || isLoading) return;
    onSearch(q.trim());
  };

  const handleKey = (e) => { if (e.key === 'Enter') submit(query); };

  return (
    <section style={{ position: 'relative', padding: '108px 0 88px', textAlign: 'center', overflow: 'hidden' }}>

      {/* Animated route SVG */}
      <svg className="route-svg" viewBox="0 0 900 260" preserveAspectRatio="none"
        style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', width: 900, maxWidth: '92vw', height: 260, pointerEvents: 'none', opacity: 0.55 }}>
        <path className="route-path" d="M20,220 C 220,220 260,40 460,40 C 660,40 700,180 880,60"/>
        <circle className="route-dot" cx="880" cy="60" r="4"/>
      </svg>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px', position: 'relative' }}>

        {/* Eyebrow */}
        <p className="font-mono anim-rise-1" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 22 }}>
          LangGraph · Multi-Agent Runtime
        </p>

        {/* H1 */}
        <h1 className="font-display anim-rise-2" style={{ fontWeight: 700, fontSize: 'clamp(40px,6.6vw,74px)', lineHeight: 1.04, letterSpacing: '-0.02em' }}>
          Plan less.<br/>
          <span style={{ background: 'linear-gradient(90deg,var(--lime),#eaffb0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            Orchestrate more.
          </span>
        </h1>

        {/* Sub */}
        <p className="anim-rise-3" style={{ fontSize: 16, color: 'var(--text-dim)', margin: '22px auto 0', maxWidth: 480, fontWeight: 400 }}>
          Flight, hotel, and budget agents work your trip in parallel.
        </p>

        {/* Console input */}
        <div className="anim-rise-4" style={{ maxWidth: 680, margin: '40px auto 0' }}>
          <div style={{
            display: 'flex', alignItems: 'stretch',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--line)',
            borderRadius: 8,
          }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--lime-dim)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--line)'}
          >
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKey}
              disabled={isLoading}
              placeholder="4 days in Tokyo, $1500, ramen and temples"
              className="font-mono"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text)', fontSize: 13.5, padding: '14px 18px',
              }}
            />
            <button
              onClick={() => submit(query)}
              disabled={isLoading}
              className="font-mono"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'transparent',
                border: 'none', borderLeft: '1px solid var(--line)',
                color: isLoading ? 'var(--text-mute)' : 'var(--lime)',
                fontSize: 12.5, letterSpacing: '0.03em',
                padding: '0 20px', cursor: isLoading ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap', transition: 'background 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.color = '#05070a'; }}}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isLoading ? 'var(--text-mute)' : 'var(--lime)'; }}
            >
              {isLoading ? 'Running...' : 'Orchestrate →'}
            </button>
          </div>

          {/* Preset chips */}
          <div className="anim-rise-5" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 22 }}>
            {CHIPS.map((c, i) => (
              <button key={i} onClick={() => submit(c.prompt)} disabled={isLoading}
                className="font-mono"
                style={{
                  fontSize: 11.5, color: 'var(--text-dim)',
                  border: '1px solid var(--line)', background: 'transparent',
                  padding: '7px 13px', borderRadius: 20, cursor: 'pointer',
                  transition: 'border-color 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime-dim)'; e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-dim)'; }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
