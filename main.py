from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import uvicorn
import os
import httpx
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

app = FastAPI(title="SwiftAgents WebMCP Proxy Site")

# Enable CORS so widgets on any domain can call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("static", exist_ok=True)
os.makedirs("templates", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

SWIFTAGENT_API_URL = os.environ.get("SWIFTAGENT_API_URL", "http://localhost:8000/api/v1")

@app.get("/")
def read_root():
    return FileResponse("templates/index.html")

# Helper to extract auth and company ID from incoming requests
def get_proxy_headers(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        # Fallback to .env for the local test site if headers are missing
        auth_header = f"Bearer {os.environ.get('BEARER_TOKEN', '')}"
    
    return {
        "Authorization": auth_header,
        "Content-Type": "application/json"
    }

def get_company_id(request: Request, body_company_id: Optional[str] = None):
    # Try header, then body, then .env fallback
    cid = request.headers.get("X-Company-Id") or body_company_id or os.environ.get("COMPANY_ID")
    if not cid:
        raise HTTPException(status_code=400, detail="Company ID missing")
    return cid

# 1. Proxy: Dashboard Stats
@app.get("/api/proxy/stats")
async def proxy_get_stats(request: Request):
    headers = get_proxy_headers(request)
    company_id = get_company_id(request)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{SWIFTAGENT_API_URL}/dashboard/{company_id}/stats",
                headers=headers,
                timeout=10.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "fallback_data": {"total_chats": 142, "resolved_tickets": 89, "active_visitors": 12}}

# 2. Proxy: Dashboard Find (Stroll)
class FindRequest(BaseModel):
    query: str
    company_id: Optional[str] = None

@app.post("/api/proxy/find")
async def proxy_find_stroll(req: FindRequest, request: Request):
    headers = get_proxy_headers(request)
    company_id = get_company_id(request, req.company_id)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{SWIFTAGENT_API_URL}/stroll/{company_id}/find",
                headers=headers,
                json={"query": req.query},
                timeout=20.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "fallback_data": {"location": "Settings > Billing", "steps": ["Click Settings", "Select Billing tab"]}}

# 3. Proxy: Diagnose Crypto Tx
class DiagnoseRequest(BaseModel):
    tx_hash: str
    chain: str

@app.post("/api/proxy/diagnose")
async def proxy_diagnose(req: DiagnoseRequest, request: Request):
    headers = get_proxy_headers(request)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{SWIFTAGENT_API_URL}/diagnosis/",
                headers=headers,
                json={"tx_hash": req.tx_hash, "chain": req.chain},
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "fallback_data": {"overall_severity": "critical", "issues": [{"issue": "Out of Gas", "explanation": "The transaction ran out of gas before completing."}]}}

# 4. Proxy: Knowledge Query
class QueryRequest(BaseModel):
    query: str
    company_id: Optional[str] = None

@app.post("/api/proxy/query")
async def proxy_query_docs(req: QueryRequest, request: Request):
    headers = get_proxy_headers(request)
    company_id = get_company_id(request, req.company_id)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{SWIFTAGENT_API_URL}/knowledge/query",
                headers=headers,
                json={"company_id": company_id, "query": req.query},
                timeout=20.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "fallback_data": {"answer": "To integrate the SDK, run npm install @swiftagents/sdk and initialize with your API key."}}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
