-- ============================================
-- ODOBLI.AI — MVP DATABASE SCHEMA
-- ============================================

-- UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    telegram_id BIGINT UNIQUE NOT NULL,
    username TEXT,
    ism TEXT NOT NULL DEFAULT 'Foydalanuvchi',
    til_skripti TEXT NOT NULL DEFAULT 'lotin' 
        CHECK (til_skripti IN ('lotin', 'kirill')),
    bolalar JSONB DEFAULT '[]'::jsonb,
    trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    premium_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);

-- ============================================
-- PAYMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    summa INTEGER NOT NULL,
    screenshot_file_id TEXT NOT NULL,
    holat TEXT NOT NULL DEFAULT 'kutilmoqda' 
        CHECK (holat IN ('kutilmoqda', 'tasdiqlangan', 'rad_etilgan')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    tasdiqlangan_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_holat ON payments(holat);

-- ============================================
-- INGREDIENTS
-- ============================================
CREATE TABLE IF NOT EXISTS ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nomi TEXT NOT NULL,
    kategoriya TEXT NOT NULL DEFAULT 'boshqa'
        CHECK (kategoriya IN (
            'sabzavot', 'gosht', 'sut_mahsuloti', 
            'dukkakli', 'ziravor', 'boshqa', 'don', 'meva'
        )),
    rasm_url TEXT,
    tartib INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_ingredients_kategoriya ON ingredients(kategoriya);

-- ============================================
-- RECIPES
-- ============================================
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nomi TEXT NOT NULL,
    tayyorlash_vaqti_daq INTEGER NOT NULL DEFAULT 30,
    qiyinlik TEXT NOT NULL DEFAULT 'oson'
        CHECK (qiyinlik IN ('oson', 'orta', 'qiyin')),
    rasm_url TEXT,
    tarif_matni TEXT NOT NULL,
    holat TEXT NOT NULL DEFAULT 'qoralama'
        CHECK (holat IN ('qoralama', 'nashr')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recipes_holat ON recipes(holat);

-- ============================================
-- RECIPE INGREDIENTS (many-to-many)
-- ============================================
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    majburiymi BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (recipe_id, ingredient_id)
);

-- ============================================
-- ERTAKLAR (Fairy Tales)
-- ============================================
CREATE TABLE IF NOT EXISTS ertaklar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sarlavha TEXT NOT NULL,
    yosh_toifasi TEXT NOT NULL DEFAULT '3-5'
        CHECK (yosh_toifasi IN ('3-5', '6-8', '9-12')),
    muqova_rasm_url TEXT,
    holat TEXT NOT NULL DEFAULT 'qoralama'
        CHECK (holat IN ('qoralama', 'nashr')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ertaklar_holat ON ertaklar(holat);
CREATE INDEX IF NOT EXISTS idx_ertaklar_yosh ON ertaklar(yosh_toifasi);

-- ============================================
-- ERTAK SAHIFALARI (pages)
-- ============================================
CREATE TABLE IF NOT EXISTS ertak_sahifalari (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ertak_id UUID NOT NULL REFERENCES ertaklar(id) ON DELETE CASCADE,
    tartib_raqami INTEGER NOT NULL,
    rasm_url TEXT,
    matn TEXT NOT NULL,
    UNIQUE (ertak_id, tartib_raqami)
);

CREATE INDEX IF NOT EXISTS idx_ertak_sahifalari_ertak ON ertak_sahifalari(ertak_id);

-- ============================================
-- LIFEHACKLAR
-- ============================================
CREATE TABLE IF NOT EXISTS lifehacklar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sarlavha TEXT NOT NULL,
    tavsif_matni TEXT NOT NULL,
    rasm_url TEXT,
    kategoriya TEXT NOT NULL DEFAULT 'boshqa'
        CHECK (kategoriya IN (
            'karving', 'oyinchoq_yasash', 'uy_ishlari', 'boshqa'
        )),
    holat TEXT NOT NULL DEFAULT 'qoralama'
        CHECK (holat IN ('qoralama', 'nashr')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lifehacklar_holat ON lifehacklar(holat);

-- ============================================
-- TOPISHMOQLAR (Riddles)
-- ============================================
CREATE TABLE IF NOT EXISTS topishmoqlar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    savol TEXT NOT NULL,
    javob TEXT NOT NULL,
    yosh_toifasi TEXT NOT NULL DEFAULT '3-5'
        CHECK (yosh_toifasi IN ('3-5', '6-8', '9-12')),
    qiyinlik TEXT NOT NULL DEFAULT 'oson'
        CHECK (qiyinlik IN ('oson', 'orta', 'qiyin')),
    varinatlar JSONB DEFAULT '[]'::jsonb,
    holat TEXT NOT NULL DEFAULT 'nashr'
        CHECK (holat IN ('qoralama', 'nashr')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- MATEMATIK MASALALAR
-- ============================================
CREATE TABLE IF NOT EXISTS matematik_masalalar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    savol TEXT NOT NULL,
    togri_javob TEXT NOT NULL,
    notogri_variantlar JSONB NOT NULL DEFAULT '[]'::jsonb,
    yosh_toifasi TEXT NOT NULL DEFAULT '3-5'
        CHECK (yosh_toifasi IN ('3-5', '6-8', '9-12')),
    holat TEXT NOT NULL DEFAULT 'nashr'
        CHECK (holat IN ('qoralama', 'nashr')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- USER PROGRESS
-- ============================================
CREATE TABLE IF NOT EXISTS user_progress (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    jami_ball INTEGER NOT NULL DEFAULT 0,
    joriy_streak INTEGER NOT NULL DEFAULT 0,
    eng_uzun_streak INTEGER NOT NULL DEFAULT 0,
    oxirgi_faollik_sanasi DATE
);

-- ============================================
-- USER COMPLETED ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS user_completed_items (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_turi TEXT NOT NULL 
        CHECK (item_turi IN ('topishmoq', 'masala', 'kunlik_topshiriq')),
    item_id UUID NOT NULL,
    bajarilgan_sana DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (user_id, item_turi, item_id, bajarilgan_sana)
);

-- Function to get today's content by cycling through IDs
CREATE OR REPLACE FUNCTION get_daily_content(
    table_name TEXT,
    content_date DATE DEFAULT CURRENT_DATE
)
RETURNS UUID AS $$
DECLARE
    result_id UUID;
    day_number INTEGER;
    total_count INTEGER;
BEGIN
    day_number := content_date - '2025-01-01'::DATE;
    
    EXECUTE format(
        'SELECT COUNT(*) FROM %I WHERE holat = $1',
        table_name
    ) INTO total_count USING 'nashr';
    
    IF total_count = 0 THEN
        RETURN NULL;
    END IF;
    
    EXECUTE format(
        'SELECT id FROM %I WHERE holat = $1 ORDER BY id OFFSET $2 LIMIT 1',
        table_name
    ) INTO result_id USING 'nashr', (day_number % total_count);
    
    RETURN result_id;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to update streak
CREATE OR REPLACE FUNCTION update_user_streak(
    p_user_id UUID,
    p_ball INTEGER DEFAULT 0
)
RETURNS TABLE(
    yangi_streak INTEGER,
    yangi_ball INTEGER,
    yangi_eng_uzun INTEGER
) AS $$
DECLARE
    v_oxirgi DATE;
    v_bugun DATE := CURRENT_DATE;
    v_joriy INTEGER;
    v_eng_uzun INTEGER;
    v_jami INTEGER;
BEGIN
    SELECT 
        oxirgi_faollik_sanasi, 
        joriy_streak, 
        eng_uzun_streak, 
        jami_ball
    INTO v_oxirgi, v_joriy, v_eng_uzun, v_jami
    FROM user_progress
    WHERE user_progress.user_id = p_user_id;
    
    IF NOT FOUND THEN
        INSERT INTO user_progress (user_id, jami_ball, joriy_streak, eng_uzun_streak, oxirgi_faollik_sanasi)
        VALUES (p_user_id, p_ball, 1, 1, v_bugun);
        
        RETURN QUERY SELECT 1, p_ball, 1;
        RETURN;
    END IF;
    
    IF v_oxirgi = v_bugun THEN
        UPDATE user_progress
        SET jami_ball = jami_ball + p_ball
        WHERE user_progress.user_id = p_user_id;
        
        RETURN QUERY SELECT v_joriy, v_jami + p_ball, v_eng_uzun;
        RETURN;
    END IF;
    
    IF v_oxirgi = v_bugun - 1 THEN
        v_joriy := v_joriy + 1;
    ELSE
        v_joriy := 1;
    END IF;
    
    IF v_joriy > v_eng_uzun THEN
        v_eng_uzun := v_joriy;
    END IF;
    
    v_jami := v_jami + p_ball;
    
    UPDATE user_progress
    SET 
        joriy_streak = v_joriy,
        eng_uzun_streak = v_eng_uzun,
        jami_ball = v_jami,
        oxirgi_faollik_sanasi = v_bugun
    WHERE user_progress.user_id = p_user_id;
    
    RETURN QUERY SELECT v_joriy, v_jami, v_eng_uzun;
END;
$$ LANGUAGE plpgsql;
