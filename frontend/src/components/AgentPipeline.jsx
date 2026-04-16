import React, { useState } from 'react';
import { AGENT_STEPS } from '../services/api';

const STATE_ICONS = {
  pending:    '○',
  processing: '◉',
  completed:  '✓',
};

export default function AgentPipeline({ stepIndex, statusLine, isCompleted, logs }) {
  const [showLogs, setShowLogs] = useState(true);

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px 0' }}>
      <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '32px 0' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <p className="font-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--lime)', textTransform: 'uppercase' }}>
            Agent execution graph
          </p>
          <button className="font-mono" onClick={() => setShowLogs(v => !v)}
            style={{ fontSize: 10, color: 'var(--text-mute)', background: 'transparent', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: 3, cursor: 'pointer', letterSpacing: '0.06em' }}>
            {showLogs ? '− console' : '+ console'}
          </button>
        </div>

        {/* 5 Nodes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {AGENT_STEPS.map((step, idx) => {
            let state = 'pending';
            if (isCompleted || idx < stepIndex) state = 'completed';
            else if (idx === stepIndex) state = 'processing';

            return (
              <div key={step.id} style={{
                border: `1px solid ${state === 'processing' ? 'var(--lime-dim)' : 'var(--line)'}`,
                borderRadius: 6,
                padding: '16px 14px',
                background: state === 'completed' ? 'rgba(198,255,0,0.04)' : 'var(--bg-elevated)',
                transition: 'border-color 0.3s ease',
              }}>
                <div className="font-mono" style={{
                  fontSize: 18, marginBottom: 10,
                  color: state === 'completed' ? 'var(--lime)' : state === 'processing' ? 'var(--lime)' : 'var(--text-mute)',
                }}>
                  {STATE_ICONS[state]}
                </div>
                <div className="font-display" style={{ fontWeight: 600, fontSize: 12, color: state === 'pending' ? 'var(--text-mute)' : 'var(--text)', marginBottom: 4 }}>
                  {step.name}
                </div>
                <div className="font-mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', lineHeight: 1.5 }}>
                  {step.mcp}
                </div>
                <div className="font-mono" style={{ fontSize: 10, marginTop: 8, color: state === 'completed' ? 'var(--lime)' : state === 'processing' ? 'var(--lime-dim)' : 'var(--text-mute)' }}>
                  {state === 'completed' ? '0.8s' : state === 'processing' ? '···' : '—'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Console log */}
        {showLogs && (
          <div className="font-mono" style={{
            marginTop: 20, background: 'var(--bg)', border: '1px solid var(--line)',
            borderRadius: 6, padding: '14px 16px', fontSize: 11, color: 'var(--text-dim)',
            maxHeight: 140, overflowY: 'auto', lineHeight: 1.7,
          }}>
            {logs && logs.length > 0
              ? logs.map((l, i) => <div key={i} style={{ color: i === logs.length - 1 ? 'var(--lime)' : 'var(--text-dim)' }}>{l}</div>)
              : <span style={{ color: 'var(--text-mute)' }}>{'>'} awaiting graph execution...</span>
            }
          </div>
        )}
      </div>
    </section>
  );
}
