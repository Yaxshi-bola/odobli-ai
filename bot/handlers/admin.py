import html
import asyncio
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

from config import config
from services.database import db
from utils.transliterate import convert_text

router = Router()

class AdminStates(StatesGroup):
    waiting_for_broadcast_msg = State()
    waiting_for_user_search = State()

def is_admin(user_id: int) -> bool:
    return user_id == config.ADMIN_ID

def get_admin_main_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="📊 Statistika & Tahlil", callback_data="admin_stats"),
            InlineKeyboardButton(text="💳 To'lovlar Navbati", callback_data="admin_payments")
        ],
        [
            InlineKeyboardButton(text="📢 Xabar Tarqatish", callback_data="admin_broadcast_start"),
            InlineKeyboardButton(text="🔍 Qidirish (/user)", callback_data="admin_search_start")
        ],
        [
            InlineKeyboardButton(text="⚙️ Tizim Holati", callback_data="admin_system_info")
        ]
    ])

@router.message(Command("admin", "panel"))
async def admin_panel_cmd(message: Message):
    if not is_admin(message.from_user.id):
        return

    text = (
        "🔐 <b>Odobli.ai Admin Boshqaruv Markazi</b>\n\n"
        "Xush kelibsiz! Boshqaruv bo'limini tanlang:"
    )
    await message.answer(text, parse_mode="HTML", reply_markup=get_admin_main_keyboard())

@router.callback_query(F.data == "admin_main_menu")
async def admin_main_menu_cb(callback: CallbackQuery, state: FSMContext):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    await state.clear()
    text = (
        "🔐 <b>Odobli.ai Admin Boshqaruv Markazi</b>\n\n"
        "Boshqaruv bo'limini tanlang:"
    )
    await callback.message.edit_text(text, parse_mode="HTML", reply_markup=get_admin_main_keyboard())
    await callback.answer()

# ==========================================
# STATISTIKA BO'LIMI
# ==========================================
@router.callback_query(F.data == "admin_stats")
async def admin_stats_cb(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    stats = await db.get_admin_stats()
    
    text = (
        "📊 <b>BOT STATISTIKASI VA TAHLILI</b>\n\n"
        f"👥 <b>Jami foydalanuvchilar:</b> <code>{stats['total_users']}</code> ta\n"
        f"🌟 <b>Premium a'zolar:</b> <code>{stats['premium_users']}</code> ta\n"
        f"🎁 <b>Bepul / Sinov a'zolar:</b> <code>{stats['free_users']}</code> ta\n\n"
        f"💳 <b>Tasdiqlangan to'lovlar:</b> <code>{stats['approved_payments']}</code> ta\n"
        f"⏳ <b>Kutilayotgan to'lovlar:</b> <code>{stats['pending_payments']}</code> ta\n"
        f"💰 <b>Jami Tushgan Daromad:</b> <code>{stats['total_revenue']:,}</code> so'm\n"
    )

    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🔄 Yangilash", callback_data="admin_stats")],
        [InlineKeyboardButton(text="⬅️ Orqaga", callback_data="admin_main_menu")]
    ])

    try:
        await callback.message.edit_text(text, parse_mode="HTML", reply_markup=kb)
    except Exception:
        pass
    await callback.answer("Yangilandi! ✅")

