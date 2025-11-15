from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError

from src.core import get_base_session, settings
from src.orm import UserRepository
from src.schemas import AuthUserSchema, RefreshTokenSchema, TokenSchema
from src.utils import auth as auth_utils
from src.utils.logger import logger


router = APIRouter(prefix="/auth")


@router.post("/sign_up", status_code=201, response_model=TokenSchema)
async def sign_up(new_user: AuthUserSchema, session=Depends(get_base_session)):
    """Создаем нового пользователя"""
    repo = UserRepository(session)
    password_hash = auth_utils.get_password_hash(new_user.password)
    try:
        user = await repo.create_user(new_user.email, password_hash)
        refresh_token = auth_utils.create_token(user.email, user.created_at, "refresh")
        access_token = auth_utils.create_token(user.email, user.created_at, "access")
        logger.info(f"User(email={new_user.email}) was created")
        return TokenSchema(refresh_token=refresh_token, access_token=access_token)
    except IntegrityError as e:
        await session.rollback()
        raise HTTPException(400, f"User with email: {new_user.email} alredy exists.")


@router.post("/sign_in", status_code=200, response_model=TokenSchema)
async def sign_in(user_data: AuthUserSchema, session=Depends(get_base_session)):
    """Авторизуем пользователя"""
    repo = UserRepository(session)
    password_hash = auth_utils.get_password_hash(user_data.password)
    user = await repo.get_user(user_data.email, password_hash)
    if user is None:
        raise HTTPException(400, "Email or password incorrect.")
    now = datetime.now(settings.TIMEZONE)
    refresh_token = auth_utils.create_token(user.email, now, "refresh")
    access_token = auth_utils.create_token(user.email, now, "access")
    return TokenSchema(refresh_token=refresh_token, access_token=access_token)


@router.post("/refresh", status_code=200, response_model=TokenSchema)
async def refresh(data: RefreshTokenSchema, session=Depends(get_base_session)):
    """Обновляем токены"""
    repo = UserRepository(session)
    try:
        token = auth_utils.parse_refresh_token(data.token)
        user = await repo.get_user(token["email"])
        if user is None:
            raise ValueError("Invalid token.")
        refresh_token = data.token
        now = datetime.now(settings.TIMEZONE)
        access_token = auth_utils.create_token(user.email, now, "access")
        return TokenSchema(refresh_token=refresh_token, access_token=access_token)
    except ValueError as e:
        raise HTTPException(400, str(e))
