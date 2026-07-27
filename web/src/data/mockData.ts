import { Ingredient, Recipe, Tale, Lifehack, Riddle, MathProblem } from '../types';

export const initialIngredients: Ingredient[] = [
  // 1. Sabzavotlar, Ildizmevalar va Ko'katlar (Vegetables, Roots & Greens)
  { id: 'ing_kartoshka', nomi: 'Kartoshka (Oq / Qizil)', kategoriya: 'sabzavot', icon: '🥔' },
  { id: 'ing_piyoz', nomi: 'Piyoz (Sariq / Oq / Qizil)', kategoriya: 'sabzavot', icon: '🧅' },
  { id: 'ing_sabzi', nomi: 'Sabzi (Sariq / Qizil)', kategoriya: 'sabzavot', icon: '🥕' },
  { id: 'ing_pomidor', nomi: 'Pomidor (Qizil / Pushti / Cherri)', kategoriya: 'sabzavot', icon: '🍅' },
  { id: 'ing_bodring', nomi: 'Bodring (Toshkent / Salatbobo)', kategoriya: 'sabzavot', icon: '🥒' },
  { id: 'ing_kokatlar', nomi: "Ko'katlar (Kashnich / Petrushka)", kategoriya: 'sabzavot', icon: '🌿' },
  { id: 'ing_shivit', nomi: 'Shivit (Dill)', kategoriya: 'sabzavot', icon: '🌿' },
  { id: 'ing_baqlajon', nomi: 'Baqlajon', kategoriya: 'sabzavot', icon: '🍆' },
  { id: 'ing_bulgor', nomi: "Bulg'or qalampiri (Yashil / Qizil / Sariq)", kategoriya: 'sabzavot', icon: '🫑' },
  { id: 'ing_qalampir', nomi: 'Achchiq qizil va yashil qalampir', kategoriya: 'sabzavot', icon: '🌶️' },
  { id: 'ing_sarimsoq', nomi: 'Sarimsoqpiyoz', kategoriya: 'sabzavot', icon: '🧄' },
  { id: 'ing_karram', nomi: 'Karam (Oq / Qizil karam)', kategoriya: 'sabzavot', icon: '🥬' },
  { id: 'ing_gul_karam', nomi: 'Gullikaram va Brokkoli', kategoriya: 'sabzavot', icon: '🥦' },
  { id: 'ing_turp', nomi: "Marg'ilon yashil turpi", kategoriya: 'sabzavot', icon: '🧅' },
  { id: 'ing_sholgom', nomi: "Sholg'om (Turnip)", kategoriya: 'sabzavot', icon: '🥔' },
  { id: 'ing_qovoq', nomi: 'Qovoq (Oshqovoq / Mushk qovoq)', kategoriya: 'sabzavot', icon: '🎃' },
  { id: 'ing_ismaloq', nomi: 'Ismaloq (Spinach)', kategoriya: 'sabzavot', icon: '🍃' },
  { id: 'ing_kok_piyoz', nomi: "Ko'k piyoz", kategoriya: 'sabzavot', icon: '🌱' },
  { id: 'ing_rayhon', nomi: 'Rayhon (Binafsha / Yashil)', kategoriya: 'sabzavot', icon: '🌿' },
  { id: 'ing_yalpiz', nomi: 'Yalpiz (Mint)', kategoriya: 'sabzavot', icon: '🌿' },
  { id: 'ing_selerey', nomi: 'Selerey va Keshniya', kategoriya: 'sabzavot', icon: '🥬' },
  { id: 'ing_shavul', nomi: 'Shavul / Otquloq (Sorrel)', kategoriya: 'sabzavot', icon: '🍃' },
  { id: 'ing_zanjabil', nomi: 'Zanjabil ildizi (Ginger)', kategoriya: 'sabzavot', icon: '🫚' },
  { id: 'ing_qoziqorin', nomi: "Qo'ziqorin (Shampinyon / Veshonki)", kategoriya: 'sabzavot', icon: '🍄' },
  { id: 'ing_qabachki', nomi: 'Qabachki va Tsukini', kategoriya: 'sabzavot', icon: '🥒' },
  { id: 'ing_lavlagi', nomi: 'Lavlagi (Beetroot)', kategoriya: 'sabzavot', icon: '🫛' },
  { id: 'ing_rediska', nomi: 'Rediska (Radish)', kategoriya: 'sabzavot', icon: '🔴' },
  { id: 'ing_rukola', nomi: 'Rukola va Salat bargi', kategoriya: 'sabzavot', icon: '🥗' },
  { id: 'ing_zaytun', nomi: 'Zaytun (Qora va Yashil oliva)', kategoriya: 'sabzavot', icon: '🫒' },

  // 2. Halol Go'shtlar, Parranda va Baliq (Halal Meats & Poultry)
  { id: 'ing_mol', nomi: "Mol go'shti (Lahm / To'sh / Sirloin)", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_qoy', nomi: "Qo'y go'shti (Qovurg'a / Bo'yin / Son)", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_tovuq', nomi: "Tovuq go'shti (File / Comchot / Qanot)", kategoriya: 'gosht', icon: '🍗' },
  { id: 'ing_ordak', nomi: "O'rdak go'shti (Duck meat)", kategoriya: 'gosht', icon: '🦆' },
  { id: 'ing_goz', nomi: "G'oz go'shti (Goose meat)", kategoriya: 'gosht', icon: '🪿' },
  { id: 'ing_kurka', nomi: "Kurka go'shti (Turkey meat)", kategoriya: 'gosht', icon: '🦃' },
  { id: 'ing_bedana_gosht', nomi: "Bedana go'shti (Quail meat)", kategoriya: 'gosht', icon: '🐦' },
  { id: 'ing_quyon', nomi: "Quyon go'shti (Rabbit meat)", kategoriya: 'gosht', icon: '🐇' },
  { id: 'ing_ot_goshti', nomi: "Ot go'shti va Qazi (Horsemeat)", kategoriya: 'gosht', icon: '🐎' },
  { id: 'ing_qiyma', nomi: "Mol va Qo'y qiymasi", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_dumba', nomi: "Dumba yog'i va Charvi (Fat tail)", kategoriya: 'gosht', icon: '🥓' },
  { id: 'ing_jigar', nomi: "Mol / Qo'y jigari va Yuragi", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_til', nomi: "Mol tili", kategoriya: 'gosht', icon: '🥩' },
  { id: 'ing_kalla_pocha', nomi: "Kalla-pocha va Ilik suyak", kategoriya: 'gosht', icon: '🍲' },
  { id: 'ing_baliq', nomi: "Baliq go'shti (Sazan / Sudak / Forel / Losos)", kategoriya: 'gosht', icon: '🐟' },
  { id: 'ing_krevetka', nomi: "Halol Dengiz krevetkasi", kategoriya: 'gosht', icon: '🦐' },

  // 3. Sut Mahsulotlari va Tuxum (Dairy & Eggs)
  { id: 'ing_qatiq', nomi: 'Qatiq / Suzma / Chakka', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_yogurt', nomi: 'Grek yogurti va Mevali yogurt', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_smetana', nomi: 'Smetana / Qaymoq', kategoriya: 'sut_mahsuloti', icon: '🧈' },
  { id: 'ing_ayron', nomi: 'Ayron va Chala', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_tuxum', nomi: 'Tovuq tuxumi', kategoriya: 'sut_mahsuloti', icon: '🥚' },
  { id: 'ing_bedana_tuxum', nomi: 'Bedana tuxumi', kategoriya: 'sut_mahsuloti', icon: '🥚' },
  { id: 'ing_ordak_tuxum', nomi: "O'rdak va G'oz tuxumi", kategoriya: 'sut_mahsuloti', icon: '🥚' },
  { id: 'ing_pishloq', nomi: 'Pishloq (Gouda / Mozzarella / Suluguni)', kategoriya: 'sut_mahsuloti', icon: '🧀' },
  { id: 'ing_brinza', nomi: 'Brinza va Feta pishloq', kategoriya: 'sut_mahsuloti', icon: '🧀' },
  { id: 'ing_saryog', nomi: "Sariyog' (Ghee eritilgan sariyog')", kategoriya: 'sut_mahsuloti', icon: '🧈' },
  { id: 'ing_sut', nomi: 'Tabiiy Mol va Qo suti', kategoriya: 'sut_mahsuloti', icon: '🥛' },
  { id: 'ing_tvorog', nomi: 'Tvorog va Xonaki tvorog', kategoriya: 'sut_mahsuloti', icon: '🍨' },
  { id: 'ing_qurut', nomi: 'Niyozbek va Toshkent qurutlari', kategoriya: 'sut_mahsuloti', icon: '⚪' },

  // 4. Dukkakli, Don, Makaron va Un (Legumes, Grains, Pasta & Flour)
  { id: 'ing_guruch', nomi: 'Guruch (Lazer / Devzira / Alanga / Basmati)', kategoriya: 'dukkakli', icon: '🍚' },
  { id: 'ing_noxat', nomi: "No'xat (Ivitilgan)", kategoriya: 'dukkakli', icon: '🫘' },
  { id: 'ing_mosh', nomi: 'Mosh (Mung bean)', kategoriya: 'dukkakli', icon: '🫘' },
  { id: 'ing_loviya', nomi: 'Qizil va Oq Lobiya', kategoriya: 'dukkakli', icon: '🫘' },
  { id: 'ing_yasmiq', nomi: 'Yasmiq / Chechevitsa (Qizil / Yashil)', kategoriya: 'dukkakli', icon: '🫘' },
  { id: 'ing_makaron', nomi: 'Makaron (Spagetti / Penne / Farfalle)', kategoriya: 'dukkakli', icon: '🍝' },
  { id: 'ing_ugra', nomi: 'Uy ugrasi va Sho\'rva ugrasi', kategoriya: 'dukkakli', icon: '🍜' },
  { id: 'ing_lagmon', nomi: "Lag'mon xamiri va Chozma lag'mon", kategoriya: 'dukkakli', icon: '🍜' },
  { id: 'ing_noodle', nomi: 'Noodle va Ramyeon', kategoriya: 'dukkakli', icon: '🍜' },
  { id: 'ing_xamirlar', nomi: 'Somsa va Manti xamiri', kategoriya: 'dukkakli', icon: '🥟' },
  { id: 'ing_un', nomi: "Bug'doy uni (Oliy nav / 1-nav)", kategoriya: 'dukkakli', icon: '🌾' },
  { id: 'ing_makkajoxori_un', nomi: "Makkajo'xori uni va yormasi", kategoriya: 'dukkakli', icon: '🌽' },
  { id: 'ing_gerkules', nomi: 'Suli yormasi (Gerkules / Oatmeal)', kategoriya: 'dukkakli', icon: '🥣' },
  { id: 'ing_grechka', nomi: 'Grechka (Buckwheat)', kategoriya: 'dukkakli', icon: '🥣' },
  { id: 'ing_bulgur', nomi: 'Bulgur va Kuskus yormasi', kategoriya: 'dukkakli', icon: '🌾' },
  { id: 'ing_manniy', nomi: 'Manna yormasi (Semolina)', kategoriya: 'dukkakli', icon: '🌾' },

  // 5. Ziravorlar, Urg'ular, Quruq Mevalar va Yong'oqlar (Spices, Nuts & Dried Fruits)
  { id: 'ing_zira', nomi: 'Zira (Eron / Samarqand zirasi)', kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_kashnich_urug', nomi: 'Kashnich urug`i (Coriander)', kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_murch', nomi: 'Qora va Qizil murch', kategoriya: 'ziravor', icon: '🌶️' },
  { id: 'ing_paprika', nomi: 'Paprika (Shirin va Dudlangan)', kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_kunjut', nomi: 'Oq va Qora kunjut', kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_zirk', nomi: 'Zirk (Barberries)', kategoriya: 'ziravor', icon: '🍇' },
  { id: 'ing_mayiz', nomi: 'Mayiz (Qora / Sariq / Soyaki)', kategoriya: 'ziravor', icon: '🍇' },
  { id: 'ing_dolchin', nomi: 'Dolchin (Cinnamon) va Qalamfur (Cloves)', kategoriya: 'ziravor', icon: '🌿' },
  { id: 'ing_lavr', nomi: 'Lavr bargi (Bay leaf)', kategoriya: 'ziravor', icon: '🍃' },
  { id: 'ing_zafron', nomi: "Za'faron / Safran", kategoriya: 'ziravor', icon: '🌸' },
  { id: 'ing_soda', nomi: 'Iste`mol sodasi va Xamir yumshatgich', kategoriya: 'ziravor', icon: '🧂' },
  { id: 'ing_vanilin', nomi: 'Vanilin va Xamirturush (Drojji)', kategoriya: 'ziravor', icon: '🍞' },
  { id: 'ing_yongoq', nomi: "Yong'oq mag'zi va Bodom", kategoriya: 'ziravor', icon: '🥜' },
  { id: 'ing_pista', nomi: 'Pista (Pistachio) va Kesh\'yu', kategoriya: 'ziravor', icon: '🥜' },
  { id: 'ing_turshak', nomi: "O'rik qaqi / Turshak va Olxo'ri", kategoriya: 'ziravor', icon: '🍑' },

  // 6. Yog'lar, Souslar va Uy-Ro'zg'or Mahsulotlari (Oils, Sauces & Pantry)
  { id: 'ing_paxta_yogi', nomi: "Paxta yog'i (Zirvak uchun)", kategoriya: 'boshqa', icon: '🍾' },
  { id: 'ing_osimlik_yogi', nomi: "Kunchaboqar va Makkajo'xori yog'i", kategoriya: 'boshqa', icon: '🍾' },
  { id: 'ing_zaytun_yogi', nomi: "Zaytun yog'i (Extra Virgin)", kategoriya: 'boshqa', icon: '🫒' },
  { id: 'ing_kunjut_yogi', nomi: "Kunjut yog'i (Sesame oil)", kategoriya: 'boshqa', icon: '🍾' },
  { id: 'ing_tomat', nomi: 'Tomat pastasi (Tomato paste)', kategoriya: 'boshqa', icon: '🥫' },
  { id: 'ing_soya_sous', nomi: 'Soyali sous (Soy sauce)', kategoriya: 'boshqa', icon: '🍾' },
  { id: 'ing_xardal', nomi: 'Xardal / Gorchitsa (Mustard)', kategoriya: 'boshqa', icon: '🫙' },
  { id: 'ing_mayonez', nomi: 'Halol Mayonez', kategoriya: 'boshqa', icon: '🫙' },
  { id: 'ing_ketchup', nomi: 'Ketchup (Shirin / Achchiq)', kategoriya: 'boshqa', icon: '🥫' },
  { id: 'ing_asal', nomi: 'Tabiiy Asal (Tog` asali)', kategoriya: 'boshqa', icon: '🍯' },
  { id: 'ing_shakar', nomi: 'Shakar va Qand', kategoriya: 'boshqa', icon: '🍬' },
  { id: 'ing_sirka', nomi: 'Uzum va Olma sirkasi', kategoriya: 'boshqa', icon: '🧪' },
  { id: 'ing_limon', nomi: 'Limon va Limon suvi', kategoriya: 'boshqa', icon: '🍋' },
  { id: 'ing_suv', nomi: 'Tabiiy va Gazlangan Mineral Suv', kategoriya: 'boshqa', icon: '💧' },
  { id: 'ing_choy', nomi: "Ko'k Choy va Qora Choy", kategoriya: 'boshqa', icon: '🍵' }
];

export const initialRecipes: Recipe[] = [
  {
    id: 'rec_01_toshkent_palov',
    nomi: "Toshkent To'y Palovi",
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'qiyin',
    rasm_url: '/images/toshkent_palov.webp',
    tarif_matni: "Toshkent shahrining eng mashhur to'y va marosim palovi. Lazer guruchi, no'xat, mayiz va qazi bilan boyitilgan haqiqiy milliy shohona taom.",
    masalliqlar_matni: "Guruch (1kg), Qo'y go'shti (800g), Mol go'shti (200g), Paxta yog'i (200ml), Sariq sabzi (1kg), Piyoz (200g), No'xat (100g), Sarimsoq, Zira, Mayiz, Qazi va Bedana tuxumlari.",
    korsatmalari: [
      "Guruchni 5-6 marta kraxmali ketguncha yuving va 35°C iliq sho'r suvda 1 soat ivitib qo'ying.",
      "Qozonda paxta yog'ini tutun chiqquncha qizdirib, katta go'sht bo'laklarini solib to'q qizil qobiq bo'lguncha qovuring.",
      "Piyoz va somoncha to'g'ralgan sariq sabzini solib yumshaguncha qovuring.",
      "Zirvak uchun tuz, zira, ivitilgan no'xat, mayiz va sarimsoq solib, suv quying va past olovda 45 daqiqa qaynating.",
      "Guruchni yotqizib baland olovda suvini torttiring, so'ng tayoqcha bilan teshiklar qilib, 25 daqiqa past olovda dimlang.",
      "Laganga suzib, ustini to'g'ralgan go'sht, qazi va bedana tuxumlari bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch', 'ing_qoy', 'ing_sabzi', 'ing_piyoz', 'ing_noxat']
  },
  {
    id: 'rec_02_samarqand_sofi',
    nomi: 'Samarkand Oshi Sofi',
    tayyorlash_vaqti_daq: 105,
    qiyinlik: 'qiyin',
    rasm_url: '/images/samarqand_sofi.webp',
    tarif_matni: "Masalliqlari strictly qatlamlarda pishiriladigan va aralashtirmasdan suziladigan afsonaviy Samarqand sofi palovi.",
    masalliqlar_matni: "Basmati/Alanga guruchi (800g), Mol go'shti (800g), Sariyog' (150ml), Piyoz (300g), Sabzi (800g), No'xat, Mayiz, Sarimsoq va Zira.",
    korsatmalari: [
      "Guruchni yuving va iliq sho'r suvda 2 soat iviting.",
      "Qozonda sariyog'da katta mol go'shti bo'laklarini va piyozni qovuring, ozgina suv qup 1 soat dimlang.",
      "Go'sht ustiga somoncha sabzi, zira, no'xat va mayizni qatlam qilib salang (aralashtirmang!).",
      "Ustidan ivigan guruchni yotqizib, sho'r suv quying va baland olovda qaynatib suvini torttiring.",
      "20 daqiqa dimlang. Laganga avval guruch, so'ng sabzi va eng tepasiga yumshoq go'shtlarni suzing."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch', 'ing_mol', 'ing_sabzi', 'ing_piyoz']
  },
  {
    id: 'rec_03_fargona_devzira',
    nomi: "Farg'ona Devzira Palovi",
    tayyorlash_vaqti_daq: 110,
    qiyinlik: 'qiyin',
    rasm_url: '/images/fargona_devzira.webp',
    tarif_matni: "Farg'ona vodiysining qizil Devzira guruchidan tayyorlanadigan achchiq va to'q rangli o'ziga xos to'yimli palov.",
    masalliqlar_matni: "Devzira guruchi (900g), Qo'y go'shti va qovurg'asi (750g), Dumba yog'i va paxta yog'i (250ml), Qizil sabzi (900g), Piyoz (600g), Qizil achchiq qalampir va sarimsoq.",
    korsatmalari: [
      "Devzira guruchini 6-7 marta yaxshilab yuvib, sho'r suvda 1 soat iviting.",
      "Qozonda dumba yog'i va paxta yog'ida piyozni to'q tillarang bo'lguncha, so'ng go'shtni 20 daqiqa qovuring.",
      "Sabzini solib 10 daqiqa qovurib, suv, butun qalampir va sarimsoq solib zirvakni 1 soat sekin qaynating.",
      "Guruchni solib baland olovda jadal qaynatib suvini torttiring va 25 daqiqa past olovda dimlang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch', 'ing_qoy', 'ing_sabzi', 'ing_piyoz', 'ing_qalampir']
  },
  {
    id: 'rec_04_buxoro_baxsh',
    nomi: 'Buxoro Baxsh Palovi',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    rasm_url: '/images/buxoro_baxsh.webp',
    tarif_matni: "Buxoro shahrining afsonaviy 'yashil palovi'. Ko'p miqdordagi yangi kashnich va shivit bilan go'sht va jigar mayda to'g'ralib pishiriladi.",
    masalliqlar_matni: "Dumaloq guruch (400g), Mol jigari (250g), Mol go'shti (250g), Kashnich va shivit (4 dasta), Piyoz (2 dona), O'simlik yog'i (60ml), Tuz va murch.",
    korsatmalari: [
      "Jigar va go'shtni mayda (0.5cm) kubik qilib qo'lda to'g'rang. Kashnich va shivitni juda nozik to'g'rang.",
      "Yog'da piyozni, so'ng go'sht va jigarni 8 daqiqa qovuring.",
      "To'g'ralgan ko'katlarni solib aralashtiring va ustidan yuvilgan guruch bilan issiq suv quying.",
      "Baland olovda suvini torttirgach, qopqog'ini yopib 25-30 daqiqa sekin olovda dimlang va aralashtirib suzing."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_guruch', 'ing_mol', 'ing_jigar', 'ing_kokatlar', 'ing_shivit']
  },
  {
    id: 'rec_05_xiva_shivit_oshi',
    nomi: 'Xiva Shivit Oshi',
    tayyorlash_vaqti_daq: 90,
    qiyinlik: 'qiyin',
    rasm_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Xorazm va Xiva shahrining yorqin yashil shivitli ugrasi va go'shtli vaju qaylasi bilan suziladigan mashhur taomi.",
    masalliqlar_matni: "Un (300g), Yangi shivit (100g), Tuxum (1 dona), Mol go'shti (500g), Sabzi, Kartoshka, Bulg'or qalampiri, Sariyog' va Suzma / Qatiq.",
    korsatmalari: [
      "Shivitni blenderda pyure qilib, un va tuxum bilan qattiq yashil xamir qoring va 1 soat tindiring.",
      "Go'sht, piyoz, sabzi, bulg'or qalampiri va kartoshkadan quyuq 'Vaju' qaylasini tayyorlang.",
      "Yashil xamirni 1mm yupqalikda yoyib ugra kesing va qaynoq suvda 2-3 daqiqa qaynatib chaying.",
      "Sovuq yashil ugralar ustidan issiq vaju qaylasini quying va sarimsoqli suzma bilan torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_shivit', 'ing_mol', 'ing_kartoshka', 'ing_sabzi', 'ing_yogurt']
  },
  {
    id: 'rec_06_xorazm_tuxum_barak',
    nomi: 'Xorazm Tuxum Baraki',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'qiyin',
    rasm_url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Xorazmning betakror mahorat taomi. Yupqa xamir zarflari ichiga suyuq tuxum va sariyog' aralashmasi quyilib qaynatiladi.",
    masalliqlar_matni: "Un (250g), Tuxum (5 dona), Sariyog' (70g), Sut (75ml), Ko'k piyoz, Tuz va Qatiq.",
    korsatmalari: [
      "Un, suv va tuxumdan o'ta qattiq xamir qorib 30 daqiqa tindiring.",
      "Tuxumlarni sariyog', sut, ko'k piyoz va tuz bilan ko'pirtirib suyuq ichlik tayyorlang.",
      "Xamirni yupqa yoyib yumaloq kesing va yarim oy shaklida chetini yopishtirib, teshik qoldiring.",
      "Teshikdan suyuq tuxumni quying, tezda yopishtiring va zudlik bilan qaynoq sho'r suvga tashlab 3-4 daqiqa pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_tuxum', 'ing_saryog', 'ing_yogurt']
  },
  {
    id: 'rec_07_chuchvara',
    nomi: 'Uzbek Chuchvarasi',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    tarif_matni: "Boy, xushbo'y go'sht bulyonida qaynatib pishiriladigan mitti go'shtli pelmenilar (chuchvara).",
    masalliqlar_matni: "Un (400g), Qiyma (300g), Piyoz (300g), Tuxum (1 dona), Tomat pastasi, Sarimsoq, Qatiq va ko'katlar.",
    korsatmalari: [
      "Un, tuxum va suvdan qattiq xamir qorib 40 daqiqa tindiring.",
      "Qiymaga mayda to'g'ralgan piyoz, tuz va murch qo'shib aralashtiring.",
      "Xamirni 1.5mm yoyib 4x4 cm mitti kvadratlar kesing, qiyma solib mitti tugunlar tuging.",
      "Tomatli sho'r bulyonda chuchvaralarni 5-7 daqiqa qaynatib, bulyoni va qatiq bilan birga suzing."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_qiyma', 'ing_piyoz', 'ing_tuxum']
  },
  {
    id: 'rec_08_manti',
    nomi: "Go'shtli O'zbek Mantisi",
    tayyorlash_vaqti_daq: 80,
    qiyinlik: 'orta',
    rasm_url: '/images/manti_uzbek.webp',
    tarif_matni: "Mantiqozon bug'ida pishiriladigan, ichi sershira qo'lda to'g'ralgan go'sht va dumba yog'li klassik o'zbek mantisi.",
    masalliqlar_matni: "Un (500g), Go'sht (600g), Dumba yog'i (150g), Piyoz (600g), Zira, Tuxum, Qatiq yoki Smetana.",
    korsatmalari: [
      "Un, tuxum va suvdan qattiq xamir qorib 30 daqiqa tindiring.",
      "Go'sht, dumba yog'i va piyozni qo'lda mayda kubik qilib to'g'rang, zira va murch qo'shing.",
      "Xamirni 2mm yoyib 12x12 cm kvadratlar kesing va qiyma hamda dumba bo'lagi solib tuging.",
      "Mantiqozon laganlarini moylab, mantilarni 35-40 daqiqa jadal bug'da pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_mol', 'ing_dumba', 'ing_piyoz']
  },
  {
    id: 'rec_09_xonim',
    nomi: 'Kartoshkali Xonim (Orama)',
    tayyorlash_vaqti_daq: 70,
    qiyinlik: 'orta',
    rasm_url: '/images/manti_uzbek.webp',
    tarif_matni: "Yupqa yoyilgan xamir ichiga mayda somoncha kartoshka va piyoz solinib bug'da pishiriladigan to'yimli rulon taom.",
    masalliqlar_matni: "Un (400g), Kartoshka (500g), Piyoz (400g), O'simlik yog'i, Pomidor pastasi, Zira, Murch.",
    korsatmalari: [
      "Un va suvdan xamir qoring. Kartoshka va piyozni ingichka somoncha to'g'rab, zira soling.",
      "Xamirni juda yupqa yoyib yog'lang va kartoshkali aralashmani tekis soling.",
      "Xamirni uzun rulon shaklida o'rab, moylangan kaskanda 40 daqiqa bug'da pishiring.",
      "Bo'laklarga bo'lib, ustidan achchiq pomidorli sous quying."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_kartoshka', 'ing_piyoz', 'ing_yogi']
  },
  {
    id: 'rec_10_mastava',
    nomi: "O'zbek Mastavasi",
    tayyorlash_vaqti_daq: 65,
    qiyinlik: 'orta',
    rasm_url: '/images/toshkent_palov.webp',
    tarif_matni: "Xushbo'y sabzavotlar, qovurilgan go'sht, guruch va kartoshkadan tayyorlanadigan 'suyuq palov' hisoblangan to'yimli sho'rva.",
    masalliqlar_matni: "Go'sht (400g), Guruch (100g), Kartoshka (250g), Sabzi (200g), Piyoz (200g), Tomat pastasi, Zira, Qatiq va ko'katlar.",
    korsatmalari: [
      "Go'sht va piyozni qozonda qovurib, tomat va bulg'or qalampirini qo'shing.",
      "Kubik sabzi va kartoshkalarni solib, suv quying va 20 daqiqa qaynating.",
      "Ivitilgan guruchni solib guruch pishguncha 15 daqiqa qaynating.",
      "Kosalarga suzib, qatiq va ko'katlar sepib torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_mol', 'ing_guruch', 'ing_kartoshka', 'ing_sabzi', 'ing_piyoz']
  },
  {
    id: 'rec_11_qaynatma_shorva',
    nomi: "Qaynatma Sho'rva",
    tayyorlash_vaqti_daq: 135,
    qiyinlik: 'orta',
    rasm_url: '/images/toshkent_palov.webp',
    tarif_matni: "Suyakli qo'y go'shti, sabzi va butun kartoshkalardan past olovda uzoq vaqt qaynatib pishiriladigan shifobaxsh tiniq sho'rva.",
    masalliqlar_matni: "Suyakli qo'y go'shti (1kg), Piyoz (3 dona), Sabzi (3 dona), Kartoshka (4 dona), Pomidor, Bulg'or qalampiri, Zira.",
    korsatmalari: [
      "Go'shtni sovuq suvga solib qaynating va ko'pigini (kafini) to'liq tozalab oling.",
      "Piyoz, butun sabzi va pomidor solib eng past olovda 1 soat mildirating.",
      "Tuz va butun kartoshkalarni solib yana 30-40 daqiqa qaynatib pishiring.",
      "Go'sht va sabzavotlarni alohida suzib, bulyonni ko'katlar bilan kosalarda torting."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_qoy', 'ing_kartoshka', 'ing_sabzi', 'ing_piyoz']
  },
  {
    id: 'rec_12_dimlama_original',
    nomi: "An'anaviy Go'shtli Dimlama",
    tayyorlash_vaqti_daq: 120,
    qiyinlik: 'orta',
    rasm_url: '/images/samarqand_sofi.webp',
    tarif_matni: "Go'sht, kartoshka, sabzi va karam barglari qozonga qatlam qilib terilib, o'z sharbatida sekin bug'lab pishiriladigan shohona taom.",
    masalliqlar_matni: "Qo'y/Mol qovurg'asi (800g), Karam (1 dona), Kartoshka (6 dona), Sabzi (3 dona), Piyoz (3 dona), Pomidor va Zira.",
    korsatmalari: [
      "Qozon tubiga yog' va qovurg'alarni tering, tuz va zira seping.",
      "Ustidan piyoz, pomidor, qalampir, sabzi va kartoshkani qatlam qilib zich tering.",
      "Eng tepasiga karam barglarini gumbaz qilib yoping va qozon qopqog'ini sochiq bilan mahkam yoping.",
      "Past olovda 1.5-2 soat sekin o'z sharbatida dimlang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_qoy', 'ing_karram', 'ing_kartoshka', 'ing_sabzi', 'ing_piyoz']
  },
  {
    id: 'rec_13_qozon_kabob',
    nomi: 'Qozon Kabob',
    tayyorlash_vaqti_daq: 80,
    qiyinlik: 'orta',
    rasm_url: '/images/shashlik_uzbek.webp',
    tarif_matni: "Qarsildoq qilib qovurilgan butun kartoshka va yumshoq qo'y qovurg'alaridan tayyorlanadigan mashhur qozon taomi.",
    masalliqlar_matni: "Qo'y qovurg'asi (1kg), Butun kartoshka (800g), O'simlik yog'i (250ml), Zira, Koriandr, Sirkali piyoz.",
    korsatmalari: [
      "Qovurg'alarni zira, murch va tuz bilan 30 daqiqa marinadlang.",
      "Qozondagi qizigan yog'da kartoshkalarni qarsildoq qobiq bo'lguncha qovurib oling.",
      "Go'shtlarni qizigan yog'da har bir burchagini qizartirib qovuring.",
      "Qozon tubiga kartoshka va ustidan go'shtni terib, 100ml suv quying va past olovda 50 daqiqa dimlang."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_qoy', 'ing_kartoshka', 'ing_yogi', 'ing_zira']
  },
  {
    id: 'rec_14_shashlik',
    nomi: "Qo'y Go'shtidan Shashlik",
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'orta',
    rasm_url: '/images/shashlik_uzbek.webp',
    tarif_matni: "Mangal ko'mirida tutuntirib pishiriladigan sershira lahm go'sht va dumba yog'li o'zbek shashligi.",
    masalliqlar_matni: "Qo'y go'shti (800g), Dumba yog'i (200g), Piyoz (3 dona), Zira, Koriandr, Sirka va Mineral suv.",
    korsatmalari: [
      "Go'sht va dumbani 3cm kubik qilib to'g'rang.",
      "Piyoz suvi, zira, koriandr va mineral suv bilan 4 soat salqinda marinadlang.",
      "Sikhga 3 dona go'sht va 1 dona dumba yog'ini tering.",
      "Mangal ko'mirida tez-tez buraverib 10-12 daqiqa qizartirib pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_qoy', 'ing_dumba', 'ing_piyoz', 'ing_zira']
  },
  {
    id: 'rec_15_tandir_somsa',
    nomi: 'Tandir Somsa',
    tayyorlash_vaqti_daq: 85,
    qiyinlik: 'qiyin',
    rasm_url: '/images/tandir_somsa.webp',
    tarif_matni: "Qat-qat yumshoq xamir ichida sershira qo'lda to'g'ralgan go'sht va dumba yog'li mashhur o'zbek somsa.",
    masalliqlar_matni: "Un (500g), Sariyog' (150g), Go'sht (400g), Dumba yog'i (100g), Piyoz (500g), Zira va Susan.",
    korsatmalari: [
      "Un va iliq suvdan xamir qorib, yupqa yoyib sariyog' surtib qat-qat rulon qiling va sovuting.",
      "Go'sht, dumba va piyozni qo'lda mayda to'g'rab zira soling.",
      "Xamir bo'laklarini yoyib filling soling va uchburchak tuging.",
      "200°C pechda yoki tandirda 35-40 daqiqa qizarguncha pishiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_mol', 'ing_dumba', 'ing_piyoz', 'ing_saryog']
  },
  {
    id: 'rec_16_toshkent_salat',
    nomi: 'Toshkent Salati',
    tayyorlash_vaqti_daq: 40,
    qiyinlik: 'orta',
    rasm_url: '/images/lh_atirgul_carving.webp',
    tarif_matni: "Qaynatilgan mol tili somonchasi, Marg'ilon yashil turpi va qarsildoq qovurilgan piyozli mashhur retro salat.",
    masalliqlar_matni: "Mol tili yoki go'shti (300g), Marg'ilon yashil turpi (300g), Piyoz (2 dona), Mayonez (100g), Qaynatilgan tuxum (3 dona).",
    korsatmalari: [
      "Turpni somoncha to'g'rab 15 daqiqa muzdek sho'r suvda achchig'ini chiqaring va quriting.",
      "Qaynatilgan mol tili va tuxumlarni uzunchoq somoncha to'g'rang.",
      "Piyoz halqalarini unga bulab yog'da qarsildoq bo'lguncha qovuring.",
      "Masalliqlarni mayonez bilan aralashtirib, ustini qarsildoq piyoz bilan bezating."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_til', 'ing_turp', 'ing_piyoz']
  },
  {
    id: 'rec_17_achichuk',
    nomi: 'Achichuk Salati',
    tayyorlash_vaqti_daq: 10,
    qiyinlik: 'oson',
    rasm_url: '/images/lh_atirgul_carving.webp',
    tarif_matni: "Palov va shashliklarning ajralmas, nordon-shirin yangi pomidor va yupqa piyozli milliy salat.",
    masalliqlar_matni: "Qizil shirin pomidor (4 dona), Piyoz (1 dona), Tuz, Shivit yoki kashnich va Achchiq qalampir.",
    korsatmalari: [
      "Piyozni shaffof yupqalikda halqa qilib to'g'rab muzdek suvda chaying.",
      "Shirin pomidorlarni pichoqda yupqa parrak qilib kesing.",
      "Piyoz, pomidor va ko'katlarni birlashtirib, faqat tortishdan oldin tuz seping."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_pomidor', 'ing_piyoz']
  },
  {
    id: 'rec_18_medovik',
    nomi: 'Asalli "Medovik" Torti',
    tayyorlash_vaqti_daq: 105,
    qiyinlik: 'qiyin',
    rasm_url: '/images/medovik_cake.webp',
    tarif_matni: "8-10 qavatli yupqa asalli biskvit va smetanali mayin kremdan tayyorlanadigan og'izda eriydigan shirinlik.",
    masalliqlar_matni: "Un (450g), Tabiiy asal (140g), Shakar (100g), Sariyog' (85g), Tuxum (3 dona), Soda (6g), Smetana va Qaymoq (850g).",
    korsatmalari: [
      "Bug' hammomida sariyog', shakar va asalni eritib, soda solib 3 barobar ko'pirtiring.",
      "Tuxum va un qo'shib xamir qoring, 8 bo'lakka bo'lib yupqa yoying va pechda 5 daqiqadan pishiring.",
      "Smetana, qaymoq va shakar upasidan yengil krem tayyorlang.",
      "Qavatlarga krem surtib yig'ing va muzlatgichda 10 soatga tindiring."
    ],
    holat: 'nashr',
    required_ingredient_ids: ['ing_un', 'ing_asal', 'ing_saryog', 'ing_tuxum', 'ing_smetana']
  }
];

export const initialTales: Tale[] = [
  {
    id: 'tale_quyoncha',
    sarlavha: 'Mehrli quyoncha',
    yosh_toifasi: '3-5',
    muqova_rasm_url: '/images/tale_quyoncha_cover.webp',
    holat: 'nashr',
    created_at: '2026-07-01',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_quyoncha',
        tartib_raqami: 1,
        rasm_url: '/images/tale_quyoncha_cover.webp',
        matn: "Bir bor ekan, bir yo'q ekan. Quyoshli o'rmonda kichkina xushfe'l Quyoncha yashagan ekan. U har kuni barcha do'stlariga shirin sabzilar ulashardi."
      },
      {
        id: 'p2',
        ertak_id: 'tale_quyoncha',
        tartib_raqami: 2,
        rasm_url: '/images/tale_quyoncha_cover.webp',
        matn: "Bir kuni kichkina quyoncha o'rmonda yo'lg'iz yig'layotgan bir kichkina qushchani ko'rdi. Qushcha inidan tushib ketgan edi."
      },
      {
        id: 'p3',
        ertak_id: 'tale_quyoncha',
        tartib_raqami: 3,
        rasm_url: '/images/tale_quyoncha_cover.webp',
        matn: "Quyoncha ayiq polvonni yordamga chaqirdi va birgalikda qushchani ozoda iniga joylashtirishdi. Barcha o'rmon hayvonlari quyonchaning mehridan xursand bo'lishdi."
      }
    ]
  },
  {
    id: 'tale_odat',
    sarlavha: 'Yomon odatning zarari',
    yosh_toifasi: '6-8',
    muqova_rasm_url: '/images/tale_quyoncha_cover.webp',
    holat: 'nashr',
    created_at: '2026-07-02',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_odat',
        tartib_raqami: 1,
        rasm_url: '/images/tale_quyoncha_cover.webp',
        matn: "Odil ismli bola har kuni maktabdan keliboq o'yinchoqlarini tarqoq holda qoldirib, qo'lini yuvmay shirinlik yeyishni yaxshi ko'rardi."
      },
      {
        id: 'p2',
        ertak_id: 'tale_odat',
        tartib_raqami: 2,
        rasm_url: '/images/tale_quyoncha_cover.webp',
        matn: "Kunlardan bir kuni uning sevimli o'yinchoq ayiqchasi yo'qolib qoldi. Chunki xonasi shunchalik tartibsiz ediki, hech narsa topilmasdi."
      },
      {
        id: 'p3',
        ertak_id: 'tale_odat',
        tartib_raqami: 3,
        rasm_url: '/images/tale_quyoncha_cover.webp',
        matn: "Onasi unga xonasini tartiblashga yordam berdi. Odil shundan so'ng ozodalik va intizom insonning eng yaqin do'sti ekanligini tushunib yetdi."
      }
    ]
  },
  {
    id: 'tale_chumoli',
    sarlavha: 'Mehnatsevar chumoli',
    yosh_toifasi: '6-8',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    holat: 'nashr',
    created_at: '2026-07-03',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_chumoli',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        matn: "Issiq yoz kunlarida barcha kapalaklar o'ynab yurganida, tirishqoq Chumoli qish uchun oziq-ovqat g'amlar edi."
      },
      {
        id: 'p2',
        ertak_id: 'tale_chumoli',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
        matn: "Sovuq qish kelganda Chumolining uyi issiq va rizqga to'la edi. Mehnat qilgan hech qachon kam bo'lmaydi!"
      }
    ]
  },
  {
    id: 'tale_sehrli_bog',
    sarlavha: "Sehrli bog'",
    yosh_toifasi: '9-12',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
    holat: 'nashr',
    created_at: '2026-07-04',
    sahifalar: [
      {
        id: 'p1',
        ertak_id: 'tale_sehrli_bog',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
        matn: "Qadimiy qishloq chetida sirlarga to'la bir bog' bor edi. U yerdagi har bir daraxt kishiga ezgulik va odob so'zlarini so'zlar edi."
      },
      {
        id: 'p2',
        ertak_id: 'tale_sehrli_bog',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
        matn: "Zukko Jasur bog'ga kirib, bilim va sabr mevalarini terdi va qishloqdoshlariga ulashdi."
      }
    ]
  }
];

export const initialLifehacks: Lifehack[] = [
  {
    id: 'lh_atirgul',
    sarlavha: 'Sabzavotlardan atirgul qilish',
    tavsif_matni: "Sabzi va bodring bo'lakchalaridan bayramona dasturxon uchun go'zal atirgul shaklini yasash siri.",
    rasm_url: '/images/lh_atirgul_carving.webp',
    kategoriya: 'karving',
    bosqichlar: [
      "Bodring va sabzini pichoq bilan juda yupqa doiracha qilib to'g'rang.",
      "Birinchi bo'lakni mahkam o'rang.",
      "Keyingi bo'laklarni atrofidan barg ko'rinishida ketma-ket joylashtiring.",
      "Zubochistka bilan ostidan mahkamlab dasturxonga qo'ying."
    ],
    holat: 'nashr'
  },
  {
    id: 'lh_qayiq',
    sarlavha: "Qog'ozdan qayiq yasash",
    tavsif_matni: "Farzandingiz bilan birgalikda 3 daqiqada qiziqarli rangli qog'ozdan suzuvchi qayiqcha yasash.",
    rasm_url: '/images/lh_atirgul_carving.webp',
    kategoriya: 'oyinchoq_yasash',
    bosqichlar: [
      "A4 qog'ozni teng ikkiga taxlang.",
      "Yuqori burchaklarini markazga qarab buking.",
      "Paski chetlarini yuqoriga qayring va uchburchak hosil qiling.",
      "Markazidan ochib kvadrat shakliga keltiring va qayiqni yoying!"
    ],
    holat: 'nashr'
  },
  {
    id: 'lh_xona',
    sarlavha: 'Xonani tezda tartiblash usullari',
    tavsif_matni: "Bolalar o'yinchoqlarini 5 daqiqada o'yin ko'rinishida yig'ish usullari va qutilar tizimi.",
    rasm_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    kategoriya: 'uy_ishlari',
    bosqichlar: [
      "Rangli 3 ta savat tayyorlang: yumshoq o'yinchoqlar, konstruktorlar va kitoblar uchun.",
      "Taymerni 5 daqiqaga qo'ying va kim tez yig'ish o'yinini o'ynang.",
      "Bajarilgach farzandingizni maqtang va barmoqcha rasm bering."
    ],
    holat: 'nashr'
  },
  {
    id: 'lh_kitob',
    sarlavha: 'Kitobni muqovasini yasash',
    tavsif_matni: "Maktab darsliklari va ertak kitoblarini qiziqarli rangli muqova bilan asrash.",
    rasm_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    kategoriya: 'boshqa',
    bosqichlar: [
      "Qalin qog'ozni kitob hajmidan biroz kattaroq qilib kesing.",
      "Kitob chetlarini ichkariga buking va skotch bilan mahkamlang.",
      "Farzandingiz stikerlar va qalamlar bilan bezatishiga imkon bering."
    ],
    holat: 'nashr'
  }
];

export const initialRiddles: Riddle[] = [
  {
    id: 'rid_1',
    savol: "Ko'zi bor, boshi yo'q. Ko'zi bor, ko'rmaydi. Bu nima?",
    javob: 'Igna',
    variantlar: ['Igna', 'Tuxum', 'Tuz', 'Uy'],
    yosh_toifasi: '3-5',
    qiyinlik: 'oson',
    izoh: "Igna teshigiga 'ko'z' deyiladi, lekin u ko'rmaydi."
  },
  {
    id: 'rid_2',
    savol: "Uydan chiqadi, yo'ldan ketadi, lekin joyidan jilmaydi. Bu nima?",
    javob: "Yo'l",
    variantlar: ["Yo'l", 'Avtobus', 'Soy', 'Daraxt'],
    yosh_toifasi: '6-8',
    qiyinlik: 'oson',
    izoh: "Yo'l har tomonga eltadi, lekin o'zi joyida turadi."
  },
  {
    id: 'rid_3',
    savol: "Oq yer, qora urug', Qo'l bilan ekar, Ko'z bilan o'rar. Bu nima?",
    javob: 'Yozuv / Kitob',
    variantlar: ['Yozuv / Kitob', 'Dala', 'Qor', 'Tush'],
    yosh_toifasi: '6-8',
    qiyinlik: 'orta',
    izoh: "Oq qog'ozga qora siyoh bilan yoziladi va ko'z bilan o'qiladi."
  }
];

export const initialMathProblems: MathProblem[] = [
  {
    id: 'math_1',
    savol: "Aida 12 ta olma terdi. Ukasi undan 5 tasini oldi. Aidaning nechta olmasi qoldi?",
    togri_javob: '7',
    notogri_variantlar: ['5', '8', '17'],
    yosh_toifasi: '6-8',
    tushuntirish: "12 - 5 = 7 ta olma qoldi."
  },
  {
    id: 'math_2',
    savol: "Savatchada 4 ta qizil va 6 ta yashil shar bor. Jami nechta shar bor?",
    togri_javob: '10',
    notogri_variantlar: ['8', '12', '2'],
    yosh_toifasi: '3-5',
    tushuntirish: "4 + 6 = 10 ta shar."
  },
  {
    id: 'math_3',
    savol: "Bir kitobda 20 sahifa bor. Malika har kuni 5 sahifa o'qisa, kitobni necha kunda tugatadi?",
    togri_javob: '4',
    notogri_variantlar: ['5', '3', '10'],
    yosh_toifasi: '9-12',
    tushuntirish: "20 / 5 = 4 kunda."
  }
];
