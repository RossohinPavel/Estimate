from pydantic import BaseModel
from datetime import datetime


class InfoSchema(BaseModel):
    """JSON-схема для записи из таблицы Info"""

    id: int
    title: str
    content: str
    created_at: datetime
