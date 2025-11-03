from sqlalchemy.ext.asyncio import create_async_engine

from .settings import settings


base_async_engine = create_async_engine(settings.POSTGRES_ASYNC_URL)

if settings.MODE == "dev":
    base_async_engine.echo = True
