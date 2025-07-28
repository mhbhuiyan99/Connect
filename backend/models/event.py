from datetime import datetime

from beanie import Document
from pydantic import Field


class EventModel(Document):
    title: str
    date: datetime
    location: str
    description: str
    photo: str = Field(default="")

    #updated_at: datetime = Field(default_factory=datetime.utcnow)

    def as_event(self):
        return {
            "id": str(self.id),
            "title": self.title,
            "date": self.date,
            "location": self.location,
            "description": self.description,
            "photo": self.photo,
        }
