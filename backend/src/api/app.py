from typing import Literal

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.core import get_base_session
from src.orm import InfoRepository
from src.schemas import CreateInfoSchema, InfoSchema
from src.utils.logger import logger


router = APIRouter(prefix="", tags=["app"])


@router.get("/ping", status_code=200)
async def ping() -> Literal["pong"]:
    """Пинг сервиса"""
    return "pong"


responses: dict = {
    404: {
        "description": "Элемент не найден",
        "content": {"application/json": {"example": {"detail": "Item not found"}}},
    }
}


@router.get("/info", response_model=list[InfoSchema])
async def get_updates(session: AsyncSession = Depends(get_base_session)):
    """Возвращает записи об обновлени приложения с сортировкой от поздней к ранней с пагинацией."""
    info_repo = InfoRepository(session)
    return await info_repo.get_updates()


@router.post("/info", response_model=InfoSchema)
async def create_update(
    new_update: CreateInfoSchema, session: AsyncSession = Depends(get_base_session)
):
    """Создает новую запись об обновлении и возвращает ее."""
    info_repo = InfoRepository(session)
    info = await info_repo.create_update(new_update)
    logger.debug(f"Created new Info record. {info}")
    return info


@router.get("/info/latest", responses=responses, response_model=InfoSchema)
async def get_latest_update(session: AsyncSession = Depends(get_base_session)):
    """Возвращает запись о последнем обновлении приложения."""
    info_repo = InfoRepository(session)
    result = await info_repo.get_latest_update()
    if result is None:
        raise HTTPException(404, "Item not found")
    return result
