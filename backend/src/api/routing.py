from fastapi import APIRouter
from .app import router
from .auth import router as auth_router


api_router = APIRouter(prefix='/api', tags=['api'])
api_router.include_router(auth_router)


app_router = APIRouter(prefix="")
app_router.include_router(api_router)
app_router.include_router(router)
