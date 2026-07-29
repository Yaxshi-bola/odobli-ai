export type ScriptType = 'lotin' | 'kirill';

export interface Child {
  id: string;
  ism: string;
  yosh: number;
}

export interface User {
  id: string;
  telegram_id: number;
  username: string;
  ism: string;
  til_skripti: ScriptType;
  bolalar: Child[];
  trial_ends_at: string;
  is_premium: boolean;
  premium_until: string | null;
  created_at: string;
}

export interface UserProgress {
  user_id: string;
  jami_ball: number;
  joriy_streak: number;
  eng_uzun_streak: number;
  oxirgi_faollik_sanasi: string;
}

export type IngredientCategory = 'sabzavot' | 'meva' | 'gosht' | 'sut_mahsuloti' | 'dukkakli' | 'qandolat' | 'yogi' | 'ziravor' | 'boshqa';

export interface Ingredient {
  id: string;
  nomi: string;
  kategoriya: IngredientCategory;
  rasm_url?: string;
  icon?: string;
}

export interface RecipeIngredient {
  recipe_id: string;
  ingredient_id: string;
  majburiymi: boolean;
}

export interface Recipe {
  id: string;
  nomi: string;
  tayyorlash_vaqti_daq: number;
  qiyinlik: 'oson' | 'orta' | 'qiyin';
  rasm_url: string;
  tarif_matni: string;
  masalliqlar_matni: string;
  korsatmalari: string[];
  holat: 'qoralama' | 'nashr';
  required_ingredient_ids: string[];
  optional_ingredient_ids?: string[];
}

export interface TalePage {
  id: string;
  ertak_id: string;
  tartib_raqami: number;
  rasm_url: string;
  matn: string;
}

export interface Tale {
  id: string;
  sarlavha: string;
  yosh_toifasi: '3-5' | '6-8' | '9-12';
  muqova_rasm_url: string;
  holat: 'qoralama' | 'nashr';
  muallif?: string;
  sahifalar: TalePage[];
  created_at: string;
}

export type LifehackCategory = 'karving' | 'oyinchoq_yasash' | 'uy_ishlari' | 'boshqa';

export interface Lifehack {
  id: string;
  sarlavha: string;
  tavsif_matni: string;
  rasm_url: string;
  kategoriya: LifehackCategory;
  bosqichlar?: string[];
  holat: 'qoralama' | 'nashr';
}

export interface Riddle {
  id: string;
  savol: string;
  javob: string;
  variantlar: string[];
  yosh_toifasi: '3-5' | '6-8' | '9-12';
  qiyinlik: 'oson' | 'orta' | 'qiyin';
  izoh?: string;
}

export interface MathProblem {
  id: string;
  savol: string;
  togri_javob: string;
  notogri_variantlar: string[];
  yosh_toifasi: '3-5' | '6-8' | '9-12';
  tushuntirish?: string;
}

export interface PaymentProof {
  id: string;
  user_id: string;
  summa: number;
  screenshot_file_id: string;
  screenshot_preview_url?: string;
  holat: 'kutilmoqda' | 'tasdiqlangan' | 'rad_etilgan';
  created_at: string;
  tasdiqlangan_at?: string | null;
}

export interface RoutineTask {
  id: string;
  sarlavha: string;
  vaqt: string;
  kategoriya: 'ona' | 'bola';
  ball: number;
  bajarildi: boolean;
  icon: string;
}

export interface Badge {
  id: string;
  nomi: string;
  tavsif: string;
  icon: string;
  ochilgan: boolean;
  talab: string;
}

export interface ShoppingItem {
  id: string;
  nomi: string;
  miqdori?: string;
  bajarildi: boolean;
}

export type ActiveTab = 'home' | 'pazanda' | 'bolajon' | 'lifehacklar' | 'profil' | 'admin';

// Type Aliases for compatibility
export type Ertak = Tale;
export type Topishmoq = Riddle;
export type MatematikMasala = MathProblem;
export type UserProfile = User;
