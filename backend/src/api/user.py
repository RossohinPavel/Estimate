from fastapi import APIRouter, Depends

from src.core import get_base_session
from src.schemas import TokenDataSchema, UserSchema
from src.utils.get_user_or_error import get_user_from_token_or_error

from .middleware import validate_token


router = APIRouter(prefix="/user")


@router.get("", response_model=UserSchema)
async def get_user(
    token: TokenDataSchema = Depends(validate_token()), session=Depends(get_base_session)
):
    """Получение информации о пользователе"""
    return await get_user_from_token_or_error(token, session)
