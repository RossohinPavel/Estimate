from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, PrivateAttr


class EstimateLESchema(BaseModel):
    """JSON - схема для списочного ответа по информации схемам."""

    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    id: int
    title: str
    updated_at: datetime = Field(alias="updatedAt")


class EstimateSchema(EstimateLESchema):
    """JSON-схема для записи из таблицы Estimate"""

    description: str
    project: str
    based_on: str = Field(alias="basedOn")
    created_at: datetime = Field(alias="createdAt")


class UpdateEstimateSchema(BaseModel):
    """JSON-схема для обновления сметы"""

    model_config = ConfigDict(populate_by_name=True)

    title: str | None = Field(default=None)
    description: str | None = Field(default=None)
    project: str | None = Field(default=None)
    based_on: str | None = Field(default=None, alias="basedOn")
    # метка на присутствие какого-либо поля
    _initialized_fields: list[str] = PrivateAttr(default_factory=list)

    def __init__(self, **data):
        super().__init__(**data)
        for name, field_info in self.__class__.model_fields.items():
            search_field = name
            if field_info.alias is not None:
                search_field = field_info.alias
            if search_field in data:
                self._initialized_fields.append(name)

    def get_initialized_fields(self) -> dict[str, Any]:
        """Получаем словарь из инициализированных полей со своими типами значений"""
        return {attr: getattr(self, attr) for attr in self._initialized_fields}


class CreateEstimateSchema(UpdateEstimateSchema):
    """JSON-схема для создания записи Estimate"""

    title: str  # type: ignore
