from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError

from src.core import get_base_session, settings
from src.orm import UserRepository
from src.schemas import AccessTokenSchema, AuthUserSchema, RefreshTokenSchema, TokenDataSchema
from src.utils import auth as auth_utils
from src.utils.get_user_or_error import get_user_from_token_or_error
from src.utils.logger import logger

from .middleware import validate_token


router = APIRouter(prefix="/auth")


tokens_response = tuple[RefreshTokenSchema, AccessTokenSchema]


@router.post("/sign_up", status_code=201, response_model=tokens_response)
async def sign_up(new_user: AuthUserSchema, session=Depends(get_base_session)):
    """Создаем нового пользователя"""
    repo = UserRepository(session)
    password_hash = auth_utils.get_password_hash(new_user.password)
    try:
        user = await repo.create_user(new_user.email, password_hash)
        rts = auth_utils.create_token(user.id, user.email, user.created_at, "refresh")
        ats = auth_utils.create_token(user.id, user.email, user.created_at, "access")
        logger.info(f"User(email={new_user.email}) was created")
        return [
            RefreshTokenSchema(refreshToken=rts, tokenType="bearer"),
            AccessTokenSchema(accessToken=ats, tokenType="bearer"),
        ]
    except IntegrityError:
        await session.rollback()
        raise HTTPException(400, f"User with email: {new_user.email} alredy exists.")


@router.post("/sign_in", status_code=200, response_model=tokens_response)
async def sign_in(user_data: AuthUserSchema, session=Depends(get_base_session)):
    """Авторизация пользователя через запрос с телом json."""
    return await _sign_in(user_data, session)


@router.post("/sign_in_docs", status_code=200)
async def sign_in_docs(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session=Depends(get_base_session)
):
    """Авторизация пользователя через форму"""
    user_data = AuthUserSchema(email=form_data.username, password=form_data.password)
    _, access_token = await _sign_in(user_data, session)
    return {"access_token": access_token.accessToken, "token_type": access_token.tokenType}


async def _sign_in(user_data: AuthUserSchema, session) -> tokens_response:
    """Авторизуем пользователя."""
    repo = UserRepository(session)
    password_hash = auth_utils.get_password_hash(user_data.password)
    user = await repo.get_user(user_data.email, password_hash)
    if user is None:
        raise HTTPException(400, "Email or password incorrect.")
    now = datetime.now(settings.TIMEZONE)
    rts = auth_utils.create_token(user.id, user.email, now, "refresh")
    ats = auth_utils.create_token(user.id, user.email, now, "access")
    return (
        RefreshTokenSchema(refreshToken=rts, tokenType="bearer"),
        AccessTokenSchema(accessToken=ats, tokenType="bearer"),
    )


@router.post("/refresh", status_code=201)
async def refresh(
    refresh_token: Annotated[TokenDataSchema, Depends(validate_token("refresh"))],
    session=Depends(get_base_session),
) -> tokens_response:
    """Обновление аксесс токена. Метод в заголовке принимает Только РЕФРЕШ ТОКЕН!"""
    user = await get_user_from_token_or_error(refresh_token, session, 400, "Invalid token.")
    now = datetime.now(settings.TIMEZONE)
    rts = auth_utils.create_token(user.id, user.email, now, "refresh")
    ats = auth_utils.create_token(user.id, user.email, now, "access")
    return (
        RefreshTokenSchema(refreshToken=rts, tokenType="bearer"),
        AccessTokenSchema(accessToken=ats, tokenType="bearer"),
    )
