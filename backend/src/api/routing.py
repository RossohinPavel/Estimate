from fastapi import APIRouter

from .info import router as info_router


router = APIRouter(prefix="/api", tags=["api"])
router.include_router(info_router)
