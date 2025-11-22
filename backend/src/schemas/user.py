from pydantic import BaseModel, ConfigDict


class UserSchema(BaseModel):
    """Схема для представления информации о пользователе."""

    model_config = ConfigDict(extra="ignore")

    email: str
