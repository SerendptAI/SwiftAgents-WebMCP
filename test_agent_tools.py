import requests
import json
import time

BASE_URL = "http://localhost:8001/api/proxy"

print("--- SwiftAgents WebMCP Agent Simulation ---")
print(f"Connecting to proxy at {BASE_URL}...\n")

def test_tool(tool_name, method, endpoint, payload=None):
    print(f"[*] Agent Calling Tool: {tool_name}")
    url = f"{BASE_URL}{endpoint}"
    try:
        start = time.time()
        if method.upper() == "GET":
            response = requests.get(url)
        else:
            response = requests.post(url, json=payload)
        
        duration = time.time() - start
        print(f"    Status: {response.status_code} ({duration:.2f}s)")
        
        # Truncate output if it's too long for readability
        resp_text = response.text
        if len(resp_text) > 300:
            resp_text = resp_text[:300] + "... [truncated]"
            
        print(f"    Result: {resp_text}\n")
    except Exception as e:
        print(f"    Error: {e}\n")

# Tool 1: Dashboard Stats
test_tool("swiftagents_get_dashboard_stats", "GET", "/stats")

# Tool 2: Navigation Map
test_tool("swiftagents_get_navigation_map", "GET", "/navigation")

# Tool 3: Recent Visitors
test_tool("swiftagents_get_recent_visitors", "GET", "/visitors")

# Tool 4: Knowledge Query
test_tool("swiftagents_query_knowledge_base", "POST", "/query", payload={"query": "How do I install the SDK?"})

# Tool 5: Diagnose Crypto Tx

print("--- Simulation Complete ---")
