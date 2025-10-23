from typing import Literal
from fastapi import FastAPI


app = FastAPI(title="EstimateAPI", summary="API для приложения по составлению смет")


@app.get("/ping", status_code=200, tags=["ping"])
async def ping() -> Literal["pong"]:
    """Пинг сервиса"""
    return "pong"


async def test():
    """some doc"""
    pass
