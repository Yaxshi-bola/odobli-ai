import React, { useState } from 'react';
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
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md px-4 py-3 border-b border-gray-100 dark:border-gray-800 transition-all">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#5A1827] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              ✨
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-[#5A1827] dark:text-white text-lg tracking-tight leading-none">
                  odobli.ai
                </h1>
                {user.is_premium ? (
                  <span className="badge-gold">
                    PRO
                  </span>
                ) : (
                  <span className="bg-amber-50 dark:bg-amber-950/40 text-[#D97706] text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/50">
                    TRIAL
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 line-clamp-1">
                {user.ism || t("Foydalanuvchi")}
              </p>
            </div>
          </div>

          {/* Quick Actions (Search & Language/Script switcher) */}
          <div className="flex items-center gap-2">
            
            {/* Search Trigger Button (Visible only on non-home tabs) */}
            {activeTab !== 'home' && (
              <button
                onClick={() => setShowSearchModal(true)}
                className="w-9 h-9 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 text-[#5A1827] dark:text-white rounded-full border border-gray-200 dark:border-gray-700 shadow-xs flex items-center justify-center transition-all active:scale-95"
                title="Qidiruv"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Script Toggle Pill */}
            <button
              onClick={() => setScript(script === 'lotin' ? 'kirill' : 'lotin')}
              className="px-3 py-1.5 text-[11px] font-bold bg-[#5A1827] text-white hover:bg-[#3E101B] rounded-full shadow-xs flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
              title="Lotin / Kirill"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{script === 'lotin' ? 'Lotin' : 'Кирилл'}</span>
            </button>

          </div>

        </div>
      </header>

      {/* Global Search Overlay Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 pt-12 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md max-h-[85vh] rounded-3xl p-4 border border-[#FCE7F3] shadow-2xl flex flex-col space-y-3">
            
            <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-2.5">
              <span className="text-xs font-bold text-[#831843] uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4 text-[#DB2777]" />
                {t("Umumiy Qidiruv")}
              </span>
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setGlobalSearch('');
                }}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder={t("Retsept, ertak yoki lifehack nomini yozing...")}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-[#EFE8DC] text-xs focus:outline-none focus:border-[#FF6B4A]"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pt-1">
              {!globalSearch.trim() ? (
                <p className="text-center text-xs text-[#8C8479] py-8">
                  {t("Ilovadagi barcha retseptlar, ertaklar va lifehacklarni tezda toping.")}
                </p>
              ) : (
                <>
                  {/* Recipes Section */}
                  {filteredRecipes.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-black text-[#FF6B4A] flex items-center gap-1">
                        <ChefHat className="w-3.5 h-3.5" />
                        {t("Retseptlar")} ({filteredRecipes.length})
                      </p>
                      {filteredRecipes.map(r => (
                        <div
                          key={r.id}
                          onClick={() => {
                            setShowSearchModal(false);
                            setGlobalSearch('');
                            openRecipeModal(r);
                          }}
                          className="p-2.5 rounded-xl bg-white border border-[#EFE8DC] hover:border-[#FF6B4A] cursor-pointer flex items-center justify-between text-xs font-semibold"
                        >
                          <span className="font-bold text-[#2D2A26]">{t(r.nomi)}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tales Section */}
                  {filteredTales.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-black text-[#7C3AED] flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {t("Ertaklar")} ({filteredTales.length})
                      </p>
                      {filteredTales.map(tale => (
                        <div
                          key={tale.id}
                          onClick={() => {
                            setShowSearchModal(false);
                            setGlobalSearch('');
                            openTaleModal(tale);
                          }}
                          className="p-2.5 rounded-xl bg-white border border-[#EFE8DC] hover:border-[#7C3AED] cursor-pointer flex items-center justify-between text-xs font-semibold"
                        >
                          <span className="font-bold text-[#2D2A26]">{t(tale.sarlavha)}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Lifehacks Section */}
                  {filteredLifehacks.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-black text-[#059669] flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        {t("Lifehacklar")} ({filteredLifehacks.length})
                      </p>
                      {filteredLifehacks.map(lh => (
                        <div
                          key={lh.id}
                          onClick={() => {
                            setShowSearchModal(false);
                            setGlobalSearch('');
                            openLifehackModal(lh);
                          }}
                          className="p-2.5 rounded-xl bg-white border border-[#EFE8DC] hover:border-[#059669] cursor-pointer flex items-center justify-between text-xs font-semibold"
                        >
                          <span className="font-bold text-[#2D2A26]">{t(lh.sarlavha)}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
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

          </div>
        </div>
      )}
    </>
  );
};
