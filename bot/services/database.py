"""
Odobli.ai — Supabase Database Service with SQLite Fallback
"""
import asyncio
from datetime import datetime, timedelta, timezone
from typing import Optional
import sqlite3
import uuid
from config import config

DB_FILE = "odobli.db"

def init_sqlite():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        telegram_id INTEGER UNIQUE,
        username TEXT,
        ism TEXT DEFAULT 'Foydalanuvchi',
        til_skripti TEXT DEFAULT 'lotin',
        trial_ends_at TEXT,
        is_premium INTEGER DEFAULT 0,
        premium_until TEXT,
        is_banned INTEGER DEFAULT 0,
        reminder_hour INTEGER DEFAULT 9,
        bolalar TEXT DEFAULT '[]',
        created_at TEXT
    )
    """)
    # Migrations for existing DB tables
    for col_def in [
        ("is_banned", "INTEGER DEFAULT 0"),
        ("reminder_hour", "INTEGER DEFAULT 9"),
        ("bolalar", "TEXT DEFAULT '[]'")
    ]:
        try:
            c.execute(f"ALTER TABLE users ADD COLUMN {col_def[0]} {col_def[1]}")
        except Exception:
            pass

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
    c.execute("CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id)")
    c.execute("CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id)")
    conn.commit()
    conn.close()

init_sqlite()

class Database:
    def __init__(self):
        self.supabase_ready = False
        if config.SUPABASE_URL and "your-project" not in config.SUPABASE_URL:
            try:
                from supabase import create_client
                self.client = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
                self.supabase_ready = True
            except Exception as e:
                print(f"Supabase init warning: {e}")

    # ==========================================
    # USERS
    # ==========================================
    
    async def get_user(self, telegram_id: int) -> Optional[dict]:
        if self.supabase_ready:
            try:
                res = self.client.table("users").select("*").eq("telegram_id", telegram_id).execute()
                if res.data:
                    return res.data[0]
            except Exception:
                pass
        
        # Non-blocking SQLite Fallback
        def _get_sqlite_user():
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

        return await asyncio.to_thread(_get_sqlite_user)
    
    async def create_user(self, telegram_id: int, ism: str, username: str = None, til: str = "lotin") -> dict:
        now_utc = datetime.now(timezone.utc)
        trial_end = (now_utc + timedelta(days=config.TRIAL_DAYS)).isoformat()
        now_str = now_utc.isoformat()
        user_id = str(uuid.uuid4())

        if self.supabase_ready:
            try:
                data = {
                    "telegram_id": telegram_id,
                    "ism": ism,
                    "username": username,
                    "til_skripti": til,
                    "trial_ends_at": trial_end,
                }
                res = self.client.table("users").insert(data).execute()
                if res.data:
                    u = res.data[0]
                    self.client.table("user_progress").insert({
                        "user_id": u["id"],
                        "jami_ball": 0,
                        "joriy_streak": 0,
                        "eng_uzun_streak": 0,
                    }).execute()
                    return u
            except Exception as e:
                print(f"Supabase create user error: {e}")

        # Non-blocking SQLite Fallback
        def _create_sqlite_user():
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("""
            INSERT OR IGNORE INTO users (id, telegram_id, username, ism, til_skripti, trial_ends_at, is_premium, created_at)
            VALUES (?, ?, ?, ?, ?, ?, 0, ?)
            """, (user_id, telegram_id, username, ism, til, trial_end, now_str))
            c.execute("""
            INSERT OR IGNORE INTO user_progress (user_id, jami_ball, joriy_streak, eng_uzun_streak)
            VALUES (?, 0, 0, 0)
            """, (user_id,))
            conn.commit()
            conn.close()

        await asyncio.to_thread(_create_sqlite_user)

        return {
            "id": user_id,
            "telegram_id": telegram_id,
            "ism": ism,
            "username": username,
            "til_skripti": til,
            "trial_ends_at": trial_end,
            "is_premium": False
        }

    async def update_user_til(self, telegram_id: int, til: str):
        if self.supabase_ready:
            try:
                self.client.table("users").update({"til_skripti": til}).eq("telegram_id", telegram_id).execute()
            except Exception:
                pass
        
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("UPDATE users SET til_skripti = ? WHERE telegram_id = ?", (til, telegram_id))
        conn.commit()
        conn.close()

    async def get_user_with_progress(self, telegram_id: int) -> Optional[dict]:
        user = await self.get_user(telegram_id)
        if not user:
            return None
        
        progress = {"jami_ball": 0, "joriy_streak": 0, "eng_uzun_streak": 0}
        if self.supabase_ready:
            try:
                res = self.client.table("user_progress").select("*").eq("user_id", user["id"]).execute()
                if res.data:
                    progress = res.data[0]
            except Exception:
                pass
        else:
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute("SELECT * FROM user_progress WHERE user_id = ?", (user["id"],))
            row = c.fetchone()
            conn.close()
            if row:
                progress = dict(row)

        user["progress"] = progress
        return user

    def is_user_active(self, user: dict) -> bool:
        now = datetime.now(timezone.utc)
        if user.get("is_premium") and user.get("premium_until"):
            try:
                p_end = datetime.fromisoformat(user["premium_until"].replace("Z", "+00:00"))
                if p_end.tzinfo is None:
                    p_end = p_end.replace(tzinfo=timezone.utc)
                if p_end > now:
                    return True
            except Exception:
                pass
        
        if user.get("trial_ends_at"):
            try:
                t_end = datetime.fromisoformat(user["trial_ends_at"].replace("Z", "+00:00"))
                if t_end.tzinfo is None:
                    t_end = t_end.replace(tzinfo=timezone.utc)
                if t_end > now:
                    return True
            except Exception:
                pass
        
        return False

    def get_trial_days_left(self, user: dict) -> int:
        if not user.get("trial_ends_at"):
            return 0
        try:
            now = datetime.now(timezone.utc)
            t_end = datetime.fromisoformat(user["trial_ends_at"].replace("Z", "+00:00"))
            if t_end.tzinfo is None:
                t_end = t_end.replace(tzinfo=timezone.utc)
            days = (t_end - now).days
            return max(0, days)
        except Exception:
            return 0

    # ==========================================
    # PAYMENTS
    # ==========================================

    async def create_payment(self, user_id: str, screenshot_file_id: str) -> dict:
        pay_id = str(uuid.uuid4())
        now_str = datetime.now(timezone.utc).isoformat()
        data = {
            "id": pay_id,
            "user_id": user_id,
            "summa": config.PREMIUM_PRICE,
            "screenshot_file_id": screenshot_file_id,
            "holat": "kutilmoqda"
        }

        if self.supabase_ready:
            try:
                res = self.client.table("payments").insert(data).execute()
                if res.data:
                    return res.data[0]
            except Exception:
                pass

        def _create_sqlite_payment():
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("""
            INSERT INTO payments (id, user_id, summa, screenshot_file_id, holat, created_at)
            VALUES (?, ?, ?, ?, 'kutilmoqda', ?)
            """, (pay_id, user_id, config.PREMIUM_PRICE, screenshot_file_id, now_str))
            conn.commit()
            conn.close()

        await asyncio.to_thread(_create_sqlite_payment)
        return data

    async def approve_payment(self, payment_id: str) -> Optional[dict]:
        now = datetime.now(timezone.utc)
        prem_until = (now + timedelta(days=config.PREMIUM_DAYS)).isoformat()
        now_str = now.isoformat()

        if self.supabase_ready:
            try:
                res = self.client.table("payments").select("*").eq("id", payment_id).execute()
                if res.data:
                    p = res.data[0]
                    self.client.table("payments").update({"holat": "tasdiqlangan", "tasdiqlangan_at": now_str}).eq("id", payment_id).execute()
                    self.client.table("users").update({"is_premium": True, "premium_until": prem_until}).eq("id", p["user_id"]).execute()
                    u_res = self.client.table("users").select("*").eq("id", p["user_id"]).execute()
                    if u_res.data:
                        return u_res.data[0]
            except Exception:
                pass

        def _approve_sqlite_payment():
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute("SELECT * FROM payments WHERE id = ?", (payment_id,))
            p_row = c.fetchone()
            if not p_row:
                conn.close()
                return None
            user_id = p_row["user_id"]

            c.execute("UPDATE payments SET holat = 'tasdiqlangan', tasdiqlangan_at = ? WHERE id = ?", (now_str, payment_id))
            c.execute("UPDATE users SET is_premium = 1, premium_until = ? WHERE id = ?", (prem_until, user_id))
            c.execute("SELECT * FROM users WHERE id = ?", (user_id,))
            u_row = c.fetchone()
            conn.commit()
            conn.close()

            if u_row:
                return dict(u_row)
            return None

        return await asyncio.to_thread(_approve_sqlite_payment)

    async def reject_payment(self, payment_id: str) -> Optional[dict]:
        if self.supabase_ready:
            try:
                res = self.client.table("payments").select("*").eq("id", payment_id).execute()
                if res.data:
                    self.client.table("payments").update({"holat": "rad_etilgan"}).eq("id", payment_id).execute()
                    u_res = self.client.table("users").select("*").eq("id", res.data[0]["user_id"]).execute()
                    if u_res.data:
                        return u_res.data[0]
            except Exception:
                pass

        def _reject_sqlite_payment():
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute("SELECT user_id FROM payments WHERE id = ?", (payment_id,))
            p_row = c.fetchone()
            if p_row:
                user_id = p_row["user_id"]
                c.execute("UPDATE payments SET holat = 'rad_etilgan' WHERE id = ?", (payment_id,))
                c.execute("SELECT * FROM users WHERE id = ?", (user_id,))
                u_row = c.fetchone()
                conn.commit()
                conn.close()
                return dict(u_row) if u_row else None
            conn.close()
            return None

        return await asyncio.to_thread(_reject_sqlite_payment)

    async def get_all_active_users(self) -> list:
        if self.supabase_ready:
            try:
                res = self.client.table("users").select("telegram_id, ism, til_skripti").execute()
                if res.data:
                    return res.data
            except Exception:
                pass
        
        def _get_sqlite_all_users():
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute("SELECT telegram_id, ism, til_skripti FROM users")
            rows = c.fetchall()
            conn.close()
            return [dict(r) for r in rows]

        return await asyncio.to_thread(_get_sqlite_all_users)

    # ==========================================
    # ADMIN PANEL SERVICES
    # ==========================================

    async def get_admin_stats(self) -> dict:
        def _sqlite_stats():
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            
            c.execute("SELECT COUNT(*) as cnt FROM users")
            total_users = c.fetchone()["cnt"]
            
            c.execute("SELECT COUNT(*) as cnt FROM users WHERE is_premium = 1")
            premium_users = c.fetchone()["cnt"]

            c.execute("SELECT COUNT(*) as cnt FROM payments WHERE holat = 'kutilmoqda'")
            pending_payments = c.fetchone()["cnt"]

            c.execute("SELECT COUNT(*) as cnt FROM payments WHERE holat = 'tasdiqlangan'")
            approved_payments = c.fetchone()["cnt"]

            c.execute("SELECT SUM(summa) as total FROM payments WHERE holat = 'tasdiqlangan'")
            row_sum = c.fetchone()["total"]
            total_revenue = row_sum if row_sum else 0

            conn.close()
            return {
                "total_users": total_users,
                "premium_users": premium_users,
                "free_users": total_users - premium_users,
                "pending_payments": pending_payments,
                "approved_payments": approved_payments,
                "total_revenue": total_revenue
            }

        if self.supabase_ready:
            try:
                u_res = self.client.table("users").select("id, is_premium").execute()
                p_res = self.client.table("payments").select("id, holat, summa").execute()
                if u_res.data is not None and p_res.data is not None:
                    users = u_res.data
                    payments = p_res.data
                    total_users = len(users)
                    premium_users = sum(1 for u in users if u.get("is_premium"))
                    pending_payments = sum(1 for p in payments if p.get("holat") == "kutilmoqda")
                    approved_payments = sum(1 for p in payments if p.get("holat") == "tasdiqlangan")
                    total_revenue = sum(p.get("summa", 0) for p in payments if p.get("holat") == "tasdiqlangan")
                    return {
                        "total_users": total_users,
                        "premium_users": premium_users,
                        "free_users": total_users - premium_users,
                        "pending_payments": pending_payments,
                        "approved_payments": approved_payments,
                        "total_revenue": total_revenue
                    }
            except Exception as e:
                print(f"Supabase stats error: {e}")

        return await asyncio.to_thread(_sqlite_stats)

    async def get_pending_payments(self) -> list:
        if self.supabase_ready:
            try:
                p_res = self.client.table("payments").select("*, users(*)").eq("holat", "kutilmoqda").order("created_at", desc=True).execute()
                if p_res.data:
                    res = []
                    for item in p_res.data:
                        u = item.get("users") or {}
                        res.append({
                            "payment_id": item["id"],
                            "summa": item["summa"],
                            "screenshot_file_id": item["screenshot_file_id"],
                            "created_at": item.get("created_at", ""),
                            "telegram_id": u.get("telegram_id"),
                            "ism": u.get("ism", "Noma'lum"),
                            "username": u.get("username")
                        })
                    return res
            except Exception as e:
                print(f"Supabase get_pending_payments error: {e}")

        def _sqlite_pending():
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute("""
            SELECT p.id as payment_id, p.summa, p.screenshot_file_id, p.created_at, u.telegram_id, u.ism, u.username
            FROM payments p
            JOIN users u ON p.user_id = u.id
            WHERE p.holat = 'kutilmoqda'
            ORDER BY p.created_at DESC
            """)
            rows = c.fetchall()
            conn.close()
            return [dict(r) for r in rows]

        return await asyncio.to_thread(_sqlite_pending)

    async def search_user_admin(self, query: str) -> Optional[dict]:
        if self.supabase_ready:
            try:
                query_clean = query.replace("@", "").strip()
                if query_clean.isdigit():
                    res = self.client.table("users").select("*").eq("telegram_id", int(query_clean)).execute()
                else:
                    res = self.client.table("users").select("*").ilike("username", f"%{query_clean}%").limit(1).execute()
                if res.data:
                    return res.data[0]
            except Exception as e:
                print(f"Supabase search_user_admin error: {e}")

        def _sqlite_search():
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            query_clean = query.replace("@", "").strip()
            c.execute("SELECT * FROM users WHERE telegram_id = ? OR username LIKE ? LIMIT 1", (query_clean, f"%{query_clean}%"))
            row = c.fetchone()
            conn.close()
            return dict(row) if row else None

        return await asyncio.to_thread(_sqlite_search)

    async def grant_user_premium(self, telegram_id: int, days: int = 30) -> bool:
        now = datetime.now(timezone.utc)
        prem_until = (now + timedelta(days=days)).isoformat()
        
        if self.supabase_ready:
            try:
                self.client.table("users").update({"is_premium": True, "premium_until": prem_until}).eq("telegram_id", telegram_id).execute()
            except Exception:
                pass

        def _sqlite_grant():
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("UPDATE users SET is_premium = 1, premium_until = ? WHERE telegram_id = ?", (prem_until, telegram_id))
            conn.commit()
            affected = c.rowcount
            conn.close()
            return affected > 0

        return await asyncio.to_thread(_sqlite_grant)

        return await asyncio.to_thread(_sqlite_revoke)

    # ==========================================
    # BAN MANAGEMENT
    # ==========================================

    async def ban_user(self, telegram_id: int) -> bool:
        if self.supabase_ready:
            try:
                self.client.table("users").update({"is_banned": True}).eq("telegram_id", telegram_id).execute()
            except Exception:
                pass

        def _sqlite_ban():
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("UPDATE users SET is_banned = 1 WHERE telegram_id = ?", (telegram_id,))
            conn.commit()
            affected = c.rowcount
            conn.close()
            return affected > 0

        return await asyncio.to_thread(_sqlite_ban)

    async def unban_user(self, telegram_id: int) -> bool:
        if self.supabase_ready:
            try:
                self.client.table("users").update({"is_banned": False}).eq("telegram_id", telegram_id).execute()
            except Exception:
                pass

        def _sqlite_unban():
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("UPDATE users SET is_banned = 0 WHERE telegram_id = ?", (telegram_id,))
            conn.commit()
            affected = c.rowcount
            conn.close()
            return affected > 0

        return await asyncio.to_thread(_sqlite_unban)

    async def is_user_banned(self, telegram_id: int) -> bool:
        user = await self.get_user(telegram_id)
        if user:
            return bool(user.get("is_banned", False))
        return False

    # ==========================================
    # GAMIFICATION & LEADERBOARD
    # ==========================================

    async def get_leaderboard(self, limit: int = 10) -> list:
        def _sqlite_lb():
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute("""
            SELECT u.ism, u.username, u.telegram_id, p.jami_ball, p.joriy_streak
            FROM user_progress p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.jami_ball DESC, p.joriy_streak DESC
            LIMIT ?
            """, (limit,))
            rows = c.fetchall()
            conn.close()
            return [dict(r) for r in rows]

        if self.supabase_ready:
            try:
                res = self.client.table("user_progress").select("jami_ball, joriy_streak, users(ism, username, telegram_id)").order("jami_ball", desc=True).limit(limit).execute()
                if res.data:
                    lb = []
                    for item in res.data:
                        u = item.get("users") or {}
                        lb.append({
                            "ism": u.get("ism", "Foydalanuvchi"),
                            "username": u.get("username"),
                            "telegram_id": u.get("telegram_id"),
                            "jami_ball": item.get("jami_ball", 0),
                            "joriy_streak": item.get("joriy_streak", 0)
                        })
                    return lb
            except Exception as e:
                print(f"Supabase leaderboard error: {e}")

        return await asyncio.to_thread(_sqlite_lb)

    async def claim_points_bonus(self, telegram_id: int) -> tuple:
        """Exchanges 1000 points for 5 days of Premium"""
        user = await self.get_user_with_progress(telegram_id)
        if not user:
            return False, "Foydalanuvchi topilmadi."

        progress = user.get("progress", {})
        jami_ball = progress.get("jami_ball", 0)
        if jami_ball < 1000:
            return False, f"Sizda yetarli ball yo'q. Hozirgi ball: {jami_ball} (Talab qilinadi: 1000 ball)"

        new_ball = jami_ball - 1000
        # Add 5 days of premium
        now = datetime.now(timezone.utc)
        current_prem = user.get("premium_until")
        if current_prem and user.get("is_premium"):
            try:
                base_dt = datetime.fromisoformat(current_prem.replace("Z", "+00:00"))
                if base_dt < now:
                    base_dt = now
            except Exception:
                base_dt = now
        else:
            base_dt = now

        new_prem_until = (base_dt + timedelta(days=5)).isoformat()

        # Update progress and premium
        if self.supabase_ready:
            try:
                self.client.table("user_progress").update({"jami_ball": new_ball}).eq("user_id", user["id"]).execute()
                self.client.table("users").update({"is_premium": True, "premium_until": new_prem_until}).eq("id", user["id"]).execute()
            except Exception:
                pass

        def _sqlite_claim():
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("UPDATE user_progress SET jami_ball = ? WHERE user_id = ?", (new_ball, user["id"]))
            c.execute("UPDATE users SET is_premium = 1, premium_until = ? WHERE id = ?", (new_prem_until, user["id"]))
            conn.commit()
            conn.close()

        await asyncio.to_thread(_sqlite_claim)
        return True, "🎉 Tabriklaymiz! 1000 ball evaziga sizga +5 kunlik Premium taqdim etildi!"

    # ==========================================
    # FAMILY & REMINDER SETTINGS
    # ==========================================

    async def update_user_reminder_hour(self, telegram_id: int, hour: int) -> bool:
        hour = max(0, min(23, hour))
        if self.supabase_ready:
            try:
                self.client.table("users").update({"reminder_hour": hour}).eq("telegram_id", telegram_id).execute()
            except Exception:
                pass

        def _sqlite_rem():
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("UPDATE users SET reminder_hour = ? WHERE telegram_id = ?", (hour, telegram_id))
            conn.commit()
            conn.close()
            return True

        return await asyncio.to_thread(_sqlite_rem)

    async def add_child(self, telegram_id: int, ism: str, yosh: int) -> list:
        import json
        user = await self.get_user(telegram_id)
        if not user:
            return []

        existing_bolalar_raw = user.get("bolalar", "[]")
        if isinstance(existing_bolalar_raw, list):
            bolalar_list = existing_bolalar_raw
        else:
            try:
                bolalar_list = json.loads(existing_bolalar_raw)
            except Exception:
                bolalar_list = []

        bolalar_list.append({"ism": ism, "yosh": yosh})
        updated_json = json.dumps(bolalar_list, ensure_ascii=False)

        if self.supabase_ready:
            try:
                self.client.table("users").update({"bolalar": updated_json}).eq("telegram_id", telegram_id).execute()
            except Exception:
                pass

        def _sqlite_child():
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("UPDATE users SET bolalar = ? WHERE telegram_id = ?", (updated_json, telegram_id))
            conn.commit()
            conn.close()

        await asyncio.to_thread(_sqlite_child)
        return bolalar_list

    async def get_users_by_reminder_hour(self, hour: int) -> list:
        if self.supabase_ready:
            try:
                res = self.client.table("users").select("telegram_id, ism, til_skripti").eq("reminder_hour", hour).execute()
                if res.data:
                    return res.data
            except Exception:
                pass

        def _sqlite_get_rem():
            conn = sqlite3.connect(DB_FILE)
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute("SELECT telegram_id, ism, til_skripti FROM users WHERE reminder_hour = ?", (hour,))
            rows = c.fetchall()
            conn.close()
            return [dict(r) for r in rows]

        return await asyncio.to_thread(_sqlite_get_rem)

db = Database()
