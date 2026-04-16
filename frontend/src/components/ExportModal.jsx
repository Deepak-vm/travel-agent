import React, { useState } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';

export default function ExportModal({ isOpen, onClose, data }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen || !data) return null;

  const { city, country, budgetEstimate, weather, flights = [], hotels = [], itinerary = [] } = data;

  const md = [
    `# RoamOS Itinerary — ${city}, ${country}`,
    `*Multi-agent workflow: AviationStack MCP · Tavily MCP · Groq Llama-3*\n`,
    `**Estimated cost:** $${budgetEstimate}  |  **Weather:** ${weather?.temp}, ${weather?.condition}\n`,
    `## Flights (AviationStack MCP)`,
    ...flights.map(f => `- **${f.airline}** (${f.flightNo}) ${f.from} → ${f.to} · ${f.duration} · $${f.price}`),
    `\n## Hotels (Tavily MCP)`,
    ...hotels.map(h => `- **${h.name}** ★${h.stars} · ${h.neighborhood} · $${h.pricePerNight}/night`),
    `\n## Day-by-Day Itinerary`,
    ...itinerary.flatMap(d => [
      `\n### Day ${d.day} — ${d.title}`,
      ...d.blocks.map(b => `**${b.time}** [${b.cost}]: ${b.title}\n${b.desc}`),
    ]),
    `\n---\n*Created with RoamOS · LangGraph Multi-Agent Engine*`
  ].join('\n');

  const copy = () => { navigator.clipboard.writeText(md); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
    a.download = `RoamOS_${city}.md`;
    a.click();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,7,10,0.85)', backdropFilter: 'blur(4px)', padding: 24 }}>
      <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, maxWidth: 640, width: '100%' }}>

        {/* Header */}
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="font-display" style={{ fontWeight: 600, fontSize: 14 }}>Export itinerary</div>
            <div className="font-mono" style={{ fontSize: 10, color: 'var(--text-mute)', marginTop: 2 }}>Markdown · PDF-ready</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={18}/></button>
        </div>

        {/* Preview */}
        <textarea readOnly value={md} rows={12}
          style={{ width: '100%', background: 'var(--bg-elevated)', border: 'none', borderBottom: '1px solid var(--line)', padding: '16px 20px', fontSize: 11, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace', resize: 'none', outline: 'none', lineHeight: 1.7 }}
        />

        {/* Actions */}
        <div style={{ padding: '16px 20px', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={copy} className="font-mono"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, padding: '8px 16px', border: '1px solid var(--line)', borderRadius: 4, background: 'transparent', color: copied ? 'var(--lime)' : 'var(--text-dim)', cursor: 'pointer' }}>
            {copied ? <Check size={12}/> : <Copy size={12}/>} {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={download} className="font-mono"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, padding: '8px 16px', background: 'var(--lime)', color: '#05070a', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}>
            <Download size={12}/> Download .md
          </button>
        </div>
      </div>
    </div>
  );
}
