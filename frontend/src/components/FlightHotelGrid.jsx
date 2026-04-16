import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function FlightHotelGrid({ flights = [], hotels = [] }) {
  return (
    <section style={{ maxWidth: 1180, margin: '32px auto 0', padding: '0 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

        {/* FLIGHTS */}
        <div>
          <p className="font-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 16 }}>
            Flight intel · AviationStack MCP
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
            {flights.map((f, i) => (
              <div key={f.id} style={{ background: 'var(--bg-elevated)', padding: '18px 20px', borderBottom: i < flights.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div className="font-display" style={{ fontWeight: 600, fontSize: 13 }}>{f.airline}</div>
                    <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)', marginTop: 2 }}>{f.flightNo} · {f.cabin}</div>
                  </div>
                  <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--lime)' }}>
                    ${f.price}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="font-mono" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.05em' }}>{f.from}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{f.departTime}</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ height: 1, background: 'var(--line)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', border: '1px solid var(--lime-dim)', background: 'var(--bg)' }}/>
                    </div>
                    <div className="font-mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', marginTop: 5 }}>{f.duration} · {f.stops}</div>
                  </div>
                  <div className="font-mono" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.05em' }}>{f.to}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{f.arrivalTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOTELS */}
        <div>
          <p className="font-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 16 }}>
            Hotel & stays · Tavily MCP
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
            {hotels.map((h, i) => (
              <div key={h.id} style={{ background: 'var(--bg-elevated)', padding: '18px 20px', borderBottom: i < hotels.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div className="font-display" style={{ fontWeight: 600, fontSize: 13 }}>{h.name}</div>
                    <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)', marginTop: 2 }}>{h.neighborhood}</div>
                  </div>
                  <a href={h.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-mute)', marginTop: 2 }}>
                    <ExternalLink size={13}/>
                  </a>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                  {h.tags.slice(0, 3).map((t, ti) => (
                    <span key={ti} className="font-mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', border: '1px solid var(--line)', borderRadius: 3, padding: '2px 7px' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                  <span className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)' }}>★ {h.stars}</span>
                  <div className="font-display" style={{ fontWeight: 700, fontSize: 16, color: 'var(--lime)' }}>
                    ${h.pricePerNight}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-dim)' }}>/night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
