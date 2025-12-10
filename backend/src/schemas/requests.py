from typing import Literal

from pydantic import BaseModel, Field


class EstimatesRequestQuerySchema(BaseModel):
    """Схема для обработки query-параметров запроса для получения списка смет."""

    limit: int = Field(default=5, description="Количество записей в выборке.")
    offset: int = Field(default=0, description="Смещение выборки.")
    order: Literal["desc", "asc"] = Field(
        default="desc", description="Направление сортировки по полю дата обновления."
    )
