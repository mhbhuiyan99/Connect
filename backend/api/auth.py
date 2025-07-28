from typing import Annotated

from beanie.operators import Or
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from passlib.context import CryptContext

from core.security import create_session_token, get_auth_user, verify_session_token
from models.user import UserModel, UserRole
from schema.auth import SignInRequest, SignUpRequest

router = APIRouter(prefix="/auth")


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


MINIMUM_PASSWORD_LENGTH = 6


@router.post("/sign-up")
async def sign_up(data: SignUpRequest):
    if data.password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    if len(data.password) < MINIMUM_PASSWORD_LENGTH:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 character long",
        )

    user = await UserModel.find_one(
        Or(UserModel.email == data.email, UserModel.student_id == data.student_id),
    )
    if user:
        raise HTTPException(status_code=400, detail="User already exists")

    if data.role not in (UserRole.ALUMNI, UserRole.STUDENT):
        raise HTTPException(status_code=400, detail="Invalid role")

    user = UserModel(
        student_id=data.student_id,
        name=data.name,
        email=data.email,
        password=pwd_context.hash(data.password),
        role=data.role,
    )
    await user.save()

    return {"message": "User created successfully", "user": user.as_self_user()}


@router.post("/sign-in")
async def sign_in(data: SignInRequest):
    user = await UserModel.find_one(UserModel.email == data.email)
    if not user or not pwd_context.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not user.approved:
        raise HTTPException(status_code=401, detail="User is not approved")

    response = JSONResponse({"message": "User signed in successfully", "user": user.as_self_user()})
    response.set_cookie(
        "session",
        create_session_token({
            "sub": str(user.id),
            "role": user.role.value,
            "student_id": user.student_id,
        }),
    )
    return response


@router.post("/sign-out")
async def sign_out():
    response = JSONResponse({"message": "User signed out successfully"})
    response.delete_cookie("session")
    return response


@router.post("/refresh-token")
async def refresh_token(user: Annotated[dict, Depends(get_auth_user)]):
    payload = verify_session_token(user["session"])
    response = JSONResponse({"message": "Token refreshed successfully"})
    response.set_cookie(
        "session",
        create_session_token(payload),
    )
    return response
