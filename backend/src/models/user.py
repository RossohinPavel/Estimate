from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from ._base_model import Base


class User(Base):
    """Модель пользователя"""

    __tablename__ = "User"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(64), nullable=False)
