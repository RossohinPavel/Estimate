from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CreateEstimateSchema(BaseModel):
    """JSON-схема для создания записи Estimate"""

    title: str


class EstimateSchema(BaseModel):
    """JSON-схема для записи из таблицы Estimate"""

    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: int
    title: str
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