# ==========================================
# TO'LOVLAR NAVBATI BO'LIMI
# ==========================================
@router.callback_query(F.data == "admin_payments")
async def admin_payments_cb(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    pending = await db.get_pending_payments()

    if not pending:
        kb = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="⬅️ Orqaga", callback_data="admin_main_menu")]
        ])
        await callback.message.edit_text("✅ Hozircha kutilayotgan to'lovlar yo'q!", reply_markup=kb)
        await callback.answer()
        return

    for p in pending:
        safe_ism = html.escape(str(p.get('ism', 'Noma\'lum')))
        username_val = p.get('username')
        username_str = f"@{username_val}" if username_val else "yo'q"
        created_str = str(p.get('created_at', ''))[:19].replace('T', ' ')

        text = (
            "💳 <b>YANGI TO'LOV CHEKI!</b>\n\n"
            f"👤 <b>Foydalanuvchi:</b> {safe_ism}\n"
            f"🆔 <b>Telegram ID:</b> <code>{p['telegram_id']}</code>\n"
            f"🏷️ <b>Username:</b> {username_str}\n"
            f"💵 <b>Summa:</b> <code>{p['summa']:,}</code> so'm\n"
            f"📅 <b>Sana:</b> <code>{created_str}</code>\n"
        )
        kb = InlineKeyboardMarkup(inline_keyboard=[
            [
                InlineKeyboardButton(text="✅ Tasdiqlash", callback_data=f"approve_{p['payment_id']}"),
                InlineKeyboardButton(text="❌ Rad etish", callback_data=f"reject_{p['payment_id']}")
            ]
        ])
        try:
            await callback.bot.send_photo(
                chat_id=callback.from_user.id,
                photo=p['screenshot_file_id'],
                caption=text,
                parse_mode="HTML",
                reply_markup=kb
            )
        except Exception:
            await callback.bot.send_message(
                chat_id=callback.from_user.id,
                text=text + "\n\n⚠️ Screenshot ko'rsatib bo'lmadi.",
                parse_mode="HTML",
                reply_markup=kb
            )
    
    await callback.answer()

# ==========================================
# TO'LOV TASDIQLASH VA RAD ETISH
# ==========================================
@router.callback_query(F.data.startswith("approve_"))
async def approve_payment(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return
    
    payment_id = callback.data.replace("approve_", "")
    user = await db.approve_payment(payment_id)
    
    if user:
        til = user.get("til_skripti", "lotin")
        text = convert_text(
            "🎉 <b>To'lovingiz muvaffaqiyatli tasdiqlandi!</b>\n\n"
            "Premium obunangiz faollashtirildi. Odobli.ai ilovasidan to'liq foydalanishingiz mumkin! ✨",
            til
        )
        try:
            await callback.bot.send_message(user["telegram_id"], text, parse_mode="HTML")
        except Exception:
            pass

        if callback.message.caption:
            await callback.message.edit_caption(
                caption=callback.message.caption + "\n\n✅ <b>ADMIN TARAFIDAN TASDIQLANDI!</b>",
                parse_mode="HTML"
            )
        else:
            await callback.message.edit_text(
                text=callback.message.text + "\n\n✅ <b>ADMIN TARAFIDAN TASDIQLANDI!</b>",
                parse_mode="HTML"
            )
    else:
        await callback.answer("⚠️ To'lov topilmadi yoki allaqachon tasdiqlangan.", show_alert=True)
    await callback.answer()

@router.callback_query(F.data.startswith("reject_"))
async def reject_payment(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    payment_id = callback.data.replace("reject_", "")
    user = await db.reject_payment(payment_id)

    if user:
        til = user.get("til_skripti", "lotin")
        text = convert_text(
            "❌ <b>To'lovingiz rad etildi.</b>\n\n"
            "Iltimos, ma'lumotlarni hamda to'lov chekini qayta tekshirib yuboring.\n"
            "Savollar bo'lsa adminga murojaat qiling.",
            til
        )
        try:
            await callback.bot.send_message(user["telegram_id"], text, parse_mode="HTML")
        except Exception:
            pass

        if callback.message.caption:
            await callback.message.edit_caption(
                caption=callback.message.caption + "\n\n❌ <b>ADMIN TARAFIDAN RAD ETILDI.</b>",
                parse_mode="HTML"
            )
        else:
            await callback.message.edit_text(
                text=callback.message.text + "\n\n❌ <b>ADMIN TARAFIDAN RAD ETILDI.</b>",
                parse_mode="HTML"
            )
    else:
        await callback.answer("⚠️ Xatolik yuz berdi.", show_alert=True)
    await callback.answer()

# ==========================================
# XABAR TARQATISH (BROADCAST)
# ==========================================
@router.callback_query(F.data == "admin_broadcast_start")
async def admin_broadcast_start_cb(callback: CallbackQuery, state: FSMContext):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    await state.set_state(AdminStates.waiting_for_broadcast_msg)
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="❌ Bekor qilish", callback_data="admin_main_menu")]
    ])
    await callback.message.edit_text(
        "📢 <b>OMMAVIY XABAR TARQATISH</b>\n\n"
        "Barcha bot foydalanuvchilariga yubormoqchi bo'lgan xabaringizni yuboring (Matn, Rasm yoki Video):",
        parse_mode="HTML",
        reply_markup=kb
    )
    await callback.answer()

