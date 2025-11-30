from fastapi import APIRouter, Depends, HTTPException

from src.core import get_base_session
from src.orm import EstimateRepository
from src.schemas import CreateEstimateSchema, EstimateSchema, TokenDataSchema

from .middleware import validate_token


router = APIRouter(prefix="/estimate")


@router.get("/{id}", status_code=200, response_model=EstimateSchema)
async def get_estimate(
    id: int, token: TokenDataSchema = Depends(validate_token()), session=Depends(get_base_session)
):
    """Получение сметы по ид"""
    repo = EstimateRepository(session)
    estimate = await repo.get_estimate(id, token.user_id)
    if estimate is None:
        raise HTTPException(404, "Estimate not found.")
    return estimate


@router.get("/", status_code=200, response_model=list[EstimateSchema])
async def get_estimates(
    token: TokenDataSchema = Depends(validate_token()), session=Depends(get_base_session)
):
    """Получение списка смет пользователя"""
    repo = EstimateRepository(session)
    return await repo.get_estimates(token.user_id)


@router.post("/", status_code=201, response_model=EstimateSchema)
async def create_estimate(
    estimate: CreateEstimateSchema,
    token: TokenDataSchema = Depends(validate_token()),
    session=Depends(get_base_session),
):
    """Создание новой сметы"""
    repo = EstimateRepository(session)
    return await repo.create_estimate(estimate, token.user_id)
