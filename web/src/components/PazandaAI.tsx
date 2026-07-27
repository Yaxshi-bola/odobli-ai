import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Recipe, IngredientCategory } from '../types';
import {
  Sparkles,
  Check,
  Clock,
  ChefHat,
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Search,
  Book,
  Utensils,
  ShoppingCart,
  PlusCircle,
  CheckCircle2,
  Trash2,
  Share2,
  Heart,
  Timer as TimerIcon,
  Play,
  Pause,
  RotateCcw,
  Users,
  Flame,
  Copy,
  Plus,
  Square,
  ChevronDown,
  X
} from 'lucide-react';

export const PazandaAI: React.FC = () => {
  const {
    ingredients,
    recipes,
    t,
    shoppingList,
    addToShoppingList,
    addMultipleToShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearShoppingList,
    favoriteRecipeIds,
    toggleFavoriteRecipe,
    timerSeconds,
    initialTimerSeconds,
    isTimerRunning,
    startGlobalTimer,
    pauseGlobalTimer,
    resumeGlobalTimer,
    stopGlobalTimer,
    setCustomTimer,
    selectedRecipeModal,
    setSelectedRecipeModal
  } = useApp();

  useEffect(() => {
    if (selectedRecipeModal) {
      setActiveRecipe(selectedRecipeModal);
      setSelectedRecipeModal(null);
    }
  }, [selectedRecipeModal]);

  const [customMinutesInput, setCustomMinutesInput] = useState<string>('20');

  // Tab mode: 'match' | 'catalog' | 'bozorlik' | 'timer'
  const [viewMode, setViewMode] = useState<'match' | 'catalog' | 'bozorlik' | 'timer'>('match');

  // Search queries
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [ingredientSearch, setIngredientSearch] = useState<string>('');

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toggleFavoriteRecipe(id);
    const isFav = favoriteRecipeIds.includes(id);
    showToast(isFav ? "Sevimli retseptlardan olib tashlandi" : "Sevimli retseptlarga saqlandi! ❤️");
  };

  // Selected ingredient IDs for match mode
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([
    'ing_kartoshka', 'ing_piyoz', 'ing_sabzi', 'ing_pomidor', 'ing_tovuq', 'ing_guruch', 'ing_qoy', 'ing_un'
  ]);

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<IngredientCategory | 'barchasi'>('barchasi');

  // Active Recipe modal
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  // Portion scaler for recipe modal: 2, 4 (default), 6, 8, 12
  const [portions, setPortions] = useState<number>(4);

  // Checked ingredients inside recipe detail modal for custom shopping list export
  const [selectedRecipeIngredients, setSelectedRecipeIngredients] = useState<string[]>([]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [selectedShopCategory, setSelectedShopCategory] = useState<string>('barchasi');

  const getShoppingItemCategory = (nomi: string): string => {
    const name = nomi.toLowerCase();
    if (
      name.includes('kartoshka') || name.includes('sabzi') || name.includes('piyoz') || 
      name.includes('pomidor') || name.includes('bodring') || name.includes('karam') || 
      name.includes('sarimsoq') || name.includes('ko\'kat') || name.includes('kashnich') || 
      name.includes('shivit') || name.includes('baqlajon') || name.includes('bulg\'or') || 
      name.includes('sholgom') || name.includes('qovoq') || name.includes('ismaloq') || 
      name.includes('rayhon') || name.includes('yalpiz') || name.includes('zanjabil') || 
      name.includes('qo\'ziqorin') || name.includes('qabachki') || name.includes('lavlagi') || 
      name.includes('rediska') || name.includes('rukola') || name.includes('zaytun') || name.includes('oliva')
    ) {
      return 'sabzavot';
    }
    if (
      name.includes('go\'sht') || name.includes('tovuq') || name.includes('qoy') || 
      name.includes('qo\'y') || name.includes('mol') || name.includes('qiyma') || 
      name.includes('lahm') || name.includes('kalla') || name.includes('suyak') || 
      name.includes('o\'rdak') || name.includes('ordak') || name.includes('g\'oz') || 
      name.includes('goz') || name.includes('kurka') || name.includes('bedana') || 
      name.includes('quyon') || name.includes('ot go\'shti') || name.includes('qazi') || 
      name.includes('jigar') || name.includes('til') || name.includes('baliq') || name.includes('krevetka')
    ) {
      return 'gosht';
    }
    if (
      name.includes('sut') || name.includes('qatiq') || name.includes('qaymoq') || 
      name.includes('pishloq') || name.includes('sariyog') || name.includes('suzma') || 
      name.includes('tvorog') || name.includes('slivki') || name.includes('chakka') || 
      name.includes('ayron') || name.includes('brinza') || name.includes('qurut') || name.includes('tuxum')
    ) {
      return 'sut_mahsuloti';
    }
    if (
      name.includes('guruch') || name.includes('mosh') || name.includes('noxot') || 
      name.includes('no\'xat') || name.includes('loviya') || name.includes('un') || 
      name.includes('makaron') || name.includes('grechka') || name.includes('manniy') || 
      name.includes('ugra') || name.includes('lag\'mon') || name.includes('lagmon') || 
      name.includes('noodle') || name.includes('somsa') || name.includes('manti') || 
      name.includes('yasmiq') || name.includes('bulgur') || name.includes('kuskus') || name.includes('gerkules')
    ) {
      return 'dukkakli';
    }
    if (
      name.includes('zira') || name.includes('murch') || name.includes('tuz') || 
      name.includes('shakar') || name.includes('ziravor') || name.includes('lavr') || 
      name.includes('kunjut') || name.includes('paprika') || name.includes('zirk') || 
      name.includes('mayiz') || name.includes('dolchin') || name.includes('zafron') || 
      name.includes('yongoq') || name.includes('bodom') || name.includes('pista') || name.includes('turshak')
    ) {
      return 'ziravor';
    }
    return 'boshqa';
  };

  const filteredShoppingList = useMemo(() => {
    if (selectedShopCategory === 'barchasi') return shoppingList;
    return shoppingList.filter(item => getShoppingItemCategory(item.nomi) === selectedShopCategory);
  }, [shoppingList, selectedShopCategory]);

  // Toggle ingredient selection
  const toggleIngredient = (id: string) => {
    setSelectedIngredientIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtered ingredients
  const filteredIngredients = useMemo(() => {
    let list = ingredients;
    if (selectedCategory !== 'barchasi') {
      list = list.filter(i => i.kategoriya === selectedCategory);
    }
    if (ingredientSearch.trim()) {
      const q = ingredientSearch.toLowerCase().trim();
      list = list.filter(i => i.nomi.toLowerCase().includes(q));
    }
    return list;
  }, [ingredients, selectedCategory, ingredientSearch]);

  // Matchmaking Algorithm
  const matchingResults = useMemo(() => {
    const publishedRecipes = recipes.filter(r => r.holat === 'nashr');
    
    const fullMatch: { recipe: Recipe; missingNames: string[] }[] = [];
    const missingOne: { recipe: Recipe; missingNames: string[] }[] = [];

    publishedRecipes.forEach(recipe => {
      const required = recipe.required_ingredient_ids || [];
      const missingIds = required.filter(id => !selectedIngredientIds.includes(id));
      
      const missingNames = missingIds.map(id => {
        const found = ingredients.find(ing => ing.id === id);
        return found ? found.nomi : id;
      });

      if (missingIds.length === 0) {
        fullMatch.push({ recipe, missingNames: [] });
      } else if (missingIds.length === 1) {
        missingOne.push({ recipe, missingNames });
      }
    });

    return { fullMatch, missingOne };
  }, [recipes, selectedIngredientIds, ingredients]);

  // Catalog Recipes
  const catalogRecipes = useMemo(() => {
    const published = recipes.filter(r => r.holat === 'nashr');
    if (!searchQuery.trim()) return published;

    const q = searchQuery.toLowerCase().trim();
    return published.filter(r =>
      r.nomi.toLowerCase().includes(q) ||
      r.tarif_matni.toLowerCase().includes(q) ||
      r.masalliqlar_matni.toLowerCase().includes(q)
    );
  }, [recipes, searchQuery]);

  // Parsed ingredient items for active recipe modal
  const recipeIngredientItems = useMemo(() => {
    if (!activeRecipe) return [];
    // Split masalliqlar_matni by comma or newline
    const items = activeRecipe.masalliqlar_matni
      .split(/,|\n/)
      .map(str => str.trim())
      .filter(Boolean);
    return items;
  }, [activeRecipe]);

  // Initialize selected recipe ingredients when active recipe changes
  useEffect(() => {
    if (activeRecipe) {
      const items = activeRecipe.masalliqlar_matni
        .split(/,|\n/)
        .map(str => str.trim())
        .filter(Boolean);
      setSelectedRecipeIngredients(items);
      setPortions(4);
    }
  }, [activeRecipe]);

  // Helper to scale portion quantities in string (e.g., "1 kg" -> "2 kg", "500 g" -> "1000 g")
  const scaleIngredientString = (ingStr: string, basePortions: number, targetPortions: number) => {
    const factor = targetPortions / basePortions;
    if (factor === 1) return ingStr;

    return ingStr.replace(/(\d+(?:[.,]\d+)?)/g, (match) => {
      const num = parseFloat(match.replace(',', '.'));
      if (isNaN(num)) return match;
      const scaled = Math.round(num * factor * 10) / 10;
      return scaled.toString();
    });
  };

  // Track saved recipes state to prevent double/triple clicks
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);

  // State for automatic dish ingredient generator in Bozorlik tab
  const [selectedDishRecipeId, setSelectedDishRecipeId] = useState<string>('');
  const [dishPortions, setDishPortions] = useState<number>(4);
  const [showDishSelectModal, setShowDishSelectModal] = useState<boolean>(false);
  const [dishSearch, setDishSearch] = useState<string>('');

  // Add parsed ingredients to shopping list
  const addRecipeIngredientsToShoppingList = (itemsToAdd: string[]) => {
    if (!activeRecipe || itemsToAdd.length === 0) return;
    
    // Check if already saved
    if (savedRecipeIds.includes(activeRecipe.id)) {
      showToast(`✅ ${t(activeRecipe.nomi)} masalliqlari allaqachon saqlangan!`);
      return;
    }

    const formatted = itemsToAdd.map(item => {
      const scaled = scaleIngredientString(item, 4, portions);
      return {
        nomi: scaled,
        miqdori: `${t(activeRecipe.nomi)} (${portions} kishilik)`
      };
    });

    addMultipleToShoppingList(formatted);
    setSavedRecipeIds(prev => [...prev, activeRecipe.id]);
    showToast(`🛒 ${itemsToAdd.length} ta masalliq Bozorlik ro'yxatiga saqlandi!`);
  };

  // Add ingredients by dish selection in Bozorlik tab
  const handleAddDishToShoppingList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDishRecipeId) return;

    const targetRecipe = recipes.find(r => r.id === selectedDishRecipeId);
    if (!targetRecipe) return;

    const items = targetRecipe.masalliqlar_matni
      .split(/,|\n/)
      .map(str => str.trim())
      .filter(Boolean);

    const formatted = items.map(item => {
      const scaled = scaleIngredientString(item, 4, dishPortions);
      return {
        nomi: scaled,
        miqdori: `${t(targetRecipe.nomi)} (${dishPortions} kishilik)`
      };
    });

    addMultipleToShoppingList(formatted);
    setSelectedDishRecipeId('');
    showToast(`✅ ${t(targetRecipe.nomi)} uchun ${items.length} ta masalliq avtomatik qo'shildi!`);
  };

  // Copy recipe details for Telegram
  const copyRecipeForTelegram = () => {
    if (!activeRecipe) return;
    const text = `🍲 *${t(activeRecipe.nomi)}* (${portions} kishilik)\n\n` +
      `⏱ Tayyorlash vaqti: ${activeRecipe.tayyorlash_vaqti_daq} daqiqa\n` +
      `📊 Qiyinlik: ${t(activeRecipe.qiyinlik)}\n\n` +
      `🛒 *Kerakli masalliqlar:*\n` +
      recipeIngredientItems.map(item => `• ${scaleIngredientString(item, 4, portions)}`).join('\n') +
      `\n\n📖 *Tayyorlanishi:*\n` +
      activeRecipe.korsatmalari.map((k, i) => `${i + 1}. ${t(k)}`).join('\n') +
      `\n\n✨ _Odobli.ai Pazanda AI orqali tayyorlandi_`;

    navigator.clipboard.writeText(text);
    showToast("📋 Retsept va bozorlik ro'yxati nusxalandi! Telegramga joylashingiz mumkin.");
  };

  // Shopping List state in bozorlik tab
  const [newShopName, setNewShopName] = useState('');
  const [newShopQty, setNewShopQty] = useState('');

  const handleAddCustomShopItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShopName.trim()) return;
    addToShoppingList(newShopName, newShopQty);
    setNewShopName('');
    setNewShopQty('');
    showToast("✅ Bozorlik ro'yxatiga qo'shildi!");
  };

  const categoryLabels: { id: IngredientCategory | 'barchasi'; label: string }[] = [
    { id: 'barchasi', label: 'Barchasi' },
    { id: 'sabzavot', label: 'Sabzavot' },
    { id: 'gosht', label: "Go'sht" },
    { id: 'sut_mahsuloti', label: 'Sut' },
    { id: 'dukkakli', label: 'Dukkakli' },
    { id: 'ziravor', label: 'Ziravor' },
    { id: 'boshqa', label: 'Boshqa' },
  ];

  const pendingCount = shoppingList.filter(s => !s.bajarildi).length;

  return (
    <div className="space-y-5 pb-28 pt-1">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A26] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{t(toastMessage)}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="card-burgundy-banner p-4 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <div className="inline-flex items-center gap-1 bg-white/20 text-[#F59E0B] text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            {t("O'zbek Milliy Taomlar Bazi")}
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">
            {t("Pazanda AI Retseptlar")}
          </h2>
          <p className="text-[11px] text-white/90 mt-0.5 max-w-[240px] leading-snug">
            {t("Bor masalliqlardan taom toping, bozorlik ro'yxatini shakllantiring va taymerdan foydalaning")}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-xs">
          🍳
        </div>
      </div>

      {/* Main Navigation Modes (4 Tabs) */}
      <div className="card-premium p-1 rounded-2xl grid grid-cols-4 gap-1 bg-white dark:bg-[#1E1E1E]">
        <button
          onClick={() => setViewMode('match')}
          className={`py-2 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 min-h-[44px] ${
            viewMode === 'match'
              ? 'bg-[#5A1827] text-white shadow-xs'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span className="truncate">{t("Masalliqlardan")}</span>
        </button>

        <button
          onClick={() => setViewMode('catalog')}
          className={`py-2 rounded-xl text-[11px] font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 min-h-[46px] ${
            viewMode === 'catalog'
              ? 'bg-[#5A1827] text-white shadow-xs'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Book className="w-4 h-4" />
          <span className="truncate">{t("Retseptlar")} ({recipes.length})</span>
        </button>

        <button
          onClick={() => setViewMode('bozorlik')}
          className={`py-2 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 min-h-[44px] relative ${
            viewMode === 'bozorlik'
              ? 'bg-[#5A1827] text-white shadow-xs'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            {pendingCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#F59E0B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </div>
          <span className="truncate">{t("Bozorlik")}</span>
        </button>

        <button
          onClick={() => setViewMode('timer')}
          className={`py-2 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5 min-h-[44px] ${
            viewMode === 'timer'
              ? 'bg-[#5A1827] text-white shadow-xs'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <TimerIcon className="w-4 h-4" />
          <span>{t("Taymer")}</span>
        </button>
      </div>

      {/* MODE 1: INGREDIENT MATCHMAKING */}
      {viewMode === 'match' && (
        <div className="space-y-4">

          {/* Search ingredients bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={ingredientSearch}
              onChange={e => setIngredientSearch(e.target.value)}
              placeholder={t("Masalliq nomini qidirish (kartoshka, tovuq, zira...)...")}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#EFE8DC] text-xs focus:outline-none focus:border-[#FF6B4A] shadow-2xs"
            />
          </div>

          {/* Ingredient Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categoryLabels.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D2A26] text-white shadow-xs'
                    : 'bg-white text-[#6B6359] border border-[#EFE8DC] hover:bg-[#F9F5EE]'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>

          {/* Ingredient Selection Chips Grid */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <p className="text-xs font-extrabold text-[#4A443C]">
                {t("Uydagi masalliqlar")}: <span className="text-[#FF6B4A]">{selectedIngredientIds.length} {t("ta tanlandi")}</span>
              </p>
              {selectedIngredientIds.length > 0 && (
                <button
                  onClick={() => setSelectedIngredientIds([])}
                  className="text-xs text-orange-600 font-bold hover:underline"
                >
                  {t("Tozalash")}
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {filteredIngredients.map(ing => {
                const isSelected = selectedIngredientIds.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.id)}
                    className={`p-2.5 rounded-2xl border transition-all text-left flex flex-col items-center justify-center text-center relative min-h-[70px] ${
                      isSelected
                        ? 'bg-[#FFF0EC] border-[#FF6B4A] text-[#2D2A26] font-extrabold shadow-2xs scale-98'
                        : 'bg-white border-[#EFE8DC] text-[#6B6359] hover:border-[#DCD4C7]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FF6B4A] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                    <span className="text-2xl mb-1">{ing.icon || '🥦'}</span>
                    <span className="text-[11px] leading-tight line-clamp-1">{t(ing.nomi)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipe Match Results View */}
          <div id="recipe-results" className="space-y-5 pt-2">
            
            {/* Group 1: To'liq mos retseptlar */}
            <div>
              <h3 className="font-bold text-[#0B4F2C] text-sm mb-2.5 flex items-center gap-2 tracking-tight">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                {t("To'liq mos keladigan taomlar")} ({matchingResults.fullMatch.length})
              </h3>

              {matchingResults.fullMatch.length === 0 ? (
                <div className="bg-white p-4 rounded-2xl border border-dashed border-[#EFEBE0] text-center text-xs text-[#7C8D82]">
                  {t("Hozircha tanlangan masalliqlarga 100% mos retsept topilmadi. Yana bir nechta masalliq belgilang.")}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {matchingResults.fullMatch.map(({ recipe }) => (
                    <div
                      key={recipe.id}
                      onClick={() => setActiveRecipe(recipe)}
                      className="card-instacart p-3 rounded-2xl bg-white border border-[#EFEBE0] hover:border-[#0B4F2C]/40 transition-all cursor-pointer flex items-center gap-3 shadow-xs group relative pr-9"
                    >
                      <img
                        src={recipe.rasm_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                        alt={recipe.nomi}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                        }}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          100% {t("tayyorlanadi")}
                        </span>
                        <h4 className="font-bold text-[#1C2B22] text-xs sm:text-sm leading-snug line-clamp-2">
                          {t(recipe.nomi)}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#5A6E60] font-medium pt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#0B4F2C]" />
                            {recipe.tayyorlash_vaqti_daq} {t("daq")}
                          </span>
                          <span>•</span>
                          <span className="capitalize text-emerald-800 font-bold">{t(recipe.qiyinlik)}</span>
                        </div>
                      </div>

                      {/* Favorite bookmark icon */}
                      <button
                        onClick={(e) => toggleFavorite(recipe.id, e)}
                        className="absolute top-3 right-3 p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                        title={t("Sevimliga saqlash")}
                      >
                        <Heart className={`w-4 h-4 ${favoriteRecipeIds.includes(recipe.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Group 2: Yana 1 ta mahsulot kerak */}
            <div>
              <h3 className="font-bold text-[#0B4F2C] text-sm mb-2.5 flex items-center gap-2 tracking-tight">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                {t("Yana 1 ta mahsulot yetmaydi")} ({matchingResults.missingOne.length})
              </h3>

              {matchingResults.missingOne.length === 0 ? (
                <div className="bg-white p-4 rounded-2xl border border-dashed border-[#EFEBE0] text-center text-xs text-[#7C8D82]">
                  {t("Bu bo'limda retseptlar mavjud emas.")}
                </div>
              ) : (
                <div className="space-y-3">
                  {matchingResults.missingOne.map(({ recipe, missingNames }) => (
                    <div
                      key={recipe.id}
                      className="card-instacart p-3 rounded-2xl bg-white border border-[#EFEBE0] hover:border-amber-400 transition-all space-y-2.5 shadow-xs group relative"
                    >
                      {/* Top row: Image + Details + Favorite */}
                      <div
                        onClick={() => setActiveRecipe(recipe)}
                        className="flex items-start gap-3 cursor-pointer min-w-0 pr-8"
                      >
                        <img
                          src={recipe.rasm_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                          alt={recipe.nomi}
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                          }}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-bold text-[#1C2B22] text-xs sm:text-sm leading-snug line-clamp-2">
                            {t(recipe.nomi)}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#5A6E60] font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              {recipe.tayyorlash_vaqti_daq} {t("daq")}
                            </span>
                            <span>•</span>
                            <span className="capitalize text-stone-700">{t(recipe.qiyinlik)}</span>
                          </div>
                        </div>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(recipe.id, e)}
                          className="absolute top-2.5 right-2.5 p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                          title={t("Sevimliga saqlash")}
                        >
                          <Heart className={`w-4 h-4 ${favoriteRecipeIds.includes(recipe.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Missing Items Pill Notice */}
                      <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-200/60 flex items-center justify-between text-xs text-amber-900 font-medium">
                        <span className="flex items-center gap-1.5 line-clamp-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{t("Yetishmaydi")}: <strong className="font-bold">{missingNames.map(m => t(m)).join(', ')}</strong></span>
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          addMultipleToShoppingList(missingNames.map(m => ({ nomi: t(m), miqdori: t(recipe.nomi) })));
                          showToast(`🛒 ${missingNames.map(m => t(m)).join(', ')} ${t("bozorlikka qo'shildi!")}`);
                        }}
                        className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t("Bozorlikka qo'shish")}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODE 2: CATALOG SEARCH AND BROWSE ALL 18 RECIPES */}
      {viewMode === 'catalog' && (
        <div className="space-y-4">
          
          {/* Search Bar Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t("Retsept yoki masalliq nomini yozing...")}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#EFE8DC] text-xs focus:outline-none focus:border-[#FF6B4A] shadow-2xs"
            />
          </div>

          <p className="text-xs font-bold text-[#6B6359] px-1">
            {t("Jami retseptlar")}: <span className="text-[#FF6B4A] font-black">{catalogRecipes.length} ta</span>
          </p>

          {/* Recipes Catalog Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {catalogRecipes.map(recipe => (
              <motion.div
                key={recipe.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setActiveRecipe(recipe)}
                className="card-3d p-2.5 cursor-pointer flex flex-col justify-between group relative"
              >
                <div>
                  <div className="relative overflow-hidden rounded-lg mb-2">
                    <img
                      src={recipe.rasm_url}
                      alt={recipe.nomi}
                      referrerPolicy="no-referrer"
                      className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-amber-300" />
                      {recipe.tayyorlash_vaqti_daq} {t("daq")}
                    </span>

                    <button
                      onClick={(e) => toggleFavorite(recipe.id, e)}
                      className="absolute top-1.5 left-1.5 p-1 rounded-full bg-white/90 backdrop-blur text-gray-600 hover:text-red-500 transition-colors shadow-2xs"
                    >
                      <Heart className={`w-3 h-3 ${favoriteRecipeIds.includes(recipe.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  <h4 className="font-extrabold text-[#2D2A26] text-xs">
                    {t(recipe.nomi)}
                  </h4>
                  <p className="text-[10px] text-[#7C746B] mt-0.5 line-clamp-2 leading-snug">
                    {t(recipe.tarif_matni)}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-[#F5EFE6] flex items-center justify-between">
                  <span className="text-[9px] text-[#8C8479] font-extrabold bg-[#FAF6EF] px-1.5 py-0.2 rounded-md border border-[#EFE8DC] capitalize">
                    {t(recipe.qiyinlik)}
                  </span>
                  <span className="text-[11px] text-[#FF6B4A] font-black group-hover:underline">
                    {t("Retseptni ko'rish")} →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      )}

      {/* MODE 3: BOZORLIK RO'YXATI (SMART SHOPPING LIST IN PAZANDA AI) */}
      {viewMode === 'bozorlik' && (
        <div className="space-y-4">
          
          <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FFF5EE] p-4.5 rounded-3xl border border-[#FFD8C8] shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#FFD8C8] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-[#FF6B4A] text-white flex items-center justify-center shadow-xs">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-[#2D2A26] text-base">
                    {t("Aql-idrokli Bozorlik Ro'yxati")} 🛒
                  </h3>
                  <p className="text-xs text-[#7C746B]">
                    {t("Retseptlardan yoki o'zingiz kiritgan masalliqlar ro'yxati")}
                  </p>
                </div>
              </div>

              {shoppingList.length > 0 && (
                <button
                  onClick={() => {
                    clearShoppingList();
                    showToast("Bozorlik ro'yxati tozalandi");
                  }}
                  className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t("Tozalash")}
                </button>
              )}
            </div>

            {/* Automatic Recipe Ingredient Generator Form */}
            <div className="card-pink p-3.5 rounded-2xl space-y-3">
              <p className="text-xs font-extrabold text-[#2E121D] flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#DB2777]" />
                {t("Taom nomi bo'yicha masalliqlarni avtomatik qo'shish")}:
              </p>

              <form onSubmit={handleAddDishToShoppingList} className="space-y-3">
                {/* Custom Dish Selector Trigger */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowDishSelectModal(true)}
                    className="w-full px-3.5 py-3 rounded-2xl bg-[#FFFDF9] border border-pink-200 text-xs font-bold text-[#2E121D] flex items-center justify-between shadow-2xs hover:border-[#DB2777] active:scale-[0.99] transition-all"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <span className="text-base">🍲</span>
                      <span className="truncate font-extrabold">
                        {selectedDishRecipeId
                          ? t(recipes.find(r => r.id === selectedDishRecipeId)?.nomi || '')
                          : `-- ${t("Taomni tanlang")} (${recipes.length} ta retsept) --`}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#DB2777] flex-shrink-0 ml-2" />
                  </button>
                </div>

                {/* Custom Portion Selector Pills */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-[#9D4C6C] flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#DB2777]" />
                      {t("Kishilar soni (Porsiya)")}:
                    </span>
                    <span className="text-xs font-extrabold text-[#DB2777]">
                      {dishPortions} {t("kishilik")}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {[2, 4, 6, 8, 12].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setDishPortions(num)}
                        className={`py-2 rounded-xl text-xs font-extrabold transition-all border ${
                          dishPortions === num
                            ? 'bg-[#DB2777] text-white border-[#DB2777] shadow-2xs scale-105'
                            : 'bg-white text-[#2E121D] border-pink-100 hover:bg-pink-50'
                        }`}
                      >
                        {num} {t("kishi")}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedDishRecipeId}
                  className="w-full py-3 bg-[#DB2777] hover:bg-[#BE185D] disabled:opacity-40 text-white rounded-2xl text-xs font-black shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t("Avtomatik Bozorlikka Qo'shish")}</span>
                </button>
              </form>
            </div>

            {/* Form to add custom shopping item */}
            <form onSubmit={handleAddCustomShopItem} className="flex gap-1.5 pt-1">
              <input
                type="text"
                value={newShopName}
                onChange={e => setNewShopName(e.target.value)}
                placeholder={t("Masalliq nomi (masalan: Murch, Sarimsoq, Guruch)...")}
                className="flex-1 px-3 py-2.5 rounded-2xl bg-white border border-[#EFE8DC] text-xs focus:outline-none focus:border-[#FF6B4A]"
              />
              <input
                type="text"
                value={newShopQty}
                onChange={e => setNewShopQty(e.target.value)}
                placeholder={t("Miqdori (1 kg)...")}
                className="w-24 px-2.5 py-2.5 rounded-2xl bg-white border border-[#EFE8DC] text-xs focus:outline-none focus:border-[#FF6B4A]"
              />
              <button
                type="submit"
                className="px-3.5 py-2.5 bg-[#FF6B4A] text-white rounded-2xl text-xs font-black flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Preset quick buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[10px] text-[#8C8479] font-bold uppercase tracking-wider whitespace-nowrap">
                {t("Tezkor qo'shish")}:
              </span>
              {['Sabzi (2 kg)', 'Piyoz (3 kg)', 'Kartoshka (5 kg)', 'Go\'sht (1 kg)', 'Lazer Guruch (2 kg)', 'Osimlik yogi (1 l)', 'Zira va murch'].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const [nom, miq] = preset.split('(');
                    addToShoppingList(nom.trim(), miq ? miq.replace(')', '').trim() : '');
                    showToast(`${nom} qo'shildi!`);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-[#FFF0EC] text-[#2D2A26] border border-[#EFE8DC] rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors"
                >
                  + {t(preset)}
                </button>
              ))}
            </div>

            {/* Category chips for Bozorlik */}
            {shoppingList.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 pt-2">
                {[
                  { id: 'barchasi', label: 'Barchasi', icon: '🛒' },
                  { id: 'sabzavot', label: 'Sabzavot', icon: '🥬' },
                  { id: 'gosht', label: "Go'sht", icon: '🥩' },
                  { id: 'sut_mahsuloti', label: 'Sut', icon: '🥛' },
                  { id: 'dukkakli', label: 'Dukkakli', icon: '🌾' },
                  { id: 'ziravor', label: 'Ziravor', icon: '🌶️' },
                  { id: 'boshqa', label: 'Boshqa', icon: '📦' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedShopCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedShopCategory === cat.id
                        ? 'bg-[#DB2777] text-white shadow-2xs'
                        : 'bg-white text-[#9D4C6C] border border-pink-100 hover:bg-pink-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{t(cat.label)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Shopping items list */}
            {shoppingList.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-3xl">🛍️</p>
                <p className="text-xs font-bold text-[#6B5A50]">
                  {t("Bozorlik ro'yxati hozircha bo'sh")}
                </p>
                <p className="text-[11px] text-[#8C8479] max-w-xs mx-auto">
                  {t("Masalliqlar bo'limidan retseptlarni ochib, 1 ta tugma bilan barcha kerakli masalliqlarni bu yerga saqlashingiz mumkin.")}
                </p>
              </div>
            ) : filteredShoppingList.length === 0 ? (
              <div className="py-8 text-center space-y-2 bg-white/50 rounded-2xl border border-dashed border-pink-100">
                <p className="text-2xl">📦</p>
                <p className="text-xs font-bold text-[#9D4C6C]">
                  {t("Ushbu toifada mahsulot yo'q")}
                </p>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                {filteredShoppingList.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleShoppingItem(item.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      item.bajarildi
                        ? 'bg-gray-50/80 border-gray-200 text-gray-400 line-through opacity-80'
                        : 'bg-white border-pink-100 text-[#2D2A26] font-bold hover:border-[#DB2777] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center text-white transition-all flex-shrink-0 ${
                          item.bajarildi ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-[#C2BBAF]'
                        }`}
                      >
                        {item.bajarildi && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs">{t(item.nomi)}</p>
                        {item.miqdori && (
                          <p className="text-[10px] text-[#8C8479] font-normal">
                            {t(item.miqdori)}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeShoppingItem(item.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      )}

      {/* MODE 4: OSHXONA TAYMERI (KITCHEN TIMER IN PAZANDA AI) */}
      {viewMode === 'timer' && (
        <div className="space-y-4">
          
          <div className="bg-gradient-to-b from-[#2E121D] via-[#4C1D2F] to-[#2E121D] text-white p-5 rounded-3xl border border-pink-500/20 shadow-xl text-center space-y-4">
            
            <div className="inline-flex items-center gap-1.5 bg-[#DB2777] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              <TimerIcon className="w-4 h-4 text-[#FBBF24]" />
              {t("Pazanda Oshxona Taymeri")}
            </div>

            {/* Countdown display */}
            <div className="space-y-1">
              <div className="text-5xl font-black tracking-widest font-mono text-[#FBBF24] drop-shadow-md">
                {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:
                {String(timerSeconds % 60).padStart(2, '0')}
              </div>
              <p className="text-xs text-pink-200">
                {isTimerRunning ? t("Taymer ketmoqda...") : t("O'zingiz moslagan vaqtni kiriting va ishga tushiring")}
              </p>
            </div>

            {/* Controls: Start / Resume, Pause, Stop */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {!isTimerRunning ? (
                <button
                  onClick={() => {
                    if (timerSeconds > 0) resumeGlobalTimer();
                    else {
                      const mins = parseInt(customMinutesInput) || 15;
                      startGlobalTimer(mins);
                    }
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#DB2777] to-[#EC4899] hover:from-[#BE185D] hover:to-[#DB2777] text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Play className="w-4 h-4 fill-white" />
                  {t("Boshlash")}
                </button>
              ) : (
                <button
                  onClick={pauseGlobalTimer}
                  className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  {t("Pauza (Vaqtincha to'xtatish)")}
                </button>
              )}

              <button
                onClick={stopGlobalTimer}
                className="px-4 py-2.5 bg-rose-950 hover:bg-rose-900 text-rose-200 text-xs font-bold rounded-2xl border border-rose-800 flex items-center gap-1.5 active:scale-95 transition-transform"
                title={t("To'xtatish")}
              >
                <Square className="w-3.5 h-3.5 fill-rose-200" />
                <span>{t("To'xtatish")}</span>
              </button>
            </div>

            {/* CUSTOM TIMER DURATION INPUT */}
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10 space-y-2 text-left">
              <label className="text-xs font-bold text-pink-100 block">
                ⏱️ {t("O'zingiz taymer vaqtini belgila qiling (daqiqa)")}:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customMinutesInput}
                  onChange={e => setCustomMinutesInput(e.target.value)}
                  placeholder="20"
                  className="w-24 bg-white text-[#2E121D] font-extrabold text-sm px-3 py-1.5 rounded-xl border border-pink-200 focus:outline-none focus:border-[#DB2777]"
                />
                <span className="text-xs text-white/80 font-bold">{t("daqiqa")}</span>
                <button
                  onClick={() => {
                    const mins = parseInt(customMinutesInput);
                    if (mins > 0) startGlobalTimer(mins);
                  }}
                  className="ml-auto px-4 py-1.5 bg-[#FBBF24] text-[#5B210B] hover:bg-[#F59E0B] text-xs font-extrabold rounded-xl shadow-xs active:scale-95 transition-all"
                >
                  {t("O'rnatish va Boshlash")}
                </button>
              </div>
            </div>

            {/* Standard Presets for Uzbek Cooking */}
            <div className="pt-2 border-t border-white/10">
              <p className="text-xs font-bold text-pink-200 mb-2.5 text-left">
                {t("O'zbek taomlari uchun tezkor taymerlar")}:
              </p>

              <div className="grid grid-cols-2 gap-2 text-left">
                <button
                  onClick={() => startGlobalTimer(15)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span>🧅 {t("Piyoz qovurish")}</span>
                  <span className="text-[#FBBF24] font-extrabold">15 daq</span>
                </button>

                <button
                  onClick={() => startGlobalTimer(20)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span>🥩 {t("Go'sht qizartirish")}</span>
                  <span className="text-[#FBBF24] font-extrabold">20 daq</span>
                </button>

                <button
                  onClick={() => startGlobalTimer(30)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span>🍚 {t("Osh damlash")}</span>
                  <span className="text-[#FBBF24] font-extrabold">30 daq</span>
                </button>

                <button
                  onClick={() => startGlobalTimer(45)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span>🥟 {t("Manti pishirish")}</span>
                  <span className="text-[#FBBF24] font-extrabold">45 daq</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Recipe Detail Modal */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-5 space-y-4 border border-[#EFE8DC] shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
              <button
                onClick={() => setActiveRecipe(null)}
                className="p-1.5 text-[#6B6359] hover:bg-[#F2ECE1] rounded-full transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("Orqaga")}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyRecipeForTelegram()}
                  className="p-1.5 text-[#FF6B4A] hover:bg-[#FFF0EC] rounded-xl border border-[#FFD5C8] transition-colors flex items-center gap-1 text-xs font-extrabold"
                  title="Telegramga nusxalash"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Nusxalash</span>
                </button>

                <button
                  onClick={(e) => toggleFavorite(activeRecipe.id, e)}
                  className="p-1.5 rounded-xl border border-[#EFE8DC] hover:bg-gray-50 text-gray-600"
                >
                  <Heart className={`w-4 h-4 ${favoriteRecipeIds.includes(activeRecipe.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>

            <img
              src={activeRecipe.rasm_url}
              alt={activeRecipe.nomi}
              referrerPolicy="no-referrer"
              className="w-full h-48 object-cover rounded-2xl shadow-xs"
            />

            <div>
              <h3 className="font-black text-[#2D2A26] text-xl">
                {t(activeRecipe.nomi)}
              </h3>
              <p className="text-xs text-[#6B5A50] mt-1 leading-relaxed">
                {t(activeRecipe.tarif_matni)}
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#6B6359] mt-2">
                <span className="bg-orange-100 text-orange-900 font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-orange-200">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  {activeRecipe.tayyorlash_vaqti_daq} {t("daqiqa")}
                </span>
                <span className="bg-emerald-100 text-emerald-900 font-extrabold px-2.5 py-1 rounded-full capitalize border border-emerald-200">
                  {t(activeRecipe.qiyinlik)}
                </span>
              </div>
            </div>

            {/* PORTION SCALER */}
            <div className="bg-[#FAF6EF] p-3 rounded-2xl border border-[#EFE8DC] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#2D2A26] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#FF6B4A]" />
                  {t("Porsiya Madori (Kishilar soni)")}:
                </span>
                <span className="text-xs font-black text-[#FF6B4A]">
                  {portions} {t("kishilik")}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {[2, 4, 6, 12].map(num => (
                  <button
                    key={num}
                    onClick={() => setPortions(num)}
                    className={`py-1.5 rounded-xl text-xs font-black transition-all ${
                      portions === num
                        ? 'bg-[#FF6B4A] text-white shadow-xs'
                        : 'bg-white text-[#6B6359] border border-[#EFE8DC] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {num} {num === 12 ? t("To'y/Oila") : t("kishi")}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Specification Box with Checkboxes */}
            <div className="bg-[#FFF9F3] p-4 rounded-2xl border border-[#FFD8C8] space-y-3">
              <div className="flex items-center justify-between border-b border-[#FFD8C8] pb-2">
                <h4 className="font-black text-[#2D2A26] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-[#FF6B4A]" />
                  {t("Masalliqlar reestri")} ({portions} {t("kishi uchun")})
                </h4>

                {savedRecipeIds.includes(activeRecipe.id) ? (
                  <span className="text-xs font-black bg-emerald-600 text-white px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    {t("Saqlandi ✓")}
                  </span>
                ) : (
                  <button
                    onClick={() => addRecipeIngredientsToShoppingList(selectedRecipeIngredients)}
                    className="text-xs font-extrabold bg-[#FF6B4A] text-white px-2.5 py-1 rounded-xl shadow-2xs hover:bg-[#E8593A] transition-colors flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {t("Bozorlikka saqlash")}
                  </button>
                )}
              </div>

              {/* Itemized check list */}
              <div className="space-y-1.5">
                {recipeIngredientItems.map((itemStr, idx) => {
                  const scaledStr = scaleIngredientString(itemStr, 4, portions);
                  const isChecked = selectedRecipeIngredients.includes(itemStr);
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedRecipeIngredients(prev =>
                          prev.includes(itemStr)
                            ? prev.filter(i => i !== itemStr)
                            : [...prev, itemStr]
                        );
                      }}
                      className={`p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-2 ${
                        isChecked
                          ? 'bg-white border-[#FF6B4A] text-[#2D2A26]'
                          : 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center text-white transition-all flex-shrink-0 ${
                          isChecked ? 'bg-[#FF6B4A] border-[#FF6B4A]' : 'bg-white border-stone-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{scaledStr}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step by Step Instructions */}
            <div>
              <h4 className="font-black text-[#2D2A26] text-sm mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FF6B4A]" />
                {t("Bosqichma-bosqich tayyorlanishi")}
              </h4>
              <div className="space-y-2">
                {activeRecipe.korsatmalari.map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-xs text-[#2D2A26] bg-white p-3 rounded-2xl border border-[#EFE8DC] shadow-2xs">
                    <span className="w-6 h-6 rounded-full bg-[#FF6B4A] text-white font-black flex items-center justify-center text-xs flex-shrink-0 shadow-2xs">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed font-medium">{t(step)}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveRecipe(null)}
              className="w-full py-3.5 bg-[#2D2A26] hover:bg-[#433E38] text-white text-xs font-black rounded-2xl mt-2 shadow-xs transition-colors min-h-[44px]"
            >
              {t("Yopish")}
            </button>

          </div>
        </div>
      )}

      {/* Custom Dish Selector Sheet Modal */}
      {showDishSelectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-md max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl p-5 space-y-3 border border-pink-100 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <h3 className="font-extrabold text-[#2E121D] text-base flex items-center gap-2">
                <span>🍲</span>
                <span>{t("Taomni Tanlang")}</span>
              </h3>
              <button
                onClick={() => setShowDishSelectModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-pink-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dish Search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dishSearch}
                onChange={e => setDishSearch(e.target.value)}
                placeholder={t("Taom nomini qidirish...")}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-pink-200 text-xs font-bold text-[#2E121D] focus:outline-none focus:border-[#DB2777]"
              />
            </div>

            {/* Dish List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar pt-1">
              {recipes
                .filter(r => r.holat === 'nashr' && r.nomi.toLowerCase().includes(dishSearch.toLowerCase()))
                .map(r => {
                  const isSelected = selectedDishRecipeId === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => {
                        setSelectedDishRecipeId(r.id);
                        setShowDishSelectModal(false);
                      }}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-pink-50 border-[#DB2777] shadow-2xs'
                          : 'bg-white border-pink-100 hover:border-pink-300'
                      }`}
                    >
                      <img
                        src={r.rasm_url}
                        alt={r.nomi}
                        className="w-12 h-12 object-cover rounded-xl flex-shrink-0 shadow-2xs border border-pink-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#2E121D] text-xs truncate">
                          {t(r.nomi)}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-[#9D4C6C] mt-0.5 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#F59E0B]" />
                            {r.tayyorlash_vaqti_daq} {t("daq")}
                          </span>
                          <span className="capitalize">• {t(r.qiyinlik)}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#DB2777] flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
            </div>

            <button
              onClick={() => setShowDishSelectModal(false)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#2E121D] text-xs font-black rounded-2xl transition-colors min-h-[44px]"
            >
              {t("Yopish")}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
