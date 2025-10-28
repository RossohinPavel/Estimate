from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from .dependencies import get_info_repository
from src.orm import InfoRepository
from src.schemas import InfoSchema


router = APIRouter(prefix="/info")


responses: dict = {
    404: {
        "description": "Элемент не найден",
        "content": {"application/json": {"example": {"detail": "Item not found"}}},
    }
}


@router.get("/latest_update", responses=responses, response_model=InfoSchema)
async def get_latest_update(repo: InfoRepository = Depends(get_info_repository)):
    """Возвращает запись о последнем обновлении приложения."""
    result = await repo.get_latest_update()
    if result is None:
        raise HTTPException(404, "Item not found")
    return result


@router.get("/")
async def get_updates() -> str:
    """Возвращает записи об обновлени приложения с сортировкой от поздней к ранней с пагинацией."""
    return "latest_update list"
