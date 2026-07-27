import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Flame, Star, Sparkles, CreditCard, Heart, Clock, ChefHat, Trash2, FolderHeart, Globe, ChevronRight, Pencil, Check, X, User as UserIcon } from 'lucide-react';

export const Profil: React.FC = () => {
  const { user, progress, script, setScript, t, setShowPaymentModal, setActiveTab, badges, recipes, favoriteRecipeIds, toggleFavoriteRecipe, updateUserName } = useApp();

  const [showSavedList, setShowSavedList] = useState<boolean>(true);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(user.ism);

  const favoriteRecipes = recipes.filter(r => favoriteRecipeIds.includes(r.id));

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (nameInput.trim()) {
      updateUserName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="space-y-4 pb-28 pt-2">
      
      {/* Compact Profile & Subscription Card */}
      <div className="card-premium p-4 rounded-3xl space-y-3.5 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-[#5A1827] flex items-center justify-center text-2xl shadow-sm text-white font-black flex-shrink-0">
              👩‍🍳
            </div>
            <div className="min-w-0 flex-1">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1.5 my-0.5">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder={t("Ismingizni kiriting...")}
                    className="px-2.5 py-1 text-xs font-bold rounded-xl border-2 border-[#5A1827] bg-white text-gray-900 focus:outline-none w-full shadow-2xs"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-[#5A1827] text-white rounded-xl hover:bg-[#3E101B] transition-all flex-shrink-0 shadow-2xs active:scale-95"
                    title={t("Saqlash")}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNameInput(user.ism);
                      setIsEditingName(false);
                    }}
                    className="p-1.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all flex-shrink-0 active:scale-95"
                    title={t("Bekor qilish")}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-extrabold text-gray-900 dark:text-white truncate">
                    {user.ism}
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setNameInput(user.ism);
                      setIsEditingName(true);
                    }}
                    className="p-1 text-[#5A1827] dark:text-amber-400 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    title={t("Ismni tahrirlash")}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {user.is_premium && (
                    <ShieldCheck className="w-4 h-4 text-amber-500 fill-amber-100 flex-shrink-0" />
                  )}
                </div>
              )}
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium truncate">
                @{user.username || 'user'} • ID: {user.telegram_id}
              </p>
            </div>
          </div>

          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap ${
            user.is_premium ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-gray-100 text-gray-700 border border-gray-200'
          }`}>
            {user.is_premium ? `✨ Level ${Math.floor(progress.jami_ball / 100) + 1} PRO` : `⏳ Sinov Davri`}
          </span>
        </div>

        {/* Micro Stats Bar (Badge & Level Progress) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950/20 p-2.5 rounded-2xl border border-orange-100 dark:border-orange-900/30">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold">{t("Streak")}</p>
              <p className="text-xs font-black text-gray-900 dark:text-white">{progress.joriy_streak} {t("kun")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold">{t("Level & Ballar")}</p>
              <p className="text-xs font-black text-gray-900 dark:text-white">Lvl {Math.floor(progress.jami_ball / 100) + 1} • {progress.jami_ball} {t("ball")}</p>
            </div>
          </div>
        </div>

        {/* Subscription Trigger Button */}
        <button
          onClick={() => setShowPaymentModal(true)}
          className="w-full py-2.5 btn-amber-cta text-white font-black text-xs rounded-2xl shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5 min-h-[40px]"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>{user.is_premium ? t("Premium Obuna Ma'lumoti") : t("Premium Sotib Olish (25,000 so'm/oy)")}</span>
        </button>
      </div>

      {/* Saqlanganlar (Grid View with Heart Icons) */}
      <div className="card-premium p-3.5 rounded-3xl space-y-3 shadow-2xs">
        <div 
          onClick={() => setShowSavedList(!showSavedList)}
          className="flex items-center justify-between cursor-pointer py-0.5"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shadow-2xs">
              <FolderHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                <span>{t("Saqlangan Retseptlar Papkasi")}</span>
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold">
                {favoriteRecipes.length} {t("ta retsept saqlangan")}
              </p>
            </div>
          </div>

          <button className="p-1.5 text-[#5A1827] dark:text-amber-400 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${showSavedList ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showSavedList && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            {favoriteRecipes.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 text-center space-y-1.5">
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {t("Hozircha saqlangan retseptlar yo'q")}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {t("Retseptlar ustidagi yurakcha tugmasini bosib shu papkaga yig'ishingiz mumkin.")}
                </p>
                <button
                  onClick={() => setActiveTab('pazanda')}
                  className="mt-1.5 text-xs font-black text-[#5A1827] dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>{t("Pazanda AI retseptlariga o'tish")} →</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {favoriteRecipes.map(recipe => (
                  <div
                    key={recipe.id}
                    className="bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between hover:border-[#5A1827] transition-all relative group"
                  >
                    <div
                      onClick={() => setActiveTab('pazanda')}
                      className="cursor-pointer"
                    >
                      <img
                        src={recipe.rasm_url}
                        alt={recipe.nomi}
                        referrerPolicy="no-referrer"
                        className="w-full h-20 object-cover rounded-xl shadow-2xs mb-1.5"
                      />
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-xs truncate">
                        {t(recipe.nomi)}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5 font-medium">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>{recipe.tayyorlash_vaqti_daq} {t("daq")}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => toggleFavoriteRecipe(recipe.id)}
                      className="absolute top-3 right-3 p-1.5 text-rose-500 bg-white/80 dark:bg-gray-800 rounded-full shadow-2xs hover:bg-rose-50 transition-colors"
                      title={t("Olib tashlash")}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sozlamalar: Ismni tahrirlash & Alifbo Skripti */}
      <div className="card-premium p-3.5 rounded-3xl space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-gray-900 dark:text-white text-xs flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#5A1827] dark:text-amber-400" />
            <span>{t("Sozlamalar va Profil")}</span>
          </h3>
          <span className="text-[10px] text-gray-500 font-semibold">{t("Sozlamalar")}</span>
        </div>

        {/* Ismni tahrirlash qatori */}
        <div
          onClick={() => {
            setNameInput(user.ism);
            setIsEditingName(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 transition-all active:scale-98"
        >
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-[#5A1827] dark:text-amber-400" />
            <span className="text-xs font-extrabold text-gray-900 dark:text-white">{t("Ismni tahrirlash")}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
            <span className="truncate max-w-[120px]">{user.ism}</span>
            <Pencil className="w-3.5 h-3.5 text-[#5A1827] flex-shrink-0" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-gray-800 p-1 rounded-2xl border border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setScript('lotin')}
            className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
              script === 'lotin'
                ? 'bg-[#5A1827] text-white shadow-2xs'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Lotin alifbosi
          </button>
          <button
            type="button"
            onClick={() => setScript('kirill')}
            className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
              script === 'kirill'
                ? 'bg-[#5A1827] text-white shadow-2xs'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Кирилл алифбоси
          </button>
        </div>
      </div>

      {/* Unvonlar va Nishonlar */}
      <div className="card-pink p-3.5 rounded-3xl space-y-2.5 shadow-2xs border border-pink-100">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-[#2E121D] text-xs flex items-center gap-1.5">
            <span>{t("Unvonlar va Nishonlar")}</span>
            <span className="text-amber-500 font-extrabold text-xs">🏆</span>
          </h3>
          <span className="text-[11px] text-[#9D4C6C] font-bold">
            {badges.filter(b => b.ochilgan).length} / {badges.length} {t("ochilgan")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-2.5 rounded-2xl border transition-all ${
                badge.ochilgan
                  ? 'bg-amber-50/70 border-amber-200 text-[#2E121D]'
                  : 'bg-gray-50/60 border-gray-200 text-gray-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{badge.icon}</span>
                <div className="min-w-0">
                  <p className="font-extrabold text-xs truncate">{t(badge.nomi)}</p>
                  <p className="text-[10px] text-[#8C8479] truncate">{t(badge.talab)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
