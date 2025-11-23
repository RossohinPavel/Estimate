from collections.abc import Sequence

from sqlalchemy import select

from src.models import Estimate
from src.schemas import CreateEstimateSchema

from ._base import BaseRepository


class EstimateRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице Estimate"""

    async def create_estimate(self, new_estimate: CreateEstimateSchema, user_id: int) -> Estimate:
        """Создание сметы"""
        estimate = Estimate(title=new_estimate.title, user_id=user_id)
        self.session.add(estimate)
        await self.session.commit()
        return estimate

    async def get_estimates(self, user_id: int) -> Sequence[Estimate]:
        """Получить сметы пользователя."""
        stmt = select(Estimate).where(Estimate.user_id == user_id)
        result = await self.session.scalars(stmt)
        return result.fetchall()
