import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroEmpty from './components/HeroEmpty';
import ChatThread from './components/ChatThread';
import Composer from './components/Composer';
import { executeTravelPipeline } from './services/api';

function TopBar({ activeTrip, sidebarOpen, onToggleSidebar }) {
  return (
    <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {!sidebarOpen && (
          <button onClick={onToggleSidebar} title="Show sidebar"
            style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--text-mute)', borderRadius: 5, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--lime)'; e.currentTarget.style.borderColor = 'var(--lime-dim)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-mute)'; e.currentTarget.style.borderColor = 'var(--line)'; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H5a1 1 0 00-1 1v14a1 1 0 001 1h6M11 4v16M11 4h8a1 1 0 011 1v14a1 1 0 01-1 1h-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M17 9l-3 3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13.5 }}>
            {activeTrip || 'RoamOS'}
          </span>
          <span style={{ color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, marginLeft: 10 }}>
            LangGraph · 5 agents
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: 'var(--text-dim)' }}>
        {[{ label: 'API', warn: false }, { label: 'Postgres', warn: false }, { label: 'Groq · Llama-3', warn: true }].map(({ label, warn }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: warn ? 'var(--red)' : 'var(--lime)', boxShadow: `0 0 5px ${warn ? 'var(--red)' : 'var(--lime)'}`, display: 'block' }}/>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);
  const threadEndRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const runPipeline = async (text) => {
    if (isLoading) return;
    setIsLoading(true);

    // Add user message + loading bot placeholder
    setMessages(prev => [
      ...prev,
      { from: 'user', text },
      { from: 'bot', data: null, isLoading: true, agentStep: 0, stepLogs: [] },
    ]);

    try {
      const result = await executeTravelPipeline(text, (p) => {
        setMessages(prev => {
          const updated = [...prev];
          const last = { ...updated[updated.length - 1] };
          last.agentStep = p.stepIndex;
          if (p.statusLine) last.stepLogs = [...(last.stepLogs || []), p.statusLine];
          updated[updated.length - 1] = last;
          return updated;
        });
      });

      // Replace placeholder with real backend data
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { from: 'bot', data: result, isLoading: false };
        return updated;
      });

      // Set trip title from query or city
      const qWords = text.split(' ').slice(0, 5).join(' ');
      setActiveTrip(qWords);

    } catch (err) {
      const errorMsg = err?.message || 'Unknown error';
      console.error('Pipeline error:', errorMsg);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { from: 'bot', data: null, isLoading: false, errorMsg };
        return updated;
      });
    }

    setIsLoading(false);
  };

  const handleNewTrip = () => {
    setMessages([]);
    setActiveTrip(null);
    setActiveId(null);
  };

  const handleExport = () => {
    const dataMsg = [...messages].reverse().find(m => m.data);
    if (!dataMsg?.data) return;
    const { user_query, final_response, flight_results, hotel_results, itinerary } = dataMsg.data;
    const md = [
      `# RoamOS — ${user_query || 'Trip'}`,
      final_response && `\n## Summary\n${final_response}`,
      flight_results && `\n## Flight Results (AviationStack MCP)\n${flight_results}`,
      hotel_results && `\n## Hotel Results (Tavily MCP)\n${hotel_results}`,
      itinerary && `\n## Itinerary\n${itinerary}`,
      `\n---\n*RoamOS · LangGraph Multi-Agent Engine*`,
    ].filter(Boolean).join('\n');

    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
    a.download = 'RoamOS_itinerary.md';
    a.click();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {sidebarOpen && (
        <Sidebar activeId={activeId} onSelect={setActiveId} onNewTrip={handleNewTrip} onToggle={() => setSidebarOpen(false)}/>
      )}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <TopBar activeTrip={activeTrip} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(true)}/>

        {messages.length === 0 ? (
          <HeroEmpty onSearch={runPipeline} isLoading={isLoading}/>
        ) : (
          <>
            <ChatThread messages={messages} onExport={handleExport}/>
            <div ref={threadEndRef}/>
            <Composer onSend={runPipeline} isLoading={isLoading}/>
          </>
        )}
      </main>
    </div>
  );
}
