import logging

from beanie import init_beanie

import config

from .alumni import AlumniModel
from .notice import NoticeModel
from .user import UserModel, UserRole
from .event import EventModel


logger = logging.getLogger(__name__)


async def init_db():
    logger.info("Initializing database...")
    await init_beanie(
        connection_string=config.MONGODB_URI,
        document_models=[NoticeModel, UserModel, AlumniModel, EventModel],
    )
    logger.info("Database initialized")


__all__ = ["AlumniModel", "NoticeModel", "UserModel", "UserRole", "EventModel", "init_db"]
