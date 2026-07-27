import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Tale, Riddle, MathProblem } from '../types';
import {
  BookOpen,
  Brain,
  Calculator,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Star,
  Clock,
  ShieldAlert,
  Moon,
  Gamepad2,
  Award,
  Flame,
  Trophy,
  Puzzle,
  Smile,
  Check
} from 'lucide-react';

export const Bolajon: React.FC = () => {
  const {
    tales,
    riddles,
    mathProblems,
    completeActivity,
    completedItemIds,
    selectedAgeFilter,
    setSelectedAgeFilter,
    routineTasks,
    toggleRoutineTask,
    progress,
    user,
    setShowPaymentModal,
    t
  } = useApp();

  const [subTab, setSubTab] = useState<'ertaklar' | 'audio' | 'oyinlar' | 'vazifalar'>('ertaklar');

  // Interactive Games State
  const [activeGame, setActiveGame] = useState<'math' | 'word' | 'riddle' | 'moral'>('math');
  
  // Game 1: Quick Math Game State
  const [mathScore, setMathScore] = useState<number>(0);
  const [mathNum1, setMathNum1] = useState<number>(5);
  const [mathNum2, setMathNum2] = useState<number>(3);
  const [mathOp, setMathOp] = useState<'+' | '-' | 'x'>('+');
  const [mathOptions, setMathOptions] = useState<number[]>([8, 10, 6, 9]);
  const [mathFeedback, setMathFeedback] = useState<string | null>(null);

  const generateNewMathQuestion = () => {
    const ops: ('+' | '-' | 'x')[] = ['+', '-', 'x'];
    const chosenOp = ops[Math.floor(Math.random() * ops.length)];
    let n1 = Math.floor(Math.random() * 10) + 1;
    let n2 = Math.floor(Math.random() * 10) + 1;
    if (chosenOp === '-' && n1 < n2) {
      const temp = n1;
      n1 = n2;
      n2 = temp;
    }
    setMathNum1(n1);
    setMathNum2(n2);
    setMathOp(chosenOp);

    const correct = chosenOp === '+' ? n1 + n2 : chosenOp === '-' ? n1 - n2 : n1 * n2;
    const opts = new Set<number>();
    opts.add(correct);
    while (opts.size < 4) {
      const wrong = correct + (Math.floor(Math.random() * 7) - 3);
      if (wrong >= 0) opts.add(wrong);
    }
    setMathOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    setMathFeedback(null);
  };

  const handleMathAnswer = (val: number) => {
    const correct = mathOp === '+' ? mathNum1 + mathNum2 : mathOp === '-' ? mathNum1 - mathNum2 : mathNum1 * mathNum2;
    if (val === correct) {
      setMathScore(prev => prev + 1);
      setMathFeedback("🎉 Barakalla! To'g'ri javob (+15 ball)!");
      completeActivity('masala', `math_game_${Date.now()}`, 15);
      setTimeout(() => generateNewMathQuestion(), 1200);
    } else {
      setMathFeedback(`❌ Afsuski, to'g'ri javob ${correct} edi.`);
      setTimeout(() => generateNewMathQuestion(), 1500);
    }
  };

  // Game 2: Word Spelling Puzzle State
  const wordPuzzles = [
    { word: "PALOV", missingIndex: 1, missingChar: "A", options: ["A", "O", "U", "I"], hint: "O'zbek milliy tansiq taomi" },
    { word: "KITOB", missingIndex: 2, missingChar: "T", options: ["T", "D", "B", "K"], hint: "Bilim manbai" },
    { word: "ERTAK", missingIndex: 4, missingChar: "K", options: ["K", "Q", "G", "T"], hint: "Bolalar uchun sehrli dunyo" },
    { word: "OSHXONA", missingIndex: 3, missingChar: "X", options: ["X", "H", "K", "Q"], hint: "Taom pishiriladigan joy" },
    { word: "MAKTAB", missingIndex: 1, missingChar: "A", options: ["A", "E", "O", "I"], hint: "Ziyo va dars maskani" }
  ];
  const [wordIdx, setWordIdx] = useState<number>(0);
  const [wordFeedback, setWordFeedback] = useState<string | null>(null);

  const handleWordChoice = (char: string) => {
    const current = wordPuzzles[wordIdx];
    if (char === current.missingChar) {
      setWordFeedback("🌟 Juda zukkosiz! To'g'ri topdingiz (+20 ball)!");
      completeActivity('topishmoq', `word_puzzle_${Date.now()}`, 20);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % wordPuzzles.length);
        setWordFeedback(null);
      }, 1400);
    } else {
      setWordFeedback(`❌ Qaytadan urinib ko'ring! Flosh simvol: ${current.missingChar}`);
    }
  };

  // Game 3: Moral & Etiquette Quiz State
  const moralQuestions = [
    {
      question: "Ko'chada yoshi katta insonga duch kelganda nima deyish kerak?",
      options: ["Assalomu alaykum!", "Indamay o'tib ketish", "Salom deb baqirish", "E'tibor bermaslik"],
      correct: "Assalomu alaykum!",
      explanation: "Kattalarga birinchi bo'lib Assalomu alaykum deb salom berish odobdan!"
    },
    {
      question: "Ovqatdan oldin va keyin qanday muhim qoida bor?",
      options: ["Qo'llarni sovunlab yuvish", "Darrov televizor ko'rish", "Telefon o'ynash", "Yugurish"],
      correct: "Qo me'yorida qo'llarni sovunlab yuvish",
      explanation: "Sog'liq uchun ovqatdan oldin va keyin qo'llarni puxta yuvish shart!"
    }
  ];

  // Tale Modal Reader State
  const [selectedTale, setSelectedTale] = useState<Tale | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  // Audio Player Simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);

  // Riddle Game State
  const [selectedRiddle, setSelectedRiddle] = useState<Riddle | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);

  // Math Problem State
  const [selectedMath, setSelectedMath] = useState<MathProblem | null>(null);
  const [selectedMathVariant, setSelectedMathVariant] = useState<string | null>(null);
  const [isMathChecked, setIsMathChecked] = useState<boolean>(false);

  // Age Filtering
  const ageOptions = ['Barchasi', '3-5', '6-8', '9-12'];

  const filteredTales = tales.filter(
    t => selectedAgeFilter === 'Barchasi' || t.yosh_toifasi === selectedAgeFilter
  );

  const filteredRiddles = riddles.filter(
    r => selectedAgeFilter === 'Barchasi' || r.yosh_toifasi === selectedAgeFilter
  );

  const filteredMath = mathProblems.filter(
    m => selectedAgeFilter === 'Barchasi' || m.yosh_toifasi === selectedAgeFilter
  );

  // Audio progress timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2 * audioSpeed;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioSpeed]);

  const handleOpenTale = (tale: Tale) => {
    setSelectedTale(tale);
    setCurrentPageIndex(0);
    setAudioProgress(0);
    setIsPlayingAudio(false);
  };

  const handleRiddleOptionClick = (variant: string) => {
    if (isAnswerChecked) return;
    setSelectedVariant(variant);
  };

  const handleCheckRiddle = () => {
    if (!selectedRiddle || !selectedVariant) return;
    setIsAnswerChecked(true);

    if (selectedVariant === selectedRiddle.javob) {
      completeActivity('topishmoq', selectedRiddle.id, 15);
    }
  };

  const handleCheckMath = () => {
    if (!selectedMath || !selectedMathVariant) return;
    setIsMathChecked(true);

    if (selectedMathVariant === selectedMath.togri_javob) {
      completeActivity('masala', selectedMath.id, 20);
    }
  };

  return (
    <div className="space-y-4 pb-28 pt-1">
      
      {/* Banner / Header */}
      <div className="card-rose-banner p-3.5 rounded-2xl relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-1">
          <span className="bg-white/20 text-[#FBBF24] text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3 h-3 text-[#FBBF24]" />
            {t("Bolajon Bo'limi — Intellekt & Ertaklar")}
          </span>
          <h2 className="text-base font-bold tracking-tight text-white">
            {t("Sehrli va Bilimdon Bolajon")} 🧸
          </h2>
          <p className="text-[11px] text-white/90 leading-snug">
            {t("Ertaklar, audio hikoyalar, topishmoqlar va mantiqiy masalalar to'plami.")}
          </p>
        </div>
        <div className="absolute -bottom-2 -right-2 text-6xl opacity-15 pointer-events-none">
          🏰
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="card-pink grid grid-cols-4 gap-1 p-1 rounded-2xl bg-white text-xs">
        <button
          onClick={() => setSubTab('ertaklar')}
          className={`py-2 px-1 rounded-xl font-bold flex flex-col items-center gap-0.5 transition-all text-[10px] sm:text-[11px] ${
            subTab === 'ertaklar'
              ? 'bg-[#DB2777] text-white shadow-xs'
              : 'text-[#9D4C6C] hover:bg-pink-50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t("Ertaklar")}</span>
        </button>

        <button
          onClick={() => setSubTab('audio')}
          className={`py-2 px-1 rounded-xl font-bold flex flex-col items-center gap-0.5 transition-all text-[10px] sm:text-[11px] ${
            subTab === 'audio'
              ? 'bg-[#DB2777] text-white shadow-xs'
              : 'text-[#9D4C6C] hover:bg-pink-50'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span className="flex items-center gap-0.5">
            {t("Audio")}
            <span className="bg-[#F59E0B] text-white text-[8px] font-bold px-1 rounded-full">PRO</span>
          </span>
        </button>

        <button
          onClick={() => setSubTab('oyinlar')}
          className={`py-2 px-1 rounded-xl font-bold flex flex-col items-center gap-0.5 transition-all text-[10px] sm:text-[11px] ${
            subTab === 'oyinlar'
              ? 'bg-[#DB2777] text-white shadow-xs'
              : 'text-[#9D4C6C] hover:bg-pink-50'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>{t("O'yinlar")}</span>
        </button>

        <button
          onClick={() => setSubTab('vazifalar')}
          className={`py-2 px-1 rounded-xl font-bold flex flex-col items-center gap-0.5 transition-all text-[10px] sm:text-[11px] ${
            subTab === 'vazifalar'
              ? 'bg-[#DB2777] text-white shadow-xs'
              : 'text-[#9D4C6C] hover:bg-pink-50'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>{t("Vazifalar")}</span>
        </button>
      </div>

      {/* Age Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] font-bold text-[#8C8479] whitespace-nowrap pl-1">
          {t("Yosh toifasi")}:
        </span>
        {ageOptions.map(age => (
          <button
            key={age}
            onClick={() => setSelectedAgeFilter(age)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
              selectedAgeFilter === age
                ? 'bg-[#2D2A26] text-white shadow-xs'
                : 'bg-[#FAF6EF] text-[#7C746B] hover:bg-[#F2ECE1] border border-[#EFE8DC]'
            }`}
          >
            {age === 'Barchasi' ? t("Barchasi") : `${age} ${t("yosh")}`}
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: ERTAKLAR (READ) */}
      {subTab === 'ertaklar' && (
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          {filteredTales.map(tale => (
            <motion.div
              key={tale.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTale(tale)}
              className="card-3d p-0 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-24 overflow-hidden rounded-t-xl">
                  <img
                    src={tale.muqova_rasm_url}
                    alt={tale.sarlavha}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[8.5px] font-bold px-1.5 py-0.2 rounded-md">
                    {tale.yosh_toifasi} {t("yosh")}
                  </span>
                </div>
                <div className="p-2">
                  <h4 className="font-extrabold text-[11px] text-[#2D2A26] line-clamp-1">
                    {t(tale.sarlavha)}
                  </h4>
                  <p className="text-[9px] text-[#8C8479] mt-0.5">
                    {tale.sahifalar.length} {t("sahifali rangli ertak")}
                  </p>
                </div>
              </div>

              <div className="p-2 pt-0">
                <button className="btn-3d-secondary w-full py-1 text-[10px] flex items-center justify-center gap-0.5">
                  <span>{t("O'qish")}</span>
                  <ChevronRight className="w-3 h-3 text-[#FF6B4A]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* SUB-TAB 2: AUDIO STORYTELLER */}
      {subTab === 'audio' && (
        <div className="space-y-4 pt-1">
          {!user.is_premium && (
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <p className="font-extrabold text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {t("Audio Ertaklar Rejimi")}
                </p>
                <p className="text-[10px] text-amber-800">
                  {t("Farzandingiz uxlashi oldidan tinchlantiruvchi ovozda ertak tinglaydi.")}
                </p>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-[10px] whitespace-nowrap shadow-xs"
              >
                {t("Ochish")} 👑
              </button>
            </div>
          )}

          {/* Premium Audio Player Card */}
          <div className="bg-gradient-to-br from-[#2D2A26] via-[#3D3730] to-[#25221F] p-5 rounded-3xl text-white space-y-4 shadow-xl border border-[#433E38] relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-sm font-black">
                  🎧
                </span>
                <div>
                  <h3 className="font-black text-sm text-amber-100">
                    {t("Ovozli Ertakchi")}
                  </h3>
                  <p className="text-[10px] text-[#C0B7AB]">
                    {t("Ona va Bola Ovozli Pleyeri")}
                  </p>
                </div>
              </div>

              {/* Sleep Timer Button */}
              <button
                onClick={() => setSleepTimer(sleepTimer === 15 ? null : 15)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border transition-all ${
                  sleepTimer
                    ? 'bg-amber-400 text-amber-950 border-amber-300'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <Moon className="w-3 h-3" />
                {sleepTimer ? `15 ${t("daq")}` : t("Uyqu taymeri")}
              </button>
            </div>

            {/* Selected Audio Track Info */}
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
              <img
                src={filteredTales[0]?.muqova_rasm_url || 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80'}
                alt="Track cover"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {t(filteredTales[0]?.sarlavha || "Mehrli quyoncha")}
                </p>
                <p className="text-[10px] text-amber-200/80">
                  {t("Ovozlangan ertak va mayin alla musiqasi")}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/60">
                <span>01:20</span>
                <span>03:45</span>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setAudioSpeed(s => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1))}
                className="text-[10px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-xl"
              >
                {audioSpeed}x {t("Tezlik")}
              </button>

              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-12 h-12 bg-[#FF6B4A] hover:bg-[#E8593A] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                {isPlayingAudio ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <button
                onClick={() => setAudioProgress(0)}
                className="text-[10px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-xl"
              >
                {t("Boshidan")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: INTERACTIVE EDUCATIONAL GAMES */}
      {subTab === 'oyinlar' && (
        <div className="space-y-4 pt-1">
          {/* Game Selection Mode Switcher */}
          <div className="grid grid-cols-3 gap-1.5 bg-[#FAF6EF] p-1.5 rounded-2xl border border-[#EFE8DC] text-xs font-bold">
            <button
              onClick={() => setActiveGame('math')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1 transition-all ${
                activeGame === 'math' ? 'bg-[#FF6B4A] text-white shadow-xs font-black' : 'text-[#6B6359]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t("Matematik")}</span>
            </button>

            <button
              onClick={() => setActiveGame('word')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1 transition-all ${
                activeGame === 'word' ? 'bg-[#FF6B4A] text-white shadow-xs font-black' : 'text-[#6B6359]'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>{t("So'z Zukko")}</span>
            </button>

            <button
              onClick={() => setActiveGame('riddle')}
              className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1 transition-all ${
                activeGame === 'riddle' ? 'bg-[#FF6B4A] text-white shadow-xs font-black' : 'text-[#6B6359]'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>{t("Topishmoqlar")}</span>
            </button>
          </div>

          {/* GAME 1: MATH QUIZ */}
          {activeGame === 'math' && (
            <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FFF8F3] to-[#F5F3FF] p-5 rounded-3xl border border-[#FFD8C8] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#FFD8C8] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF6B4A] text-white flex items-center justify-center shadow-xs text-xl">
                    🔢
                  </div>
                  <div>
                    <h3 className="font-black text-[#2D2A26] text-base">
                      {t("Zukko Matematik O'yini")}
                    </h3>
                    <p className="text-xs text-[#7C746B]">
                      {t("Hisoblash tezligini oshiring va yulduzlar to'plang!")}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-100 text-amber-900 font-extrabold px-3 py-1 rounded-full text-xs border border-amber-200 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{mathScore} {t("ball")}</span>
                </div>
              </div>

              {/* Math Question Card */}
              <div className="bg-white p-6 rounded-3xl border border-[#EFE8DC] text-center space-y-4 shadow-sm">
                <span className="text-xs font-extrabold text-[#8C8479] bg-[#FAF6EF] px-3 py-1 rounded-full border border-[#EFE8DC]">
                  {t("Masalani yeching")}:
                </span>

                <div className="text-4xl font-black text-[#2D2A26] tracking-wider py-2">
                  {mathNum1} {mathOp} {mathNum2} = ?
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {mathOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleMathAnswer(opt)}
                      className="py-3.5 bg-[#FAF6EF] hover:bg-[#FF6B4A] hover:text-white text-[#2D2A26] text-lg font-black rounded-2xl border border-[#EFE8DC] shadow-2xs active:scale-95 transition-all min-h-[48px]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {mathFeedback && (
                  <div className={`p-3 rounded-2xl text-xs font-black animate-in fade-in ${
                    mathFeedback.includes('Barakalla') ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}>
                    {mathFeedback}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* GAME 2: WORD PUZZLE */}
          {activeGame === 'word' && (
            <div className="bg-gradient-to-br from-[#FFFDF9] via-[#F5F3FF] to-[#FFF5EE] p-5 rounded-3xl border border-[#D8B4FE] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#D8B4FE] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs text-xl">
                    🔤
                  </div>
                  <div>
                    <h3 className="font-black text-[#2D2A26] text-base">
                      {t("So'z Zukko (Tushib qolgan harf)")}
                    </h3>
                    <p className="text-xs text-[#7C746B]">
                      {t("So'z boyligini oshirish uchun to'g'ri harfni tanlang!")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Word Card */}
              <div className="bg-white p-5 rounded-3xl border border-[#EFE8DC] text-center space-y-4 shadow-sm">
                <p className="text-xs text-[#8C8479] font-bold">
                  💡 {t("Ishora")}: "{wordPuzzles[wordIdx].hint}"
                </p>

                {/* Letter Display */}
                <div className="flex justify-center items-center gap-2 py-3">
                  {wordPuzzles[wordIdx].word.split('').map((char, idx) => {
                    const isMissing = idx === wordPuzzles[wordIdx].missingIndex;
                    return (
                      <div
                        key={idx}
                        className={`w-11 h-12 rounded-2xl border-2 flex items-center justify-center font-black text-xl shadow-xs ${
                          isMissing
                            ? 'bg-purple-100 border-purple-500 text-purple-700 animate-pulse'
                            : 'bg-[#FAF6EF] border-[#EFE8DC] text-[#2D2A26]'
                        }`}
                      >
                        {isMissing ? '?' : char}
                      </div>
                    );
                  })}
                </div>

                {/* Letter Choice Buttons */}
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {wordPuzzles[wordIdx].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleWordChoice(opt)}
                      className="py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-black rounded-2xl shadow-xs active:scale-95 transition-all min-h-[48px]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {wordFeedback && (
                  <div className={`p-3 rounded-2xl text-xs font-black animate-in fade-in ${
                    wordFeedback.includes('Zukkosiz') ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}>
                    {wordFeedback}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* GAME 3: RIDDLES LIST */}
          {activeGame === 'riddle' && (
            <div className="space-y-3">
              {filteredRiddles.map((riddle, idx) => {
                const isDone = completedItemIds.includes(riddle.id);
                return (
                  <div
                    key={riddle.id}
                    className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-[#FF6B4A] bg-[#FFF0EC] px-2.5 py-0.5 rounded-full">
                        🧩 {t("Topishmoq")} #{idx + 1}
                      </span>
                      <span className="text-[10px] text-[#8C8479] font-medium">
                        {riddle.yosh_toifasi} {t("yosh")}
                      </span>
                    </div>

                    <p className="font-bold text-sm text-[#2D2A26] leading-relaxed">
                      "{t(riddle.savol)}"
                    </p>

                    <button
                      onClick={() => {
                        setSelectedRiddle(riddle);
                        setSelectedVariant(null);
                        setIsAnswerChecked(false);
                      }}
                      className={`w-full py-2.5 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-1 ${
                        isDone
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-[#2D2A26] text-white hover:bg-[#433E38]'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {t("Yechilgan (+15 ball)")}
                        </>
                      ) : (
                        t("Javobni topish")
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: KUNLIK VAZIFALAR (ROUTINE TASKS) */}
      {subTab === 'vazifalar' && (
        <div className="space-y-4 pt-1">
          <div className="bg-gradient-to-br from-[#FFFDF9] via-[#F0FDF4] to-[#ECFDF5] p-5 rounded-3xl border border-emerald-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs text-xl">
                  📋
                </div>
                <div>
                  <h3 className="font-black text-[#2D2A26] text-base">
                    {t("Oila Kun Tartibi & Odob Vazifalari")}
                  </h3>
                  <p className="text-xs text-[#7C746B]">
                    {t("Bajarilgan har bir ezgu dars va vazifa uchun ball olasiz!")}
                  </p>
                </div>
              </div>

              <span className="bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1 rounded-full text-xs border border-emerald-300">
                {routineTasks.filter(t => t.bajarildi).length} / {routineTasks.length} {t("bajarildi")}
              </span>
            </div>

            {/* Task list */}
            <div className="space-y-2 pt-1">
              {routineTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleRoutineTask(task.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    task.bajarildi
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 line-through opacity-85'
                      : 'bg-white border-[#EFE8DC] hover:border-emerald-500 text-[#2D2A26] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{task.icon}</span>
                    <div>
                      <h4 className="font-black text-xs">{t(task.nomi)}</h4>
                      <p className="text-[10px] text-[#7C746B] mt-0.5">
                        +{task.ball} {t("ball va tarbiya streaki")} ⭐
                      </p>
                    </div>
                  </div>

                  <div className={`w-7 h-7 rounded-xl border flex items-center justify-center text-white transition-all ${
                    task.bajarildi ? 'bg-emerald-600 border-emerald-600' : 'bg-stone-50 border-stone-300'
                  }`}>
                    {task.bajarildi && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MASALALAR */}
      {subTab === 'masalalar' && (
        <div className="space-y-3 pt-1">
          {filteredMath.map((math, idx) => {
            const isDone = completedItemIds.includes(math.id);
            return (
              <div
                key={math.id}
                className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    🔢 {t("Mantiqiy masala")} #{idx + 1}
                  </span>
                  <span className="text-[10px] text-[#8C8479] font-medium">
                    {math.yosh_toifasi} {t("yosh")}
                  </span>
                </div>

                <p className="font-bold text-sm text-[#2D2A26] leading-relaxed">
                  {t(math.savol)}
                </p>

                <button
                  onClick={() => {
                    setSelectedMath(math);
                    setSelectedMathVariant(null);
                    setIsMathChecked(false);
                  }}
                  className={`w-full py-2.5 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-1 ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {t("To'g'ri yechilgan (+20 ball)")}
                    </>
                  ) : (
                    t("Masalani yechish")
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* TALE READER FULLSCREEN MODAL */}
      {selectedTale && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
          <div className="bg-[#FFFDF9] w-full max-w-md rounded-3xl p-5 space-y-4 border border-[#EFE8DC] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedTale(null)}
              className="absolute top-3 right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-bold"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                {selectedTale.yosh_toifasi} {t("yoshli ertak")}
              </span>
              <h3 className="text-lg font-black text-[#2D2A26]">
                {selectedTale.sarlavha}
              </h3>
            </div>

            {/* Current Page Image & Text */}
            {selectedTale.sahifalar[currentPageIndex] && (
              <div className="space-y-3">
                <img
                  src={selectedTale.sahifalar[currentPageIndex].rasm_url}
                  alt="Tale page"
                  className="w-full h-48 object-cover rounded-2xl border border-[#EFE8DC]"
                />
                <div className="bg-[#FAF6EF] p-4 rounded-2xl border border-[#EFE8DC] text-xs text-[#2D2A26] leading-relaxed font-medium">
                  {selectedTale.sahifalar[currentPageIndex].matn}
                </div>
              </div>
            )}

            {/* Pagination controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentPageIndex === 0}
                onClick={() => setCurrentPageIndex(prev => prev - 1)}
                className="px-4 py-2 bg-gray-100 disabled:opacity-40 text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                {t("Oldingi")}
              </button>

              <span className="text-xs font-extrabold text-[#7C746B]">
                {currentPageIndex + 1} / {selectedTale.sahifalar.length}
              </span>

              {currentPageIndex < selectedTale.sahifalar.length - 1 ? (
                <button
                  onClick={() => setCurrentPageIndex(prev => prev + 1)}
                  className="px-4 py-2 bg-[#FF6B4A] text-white text-xs font-bold rounded-xl flex items-center gap-1"
                >
                  {t("Keyingi")}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    completeActivity('ertak', selectedTale.id, 25);
                    setSelectedTale(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  {t("Tugatish (+25 ball)")} ✅
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RIDDLE SOLVER MODAL */}
      {selectedRiddle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-[#FFFDF9] w-full max-w-sm rounded-3xl p-5 space-y-4 border border-[#EFE8DC] shadow-2xl relative">
            <button
              onClick={() => setSelectedRiddle(null)}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <h3 className="text-sm font-extrabold text-[#FF6B4A]">
              🧩 {t("Topishmoq javobini belgilang")}
            </h3>

            <p className="font-black text-base text-[#2D2A26] leading-snug">
              "{selectedRiddle.savol}"
            </p>

            <div className="space-y-2 pt-1">
              {selectedRiddle.variantlar.map(variant => {
                const isSelected = selectedVariant === variant;
                let btnStyle = 'bg-white border-[#EFE8DC] text-[#2D2A26]';

                if (isAnswerChecked) {
                  if (variant === selectedRiddle.javob) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-[#FFF0EC] border-[#FF6B4A] text-[#FF6B4A] font-extrabold';
                }

                return (
                  <button
                    key={variant}
                    onClick={() => handleRiddleOptionClick(variant)}
                    className={`w-full p-3 text-xs rounded-2xl border text-left transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{variant}</span>
                    {isAnswerChecked && variant === selectedRiddle.javob && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswerChecked && selectedRiddle.izoh && (
              <div className="bg-[#FAF6EF] p-3 rounded-2xl border border-[#EFE8DC] text-[11px] text-[#6B6359]">
                💡 <b>{t("Izoh")}:</b> {selectedRiddle.izoh}
              </div>
            )}

            {!isAnswerChecked ? (
              <button
                disabled={!selectedVariant}
                onClick={handleCheckRiddle}
                className="w-full py-3 bg-[#FF6B4A] disabled:opacity-50 text-white text-xs font-black rounded-2xl shadow-md"
              >
                {t("Tekshirish")} →
              </button>
            ) : (
              <button
                onClick={() => setSelectedRiddle(null)}
                className="w-full py-3 bg-[#2D2A26] text-white text-xs font-bold rounded-2xl"
              >
                {t("Yopish")}
              </button>
            )}
          </div>
        </div>
      )}

      {/* MATH SOLVER MODAL */}
      {selectedMath && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-[#FFFDF9] w-full max-w-sm rounded-3xl p-5 space-y-4 border border-[#EFE8DC] shadow-2xl relative">
            <button
              onClick={() => setSelectedMath(null)}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <h3 className="text-sm font-extrabold text-indigo-600">
              🔢 {t("Mantiqiy masalani yeching")}
            </h3>

            <p className="font-black text-sm text-[#2D2A26] leading-relaxed">
              {selectedMath.savol}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[selectedMath.togri_javob, ...selectedMath.notogri_variantlar]
                .sort()
                .map(variant => {
                  const isSelected = selectedMathVariant === variant;
                  let btnStyle = 'bg-white border-[#EFE8DC] text-[#2D2A26]';

                  if (isMathChecked) {
                    if (variant === selectedMath.togri_javob) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-700 font-extrabold';
                  }

                  return (
                    <button
                      key={variant}
                      onClick={() => !isMathChecked && setSelectedMathVariant(variant)}
                      className={`p-3 text-xs rounded-2xl border text-center transition-all ${btnStyle}`}
                    >
                      {variant}
                    </button>
                  );
                })}
            </div>

            {isMathChecked && selectedMath.tushuntirish && (
              <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100 text-[11px] text-indigo-900">
                ✏️ <b>{t("Tushuntirish")}:</b> {selectedMath.tushuntirish}
              </div>
            )}

            {!isMathChecked ? (
              <button
                disabled={!selectedMathVariant}
                onClick={handleCheckMath}
                className="w-full py-3 bg-indigo-600 disabled:opacity-50 text-white text-xs font-black rounded-2xl shadow-md"
              >
                {t("Tekshirish")} →
              </button>
            ) : (
              <button
                onClick={() => setSelectedMath(null)}
                className="w-full py-3 bg-[#2D2A26] text-white text-xs font-bold rounded-2xl"
              >
                {t("Yopish")}
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
