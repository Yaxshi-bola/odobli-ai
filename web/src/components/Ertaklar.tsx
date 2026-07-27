import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Tale } from '../types';
import { BookOpen, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, X, ArrowLeft } from 'lucide-react';

export const Ertaklar: React.FC = () => {
  const { tales, t, selectedAgeFilter, setSelectedAgeFilter, selectedTaleModal, setSelectedTaleModal } = useApp();

  // Currently opened tale for page-by-page reading mode
  const [readingTale, setReadingTale] = useState<Tale | null>(null);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTaleModal) {
      setReadingTale(selectedTaleModal);
      setCurrentPageIdx(0);
      setSelectedTaleModal(null);
    }
  }, [selectedTaleModal]);

  // Age filters list
  const ageFilters = [
    { id: 'Barchasi', label: 'Barchasi' },
    { id: '3-5', label: '3–5 yosh' },
    { id: '6-8', label: '6–8 yosh' },
    { id: '9-12', label: '9–12 yosh' },
  ];

  // Filtered tales
  const filteredTales = tales.filter(tale => {
    if (tale.holat !== 'nashr') return false;
    if (selectedAgeFilter === 'Barchasi') return true;
    return tale.yosh_toifasi === selectedAgeFilter;
  });

  const openTaleReader = (tale: Tale) => {
    setReadingTale(tale);
    setCurrentPageIdx(0);
    setIsPlayingAudio(false);
  };

  const closeReader = () => {
    setReadingTale(null);
    setCurrentPageIdx(0);
    setIsPlayingAudio(false);
  };

  const handleNextPage = () => {
    if (!readingTale) return;
    if (currentPageIdx < readingTale.sahifalar.length - 1) {
      setCurrentPageIdx(prev => prev + 1);
      setIsPlayingAudio(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      setCurrentPageIdx(prev => prev - 1);
      setIsPlayingAudio(false);
    }
  };

  const toggleAudio = () => {
    setIsPlayingAudio(prev => !prev);
  };

  return (
    <div className="space-y-6 pb-28 pt-2">
      
      {/* Top Banner */}
      <div className="card-burgundy-banner p-4 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <div className="inline-flex items-center gap-1 bg-white/20 text-[#F59E0B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full mb-1 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            {t("Bolalar dunyosi")}
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {t("Ertaklar to'plami")}
          </h2>
          <p className="text-xs text-white/90 mt-0.5 max-w-[220px]">
            {t("Sehrli, mehrli va tarbiyaviy hikoyalar dunyosi")}
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-xs">
          🏰
        </div>
      </div>

      {/* Age Filter Tabs (Capsules) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
        {ageFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedAgeFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedAgeFilter === filter.id
                ? 'bg-[#5A1827] text-white shadow-xs'
                : 'bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {t(filter.label)}
          </button>
        ))}
      </div>

      {/* Tales Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredTales.map(tale => (
          <div
            key={tale.id}
            onClick={() => openTaleReader(tale)}
            className="card-premium p-3.5 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="relative mb-3 overflow-hidden rounded-2xl">
                <img
                  src={tale.muqova_rasm_url}
                  alt={tale.sarlavha}
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-xs"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
                  {tale.yosh_toifasi} {t("yosh")}
                </span>

                {/* Direct Play button overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openTaleReader(tale);
                    setIsPlayingAudio(true);
                  }}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                  title="Audio tinglash"
                >
                  <Volume2 className="w-5 h-5 fill-white" />
                </button>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-[#5A1827] dark:group-hover:text-amber-400 transition-colors">
                {t(tale.sarlavha)}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                {t(tale.sahifalar[0]?.matn || '')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#5A1827] dark:text-amber-400" />
                {tale.sahifalar.length} {t("sahifa")}
              </span>
              <span className="text-[#5A1827] dark:text-amber-400 font-bold group-hover:underline flex items-center gap-0.5">
                {t("O'qish")} →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGE-BY-PAGE READER MODE MODAL */}
      {readingTale && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md h-[92vh] max-h-[750px] rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-gray-200 dark:border-gray-800 shadow-2xl relative overflow-hidden">
            
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <button
                onClick={closeReader}
                className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("Chiqish")}
              </button>

              <div className="text-center">
                <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">
                  {t(readingTale.sarlavha)}
                </h4>
                <p className="text-[10px] text-gray-500 font-semibold">
                  {currentPageIdx + 1} / {readingTale.sahifalar.length} {t("sahifa")}
                </p>
              </div>

              {/* Audio Narration Toggle */}
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full transition-colors flex items-center gap-1 ${
                  isPlayingAudio ? 'bg-[#F59E0B] text-white animate-pulse' : 'bg-amber-50 dark:bg-amber-950/40 text-[#D97706]'
                }`}
                title="Ovozli ijro"
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* SPOTIFY-STYLE FLOATING MINI AUDIO PLAYER */}
            {isPlayingAudio && (
              <div className="bg-[#5A1827] text-white px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-lg my-1 animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B] animate-ping" />
                  <div>
                    <p className="font-bold text-white text-xs leading-none">{t(readingTale.sarlavha)}</p>
                    <p className="text-[10px] text-amber-200 mt-0.5">Audio PRO • Uz-Uz Narrator</p>
                  </div>
                </div>
                <button
                  onClick={toggleAudio}
                  className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Main Page Illustration & Text */}
            <div className="flex-1 overflow-y-auto py-2 space-y-4 my-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={readingTale.sahifalar[currentPageIdx]?.rasm_url || readingTale.muqova_rasm_url}
                  alt="Story scene"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover rounded-2xl"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] px-2.5 py-0.5 rounded-full">
                  {currentPageIdx + 1}-{t("rasm")}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-2xs">
                <p className="text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-relaxed font-medium">
                  {t(readingTale.sahifalar[currentPageIdx]?.matn || '')}
                </p>
              </div>
            </div>

            {/* Bottom Page Navigation Controls */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIdx === 0}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-1 transition-all min-h-[44px] ${
                  currentPageIdx === 0
                    ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                {t("Oldingi")}
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPageIdx === readingTale.sahifalar.length - 1}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-1 transition-all min-h-[44px] ${
                  currentPageIdx === readingTale.sahifalar.length - 1
                    ? 'bg-[#5A1827]/40 text-white cursor-not-allowed'
                    : 'btn-primary-burgundy active:scale-95'
                }`}
              >
                {t("Keyingi")}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
