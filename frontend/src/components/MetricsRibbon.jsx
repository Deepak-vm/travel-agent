import React from 'react';

export default function MetricsRibbon({ data }) {
  if (!data) return null;
  const { city, country, weather, budgetEstimate, userBudget = 1500, itinerary = [] } = data;
  const cost = budgetEstimate || 1350;
  const pct = Math.min(Math.round((cost / userBudget) * 100), 100);
  const days = itinerary.length || 3;

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '32px 32px 0' }}>
      <p className="font-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 20 }}>
        Trip intelligence
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>

        {/* Destination */}
        <div style={{ background: 'var(--bg-elevated)', padding: '22px 20px', borderRight: '1px solid var(--line)' }}>
          <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.1em', marginBottom: 8 }}>DESTINATION</div>
          <div className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>{city}</div>
          <div className="font-mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>{country}</div>
        </div>

        {/* Duration */}
        <div style={{ background: 'var(--bg-elevated)', padding: '22px 20px', borderRight: '1px solid var(--line)' }}>
          <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.1em', marginBottom: 8 }}>DURATION</div>
          <div className="font-display" style={{ fontSize: 22, fontWeight: 700 }}>{days}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-dim)', marginLeft: 4 }}>days</span></div>
          <div className="font-mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>{days - 1} nights</div>
        </div>

        {/* Budget */}
        <div style={{ background: 'var(--bg-elevated)', padding: '22px 20px', borderRight: '1px solid var(--line)' }}>
          <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.1em', marginBottom: 8 }}>TOTAL COST</div>
          <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--lime)' }}>${cost}</div>
          <div style={{ marginTop: 8, background: 'var(--line)', borderRadius: 2, height: 3, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: 'var(--lime)', transition: 'width 1s ease' }}/>
          </div>
          <div className="font-mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', marginTop: 4 }}>{pct}% of ${userBudget} budget</div>
        </div>

        {/* Weather */}
        <div style={{ background: 'var(--bg-elevated)', padding: '22px 20px' }}>
          <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)', letterSpacing: '0.1em', marginBottom: 8 }}>WEATHER MCP</div>
          <div className="font-display" style={{ fontSize: 22, fontWeight: 700 }}>{weather?.temp || '21°C'}</div>
          <div className="font-mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>
            {weather?.condition || 'Clear'} · {weather?.humidity || '55%'}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {(weather?.forecast || []).slice(0, 3).map((fc, i) => (
              <div key={i} className="font-mono" style={{ fontSize: 9.5, color: 'var(--text-mute)', border: '1px solid var(--line)', borderRadius: 3, padding: '3px 6px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-dim)' }}>{fc.temp}</div>
                <div>{fc.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
