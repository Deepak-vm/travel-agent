import React from 'react';

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M12 15l-4-4M12 15l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M4 4v5h5M20 20v-5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 15a8 8 0 0013.9 2.5M18.5 9A8 8 0 004.6 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function GhostBtn({ title, children, onClick }) {
  return (
    <button onClick={onClick} title={title}
      style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--text-dim)', width: 32, height: 32, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.15s, color 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime-dim)'; e.currentTarget.style.color = 'var(--lime)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-dim)'; }}>
      {children}
    </button>
  );
}

/** User message bubble */
function UserMessage({ text }) {
  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 26 }}>
      <div style={{ width: 26, height: 26, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, background: 'var(--bg-elevated)', border: '1px solid var(--line)', color: 'var(--text-dim)', marginTop: 2 }}>
        DK
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 5 }}>You</div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)' }}>{text}</div>
      </div>
    </div>
  );
}

/** Pipeline agent step chips */
function PipelineChips({ agents }) {
  const steps = agents || ['Request Parser', 'Flight Agent', 'Hotel Agent', 'Weather Agent', 'Itinerary Planner'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0' }}>
      {steps.map((s, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-dim)', border: '1px solid var(--line)', borderRadius: 20, padding: '4px 10px 4px 8px' }}>
          <span style={{ color: 'var(--lime)', fontSize: 10 }}>✓</span>{s}
        </span>
      ))}
    </div>
  );
}

/** Compact stats row */
function ResultStats({ data }) {
  const { city, itinerary = [], budgetEstimate, weather } = data;
  return (
    <div style={{ display: 'flex', gap: 18, margin: '14px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5 }}>
      {[
        { label: 'Destination', val: city, lime: false },
        { label: 'Duration', val: `${itinerary.length || 3} days`, lime: false },
        { label: 'Total cost', val: `$${budgetEstimate || 833}`, lime: true },
        { label: 'Weather', val: weather?.temp || '19°C', lime: false },
      ].map(({ label, val, lime }) => (
        <div key={label}>
          <span style={{ color: 'var(--text-mute)', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 2 }}>{label}</span>
          <b style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: lime ? 'var(--lime)' : 'var(--text)' }}>{val}</b>
        </div>
      ))}
    </div>
  );
}

/** Flight + Hotel two-column cards */
function ResultCards({ flights = [], hotels = [] }) {
  const flight = flights[0];
  const hotel = hotels[0];
  if (!flight && !hotel) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '14px 0' }}>
      {flight && (
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line)', borderRadius: 8, padding: '14px 16px' }}>
          <span style={{ float: 'right', color: 'var(--lime)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>${flight.price}</span>
          <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 2 }}>{flight.airline}</h4>
          <small style={{ color: 'var(--text-dim)', fontSize: 11 }}>{flight.flightNo} · {flight.from} → {flight.to} · {flight.duration} {flight.stops}</small>
        </div>
      )}
      {hotel && (
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line)', borderRadius: 8, padding: '14px 16px' }}>
          <span style={{ float: 'right', color: 'var(--lime)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13 }}>${hotel.pricePerNight}/n</span>
          <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, fontWeight: 600, marginBottom: 2 }}>{hotel.name}</h4>
          <small style={{ color: 'var(--text-dim)', fontSize: 11 }}>{hotel.neighborhood} · ★ {hotel.stars}</small>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 10 }}>
            {(hotel.tags || []).slice(0, 3).map((t, i) => (
              <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--text-dim)', border: '1px solid var(--line)', padding: '2px 7px', borderRadius: 10 }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Single day card */
function DayCard({ day }) {
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden', margin: '14px 0' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>
        Day {day.day} — {day.title}
      </div>
      {(day.blocks || []).map((b, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '9px 16px', borderBottom: i < day.blocks.length - 1 ? '1px solid var(--line-soft)' : 'none', fontSize: 12.5 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, textTransform: 'uppercase', color: 'var(--text-mute)', width: 56, flexShrink: 0 }}>{b.time}</div>
          <b style={{ fontWeight: 500, marginRight: 8, whiteSpace: 'nowrap' }}>{b.title}</b>
          <p style={{ color: 'var(--text-dim)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.desc}</p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--lime)', fontSize: 11, flexShrink: 0 }}>{b.cost}</div>
        </div>
      ))}
    </div>
  );
}

/** Bot message with all result data */
function BotMessage({ message, onExport, onRegenerate }) {
  const { text, data, isLoading, agentStep, stepLogs = [] } = message;

  const copyText = () => {
    if (data) navigator.clipboard.writeText(`RoamOS itinerary for ${data.city} — $${data.budgetEstimate}`);
  };

  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 26 }}>
      <div style={{ width: 26, height: 26, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, background: 'transparent', border: '1px solid var(--lime-dim)' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M3 12L21 4L13 21L11 13L3 12Z" stroke="#c6ff00" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--lime-dim)', marginBottom: 5 }}>RoamOS</div>

        {/* Loading / pipeline steps */}
        {isLoading && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0' }}>
              {['Request Parser', 'Flight Agent', 'Hotel Agent', 'Weather Agent', 'Itinerary Planner'].map((s, i) => {
                const done = i < agentStep;
                const active = i === agentStep;
                return (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: done ? 'var(--text-dim)' : active ? 'var(--lime)' : 'var(--text-mute)', border: `1px solid ${active ? 'var(--lime-dim)' : 'var(--line)'}`, borderRadius: 20, padding: '4px 10px 4px 8px' }}>
                    <span style={{ color: done ? 'var(--lime)' : 'var(--text-mute)' }}>{done ? '✓' : active ? '◉' : '○'}</span>{s}
                  </span>
                );
              })}
            </div>
            {stepLogs.length > 0 && (
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-mute)', lineHeight: 1.7 }}>
                {stepLogs[stepLogs.length - 1]}
              </div>
            )}
          </div>
        )}

        {/* Completed result */}
        {!isLoading && data && (
          <>
            <PipelineChips/>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text)', marginBottom: 4 }}>{text}</div>
            <ResultStats data={data}/>
            <ResultCards flights={data.flights} hotels={data.hotels}/>
            {(data.itinerary || []).map((day, i) => <DayCard key={i} day={day}/>)}
          </>
        )}

        {/* Plain text message (no data) */}
        {!isLoading && !data && (
          <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text)' }}>{text}</div>
        )}

        {/* Action buttons */}
        {!isLoading && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <GhostBtn title="Export itinerary" onClick={onExport}><DownloadIcon/></GhostBtn>
            <GhostBtn title="Copy" onClick={copyText}><CopyIcon/></GhostBtn>
            <GhostBtn title="Regenerate" onClick={onRegenerate}><RefreshIcon/></GhostBtn>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatThread({ messages, onExport, onRegenerate }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px 40px' }}>
        {messages.map((msg, i) =>
          msg.from === 'user'
            ? <UserMessage key={i} text={msg.text}/>
            : <BotMessage key={i} message={msg} onExport={onExport} onRegenerate={onRegenerate}/>
        )}
      </div>
    </div>
  );
}
