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
      <div className="card-pink p-4 rounded-3xl space-y-3.5 shadow-xs relative overflow-hidden bg-white">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DB2777] to-[#EC4899] flex items-center justify-center text-2xl shadow-sm text-white font-black flex-shrink-0">
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
                    className="px-2.5 py-1 text-xs font-bold rounded-xl border-2 border-[#DB2777] bg-white text-[#2E121D] focus:outline-none w-full shadow-2xs"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-[#DB2777] text-white rounded-xl hover:bg-[#BE185D] transition-all flex-shrink-0 shadow-2xs active:scale-95"
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
                  <h2 className="text-base font-extrabold text-[#2E121D] truncate">
                    {user.ism}
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setNameInput(user.ism);
                      setIsEditingName(true);
                    }}
                    className="p-1 text-[#DB2777] hover:bg-pink-100 rounded-lg transition-colors flex-shrink-0"
                    title={t("Ismni tahrirlash")}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {user.is_premium && (
                    <ShieldCheck className="w-4 h-4 text-amber-500 fill-amber-100 flex-shrink-0" />
                  )}
                </div>
              )}
              <p className="text-[11px] text-slate-500 font-medium truncate">
                @{user.username || 'user'} • ID: {user.telegram_id}
              </p>
            </div>
          </div>

          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap ${
            user.is_premium ? 'badge-gold' : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            {user.is_premium ? `✨ ${t("Premium")}` : `⏳ ${t("Sinov davri")}`}
          </span>
        </div>

        {/* Micro Stats Bar */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 bg-orange-50/80 p-2.5 rounded-2xl border border-orange-100">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-slate-500 font-semibold">{t("Streak")}</p>
              <p className="text-xs font-black text-slate-900">{progress.joriy_streak} {t("kun")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50/80 p-2.5 rounded-2xl border border-amber-100">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-slate-500 font-semibold">{t("Ballar")}</p>
              <p className="text-xs font-black text-slate-900">{progress.jami_ball} {t("ball")}</p>
            </div>
          </div>
        </div>

        {/* Subscription Trigger Button */}
        <button
          onClick={() => setShowPaymentModal(true)}
          className="w-full py-2.5 btn-gold-pill text-white font-extrabold text-xs rounded-2xl shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5 min-h-[40px]"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>{user.is_premium ? t("Premium Obuna Ma'lumoti") : t("Premium Sotib Olish (25,000 so'm/oy)")}</span>
        </button>
      </div>

      {/* Saqlanganlar (Uzunchoq Papka Card) */}
      <div className="card-pink p-3.5 rounded-3xl space-y-3 shadow-2xs border border-pink-100">
        <div 
          onClick={() => setShowSavedList(!showSavedList)}
          className="flex items-center justify-between cursor-pointer py-0.5"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-pink-100 text-[#DB2777] flex items-center justify-center shadow-2xs">
              <FolderHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#2E121D] text-sm flex items-center gap-1.5">
                <span>{t("Saqlangan Retseptlar Papkasi")}</span>
              </h3>
              <p className="text-[11px] text-[#9D4C6C] font-semibold">
                {favoriteRecipes.length} {t("ta retsept saqlangan")}
              </p>
            </div>
          </div>

          <button className="p-1.5 text-[#DB2777] hover:bg-pink-50 rounded-xl transition-colors">
            <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${showSavedList ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showSavedList && (
          <div className="pt-2 border-t border-pink-100 space-y-2">
            {favoriteRecipes.length === 0 ? (
              <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-dashed border-pink-200 text-center space-y-1.5">
                <p className="text-xs font-bold text-[#2E121D]">
                  {t("Hozircha saqlangan retseptlar yo'q")}
                </p>
                <p className="text-[11px] text-[#9D4C6C]">
                  {t("Retseptlar ustidagi yurakcha tugmasini bosib shu papkaga yig'ishingiz mumkin.")}
                </p>
                <button
                  onClick={() => setActiveTab('pazanda')}
                  className="mt-1.5 text-xs font-black text-[#DB2777] hover:underline inline-flex items-center gap-1"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>{t("Pazanda AI retseptlariga o'tish")} →</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {favoriteRecipes.map(recipe => (
                  <div
                    key={recipe.id}
                    className="bg-[#FFFDF9] p-2.5 rounded-2xl border border-pink-100 flex items-center justify-between gap-3 hover:border-[#DB2777] transition-all"
                  >
                    <div
                      onClick={() => setActiveTab('pazanda')}
                      className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                    >
                      <img
                        src={recipe.rasm_url}
                        alt={recipe.nomi}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 object-cover rounded-xl shadow-2xs flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-[#2E121D] text-xs truncate">
                          {t(recipe.nomi)}
                        </h4>
                        <p className="text-[10px] text-[#9D4C6C] flex items-center gap-1 mt-0.5 font-medium">
                          <Clock className="w-3 h-3 text-[#F59E0B]" />
                          <span>{recipe.tayyorlash_vaqti_daq} {t("daq")}</span>
                          <span>•</span>
                          <span className="capitalize">{t(recipe.qiyinlik)}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFavoriteRecipe(recipe.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors flex-shrink-0"
                      title={t("Olib tashlash")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sozlamalar: Ismni tahrirlash & Alifbo Skripti */}
      <div className="card-pink p-3.5 rounded-3xl space-y-2.5 shadow-2xs border border-pink-100">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-[#2E121D] text-xs flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#DB2777]" />
            <span>{t("Sozlamalar va Profil")}</span>
          </h3>
          <span className="text-[10px] text-[#9D4C6C] font-semibold">{t("Sozlamalar")}</span>
        </div>

        {/* Ismni tahrirlash qatori */}
        <div
          onClick={() => {
            setNameInput(user.ism);
            setIsEditingName(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center justify-between p-2.5 bg-pink-50/60 rounded-2xl border border-pink-100 cursor-pointer hover:bg-pink-100/50 transition-all active:scale-98"
        >
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-[#DB2777]" />
            <span className="text-xs font-extrabold text-[#2E121D]">{t("Ismni tahrirlash")}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#9D4C6C]">
            <span className="truncate max-w-[120px]">{user.ism}</span>
            <Pencil className="w-3.5 h-3.5 text-[#DB2777] flex-shrink-0" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-pink-50/60 p-1 rounded-2xl border border-pink-100">
          <button
            type="button"
            onClick={() => setScript('lotin')}
            className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
              script === 'lotin'
                ? 'bg-[#DB2777] text-white shadow-2xs'
                : 'text-[#9D4C6C] hover:text-[#2E121D]'
            }`}
          >
            Lotin alifbosi
          </button>
          <button
            type="button"
            onClick={() => setScript('kirill')}
            className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
              script === 'kirill'
                ? 'bg-[#DB2777] text-white shadow-2xs'
                : 'text-[#9D4C6C] hover:text-[#2E121D]'
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