@router.message(AdminStates.waiting_for_broadcast_msg)
async def admin_broadcast_process(message: Message, state: FSMContext):
    if not is_admin(message.from_user.id):
        return

    users = await db.get_all_active_users()
    await state.clear()

    status_msg = await message.answer(f"⏳ Broadcast boshlandi... Jami {len(users)} ta foydalanuvchi.")
    
    success = 0
    failed = 0

    for u in users:
        try:
            await message.copy_to(chat_id=u["telegram_id"])
            success += 1
            await asyncio.sleep(0.04)
        except Exception:
            failed += 1

    await status_msg.edit_text(
        f"✅ <b>BROADCAST YAKUNLANDI!</b>\n\n"
        f"🟢 <b>Muvaffaqiyatli yetkazildi:</b> <code>{success}</code> ta\n"
        f"🔴 <b>Yetib bormadi (bloklagan):</b> <code>{failed}</code> ta",
        parse_mode="HTML",
        reply_markup=get_admin_main_keyboard()
    )

# ==========================================
# FOYDALANUVCHINI QIDIRISH VA PREMIUM BERISH
# ==========================================
@router.message(Command("user"))
async def admin_search_user_cmd(message: Message):
    if not is_admin(message.from_user.id):
        return

    args = message.text.split(maxsplit=1)
    if len(args) < 2:
        await message.answer("⚠️ Iltimos, foydalanuvchi Telegram ID yoki username kiriting!\nMasalan: <code>/user 12345678</code> yoki <code>/user @username</code>", parse_mode="HTML")
        return

    query = args[1].strip()
    user = await db.search_user_admin(query)

    if not user:
        await message.answer("❌ Foydalanuvchi ma'lumotlar bazasidan topilmadi.")
        return

    safe_ism = html.escape(str(user.get('ism', 'Noma\'lum')))
    username_val = user.get('username')
    username_str = f"@{username_val}" if username_val else "yo'q"

    is_banned = bool(user.get('is_banned', False))
    ban_status_str = "⛔ BLOKLANGAN" if is_banned else "✅ Aktiv"

    text = (
        "👤 <b>FOYDALANUVCHI MA'LUMOTLARI:</b>\n\n"
        f"📛 <b>Ism:</b> {safe_ism}\n"
        f"🆔 <b>Telegram ID:</b> <code>{user['telegram_id']}</code>\n"
        f"🏷️ <b>Username:</b> {username_str}\n"
        f"🌐 <b>Til:</b> <code>{user.get('til_skripti', 'lotin')}</code>\n"
        f"🛡️ <b>Holat:</b> <code>{ban_status_str}</code>\n"
        f"🌟 <b>Premium:</b> <code>{'HA (Aktiv)' if user.get('is_premium') else 'YO\'Q'}</code>\n"
        f"⌛ <b>Premium Tugash Muddati:</b> <code>{user.get('premium_until') or 'Mavjud emas'}</code>\n"
        f"📅 <b>Ro'yxatdan o'tgan sana:</b> <code>{str(user.get('created_at', 'Noma\'lum'))[:10]}</code>"
    )

    ban_btn = InlineKeyboardButton(text="✅ Blokdan chiqarish", callback_data=f"admin_unban_{user['telegram_id']}") if is_banned else InlineKeyboardButton(text="🚫 Bloklash", callback_data=f"admin_ban_{user['telegram_id']}")

    kb = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="➕ Premium Berish (+30 kun)", callback_data=f"admin_grant_{user['telegram_id']}"),
            InlineKeyboardButton(text="❌ Premiumni Bekor Qilish", callback_data=f"admin_revoke_{user['telegram_id']}")
        ],
        [ban_btn],
        [InlineKeyboardButton(text="⬅️ Orqaga", callback_data="admin_main_menu")]
    ])

    await message.answer(text, parse_mode="HTML", reply_markup=kb)

