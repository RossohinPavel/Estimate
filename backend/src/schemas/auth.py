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


class TokenSchema(BaseModel):
    """Схема ответа для токенов приложения"""

    refresh_token: str
    access_token: str


class RefreshTokenSchema(BaseModel):
    """Схема для обновления токена"""

    token: str
