export const AGENT_STEPS = [
  { id: 'parser',  name: 'Request Parser',    mcp: 'LangGraph Agent' },
  { id: 'flight',  name: 'Flight Agent',      mcp: 'uvx aviationstack-mcp' },
  { id: 'hotel',   name: 'Hotel Agent',       mcp: 'Tavily Remote MCP' },
  { id: 'weather', name: 'Weather Agent',     mcp: 'Custom Weather MCP' },
  { id: 'planner', name: 'Itinerary Planner', mcp: 'ChatGroq Llama-3' },
];

const STEP_LOGS = [
  { log: (q) => `> [Request Parser] Extracting destination & budget from: "${q}"...`, delay: 700 },
  { log: ()  => `> [AviationStack MCP] Fetching live flight routes & prices...`,      delay: 1200 },
  { log: ()  => `> [Tavily MCP] Searching top-rated hotels & stays...`,               delay: 1200 },
  { log: ()  => `> [Weather MCP] Fetching atmospheric forecast data...`,              delay: 900 },
  { log: ()  => `> [Groq LLM] Synthesising day-by-day itinerary...`,                 delay: 1000 },
];

async function animateSteps(query, onProgress) {
  for (let i = 0; i < STEP_LOGS.length; i++) {
    if (onProgress) onProgress({ stepIndex: i, statusLine: STEP_LOGS[i].log(query), allCompleted: false });
    await new Promise(r => setTimeout(r, STEP_LOGS[i].delay));
  }
}

async function callBackend(query) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 180_000); // 3 min timeout
  try {
    const res = await fetch('/api/travel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Server ${res.status}: ${errText}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') throw new Error('Request timed out after 3 minutes.');
    throw err;
  }
}

/**
 * Run animation and backend call concurrently.
 * The animation always finishes first — we then wait for the backend.
 */
export async function executeTravelPipeline(query, onProgress) {
  // Both run at the same time — animation is fast, backend is slow
  // We wait for BOTH to finish
  const [, backendRes] = await Promise.all([
    animateSteps(query, onProgress),
    callBackend(query),
  ]);

  if (onProgress) {
    onProgress({ stepIndex: 5, statusLine: '> [LangGraph] Pipeline complete. Rendering results...', allCompleted: true });
  }

  return backendRes;
}
