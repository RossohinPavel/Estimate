from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CreateInfoSchema(BaseModel):
    """JSON-схема для создания записи Info"""

    title: str
    content: str


class InfoSchema(CreateInfoSchema):
    """JSON-схема для записи из таблицы Info"""

    model_config = ConfigDict(populate_by_name=True)

    id: int
    created_at: datetime = Field(alias="createdAt")
