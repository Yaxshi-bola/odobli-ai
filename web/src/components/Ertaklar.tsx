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
      <div className="bg-gradient-to-r from-[#F3F0FF] to-[#E8E0FF] p-4 rounded-3xl border border-[#DCD0FF] flex items-center justify-between shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1 bg-[#7C3AED] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full mb-1">
            <Sparkles className="w-3 h-3 text-purple-200" />
            {t("Bolalar dunyosi")}
          </div>
          <h2 className="text-xl font-extrabold text-[#2D2A26] tracking-tight">
            {t("Ertaklar to'plami")}
          </h2>
          <p className="text-xs text-[#584D70] mt-0.5 max-w-[220px]">
            {t("Sehrli, mehrli va tarbiyaviy hikoyalar dunyosi")}
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-white/80 border border-[#7C3AED]/20 flex items-center justify-center text-3xl shadow-xs">
          📖
        </div>
      </div>

      {/* Age Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
        {ageFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedAgeFilter(filter.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedAgeFilter === filter.id
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'bg-white text-[#6B6359] border border-[#EFE8DC] hover:bg-[#F5F3FF]'
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
            className="bg-white p-3.5 rounded-3xl border border-[#EFE8DC] hover:border-[#7C3AED] transition-all cursor-pointer shadow-2xs group flex flex-col justify-between"
          >
            <div>
              <div className="relative mb-3">
                <img
                  src={tale.muqova_rasm_url}
                  alt={tale.sarlavha}
                  referrerPolicy="no-referrer"
                  className="w-full h-40 object-cover rounded-2xl group-hover:scale-102 transition-transform shadow-xs"
                />
                <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur text-[#7C3AED] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-purple-200 shadow-2xs">
                  {tale.yosh_toifasi} {t("yosh")}
                </span>
              </div>

              <h3 className="font-bold text-[#2D2A26] text-base group-hover:text-[#7C3AED] transition-colors">
                {t(tale.sarlavha)}
              </h3>
              <p className="text-xs text-[#7C746B] mt-0.5 line-clamp-2">
                {t(tale.sahifalar[0]?.matn || '')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F5F0E6] flex items-center justify-between text-xs text-[#8C8479] font-medium">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#7C3AED]" />
                {tale.sahifalar.length} {t("sahifa")}
              </span>
              <span className="text-[#7C3AED] font-bold group-hover:underline flex items-center gap-0.5">
                {t("O'qish")} →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGE-BY-PAGE READER MODE MODAL */}
      {readingTale && (
        <div className="fixed inset-0 z-50 bg-[#1A1816]/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-md h-[92vh] max-h-[750px] rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-[#EFE8DC] shadow-2xl relative overflow-hidden">
            
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
              <button
                onClick={closeReader}
                className="p-1.5 text-[#6B6359] hover:bg-[#F2ECE1] rounded-full transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("Chiqish")}
              </button>

              <div className="text-center">
                <h4 className="font-extrabold text-[#2D2A26] text-sm">
                  {t(readingTale.sarlavha)}
                </h4>
                <p className="text-[10px] text-[#8C8479] font-semibold">
                  {currentPageIdx + 1} / {readingTale.sahifalar.length} {t("sahifa")}
                </p>
              </div>

              {/* Audio Narration Toggle */}
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full transition-colors flex items-center gap-1 ${
                  isPlayingAudio ? 'bg-[#7C3AED] text-white animate-pulse' : 'bg-[#F3F0FF] text-[#7C3AED]'
                }`}
                title="Ovozli ijro"
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Audio Playing Bar */}
            {isPlayingAudio && (
              <div className="bg-purple-100 text-purple-900 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center justify-between border border-purple-200 my-1 animate-fadeIn">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
                  {t("Ovozli hikoya o'qilmoqda...")}
                </span>
                <span className="text-[10px] opacity-75">🔊 Uz-Uz Narrator</span>
              </div>
            )}

            {/* Main Page Illustration & Text */}
            <div className="flex-1 overflow-y-auto py-2 space-y-4 my-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={readingTale.sahifalar[currentPageIdx]?.rasm_url || readingTale.muqova_rasm_url}
                  alt="Story scene"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] px-2.5 py-0.5 rounded-full">
                  {currentPageIdx + 1}-{t("rasm")}
                </div>
              </div>

              <div className="bg-[#FAF6EF] p-4 rounded-2xl border border-[#ECE2D2] shadow-2xs">
                <p className="text-[#2D2A26] text-sm sm:text-base leading-relaxed font-medium">
                  {t(readingTale.sahifalar[currentPageIdx]?.matn || '')}
                </p>
              </div>
            </div>

            {/* Bottom Page Navigation Controls */}
            <div className="pt-3 border-t border-[#EFE8DC] flex items-center justify-between gap-3">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIdx === 0}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-1 transition-all min-h-[44px] ${
                  currentPageIdx === 0
                    ? 'bg-[#F0ECE1] text-[#A8A095] cursor-not-allowed'
                    : 'bg-white border border-[#EFE8DC] text-[#2D2A26] hover:bg-[#F7F2EA] active:scale-95'
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
                    ? 'bg-[#7C3AED]/40 text-white cursor-not-allowed'
                    : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-md shadow-[#7C3AED]/20 active:scale-95'
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
