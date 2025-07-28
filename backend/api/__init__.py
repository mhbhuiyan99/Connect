from fastapi import APIRouter

from . import admin, alumni, approve, auth, event, image, notice, skills, users

router = APIRouter(prefix="/v1")
router.include_router(admin.router)
router.include_router(alumni.router)
router.include_router(approve.router)
router.include_router(auth.router)
router.include_router(event.router)
router.include_router(image.router)
router.include_router(notice.router)
router.include_router(skills.router)
router.include_router(users.router)


__all__ = ["router"]
