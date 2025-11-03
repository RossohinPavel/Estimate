from collections.abc import AsyncGenerator

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src import orm
from src.core import base_async_engine


async def get_base_session() -> AsyncGenerator[AsyncSession, None]:
    """Функция для Depends, которая выдает объект сессии бд и осуществляет обработку ошибок."""
    async with AsyncSession(base_async_engine, expire_on_commit=False) as session:
        try:
            yield session
        except Exception:
            pass  # print(e)


def get_info_repository(session: AsyncSession = Depends(get_base_session)) -> orm.InfoRepository:
    """Возвращает Репозиторий для работы с таблицей Инфо."""
    return orm.InfoRepository(session)
