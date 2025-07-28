import math
from enum import Enum
from typing import Annotated

from beanie.operators import Or, RegEx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError

from core.security import get_auth_user
from models.alumni import AlumniModel
from models.user import UserModel, UserRole
from schema.alumni import InsertAlumniRequest, UpdateAlumniRequest

router = APIRouter(prefix="/alumni", tags=["Alumni"])


@router.post("/insert")
async def insert_alumni_data(data: InsertAlumniRequest):
    try:
        validated_data = data.as_user_model()
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid data probably wrong student id",
        ) from None

    except TypeError:
        raise HTTPException(status_code=500, detail="Internal Server Error") from None

    alumni = await AlumniModel.find_one(
        Or(AlumniModel.student_id == data.student_id, AlumniModel.email == data.email),
    )
    if alumni:
        raise HTTPException(
            status_code=400,
            detail="User already exists",
        ) from None

    alumni = AlumniModel(**validated_data)
    await alumni.save()

    return {"message": "User created successfully", "user": alumni.as_alumni()}


@router.put("/update")
async def update_alumni(data: UpdateAlumniRequest, uid: Annotated[dict, Depends(get_auth_user)]):
    try:
        validated_data = data.as_user_model()
    except TypeError:
        raise HTTPException(status_code=500, detail="Internal Server Error") from None

    alumni = await AlumniModel.find_one(AlumniModel.student_id == data.student_id)

    if not alumni:
        raise HTTPException(status_code=404, detail="Alumni not found")

    user = await UserModel.get(uid["sub"])
    if not user:
        raise HTTPException(status_code=403, detail="User not found")

    if user.student_id != alumni.student_id:
        raise HTTPException(status_code=403, detail="User not authorized")

    await alumni.set({
        AlumniModel.name: validated_data["name"],
        AlumniModel.email: validated_data["email"],
        AlumniModel.industries: validated_data["industries"],
        AlumniModel.skills: validated_data["skills"],
        AlumniModel.linked_in: validated_data["linked_in"],
        AlumniModel.facebook: validated_data["facebook"],
        AlumniModel.github: validated_data["github"],
        AlumniModel.profile_photo: validated_data["profile_photo"],
        AlumniModel.hometown: validated_data["hometown"],
    })

    return {"message": "User updated successfully", "user": alumni.as_alumni()}


@router.delete("/{alumni_id}")
async def delete_alumni(alumni_id: str, uid: Annotated[dict, Depends(get_auth_user)]):
    user = await UserModel.get(uid["sub"])
    if not user or user.role != UserRole.SUPERADMIN:
        raise HTTPException(status_code=403, detail="User not authorized")

    alumni = await AlumniModel.get(alumni_id)
    if not alumni:
        raise HTTPException(status_code=404, detail="Alumni not found")

    await alumni.delete()
    return {"message": "Alumni deleted successfully"}


async def pagination_params(page: int = 1, limit: int = 10):
    return {"page": max(1, page), "limit": max(10, min(100, limit))}


@router.get("/", dependencies=[Depends(get_auth_user)])
async def get_alumni(batch: int, params: Annotated[dict, Depends(pagination_params)]):
    results = (
        await AlumniModel.find(AlumniModel.batch == batch, AlumniModel.approved == True)
        .sort((AlumniModel.sorting_order, 1))
        .skip((params["page"] - 1) * params["limit"])
        .limit(params["limit"])
        .to_list()
    )
    total = await AlumniModel.find(AlumniModel.batch == batch, AlumniModel.approved == True).count()
    return {
        "items": [result.as_alumni() for result in results],
        "page": params["page"],
        "limit": params["limit"],
        "total": total,
        "max_page": math.ceil(total / params["limit"]),
        "has_next": params["page"] < math.ceil(total / params["limit"]),
    }


class SearchFilterEnum(Enum):
    NAME = "name"
    SKILLS = "skills"
    COMPANY = "company"
    STUDENT_ID = "student_id"
    HOMETOWN = "hometown"
    ALL = "all"


@router.get("/search", dependencies=[Depends(get_auth_user)])
async def search_alumni(
    query: str,
    params: Annotated[dict, Depends(pagination_params)],
    filter_by: SearchFilterEnum = SearchFilterEnum.NAME,
):
    if filter_by == SearchFilterEnum.NAME:
        search = AlumniModel.find(
            RegEx(AlumniModel.name, query, "i"),
            AlumniModel.approved == True,
        )

    elif filter_by == SearchFilterEnum.SKILLS:
        search = AlumniModel.find(
            RegEx(AlumniModel.skills, query, "i"),
            AlumniModel.approved == True,
        )

    elif filter_by == SearchFilterEnum.COMPANY:
        search = AlumniModel.find(
            RegEx(AlumniModel.industries.industry, query, "i"),
            AlumniModel.approved == True,
        )

    elif filter_by == SearchFilterEnum.STUDENT_ID:
        search = AlumniModel.find(
            RegEx(AlumniModel.student_id, query, "i"),
            AlumniModel.approved == True,
        )

    elif filter_by == SearchFilterEnum.HOMETOWN:
        search = AlumniModel.find(
            RegEx(AlumniModel.hometown, query, "i"),
            AlumniModel.approved == True,
        )

    else:
        search = AlumniModel.find(AlumniModel.approved == True)

    results = (
        await search.sort((AlumniModel.sorting_order, 1))
        .skip((params["page"] - 1) * params["limit"])
        .limit(params["limit"])
        .to_list()
    )
    total = await AlumniModel.find(AlumniModel.approved == True).count()
    return {
        "items": [result.as_alumni() for result in results],
        "page": params["page"],
        "limit": params["limit"],
        "total": total,
        "max_page": math.ceil(total / params["limit"]),
        "has_next": params["page"] < math.ceil(total / params["limit"]),
    }


@router.get("/student/me")
async def get_self_alumni(uid: Annotated[dict, Depends(get_auth_user)]):
    user = await UserModel.get(uid["sub"])
    alumni = await AlumniModel.find_one(AlumniModel.student_id == user.student_id)
    if not alumni or not alumni.approved:
        raise HTTPException(status_code=404, detail="Alumni not found")

    return alumni.as_alumni()


@router.get("/student/{student_id}", dependencies=[Depends(get_auth_user)])
async def get_alumni_by_student_id(student_id: str):
    alumni = await AlumniModel.find_one(AlumniModel.student_id == student_id)
    if not alumni or not alumni.approved:
        raise HTTPException(status_code=404, detail="Alumni not found")

    return alumni.as_alumni()


@router.get("/{alumni_id}", dependencies=[Depends(get_auth_user)])
async def get_alumni_by_id(alumni_id: str):
    try:
        alumni = await AlumniModel.get(alumni_id)
    except ValidationError as err:
        raise HTTPException(status_code=400, detail="Invalid Alumni ID") from err

    if not alumni or not alumni.approved:
        raise HTTPException(status_code=404, detail="Alumni not found")

    return alumni.as_alumni()
