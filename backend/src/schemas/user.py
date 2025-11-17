from pydantic import BaseModel


class UserSchema(BaseModel):
    """Схема для представления информации о пользователе."""

    email: str
    password: str
