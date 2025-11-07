from datetime import datetime

from pydantic import BaseModel


class CreateInfoSchema(BaseModel):
    """JSON-схема для создания записи Info"""

    title: str
    content: str


class InfoSchema(CreateInfoSchema):
    """JSON-схема для записи из таблицы Info"""

    id: int
    created_at: datetime
