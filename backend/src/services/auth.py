import hashlib
from datetime import datetime, timedelta

import jwt
from sqlalchemy.ext.asyncio import AsyncSession

from src.core import settings
from src.orm import RefreshTokenRepository, UserRepository
from src.schemas import CreateUserSchema
from src.utils import logger


def get_password_hash(password: str) -> str:
    """Функция для хеширования пароля"""
    salted_password = f"{settings.PASSWORD_SALT}{password}"
    return hashlib.sha256(salted_password.encode()).hexdigest()


def get_token_hash(token: str) -> str:
    """Высчитываем хеш для токена"""
    return hashlib.sha256(token.encode()).hexdigest()


def create_token(email: str, expires_at: datetime, _type: str) -> str:
    """Создаем токен"""
    payload = {"email": email, "exp": expires_at, "type": _type}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


async def create_user(new_user: CreateUserSchema, session: AsyncSession) -> tuple[str, str]:
    """Создает пользователеля, генерирует для него пару acess и refresh токенов и возвращает их"""
    user_repo = UserRepository(session)
    token_repo = RefreshTokenRepository(session)
    password_hash = get_password_hash(new_user.password)
    async with session.begin():
        user = await user_repo.create_user(new_user.email, password_hash)
        await session.flush()
        rt_expires_at = user.created_at + timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS)
        refresh_token = create_token(user.email, rt_expires_at, "refresh")
        refresh_token_hash = get_token_hash(refresh_token)
        await token_repo.add_token(user.id, refresh_token_hash, rt_expires_at)
        ac_expires_at = user.created_at + timedelta(
            minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
        )
        access_token = create_token(user.email, ac_expires_at, "access")

    logger.info(f"User with email = {new_user.email} was created")
    return refresh_token, access_token
