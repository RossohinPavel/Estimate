from fastapi import APIRouter, Depends, HTTPException

from src.core import get_base_session
from src.orm import UserRepository
from src.schemas import TokenDataSchema, UserSchema

from .middleware import validate_token


router = APIRouter(prefix="/user")


@router.get("/", response_model=UserSchema)
async def get_user(
    token: TokenDataSchema = Depends(validate_token()), session=Depends(get_base_session)
):
    """Получение информации о пользователе"""
    repo = UserRepository(session)
    user = await repo.get_user(token.email)
    if user is None:
        raise HTTPException(404, "User not found")
    return user
