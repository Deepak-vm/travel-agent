from pathlib import Path
import traceback
import uvicorn
from fastapi import FastAPI , Request , HTTPException
from fastapi.responses import HTMLResponse , JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel 
from backend import runTravelAgent

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()

app.mount("/static" , StaticFiles(directory= str(BASE_DIR / "static")) , name="static")

template = Jinja2Templates(directory= str(BASE_DIR / "templates"))


class TravelRequest(BaseModel):
    message:str
    thread_id: str | None = None

@app.get("/" ,response_class= HTMLResponse)
async def home(request:Request):
    return template.TemplateResponse("index.html" , {"request":request})