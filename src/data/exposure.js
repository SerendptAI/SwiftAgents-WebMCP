import { TOOL_NAMES } from "./tools.js";

// `wide` cards take a full row on their own, matching the Figma grid.
export const exposureCards = [
  {
    id: "stroll",
    title: "Stroll AI Crawler",
    description:
      "Returns our proprietary Stroll AI Crawler NavGraph: a topological map of the entire dashboard, so the AI doesn't have to guess and check how to navigate a complex SaaS platform.",
    tools: [TOOL_NAMES.navigationMap],
  },
  {
    id: "knowledge-base",
    title: "Semantic Knowledge Base",
    description:
      "Performs a semantic RAG search across the company's private, uploaded documentation.",
    tools: [TOOL_NAMES.knowledgeBase],
  },
  {
    id: "analytics",
    title: "Live Analytics",
    description: "Fetches live analytics: total chats, resolved tickets, active visitors.",
    tools: [TOOL_NAMES.dashboardStats, TOOL_NAMES.recentVisitors],
    wide: true,
  },
];
