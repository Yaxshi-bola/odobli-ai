-- Odobli.ai Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    telegram_id BIGINT UNIQUE NOT NULL,
    username TEXT,
    ism TEXT NOT NULL,
    til_skripti TEXT NOT NULL DEFAULT 'lotin', -- 'lotin' yoki 'kirill'
    bolalar JSONB DEFAULT '[]'::jsonb, -- e.g. [{"ism": "Jasur", "yosh": 5}]
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '7 days'),
    is_premium BOOLEAN DEFAULT FALSE,
    premium_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    summa INTEGER NOT NULL,
    screenshot_file_id TEXT NOT NULL,
    holat TEXT NOT NULL DEFAULT 'kutilmoqda', -- 'kutilmoqda', 'tasdiqlangan', 'rad_etilgan'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    tasdiqlangan_at TIMESTAMP WITH TIME ZONE
);

-- 3. Ingredients Table
CREATE TABLE IF NOT EXISTS ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomi TEXT NOT NULL,
    kategoriya TEXT NOT NULL, -- 'sabzavot', 'gosht', 'sut_mahsuloti', 'dukkakli', 'ziravor', 'boshqa'
    rasm_url TEXT
);

-- 4. Recipes Table
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomi TEXT NOT NULL,
    tayyorlash_vaqti_daq INTEGER NOT NULL DEFAULT 30,
    qiyinlik TEXT NOT NULL DEFAULT 'oson', -- 'oson', 'orta', 'qiyin'
    rasm_url TEXT,
    tarif_matni TEXT NOT NULL,
    holat TEXT NOT NULL DEFAULT 'nashr', -- 'qoralama', 'nashr'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Recipe Ingredients Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    majburiymi BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (recipe_id, ingredient_id)
);

-- 6. Ertaklar Table
CREATE TABLE IF NOT EXISTS ertaklar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sarlavha TEXT NOT NULL,
    yosh_toifasi TEXT NOT NULL DEFAULT '3-5', -- '3-5', '6-8', '9-12'
    muqova_rasm_url TEXT,
    holat TEXT NOT NULL DEFAULT 'nashr', -- 'qoralama', 'nashr'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. Ertak Sahifalari Table
CREATE TABLE IF NOT EXISTS ertak_sahifalari (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ertak_id UUID NOT NULL REFERENCES ertaklar(id) ON DELETE CASCADE,
    tartib_raqami INTEGER NOT NULL,
    rasm_url TEXT,
    matn TEXT NOT NULL
);

-- 8. Lifehacklar Table
CREATE TABLE IF NOT EXISTS lifehacklar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sarlavha TEXT NOT NULL,
    tavsif_matni TEXT NOT NULL,
    rasm_url TEXT,
    kategoriya TEXT NOT NULL DEFAULT 'boshqa', -- 'karving', 'oyinchoq_yasash', 'uy_ishlari', 'boshqa'
    holat TEXT NOT NULL DEFAULT 'nashr', -- 'qoralama', 'nashr'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 9. Topishmoqlar Table
CREATE TABLE IF NOT EXISTS topishmoqlar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    savol TEXT NOT NULL,
    javob TEXT NOT NULL,
    yosh_toifasi TEXT NOT NULL DEFAULT '3-5', -- '3-5', '6-8', '9-12'
    qiyinlik TEXT NOT NULL DEFAULT 'oson', -- 'oson', 'orta', 'qiyin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. Matematik Masalalar Table
CREATE TABLE IF NOT EXISTS matematik_masalalar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    savol TEXT NOT NULL,
    togri_javob TEXT NOT NULL,
    notogri_variantlar JSONB NOT NULL, -- e.g. ["3", "5", "8"]
    yosh_toifasi TEXT NOT NULL DEFAULT '3-5', -- '3-5', '6-8', '9-12'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 11. User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    jami_ball INTEGER DEFAULT 0,
    joriy_streak INTEGER DEFAULT 0,
    eng_uzun_streak INTEGER DEFAULT 0,
    oxirgi_faollik_sanasi DATE
);

-- 12. User Completed Items Table
CREATE TABLE IF NOT EXISTS user_completed_items (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_turi TEXT NOT NULL, -- 'topishmoq', 'masala', 'kunlik_topshiriq'
    item_id UUID NOT NULL,
    bajarilgan_sana DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_id, item_turi, item_id, bajarilgan_sana)
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_ertak_sahifalari_ertak ON ertak_sahifalari(ertak_id, tartib_raqami);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
