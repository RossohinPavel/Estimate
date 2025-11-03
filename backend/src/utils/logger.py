import sys

from loguru import logger

from src.core import settings


logger.remove()

# Основной логгер
# Специально настраиваем так, чтобы логи отличались от обычного вывода FastAPI
logger.add(
    sys.stdout,
    level="TRACE" if settings.MODE == "dev" else "INFO",
    format="<level>[{level:^7}]</level> {message}",
    filter=lambda r: r["level"].no < logger.level("ERROR").no,
    enqueue=True,  # Необходимо для корректной работы в асинхронном приложении
)
