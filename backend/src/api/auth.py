from fastapi import APIRouter
from src.schemas import CreateUserSchema


router = APIRouter(prefix="/auth")


@router.post('/sign_up', status_code=200)
async def sign_up(new_user: CreateUserSchema) -> bool:
    """Создаем нового пользователя"""
    return True;