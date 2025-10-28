from sqlalchemy.ext.asyncio import AsyncSession


class BaseRepository:
    """Базовый класс для всех репозиториев, хранящих методы запросов"""

    __slots__ = ("session",)

    def __init__(self, session: AsyncSession) -> None:
        self.session = session
