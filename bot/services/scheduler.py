"""
Daily Reminder Scheduler
"""
import asyncio
import logging
from aiogram import Bot
from config import config
from services.database import db
from utils.transliterate import convert_text

import os
from datetime import datetime
from aiogram.types import FSInputFile

logger = logging.getLogger(__name__)

async def send_hourly_reminders(bot: Bot):
    now_hour = datetime.now().hour
    logger.info(f"Sending hourly reminders for hour {now_hour:02d}:00...")
    users = await db.get_users_by_reminder_hour(now_hour)
    for u in users:
        tg_id = u.get("telegram_id")
        ism = u.get("ism", "Foydalanuvchi")
        til = u.get("til_skripti", "lotin")
        
        msg = convert_text(
            f"☀️ Assalomu alaykum, {ism}!\n\n"
            f"Bugungi taom g'oyasi, ibratli ertak va qiziqarli topishmoqlar ilovada tayyor! ✨\n"
            f"Keling, streakni davom ettiramiz!",
            til
        )
        try:
            await bot.send_message(tg_id, msg)
            await asyncio.sleep(0.05)
        except Exception:
            pass

async def send_daily_db_backup(bot: Bot):
    logger.info("Running daily database backup task...")
    db_path = "odobli.db"
    if os.path.exists(db_path) and config.ADMIN_ID:
        try:
            doc = FSInputFile(db_path, filename=f"odobli_backup_{datetime.now().strftime('%Y%m%d')}.db")
            caption = f"📦 <b>Kunlik Baza Zaxira Nusxasi</b>\n📅 Sana: {datetime.now().strftime('%Y-%m-%d %H:%M')}"
            await bot.send_document(config.ADMIN_ID, document=doc, caption=caption, parse_mode="HTML")
            logger.info("Database backup sent to admin successfully.")
        except Exception as e:
            logger.error(f"Error sending DB backup: {e}")

def setup_scheduler(bot: Bot):
    try:
        from apscheduler.schedulers.asyncio import AsyncIOScheduler
        scheduler = AsyncIOScheduler()
        
        # Run every hour to trigger user-specific reminders
        scheduler.add_job(
            send_hourly_reminders,
            "cron",
            minute=0,
            args=[bot]
        )
        
        # Run daily DB backup at 23:00
        scheduler.add_job(
            send_daily_db_backup,
            "cron",
            hour=23,
            minute=0,
            args=[bot]
        )
        
        scheduler.start()
        logger.info("Scheduler started successfully (Hourly reminders & Daily DB backup).")
    except Exception as e:
        logger.warning(f"Could not start scheduler: {e}")
