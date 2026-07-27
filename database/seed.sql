-- Odobli.ai Supabase Seed Data

-- 1. Seed Ingredients
INSERT INTO ingredients (id, nomi, kategoriya) VALUES
('10000000-0000-0000-0000-000000000001', 'Sabzi', 'sabzavot'),
('10000000-0000-0000-0000-000000000002', 'Piyoz', 'sabzavot'),
('10000000-0000-0000-0000-000000000003', 'Kartoshka', 'sabzavot'),
('10000000-0000-0000-0000-000000000004', 'Pomidor', 'sabzavot'),
('10000000-0000-0000-0000-000000000005', 'Mol go''shti', 'gosht'),
('10000000-0000-0000-0000-000000000006', 'Tovuq go''shti', 'gosht'),
('10000000-0000-0000-0000-000000000007', 'Sut', 'sut_mahsuloti'),
('10000000-0000-0000-0000-000000000008', 'Tuxum', 'sut_mahsuloti'),
('10000000-0000-0000-0000-000000000009', 'Nohot', 'dukkakli'),
('10000000-0000-0000-0000-000000000010', 'Guruch', 'boshqa'),
('10000000-0000-0000-0000-000000000011', 'Un', 'boshqa'),
('10000000-0000-0000-0000-000000000012', 'Murch va Tuz', 'ziravor')
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Recipes
INSERT INTO recipes (id, nomi, tayyorlash_vaqti_daq, qiyinlik, rasm_url, tarif_matni, holat) VALUES
('20000000-0000-0000-0000-000000000001', 'Mazali Shurva', 45, 'oson', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', 'Masalliqlarni qozonga solib, past alovda 40 daqiqa qaynatiladi. Bolalar uchun juda foydali va yengil taom.', 'nashr'),
('20000000-0000-0000-0000-000000000002', 'Toyimli Somsa', 60, 'orta', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', 'Xamir yoyilib, to''g''ralgan go''sht va piyoz aralashmasi solinadi va duxovkada qizartirib pishiriladi.', 'nashr'),
('20000000-0000-0000-0000-000000000003', 'Tuxumli Omlet', 15, 'oson', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80', 'Tuxum va sut aralashtirilib, tavada sariyog''da pishiriladi. Ertalabki nonushta uchun ajoyib va tez tayyor bo''ladigan retsept.', 'nashr')
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Recipe Ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, majburiymi) VALUES
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', true),
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', true),
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', true),
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', true),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000005', true),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', true),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000011', true),
('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000008', true),
('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000007', true)
ON CONFLICT DO NOTHING;

-- 4. Seed Ertaklar
INSERT INTO ertaklar (id, sarlavha, yosh_toifasi, muqova_rasm_url, holat) VALUES
('30000000-0000-0000-0000-000000000001', 'Zukko Quyoncha va O''rmon Do''stlari', '3-5', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', 'nashr'),
('30000000-0000-0000-0000-000000000002', 'Sehrli Qalam va Odobli Bola', '6-8', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80', 'nashr')
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Ertak Sahifalari
INSERT INTO ertak_sahifalari (ertak_id, tartib_raqami, rasm_url, matn) VALUES
('30000000-0000-0000-0000-000000000001', 1, 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', 'Bir bor ekan, bir yo''q ekan, yashil va ko''m-ko''k o''rmonda kichik, mehribon Zukko Quyoncha yashar ekan.'),
('30000000-0000-0000-0000-000000000001', 2, 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80', 'U har kuni ertalab do''stlariga salom berar va har doim kattalarga yordam berishni yaxshi ko''rar ekan.'),
('30000000-0000-0000-0000-000000000001', 3, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', 'Bir kuni u yo''lda ayiqchani uchratib qolibdi va unga sabzilarini tashishda yordam beribdi. Shunda barcha o''rmon hayvonlari uni odobli quyoncha deb maqtashibdi.'),
('30000000-0000-0000-0000-000000000002', 1, 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80', 'Kichkina Ali ko''chada bir yog''och qalam topib oldi. Bu qalam sehrli bo''lib, faqat yaxshi so''zlar yozilganda porlardi.'),
('30000000-0000-0000-0000-000000000002', 2, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80', 'Ali har kuni "Rahmat", "Iltimos", "Salom" so''zlarini mashq qildi va uning daftari nurlarga to''ldi.')
ON CONFLICT DO NOTHING;

-- 6. Seed Lifehacklar
INSERT INTO lifehacklar (id, sarlavha, tavsif_matni, rasm_url, kategoriya, holat) VALUES
('40000000-0000-0000-0000-000000000001', 'Sabzidan Chiroyli Gul Yasash (Karving)', 'Sabzini yupqa parrak qilib kesib, sekin burash orqali ovqatlaringizga ajoyib bezak berishingiz mumkin.', 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80', 'karving', 'nashr'),
('40000000-0000-0000-0000-000000000002', 'Qog''ozdan Tejamkor O''yinchoq', 'Eski karton va qog''ozlardan bolalar uchun qiziqarli uyroqlar va mashinalar yasang.', 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80', 'oyinchoq_yasash', 'nashr'),
('40000000-0000-0000-0000-000000000003', 'O''yinchoqlarni Tez Yig''ish Sirli Usuli', 'O''yinchoqlarni ranglar bo''yicha qutilarga ajratish o''yiniga aylantiring — bola 5 daqiqada xonasini yig''adi!', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80', 'uy_ishlari', 'nashr')
ON CONFLICT (id) DO NOTHING;

-- 7. Seed Topishmoqlar
INSERT INTO topishmoqlar (id, savol, javob, yosh_toifasi, qiyinlik) VALUES
('50000000-0000-0000-0000-000000000001', 'Uzun quloq, qisqa dum, Sabzini yeydi yum-yum. U nima?', 'Quyon', '3-5', 'oson'),
('50000000-0000-0000-0000-000000000002', 'Oydan bitta, kundan bitta, Hammada bor bir dona. U nima?', 'Ism', '6-8', 'orta'),
('50000000-0000-0000-0000-000000000003', 'Tilsiz, jag''siz so''zlaydi, Bilim berib charchamaydi. U nima?', 'Kitob', '6-8', 'oson')
ON CONFLICT (id) DO NOTHING;

-- 8. Seed Matematik Masalalar
INSERT INTO matematik_masalalar (id, savol, togri_javob, notogri_variantlar, yosh_toifasi) VALUES
('60000000-0000-0000-0000-000000000001', 'Alining 3 ta olmasi bor edi. Onasi unga yana 2 ta olma berdi. Alida jami nechta olma bo''ldi?', '5', '["4", "6", "3"]'::jsonb, '3-5'),
('60000000-0000-0000-0000-000000000002', 'Lola 10 ta shar sotib oldi. 3 tasi uchib ketdi. Lolada nechta shar qoldi?', '7', '["6", "8", "5"]'::jsonb, '6-8')
ON CONFLICT (id) DO NOTHING;
