from datetime import datetime

from pydantic import BaseModel


class InsertEventRequest(BaseModel):
    title: str
    date: datetime
    location: str
    description: str
    photo: str
