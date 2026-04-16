import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroEmpty from './components/HeroEmpty';
import ChatThread from './components/ChatThread';
import Composer from './components/Composer';
import { executeTravelPipeline } from './services/api';
import { DESTINATION_DATABASE } from './services/mockData';

function TopBar({ activeTrip }) {
  return (
    <div style={{ height: 52, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--line)' }}>
      <div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13.5 }}>
          {activeTrip || 'RoamOS'}
        </span>
        <span style={{ color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 400, marginLeft: 10 }}>
          LangGraph · 5 agents
        </span>
      </div>
      <div style={{ display: 'flex', gap: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: 'var(--text-dim)' }}>
        {[{ label: 'API', warn: false }, { label: 'Postgres', warn: false }, { label: 'Groq · Llama-3', warn: true }].map(({ label, warn }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: warn ? 'var(--red)' : 'var(--lime)', boxShadow: `0 0 5px ${warn ? 'var(--red)' : 'var(--lime)'}`, display: 'block', flexShrink: 0 }}/>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(null);
  // messages = [] means empty/hero state
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);
  const threadEndRef = useRef(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (hasMessages) {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const runPipeline = async (text) => {
    if (isLoading) return;
    setIsLoading(true);

    // Append user + loading bot message
    setMessages(prev => [
      ...prev,
      { from: 'user', text },
      { from: 'bot', text: '', data: null, isLoading: true, agentStep: 0, stepLogs: [] },
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

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: 'bot',
          text: `Found ${result.flights?.length || 1} route(s) and ${result.hotels?.length || 1} stay option(s) inside budget — here's the ${result.itinerary?.length || 3}-day plan.`,
          data: result,
          isLoading: false,
        };
        return updated;
      });
      setActiveTrip(`${result.city} · ${result.itinerary?.length || 3} days`);
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          from: 'bot', text: 'Something went wrong. Please try again.', data: null, isLoading: false,
        };
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
    const { city, country = '', budgetEstimate, flights = [], hotels = [], itinerary = [] } = dataMsg.data;
    const md = [
      `# RoamOS Itinerary — ${city}, ${country}`,
      `**Total cost:** $${budgetEstimate}\n`,
      `## Flights`, ...flights.map(f => `- ${f.airline} · ${f.from}→${f.to} · ${f.duration} · $${f.price}`),
      `\n## Hotels`, ...hotels.map(h => `- ${h.name} ★${h.stars} · $${h.pricePerNight}/n`),
      `\n## Itinerary`, ...itinerary.flatMap(d => [`\n### Day ${d.day} — ${d.title}`, ...d.blocks.map(b => `**${b.time}**: ${b.title} — ${b.desc} (${b.cost})`)]),
      `\n---\n*RoamOS · LangGraph Multi-Agent Engine*`
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
    a.download = `RoamOS_${city}.md`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeId={activeId} onSelect={(id) => { setActiveId(id); }} onNewTrip={handleNewTrip}/>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <TopBar activeTrip={activeTrip}/>

        {/* Conditional: hero vs chat */}
        {!hasMessages ? (
          /* ── Empty state: full hero landing ── */
          <HeroEmpty onSearch={runPipeline} isLoading={isLoading}/>
        ) : (
          /* ── Chat state: thread + composer ── */
          <>
            <ChatThread messages={messages} onExport={handleExport} onRegenerate={() => {}}/>
            <div ref={threadEndRef}/>
            <Composer onSend={runPipeline} isLoading={isLoading}/>
          </>
        )}
      </main>
    </div>
  );
}
