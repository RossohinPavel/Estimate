import hashlib
from datetime import datetime, timedelta

import jwt
from sqlalchemy.ext.asyncio import AsyncSession

from src.core import settings
from src.orm import UserRepository
from src.schemas import CreateUserSchema
from src.utils import logger


def get_password_hash(password: str) -> str:
    """Функция для хеширования пароля"""
    salted_password = f"{settings.PASSWORD_SALT}{password}"
    return hashlib.sha256(salted_password.encode()).hexdigest()


def create_token(email: str, created_at: datetime, _type: str) -> str:
    """Создаем токен"""
    match _type:
        case "refresh":
            secret = settings.JWT_REFRESH_TOKEN_SECRET
            expires_at = created_at + timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS)
        case "access" | _:
            secret = settings.JWT_ACCESS_TOKEN_SECRET
            expires_at = created_at + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"email": email, "exp": expires_at, "type": _type}
    return jwt.encode(payload, secret, algorithm=settings.JWT_ALGORITHM)


async def create_user(new_user: CreateUserSchema, session: AsyncSession) -> tuple[str, str]:
    """Создает пользователеля, генерирует для него пару acess и refresh токенов и возвращает их"""
    user_repo = UserRepository(session)
    password_hash = get_password_hash(new_user.password)
    async with session.begin():
        user = await user_repo.create_user(new_user.email, password_hash)
        await session.flush()
        refresh_token = create_token(user.email, user.created_at, "refresh")
        access_token = create_token(user.email, user.created_at, "access")
        await session.rollback()

    logger.info(f"User with email = {new_user.email} was created")
    return refresh_token, access_token
