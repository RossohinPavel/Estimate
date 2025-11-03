from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import router as api_router
from src.utils import wait_db_connection


app = FastAPI(title="EstimateAPI", summary="API для приложения по составлению смет")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_event_handler("startup", wait_db_connection)

app.include_router(api_router)


@app.get("/ping", status_code=200, tags=["ping"])
async def ping() -> Literal["pong"]:
    """Пинг сервиса"""
    return "pong"
