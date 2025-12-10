from collections.abc import Sequence
from datetime import datetime

from sqlalchemy import Row, asc, desc, func, select, update

from src.models import Estimate
from src.schemas import CreateEstimateSchema, EstimatesRequestQuerySchema, UpdateEstimateSchema

from ._base import BaseRepository


class EstimateRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице Estimate"""

    async def create_estimate(self, new_estimate: CreateEstimateSchema, user_id: int) -> Estimate:
        """Создание сметы"""
        estimate = Estimate(title=new_estimate.title, user_id=user_id)
        self.session.add(estimate)
        await self.session.commit()
        return estimate

    async def update_estimate(
        self, estimate_id: int, user_id: int, estimate: UpdateEstimateSchema
    ) -> int:
        """Обновление сметы в базе данных. Возвращает количество обновленных строк."""
        stmt = (
            update(Estimate)
            .where(Estimate.id == estimate_id)
            .where(Estimate.user_id == user_id)
            .values(**estimate.get_initialized_fields())
        )
        result = await self.session.execute(stmt)
        await self.session.commit()
        return result.rowcount  # type: ignore

    async def get_estimate(self, estimate_id: int, user_id: int) -> Estimate | None:
        """Получение сметы по ид."""
        stmt = select(Estimate).where(Estimate.id == estimate_id).where(Estimate.user_id == user_id)
        return await self.session.scalar(stmt)

    async def get_estimates(
        self, user_id: int, q: EstimatesRequestQuerySchema
    ) -> Sequence[Row[tuple[int, str, datetime]]]:
        """Получение списка информаций по сметам."""
        order = asc if q.order == "asc" else desc
        stmt = (
            select(Estimate.id, Estimate.title, Estimate.updated_at)
            .where(Estimate.user_id == user_id)
            .order_by(order(Estimate.updated_at))
            .limit(q.limit)
            .offset(q.offset)
        )
        result = await self.session.execute(stmt)
        return result.all()

    async def get_estimates_count(self, user_id: int) -> int:
        """Получаем количество смет пользователя."""
        stmt = select(func.count()).select_from(Estimate).where(Estimate.user_id == user_id)
        result = await self.session.scalar(stmt)
        return 0 if result is None else result
