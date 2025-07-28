from datetime import datetime

from pydantic import BaseModel, Field


class AddNoticeRequest(BaseModel):
    title: str
    content: str
    image_url: str | None = Field(default="")


class GetNoticeResponse(BaseModel):
    id: str
    title: str
    content: str
    image_url: str | None = Field(default="")
    author: str
    author_name: str = Field(default="")
    author_profile_photo: str = Field(default="")
    created_at: datetime
    updated_at: datetime
