from datetime import datetime

from pydantic import BaseModel, field_validator


class AuthUserSchema(BaseModel):
    """Схема, которая используется при авторизации пользователя"""

    email: str
    password: str

    @field_validator("email", mode="before")
    @classmethod
    def validate_email(cls, email: str) -> str:
        """Функция валидации ящика пользователя на бэкенде."""
        return email

    @field_validator("password", mode="before")
    @classmethod
    def validate_password(cls, password: str) -> str:
        """Логика валидации пароля"""
        return password


class TokenDataSchema(BaseModel):
    """Схема токена"""

    user_id: int
    user_email: str
    exp: datetime
    type: str


class AccessTokenSchema(BaseModel):
    """Схема аксесс токена"""

    accessToken: str  # Сразу используем camelCase и не будем вызывать какие-то трансформации.
    tokenType: str


class RefreshTokenSchema(BaseModel):
    """Схема рефреш токена"""

    refreshToken: str
    tokenType: str
