from collections.abc import Sequence

from sqlalchemy import desc, select

from src.models import Info
from src.schemas import CreateInfoSchema

from ._base import BaseRepository


class InfoRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице Info"""

    __slots__ = ()

    async def get_latest_update(self) -> Info | None:
        """Получает последнюю запись из таблицы Info"""
        stmt = select(Info).order_by(desc(Info.created_at)).limit(1)
        return await self.session.scalar(stmt)

    async def get_updates(self) -> Sequence[Info]:
        """Получить список записей из таблицы Info. Записи будут отсортированы по времени."""
        stmt = select(Info).order_by(desc(Info.created_at))
        result = await self.session.scalars(stmt)
        return result.fetchall()

    async def create_update(self, new_update: CreateInfoSchema) -> Info:
        """Создаем новую запись об обновлении приложения"""
        info = Info(title=new_update.title, content=new_update.content)
        self.session.add(info)
        await self.session.commit()
        return info
