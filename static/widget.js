// SwiftAgents WebMCP Widget Script
// This script simulates the widget embedding on a client's page and registers WebMCP tools.

(function() {
    console.log("SwiftAgents Widget Loaded.");

    // Feature detection for WebMCP
    if ("modelContext" in window.navigator) {
        console.log("WebMCP supported! Registering SwiftAgents tools...");

        // Tool 1: Check Order Status
        navigator.modelContext.registerTool({
            name: "swiftagents_check_order_status",
            description: "Checks the status of a customer's order by order number",
            inputSchema: {
                type: "object",
                properties: {
                    orderNumber: { type: "string", description: "The order number to check (e.g., 12345)" }
                },
                required: ["orderNumber"]
            },
            async execute({ orderNumber }) {
                console.log(`Executing check_order_status for ${orderNumber}`);
                const response = await fetch(`/api/order/${orderNumber}`);
                const result = await response.json();
                return { content: [{ type: "text", text: result.statusMessage }] };
            }
        });

        // Tool 2: Submit Support Ticket
        navigator.modelContext.registerTool({
            name: "swiftagents_submit_support_ticket",
            description: "Submits a new support ticket for the customer",
            inputSchema: {
                type: "object",
                properties: {
                    issue: { type: "string", description: "Description of the customer's issue" },
                    email: { type: "string", description: "Customer's email address" }
                },
                required: ["issue", "email"]
            },
            async execute({ issue, email }) {
                console.log(`Executing submit_support_ticket for ${email}`);
                const response = await fetch('/api/ticket', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ issue, email })
                });
                const result = await response.json();
                return { content: [{ type: "text", text: result.message + ` (Ticket ID: ${result.ticketId})` }] };
            }
        });

        // Tool 3: Get FAQ Answer
        navigator.modelContext.registerTool({
            name: "swiftagents_get_faq_answer",
            description: "Searches the FAQ knowledge base for an answer",
            inputSchema: {
                type: "object",
                properties: {
                    query: { type: "string", description: "The question or topic to search for" }
                },
                required: ["query"]
            },
            async execute({ query }) {
                console.log(`Executing get_faq_answer for "${query}"`);
                const response = await fetch(`/api/faq?query=${encodeURIComponent(query)}`);
                const result = await response.json();
                return { content: [{ type: "text", text: result.answer }] };
            }
        });

        // Tool 4: Escalate to Human
        navigator.modelContext.registerTool({
            name: "swiftagents_escalate_to_human",
            description: "Escalates the conversation to a human support agent",
            inputSchema: {
                type: "object",
                properties: {
                    reason: { type: "string", description: "Reason for escalation" }
                },
                required: ["reason"]
            },
            async execute({ reason }) {
                console.log(`Executing escalate_to_human for reason: ${reason}`);
                const response = await fetch('/api/escalate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reason })
                });
                const result = await response.json();
                return { content: [{ type: "text", text: `${result.status} Agent Assigned: ${result.agentAssigned}` }] };
            }
        });

        console.log("SwiftAgents WebMCP tools registered successfully.");
    } else {
        console.warn("WebMCP is not supported in this browser. Tools will not be registered.");
    }
})();
