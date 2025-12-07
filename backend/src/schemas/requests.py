from typing import Literal

from pydantic import BaseModel, Field


class EstimatesRequestQuerySchema(BaseModel):
    """Схема для обработки query-параметров запроса для получения списка смет."""

    limit: int = Field(default=3, description="Количество записей в выборке.")
    offset: int = Field(default=0, description="Смещение выборки.")
    sort: Literal["created_at", "updated_at"] = Field(default="updated_at")
    order: Literal["desc", "asc"] = Field(default="desc")
