from datetime import datetime

from src.models import RefreshToken

from ._base import BaseRepository


class RefreshTokenRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице RefreshToken"""

    __slots__ = ()

    async def add_token(self, user_id: int, token_hash: str, expires_at: datetime) -> RefreshToken:
        """Создаем новую запись о токене"""
        token = RefreshToken(user_id=user_id, token=token_hash, expires_at=expires_at)
        self.session.add(token)
        return token
