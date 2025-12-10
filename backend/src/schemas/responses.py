from pydantic import BaseModel

from .estimate import EstimateLESchema


class EstimateListResponseSchema(BaseModel):
    """Схема ответа на запрос получения списка смет."""

    next: int
    total: int
    estimates: list[EstimateLESchema]
