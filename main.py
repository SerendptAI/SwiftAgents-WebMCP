from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import uvicorn
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="SwiftAgents WebMCP Proxy Site")

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

def get_proxy_headers(request: Request):
    auth_header = request.headers.get("X-API-Key")
    if not auth_header:
        auth_header = os.environ.get('BEARER_TOKEN', '')
    
    return {
        "X-API-Key": auth_header,
        "Content-Type": "application/json"
    }

@app.get("/api/proxy/stats")
async def proxy_get_stats(request: Request):
    headers = get_proxy_headers(request)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{SWIFTAGENT_API_URL}/webmcp/stats",
                headers=headers,
                timeout=10.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e), "fallback": True}

@app.get("/api/proxy/navigation")
async def proxy_navigation(request: Request):
    headers = get_proxy_headers(request)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{SWIFTAGENT_API_URL}/webmcp/navigation",
                headers=headers,
                timeout=20.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}

@app.get("/api/proxy/visitors")
async def proxy_visitors(request: Request):
    headers = get_proxy_headers(request)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{SWIFTAGENT_API_URL}/webmcp/visitors",
                headers=headers,
                timeout=10.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}

class DiagnoseRequest(BaseModel):
    tx_hash: str
    chain: str

@app.post("/api/proxy/diagnose")
async def proxy_diagnose(req: DiagnoseRequest, request: Request):
    headers = get_proxy_headers(request)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{SWIFTAGENT_API_URL}/webmcp/diagnose",
                headers=headers,
                json={"tx_hash": req.tx_hash, "chain": req.chain},
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}

class QueryRequest(BaseModel):
    query: str

@app.post("/api/proxy/query")
async def proxy_query_docs(req: QueryRequest, request: Request):
    headers = get_proxy_headers(request)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{SWIFTAGENT_API_URL}/webmcp/query",
                headers=headers,
                json={"query": req.query},
                timeout=20.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
