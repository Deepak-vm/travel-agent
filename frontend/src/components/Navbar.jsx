import React from 'react';
import { RefreshCw, Download, Github } from 'lucide-react';

export default function Navbar({ onReset, onExport, hasData }) {
  return (
    <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={onReset}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L21 4L13 21L11 13L3 12Z" stroke="#c6ff00" strokeWidth="1.4" strokeLinejoin="round"/>
          </svg>
          <span className="font-display" style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}>
            Roam<em style={{ fontStyle: 'normal', color: 'var(--lime)', fontWeight: 500 }}>OS</em>
          </span>
          <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-mute)', border: '1px solid var(--line)', padding: '3px 7px', borderRadius: 3, marginLeft: 4 }}>
            MCP
          </span>
        </div>

        {/* Status + Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Status pills */}
          <div className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 11, color: 'var(--text-dim)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 6px var(--lime)' }}/>
              API
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 6px var(--lime)' }}/>
              Postgres
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 6px var(--red)' }}/>
              Groq · Llama-3
            </span>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {hasData && (
              <button onClick={onExport} className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid var(--line)', color: 'var(--text-dim)', fontSize: 11, padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime-dim)'; e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-dim)'; }}>
                <Download size={12}/> Export
              </button>
            )}
            <button onClick={onReset} className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid var(--line)', color: 'var(--text-dim)', fontSize: 11, padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime-dim)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-dim)'; }}>
              <RefreshCw size={12}/> Reset
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', padding: '6px 8px', border: '1px solid var(--line)', borderRadius: 4, color: 'var(--text-dim)' }}>
              <Github size={14}/>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
