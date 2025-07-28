import math
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from core.security import get_auth_user
from models.user import UserModel, UserRole

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", dependencies=[Depends(get_auth_user)])
async def get_current_user(data: Annotated[dict, Depends(get_auth_user)]):
    user = await UserModel.get(data["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user.as_self_user()


async def query_params(page: int = 1, limit: int = 10):
    return {"page": max(1, page), "limit": max(10, min(100, limit))}


@router.get("/list")
async def get_users_list(
    token_data: Annotated[dict, Depends(get_auth_user)],
    query_params: Annotated[dict, Depends(query_params)],
):
    admin = await UserModel.get(token_data["sub"])
    if not admin or admin.role not in (UserRole.ADMIN, UserRole.SUPERADMIN):
        raise HTTPException(status_code=403, detail="Only admin can get users list")

    page = query_params["page"]
    limit = query_params["limit"]

    users = (
        await UserModel.find(UserModel.approved == True)
        .sort(UserModel.created_at)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )
    total = await UserModel.find(UserModel.approved == True).count()
    return {
        "items": [user.as_self_user() for user in users],
        "page": page,
        "limit": limit,
        "total": total,
        "max_page": math.ceil(total / limit),
        "has_next": page < math.ceil(total / limit),
    }
