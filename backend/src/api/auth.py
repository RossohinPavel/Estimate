from fastapi import APIRouter, Depends

from src.orm import UserRepository
from src.schemas import CreateUserSchema
from src.utils import get_password_hash, logger

from .dependencies import get_user_repository


router = APIRouter(prefix="/auth")


@router.post("/sign_up", status_code=200, response_model=CreateUserSchema)
async def sign_up(new_user: CreateUserSchema, repo: UserRepository = Depends(get_user_repository)):
    """Создаем нового пользователя"""
    user = await repo.create_user(new_user.email, get_password_hash(new_user.password))
    logger.info(f"User with email = {new_user.email} was created")
    return user
