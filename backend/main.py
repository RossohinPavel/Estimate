from typing import Literal
from fastapi import FastAPI

from src.api import router as api_router


app = FastAPI(title="EstimateAPI", summary="API для приложения по составлению смет")
app.include_router(api_router)


@app.get("/ping", status_code=200, tags=["ping"])
async def ping() -> Literal["pong"]:
    """Пинг сервиса"""
    return "pong"
