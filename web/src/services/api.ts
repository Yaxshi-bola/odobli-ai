import { Ingredient, Recipe, Ertak, Lifehack, Topishmoq, MatematikMasala } from '../types';

export const MOCK_INGREDIENTS: Ingredient[] = [
  // Sabzavotlar
  { id: 'i1', nomi: 'Sabzi', kategoriya: 'sabzavot' },
  { id: 'i2', nomi: 'Piyoz', kategoriya: 'sabzavot' },
  { id: 'i3', nomi: 'Kartoshka', kategoriya: 'sabzavot' },
  { id: 'i4', nomi: 'Pomidor', kategoriya: 'sabzavot' },
  { id: 'i13', nomi: 'Bodring', kategoriya: 'sabzavot' },
  { id: 'i14', nomi: 'Bulg\'or qalampiri', kategoriya: 'sabzavot' },
  { id: 'i15', nomi: 'Sarmsoqpiyoz', kategoriya: 'sabzavot' },
  { id: 'i22', nomi: 'Oshqovoq', kategoriya: 'sabzavot' },

  // Go'shtlar
  { id: 'i5', nomi: "Mol go'shti", kategoriya: 'gosht' },
  { id: 'i6', nomi: "Tovuq go'shti", kategoriya: 'gosht' },
  { id: 'i16', nomi: "Qo'y go'shti", kategoriya: 'gosht' },

  // Sut mahsulotlari
  { id: 'i7', nomi: 'Sut', kategoriya: 'sut_mahsuloti' },
  { id: 'i8', nomi: 'Tuxum', kategoriya: 'sut_mahsuloti' },
  { id: 'i17', nomi: 'Qatiq / Smetana', kategoriya: 'sut_mahsuloti' },
  { id: 'i18', nomi: 'Sariyog\'', kategoriya: 'sut_mahsuloti' },

  // Dukkaklilar
  { id: 'i9', nomi: 'Nohot', kategoriya: 'dukkakli' },
  { id: 'i19', nomi: 'Loviya', kategoriya: 'dukkakli' },
  { id: 'i20', nomi: 'Mosh', kategoriya: 'dukkakli' },

  // Boshqa & Ziravor
  { id: 'i10', nomi: 'Guruch', kategoriya: 'boshqa' },
  { id: 'i11', nomi: 'Un', kategoriya: 'boshqa' },
  { id: 'i12', nomi: 'Murch va Tuz', kategoriya: 'ziravor' },
  { id: 'i21', nomi: 'Zira', kategoriya: 'ziravor' }
];

// Smart Substitution Dictionary for Missing Ingredients
export const INGREDIENT_SUBSTITUTIONS: Record<string, string> = {
  'Mol go\'shti': 'O\'rniga tovuq go\'shti yoki pishirilgan nohot/mosh solib tejamkor va foydali versiyasini tayyorlasangiz bo\'ladi.',
  'Tovuq go\'shti': 'O\'rniga tuxum yoki mol go\'shti ishlatilishi mumkin.',
  'Sut': 'O\'rniga suv va ozgina sariyog\' yoki smetana aralashmasidan foydalansa bo\'ladi.',
  'Qatiq / Smetana': 'O\'rniga suzma yoki ozgina limon sharbati qo\'shilgan sut ishlatish mumkin.',
  'Kartoshka': 'O\'rniga oshqovoq yoki guruch solsa ham taom mazali chiqadi.',
  'Sabzi': 'O\'rniga bulg\'or qalampiri yoki pomidor solib o\'zgacha ta\'m berishingiz mumkin.',
  'Un': 'O\'rniga manniy krupasi (manka) yoki suli yormasidan foydalanish mumkin.'
};

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 'r1',
    nomi: 'Mazali Uzbegim Shurvasi',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'oson',
    rasm_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    tarif_matni: 'Masalliqlarni qozonga solib, past alovda 40 daqiqa qaynatiladi. Bolalar uchun vitaminlarga boy va yengil taom.',
    ingredient_ids: ['i1', 'i2', 'i3', 'i5'] // Sabzi, Piyoz, Kartoshka, Mol goshti
  },
  {
    id: 'r2',
    nomi: 'Toyimli Uy Somsasi',
    tayyorlash_vaqti_daq: 60,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    tarif_matni: 'Xamir yoyilib, to\'g\'ralgan go\'sht va piyoz aralashmasi solinadi va duxovkada qizartirib pishiriladi.',
    ingredient_ids: ['i2', 'i5', 'i11'] // Piyoz, Mol goshti, Un
  },
  {
    id: 'r3',
    nomi: 'Tuxumli Yumshoq Omlet',
    tayyorlash_vaqti_daq: 15,
    qiyinlik: 'oson',
    rasm_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    tarif_matni: 'Tuxum va sut aralashtirilib, tavada sariyog\'da pishiriladi. Ertalabki nonushta uchun ajoyib va tez retsept.',
    ingredient_ids: ['i7', 'i8', 'i18'] // Sut, Tuxum, Sariyog'
  },
  {
    id: 'r4',
    nomi: 'Vitaminli Oshqovoqli Somsa',
    tayyorlash_vaqti_daq: 45,
    qiyinlik: 'oson',
    rasm_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    tarif_matni: 'Mayda to\'g\'ralgan oshqovoq va piyoz murch-tuz bilan aralashtirilib xamirga solinadi. Bolalar uchun parhezbop va shirin taom.',
    ingredient_ids: ['i2', 'i11', 'i22'] // Piyoz, Un, Oshqovoq
  },
  {
    id: 'r5',
    nomi: 'Tovuqli Teftellar',
    tayyorlash_vaqti_daq: 35,
    qiyinlik: 'orta',
    rasm_url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80',
    tarif_matni: 'Qiymaga guruch va tuxum qo\'shib yumaloq teftellar yasaladi hamda pomidorli sousda pishiriladi.',
    ingredient_ids: ['i4', 'i6', 'i8', 'i10'] // Pomidor, Tovuq goshti, Tuxum, Guruch
  }
];

