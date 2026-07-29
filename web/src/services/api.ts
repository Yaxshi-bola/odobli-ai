import { Ingredient, Recipe, Ertak, Lifehack, Topishmoq, MatematikMasala } from '../types';
import { initialIngredients, initialRecipes } from '../data/mockData';

export const MOCK_INGREDIENTS: Ingredient[] = initialIngredients;

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

export const MOCK_RECIPES: Recipe[] = initialRecipes;

export const MOCK_ERTAKLAR: Ertak[] = [
  {
    id: 'e1',
    sarlavha: 'Zukko Quyoncha va O\'rmon Do\'stlari',
    yosh_toifasi: '3-5',
    muqova_rasm_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    holat: 'nashr',
    created_at: new Date().toISOString(),
    sahifalar: [
      {
        id: 'es1',
        ertak_id: 'e1',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        matn: 'Bir bor ekan, bir yo\'q ekan, yashil va ko\'m-ko\'k o\'rmonda kichik, mehribon Zukko Quyoncha yashar ekan.'
      },
      {
        id: 'es2',
        ertak_id: 'e1',
        tartib_raqami: 2,
        rasm_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
        matn: 'U har kuni ertalab do\'stlariga salom berar va har doim kattalarga yordam berishni yaxshi ko\'rar ekan.'
      },
      {
        id: 'es3',
        ertak_id: 'e1',
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
    holat: 'nashr',
    created_at: new Date().toISOString(),
    sahifalar: [
      {
        id: 'es4',
        ertak_id: 'e2',
        tartib_raqami: 1,
        rasm_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
        matn: 'Kichkina Ali ko\'chada bir yog\'och qalam topib oldi. Bu qalam sehrli bo\'lib, faqat yaxshi so\'zlar yozilganda porlardi.'
      },
      {
        id: 'es5',
        ertak_id: 'e2',
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
    kategoriya: 'karving',
    holat: 'nashr'
  },
  {
    id: 'l2',
    sarlavha: 'Qog\'ozdan Tejamkor O\'yinchoq',
    tavsif_matni: 'Eski karton va qog\'ozlardan bolalar uchun qiziqarli uyroqlar va mashinalar yasang.',
    rasm_url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    kategoriya: 'oyinchoq_yasash',
    holat: 'nashr'
  }
];

export const MOCK_TOPISHMOQLAR: Topishmoq[] = [
  {
    id: 't1',
    savol: 'Uzun quloq, qisqa dum, Sabzini yeydi yum-yum. U nima?',
    javob: 'Quyon',
    variantlar: ['Quyon', 'Ayiq', 'Tulkicha'],
    yosh_toifasi: '3-5',
    qiyinlik: 'oson'
  },
  {
    id: 't2',
    savol: 'Oydan bitta, kundan bitta, Hammada bor bir dona. U nima?',
    javob: 'Ism',
    variantlar: ['Ism', 'Uy', 'Kitob'],
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
    const required = recipe.required_ingredient_ids || [];
    const missingIds = required.filter(id => !selectedSet.has(id));
    const missingNames = missingIds.map(id => {
      const found = ingredientMap.get(id);
      if (found) return found;
      if (id.startsWith('ing_')) {
        const raw = id.replace('ing_', '').replace(/_/g, ' ');
        return raw.charAt(0).toUpperCase() + raw.slice(1);
      }
      return id;
    });

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
