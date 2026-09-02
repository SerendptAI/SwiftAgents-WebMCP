import { TOOL_NAMES } from "./tools.js";

// Only the "refund policy" transcript is specified in the Figma design; the
// other three are written to match its shape.
export const tryItQuestions = [
  {
    id: "api-keys",
    label: "Where do I find my API keys?",
    call: `agent.call('${TOOL_NAMES.navigationMap}')`,
    status: "→ reading navigation graph…",
    result: "Settings → Developer → API Keys. Two routes deep from the dashboard root.",
  },
  {
    id: "visitors",
    label: "Show me last week's visitors",
    call: `agent.call('${TOOL_NAMES.recentVisitors}', { window: '7d' })`,
    status: "→ fetching recent visitors…",
    result: "1,284 unique visitors across 7 days. 63% returning, peak on Thursday.",
  },
  {
    id: "wallet",
    label: "Check wallet 0x4f2a...9c1d",
    call: "agent.call('swiftagents_diagnose_wallet', { address: '0x4f2a...9c1d' })",
    status: "→ resolving on-chain activity…",
    result: "Wallet resolved. 42 transactions, last active 3 days ago, no failed transfers.",
  },
  {
    id: "refund-policy",
    label: "What's the refund policy?",
    call: `agent.call('${TOOL_NAMES.knowledgeBase}', { q: 'refund policy' })`,
    status: "→ running semantic search…",
    result: "Refunds are processed within 5 business days of a request.",
  },
];

export const defaultQuestionId = "refund-policy";
