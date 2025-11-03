from datetime import datetime

from pydantic import BaseModel


class InfoSchema(BaseModel):
    """JSON-схема для записи из таблицы Info"""

    id: int
    title: str
    content: str
    created_at: datetime
