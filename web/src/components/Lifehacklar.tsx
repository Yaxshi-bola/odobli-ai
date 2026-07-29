import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Lifehack, LifehackCategory } from '../types';
import { Lightbulb, Sparkles, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export const Lifehacklar: React.FC = () => {
  const { lifehacks, t, selectedLifehackId, setSelectedLifehackId } = useApp();
  const [selectedCat, setSelectedCat] = useState<LifehackCategory | 'barchasi'>('barchasi');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLifehackId) {
      setExpandedId(selectedLifehackId);
      setSelectedLifehackId(null);
    }
  }, [selectedLifehackId]);

  const categories: { id: LifehackCategory | 'barchasi'; label: string }[] = [
    { id: 'barchasi', label: 'Barchasi' },
    { id: 'karving', label: 'Karving' },
    { id: 'oyinchoq_yasash', label: "O'yinchoq yasash" },
    { id: 'uy_ishlari', label: 'Uy ishlari' },
    { id: 'boshqa', label: 'Boshqa' },
  ];

  const filteredHacks = lifehacks.filter(lh => {
    if (lh.holat !== 'nashr') return false;
    if (selectedCat === 'barchasi') return true;
    return lh.kategoriya === selectedCat;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 pb-28 pt-1">
      
      {/* Header Banner */}
      <div className="card-burgundy-banner p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
        <div>
          <span className="badge-gold text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block mb-1">
            💡 {t("Foydali Maslahatlar")}
          </span>
          <h2 className="text-base font-extrabold text-white tracking-tight leading-tight">
            {t("Oila & Ro'zg'or Lifehacklari")}
          </h2>
          <p className="text-[11px] text-white/90 mt-0.5 max-w-[220px]">
            {t("Oshxona, hunarmandchilik va ro'zg'or uchun tezkor yechimlar")}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-xs">
          💡
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
        {categories.map(cat => {
          const isActive = selectedCat === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSelectedCat(cat.id)}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-white'
                  : 'bg-white text-[#9D4C6C] border border-[#FCE7F3] hover:bg-pink-50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeLifehackCatPill"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  className="absolute inset-0 bg-[#DB2777] rounded-full shadow-xs -z-10"
                />
              )}
              {t(cat.label)}
            </motion.button>
          );
        })}
      </div>

      {/* Lifehack Cards */}
      <div className="space-y-2.5">
        {filteredHacks.map(lh => {
          const isExpanded = expandedId === lh.id;
          return (
            <motion.div
              key={lh.id}
              whileHover={{ y: -1.5 }}
              className="card-pink p-3 rounded-2xl hover:border-[#DB2777] transition-all"
            >
              <div className="flex gap-3 items-start">
                <img
                  src={lh.rasm_url}
                  alt={lh.sarlavha}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover rounded-xl flex-shrink-0 shadow-2xs border border-pink-100"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-extrabold text-[#DB2777] bg-pink-100 px-2 py-0.5 rounded-md border border-pink-200 uppercase">
                    {t(lh.kategoriya)}
                  </span>
                  <h3 className="font-bold text-[#2E121D] text-xs mt-1">
                    {t(lh.sarlavha)}
                  </h3>
                  <p className="text-[10.5px] text-[#9D4C6C] mt-0.5 line-clamp-2">
                    {t(lh.tavsif_matni)}
                  </p>
                </div>
              </div>

              {/* Expand button */}
              <button
                onClick={() => toggleExpand(lh.id)}
                className="w-full mt-2 pt-2 border-t border-[#F5F0E6] flex items-center justify-between text-xs font-bold text-[#059669] hover:underline"
              >
                <span>{isExpanded ? t("Bosqichlarni yashirish") : t("Batafsil bosqichlarni ko'rish")}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Step-by-step content */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-dashed border-[#E5DEC3] space-y-2 animate-fadeIn">
                  <h4 className="font-extrabold text-xs text-[#2D2A26] uppercase tracking-wider mb-2">
                    {t("Ketma-ketlik bosqichlari")}:
                  </h4>
                  {lh.bosqichlar?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#4A443C] bg-[#F7F5F0] p-2.5 rounded-xl border border-[#ECE5D8]">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                      <span>{t(step)}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
