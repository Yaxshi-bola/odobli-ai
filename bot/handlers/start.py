"""
/start buyrug'i — ro'yxatdan o'tish, til tanlash
"""
from aiogram import Router, F
from aiogram.types import (
    Message, CallbackQuery, 
    InlineKeyboardMarkup, InlineKeyboardButton,
    WebAppInfo
)
import html
from aiogram.filters import Command, CommandStart

router = Router()

class Registration(StatesGroup):
    waiting_for_name = State()

def get_main_keyboard(til: str = "lotin"):
    app_text = convert_text("Ilovani ochish", til) + " 🚀"
    premium_text = convert_text("Premium", til) + " 💎"
    profile_text = convert_text("Profil", til) + " 👤"
    leaderboard_text = convert_text("Peshqadamlar", til) + " 🏆"
    feedback_text = convert_text("Fikr bildirish", til) + " ✍️"
    
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(
            text=app_text,
            web_app=WebAppInfo(url=config.WEBAPP_URL)
        )],
        [
            InlineKeyboardButton(text=premium_text, callback_data="premium_info"),
            InlineKeyboardButton(text=profile_text, callback_data="profile"),
        ],
        [
            InlineKeyboardButton(text=leaderboard_text, callback_data="leaderboard"),
            InlineKeyboardButton(text=feedback_text, callback_data="feedback"),
        ]
    ])

def get_til_keyboard():
    return InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="🅰️ Lotin yozuvi", callback_data="til_lotin"),
            InlineKeyboardButton(text="🔴 Kirill yozuvi", callback_data="til_kirill"),
        ]
    ])

@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext):
    user = await db.get_user(message.from_user.id)
    
    if user:
        til = user.get("til_skripti", "lotin")
        ism = user.get("ism", "")
        
        text = convert_text(
            f"Assalomu alaykum, {ism}! 👋\n\n"
            f"Odobli.ai — oila uchun foydali kundalik yordamchi.\n\n"
            f"Pastdagi tugmani bosib ilovani oching:",
            til
        )
        
        await message.answer(text, reply_markup=get_main_keyboard(til))
    else:
        await message.answer(
            "Assalomu alaykum! 👋\n\n"
            "Odobli.ai ga xush kelibsiz!\n"
            "Oila uchun foydali kundalik yordamchi.\n\n"
            "Avval ismingizni yozing:"
        )
        await state.set_state(Registration.waiting_for_name)

@router.message(Registration.waiting_for_name)
async def process_name(message: Message, state: FSMContext):
    ism = message.text.strip()
    
    if len(ism) < 2 or len(ism) > 50:
        await message.answer("Iltimos, to'g'ri ism kiriting (2-50 belgi):")
        return
    
    await state.update_data(ism=ism)
    
    await message.answer(
        f"Rahmat, {ism}! ✨\n\n"
        f"Qaysi yozuv turini tanlaysiz?",
        reply_markup=get_til_keyboard()
    )

@router.callback_query(F.data.startswith("til_"))
async def process_til_selection(callback: CallbackQuery, state: FSMContext):
    til = callback.data.replace("til_", "")
    user = await db.get_user(callback.from_user.id)
    
    if user:
        await db.update_user_til(callback.from_user.id, til)
        text = convert_text(
            "Til yangilandi! ✅\nIlovani ochib davom eting:",
            til
        )
        await callback.message.edit_text(
            text, reply_markup=get_main_keyboard(til)
        )
    else:
        data = await state.get_data()
        ism = data.get("ism") or callback.from_user.first_name or "Foydalanuvchi"
        user = await db.create_user(
            telegram_id=callback.from_user.id,
            ism=ism,
            username=callback.from_user.username,
            til=til,
        )
        await state.clear()
        
        trial_text = convert_text(
            f"Tabriklaymiz, {ism}! 🎉\n\n"
            f"Sizga 7 kunlik bepul sinov davri berildi.\n"
            f"Barcha funksiyalardan foydalaning!\n\n"
            f"Ilovani oching va o'rganishni boshlang:",
            til
        )
        
        await callback.message.edit_text(
            trial_text, reply_markup=get_main_keyboard(til)
        )
    
    await callback.answer()

@router.message(Command("leaderboard"))
@router.callback_query(F.data == "leaderboard")
async def cmd_leaderboard(event):
    message = event.message if isinstance(event, CallbackQuery) else event
    user = await db.get_user(event.from_user.id)
    til = user.get("til_skripti", "lotin") if user else "lotin"

    lb = await db.get_leaderboard(limit=10)
    
    lines = ["🏆 <b>Top 10 Peshqadamlar Jadvallari:</b>\n"]
    medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
    
    for i, item in enumerate(lb):
        ism = html.escape(str(item.get("ism", "Foydalanuvchi")))
        ball = item.get("jami_ball", 0)
        streak = item.get("joriy_streak", 0)
        medal = medals[i] if i < len(medals) else f"{i+1}."
        lines.append(f"{medal} <b>{ism}</b> — ⭐️ {ball} ball | 🔥 {streak} kun")

    text = convert_text("\n".join(lines), til)
    
    await message.answer(text, parse_mode="HTML")
    if isinstance(event, CallbackQuery):
        await event.answer()

@router.message(Command("feedback"))
@router.callback_query(F.data == "feedback")
async def cmd_feedback(event):
    message = event.message if isinstance(event, CallbackQuery) else event
    user = await db.get_user(event.from_user.id)
    til = user.get("til_skripti", "lotin") if user else "lotin"

    text = convert_text(
        "✍️ <b>Fikr bildirish va Qo'llab-quvvatlash</b>\n\n"
        "Taklif va mulohazalaringiz yoki savollaringiz bo'lsa, adminga bevosita yozishingiz mumkin:\n"
        "👉 @OdobliAdmin (yoki administratorimizga murojaat qiling)",
        til
    )
    
    await message.answer(text, parse_mode="HTML")
    if isinstance(event, CallbackQuery):
        await event.answer()
