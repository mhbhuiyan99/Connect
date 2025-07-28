from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError

from core.security import get_auth_user
from models import AlumniModel, UserModel, UserRole
from schema.auth import ApproveUserRequest

router = APIRouter(prefix="/auth", tags=["Approve"])


@router.post("/approve/user")
async def approve_user(
    data: ApproveUserRequest,
    token_data: Annotated[dict, Depends(get_auth_user)],
):
    admin = await UserModel.get(token_data["sub"])
    if not admin or admin.role not in [UserRole.ADMIN, UserRole.SUPERADMIN]:
        raise HTTPException(status_code=403, detail="Only admin can approve users")

    try:
        user = await UserModel.get(data.user_id)
    except ValidationError as err:
        raise HTTPException(status_code=400, detail="Invalid user ID") from err

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.approved = data.status
    await user.save()

    if not user.approved:
        await user.delete()

    return {
        "message": "User approved successfully" if data.status else "User rejected successfully",
        "user": user.as_self_user(),
    }


async def query_params(page: int = 1, limit: int = 10):
    return {
        "page": max(1, page),
        "limit": max(10, min(100, limit)),
    }


@router.get("/approve/user/pending")
async def get_pending_users(
    token_data: Annotated[dict, Depends(get_auth_user)],
    query_params: Annotated[dict, Depends(query_params)],
):
    admin = await UserModel.get(token_data["sub"])
    if not admin or admin.role not in [UserRole.ADMIN, UserRole.SUPERADMIN]:
        raise HTTPException(status_code=403, detail="Only admin can approve users")

    page = query_params["page"]
    limit = query_params["limit"]

    users = (
        await UserModel.find(UserModel.approved == False)
        .sort(UserModel.created_at)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )
    return [user.as_self_user() for user in users]


@router.get("/approve/alumni/pending")
async def get_pending_alumni(
    token_data: Annotated[dict, Depends(get_auth_user)],
    query_params: Annotated[dict, Depends(query_params)],
):
    admin = await UserModel.get(token_data["sub"])
    if not admin or admin.role not in [UserRole.ADMIN, UserRole.SUPERADMIN]:
        raise HTTPException(status_code=403, detail="Only admin can approve users")

    page = query_params["page"]
    limit = query_params["limit"]

    users = (
        await AlumniModel.find(AlumniModel.approved == False)
        .sort(AlumniModel.created_at)
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )
    return [user.as_alumni() for user in users]


@router.post("/approve/alumni")
async def approve_alumni(
    data: ApproveUserRequest,
    token_data: Annotated[dict, Depends(get_auth_user)],
):
    admin = await UserModel.get(token_data["sub"])
    if not admin or admin.role not in [UserRole.ADMIN, UserRole.SUPERADMIN]:
        raise HTTPException(status_code=403, detail="Only admin can approve users")

    try:
        alumni = await AlumniModel.get(data.user_id)
    except ValidationError as err:
        raise HTTPException(status_code=400, detail="Invalid user ID") from err

    if not alumni:
        raise HTTPException(status_code=404, detail="User not found")

    alumni.approved = data.status
    await alumni.save()

    if not alumni.approved:
        await alumni.delete()

    return {
        "message": "Alumni approved successfully"
        if data.status
        else "Alumni rejected successfully",
        "alumni": alumni.as_alumni(),
    }
