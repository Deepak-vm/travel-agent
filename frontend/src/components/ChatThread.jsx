import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ── icons ── */
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
const ChevronIcon = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d={open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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

/** Collapsible raw text section for agent sub-outputs */
function RawSection({ label, text }) {
  const [open, setOpen] = useState(false);
  if (!text || !text.trim()) return null;
  return (
    <div style={{ marginTop: 10, border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
      <button onClick={() => setOpen(v => !v)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: 'var(--bg-elevated)', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
        <ChevronIcon open={open}/>
      </button>
      {open && (
        <div style={{ padding: '14px 16px', background: 'var(--bg)' }}>
          <div className="md-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── User bubble ── */
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

/* ── Pipeline chips ── */
function PipelineChips({ agentStep, isLoading }) {
  const steps = ['Request Parser', 'Flight Agent', 'Hotel Agent', 'Weather Agent', 'Itinerary Planner'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '10px 0 14px' }}>
      {steps.map((s, i) => {
        const done   = isLoading ? i < agentStep : true;
        const active = isLoading && i === agentStep;
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: active ? 'var(--lime)' : done ? 'var(--text-dim)' : 'var(--text-mute)', border: `1px solid ${active ? 'var(--lime-dim)' : 'var(--line)'}`, borderRadius: 20, padding: '4px 10px 4px 8px', transition: 'all 0.2s' }}>
            <span style={{ color: done ? 'var(--lime)' : 'var(--text-mute)' }}>{done ? '✓' : active ? '◉' : '○'}</span>{s}
          </span>
        );
      })}
    </div>
  );
}

/* ── Bot bubble ── */
function BotMessage({ message, onExport }) {
  const { data, isLoading, agentStep = 0, stepLogs = [] } = message;

  const copyAll = () => {
    const text = [data?.final_response, data?.flight_results, data?.hotel_results, data?.itinerary].filter(Boolean).join('\n\n---\n\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 26 }}>
      {/* Avatar */}
      <div style={{ width: 26, height: 26, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, background: 'transparent', border: '1px solid var(--lime-dim)' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M3 12L21 4L13 21L11 13L3 12Z" stroke="#c6ff00" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--lime-dim)', marginBottom: 5 }}>RoamOS</div>

        {/* Pipeline steps */}
        <PipelineChips agentStep={agentStep} isLoading={isLoading}/>

        {/* Loading — show last log line */}
        {isLoading && stepLogs.length > 0 && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-mute)', lineHeight: 1.7, marginBottom: 8 }}>
            {stepLogs[stepLogs.length - 1]}
          </div>
        )}

        {/* Completed — real backend text */}
        {!isLoading && data && (
          <>
            {/* Main LLM final response — rendered as markdown */}
            {data.final_response && (
              <div className="md-body" style={{ marginBottom: 14 }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.final_response}</ReactMarkdown>
              </div>
            )}

            {/* Thread meta */}
            {data.thread_id && (
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: 'var(--text-mute)', marginBottom: 12 }}>
                thread · {data.thread_id} · {data.llm_calls || 0} LLM calls
              </div>
            )}

            {/* Raw agent outputs — collapsible */}
            <RawSection label="✈  Flight Results (AviationStack MCP)" text={data.flight_results}/>
            <RawSection label="🏨  Hotel Results (Tavily MCP)" text={data.hotel_results}/>
            <RawSection label="📅  Itinerary (Agent Output)" text={data.itinerary}/>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <GhostBtn title="Export" onClick={onExport}><DownloadIcon/></GhostBtn>
              <GhostBtn title="Copy all" onClick={copyAll}><CopyIcon/></GhostBtn>
            </div>
          </>
        )}

        {/* Error state */}
        {!isLoading && !data && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--red)', lineHeight: 1.7, padding: '12px 14px', border: '1px solid #3a1515', borderRadius: 6, background: '#160a0a' }}>
            <div style={{ marginBottom: 6, fontWeight: 600 }}>✗ Pipeline Error</div>
            <div style={{ color: '#ff7b72' }}>{message.errorMsg || 'Backend unreachable. Make sure FastAPI is running on port 8000.'}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatThread({ messages, onExport }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px 40px' }}>
        {messages.map((msg, i) =>
          msg.from === 'user'
            ? <UserMessage key={i} text={msg.text}/>
            : <BotMessage key={i} message={msg} onExport={onExport}/>
        )}
      </div>
    </div>
  );
}
