from pydantic import Field, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    """Настройки приложения, подхваченные из виртуального окружения и секретов."""

    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

    # APP Settings
    MODE: str = Field(alias="BACKEND_MODE")
    JWT_SECRET: str
    PASSWORD_SALT: str

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


config = Config()  # type:ignore
