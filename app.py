from pathlib import Path
import traceback
import uvicorn
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend import runTravelAgent

app = FastAPI(title="RoamOS API", version="1.0.0")

# Allow Vite dev server (port 3000) to talk to FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TravelRequest(BaseModel):
    message:str
    thread_id: str | None = None


@app.get("/health")
async def health():
    """Health check endpoint polled by the frontend status bar."""
    return {
        "status": "ok",
        "api": "live",
        "db_status": "connected",
        "llm": "groq/llama-3"
    }


@app.post("/api/travel")
async def travel(req: TravelRequest):
    """
    Main orchestration endpoint.
    Runs the full LangGraph multi-agent pipeline:
      flightAgent → HotelAgent → itineraryAgent → finalAgent
    Returns all intermediate results plus the final formatted response.
    """
    try:
        result = runTravelAgent(query=req.message, thread_id=req.thread_id)
        return JSONResponse(content=result)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)