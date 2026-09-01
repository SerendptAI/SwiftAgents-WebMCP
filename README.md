<div align="center">
  <h1>🚀 SwiftAgents + WebMCP</h1>
  <p><b>Instantly expose your entire dashboard navigation, knowledge base, and live metrics to AI Agents with zero configuration.</b></p>
</div>

---

## 💡 The Vision

AI agents are great at browsing public websites, but they are **completely blind** to the internal structure of complex dashboards, authenticated portals, and paywalled SaaS apps. If a user asks their AI, *"Where is my API key on this dashboard?"*, the AI usually has to blindly click around, hallucinate, or fail entirely.

**We solved this.** 

When a company registers for SwiftAgents and embeds our standard chat widget on their website, we instantly inject a perfect, real-time "GPS Map" of their entire platform directly into the browser's `navigator.modelContext`. 

Any visiting AI agent (like ChatGPT) can now natively read the **Complete Dashboard Navigation Graph (NavGraph)**. The AI instantly knows exactly which pages exist, what data they contain, and the exact DOM nodes to click to navigate between them!

## 🛠️ The WebMCP Tool Suite

By simply embedding our widget, companies automatically expose 5 powerful WebMCP tools to any visiting AI:

1. 🗺️ **`swiftagents_get_navigation_map` (The Star of the Show)**
   - Returns our proprietary Stroll AI Crawler `NavGraph`. The AI instantly downloads a topological map of the entire dashboard, eliminating the need for the AI to "guess and check" how to navigate a complex SaaS platform.
2. 🧠 **`swiftagents_query_knowledge_base`**
   - Performs a semantic RAG search across the company's private, uploaded documentation.
3. 📊 **`swiftagents_get_dashboard_stats`**
   - Fetches live analytical metrics (total chats, resolved tickets, active visitors).
4. 👥 **`swiftagents_get_recent_visitors`**
   - Returns a real-time list of who is currently browsing the company's website.
5. ⛓️ **`swiftagents_diagnose_crypto_tx`**
   - Deep, on-chain transaction analysis for web3 platforms.

## 🏗️ How It Works (Architecture)

We designed this to be a **Zero-Configuration Rollout**.

1. **The Setup:** A company embeds `<script src="swiftagents-widget.js">` on their site. That's it.
2. **The Client-Side:** The widget detects if the user's browser supports WebMCP. If it does, it seamlessly registers the 5 tools into the DOM.
3. **The Secure Bridge:** When an AI executes a tool, the widget intercepts it and sends the request to our native `/webmcp` router on the `SwiftAgent-be` backend. 
4. **The Security:** It authenticates natively using the company's strictly-scoped SDK `X-API-Key` injected into the widget. **No OAuth flows, no messy auth handshakes, and no exposed user JWTs.** 

## 🔗 Repository Links (Judges, start here!)

Our hackathon submission spans across our microservice architecture. Here is where the magic happens:

* 🖥️ **[SwiftAgent-be (Backend API & Router)](#)** 
  * *What to look for:* The `app/api/routers/webmcp.py` router. This is where we securely bridge the SDK API Keys to our internal `stroll_service` (Crawler) and `knowledge_service` (RAG).
* ⚛️ **[SwiftAgent-widget (Frontend Client)](#)** 
  * *What to look for:* The `useWebMCP.ts` hook. This is where the widget dynamically detects the browser environment and registers the schemas into `navigator.modelContext`.
* 🧪 **[SwiftAgents-WebMCP (Demo Environment)](#)** 
  * *What to look for:* This repository! It contains our isolated test site (`index.html` and `widget.js`) used to validate the WebMCP DOM injection locally.

---

<div align="center">
  <i>Built with ❤️ for the WebMCP Hackathon</i>
</div>
