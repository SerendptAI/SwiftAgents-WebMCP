from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import uvicorn
import os

app = FastAPI(title="SwiftAgents WebMCP Demo Mock API")

# Ensure static and templates directory exists
os.makedirs("static", exist_ok=True)
os.makedirs("templates", exist_ok=True)

# Mount static files (will hold our widget.js)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return FileResponse("templates/index.html")

# Mock Endpoints for WebMCP Tools

class OrderResponse(BaseModel):
    statusMessage: str

@app.get("/api/order/{order_number}", response_model=OrderResponse)
def check_order_status(order_number: str):
    if order_number.startswith("123"):
        return OrderResponse(statusMessage=f"Order {order_number} has shipped and will arrive tomorrow.")
    return OrderResponse(statusMessage=f"Order {order_number} is processing.")

class TicketRequest(BaseModel):
    issue: str
    email: str

class TicketResponse(BaseModel):
    ticketId: str
    message: str

@app.post("/api/ticket", response_model=TicketResponse)
def submit_support_ticket(ticket: TicketRequest):
    return TicketResponse(
        ticketId="TKT-8992",
        message=f"Ticket created for {ticket.email}. We will look into: '{ticket.issue}'"
    )

class FAQResponse(BaseModel):
    answer: str

@app.get("/api/faq", response_model=FAQResponse)
def get_faq_answer(query: str):
    return FAQResponse(answer="To reset your password, click the 'Forgot Password' link on the login page.")

class EscalateRequest(BaseModel):
    reason: str

class EscalateResponse(BaseModel):
    status: str
    agentAssigned: bool

@app.post("/api/escalate", response_model=EscalateResponse)
def escalate_to_human(req: EscalateRequest):
    return EscalateResponse(status="Escalated successfully.", agentAssigned=True)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
