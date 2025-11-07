from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException

from src.orm import InfoRepository
from src.schemas import CreateInfoSchema, InfoSchema
from src.utils import logger

from .dependencies import get_info_repository


router = APIRouter(prefix="/info")


responses: dict = {
    404: {
        "description": "Элемент не найден",
        "content": {"application/json": {"example": {"detail": "Item not found"}}},
    }
}


@router.get("/latest", responses=responses, response_model=InfoSchema)
async def get_latest_update(repo: InfoRepository = Depends(get_info_repository)):
    """Возвращает запись о последнем обновлении приложения."""
    result = await repo.get_latest_update()
    if result is None:
        raise HTTPException(404, "Item not found")
    return result


@router.get("/", response_model=list[InfoSchema])
async def get_updates(repo: InfoRepository = Depends(get_info_repository)):
    """Возвращает записи об обновлени приложения с сортировкой от поздней к ранней с пагинацией."""
    return await repo.get_updates()


@router.post("/", response_model=InfoSchema)
async def create_update(
    new_update: CreateInfoSchema, repo: InfoRepository = Depends(get_info_repository)
):
    """Создает новую запись об обновлении и возвращает ее."""
    info = await repo.create_update(new_update)
    logger.debug(f"Created new Info record. {info}")
    return info
