import React, { useState } from 'react';

const INITIAL_HISTORY = {
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

const PanelIcon = ({ open }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    {open
      ? <path d="M3 4h18M3 12h18M3 20h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      : <path d="M3 4h18M3 12h18M3 20h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    }
    <rect x="3" y="3" width="7" height="18" rx="1" fill="currentColor" opacity="0.15"/>
  </svg>
);

export default function Sidebar({ activeId, onSelect, onNewTrip, onToggle }) {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState(INITIAL_HISTORY);
  // editingId: id of item being renamed; null = none
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  // hoveredId: which item is hovered (to show action buttons)
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = Object.entries(history).reduce((acc, [group, items]) => {
    const f = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));
    if (f.length) acc[group] = f;
    return acc;
  }, {});

  const startEdit = (item, e) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditValue(item.title);
  };

  const commitEdit = (groupKey, itemId) => {
    if (!editValue.trim()) { setEditingId(null); return; }
    setHistory(prev => {
      const next = { ...prev };
      next[groupKey] = next[groupKey].map(i =>
        i.id === itemId ? { ...i, title: editValue.trim() } : i
      );
      return next;
    });
    setEditingId(null);
  };

  const deleteItem = (groupKey, itemId, e) => {
    e.stopPropagation();
    setHistory(prev => {
      const next = { ...prev };
      next[groupKey] = next[groupKey].filter(i => i.id !== itemId);
      return next;
    });
  };

  return (
    <aside style={{
      width: 272, flexShrink: 0,
      background: 'var(--bg-sunken)',
      borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      height: '100%',
    }}>
      {/* Brand + Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px 10px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L21 4L13 21L11 13L3 12Z" stroke="#c6ff00" strokeWidth="1.4" strokeLinejoin="round"/>
          </svg>
          Roam<em style={{ fontStyle: 'normal', color: 'var(--lime)', fontWeight: 500 }}>OS</em>
        </div>
        {/* Hide sidebar button */}
        <button onClick={onToggle} title="Hide sidebar"
          style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--text-mute)', borderRadius: 5, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--lime)'; e.currentTarget.style.borderColor = 'var(--lime-dim)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-mute)'; e.currentTarget.style.borderColor = 'var(--line)'; }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H5a1 1 0 00-1 1v14a1 1 0 001 1h6M11 4v16M11 4h8a1 1 0 011 1v14a1 1 0 01-1 1h-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M15 9l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
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
              <div key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => editingId !== item.id && onSelect(item.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0', borderRadius: 6, cursor: 'pointer', borderLeft: `2px solid ${activeId === item.id ? 'var(--lime)' : 'transparent'}`, marginBottom: 2, background: activeId === item.id ? 'var(--bg-elevated)' : hoveredId === item.id ? 'var(--bg-elevated)' : 'transparent', transition: 'background 0.15s', position: 'relative' }}>

                {/* Item text / rename input */}
                <div style={{ flex: 1, padding: '9px 10px', minWidth: 0 }}>
                  {editingId === item.id ? (
                    <input
                      autoFocus
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') commitEdit(group, item.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      onBlur={() => commitEdit(group, item.id)}
                      onClick={e => e.stopPropagation()}
                      style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--lime-dim)', borderRadius: 4, color: 'var(--text)', fontFamily: "'Inter', sans-serif", fontSize: 12.5, padding: '3px 6px', outline: 'none' }}
                    />
                  ) : (
                    <>
                      <div style={{ fontSize: 12.5, color: activeId === item.id ? 'var(--lime)' : 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-mute)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.sub}
                      </div>
                    </>
                  )}
                </div>

                {/* Edit / Delete buttons — visible on hover */}
                {hoveredId === item.id && editingId !== item.id && (
                  <div style={{ display: 'flex', gap: 2, paddingRight: 8, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                    {/* Edit/Rename */}
                    <button onClick={(e) => startEdit(item, e)} title="Rename"
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-mute)', cursor: 'pointer', padding: '4px 5px', borderRadius: 4, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--lime)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-mute)'}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a1 1 0 00-1 1v15a1 1 0 001 1h15a1 1 0 001-1v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {/* Delete */}
                    <button onClick={(e) => deleteItem(group, item.id, e)} title="Delete"
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-mute)', cursor: 'pointer', padding: '4px 5px', borderRadius: 4, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-mute)'}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--lime)' }}>DK</div>
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
