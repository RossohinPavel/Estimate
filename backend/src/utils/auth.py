import hashlib
from datetime import datetime, timedelta

import jwt

from src.core import settings


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


def parse_refresh_token(token: str) -> dict:
    """Парсим рефреш токен"""
    try:
        payload = jwt.decode(
            token, settings.JWT_REFRESH_TOKEN_SECRET, algorithms=[settings.JWT_ALGORITHM]
        )
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")
    if payload.get("type", None) != "refresh":
        raise ValueError("Invalid token type")
    if payload.get("email", None) is None:
        raise ValueError("Invalid token")
    return payload
