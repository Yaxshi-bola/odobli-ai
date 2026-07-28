"""
Odobli.ai Bot — Konfiguratsiya
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Telegram credentials loaded securely from environment
    BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
    ADMIN_ID: int = int(os.getenv("ADMIN_ID", "0"))
    
    # Supabase credentials
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", os.getenv("SUPABASE_KEY", ""))
    
    # Mini App
    WEBAPP_URL: str = os.getenv("WEBAPP_URL", os.getenv("MINI_APP_URL", "https://web-nine-livid-hkkpqpjfb1.vercel.app"))
    
    # Premium
    PREMIUM_PRICE: int = int(os.getenv("PREMIUM_PRICE", "25000"))
    PREMIUM_DAYS: int = 30
    TRIAL_DAYS: int = 7
    CARD_NUMBER: str = os.getenv("CARD_NUMBER", "8600 0000 0000 0000")
    CARD_TYPE: str = os.getenv("CARD_TYPE", "Humo / Uzcard")
    PAYMENT_CARD: str = os.getenv("PAYMENT_CARD", f"{CARD_NUMBER} ({CARD_TYPE})")
    
    # Webhook
    WEBHOOK_HOST: str = os.getenv("WEBHOOK_HOST", "")
    WEBHOOK_PATH: str = f"/webhook/{BOT_TOKEN}"
    WEBHOOK_URL: str = f"{WEBHOOK_HOST}{WEBHOOK_PATH}"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = int(os.getenv("PORT", "8080"))
    
    # Daily reminder
    REMINDER_HOUR: int = 9
    REMINDER_MINUTE: int = 0

config = Config()

# Export top-level variables for backwards compatibility across all modules
BOT_TOKEN = config.BOT_TOKEN
ADMIN_ID = config.ADMIN_ID
SUPABASE_URL = config.SUPABASE_URL
SUPABASE_KEY = config.SUPABASE_KEY
MINI_APP_URL = config.WEBAPP_URL
CARD_NUMBER = config.PAYMENT_CARD
SUBSCRIPTION_PRICE_SOM = config.PREMIUM_PRICE
PREMIUM_PRICE = config.PREMIUM_PRICE
PREMIUM_DAYS = config.PREMIUM_DAYS
TRIAL_DAYS = config.TRIAL_DAYS
PAYMENT_CARD = config.PAYMENT_CARD
