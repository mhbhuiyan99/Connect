from pydantic import BaseModel, EmailStr, field_validator

from models.user import UserRole


class SignUpRequest(BaseModel):
    email: EmailStr
    name: str
    student_id: str
    password: str
    confirm_password: str
    role: UserRole

    @field_validator("student_id")
    @classmethod
    def validate_student_id(cls, student_id):
        return student_id.upper().strip()


class SignInRequest(BaseModel):
    email: EmailStr
    password: str


class ApproveUserRequest(BaseModel):
    user_id: str
    status: bool


class RefreshTokenRequest(BaseModel):
    refresh_token: str
