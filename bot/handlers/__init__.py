from aiogram import Router
from .start import router as start_router
from .premium import router as premium_router
from .profile import router as profile_router
from .admin import router as admin_router

def setup_routers() -> Router:
    main_router = Router()
    main_router.include_router(start_router)
    main_router.include_router(premium_router)
    main_router.include_router(profile_router)
    main_router.include_router(admin_router)
    return main_router
