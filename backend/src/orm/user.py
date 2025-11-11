from src.models import User

from ._base import BaseRepository


class UserRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице User"""

    __slots__ = ()

    async def create_user(self, email: str, password: str) -> User:
        """Создаем нового пользователя"""
        user = User(email=email, password=password)
        self.session.add(user)
        await self.session.commit()
        return user
