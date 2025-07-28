from datetime import UTC, datetime
from enum import Enum
from functools import partial
from typing import Annotated

from beanie import Document, Indexed
from pydantic import EmailStr, Field


class UserRole(Enum):
    SUPERADMIN = "superadmin"
    ADMIN = "admin"
    ALUMNI = "alumni"
    STUDENT = "student"


class UserModel(Document):
    approved: bool = Field(default=False)
    bio: str | None = Field(default="", alias="bio")
    created_at: datetime = Field(default_factory=partial(datetime.now, tz=UTC))
    email: Annotated[EmailStr, Indexed(unique=True)]
    name: str
    password: str
    profile_photo: str | None = Field(default="")
    role: UserRole = Field(default=UserRole.STUDENT)
    student_id: Annotated[str, Indexed(unique=True)]
    updated_at: datetime = Field(default_factory=partial(datetime.now, tz=UTC))

    class Settings:
        name = "users"

    def as_public_user(self):
        return {
            "name": self.name,
            "student_id": self.student_id,
            "profile_photo": self.profile_photo,
            "bio": self.bio,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def as_self_user(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "student_id": self.student_id,
            "profile_photo": self.profile_photo,
            "bio": self.bio,
            "created_at": str(self.created_at),
            "updated_at": str(self.updated_at),
            "approved": self.approved,
            "email": self.email,
            "role": self.role.value,
        }
