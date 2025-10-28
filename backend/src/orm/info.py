from sqlalchemy import select, desc

from ._base import BaseRepository
from src.models import Info


class InfoRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице Info"""

    __slots__ = ()

    async def get_latest_update(self) -> Info | None:
        """Получает последнюю запись из таблицы Info"""
        stmt = select(Info).order_by(desc(Info.id)).limit(1)
        return await self.session.scalar(stmt)
