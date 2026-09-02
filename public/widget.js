// SwiftAgents WebMCP Real API Widget Script
//
// Standalone drop-in: a company pastes this one <script> tag on their site and
// every visiting AI agent gains the SwiftAgents tool suite. It deliberately has
// no build step and no framework dependency.

(function () {
  console.log("SwiftAgents Widget Loaded (Real API version).");

  var TOOLS = [
    {
      name: "swiftagents_get_navigation_map",
      description:
        "Fetches the master Navigation Graph (NavGraph) showing all pages and interactions available on the company dashboard",
      inputSchema: { type: "object", properties: {} },
      request: function () {
        return ["/api/proxy/navigation", undefined];
      },
    },
    {
      name: "swiftagents_query_knowledge_base",
      description:
        "Semantically searches the company's knowledge base for documentation and answers",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "The search query" },
        },
        required: ["query"],
      },
      request: function (args) {
        return [
          "/api/proxy/query",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: args.query }),
          },
        ];
      },
    },
    {
      name: "swiftagents_get_dashboard_stats",
      description: "Fetches live analytics and statistics from the SwiftAgents dashboard",
      inputSchema: { type: "object", properties: {} },
      request: function () {
        return ["/api/proxy/stats", undefined];
      },
    },
    {
      name: "swiftagents_get_recent_visitors",
      description: "Fetches a list of the most recent visitors to the customer's website",
      inputSchema: { type: "object", properties: {} },
      request: function () {
        return ["/api/proxy/visitors", undefined];
      },
    },
  ];

  function toExecutor(tool) {
    return async function execute(args) {
      console.log("Executing " + tool.name, args || {});
      var call = tool.request(args || {});
      try {
        var response = await fetch(call[0], call[1]);
        var result = await response.json();
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return {
          content: [{ type: "text", text: JSON.stringify({ error: String(error) }, null, 2) }],
          isError: true,
        };
      }
    };
  }

  // The demo page reads this to report what really got registered.
  window.__swiftagents = { registeredTools: [] };

  function registerTools() {
    if (!("modelContext" in window.navigator)) {
      return false;
    }

    console.log("WebMCP supported! Registering SwiftAgents tools...");

    TOOLS.forEach(function (tool) {
      navigator.modelContext.registerTool({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
        execute: toExecutor(tool),
      });
      window.__swiftagents.registeredTools.push(tool.name);
    });

    console.log("SwiftAgents WebMCP tools registered successfully.");
    window.dispatchEvent(new CustomEvent("swiftagents:webmcp-ready"));
    return true;
  }

  if (!registerTools()) {
    console.warn("WebMCP not detected immediately. Waiting for injection...");
    var attempts = 0;
    var interval = setInterval(function() {
      attempts++;
      if (registerTools()) {
        clearInterval(interval);
      } else if (attempts >= 20) {
        console.warn("WebMCP is not supported in this browser. Tools will not be registered.");
        clearInterval(interval);
      }
    }, 100);
  }
})();
