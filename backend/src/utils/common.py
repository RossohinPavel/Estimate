import asyncio
from socket import AF_INET, SOCK_STREAM, socket

from src.core import settings

from .logger import logger


async def wait_db_connection():
    """Функция для ожидания старта БД-шки.
    Хотя в compose прописана зависимость, но сама бд внутри контейнера стартует не сразу,
    особенно если там уже есть множетсво записей. Для корректной работы бэкенда дождемся,
    когда БД-шка будет отвечать на запросы.
    """
    tries = 0
    sock = socket(AF_INET, SOCK_STREAM)
    while tries <= 1800:
        try:
            sock.connect((settings.POSTGRES_HOST, int(settings.POSTGRES_PORT)))
            sock.close()
            logger.success("Connection to the db has been established.")
            return
        except OSError:
            await asyncio.sleep(0.1)
            tries += 1
    logger.critical("Failed to connect to db.")
    raise OSError
