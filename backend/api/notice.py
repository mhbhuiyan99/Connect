import math
from datetime import UTC, datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError

from core.security import get_auth_user
from models.notice import NoticeModel
from models.user import UserModel, UserRole
from schema.notice import AddNoticeRequest, GetNoticeResponse

router = APIRouter(prefix="/notice", tags=["Notice"])


@router.get("/{notice_id}", dependencies=[Depends(get_auth_user)])
async def get_notice_by_id(notice_id: str):
    try:
        notice = await NoticeModel.get(notice_id, fetch_links=True)
    except ValidationError:
        raise HTTPException(status_code=400, detail="Invalid notice ID") from None

    if not notice:
        raise HTTPException(status_code=404, detail="Notice not found")

    return GetNoticeResponse(
        id=str(notice.id),
        title=notice.title,
        content=notice.content,
        image_url=notice.image_url,
        author=str(notice.user.id) if notice.user else "",
        author_name=notice.user.name if notice.user else "",
        author_profile_photo=notice.user.profile_photo if notice.user else "",
        created_at=notice.created_at,
        updated_at=notice.updated_at,
    )


@router.get("/")
async def list_all_notice(page: int = 1, limit: int = 10):
    limit = max(10, min(100, limit))
    page = max(1, page)

    notices = (
        await NoticeModel.find(fetch_links=True)
        .sort((NoticeModel.created_at, -1))
        .skip((page - 1) * limit)
        .limit(limit)
        .to_list()
    )
    total = await NoticeModel.count()
    return {
        "items": [
            GetNoticeResponse(
                id=str(notice.id),
                title=notice.title,
                content=notice.content,
                image_url=notice.image_url,
                author=str(notice.user.id) if notice.user else "",
                author_name=notice.user.name if notice.user else "",
                author_profile_photo=notice.user.profile_photo if notice.user else "",
                created_at=notice.created_at,
                updated_at=notice.updated_at,
            )
            for notice in notices
        ],
        "page": page,
        "limit": limit,
        "total": total,
        "max_page": math.ceil(total / limit),
        "has_next": page < math.ceil(total / limit),
    }


@router.post("/", description="Only admin can add notices.")
async def add_notice(
    data: AddNoticeRequest,
    token_data: Annotated[dict, Depends(get_auth_user)],
):
    user = await UserModel.get(token_data["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.role not in [UserRole.ADMIN, UserRole.SUPERADMIN]:
        raise HTTPException(status_code=403, detail="Only admin can add notices")

    notice = NoticeModel(
        title=data.title,
        content=data.content,
        image_url=data.image_url,
        user=user,
    )
    await notice.save()

    return GetNoticeResponse(
        id=str(notice.id),
        title=notice.title,
        content=notice.content,
        image_url=notice.image_url,
        author=str(notice.user.id) if notice.user else "",
        author_name=notice.user.name if notice.user else "",
        author_profile_photo=notice.user.profile_photo if notice.user else "",
        created_at=notice.created_at,
        updated_at=notice.updated_at,
    )


@router.delete("/{notice_id}", description="Delete a notice")
async def delete_notice(notice_id: str, token_data: Annotated[dict, Depends(get_auth_user)]):
    user = await UserModel.get(token_data["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.role not in [UserRole.ADMIN, UserRole.SUPERADMIN]:
        raise HTTPException(status_code=403, detail="Only admin can delete notices")

    try:
        notice = await NoticeModel.get(notice_id, fetch_links=True)
    except ValidationError:
        raise HTTPException(status_code=400, detail="Invalid notice ID") from None

    if not notice:
        raise HTTPException(status_code=404, detail="Notice not found")

    await notice.delete()
    return {"message": "Notice deleted successfully"}


@router.put("/{notice_id}")
async def update_notice(
    notice_id: str,
    data: AddNoticeRequest,
    token_data: Annotated[dict, Depends(get_auth_user)],
):
    user = await UserModel.get(token_data["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.role not in [UserRole.ADMIN, UserRole.SUPERADMIN]:
        raise HTTPException(status_code=403, detail="Only admin can update notices")

    try:
        notice = await NoticeModel.get(notice_id, fetch_links=True)
    except ValidationError:
        raise HTTPException(status_code=400, detail="Invalid notice ID") from None

    if not notice:
        raise HTTPException(status_code=404, detail="Notice not found")

    if user.id != notice.user.id:
        raise HTTPException(
            status_code=403,
            detail="You can only update your own notices",
        )

    notice.title = data.title
    notice.content = data.content
    notice.image_url = data.image_url
    notice.updated_at = datetime.now(tz=UTC)
    await notice.save()
    return GetNoticeResponse(
        id=str(notice.id),
        title=notice.title,
        content=notice.content,
        image_url=notice.image_url,
        author=str(notice.user.id) if notice.user else "",
        author_name=notice.user.name if notice.user else "",
        author_profile_photo=notice.user.profile_photo if notice.user else "",
        created_at=notice.created_at,
        updated_at=notice.updated_at,
    )
