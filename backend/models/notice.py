from datetime import UTC, datetime
from functools import partial

from beanie import Document, Link
from pydantic import Field

from .user import UserModel


class NoticeModel(Document):
    title: str
    content: str
    image_url: str | None = Field(default="")
    user: Link[UserModel] | None = Field(default=None)
    created_at: datetime = Field(default_factory=partial(datetime.now, tz=UTC))
    updated_at: datetime = Field(default_factory=partial(datetime.now, tz=UTC))

    class Settings:
        name = "notice"
