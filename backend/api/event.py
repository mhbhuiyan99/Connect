import math
from datetime import UTC, datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from core.security import get_auth_user
from models.event import EventModel
from models.user import UserModel, UserRole
from schema.event import InsertEventRequest

router = APIRouter(prefix="/events", tags=["Events"])


@router.post("/create")
async def create_event(data: InsertEventRequest, user: Annotated[dict, Depends(get_auth_user)]):
    admin = await UserModel.get(user["sub"])
    if not admin or admin.role not in (UserRole.SUPERADMIN, UserRole.ADMIN):
        raise HTTPException(status_code=403, detail="Only superadmin/admin can create events")

    event = EventModel(**data.model_dump())
    await event.save()
    return {"message": "Event created", "event": event.as_event()}


@router.get("/")
async def list_events(page: int = 1, limit: int = 10):
    page = max(1, page)
    limit = max(10, min(100, limit))

    events = (
        await EventModel.find_all()
        .sort(-EventModel.date)
        .limit(limit)
        .skip((page - 1) * limit)
        .to_list()
    )
    total = await EventModel.count()
    return {
        "items": [e.as_event() for e in events],
        "page": page,
        "limit": limit,
        "total": total,
        "max_page": math.ceil(total / limit),
        "has_next": page < math.ceil(total / limit),
    }


@router.get("/list")
async def get_events():
    upcoming_events = (
        await EventModel.find(EventModel.date >= datetime.now(UTC))
        .sort(+EventModel.date)
        .limit(15)
        .to_list()
    )
    previous_events = (
        await EventModel.find(EventModel.date < datetime.now(UTC))
        .sort(-EventModel.date)
        .limit(15)
        .to_list()
    )
    return {
        "upcoming": [e.as_event() for e in upcoming_events],
        "previous": [e.as_event() for e in previous_events],
    }


@router.delete("/{event_id}")
async def delete_event(event_id: str, user: Annotated[dict, Depends(get_auth_user)]):
    admin = await UserModel.get(user["sub"])
    if not admin or admin.role not in (UserRole.SUPERADMIN, UserRole.ADMIN):
        raise HTTPException(status_code=403, detail="Only superadmin/admin can delete events")

    event = await EventModel.get(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    await event.delete()
    return {"message": "Event deleted"}


@router.get("/{event_id}")
async def get_event(event_id: str):
    event = await EventModel.get(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    return event.as_event()

@router.put("/{event_id}")
async def update_event(
    event_id: str,
    data: InsertEventRequest,
    user: Annotated[dict, Depends(get_auth_user)],
):
    admin = await UserModel.get(user["sub"])
    if not admin or admin.role not in (UserRole.SUPERADMIN, UserRole.ADMIN):
        raise HTTPException(status_code=403, detail="Only superadmin/admin can update events")

    event = await EventModel.get(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    update_data = data.model_dump()
    for key, value in update_data.items():
        setattr(event, key, value)

    #event.updated_at = datetime.now(UTC)  # Optional
    await event.save()

    return {"message": "Event updated", "event": event.as_event()}
