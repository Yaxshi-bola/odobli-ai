import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Flame, Star, Sparkles, X } from 'lucide-react';

export const RewardModal: React.FC = () => {
  const { rewardDetails, setRewardDetails, t, setActiveTab } = useApp();

  if (!rewardDetails) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] w-full max-w-sm rounded-3xl p-6 text-center space-y-4 border border-[#EFE8DC] shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setRewardDetails(null)}
          className="absolute top-3 right-3 p-2 text-[#8C8479] hover:bg-[#F2ECE1] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Trophy Banner */}
        <div className="relative pt-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border-4 border-amber-300 shadow-lg flex items-center justify-center mx-auto text-5xl animate-bounce">
            🏆
          </div>
          <Sparkles className="w-6 h-6 text-amber-500 absolute top-0 right-12 animate-pulse" />
          <Sparkles className="w-5 h-5 text-orange-500 absolute bottom-2 left-12 animate-pulse" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-[#2D2A26]">
            {t(rewardDetails.title)}
          </h3>
          <p className="text-xs text-[#6B6359] mt-1">
            {t(rewardDetails.message)}
          </p>
        </div>

        {/* Points & Streak Earned */}
        <div className="grid grid-cols-2 gap-3 bg-[#FAF6EF] p-3.5 rounded-2xl border border-[#EFE8DC]">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-emerald-600 font-extrabold text-lg">
              <Star className="w-5 h-5 fill-emerald-500 text-emerald-500" />
              +{rewardDetails.points}
            </span>
            <span className="text-[11px] text-[#8C8479] font-medium">{t("ball qo'shildi")}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-orange-600 font-extrabold text-lg">
              <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
              {rewardDetails.streak} {t("kun")}
            </span>
            <span className="text-[11px] text-[#8C8479] font-medium">{t("streak seriyasi")}</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={() => setRewardDetails(null)}
            className="btn-rose-pill w-full py-3.5 text-xs font-black min-h-[44px]"
          >
            {t("Davom ettirish")} →
          </button>

          <button
            onClick={() => {
              setRewardDetails(null);
              setActiveTab('home');
            }}
            className="w-full py-2.5 text-[#9D4C6C] hover:text-[#2E121D] font-bold text-xs"
          >
            {t("Bosh sahifaga qaytish")}
          </button>
        </div>

      </div>
    </div>
  );
};
