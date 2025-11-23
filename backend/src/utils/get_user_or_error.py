from fastapi.exceptions import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import User
from src.orm import UserRepository
from src.schemas import TokenDataSchema


async def get_user_from_token_or_error(
    token: TokenDataSchema,
    session: AsyncSession,
    status_code: int = 404,
    detail: str = "User not found.",
) -> User:
    """Функция для получения объекта пользователя из бд."""
    repo = UserRepository(session)
    user = await repo.get_user(token.user_email)
    if user is None:
        raise HTTPException(status_code=status_code, detail=detail)
    return user
