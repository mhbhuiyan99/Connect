from datetime import UTC, datetime
from functools import partial
from typing import Annotated

import pymongo
from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr, Field

from .user import UserRole


class IndustryModel(BaseModel):
    industry: str
    platform: str
    position: str
    responsibilities: str
    software: str


class AlumniModel(Document):
    student_id: Annotated[str, Indexed(unique=True)]
    batch: int
    name: Annotated[str, Indexed(index_type=pymongo.TEXT)]
    email: Annotated[EmailStr, Indexed(unique=True)]
    industries: list["IndustryModel"] = Field(default_factory=list)
    skills: list[str]
    linked_in: str = Field(default="")
    facebook: str = Field(default="")
    github: str = Field(default="")
    role: UserRole = Field(default=UserRole.ALUMNI)
    sorting_order: int
    created_at: datetime = Field(default_factory=partial(datetime.now, tz=UTC))
    profile_photo: str | None = Field(default="")
    approved: bool = Field(default=False)
    updated_at: datetime = Field(default_factory=partial(datetime.now, tz=UTC))
    hometown: str = Field(default="")

    class Settings:
        name = "alumni"

    def as_alumni(self):
        return {
            "id": str(self.id),
            "approved": self.approved,
            "batch": self.batch,
            "email": self.email,
            "facebook": self.facebook,
            "github": self.github,
            "hometown": self.hometown,
            "industries": self.industries,
            "linked_in": self.linked_in,
            "name": self.name,
            "profile_photo": self.profile_photo,
            "role": self.role.value,
            "skills": self.skills,
            "sorting_order": self.sorting_order,
            "student_id": self.student_id,
        }
