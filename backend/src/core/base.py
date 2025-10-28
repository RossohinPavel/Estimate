from sqlalchemy.ext.asyncio import create_async_engine
from .settings import Settings


base_async_engine = create_async_engine(Settings.POSTGRES_ASYNC_URL)

if Settings.MODE == "dev":
    base_async_engine.echo = True
