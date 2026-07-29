import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Flame, Star, ShieldCheck, Sparkles, Search, X, ChevronRight, ChefHat, BookOpen, Lightbulb } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, progress, script, setScript, t, activeTab, setActiveTab, recipes, tales, lifehacks, openRecipeModal, openTaleModal, openLifehackModal } = useApp();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Filter global results
  const filteredRecipes = recipes.filter(r => 
    globalSearch.trim() && (
      r.nomi.toLowerCase().includes(globalSearch.toLowerCase()) ||
      r.tarif_matni.toLowerCase().includes(globalSearch.toLowerCase())
    )
  );

  const filteredTales = tales.filter(t => 
    globalSearch.trim() && t.sarlavha.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const filteredLifehacks = lifehacks.filter(l => 
    globalSearch.trim() && l.sarlavha.toLowerCase().includes(globalSearch.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-40 glass-header px-4 py-2.5 transition-all">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Logo & Title */}
          <motion.div 
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#DB2777] to-[#F472B6] text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              ✨
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-[#831843] text-lg tracking-tight leading-none">
                  odobli.ai
                </h1>
                {user.is_premium ? (
                  <span className="badge-gold text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                    PRO
                  </span>
                ) : (
                  <span className="bg-pink-100 text-[#DB2777] text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-200">
                    TRIAL
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#9D4C6C] font-medium mt-0.5 line-clamp-1">
                {user.ism || t("Foydalanuvchi")}
              </p>
            </div>
          </motion.div>

          {/* Quick Actions (Search & Language/Script switcher) */}
          <div className="flex items-center gap-2">
            
            {/* Search Trigger Button (Visible only on non-home tabs) */}
            {activeTab !== 'home' && (
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowSearchModal(true)}
                className="w-9 h-9 bg-white hover:bg-pink-50 text-[#DB2777] rounded-full border border-[#FCE7F3] shadow-xs flex items-center justify-center transition-all"
                title="Qidiruv"
              >
                <Search className="w-4 h-4" />
              </motion.button>
            )}

            {/* Script Toggle Pill */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setScript(script === 'lotin' ? 'kirill' : 'lotin')}
              className="px-3 py-1.5 text-[11px] font-bold bg-[#DB2777] text-white hover:bg-[#BE185D] rounded-full shadow-xs flex items-center gap-1.5 transition-all shrink-0"
              title="Lotin / Kirill"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>{script === 'lotin' ? 'Lotin' : 'Кирилл'}</span>
            </motion.button>

          </div>

        </div>
      </header>

      {/* Global Search Overlay Modal Mounted via React Portal to Document Body */}
      {showSearchModal && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xl flex items-start justify-center p-4 pt-10 overscroll-contain animate-in fade-in duration-150">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
            className="bg-white w-full max-w-md max-h-[85vh] rounded-3xl p-4 border border-[#FCE7F3] shadow-2xl flex flex-col space-y-3 relative"
          >
            
            <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-2.5">
              <span className="text-xs font-bold text-[#831843] uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4 text-[#DB2777]" />
                {t("Umumiy Qidiruv")}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowSearchModal(false);
                  setGlobalSearch('');
                }}
                className="p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-[#DB2777] transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder={t("Masalliq, taom nomi, ertak yoki lifehack...")}
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-pink-50/50 border border-pink-100 text-xs font-bold text-[#2E121D] focus:outline-none focus:border-[#DB2777]"
                autoFocus
              />
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar pt-1">
              {!globalSearch.trim() ? (
                <div className="text-center py-8 text-xs text-gray-400 space-y-1">
                  <p className="font-bold text-[#9D4C6C]">{t("Qidirish uchun matn kiriting")}</p>
                  <p className="text-[11px]">{t("Masalan: palov, manti, quyoncha, karving...")}</p>
                </div>
              ) : (
                <>
                  {/* Recipes Section */}
                  {filteredRecipes.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-[#DB2777] uppercase tracking-wider block">
                        🍲 {t("Retseptlar")} ({filteredRecipes.length})
                      </span>
                      {filteredRecipes.map(r => (
                        <div
                          key={r.id}
                          onClick={() => {
                            setShowSearchModal(false);
                            setActiveTab('pazanda');
                            openRecipeModal(r);
                          }}
                          className="p-2 bg-white rounded-2xl border border-pink-100 hover:border-pink-300 flex items-center gap-2.5 cursor-pointer shadow-2xs transition-all"
                        >
                          <img src={r.rasm_url} alt={r.nomi} className="w-10 h-10 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-[#2E121D] truncate">{t(r.nomi)}</h4>
                            <p className="text-[10px] text-gray-500 line-clamp-1">{t(r.tarif_matni)}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tales Section */}
                  {filteredTales.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider block">
                        🏰 {t("Ertaklar")} ({filteredTales.length})
                      </span>
                      {filteredTales.map(tItem => (
                        <div
                          key={tItem.id}
                          onClick={() => {
                            setShowSearchModal(false);
                            setActiveTab('bolajon');
                            openTaleModal(tItem);
                          }}
                          className="p-2 bg-white rounded-2xl border border-purple-100 hover:border-purple-300 flex items-center gap-2.5 cursor-pointer shadow-2xs transition-all"
                        >
                          <img src={tItem.muqova_rasm_url} alt={tItem.sarlavha} className="w-10 h-10 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-[#2E121D] truncate">{t(tItem.sarlavha)}</h4>
                            <p className="text-[10px] text-purple-500 font-semibold">{tItem.yosh_toifasi} {t("yosh")}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Lifehacks Section */}
                  {filteredLifehacks.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block">
                        💡 {t("Lifehacklar")} ({filteredLifehacks.length})
                      </span>
                      {filteredLifehacks.map(lh => (
                        <div
                          key={lh.id}
                          onClick={() => {
                            setShowSearchModal(false);
                            setActiveTab('lifehacklar');
                            openLifehackModal(lh);
                          }}
                          className="p-2 bg-white rounded-2xl border border-emerald-100 hover:border-emerald-300 flex items-center gap-2.5 cursor-pointer shadow-2xs transition-all"
                        >
                          {lh.rasm_url && (
                            <img src={lh.rasm_url} alt={lh.sarlavha} className="w-10 h-10 rounded-xl object-cover" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-[#2E121D] truncate">{t(lh.sarlavha)}</h4>
                            <p className="text-[10px] text-emerald-600 capitalize font-semibold">{t(lh.kategoriya)}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredRecipes.length === 0 && filteredTales.length === 0 && filteredLifehacks.length === 0 && (
                    <p className="text-center text-xs text-gray-500 py-6">
                      "{globalSearch}" {t("bo'yicha hech narsa topilmadi.")}
                    </p>
                  )}
                </>
              )}
            </div>

          </motion.div>
        </div>,
        document.body
      )}
    </>
  );
};
