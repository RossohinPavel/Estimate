from typing import Annotated, Literal

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from src.schemas import TokenDataSchema
from src.utils.auth import parse_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/sign_in_docs", refreshUrl="refresh")


def validate_token(type: Literal["access", "refresh"] = "access"):
    """Замыкание, которое возвращает фукнцию валидирующую токен."""

    async def _inner(token: Annotated[str, Depends(oauth2_scheme)]) -> TokenDataSchema:
        """Валидирует токен"""
        try:
            return parse_token(token, type)
        except ValueError as e:
            raise HTTPException(401, detail=str(e), headers={"WWW-Authenticate": "Bearer"})

    return _inner
