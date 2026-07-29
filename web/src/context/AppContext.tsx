import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserProgress,
  ScriptType,
  ActiveTab,
  Recipe,
  Ingredient,
  Tale,
  Lifehack,
  Riddle,
  MathProblem,
  PaymentProof,
  Child,
  RoutineTask,
  Badge,
  ShoppingItem
} from '../types';
import {
  initialIngredients,
  initialRecipes,
  initialTales,
  initialLifehacks,
  initialRiddles,
  initialMathProblems
} from '../data/mockData';
import { translateText } from '../utils/transliterate';

interface RewardDetails {
  title: string;
  points: number;
  streak: number;
  message: string;
}

interface AppContextType {
  user: User;
  progress: UserProgress;
  script: ScriptType;
  setScript: (s: ScriptType) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  t: (text: string) => string;

  // Data collections
  ingredients: Ingredient[];
  recipes: Recipe[];
  tales: Tale[];
  lifehacks: Lifehack[];
  riddles: Riddle[];
  mathProblems: MathProblem[];
  paymentProofs: PaymentProof[];
  routineTasks: RoutineTask[];
  badges: Badge[];
  shoppingList: ShoppingItem[];
  favoriteRecipeIds: string[];
  toggleFavoriteRecipe: (id: string) => void;

  // Actions
  toggleRoutineTask: (id: string) => void;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (recipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  toggleRecipeStatus: (id: string) => void;

  addTale: (tale: Tale) => void;
  updateTale: (tale: Tale) => void;
  deleteTale: (id: string) => void;
  toggleTaleStatus: (id: string) => void;

  addLifehack: (lh: Lifehack) => void;
  deleteLifehack: (id: string) => void;
  toggleLifehackStatus: (id: string) => void;

  addRiddle: (riddle: Riddle) => void;
  deleteRiddle: (id: string) => void;

  addIngredient: (ing: Ingredient) => void;
  grantUserPremium: (durationDays: number) => void;
  exportBackupData: () => void;

  // Shopping List Actions
  addToShoppingList: (nomi: string, miqdori?: string) => void;
  addMultipleToShoppingList: (items: { nomi: string; miqdori?: string }[]) => void;
  toggleShoppingItem: (id: string) => void;
  removeShoppingItem: (id: string) => void;
  clearShoppingList: () => void;

  // Payment Actions
  submitPaymentProof: (summa: number, screenshot: string) => void;
  verifyPaymentProof: (id: string, status: 'tasdiqlangan' | 'rad_etilgan') => void;

  // User & Child Actions
  updateUserName: (newName: string) => void;
  addChild: (ism: string, yosh: number) => void;
  removeChild: (id: string) => void;

  // Gamification Actions
  completeActivity: (type: 'topishmoq' | 'masala' | 'kunlik', itemId: string, earnedPoints: number) => void;
  completedItemIds: string[];

  // Global Kitchen Timer (iOS Dynamic Island Style)
  timerSeconds: number;
  initialTimerSeconds: number;
  isTimerRunning: boolean;
  startGlobalTimer: (minutes: number) => void;
  pauseGlobalTimer: () => void;
  resumeGlobalTimer: () => void;
  stopGlobalTimer: () => void;
  setCustomTimer: (seconds: number) => void;

  // Modals & Item detail triggers
  selectedRecipeModal: Recipe | null;
  setSelectedRecipeModal: (r: Recipe | null) => void;
  openRecipeModal: (r: Recipe) => void;

  selectedTaleModal: Tale | null;
  setSelectedTaleModal: (t: Tale | null) => void;
  openTaleModal: (t: Tale) => void;

  selectedLifehackId: string | null;
  setSelectedLifehackId: (id: string | null) => void;
  openLifehackModal: (lh: Lifehack) => void;

  // Modals state
  rewardDetails: RewardDetails | null;
  setRewardDetails: (d: RewardDetails | null) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (v: boolean) => void;
  selectedAgeFilter: string;
  setSelectedAgeFilter: (age: string) => void;
}

const defaultUser: User = {
  id: 'usr_user_1',
  telegram_id: 8492049,
  username: 'user',
  ism: 'Foydalanuvchi',
  til_skripti: 'lotin',
  bolalar: [
    { id: 'c1', ism: 'Azizbek', yosh: 5 },
    { id: 'c2', ism: 'Madina', yosh: 8 }
  ],
  trial_ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  is_premium: false,
  premium_until: null,
  created_at: new Date().toISOString()
};

const defaultProgress: UserProgress = {
  user_id: 'usr_mother_1',
  jami_ball: 125,
  joriy_streak: 7,
  eng_uzun_streak: 12,
  oxirgi_faollik_sanasi: new Date().toISOString().split('T')[0]
};

const defaultRoutineTasks: RoutineTask[] = [
  { id: 'task_1', sarlavha: "Ertalabki badan tarbiya mashqi", vaqt: "08:00", kategoriya: 'bola', ball: 10, bajarildi: false, icon: '🏃‍♂️' },
  { id: 'task_2', sarlavha: "Farzandga 15 daqiqa ertak o'qish", vaqt: "13:00", kategoriya: 'ona', ball: 15, bajarildi: false, icon: '📖' },
  { id: 'task_3', sarlavha: "Vitaminga boy tushlik pishirish", vaqt: "14:00", kategoriya: 'ona', ball: 15, bajarildi: false, icon: '🥗' },
  { id: 'task_4', sarlavha: "O'yinchoqlarni tartib bilan yig'ish", vaqt: "18:00", kategoriya: 'bola', ball: 10, bajarildi: false, icon: '🧸' },
  { id: 'task_5', sarlavha: "Mantiqiy topishmoq o'yini", vaqt: "19:30", kategoriya: 'bola', ball: 20, bajarildi: false, icon: '🧩' },
];

const defaultBadges: Badge[] = [
  { id: 'b_pazanda', nomi: 'Oltin Pazanda', tavsif: "Pazanda AI va retseptlardan 5 marta foydalandingiz", icon: '👩‍🍳', ochilgan: true, talab: "5 ta retsept" },
  { id: 'b_ertak', nomi: 'Ertakchi Ona', tavsif: "Farzandingizga 3 ta sehrli ertak o'qib berdingiz", icon: '📚', ochilgan: true, talab: "3 ta ertak" },
  { id: 'b_streak', nomi: 'Muntazam Ona', tavsif: "7 kun ketma-ket ilovadan unumli foydalandingiz", icon: '🔥', ochilgan: true, talab: "7 kunlik streak" },
  { id: 'b_zukko', nomi: 'Zukko Bolajon', tavsif: "Topishmoqlar va masalalardan 100 ball to'pladingiz", icon: '⭐', ochilgan: true, talab: "100 ball" },
  { id: 'b_premium', nomi: 'Mukammal Oila', tavsif: "Premium obuna va barcha maxsus imkoniyatlarni ochdingiz", icon: '👑', ochilgan: false, talab: "Premium status" }
];

const defaultShoppingList: ShoppingItem[] = [
  { id: 'shop_1', nomi: 'Sabzi (Sariq va Qizil)', miqdori: '2 kg', bajarildi: false },
  { id: 'shop_2', nomi: "Qo'y go'shti (Qovurg'a)", miqdori: '1 kg', bajarildi: false },
  { id: 'shop_3', nomi: 'Lazer Guruch', miqdori: '1 kg', bajarildi: true },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage initialization helper
  const loadStorage = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(`odobli_${key}`);
      if (!saved || saved === 'undefined' || saved === 'null') return fallback;
      const parsed = JSON.parse(saved);
      return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const [user, setUser] = useState<User>(() => {
    const saved = loadStorage<User>('user', defaultUser);
    const initial = saved && typeof saved === 'object' ? { ...defaultUser, ...saved } : defaultUser;
    if (!initial.ism || initial.ism === 'Ona Mehribon') {
      initial.ism = 'Foydalanuvchi';
    }
    if (!initial.username || initial.username === 'onamehribon') {
      initial.username = 'user';
    }
    return initial;
  });
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = loadStorage<UserProgress>('progress', defaultProgress);
    return saved && typeof saved === 'object' ? { ...defaultProgress, ...saved } : defaultProgress;
  });
  const [script, setScriptState] = useState<ScriptType>(() => loadStorage('script', 'lotin'));
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('Barchasi');

  // Datasets safely initialized with Array.isArray checks and auto-merging of new system items
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const saved = loadStorage<Ingredient[]>('ingredients', initialIngredients);
    if (!Array.isArray(saved) || saved.length === 0) return initialIngredients;
    const savedIds = new Set(saved.map(i => i.id));
    const missing = initialIngredients.filter(i => !savedIds.has(i.id));
    return missing.length > 0 ? [...saved, ...missing] : saved;
  });
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = loadStorage<Recipe[]>('recipes', initialRecipes);
    if (!Array.isArray(saved) || saved.length === 0) return initialRecipes;
    const savedIds = new Set(saved.map(r => r.id));
    const missing = initialRecipes.filter(r => !savedIds.has(r.id));
    return missing.length > 0 ? [...saved, ...missing] : saved;
  });
  const [tales, setTales] = useState<Tale[]>(() => {
    const saved = loadStorage<Tale[]>('tales', initialTales);
    return Array.isArray(saved) && saved.length > 0 ? saved : initialTales;
  });
  const [lifehacks, setLifehacks] = useState<Lifehack[]>(() => {
    const saved = loadStorage<Lifehack[]>('lifehacks', initialLifehacks);
    return Array.isArray(saved) && saved.length > 0 ? saved : initialLifehacks;
  });
  const [riddles, setRiddles] = useState<Riddle[]>(() => {
    const saved = loadStorage<Riddle[]>('riddles', initialRiddles);
    return Array.isArray(saved) && saved.length > 0 ? saved : initialRiddles;
  });
  const [mathProblems] = useState<MathProblem[]>(initialMathProblems);
  const [paymentProofs, setPaymentProofs] = useState<PaymentProof[]>(() => {
    const saved = loadStorage<PaymentProof[]>('payments', []);
    return Array.isArray(saved) ? saved : [];
  });
  const [completedItemIds, setCompletedItemIds] = useState<string[]>(() => {
    const saved = loadStorage<string[]>('completed_items', []);
    return Array.isArray(saved) ? saved : [];
  });
  const [routineTasks, setRoutineTasks] = useState<RoutineTask[]>(() => {
    const saved = loadStorage<RoutineTask[]>('routine_tasks', defaultRoutineTasks);
    return Array.isArray(saved) ? saved : defaultRoutineTasks;
  });
  const [badges] = useState<Badge[]>(() => {
    const saved = loadStorage<Badge[]>('badges', defaultBadges);
    return Array.isArray(saved) ? saved : defaultBadges;
  });
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = loadStorage<ShoppingItem[]>('shopping_list', defaultShoppingList);
    return Array.isArray(saved) ? saved : defaultShoppingList;
  });
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>(() => {
    const saved = loadStorage<string[]>('favorite_recipes', ['rec_01_toshkent_palov']);
    return Array.isArray(saved) ? saved : ['rec_01_toshkent_palov'];
  });

  const toggleFavoriteRecipe = (id: string) => {
    setFavoriteRecipeIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Modals & Item detail triggers
  const [selectedRecipeModal, setSelectedRecipeModal] = useState<Recipe | null>(null);
  const [selectedTaleModal, setSelectedTaleModal] = useState<Tale | null>(null);
  const [selectedLifehackId, setSelectedLifehackId] = useState<string | null>(null);

  const openRecipeModal = (r: Recipe) => {
    setSelectedRecipeModal(r);
    setActiveTab('pazanda');
  };

  const openTaleModal = (t: Tale) => {
    setSelectedTaleModal(t);
    setActiveTab('bolajon');
  };

  const openLifehackModal = (lh: Lifehack) => {
    setSelectedLifehackId(lh.id);
    setActiveTab('lifehacklar');
  };

  // Global Kitchen Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [initialTimerSeconds, setInitialTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const playTimerSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      try {
        playTimerSound();
      } catch (e) {
        console.error("Timer sound error:", e);
      }
      if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
        try {
          const tg = (window as any).Telegram.WebApp;
          if (tg.HapticFeedback && typeof tg.HapticFeedback.notificationOccurred === 'function') {
            tg.HapticFeedback.notificationOccurred('success');
          }
          if (typeof tg.showAlert === 'function') {
            tg.showAlert("⏰ Taymer vaqti tugadi! Taom tayyor!");
          }
        } catch (e) {
          console.error("Telegram alert error:", e);
        }
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const startGlobalTimer = (minutes: number) => {
    const parsedMins = typeof minutes === 'number' ? minutes : parseFloat(String(minutes));
    const secs = Math.max(1, Math.round((isNaN(parsedMins) ? 15 : parsedMins) * 60));
    setInitialTimerSeconds(secs);
    setTimerSeconds(secs);
    setIsTimerRunning(true);
  };

  const pauseGlobalTimer = () => {
    setIsTimerRunning(false);
  };

  const resumeGlobalTimer = () => {
    if (timerSeconds > 0) setIsTimerRunning(true);
  };

  const stopGlobalTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const setCustomTimer = (seconds: number) => {
    const secs = Math.max(1, Math.round(Number(seconds) || 60));
    setInitialTimerSeconds(secs);
    setTimerSeconds(secs);
    setIsTimerRunning(true);
  };

  // Modals
  const [rewardDetails, setRewardDetails] = useState<RewardDetails | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('odobli_routine_tasks', JSON.stringify(routineTasks));
  }, [routineTasks]);

  useEffect(() => {
    localStorage.setItem('odobli_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('odobli_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('odobli_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('odobli_script', JSON.stringify(script));
  }, [script]);

  useEffect(() => {
    localStorage.setItem('odobli_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('odobli_tales', JSON.stringify(tales));
  }, [tales]);

  useEffect(() => {
    localStorage.setItem('odobli_lifehacks', JSON.stringify(lifehacks));
  }, [lifehacks]);

  useEffect(() => {
    localStorage.setItem('odobli_payments', JSON.stringify(paymentProofs));
  }, [paymentProofs]);

  useEffect(() => {
    localStorage.setItem('odobli_completed_items', JSON.stringify(completedItemIds));
  }, [completedItemIds]);

  useEffect(() => {
    localStorage.setItem('odobli_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('odobli_favorite_recipes', JSON.stringify(favoriteRecipeIds));
  }, [favoriteRecipeIds]);

  // Auto-sync user info from Telegram WebApp automatically
  const extractTelegramUser = (): { id?: number; first_name?: string; last_name?: string; username?: string; fullName?: string } | null => {
    if (typeof window === 'undefined') return null;

    // 1. Direct Telegram WebApp Object
    try {
      const tg = (window as any).Telegram?.WebApp;
      if (tg?.initDataUnsafe?.user) {
        const u = tg.initDataUnsafe.user;
        const fn = u.first_name || '';
        const ln = u.last_name || '';
        const fullName = [fn, ln].filter(Boolean).join(' ').trim() || u.username || '';
        if (fullName) return { ...u, fullName };
      }
    } catch (e) {}

    // 2. tg.initData string
    try {
      const tg = (window as any).Telegram?.WebApp;
      if (tg?.initData) {
        const decoded = decodeURIComponent(tg.initData);
        const userMatch = decoded.match(/user=({.*?})/);
        if (userMatch && userMatch[1]) {
          const u = JSON.parse(userMatch[1]);
          const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ').trim() || u.username || '';
          if (fullName) return { ...u, fullName };
        }
      }
    } catch (e) {}

    // 3. Deep decode URL hash / search
    try {
      const href = window.location.href;
      const decodedOnce = decodeURIComponent(href);
      const decodedTwice = decodeURIComponent(decodedOnce);

      const userMatch = decodedTwice.match(/user=({.*?})/);
      if (userMatch && userMatch[1]) {
        const u = JSON.parse(userMatch[1]);
        const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ').trim() || u.username || '';
        if (fullName) return { ...u, fullName };
      }
    } catch (e) {}

    return null;
  };

  const syncTelegramUser = () => {
    const tgUser = extractTelegramUser();
    if (tgUser && tgUser.fullName) {
      setUser(prev => {
        const newName = tgUser.fullName!;
        const newUsername = tgUser.username || prev.username || 'user';
        const newId = tgUser.id || prev.telegram_id;

        if (prev.ism === newName && prev.username === newUsername && prev.telegram_id === newId) {
          return prev;
        }

        const updated = {
          ...prev,
          telegram_id: newId,
          username: newUsername,
          ism: newName
        };

        try {
          localStorage.setItem('odobli_user', JSON.stringify(updated));
        } catch (e) {}

        return updated;
      });
    }
  };

  useEffect(() => {
    syncTelegramUser();
    const timers = [50, 150, 300, 700, 1500, 3000].map(ms => setTimeout(syncTelegramUser, ms));
    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  const updateUserName = (newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setUser(prev => {
      const updated = { ...prev, ism: trimmed };
      try {
        localStorage.setItem('odobli_user', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const setScript = (s: ScriptType) => {
    setScriptState(s);
    setUser(prev => ({ ...prev, til_skripti: s }));
  };

  const t = (text: string) => {
    return translateText(text, script);
  };

  // Add Child
  const addChild = (ism: string, yosh: number) => {
    const newChild: Child = { id: `child_${Date.now()}`, ism, yosh };
    setUser(prev => ({
      ...prev,
      bolalar: [...prev.bolalar, newChild]
    }));
  };

  const removeChild = (id: string) => {
    setUser(prev => ({
      ...prev,
      bolalar: prev.bolalar.filter(c => c.id !== id)
    }));
  };

  // Shopping List Actions
  const addToShoppingList = (nomi: string, miqdori?: string) => {
    if (!nomi.trim()) return;
    const newItem: ShoppingItem = {
      id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      nomi: nomi.trim(),
      miqdori: miqdori?.trim(),
      bajarildi: false
    };
    setShoppingList(prev => [newItem, ...prev]);
  };

  const addMultipleToShoppingList = (items: { nomi: string; miqdori?: string }[]) => {
    const newItems: ShoppingItem[] = items.map(item => ({
      id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      nomi: item.nomi.trim(),
      miqdori: item.miqdori?.trim(),
      bajarildi: false
    }));
    setShoppingList(prev => [...newItems, ...prev]);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList(prev =>
      prev.map(item => (item.id === id ? { ...item, bajarildi: !item.bajarildi } : item))
    );
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  // Gamification Completion
  const completeActivity = (_type: string, itemId: string, earnedPoints: number) => {
    if (completedItemIds.includes(itemId)) {
      setRewardDetails({
        title: "Taqdirlandiz! 🎉",
        points: 0,
        streak: progress.joriy_streak,
        message: "Bu topshiriqni bugun bajargansiz!"
      });
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const lastActiveDate = progress.oxirgi_faollik_sanasi;
    let newStreak = progress.joriy_streak;

    if (lastActiveDate !== todayStr) {
      newStreak += 1;
    }

    const newPoints = progress.jami_ball + earnedPoints;
    const newProgress: UserProgress = {
      ...progress,
      jami_ball: newPoints,
      joriy_streak: newStreak,
      eng_uzun_streak: Math.max(newStreak, progress.eng_uzun_streak),
      oxirgi_faollik_sanasi: todayStr
    };

    setProgress(newProgress);
    setCompletedItemIds(prev => [...prev, itemId]);

    setRewardDetails({
      title: "Ajoyib! 🏆",
      points: earnedPoints,
      streak: newStreak,
      message: "Barakalla! Bilimingiz va faolligingiz oshib bormoqda."
    });
  };

  // Admin recipe CRUD
  const addRecipe = (recipe: Recipe) => {
    setRecipes(prev => [recipe, ...prev]);
  };

  const updateRecipe = (recipe: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === recipe.id ? recipe : r));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  const toggleRecipeStatus = (id: string) => {
    setRecipes(prev =>
      prev.map(r => (r.id === id ? { ...r, holat: r.holat === 'nashr' ? 'qoralama' : 'nashr' } : r))
    );
  };

  // Admin tale CRUD
  const addTale = (tale: Tale) => {
    setTales(prev => [tale, ...prev]);
  };

  const updateTale = (tale: Tale) => {
    setTales(prev => prev.map(t => t.id === tale.id ? tale : t));
  };

  const deleteTale = (id: string) => {
    setTales(prev => prev.filter(t => t.id !== id));
  };

  const toggleTaleStatus = (id: string) => {
    setTales(prev =>
      prev.map(t => (t.id === id ? { ...t, holat: t.holat === 'nashr' ? 'qoralama' : 'nashr' } : t))
    );
  };

  // Admin lifehack CRUD
  const addLifehack = (lh: Lifehack) => {
    setLifehacks(prev => [lh, ...prev]);
  };

  const deleteLifehack = (id: string) => {
    setLifehacks(prev => prev.filter(lh => lh.id !== id));
  };

  const toggleLifehackStatus = (id: string) => {
    setLifehacks(prev =>
      prev.map(lh => (lh.id === id ? { ...lh, holat: lh.holat === 'nashr' ? 'qoralama' : 'nashr' } : lh))
    );
  };

  // Admin riddle CRUD
  const addRiddle = (riddle: Riddle) => {
    setRiddles(prev => [riddle, ...prev]);
  };

  const deleteRiddle = (id: string) => {
    setRiddles(prev => prev.filter(r => r.id !== id));
  };

  // Admin ingredient
  const addIngredient = (ing: Ingredient) => {
    setIngredients(prev => [ing, ...prev]);
  };

  // Admin user & backup tools
  const grantUserPremium = (durationDays: number) => {
    setUser(prev => ({
      ...prev,
      is_premium: true,
      premium_until: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString()
    }));
  };

  const exportBackupData = () => {
    const backup = {
      user,
      progress,
      recipes,
      tales,
      lifehacks,
      riddles,
      ingredients,
      paymentProofs,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `odobli_ai_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Payment flow
  const submitPaymentProof = (summa: number, screenshot: string) => {
    const proof: PaymentProof = {
      id: `pay_${Date.now()}`,
      user_id: user.id,
      summa,
      screenshot_file_id: `file_tg_${Date.now()}`,
      screenshot_preview_url: screenshot,
      holat: 'kutilmoqda',
      created_at: new Date().toISOString()
    };
    setPaymentProofs(prev => [proof, ...prev]);
  };

  const verifyPaymentProof = (id: string, status: 'tasdiqlangan' | 'rad_etilgan') => {
    setPaymentProofs(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            holat: status,
            tasdiqlangan_at: new Date().toISOString()
          };
        }
        return p;
      })
    );

    if (status === 'tasdiqlangan') {
      setUser(prev => ({
        ...prev,
        is_premium: true,
        premium_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }));
    }
  };

  const toggleRoutineTask = (taskId: string) => {
    let taskPoints = 0;
    let newlyCompleted = false;

    setRoutineTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          newlyCompleted = !task.bajarildi;
          taskPoints = task.ball;
          return { ...task, bajarildi: newlyCompleted };
        }
        return task;
      })
    );

    if (newlyCompleted) {
      completeActivity('kunlik', taskId, taskPoints);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        progress,
        script,
        setScript,
        activeTab,
        setActiveTab,
        t,
        ingredients,
        recipes,
        tales,
        lifehacks,
        riddles,
        mathProblems,
        paymentProofs,
        routineTasks,
        badges,
        shoppingList,
        favoriteRecipeIds,
        toggleFavoriteRecipe,
        toggleRoutineTask,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleRecipeStatus,
        addTale,
        updateTale,
        deleteTale,
        toggleTaleStatus,
        addLifehack,
        deleteLifehack,
        toggleLifehackStatus,
        addRiddle,
        deleteRiddle,
        addIngredient,
        grantUserPremium,
        exportBackupData,
        addToShoppingList,
        addMultipleToShoppingList,
        toggleShoppingItem,
        removeShoppingItem,
        clearShoppingList,
        submitPaymentProof,
        verifyPaymentProof,
        updateUserName,
        addChild,
        removeChild,
        completeActivity,
        completedItemIds,
        rewardDetails,
        setRewardDetails,
        showPaymentModal,
        setShowPaymentModal,
        selectedAgeFilter,
        setSelectedAgeFilter,
        selectedRecipeModal,
        setSelectedRecipeModal,
        openRecipeModal,
        selectedTaleModal,
        setSelectedTaleModal,
        openTaleModal,
        selectedLifehackId,
        setSelectedLifehackId,
        openLifehackModal,
        timerSeconds,
        initialTimerSeconds,
        isTimerRunning,
        startGlobalTimer,
        pauseGlobalTimer,
        resumeGlobalTimer,
        stopGlobalTimer,
        setCustomTimer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
