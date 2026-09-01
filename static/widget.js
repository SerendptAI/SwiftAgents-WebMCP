// SwiftAgents WebMCP Real API Widget Script

(function() {
    console.log("SwiftAgents Widget Loaded (Real API version).");

    if ("modelContext" in window.navigator) {
        console.log("WebMCP supported! Registering SwiftAgents tools...");

        // Tool 1: Dashboard Stats
        navigator.modelContext.registerTool({
            name: "swiftagents_get_dashboard_stats",
            description: "Fetches live analytics and statistics from the SwiftAgents dashboard",
            inputSchema: {
                type: "object",
                properties: {}
            },
            async execute() {
                console.log("Executing get_dashboard_stats");
                const response = await fetch('/api/proxy/stats');
                const result = await response.json();
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
        });

        // Tool 2: Stroll Find
        navigator.modelContext.registerTool({
            name: "swiftagents_find_on_dashboard",
            description: "Uses the AI crawler to find where a specific feature or page is located on the dashboard",
            inputSchema: {
                type: "object",
                properties: {
                    query: { type: "string", description: "What to find (e.g., 'billing page' or 'API keys')" }
                },
                required: ["query"]
            },
            async execute({ query }) {
                console.log(`Executing find_on_dashboard for: ${query}`);
                const response = await fetch('/api/proxy/find', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });
                const result = await response.json();
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
        });

        // Tool 3: Diagnose Crypto Tx
        navigator.modelContext.registerTool({
            name: "swiftagents_diagnose_crypto_tx",
            description: "Diagnoses a blockchain transaction hash for errors or status across EVM and BTC chains",
            inputSchema: {
                type: "object",
                properties: {
                    tx_hash: { type: "string", description: "The transaction hash" },
                    chain: { type: "string", description: "The blockchain network (e.g., 'ethereum', 'bitcoin', 'polygon')" }
                },
                required: ["tx_hash", "chain"]
            },
            async execute({ tx_hash, chain }) {
                console.log(`Executing diagnose_crypto_tx for ${tx_hash} on ${chain}`);
                const response = await fetch('/api/proxy/diagnose', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tx_hash, chain })
                });
                const result = await response.json();
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
        });

        // Tool 4: Knowledge Query
        navigator.modelContext.registerTool({
            name: "swiftagents_query_knowledge_base",
            description: "Semantically searches the SwiftAgents knowledge base for documentation and answers",
            inputSchema: {
                type: "object",
                properties: {
                    query: { type: "string", description: "The search query" }
                },
                required: ["query"]
            },
            async execute({ query }) {
                console.log(`Executing query_knowledge_base for: ${query}`);
                const response = await fetch('/api/proxy/query', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });
                const result = await response.json();
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
        });

        console.log("SwiftAgents WebMCP tools registered successfully.");
    } else {
        console.warn("WebMCP is not supported in this browser. Tools will not be registered.");
    }
})();
