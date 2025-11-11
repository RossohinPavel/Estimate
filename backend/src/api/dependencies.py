from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src import orm
from src.core import get_base_session


def get_info_repository(session: AsyncSession = Depends(get_base_session)) -> orm.InfoRepository:
    """Возвращает Репозиторий для работы с таблицей Инфо."""
    return orm.InfoRepository(session)


def get_user_repository(session: AsyncSession = Depends(get_base_session)) -> orm.UserRepository:
    """Возвращает Репозиторий для работы с таблицей Пользователей."""
    return orm.UserRepository(session)
