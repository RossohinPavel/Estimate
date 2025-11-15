from datetime import timedelta, timezone

from pydantic import Field, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Настройки приложения, подхваченные из виртуального окружения и секретов."""

    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

    # APP Settings
    MODE: str = Field(alias="BACKEND_MODE")
    TIMEZONE: timezone = timezone(timedelta(hours=3), "MSK")

    # Security
    PASSWORD_SALT: str
    JWT_ALGORITHM: str = Field(default="HS256")
    JWT_ACCESS_TOKEN_SECRET: str
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=20)
    JWT_REFRESH_TOKEN_SECRET: str
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=30)

    # Postgress params
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    @computed_field
    @property
    def POSTGRES_ASYNC_URL(self) -> str:
        """Возвращает урл для асинхронного доступа к постгресю"""
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )


settings = Settings()  # type:ignore
