<div align="center">
  <h1>SwiftAgents + WebMCP</h1>
  <p><b>Instantly expose your entire dashboard navigation, knowledge base, and live metrics to AI Agents with zero configuration.</b></p>
</div>

---

## What is SwiftAgents?

Before WebMCP, SwiftAgents was already a powerful, embeddable AI customer support platform. Companies use SwiftAgents to instantly deploy intelligent chat widgets to their websites. Behind the scenes, SwiftAgents powers these widgets with an advanced suite of tools:
- **Stroll AI Crawler:** Automatically maps and learns the layout of complex, authenticated SaaS dashboards.
- **Semantic Knowledge Base:** Performs RAG searches across private company documentation.
- **Live Analytics:** Real-time metrics on visitors and customer support tickets.

## The WebMCP Vision

AI agents are great at browsing public websites, but they are **completely blind** to the internal structure of complex dashboards, authenticated portals, and paywalled SaaS apps. If a user asks their AI, "Where is my API key on this dashboard?", the AI usually has to blindly click around, hallucinate, or fail entirely.

**We solved this by bringing SwiftAgents' backend power to WebMCP.**

When a company registers for SwiftAgents and embeds our standard chat widget on their website, we instantly inject a perfect, real-time "GPS Map" of their entire platform directly into the browser's `navigator.modelContext`. 

Any visiting AI agent (like ChatGPT) can now natively read the **Complete Dashboard Navigation Graph (NavGraph)**. The AI instantly knows exactly which pages exist, what data they contain, and the exact DOM nodes to click to navigate between them!

## The WebMCP Tool Suite

By simply embedding our widget, companies automatically expose 4 powerful WebMCP tools to any visiting AI:

1. **swiftagents_get_navigation_map (The Star of the Show)**
   - Returns our proprietary Stroll AI Crawler NavGraph. The AI instantly downloads a topological map of the entire dashboard, eliminating the need for the AI to "guess and check" how to navigate a complex SaaS platform.
2. **swiftagents_query_knowledge_base**
   - Performs a semantic RAG search across the company's private, uploaded documentation.
3. **swiftagents_get_dashboard_stats**
   - Fetches live analytical metrics (total chats, resolved tickets, active visitors).
4. **swiftagents_get_recent_visitors**
   - Returns a real-time list of who is currently browsing the company's website.

## How It Works

We designed this to be a **Zero-Configuration Rollout** for companies.

1. **The Setup:** A company registers on SwiftAgents and embeds our standard `<script>` tag on their website.
2. **The Magic:** The widget automatically detects if the user's browser supports WebMCP. If it does, it seamlessly registers the 4 tools into the DOM.
3. **The Execution:** When an external AI executes a tool, the widget securely bridges the request to the SwiftAgents infrastructure, returning rich, contextual data to the AI instantly.

There is no extra developer work required by the company. Just paste the script, and the site becomes fully AI-navigable.

## Repository Links

Our hackathon submission spans across our microservice architecture. Here is where the magic happens:

* **[SwiftAgent-be (Backend API & Router)](https://github.com/SerendptAI/SwiftAgent-be)** 
  * The backend infrastructure that securely processes WebMCP requests and interfaces with our Stroll Crawler and Knowledge Base.
* **[SwiftAgent-widget (Frontend Client)](https://github.com/SerendptAI/SwiftAgent-widget)** 
  * The React widget that dynamically detects the browser environment and registers the schemas into the WebMCP context.
* **[SwiftAgents-WebMCP (Demo Environment)](https://github.com/SerendptAI/SwiftAgents-WebMCP)** 
  * This repository! It contains our isolated test site used to validate the WebMCP DOM injection locally.

---

<div align="center">
  <i>Built for the WebMCP Hackathon</i>
</div>
