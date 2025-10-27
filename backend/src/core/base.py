from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from .settings import Settings


async_engine = create_async_engine(Settings.POSTGRES_ASYNC_URL)

if Settings.MODE == "dev":
    async_engine.echo = True

BaseSession = AsyncSession(async_engine, expire_on_commit=False)
