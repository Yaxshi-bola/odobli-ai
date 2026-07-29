import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  Heart,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  X,
  ChefHat,
  BookOpenCheck,
  Lightbulb,
  BrainCircuit
} from 'lucide-react';

export const BoshSahifa: React.FC = () => {
  const {
    setActiveTab,
    t,
    recipes,
    tales,
    riddles,
    lifehacks,
    user,
    openRecipeModal,
    openTaleModal,
    openLifehackModal
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const slides = [
    {
      id: 0,
      title: "Pazanda AI — Mazali Retseptlar",
      subtitle: "Uydagi masalliqlardan milliy va mazali taomlar tayyorlang.",
      badge: "AQL-IDROK PAZANDA",
      tab: 'pazanda',
      btnText: "Retseptlarni Ko'rish",
      icon: "🍲"
    },
    {
      id: 1,
      title: "Sehrli Bolajon & Ertaklar",
      subtitle: "Audio ertaklar, bilimli o'yinlar va qiziqarli topishmoqlar!",
      badge: "ZUKKO BOLAJON",
      tab: 'bolajon',
      btnText: "Ertaklar Dunyosi",
      icon: "🧸"
    },
    {
      id: 2,
      title: "Oila Kun Tartibi & Mukofotlar",
      subtitle: "Farzandlar bilan kunlik topshiriqlarni bajarib ball to'plang.",
      badge: "INTIZOM VA TARTIB",
      tab: 'bolajon',
      btnText: "Vazifalarni Ko'rish",
      icon: "🏆"
    },
    {
      id: 3,
      title: "Ro'zg'or Lifehacklari",
      subtitle: "Pazandalik va uy-ro'zg'or bo'yicha foydali maslahatlar.",
      badge: "FOYDALI MASLAHAT",
      tab: 'lifehacklar',
      btnText: "Lifehacklar",
      icon: "💡"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const featuredRecipe = recipes[0];
  const featuredTale = tales[0];
  const featuredRiddle = riddles[0];
  const featuredLifehack = lifehacks[0];

  const categories = [
    { 
      id: 'pazanda', 
      label: 'Pazanda AI', 
      icon: <ChefHat className="w-5 h-5 text-amber-600 drop-shadow-xs" />, 
      gradient: 'from-amber-100 to-orange-100 border-amber-200/80 shadow-amber-500/10' 
    },
    { 
      id: 'bolajon', 
      label: 'Ertaklar', 
      icon: <BookOpenCheck className="w-5 h-5 text-purple-600 drop-shadow-xs" />, 
      gradient: 'from-purple-100 to-pink-100 border-purple-200/80 shadow-purple-500/10' 
    },
    { 
      id: 'lifehacklar', 
      label: 'Lifehacklar', 
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 drop-shadow-xs" />, 
      gradient: 'from-emerald-100 to-teal-100 border-emerald-200/80 shadow-emerald-500/10' 
    },
    { 
      id: 'bolajon', 
      label: 'Topishmoq', 
      icon: <BrainCircuit className="w-5 h-5 text-rose-600 drop-shadow-xs" />, 
      gradient: 'from-rose-100 to-pink-100 border-rose-200/80 shadow-rose-500/10' 
    },
  ];

  return (
    <div className="space-y-4 pb-28 pt-1">
      
      {/* STICKY SEARCH BAR */}
      <div className="sticky top-14 z-30 pt-1 bg-[#FFF5F7]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilterModal(true)}
            className="flex-1 bg-white border border-[#FCE7F3] rounded-full px-4 py-2.5 shadow-xs flex items-center gap-2.5 cursor-pointer hover:border-[#DB2777]/40 transition-colors"
          >
            <Search className="w-4 h-4 text-[#DB2777]" />
            <span className="text-xs font-medium text-[#9D4C6C] line-clamp-1">
              {t("Masalliq, retsept yoki ertak qidiring...")}
            </span>
          </motion.div>
          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowFilterModal(true)}
            className="w-10 h-10 rounded-full bg-[#DB2777] text-white flex items-center justify-center shadow-md shrink-0 hover:bg-[#BE185D] transition-colors"
            title="Qidirish"
          >
            <Search className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* 4 ROUND CATEGORIES ROW WITH PROFESSIONAL GRADIENTS & LUCIDE ICONS */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {categories.map((cat, idx) => (
          <motion.button
            key={idx}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setActiveTab(cat.id as any)}
            className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-2xl border border-[#FCE7F3] shadow-xs hover:shadow-md transition-all group"
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.gradient} border shadow-xs group-hover:scale-105 transition-transform`}>
              {cat.icon}
            </div>
            <span className="text-[11px] font-extrabold text-[#2E121D] truncate w-full text-center tracking-tight">
              {t(cat.label)}
            </span>
          </motion.button>
        ))}
      </div>

      {/* COMPACT & ELEGANT ROSE BANNER */}
      <div className="card-rose-banner p-4 relative overflow-hidden rounded-2xl shadow-md min-h-[115px] flex flex-col justify-between">
        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="space-y-1 max-w-[240px]">
            <span className="bg-white/20 text-[#FBBF24] text-[9.5px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 backdrop-blur-md border border-white/10">
              <Sparkles className="w-2.5 h-2.5 text-[#FBBF24]" />
              {t(slides[currentSlide].badge)}
            </span>
            <h2 className="text-sm font-extrabold tracking-tight leading-snug text-white mt-1">
              {t(slides[currentSlide].title)}
            </h2>
          </div>
          <span className="text-3xl drop-shadow-md select-none">{slides[currentSlide].icon}</span>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-2">
          <button
            onClick={() => setActiveTab(slides[currentSlide].tab as any)}
            className="btn-gold-pill px-3.5 py-1 text-xs font-extrabold flex items-center gap-1 shadow-xs active:scale-95 transition-all"
          >
            <span>{t(slides[currentSlide].btnText)}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-5 bg-[#FBBF24]' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>



      {/* KUNLIK TAVSIYALAR SECTION */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#831843] text-xs uppercase tracking-wider">
              {t("Kunlik Sara Tavsiyalar")}
            </h3>
          </div>
          <button 
            onClick={() => setActiveTab('pazanda')}
            className="text-xs font-bold text-[#DB2777] hover:underline"
          >
            {t("Hammasi >")}
          </button>
        </div>

        {/* 2-Column Product/Recipe Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Item 1: Recipe Card */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => setActiveTab('pazanda')}
            className="card-pink p-2.5 relative flex flex-col justify-between cursor-pointer group"
          >
            {/* Heart Favorite Button */}
            <button
              onClick={(e) => toggleFavorite('recipe-1', e)}
              className={`w-6 h-6 rounded-full bg-white/90 shadow-xs border border-pink-100 flex items-center justify-center absolute top-2 right-2 z-10 transition-transform active:scale-90 ${
                favorites['recipe-1'] ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
            </button>

            <div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2 bg-pink-50 relative">
                <img
                  src={featuredRecipe?.rasm_url || '/assets/images/toshkent_palov_1785171559097.png'}
                  alt={featuredRecipe?.nomi}
                  onError={(e) => { e.currentTarget.src = '/assets/images/toshkent_palov_1785171559097.png'; }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Author & Rating */}
              <div className="flex items-center justify-between text-[10px] text-[#9D4C6C] font-medium mb-1">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-pink-100 text-[8px] flex items-center justify-center font-bold text-pink-800">
                    👨‍🍳
                  </span>
                  <span className="truncate max-w-[50px]">Chef</span>
                  <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500 text-white" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>4.9</span>
                </div>
              </div>

              <h4 className="font-bold text-[#2E121D] text-xs leading-snug line-clamp-1">
                {t(featuredRecipe?.nomi || "Toshkent To'y Palovi")}
              </h4>
            </div>

            <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-[#FCE7F3]">
              <span className="text-[#DB2777] font-bold text-[11px]">
                {featuredRecipe?.tayyorlash_vaqti_daq} {t("daq")}
              </span>
              <span className="bg-pink-50 text-[#DB2777] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-pink-100">
                {t(featuredRecipe?.qiyinlik || 'Oson')}
              </span>
            </div>
          </motion.div>

          {/* Item 2: Tale Card */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => setActiveTab('bolajon')}
            className="card-pink p-2.5 relative flex flex-col justify-between cursor-pointer group"
          >
            <button
              onClick={(e) => toggleFavorite('tale-1', e)}
              className={`w-6 h-6 rounded-full bg-white/90 shadow-xs border border-pink-100 flex items-center justify-center absolute top-2 right-2 z-10 transition-transform active:scale-90 ${
                favorites['tale-1'] ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
            </button>

            <div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2 bg-purple-50 relative">
                <img
                  src={featuredTale?.muqova_rasm_url || '/assets/images/tale_quyoncha_cover_1785171712747.png'}
                  alt={featuredTale?.sarlavha}
                  onError={(e) => { e.currentTarget.src = '/assets/images/tale_quyoncha_cover_1785171712747.png'; }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#9D4C6C] font-medium mb-1">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-100 text-[8px] flex items-center justify-center font-bold text-purple-800">
                    🏰
                  </span>
                  <span className="truncate max-w-[50px]">{t("Ertak")}</span>
                  <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500 text-white" />
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>4.8</span>
                </div>
              </div>

              <h4 className="font-bold text-[#2E121D] text-xs leading-snug line-clamp-1">
                {t(featuredTale?.sarlavha || "Mehrli quyoncha")}
              </h4>
            </div>

            <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-[#FCE7F3]">
              <span className="text-[#F59E0B] font-bold text-[11px]">
                {featuredTale?.yosh_toifasi} {t("yosh")}
              </span>
              <span className="bg-amber-50 text-[#D97706] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-amber-100">
                Audio 🎧
              </span>
            </div>
          </motion.div>

          {/* Item 3: Riddle Card */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => setActiveTab('bolajon')}
            className="card-pink p-2.5 relative flex flex-col justify-between cursor-pointer group"
          >
            <button
              onClick={(e) => toggleFavorite('riddle-1', e)}
              className={`w-6 h-6 rounded-full bg-white/90 shadow-xs border border-pink-100 flex items-center justify-center absolute top-2 right-2 z-10 transition-transform active:scale-90 ${
                favorites['riddle-1'] ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
            </button>

            <div>
              <div className="aspect-[4/3] rounded-xl bg-amber-50/80 border border-amber-100 p-2 mb-2 flex items-center justify-center text-center">
                <p className="text-[11px] font-semibold text-amber-950 line-clamp-3 italic">
                  "{t(featuredRiddle?.savol || "Ko'zi bor, boshi yo'q...")}"
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#9D4C6C] font-medium mb-1">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-200 text-[8px] flex items-center justify-center font-bold text-amber-900">
                    🧩
                  </span>
                  <span>{t("Topishmoq")}</span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>5.0</span>
                </div>
              </div>

              <h4 className="font-bold text-[#2E121D] text-xs leading-snug line-clamp-1">
                {t("Mantiqiy Topishmoq")}
              </h4>
            </div>

            <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-[#FCE7F3]">
              <span className="text-[#DB2777] font-bold text-[11px]">
                +15 Ball ⭐
              </span>
              <span className="btn-gold-pill px-2.5 py-0.5 text-[10px] truncate">
                {t("Yechish")}
              </span>
            </div>
          </motion.div>

          {/* Item 4: Lifehack Card */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => setActiveTab('lifehacklar')}
            className="card-pink p-2.5 relative flex flex-col justify-between cursor-pointer group"
          >
            <button
              onClick={(e) => toggleFavorite('lifehack-1', e)}
              className={`w-6 h-6 rounded-full bg-white/90 shadow-xs border border-pink-100 flex items-center justify-center absolute top-2 right-2 z-10 transition-transform active:scale-90 ${
                favorites['lifehack-1'] ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
            </button>

            <div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl mb-2 bg-pink-50 relative">
                <img
                  src={featuredLifehack?.rasm_url || '/assets/images/lh_atirgul_carving_1785171733978.png'}
                  alt={featuredLifehack?.sarlavha}
                  onError={(e) => { e.currentTarget.src = '/assets/images/lh_atirgul_carving_1785171733978.png'; }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#9D4C6C] font-medium mb-1">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-pink-100 text-[8px] flex items-center justify-center font-bold text-pink-800">
                    💡
                  </span>
                  <span>{t("Lifehack")}</span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>4.9</span>
                </div>
              </div>

              <h4 className="font-bold text-[#2E121D] text-xs leading-snug line-clamp-1">
                {t(featuredLifehack?.sarlavha || "Oshxona sirlari")}
              </h4>
            </div>

            <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-[#FCE7F3]">
              <span className="text-[#DB2777] font-bold text-[11px]">
                {t("Foydali")}
              </span>
              <span className="btn-rose-pill px-2.5 py-0.5 text-[10px] truncate">
                {t("O'tish")}
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* FILTER & SEARCH INLINE OVERLAY MODAL */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 pt-12 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md max-h-[85vh] rounded-3xl p-4 border border-[#FCE7F3] shadow-2xl flex flex-col space-y-3">
            
            <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-2.5">
              <span className="text-xs font-bold text-[#831843] uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#DB2777]" />
                {t("Qidiruv va Filtr")}
              </span>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 rounded-full hover:bg-pink-50 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-[#DB2777] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                placeholder={t("Retsept, ertak yoki lifehack nomini yozing...")}
                className="w-full pl-9 pr-4 py-2 rounded-2xl bg-pink-50/50 border border-[#FCE7F3] text-xs focus:outline-none focus:border-[#DB2777]"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pt-1">
              {!filterSearch.trim() ? (
                <p className="text-center text-xs text-[#9D4C6C] py-8">
                  {t("Ilovadagi barcha retseptlar, ertaklar va lifehacklarni tezda toping.")}
                </p>
              ) : (
                <div className="space-y-2">
                  {/* Recipes */}
                  {recipes
                    .filter(r => r.nomi.toLowerCase().includes(filterSearch.toLowerCase()))
                    .map(r => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setShowFilterModal(false);
                          setFilterSearch('');
                          openRecipeModal(r);
                        }}
                        className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#FCE7F3] hover:border-[#FF6B4A] cursor-pointer flex items-center justify-between text-xs font-semibold text-[#2E121D]"
                      >
                        <div className="flex items-center gap-2">
                          <span>🍲</span>
                          <span>{t(r.nomi)}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#FF6B4A]" />
                      </div>
                    ))}

                  {/* Tales */}
                  {tales
                    .filter(t => t.sarlavha.toLowerCase().includes(filterSearch.toLowerCase()))
                    .map(tale => (
                      <div
                        key={tale.id}
                        onClick={() => {
                          setShowFilterModal(false);
                          setFilterSearch('');
                          openTaleModal(tale);
                        }}
                        className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#FCE7F3] hover:border-[#7C3AED] cursor-pointer flex items-center justify-between text-xs font-semibold text-[#2E121D]"
                      >
                        <div className="flex items-center gap-2">
                          <span>🏰</span>
                          <span>{t(tale.sarlavha)}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                    ))}

                  {/* Lifehacks */}
                  {lifehacks
                    .filter(l => l.sarlavha.toLowerCase().includes(filterSearch.toLowerCase()))
                    .map(lh => (
                      <div
                        key={lh.id}
                        onClick={() => {
                          setShowFilterModal(false);
                          setFilterSearch('');
                          openLifehackModal(lh);
                        }}
                        className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#FCE7F3] hover:border-[#059669] cursor-pointer flex items-center justify-between text-xs font-semibold text-[#2E121D]"
                      >
                        <div className="flex items-center gap-2">
                          <span>💡</span>
                          <span>{t(lh.sarlavha)}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#059669]" />
                      </div>
                    ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
