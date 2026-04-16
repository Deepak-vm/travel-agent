import React, { useState } from 'react';

const TRIP_HISTORY = {
  Today: [
    { id: 1, title: 'Kyoto · 3 days, temples & matcha', sub: '$833 · 5 agents run' },
    { id: 2, title: 'Tokyo ramen crawl, 4 days', sub: '$1,420 · 5 agents run' },
  ],
  'Previous 7 days': [
    { id: 3, title: 'Weekend in Paris, romantic', sub: '$980 · 5 agents run' },
    { id: 4, title: 'Iceland roadtrip, adventure', sub: '$2,150 · 5 agents run' },
    { id: 5, title: 'Bali digital nomad month', sub: '$1,860 · 5 agents run' },
  ],
  Older: [
    { id: 6, title: 'Seoul food & skincare trip', sub: '$1,110 · 5 agents run' },
  ],
};

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export default function Sidebar({ activeId, onSelect, onNewTrip }) {
  const [search, setSearch] = useState('');

  const filtered = Object.entries(TRIP_HISTORY).reduce((acc, [group, items]) => {
    const f = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));
    if (f.length) acc[group] = f;
    return acc;
  }, {});

  return (
    <aside style={{
      width: 272, flexShrink: 0,
      background: 'var(--bg-sunken)',
      borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      height: '100%',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '18px 18px 14px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 12L21 4L13 21L11 13L3 12Z" stroke="#c6ff00" strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
        Roam<em style={{ fontStyle: 'normal', color: 'var(--lime)', fontWeight: 500 }}>OS</em>
      </div>

      {/* New Trip */}
      <button onClick={onNewTrip}
        style={{ margin: '0 14px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', border: '1px solid var(--lime-dim)', color: 'var(--lime)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.02em', padding: 10, borderRadius: 7, cursor: 'pointer', transition: 'background 0.15s, color 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.color = '#05070a'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lime)'; }}>
        ＋ New trip
      </button>

      {/* Search */}
      <div style={{ margin: '0 14px 16px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--line)', borderRadius: 7, padding: '8px 10px', background: 'var(--bg-elevated)', color: 'var(--text-dim)' }}>
        <SearchIcon/>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search trips..."
          style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, width: '100%' }}/>
      </div>

      {/* Trip list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 10px' }}>
        {Object.entries(filtered).map(([group, items]) => (
          <div key={group}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-mute)', padding: '10px 8px 6px' }}>
              {group}
            </div>
            {items.map(item => (
              <div key={item.id} onClick={() => onSelect(item.id)}
                style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '9px 10px', borderRadius: 6, cursor: 'pointer', borderLeft: `2px solid ${activeId === item.id ? 'var(--lime)' : 'transparent'}`, marginBottom: 2, background: activeId === item.id ? 'var(--bg-elevated)' : 'transparent', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (activeId !== item.id) e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                onMouseLeave={e => { if (activeId !== item.id) e.currentTarget.style.background = 'transparent'; }}>
                <div style={{ fontSize: 12.5, color: activeId === item.id ? 'var(--lime)' : 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-mute)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--lime)' }}>
            DK
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Deepak</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[false, false, true].map((warn, i) => (
            <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: warn ? 'var(--red)' : 'var(--lime)', boxShadow: `0 0 5px ${warn ? 'var(--red)' : 'var(--lime)'}`, display: 'block' }}/>
          ))}
        </div>
      </div>
    </aside>
  );
}
