"""
Odobli.ai Bot — Main Entrypoint
"""
import os
import sys

# Ensure bot folder is at head of sys.path BEFORE any local imports
BOT_DIR = os.path.dirname(os.path.abspath(__file__))
if BOT_DIR not in sys.path:
    sys.path.insert(0, BOT_DIR)

import asyncio
import logging
from config import config
from middlewares.throttling import ThrottlingMiddleware
from middlewares.ban_check import BanCheckMiddleware
from handlers import setup_routers
from services.scheduler import setup_scheduler
from aiogram import Bot, Dispatcher
from aiogram.types import BotCommand

logging.basicConfig(level=logging.INFO)

async def main():
    if not config.BOT_TOKEN or config.BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("⚠️ BOT_TOKEN sozlanmagan! Iltimos, config.py yoki .env faylini sozlang.")
        return

    bot = Bot(token=config.BOT_TOKEN)
    dp = Dispatcher()

    # Register Middlewares
    ban_check = BanCheckMiddleware()
    throttling = ThrottlingMiddleware(rate_limit=0.5)

    dp.message.outer_middleware(ban_check)
    dp.callback_query.outer_middleware(ban_check)
    dp.message.middleware(throttling)
    dp.callback_query.middleware(throttling)

    # Register Routers
    dp.include_router(setup_routers())

    # Setup Scheduler
    setup_scheduler(bot)

    # Set Default Bot Commands
    try:
        await bot.set_my_commands([
            BotCommand(command="start", description="Botni ishga tushirish"),
            BotCommand(command="profil", description="Mening profilim"),
            BotCommand(command="premium", description="Premium obuna"),
            BotCommand(command="leaderboard", description="Peshqadamlar jadvallari"),
            BotCommand(command="feedback", description="Fikr bildirish va bog'lanish")
        ])
    except Exception as e:
        logging.warning(f"Could not set bot commands: {e}")

    print("🤖 Odobli.ai Telegram boti muvaffaqiyatli ishga tushirildi...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
