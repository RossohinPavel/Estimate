import hashlib

from src.core import config


def get_password_hash(password: str) -> str:
    """Функция для хеширования пароля"""
    salted_password = f"{config.PASSWORD_SALT}{password}"
    return hashlib.sha256(salted_password.encode()).hexdigest()
