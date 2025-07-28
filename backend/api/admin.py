from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from core.security import get_auth_user
from models.alumni import AlumniModel
from models.notice import NoticeModel
from models.user import UserModel, UserRole

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/dashboard")
async def get_dashboard(user: Annotated[dict, Depends(get_auth_user)]):
    admin = await UserModel.get(user["sub"])

    if not admin or admin.role not in [UserRole.SUPERADMIN, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="Only admin can access dashboard")

    alumni_count = await AlumniModel.find(AlumniModel.approved == True).count()
    pending_count = await AlumniModel.find(AlumniModel.approved == False).count()

    notice_published = await NoticeModel.count()

    return {
        "total_alumni": alumni_count,
        "pending_verifications": pending_count,
        "notice_published": notice_published,
    }


class ModifyRoleRequest(BaseModel):
    user_id: str


@router.post("/promote")
async def promote_user_to_admin(
    user: Annotated[dict, Depends(get_auth_user)],
    data: ModifyRoleRequest,
):
    admin = await UserModel.get(user["sub"])

    if not admin or admin.role != UserRole.SUPERADMIN:
        raise HTTPException(status_code=403, detail="Only superadmin can promote users")

    new_admin = await UserModel.get(data.user_id)

    if not new_admin:
        raise HTTPException(status_code=404, detail="User not found")

    if new_admin.role == UserRole.SUPERADMIN:
        raise HTTPException(status_code=400, detail="Cannot promote superadmin")

    new_admin.role = UserRole.ADMIN
    await new_admin.save()

    return {"message": "User promoted to admin successfully"}


@router.post("/demote")
async def demote_user_to_user(
    user: Annotated[dict, Depends(get_auth_user)],
    data: ModifyRoleRequest,
):
    admin = await UserModel.get(user["sub"])

    if not admin or admin.role != UserRole.SUPERADMIN:
        raise HTTPException(status_code=403, detail="Only superadmin can demote users")

    new_alumni = await UserModel.get(data.user_id)

    if not new_alumni:
        raise HTTPException(status_code=404, detail="User not found")

    if new_alumni.role == UserRole.SUPERADMIN:
        raise HTTPException(status_code=400, detail="Cannot demote superadmin")

    new_alumni.role = UserRole.ALUMNI
    await new_alumni.save()

    return {"message": "User demoted to alumni successfully"}
