// SwiftAgents WebMCP Real API Widget Script

(function() {
    console.log("SwiftAgents Widget Loaded (Real API version).");

    if ("modelContext" in window.navigator) {
        console.log("WebMCP supported! Registering SwiftAgents tools...");

        // Tool 1: Blockchain Diagnosis
        navigator.modelContext.registerTool({
                const result = await response.json();
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
        });

        // Tool 2: Knowledge Base Query
        navigator.modelContext.registerTool({
            name: "swiftagents_query_knowledge_base",
            description: "Semantically searches the company's knowledge base for documentation and answers",
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

        // Tool 3: Dashboard Navigation Map
        navigator.modelContext.registerTool({
            name: "swiftagents_get_navigation_map",
            description: "Fetches the master Navigation Graph (NavGraph) showing all pages and interactions available on the company dashboard",
            inputSchema: {
                type: "object",
                properties: {}
            },
            async execute() {
                console.log(`Executing get_navigation_map`);
                const response = await fetch('/api/proxy/navigation');
                const result = await response.json();
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
        });

        // Tool 4: Dashboard Stats
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

        // Tool 5: Recent Visitors
        navigator.modelContext.registerTool({
            name: "swiftagents_get_recent_visitors",
            description: "Fetches a list of the most recent visitors to the customer's website",
            inputSchema: {
                type: "object",
                properties: {}
            },
            async execute() {
                console.log("Executing get_recent_visitors");
                const response = await fetch('/api/proxy/visitors');
                const result = await response.json();
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }
        });

        console.log("SwiftAgents WebMCP tools registered successfully.");
    } else {
        console.warn("WebMCP is not supported in this browser. Tools will not be registered.");
    }
})();
