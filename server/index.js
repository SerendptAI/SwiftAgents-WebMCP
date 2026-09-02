import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import "dotenv/config";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");

const PORT = Number(process.env.PORT) || 8001;
const SWIFTAGENT_API_URL =
  process.env.SWIFTAGENT_API_URL || "http://localhost:8000/api/v1";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

function proxyHeaders(req) {
  return {
    "X-API-Key": req.get("X-API-Key") || process.env.BEARER_TOKEN || "",
    "Content-Type": "application/json",
  };
}

async function callSwiftAgents(req, { endpoint, timeout, body }) {
  const response = await fetch(`${SWIFTAGENT_API_URL}${endpoint}`, {
    method: body ? "POST" : "GET",
    headers: proxyHeaders(req),
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(timeout),
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Mirrors the FastAPI proxy: failures resolve with an { error } payload rather
// than a non-200, so the WebMCP tool always has something to hand the agent.
app.get("/api/proxy/stats", async (req, res) => {
  try {
    res.json(await callSwiftAgents(req, { endpoint: "/webmcp/stats", timeout: 30_000 }));
  } catch (error) {
    res.json({ error: String(error.message ?? error), fallback: true });
  }
});

app.get("/api/proxy/navigation", async (req, res) => {
  try {
    res.json(await callSwiftAgents(req, { endpoint: "/webmcp/navigation", timeout: 20_000 }));
  } catch (error) {
    res.json({ error: String(error.message ?? error) });
  }
});

app.get("/api/proxy/visitors", async (req, res) => {
  try {
    res.json(await callSwiftAgents(req, { endpoint: "/webmcp/visitors", timeout: 30_000 }));
  } catch (error) {
    res.json({ error: String(error.message ?? error) });
  }
});

app.post("/api/proxy/query", async (req, res) => {
  const { query } = req.body ?? {};
  if (typeof query !== "string" || !query.trim()) {
    return res.status(422).json({ error: "Field 'query' is required and must be a string." });
  }
  try {
    res.json(
      await callSwiftAgents(req, { endpoint: "/webmcp/query", timeout: 20_000, body: { query } }),
    );
  } catch (error) {
    res.json({ error: String(error.message ?? error) });
  }
});

// In development Vite serves the page and proxies /api here, so dist may not exist yet.
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get(/.*/, (_req, res) => res.sendFile(path.join(DIST_DIR, "index.html")));
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SwiftAgents WebMCP proxy listening on http://0.0.0.0:${PORT}`);
  console.log(`Forwarding to ${SWIFTAGENT_API_URL}`);
});
