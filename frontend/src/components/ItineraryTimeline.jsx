import React, { useState } from 'react';

const TIME_LABEL = { Morning: '🌅', Afternoon: '☀️', Evening: '🌙' };

export default function ItineraryTimeline({ itinerary = [] }) {
  const [activeDay, setActiveDay] = useState(0);
  const [checked, setChecked] = useState({});
  const toggle = k => setChecked(p => ({ ...p, [k]: !p[k] }));

  if (!itinerary.length) return null;

  const allKeys = itinerary.flatMap((d, di) => d.blocks.map((_, bi) => `${di}-${bi}`));
  const doneCount = allKeys.filter(k => checked[k]).length;

  const days = activeDay === 'all' ? itinerary : [itinerary[activeDay]];

  return (
    <section style={{ maxWidth: 1180, margin: '32px auto 0', padding: '0 32px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p className="font-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--lime)', textTransform: 'uppercase' }}>
          Day-by-day itinerary · {doneCount}/{allKeys.length} done
        </p>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {itinerary.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)} className="font-mono"
              style={{ fontSize: 11, padding: '5px 12px', borderRadius: 3, cursor: 'pointer', background: activeDay === i ? 'var(--lime)' : 'transparent', color: activeDay === i ? '#05070a' : 'var(--text-dim)', border: `1px solid ${activeDay === i ? 'var(--lime)' : 'var(--line)'}`, transition: 'all 0.15s ease' }}>
              Day {d.day}
            </button>
          ))}
          <button onClick={() => setActiveDay('all')} className="font-mono"
            style={{ fontSize: 11, padding: '5px 12px', borderRadius: 3, cursor: 'pointer', background: activeDay === 'all' ? 'var(--lime)' : 'transparent', color: activeDay === 'all' ? '#05070a' : 'var(--text-dim)', border: `1px solid ${activeDay === 'all' ? 'var(--lime)' : 'var(--line)'}`, transition: 'all 0.15s ease' }}>
            All
          </button>
        </div>
      </div>

      {/* Days */}
      {days.map((dayItem, di) => {
        const realIdx = activeDay === 'all' ? di : activeDay;
        return (
          <div key={realIdx} style={{ marginBottom: 24, border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
            {/* Day header */}
            <div style={{ background: 'var(--bg-elevated)', padding: '14px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="font-display" style={{ fontWeight: 600, fontSize: 14 }}>Day {dayItem.day} — {dayItem.title}</span>
                <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 3 }}>{dayItem.summary}</div>
              </div>
              <span className="font-mono" style={{ fontSize: 11, color: 'var(--lime)' }}>${dayItem.estimatedSpend || 90}</span>
            </div>

            {/* Blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
              {dayItem.blocks.map((b, bi) => {
                const k = `${realIdx}-${bi}`;
                const done = !!checked[k];
                return (
                  <div key={bi} style={{ padding: '18px 20px', borderRight: bi < dayItem.blocks.length - 1 ? '1px solid var(--line)' : 'none', background: done ? 'rgba(198,255,0,0.03)' : 'var(--bg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span className="font-mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                        {TIME_LABEL[b.time] || ''} {b.time.toUpperCase()}
                      </span>
                      <button onClick={() => toggle(k)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: done ? 'var(--lime)' : 'var(--text-mute)', fontSize: 14, lineHeight: 1 }}>
                        {done ? '✓' : '○'}
                      </button>
                    </div>
                    <div className="font-display" style={{ fontWeight: 600, fontSize: 13, color: done ? 'var(--text-mute)' : 'var(--text)', textDecoration: done ? 'line-through' : 'none', marginBottom: 6 }}>
                      {b.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 12 }}>
                      {b.desc}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className="font-mono">
                      <span style={{ fontSize: 9.5, color: 'var(--text-mute)' }}>{b.location}</span>
                      <span style={{ fontSize: 10, color: 'var(--lime)' }}>{b.cost}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
