from fastapi import APIRouter

from .app import router
from .auth import router as auth_router
from .estimate import router as estimate_router
from .user import router as user_router


api_router = APIRouter(prefix="/api", tags=["api"])
api_router.include_router(auth_router)
api_router.include_router(estimate_router)
api_router.include_router(user_router)

app_router = APIRouter(prefix="")
app_router.include_router(api_router)
app_router.include_router(router)