@router.callback_query(F.data.startswith("admin_grant_"))
async def admin_grant_cb(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    tg_id = int(callback.data.replace("admin_grant_", ""))
    ok = await db.grant_user_premium(tg_id, days=30)
    
    if ok:
        try:
            await callback.bot.send_message(tg_id, "🎉 <b>Tabriklaymiz!</b> Administrator tomonidan sizga 30 kunlik Premium taqdim etildi! ✨", parse_mode="HTML")
        except Exception:
            pass
        await callback.answer("✅ 30 kunlik Premium taqdim etildi!", show_alert=True)
    else:
        await callback.answer("⚠️ Xatolik yuz berdi.", show_alert=True)

@router.callback_query(F.data.startswith("admin_revoke_"))
async def admin_revoke_cb(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    tg_id = int(callback.data.replace("admin_revoke_", ""))
    ok = await db.revoke_user_premium(tg_id)
    
    if ok:
        await callback.answer("❌ Premium bekor qilindi.", show_alert=True)
    else:
        await callback.answer("⚠️ Xatolik yuz berdi.", show_alert=True)

@router.callback_query(F.data.startswith("admin_ban_"))
async def admin_ban_cb(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    tg_id = int(callback.data.replace("admin_ban_", ""))
    ok = await db.ban_user(tg_id)
    if ok:
        await callback.answer(f"🚫 User {tg_id} bloklandi!", show_alert=True)
    else:
        await callback.answer("⚠️ Xatolik yuz berdi.", show_alert=True)

@router.callback_query(F.data.startswith("admin_unban_"))
async def admin_unban_cb(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    tg_id = int(callback.data.replace("admin_unban_", ""))
    ok = await db.unban_user(tg_id)
    if ok:
        await callback.answer(f"✅ User {tg_id} blokdan chiqarildi!", show_alert=True)
    else:
        await callback.answer("⚠️ Xatolik yuz berdi.", show_alert=True)

@router.message(Command("ban"))
async def admin_ban_cmd(message: Message):
    if not is_admin(message.from_user.id):
        return
    args = message.text.split(maxsplit=1)
    if len(args) < 2 or not args[1].isdigit():
        await message.answer("⚠️ Iltimos, Telegram ID kiriting: <code>/ban 12345678</code>", parse_mode="HTML")
        return
    tg_id = int(args[1].strip())
    ok = await db.ban_user(tg_id)
    if ok:
        await message.answer(f"🚫 Foydalanuvchi {tg_id} muvaffaqiyatli bloklandi!")
    else:
        await message.answer("❌ Xatolik yuz berdi.")

@router.message(Command("unban"))
async def admin_unban_cmd(message: Message):
    if not is_admin(message.from_user.id):
        return
    args = message.text.split(maxsplit=1)
    if len(args) < 2 or not args[1].isdigit():
        await message.answer("⚠️ Iltimos, Telegram ID kiriting: <code>/unban 12345678</code>", parse_mode="HTML")
        return
    tg_id = int(args[1].strip())
    ok = await db.unban_user(tg_id)
    if ok:
        await message.answer(f"✅ Foydalanuvchi {tg_id} blokdan chiqarildi!")
    else:
        await message.answer("❌ Xatolik yuz berdi.")

# ==========================================
# TIZIM HOLATI
# ==========================================
@router.callback_query(F.data == "admin_system_info")
async def admin_system_info_cb(callback: CallbackQuery):
    if not is_admin(callback.from_user.id):
        await callback.answer("Sizda ruxsat yo'q!", show_alert=True)
        return

    db_mode = "⚡ Supabase Cloud Database" if db.supabase_ready else "📁 SQLite Local Database"
    text = (
        "⚙️ <b>TIZIM VA INFRATUZILMA HOLATI</b>\n\n"
        f"🗄️ <b>Baza Rejimi:</b> {db_mode}\n"
        f"🤖 <b>Bot Framework:</b> <code>Aiogram 3.x (Asyncio)</code>\n"
        f"🌐 <b>Mini App URL:</b> <code>{config.WEBAPP_URL}</code>\n"
        f"🛡️ <b>Admin ID:</b> <code>{config.ADMIN_ID}</code>\n"
        f"💳 <b>Karta:</b> <code>{config.PAYMENT_CARD}</code>\n"
    )
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="⬅️ Orqaga", callback_data="admin_main_menu")]
    ])
    await callback.message.edit_text(text, parse_mode="HTML", reply_markup=kb)
    await callback.answer()
