"""
Profil buyrug'i — foydalanuvchi statistikasi
"""
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from services.database import db
from utils.transliterate import convert_text

import html

import json
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

router = Router()

class ProfileStates(StatesGroup):
    waiting_for_child_name = State()
    waiting_for_child_age = State()

def get_profile_keyboard(til: str = "lotin"):
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text=convert_text("🎁 1000 ballni Premiumga almashtirish", til), callback_data="claim_bonus")],
        [
            InlineKeyboardButton(text=convert_text("👶 Farzandlarim", til), callback_data="my_children"),
            InlineKeyboardButton(text=convert_text("⏰ Eslatma soati", til), callback_data="set_reminder_time")
        ]
    ])

@router.message(Command("profil"))
@router.callback_query(F.data == "profile")
async def cmd_profile(event):
    message = event.message if isinstance(event, CallbackQuery) else event
    user_id = event.from_user.id
    
    user = await db.get_user_with_progress(user_id)
    if not user:
        await message.answer("Avval /start buyrug'ini yuboring.")
        if isinstance(event, CallbackQuery):
            await event.answer()
        return

    til = user.get("til_skripti", "lotin")
    ism = html.escape(str(user.get("ism", "Foydalanuvchi")))
    progress = user.get("progress", {})
    rem_hour = user.get("reminder_hour", 9)
    
    is_premium = user.get("is_premium", False)
    status_str = "⭐ Premium" if is_premium else "🆓 Trial / Bepul"

    text = convert_text(
        f"👤 <b>Profil: {ism}</b>\n\n"
        f"📋 <b>Holat:</b> {status_str}\n"
        f"🔤 <b>Alifbo:</b> {til.capitalize()}\n"
        f"⏰ <b>Eslatma vaqti:</b> {rem_hour:02d}:00\n"
        f"⭐️ <b>Jami ball:</b> {progress.get('jami_ball', 0)}\n"
        f"🔥 <b>Kunlik ketma-ketlik:</b> {progress.get('joriy_streak', 0)} kun\n"
        f"🏆 <b>Eng uzun rekord:</b> {progress.get('eng_uzun_streak', 0)} kun\n",
        til
    )

    await message.answer(text, parse_mode="HTML", reply_markup=get_profile_keyboard(til))
    if isinstance(event, CallbackQuery):
        await event.answer()

# ==========================================
# CLAIM BONUS (1000 BALL -> PREMIUM)
# ==========================================
@router.callback_query(F.data == "claim_bonus")
async def claim_bonus_cb(callback: CallbackQuery):
    success, msg = await db.claim_points_bonus(callback.from_user.id)
    await callback.answer(msg, show_alert=True)
    if success:
        user = await db.get_user(callback.from_user.id)
        til = user.get("til_skripti", "lotin") if user else "lotin"
        await callback.message.answer(convert_text(f"✅ {msg}", til))

# ==========================================
# SET REMINDER HOUR
# ==========================================
@router.callback_query(F.data == "set_reminder_time")
async def set_reminder_time_cb(callback: CallbackQuery):
    user = await db.get_user(callback.from_user.id)
    til = user.get("til_skripti", "lotin") if user else "lotin"

    kb = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="🌅 08:00", callback_data="rem_hour_8"),
            InlineKeyboardButton(text="☀️ 09:00", callback_data="rem_hour_9"),
            InlineKeyboardButton(text="🌤 12:00", callback_data="rem_hour_12"),
            InlineKeyboardButton(text="🌙 20:00", callback_data="rem_hour_20"),
        ]
    ])
    
    text = convert_text("⏰ Kunlik eslatma soatini tanlang:", til)
    await callback.message.answer(text, reply_markup=kb)
    await callback.answer()

@router.callback_query(F.data.startswith("rem_hour_"))
async def process_rem_hour_cb(callback: CallbackQuery):
    hour = int(callback.data.replace("rem_hour_", ""))
    await db.update_user_reminder_hour(callback.from_user.id, hour)
    
    user = await db.get_user(callback.from_user.id)
    til = user.get("til_skripti", "lotin") if user else "lotin"
    
    msg = convert_text(f"✅ Kunlik eslatma vaqti soat {hour:02d}:00 ga o'zgartirildi!", til)
    await callback.message.edit_text(msg)
    await callback.answer()

# ==========================================
# CHILDREN / FAMILY PROFILE
# ==========================================
@router.callback_query(F.data == "my_children")
async def my_children_cb(callback: CallbackQuery):
    user = await db.get_user(callback.from_user.id)
    til = user.get("til_skripti", "lotin") if user else "lotin"

    raw_bolalar = user.get("bolalar", "[]") if user else "[]"
    if isinstance(raw_bolalar, list):
        bolalar = raw_bolalar
    else:
        try:
            bolalar = json.loads(raw_bolalar)
        except Exception:
            bolalar = []

    lines = ["👶 <b>Farzandlaringiz ro'yxati:</b>\n"]
    if not bolalar:
        lines.append("<i>Hozircha farzandlar qo'shilmagan.</i>")
    else:
        for i, child in enumerate(bolalar, 1):
            c_name = html.escape(str(child.get("ism", "")))
            c_age = child.get("yosh", 0)
            lines.append(f"{i}. <b>{c_name}</b> ({c_age} yosh)")

    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text=convert_text("➕ Farzand qo'shish", til), callback_data="add_child_start")]
    ])

    await callback.message.answer(convert_text("\n".join(lines), til), parse_mode="HTML", reply_markup=kb)
    await callback.answer()

@router.callback_query(F.data == "add_child_start")
async def add_child_start_cb(callback: CallbackQuery, state: FSMContext):
    user = await db.get_user(callback.from_user.id)
    til = user.get("til_skripti", "lotin") if user else "lotin"

    await state.set_state(ProfileStates.waiting_for_child_name)
    await callback.message.answer(convert_text("👶 Farzandizgizning ismini kiriting:", til))
    await callback.answer()

@router.message(ProfileStates.waiting_for_child_name)
async def process_child_name(message: Message, state: FSMContext):
    name = message.text.strip()
    if len(name) < 2 or len(name) > 30:
        await message.answer("Iltimos, to'g'ri ism kiriting (2-30 belgi):")
        return

    await state.update_data(child_name=name)
    await state.set_state(ProfileStates.waiting_for_child_age)
    await message.answer(f"Rahmat! Endi {name} ning yoshini kiritng (masalan: 5):")

@router.message(ProfileStates.waiting_for_child_age)
async def process_child_age(message: Message, state: FSMContext):
    if not message.text.isdigit():
        await message.answer("Iltimos, yoshni raqamda kiriting (masalan: 5):")
        return

    age = int(message.text)
    if age < 1 or age > 18:
        await message.answer("Iltimos, 1 dan 18 gacha bo'lgan yosh kiriting:")
        return

    data = await state.get_data()
    child_name = data.get("child_name", "Farzand")
    await state.clear()

    await db.add_child(message.from_user.id, child_name, age)
    
    user = await db.get_user(message.from_user.id)
    til = user.get("til_skripti", "lotin") if user else "lotin"

    text = convert_text(f"🎉 {child_name} ({age} yosh) muvaffaqiyatli qo'shildi! ✨", til)
    await message.answer(text)
