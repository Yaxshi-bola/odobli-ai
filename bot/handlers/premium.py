"""
Premium obuna — to'lov oqimi
"""
from aiogram import Router, F
from aiogram.types import (
    Message, CallbackQuery,
    InlineKeyboardMarkup, InlineKeyboardButton
)
from aiogram.filters import Command

from config import config
from services.database import db
from utils.transliterate import convert_text

import html
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

router = Router()

class PremiumStates(StatesGroup):
    waiting_for_screenshot = State()

@router.message(Command("premium"))
@router.callback_query(F.data == "premium_info")
async def premium_info(event):
    message = event.message if isinstance(event, CallbackQuery) else event
    user_id = event.from_user.id
    
    user = await db.get_user(user_id)
    if not user:
        await message.answer("Avval /start buyrug'ini yuboring.")
        return
    
    til = user.get("til_skripti", "lotin")
    is_active = db.is_user_active(user)
    
    if user.get("is_premium"):
        text = convert_text(
            "✅ Sizda Premium obuna faol!\n\n"
            f"Amal qilish muddati: {user.get('premium_until', 'noaniq')[:10]}\n\n"
            "Barcha funksiyalardan foydalaning! 🎉",
            til
        )
        if isinstance(event, Message):
            await message.answer(text)
        else:
            await message.edit_text(text)
    elif is_active:
        days_left = db.get_trial_days_left(user)
        text = convert_text(
            f"🎁 Sinov davringiz faol — {days_left} kun qoldi.\n\n"
            f"Premium obuna:\n"
            f"💰 Narxi: {config.PREMIUM_PRICE:,} so'm/oy\n"
            f"💳 Karta: {config.PAYMENT_CARD}\n\n"
            f"To'lovni amalga oshirib, screenshotni yuboring.",
            til
        )
        
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(
                text=convert_text("To'ladim — screenshot yuborish 📸", til),
                callback_data="send_screenshot"
            )]
        ])
        
        if isinstance(event, Message):
            await message.answer(text, reply_markup=keyboard)
        else:
            await message.edit_text(text, reply_markup=keyboard)
    else:
        text = convert_text(
            "⏰ Sinov davringiz tugagan.\n\n"
            f"Premium obuna:\n"
            f"💰 Narxi: {config.PREMIUM_PRICE:,} so'm/oy\n"
            f"💳 Karta: {config.PAYMENT_CARD}\n\n"
            f"To'lovni amalga oshirib, screenshotni yuboring.",
            til
        )
        
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(
                text=convert_text("To'ladim — screenshot yuborish 📸", til),
                callback_data="send_screenshot"
            )]
        ])
        
        if isinstance(event, Message):
            await message.answer(text, reply_markup=keyboard)
        else:
            await message.edit_text(text, reply_markup=keyboard)
    
    if isinstance(event, CallbackQuery):
        await event.answer()

@router.callback_query(F.data == "send_screenshot")
async def ask_screenshot(callback: CallbackQuery, state: FSMContext):
    user = await db.get_user(callback.from_user.id)
    til = user.get("til_skripti", "lotin") if user else "lotin"
    
    await state.set_state(PremiumStates.waiting_for_screenshot)
    
    text = convert_text(
        "📸 To'lov screenshotini rasm sifatida yuboring.\n\n"
        "Admin tekshirib, 24 soat ichida tasdiqlaydi.",
        til
    )
    
    await callback.message.answer(text)
    await callback.answer()

@router.message(PremiumStates.waiting_for_screenshot, F.photo)
async def receive_screenshot(message: Message, state: FSMContext):
    user = await db.get_user(message.from_user.id)
    
    if not user:
        await message.answer("Avval /start buyrug'ini yuboring.")
        await state.clear()
        return
    
    til = user.get("til_skripti", "lotin")
    file_id = message.photo[-1].file_id
    
    payment = await db.create_payment(user["id"], file_id)
    await state.clear()
    
    text = convert_text(
        "✅ Screenshotingiz qabul qilindi!\n\n"
        "Admin tez orada tekshiradi. Iltimos, kuting.",
        til
    )
    await message.answer(text)
    
    admin_keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="✅ Tasdiqlash",
                callback_data=f"approve_{payment['id']}"
            ),
            InlineKeyboardButton(
                text="❌ Rad etish",
                callback_data=f"reject_{payment['id']}"
            ),
        ]
    ])
    
    safe_name = html.escape(str(user.get("ism", "Foydalanuvchi")))
    username_str = f"@{user.get('username')}" if user.get("username") else "noma'lum"
    
    admin_text = (
        f"💳 <b>Yangi to'lov!</b>\n\n"
        f"👤 Foydalanuvchi: {safe_name} ({username_str})\n"
        f"🆔 Telegram ID: <code>{user['telegram_id']}</code>\n"
        f"💰 Summa: {config.PREMIUM_PRICE:,} so'm\n"
        f"🆔 To'lov ID: <code>{payment['id']}</code>"
    )
    
    try:
        await message.bot.send_photo(
            config.ADMIN_ID,
            photo=file_id,
            caption=admin_text,
            parse_mode="HTML",
            reply_markup=admin_keyboard
        )
    except Exception as e:
        print(f"Error sending payment photo to admin: {e}")
