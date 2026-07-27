from typing import Any, Awaitable, Callable, Dict
from aiogram import BaseMiddleware
from aiogram.types import TelegramObject, Message, CallbackQuery
from services.database import db

class BanCheckMiddleware(BaseMiddleware):
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
            is_banned = await db.is_user_banned(user_id)
            if is_banned:
                text = "⛔ <b>Siz Odobli.ai botidan bloklangansiz!</b>\n\nSavollar bo'lsa adminga murojaat qiling."
                if isinstance(event, Message):
                    await event.answer(text, parse_mode="HTML")
                elif isinstance(event, CallbackQuery):
                    await event.answer("⛔ Siz botdan bloklangansiz!", show_alert=True)
                return

        return await handler(event, data)
