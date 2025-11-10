from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from src.core import config
from src.utils import logger


base_async_engine = create_async_engine(config.POSTGRES_ASYNC_URL)

if config.MODE == "dev":
    base_async_engine.echo = True


async def get_base_session() -> AsyncGenerator[AsyncSession, None]:
    """Функция для Depends, которая выдает объект сессии бд и осуществляет обработку ошибок."""
    async with AsyncSession(base_async_engine, expire_on_commit=False) as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            logger.exception(f"Session rollbacked. Reason: {e}")