export const MOCK_ERTAKLAR: Ertak[] = [
  {
    id: 'e1',
    sarlavha: 'Zukko Quyoncha va O\'rmon Do\'stlari',
    yosh_toifasi: '3-5',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    sahifalar: [
      {
        id: 'es1',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        matn: 'Bir bor ekan, bir yo\'q ekan, yashil va ko\'m-ko\'k o\'rmonda kichik, mehribon Zukko Quyoncha yashar ekan.'
      },
      {
        id: 'es2',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
        matn: 'U har kuni ertalab do\'stlariga salom berar va har doim kattalarga yordam berishni yaxshi ko\'rar ekan.'
      },
      {
        id: 'es3',
        tartib_raqami: 3,
        rasm_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
        matn: 'Bir kuni u yo\'lda ayiqchani uchratib qolibdi va unga sabzilarini tashishda yordam beribdi. Shunda barcha hayvonlar uni odobli quyoncha deb maqtashibdi.'
      }
    ]
  },
  {
    id: 'e2',
    sarlavha: 'Sehrli Qalam va Odobli Bola',
    yosh_toifasi: '6-8',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    sahifalar: [
      {
        id: 'es4',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
        matn: 'Kichkina Ali ko\'chada bir yog\'och qalam topib oldi. Bu qalam sehrli bo\'lib, faqat yaxshi so\'zlar yozilganda porlardi.'
      },
      {
        id: 'es5',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
        matn: 'Ali har kuni "Rahmat", "Iltimos", "Salom" so\'zlarini mashq qildi va uning daftari nurlarga to\'ldi.'
      }
    ]
  }
];

export const MOCK_LIFEHACKLAR: Lifehack[] = [
  {
    id: 'l1',
    sarlavha: 'Sabzidan Chiroyli Gul Yasash (Karving)',
    tavsif_matni: 'Sabzini yupqa parrak qilib kesib, sekin burash orqali ovqatlaringizga ajoyib bezak berishingiz mumkin.',
    rasm_url: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80',
    kategoriya: 'karving'
  },
  {
    id: 'l2',
    sarlavha: 'Qog\'ozdan Tejamkor O\'yinchoq',
    tavsif_matni: 'Eski karton va qog\'ozlardan bolalar uchun qiziqarli uyroqlar va mashinalar yasang.',
    rasm_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    kategoriya: 'oyinchoq_yasash'
  }
];

export const MOCK_TOPISHMOQLAR: Topishmoq[] = [
  {
    id: 't1',
    savol: 'Uzun quloq, qisqa dum, Sabzini yeydi yum-yum. U nima?',
    javob: 'Quyon',
    yosh_toifasi: '3-5',
    qiyinlik: 'oson'
  },
  {
    id: 't2',
    savol: 'Oydan bitta, kundan bitta, Hammada bor bir dona. U nima?',
    javob: 'Ism',
    yosh_toifasi: '6-8',
    qiyinlik: 'orta'
  }
];

export const MOCK_MATEMATIK: MatematikMasala[] = [
  {
    id: 'm1',
    savol: 'Alining 3 ta olmasi bor edi. Onasi unga yana 2 ta olma berdi. Alida jami nechta olma bo\'ldi?',
    togri_javob: '5',
    notogri_variantlar: ['4', '6', '3'],
    yosh_toifasi: '3-5'
  }
];

// Pazanda AI Matching Algorithm
export interface RecipeMatchResult {
  exactMatches: Array<{ recipe: Recipe; missingIngredientNames: string[] }>;
  partialMatches: Array<{ recipe: Recipe; missingIngredientNames: string[]; substitutionTip?: string }>;
}

export function matchRecipes(selectedIngredientIds: string[]): RecipeMatchResult {
  const selectedSet = new Set(selectedIngredientIds);
  const exactMatches: Array<{ recipe: Recipe; missingIngredientNames: string[] }> = [];
  const partialMatches: Array<{ recipe: Recipe; missingIngredientNames: string[]; substitutionTip?: string }> = [];

  const ingredientMap = new Map(MOCK_INGREDIENTS.map(i => [i.id, i.nomi]));

  for (const recipe of MOCK_RECIPES) {
    const required = recipe.ingredient_ids;
    const missingIds = required.filter(id => !selectedSet.has(id));
    const missingNames = missingIds.map(id => ingredientMap.get(id) || 'Mahsulot');

    if (missingIds.length === 0) {
      exactMatches.push({ recipe, missingIngredientNames: [] });
    } else if (missingIds.length === 1) {
      const missingName = missingNames[0];
      const tip = INGREDIENT_SUBSTITUTIONS[missingName] || `Yetishmayotgan ${missingName} o'rniga uyingizdagi o'xshash masalliqni qo'shishingiz mumkin.`;
      partialMatches.push({ recipe, missingIngredientNames: missingNames, substitutionTip: tip });
    }
  }

  return { exactMatches, partialMatches };
}
