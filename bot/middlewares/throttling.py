import time
from typing import Any, Awaitable, Callable, Dict
from aiogram import BaseMiddleware
from aiogram.types import TelegramObject, Message, CallbackQuery

class ThrottlingMiddleware(BaseMiddleware):
    def __init__(self, rate_limit: float = 0.8):
        super().__init__()
        self.rate_limit = rate_limit
        self.user_timestamps: Dict[int, float] = {}
        self.last_cleanup = time.time()

    def _cleanup_stale(self, now: float):
        if now - self.last_cleanup > 300:  # Cleanup every 5 minutes
            stale_keys = [uid for uid, ts in self.user_timestamps.items() if now - ts > 60]
            for key in stale_keys:
                del self.user_timestamps[key]
            self.last_cleanup = now

    async def __call__(
        self,
        handler: Callable[[TelegramObject, Dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: Dict[str, Any]
    ) -> Any:
        user_id = None
        if isinstance(event, (Message, CallbackQuery)) and event.from_user:
            user_id = event.from_user.id

        if user_id:
            now = time.time()
            self._cleanup_stale(now)
            last_time = self.user_timestamps.get(user_id, 0)
            if now - last_time < self.rate_limit:
                if isinstance(event, Message):
                    await event.answer("⚠️ Iltimos, biroz kuting.")
                elif isinstance(event, CallbackQuery):
                    await event.answer("⚠️ Iltimos, juda tez bosmang.", show_alert=False)
                return
            self.user_timestamps[user_id] = now

        return await handler(event, data)
