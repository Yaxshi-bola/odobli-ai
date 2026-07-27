import sqlite3
import uuid
from datetime import datetime, timedelta
import httpx
from config import SUPABASE_URL, SUPABASE_KEY

DB_FILE = "odobli.db"

def init_sqlite_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        telegram_id INTEGER UNIQUE,
        username TEXT,
        ism TEXT,
        til_skripti TEXT DEFAULT 'lotin',
        trial_ends_at TEXT,
        is_premium INTEGER DEFAULT 0,
        premium_until TEXT,
        created_at TEXT
    )
    """)
    c.execute("""
    CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        summa INTEGER,
        screenshot_file_id TEXT,
        holat TEXT DEFAULT 'kutilmoqda',
        created_at TEXT,
        tasdiqlangan_at TEXT
    )
    """)
    c.execute("""
    CREATE TABLE IF NOT EXISTS user_progress (
        user_id TEXT PRIMARY KEY,
        jami_ball INTEGER DEFAULT 0,
        joriy_streak INTEGER DEFAULT 0,
        eng_uzun_streak INTEGER DEFAULT 0
    )
    """)
    conn.commit()
    conn.close()

init_sqlite_db()

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

class DatabaseService:
    @staticmethod
    async def get_user_by_telegram_id(telegram_id: int):
        # Try Supabase if configured
        if "your-project" not in SUPABASE_URL:
            try:
                async with httpx.AsyncClient() as client:
                    res = await client.get(
                        f"{SUPABASE_URL}/rest/v1/users?telegram_id=eq.{telegram_id}",
                        headers=HEADERS,
                        timeout=3.0
                    )
                    if res.status_code == 200 and res.json():
                        return res.json()[0]
            except Exception:
                pass

        # Fallback SQLite
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE telegram_id = ?", (telegram_id,))
        row = c.fetchone()
        conn.close()
        if row:
            u = dict(row)
            u["is_premium"] = bool(u["is_premium"])
            return u
        return None

    @staticmethod
    async def create_user(telegram_id: int, ism: str, username: str = None, til_skripti: str = "lotin"):
        now = datetime.utcnow()
        user_id = str(uuid.uuid4())
        trial_ends = (now + timedelta(days=7)).isoformat()
        now_str = now.isoformat()

        # SQLite insert
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("""
        INSERT OR IGNORE INTO users (id, telegram_id, username, ism, til_skripti, trial_ends_at, is_premium, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 0, ?)
        """, (user_id, telegram_id, username, ism, til_skripti, trial_ends, now_str))
        
        c.execute("""
        INSERT OR IGNORE INTO user_progress (user_id, jami_ball, joriy_streak, eng_uzun_streak)
        VALUES (?, 0, 0, 0)
        """, (user_id,))
        conn.commit()
        conn.close()

        user = {
            "id": user_id,
            "telegram_id": telegram_id,
            "username": username,
            "ism": ism,
            "til_skripti": til_skripti,
            "trial_ends_at": trial_ends,
            "is_premium": False
        }
        return user

    @staticmethod
    async def update_user_script(telegram_id: int, til_skripti: str):
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("UPDATE users SET til_skripti = ? WHERE telegram_id = ?", (til_skripti, telegram_id))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    async def get_user_progress(user_id: str):
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row
        c = conn.cursor()
        c.execute("SELECT * FROM user_progress WHERE user_id = ?", (user_id,))
        row = c.fetchone()
        conn.close()
        if row:
            return dict(row)
        return {"jami_ball": 0, "joriy_streak": 0}

    @staticmethod
    async def create_payment(user_id: str, summa: int, screenshot_file_id: str):
        payment_id = str(uuid.uuid4())
        now_str = datetime.utcnow().isoformat()
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("""
        INSERT INTO payments (id, user_id, summa, screenshot_file_id, holat, created_at)
        VALUES (?, ?, ?, ?, 'kutilmoqda', ?)
        """, (payment_id, user_id, summa, screenshot_file_id, now_str))
        conn.commit()
        conn.close()
        return {
            "id": payment_id,
            "user_id": user_id,
            "summa": summa,
            "screenshot_file_id": screenshot_file_id,
            "holat": "kutilmoqda"
        }

    @staticmethod
    async def approve_payment(payment_id: str, days: int = 30):
        now_str = datetime.utcnow().isoformat()
        premium_until = (datetime.utcnow() + timedelta(days=days)).isoformat()
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row
        c = conn.cursor()
        c.execute("SELECT user_id FROM payments WHERE id = ?", (payment_id,))
        p_row = c.fetchone()
        if not p_row:
            conn.close()
            return None
        user_id = p_row["user_id"]

        c.execute("UPDATE payments SET holat = 'tasdiqlangan', tasdiqlangan_at = ? WHERE id = ?", (now_str, payment_id))
        c.execute("UPDATE users SET is_premium = 1, premium_until = ? WHERE id = ?", (premium_until, user_id))
        conn.commit()
        conn.close()
        return {"id": user_id, "is_premium": True, "premium_until": premium_until}

    @staticmethod
    async def reject_payment(payment_id: str):
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("UPDATE payments SET holat = 'rad_etilgan' WHERE id = ?", (payment_id,))
        conn.commit()
        conn.close()
        return True
