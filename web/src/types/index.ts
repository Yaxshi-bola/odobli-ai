export type ScriptType = 'lotin' | 'kirill';

export interface UserProfile {
  id: string;
  telegram_id: number;
  ism: string;
  til_skripti: ScriptType;
  bolalar: Array<{ ism: string; yosh: number }>;
  is_premium: boolean;
  trial_ends_at: string;
  premium_until?: string;
  jami_ball: number;
  joriy_streak: number;
}

export interface Ingredient {
  id: string;
  nomi: string;
  kategoriya: 'sabzavot' | 'gosht' | 'sut_mahsuloti' | 'dukkakli' | 'ziravor' | 'boshqa';
  rasm_url?: string;
}

export interface Recipe {
  id: string;
  nomi: string;
  tayyorlash_vaqti_daq: number;
  qiyinlik: 'oson' | 'orta' | 'qiyin';
  rasm_url: string;
  tarif_matni: string;
  ingredient_ids: string[];
}

export interface ErtakSahifa {
  id: string;
  tartib_raqami: number;
  rasm_url: string;
  matn: string;
}

export interface Ertak {
  id: string;
  sarlavha: string;
  yosh_toifasi: '3-5' | '6-8' | '9-12';
  muqova_rasm_url: string;
  sahifalar: ErtakSahifa[];
}

export interface Lifehack {
  id: string;
  sarlavha: string;
  tavsif_matni: string;
  rasm_url: string;
  kategoriya: 'karving' | 'oyinchoq_yasash' | 'uy_ishlari' | 'boshqa';
}

export interface Topishmoq {
  id: string;
  savol: string;
  javob: string;
  yosh_toifasi: '3-5' | '6-8' | '9-12';
  qiyinlik: 'oson' | 'orta' | 'qiyin';
}

export interface MatematikMasala {
  id: string;
  savol: string;
  togri_javob: string;
  notogri_variantlar: string[];
  yosh_toifasi: '3-5' | '6-8' | '9-12';
}
