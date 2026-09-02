// Simulates an AI agent calling each WebMCP tool through the local proxy.
// Usage: npm run test:tools   (with `npm run dev` or `npm start` already running)

const BASE_URL = process.env.BASE_URL || "http://localhost:8001/api/proxy";

console.log("--- SwiftAgents WebMCP Agent Simulation ---");
console.log(`Connecting to proxy at ${BASE_URL}...\n`);

async function testTool(toolName, method, endpoint, payload) {
  console.log(`[*] Agent Calling Tool: ${toolName}`);
  const start = Date.now();
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: payload ? { "Content-Type": "application/json" } : undefined,
      body: payload ? JSON.stringify(payload) : undefined,
    });
    const duration = (Date.now() - start) / 1000;
    console.log(`    Status: ${response.status} (${duration.toFixed(2)}s)`);

    let text = await response.text();
    if (text.length > 300) text = `${text.slice(0, 300)}... [truncated]`;
    console.log(`    Result: ${text}\n`);
  } catch (error) {
    console.log(`    Error: ${error.message}\n`);
  }
}

await testTool("swiftagents_get_dashboard_stats", "GET", "/stats");
await testTool("swiftagents_get_navigation_map", "GET", "/navigation");
await testTool("swiftagents_get_recent_visitors", "GET", "/visitors");
await testTool("swiftagents_query_knowledge_base", "POST", "/query", {
  query: "How do I install the SDK?",
});

console.log("--- Simulation Complete ---");
