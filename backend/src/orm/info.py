from sqlalchemy import desc, select

from src.models import Info

from ._base import BaseRepository


class InfoRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице Info"""

    __slots__ = ()

    async def get_latest_update(self) -> Info | None:
        """Получает последнюю запись из таблицы Info"""
        stmt = select(Info).order_by(desc(Info.created_at)).limit(1)
        return await self.session.scalar(stmt)

    async def get_records_list(self):
        """Получить список записей из таблицы Info."""
        stmt = select(Info).order_by(desc(Info.created_at))
        result = await self.session.scalars(stmt)
        return result.fetchall()
