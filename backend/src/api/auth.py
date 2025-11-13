from fastapi import APIRouter, Depends

from src import services
from src.core import get_base_session
from src.schemas import CreateUserSchema, TokenSchema


router = APIRouter(prefix="/auth")


@router.post("/sign_up", status_code=200, response_model=TokenSchema)
async def sign_up(new_user: CreateUserSchema, session=Depends(get_base_session)):
    """Создаем нового пользователя"""
    refresh_token, access_token = await services.auth.create_user(new_user, session)
    return TokenSchema(refresh_token=refresh_token, access_token=access_token)
