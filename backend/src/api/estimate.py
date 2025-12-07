from fastapi import APIRouter, Depends, HTTPException, Query

from src.core import get_base_session
from src.orm import EstimateRepository
from src.schemas import (
    CreateEstimateSchema,
    EstimateListResponseSchema,
    EstimateSchema,
    EstimatesRequestQuerySchema,
    TokenDataSchema,
    UpdateEstimateSchema,
)

from .middleware import validate_token


router = APIRouter(prefix="/estimate", tags=["estimate"])


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


@router.get("/", status_code=200, response_model=EstimateListResponseSchema)
async def get_estimates(
    q: EstimatesRequestQuerySchema = Query(),
    token: TokenDataSchema = Depends(validate_token()),
    session=Depends(get_base_session),
):
    """Получение списка смет пользователя"""
    repo = EstimateRepository(session)
    total = await repo.get_estimates_count(token.user_id)
    _next = q.offset + q.limit
    if _next > total:
        _next = total
    estiamtes = await repo.get_estimates(token.user_id, q)
    schemas = [EstimateSchema.model_validate(e, from_attributes=True) for e in estiamtes]
    return EstimateListResponseSchema(next=_next, total=total, estimates=schemas)


@router.post("/", status_code=201, response_model=EstimateSchema)
async def create_estimate(
    estimate: CreateEstimateSchema,
    token: TokenDataSchema = Depends(validate_token()),
    session=Depends(get_base_session),
):
    """Создание новой сметы"""
    repo = EstimateRepository(session)
    return await repo.create_estimate(estimate, token.user_id)


@router.patch("/{id}", status_code=204)
async def update_estimate(
    id: int,
    estimate: UpdateEstimateSchema,
    token: TokenDataSchema = Depends(validate_token()),
    session=Depends(get_base_session),
):
    """Обновление сметы"""
    if not estimate._initialized_fields:
        raise HTTPException(400, "No fields were provided in the request")
    repo = EstimateRepository(session)
    result = await repo.update_estimate(id, token.user_id, estimate)
    if not result:
        raise HTTPException(404, "Not found.")
