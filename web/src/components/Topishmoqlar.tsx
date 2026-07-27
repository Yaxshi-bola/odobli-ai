import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Brain, HelpCircle, Calculator, CheckCircle2, XCircle, Sparkles, Trophy } from 'lucide-react';

export const Topishmoqlar: React.FC = () => {
  const { riddles, mathProblems, completeActivity, t } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'topishmoq' | 'masala'>('topishmoq');
  const [currentRiddleIdx, setCurrentRiddleIdx] = useState<number>(0);
  const [currentMathIdx, setCurrentMathIdx] = useState<number>(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentRiddle = riddles[currentRiddleIdx] || riddles[0];
  const currentMath = mathProblems[currentMathIdx] || mathProblems[0];

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(opt);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || isSubmitted) return;

    setIsSubmitted(true);

    if (activeSubTab === 'topishmoq') {
      const isCorrect = selectedAnswer === currentRiddle.javob;
      if (isCorrect) {
        completeActivity('topishmoq', currentRiddle.id, 5);
      }
    } else {
      const isCorrect = selectedAnswer === currentMath.togri_javob;
      if (isCorrect) {
        completeActivity('masala', currentMath.id, 10);
      }
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);

    if (activeSubTab === 'topishmoq') {
      setCurrentRiddleIdx(prev => (prev + 1) % riddles.length);
    } else {
      setCurrentMathIdx(prev => (prev + 1) % mathProblems.length);
    }
  };

  return (
    <div className="space-y-6 pb-28 pt-2">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] p-4 rounded-3xl border border-[#FDE68A] flex items-center justify-between shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1 bg-[#D97706] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full mb-1">
            <Sparkles className="w-3 h-3 text-amber-200" />
            {t("Mantiqiy viktorina")}
          </div>
          <h2 className="text-xl font-extrabold text-[#2D2A26] tracking-tight">
            {t("Topishmoq & Masalalar")}
          </h2>
          <p className="text-xs text-[#78350F] mt-0.5 max-w-[220px]">
            {t("Zukkolik va tezkor fikrlashni rivojlantirish")}
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-white/80 border border-[#D97706]/20 flex items-center justify-center text-3xl shadow-xs">
          🧠
        </div>
      </div>

      {/* Sub Tabs Toggle */}
      <div className="bg-[#FAF6EF] p-1 rounded-2xl border border-[#EFE8DC] grid grid-cols-2 gap-1">
        <button
          onClick={() => {
            setActiveSubTab('topishmoq');
            setSelectedAnswer(null);
            setIsSubmitted(false);
          }}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[42px] ${
            activeSubTab === 'topishmoq'
              ? 'bg-[#D97706] text-white shadow-xs'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          {t("Topishmoqlar")}
        </button>

        <button
          onClick={() => {
            setActiveSubTab('masala');
            setSelectedAnswer(null);
            setIsSubmitted(false);
          }}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[42px] ${
            activeSubTab === 'masala'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          {t("Matematik masalalar")}
        </button>
      </div>

      {/* QUIZ CARD: Topishmoq Mode */}
      {activeSubTab === 'topishmoq' && currentRiddle && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between px-1 text-xs font-bold text-[#8C8479]">
            <span>{t("Savol")} {currentRiddleIdx + 1} / {riddles.length}</span>
            <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
              {currentRiddle.yosh_toifasi} {t("yosh")} • +5 {t("ball")}
            </span>
          </div>

          {/* Question Box */}
          <div className="bg-gradient-to-br from-[#4F46E5] to-[#3730A3] p-5 rounded-3xl text-white shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 font-black">
              ❓
            </div>
            <p className="text-lg font-bold leading-relaxed relative z-10 text-indigo-50">
              "{t(currentRiddle.savol)}"
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentRiddle.variantlar.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              const isCorrectAnswer = opt === currentRiddle.javob;

              let btnStyle = 'bg-white border-[#EFE8DC] text-[#2D2A26] hover:bg-[#FAF6EF]';

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                }
              } else if (isSelected) {
                btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold ring-2 ring-indigo-300';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-sm transition-all flex items-center justify-between min-h-[48px] ${btnStyle}`}
                >
                  <span>{t(opt)}</span>
                  {isSubmitted && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {isSubmitted && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="bg-white p-3.5 rounded-2xl border border-indigo-200 text-xs text-indigo-900 leading-relaxed">
              <p className="font-bold mb-1">💡 {t("Izoh")}:</p>
              <p>{t(currentRiddle.izoh || "To'g'ri javob uchun rasm va izohni e'tiborga oling.")}</p>
            </div>
          )}

          {/* Action Button */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-md transition-all min-h-[48px] ${
                selectedAnswer
                  ? 'bg-[#4F46E5] hover:bg-[#4338CA] active:scale-98'
                  : 'bg-[#C2BBAF] cursor-not-allowed'
              }`}
            >
              {t("Javob yuborish")}
            </button>
          ) : (
            <button
              onClick={handleNextQuiz}
              className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-98 min-h-[48px]"
            >
              {t("Keyingi topishmoq")} →
            </button>
          )}

        </div>
      )}

      {/* QUIZ CARD: Matematik Masala Mode */}
      {activeSubTab === 'masala' && currentMath && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between px-1 text-xs font-bold text-[#8C8479]">
            <span>{t("Masala")} {currentMathIdx + 1} / {mathProblems.length}</span>
            <span className="bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full border border-blue-200">
              {currentMath.yosh_toifasi} {t("yosh")} • +10 {t("ball")}
            </span>
          </div>

          {/* Question Box */}
          <div className="bg-gradient-to-br from-[#2563EB] to-[#1E40AF] p-5 rounded-3xl text-white shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 font-black">
              🧮
            </div>
            <p className="text-lg font-bold leading-relaxed relative z-10 text-blue-50">
              {t(currentMath.savol)}
            </p>
          </div>

          {/* Options List */}
          <div className="grid grid-cols-2 gap-2.5">
            {[currentMath.togri_javob, ...currentMath.notogri_variantlar].sort().map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              const isCorrectAnswer = opt === currentMath.togri_javob;

              let btnStyle = 'bg-white border-[#EFE8DC] text-[#2D2A26] hover:bg-[#FAF6EF]';

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black text-base';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                }
              } else if (isSelected) {
                btnStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-300';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border text-center text-base font-extrabold transition-all min-h-[56px] flex items-center justify-center gap-2 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isSubmitted && (
            <div className="bg-white p-3.5 rounded-2xl border border-blue-200 text-xs text-blue-900 leading-relaxed">
              <p className="font-bold mb-1">🧮 {t("Tushuntirish")}:</p>
              <p>{t(currentMath.tushuntirish || "To'g'ri hisob-kitob bajarildi.")}</p>
            </div>
          )}

          {/* Action Button */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-md transition-all min-h-[48px] ${
                selectedAnswer
                  ? 'bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-98'
                  : 'bg-[#C2BBAF] cursor-not-allowed'
              }`}
            >
              {t("Javob yuborish")}
            </button>
          ) : (
            <button
              onClick={handleNextQuiz}
              className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-98 min-h-[48px]"
            >
              {t("Keyingi masala")} →
            </button>
          )}

        </div>
      )}

    </div>
  );
};
