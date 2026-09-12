from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import FrictionEvent

app = FastAPI(
    title="AuraGen Backend",
    description="Backend API for AuraGen Self-Healing Generative UI",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "project": "AuraGen",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }


@app.post("/friction-events")
def receive_friction_event(event: FrictionEvent):
    return {
        "status": "received",
        "event": event,
    }