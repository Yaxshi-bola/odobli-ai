import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Recipe, Tale, Lifehack, Riddle, Ingredient } from '../types';
import {
  Shield,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  ArrowLeft,
  Database,
  Sparkles,
  Trash2,
  Edit3,
  Lock,
  Unlock,
  Download,
  Users,
  BookOpen,
  Utensils,
  Zap,
  HelpCircle,
  Award,
  Search,
  Filter,
  Check,
  TrendingUp,
  DollarSign,
  AlertCircle,
  X,
  Clock,
  Layers
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    user,
    progress,
    paymentProofs,
    verifyPaymentProof,
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleRecipeStatus,
    tales,
    addTale,
    updateTale,
    deleteTale,
    toggleTaleStatus,
    lifehacks,
    addLifehack,
    deleteLifehack,
    toggleLifehackStatus,
    riddles,
    addRiddle,
    deleteRiddle,
    ingredients,
    addIngredient,
    grantUserPremium,
    exportBackupData,
    setActiveTab,
    t
  } = useApp();

  // Security Lock Gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Sub-tabs navigation
  const [activeAdminTab, setActiveAdminTab] = useState<
    'dashboard' | 'payments' | 'recipes' | 'tales' | 'lifehacks' | 'users'
  >('dashboard');

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Modals & Form States
  const [selectedProofPreview, setSelectedProofPreview] = useState<string | null>(null);
  
  // Recipe Form State
  const [showRecipeModal, setShowRecipeModal] = useState<boolean>(false);
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);
  const [recipeTitle, setRecipeTitle] = useState<string>('');
  const [recipeTime, setRecipeTime] = useState<number>(30);
  const [recipeDiff, setRecipeDiff] = useState<'oson' | 'orta' | 'qiyin'>('oson');
  const [recipeImage, setRecipeImage] = useState<string>('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');
  const [recipeDesc, setRecipeDesc] = useState<string>('');
  const [recipeIngredientsText, setRecipeIngredientsText] = useState<string>('');
  const [recipeInstructionsText, setRecipeInstructionsText] = useState<string>('');

  // Tale Form State
  const [showTaleModal, setShowTaleModal] = useState<boolean>(false);
  const [taleTitle, setTaleTitle] = useState<string>('');
  const [taleAgeGroup, setTaleAgeGroup] = useState<'3-5' | '6-8' | '9-12'>('3-5');
  const [taleCover, setTaleCover] = useState<string>('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80');
  const [taleContentText, setTaleContentText] = useState<string>('');

  // Lifehack Form State
  const [showLifehackModal, setShowLifehackModal] = useState<boolean>(false);
  const [lifehackTitle, setLifehackTitle] = useState<string>('');
  const [lifehackCategory, setLifehackCategory] = useState<'karving' | 'oyinchoq_yasash' | 'uy_ishlari' | 'boshqa'>('karving');
  const [lifehackDesc, setLifehackDesc] = useState<string>('');
  const [lifehackImage, setLifehackImage] = useState<string>('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80');

  // Riddle Form State
  const [showRiddleModal, setShowRiddleModal] = useState<boolean>(false);
  const [riddleQuestion, setRiddleQuestion] = useState<string>('');
  const [riddleAnswer, setRiddleAnswer] = useState<string>('');
  const [riddleOptions, setRiddleOptions] = useState<string>('Javob A, Javob B, Javob C');
  const [riddleAgeGroup, setRiddleAgeGroup] = useState<'3-5' | '6-8' | '9-12'>('3-5');

  // PIN Unlock Verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '7777') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Recipe Handlers
  const handleOpenRecipeModal = (recipeToEdit?: Recipe) => {
    if (recipeToEdit) {
      setEditingRecipeId(recipeToEdit.id);
      setRecipeTitle(recipeToEdit.nomi);
      setRecipeTime(recipeToEdit.tayyorlash_vaqti_daq);
      setRecipeDiff(recipeToEdit.qiyinlik);
      setRecipeImage(recipeToEdit.rasm_url);
      setRecipeDesc(recipeToEdit.tarif_matni);
      setRecipeIngredientsText(recipeToEdit.masalliqlar_matni || '');
      setRecipeInstructionsText(recipeToEdit.korsatmalari?.join('\n') || '');
    } else {
      setEditingRecipeId(null);
      setRecipeTitle('');
      setRecipeTime(25);
      setRecipeDiff('oson');
      setRecipeImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');
      setRecipeDesc('');
      setRecipeIngredientsText('Kartoshka, Sabzi, Piyoz, Ziravorlar');
      setRecipeInstructionsText('1. Masalliqlarni to`g`rang.\n2. Past olovda pishiring.');
    }
    setShowRecipeModal(true);
  };

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeTitle.trim()) return;

    const instructionsArray = recipeInstructionsText
      .split('\n')
      .map(i => i.trim())
      .filter(Boolean);

    if (editingRecipeId) {
      const existing = recipes.find(r => r.id === editingRecipeId);
      if (existing) {
        updateRecipe({
          ...existing,
          nomi: recipeTitle.trim(),
          tayyorlash_vaqti_daq: Number(recipeTime),
          qiyinlik: recipeDiff,
          rasm_url: recipeImage || existing.rasm_url,
          tarif_matni: recipeDesc || existing.tarif_matni,
          masalliqlar_matni: recipeIngredientsText,
          korsatmalari: instructionsArray.length > 0 ? instructionsArray : existing.korsatmalari
        });
      }
    } else {
      const newRec: Recipe = {
        id: `rec_${Date.now()}`,
        nomi: recipeTitle.trim(),
        tayyorlash_vaqti_daq: Number(recipeTime),
        qiyinlik: recipeDiff,
        rasm_url: recipeImage,
        tarif_matni: recipeDesc || 'Admin tomonidan qo`shilgan retsept.',
        masalliqlar_matni: recipeIngredientsText || 'Barcha ziravor va masalliqlar',
        korsatmalari: instructionsArray.length > 0 ? instructionsArray : ['Masalliqlarni tayyorlang', 'Past olovda 30 daqiqa dimlang'],
        holat: 'nashr',
        required_ingredient_ids: ['ing_kartoshka', 'ing_piyoz']
      };
      addRecipe(newRec);
    }
    setShowRecipeModal(false);
  };

  // Tale Save Handler
  const handleSaveTale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taleTitle.trim()) return;

    const newTale: Tale = {
      id: `tale_${Date.now()}`,
      sarlavha: taleTitle.trim(),
      yosh_toifasi: taleAgeGroup,
      muqova_rasm_url: taleCover,
      holat: 'nashr',
      muallif: 'Odobli.ai Jamoasi',
      sahifalar: [
        {
          id: `p1_${Date.now()}`,
          ertak_id: `tale_${Date.now()}`,
          tartib_raqami: 1,
          rasm_url: taleCover,
          matn: taleContentText || 'Bir bor ekan, bir yo`q ekan...'
        }
      ],
      created_at: new Date().toISOString()
    };

    addTale(newTale);
    setTaleTitle('');
    setTaleContentText('');
    setShowTaleModal(false);
  };

  // Lifehack Save Handler
  const handleSaveLifehack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lifehackTitle.trim()) return;

    addLifehack({
      id: `lh_${Date.now()}`,
      sarlavha: lifehackTitle.trim(),
      tavsif_matni: lifehackDesc || 'Foydali oilaviy maslahat.',
      rasm_url: lifehackImage,
      kategoriya: lifehackCategory,
      holat: 'nashr'
    });

    setLifehackTitle('');
    setLifehackDesc('');
    setShowLifehackModal(false);
  };

  // Riddle Save Handler
  const handleSaveRiddle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riddleQuestion.trim() || !riddleAnswer.trim()) return;

    const optionsArray = riddleOptions.split(',').map(o => o.trim()).filter(Boolean);
    if (!optionsArray.includes(riddleAnswer.trim())) {
      optionsArray.push(riddleAnswer.trim());
    }

    addRiddle({
      id: `rid_${Date.now()}`,
      savol: riddleQuestion.trim(),
      javob: riddleAnswer.trim(),
      variantlar: optionsArray,
      yosh_toifasi: riddleAgeGroup,
      qiyinlik: 'oson'
    });

    setRiddleQuestion('');
    setRiddleAnswer('');
    setShowRiddleModal(false);
  };

  // Lock Screen view
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-[#EFE8DC] shadow-xl max-w-sm w-full text-center space-y-4">
          <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#2D2A26]">Admin Kirish Himoyasi</h3>
            <p className="text-xs text-[#7C746B] mt-1">
              Boshqaruv paneliga kirish uchun PIN-kodni kiriting (Standart: 1234)
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-3 pt-2">
            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              value={pinInput}
              onChange={e => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              className="w-full text-center text-2xl font-black tracking-widest py-3 px-4 rounded-2xl border border-[#EFE8DC] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]"
            />

            {pinError && (
              <p className="text-xs text-rose-600 font-bold flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Noto'g'ri PIN-kod! Qaytadan urinib ko'ring.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#FF6B4A] to-[#FF8E72] text-white font-extrabold rounded-2xl shadow-md hover:opacity-95 transition-opacity"
            >
              Kirish va Boshqarish
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const pendingPaymentsCount = paymentProofs.filter(p => p.holat === 'kutilmoqda').length;
  const totalApprovedPaymentsSum = paymentProofs
    .filter(p => p.holat === 'tasdiqlangan')
    .reduce((sum, p) => sum + p.summa, 0);

  return (
    <div className="space-y-6 pb-28 pt-2">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1A1816] via-[#2D2A26] to-[#433E38] p-5 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
          <Shield className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                <Database className="w-3 h-3" />
                Supabase Sync Ready
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                v2.0 Admin Hub
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Boshqaruv Markazi
            </h2>
            <p className="text-xs text-[#D1C9BD] mt-1 max-w-md">
              Barcha kontentlar, to'lovlar va foydalanuvchilar ma'lumotlarini real vaqt rejimida boshqaring.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportBackupData}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-xs"
              title="Barcha ma'lumotlarni JSON faylda yuklab olish"
            >
              <Download className="w-4 h-4 text-amber-400" />
              Backup (JSON)
            </button>

            <button
              onClick={() => setActiveTab('profil')}
              className="p-2.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-200 rounded-2xl text-xs font-bold transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Chiqish
            </button>
          </div>
        </div>
      </div>

      {/* Main Sub-Navigation Bar */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 bg-[#FAF6EF] p-1.5 rounded-2xl border border-[#EFE8DC] shadow-inner">
        <button
          onClick={() => setActiveAdminTab('dashboard')}
          className={`py-2 px-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'dashboard'
              ? 'bg-[#2D2A26] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Metrikalar
        </button>

        <button
          onClick={() => setActiveAdminTab('payments')}
          className={`py-2 px-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 relative ${
            activeAdminTab === 'payments'
              ? 'bg-[#FF6B4A] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          To'lovlar
          {pendingPaymentsCount > 0 && (
            <span className="ml-1 bg-amber-400 text-amber-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {pendingPaymentsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('recipes')}
          className={`py-2 px-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'recipes'
              ? 'bg-[#FF6B4A] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          Retseptlar ({recipes.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('tales')}
          className={`py-2 px-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'tales'
              ? 'bg-[#FF6B4A] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Ertaklar ({tales.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('lifehacks')}
          className={`py-2 px-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'lifehacks'
              ? 'bg-[#FF6B4A] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Lifehacklar
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`py-2 px-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1 ${
            activeAdminTab === 'users'
              ? 'bg-[#FF6B4A] text-white shadow-sm'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Foydalanuvchi
        </button>
      </div>

      {/* SECTION 1: DASHBOARD METRICS */}
      {activeAdminTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-1">
              <span className="text-[10px] font-extrabold text-[#8C8479] uppercase tracking-wider">Foydalanuvchilar</span>
              <div className="text-2xl font-black text-[#2D2A26] flex items-center justify-between">
                <span>1,420</span>
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12% bu hafta
              </p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-1">
              <span className="text-[10px] font-extrabold text-[#8C8479] uppercase tracking-wider">Kutilayotgan Cheklar</span>
              <div className="text-2xl font-black text-[#2D2A26] flex items-center justify-between">
                <span>{pendingPaymentsCount}</span>
                <Clock className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-[11px] text-[#7C746B] font-bold">
                Ko'rib chiqish kutilmoqda
              </p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-1">
              <span className="text-[10px] font-extrabold text-[#8C8479] uppercase tracking-wider">Tasdiqlangan Tushum</span>
              <div className="text-xl font-black text-emerald-700 flex items-center justify-between">
                <span>{totalApprovedPaymentsSum.toLocaleString()} so'm</span>
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-[11px] text-emerald-600 font-bold">
                Jami obuna to'lovlari
              </p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-1">
              <span className="text-[10px] font-extrabold text-[#8C8479] uppercase tracking-wider">Jami Kontentlar</span>
              <div className="text-2xl font-black text-[#2D2A26] flex items-center justify-between">
                <span>{recipes.length + tales.length + lifehacks.length}</span>
                <Layers className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-[11px] text-purple-600 font-bold">
                Retsept, Ertak va Hacklar
              </p>
            </div>
          </div>

          {/* Quick System Action Cards */}
          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-3">
            <h3 className="text-sm font-black text-[#2D2A26] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6B4A]" />
              Tezkor Boshqaruv Buyruqlari
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => handleOpenRecipeModal()}
                className="p-3 bg-[#FAF6EF] hover:bg-[#F3ECE0] rounded-2xl border border-[#EFE8DC] text-left transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
                  ➕
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2D2A26]">Yangi Retsept Qo'shish</h4>
                  <p className="text-[10px] text-[#7C746B]">Pazanda AI va qidiruvga qo'shiladi</p>
                </div>
              </button>

              <button
                onClick={() => setShowTaleModal(true)}
                className="p-3 bg-[#FAF6EF] hover:bg-[#F3ECE0] rounded-2xl border border-[#EFE8DC] text-left transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-center font-bold">
                  📖
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2D2A26]">Yangi Ertak Nashr Etish</h4>
                  <p className="text-[10px] text-[#7C746B]">Sehrli bolajon bo'limiga tushadi</p>
                </div>
              </button>

              <button
                onClick={() => grantUserPremium(30)}
                className="p-3 bg-[#FAF6EF] hover:bg-[#F3ECE0] rounded-2xl border border-[#EFE8DC] text-left transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
                  👑
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#2D2A26]">1 Oy Premium Berish</h4>
                  <p className="text-[10px] text-[#7C746B]">Hozirgi foydalanuvchiga obuna aktivlash</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PAYMENTS VERIFICATION INBOX */}
      {activeAdminTab === 'payments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-[#2D2A26] text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              To'lov cheklari so'rovlari
            </h3>
            <span className="text-xs font-bold text-[#8C8479]">
              Jami: {paymentProofs.length} ta chek
            </span>
          </div>

          {paymentProofs.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-[#EFE8DC] text-center text-xs text-[#8C8479] space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="font-bold text-[#2D2A26]">Barcha to'lov so'rovlari ko'rib chiqilgan!</p>
              <p>Hozircha kutilayotgan yangi to'lov cheklari yo'q.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paymentProofs.map(proof => (
                <div
                  key={proof.id}
                  className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-xs space-y-3 relative"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-extrabold text-[#2D2A26] text-sm block">
                        {proof.summa.toLocaleString()} so'm
                      </span>
                      <span className="text-[10px] text-[#8C8479]">
                        ID: {proof.id} • {new Date(proof.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <span
                      className={`font-extrabold px-3 py-1 rounded-full text-[10px] ${
                        proof.holat === 'tasdiqlangan'
                          ? 'bg-emerald-100 text-emerald-800'
                          : proof.holat === 'rad_etilgan'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}
                    >
                      {proof.holat}
                    </span>
                  </div>

                  {proof.screenshot_preview_url && (
                    <div className="relative group rounded-2xl overflow-hidden border border-[#EFE8DC] bg-gray-50 h-36">
                      <img
                        src={proof.screenshot_preview_url}
                        alt="Proof"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedProofPreview(proof.screenshot_preview_url!)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1"
                      >
                        <Eye className="w-4 h-4" /> Kattalashtirish
                      </button>
                    </div>
                  )}

                  {proof.holat === 'kutilmoqda' && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => verifyPaymentProof(proof.id, 'tasdiqlangan')}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs"
                      >
                        <CheckCircle className="w-4 h-4" />
                        ✅ Tasdiqlash
                      </button>
                      <button
                        onClick={() => verifyPaymentProof(proof.id, 'rad_etilgan')}
                        className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        ❌ Rad etish
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: RECIPES MANAGER */}
      {activeAdminTab === 'recipes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8C8479]" />
              <input
                type="text"
                placeholder="Retsept nomini qidirish..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#EFE8DC] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>
            <button
              onClick={() => handleOpenRecipeModal()}
              className="px-3.5 py-2 bg-[#FF6B4A] hover:bg-[#E55A39] text-white text-xs font-extrabold rounded-2xl flex items-center gap-1 shadow-xs transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              Yangi retsept
            </button>
          </div>

          <div className="space-y-2">
            {recipes
              .filter(r => r.nomi.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(recipe => (
                <div
                  key={recipe.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#EFE8DC] flex items-center justify-between gap-3 text-xs shadow-2xs hover:border-[#FF6B4A]/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={recipe.rasm_url}
                      alt={recipe.nomi}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EFE8DC]"
                    />
                    <div>
                      <h4 className="font-extrabold text-[#2D2A26]">{recipe.nomi}</h4>
                      <p className="text-[11px] text-[#7C746B] mt-0.5">
                        ⏱️ {recipe.tayyorlash_vaqti_daq} daq • Qiyinlik: {recipe.qiyinlik}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleRecipeStatus(recipe.id)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold transition-colors ${
                        recipe.holat === 'nashr'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {recipe.holat === 'nashr' ? 'Nashr qilingan' : 'Qoralama'}
                    </button>

                    <button
                      onClick={() => handleOpenRecipeModal(recipe)}
                      className="p-1.5 bg-[#FAF6EF] hover:bg-amber-100 text-amber-800 rounded-xl transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* SECTION 4: TALES MANAGER */}
      {activeAdminTab === 'tales' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-[#2D2A26] text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              Sehrli Ertaklar Bazasi
            </h3>
            <button
              onClick={() => setShowTaleModal(true)}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold rounded-2xl flex items-center gap-1 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              Yangi Ertak
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tales.map(tale => (
              <div
                key={tale.id}
                className="bg-white p-4 rounded-3xl border border-[#EFE8DC] space-y-3 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={tale.muqova_rasm_url}
                    alt={tale.sarlavha}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#EFE8DC]"
                  />
                  <div>
                    <h4 className="font-black text-[#2D2A26] text-sm">{tale.sarlavha}</h4>
                    <p className="text-[11px] text-[#7C746B]">
                      👶 {tale.yosh_toifasi} yosh • 📄 {tale.sahifalar.length} sahifa
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#F3ECE0]">
                  <button
                    onClick={() => toggleTaleStatus(tale.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      tale.holat === 'nashr'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tale.holat}
                  </button>

                  <button
                    onClick={() => deleteTale(tale.id)}
                    className="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> O'chirish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: LIFEHACKS & RIDDLES */}
      {activeAdminTab === 'lifehacks' && (
        <div className="space-y-6">
          {/* Lifehacks Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#2D2A26] text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Foydali Lifehacklar
              </h3>
              <button
                onClick={() => setShowLifehackModal(true)}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold rounded-2xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Hack qo'shish
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {lifehacks.map(lh => (
                <div key={lh.id} className="bg-white p-3.5 rounded-2xl border border-[#EFE8DC] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-[#2D2A26] block">{lh.sarlavha}</span>
                    <span className="text-[10px] text-[#8C8479]">Kategoriya: {lh.kategoriya}</span>
                  </div>
                  <button
                    onClick={() => deleteLifehack(lh.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Riddles Box */}
          <div className="space-y-3 pt-2 border-t border-[#EFE8DC]">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#2D2A26] text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-500" />
                Mantiqiy Topishmoqlar ({riddles.length})
              </h3>
              <button
                onClick={() => setShowRiddleModal(true)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-2xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Topishmoq qo'shish
              </button>
            </div>

            <div className="space-y-2">
              {riddles.map(riddle => (
                <div key={riddle.id} className="bg-white p-3 rounded-2xl border border-[#EFE8DC] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#2D2A26]">❓ {riddle.savol}</p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-0.5">✅ Javob: {riddle.javob}</p>
                  </div>
                  <button
                    onClick={() => deleteRiddle(riddle.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: USER MANAGEMENT */}
      {activeAdminTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-[#EFE8DC] space-y-3">
            <h3 className="font-extrabold text-[#2D2A26] text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Bosh foydalanuvchi profil ma'lumotlari
            </h3>

            <div className="p-3 bg-[#FAF6EF] rounded-2xl border border-[#EFE8DC] text-xs space-y-1">
              <p><strong>Ismi:</strong> {user.ism}</p>
              <p><strong>Telegram ID:</strong> {user.telegram_id}</p>
              <p><strong>Premium Status:</strong> {user.is_premium ? '👑 Aktiv (Premium)' : 'Standart (Bepul)'}</p>
              <p><strong>Jami To'plagan Ballari:</strong> {progress.jami_ball} ball</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => grantUserPremium(30)}
                className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                +30 Kun Premium Bepul Berish
              </button>

              <button
                onClick={() => grantUserPremium(365)}
                className="px-3 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                +1 Yillik VIP Obuna Berish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECIPE MODAL EDITOR */}
      {showRecipeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-3xl max-w-md w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-sm text-[#2D2A26]">
                {editingRecipeId ? "Retseptni Tahrirlash" : "Yangi Retsept Qo'shish"}
              </h3>
              <button onClick={() => setShowRecipeModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecipe} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Retsept nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Qovurma Shurva"
                  value={recipeTitle}
                  onChange={e => setRecipeTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#2D2A26] block mb-1">Vaqti (daq)</label>
                  <input
                    type="number"
                    value={recipeTime}
                    onChange={e => setRecipeTime(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#2D2A26] block mb-1">Qiyinlik</label>
                  <select
                    value={recipeDiff}
                    onChange={e => setRecipeDiff(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="oson">Oson</option>
                    <option value="orta">O'rta</option>
                    <option value="qiyin">Qiyin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Rasm URL</label>
                <input
                  type="url"
                  value={recipeImage}
                  onChange={e => setRecipeImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Masalliqlar (Vergul bilan)</label>
                <input
                  type="text"
                  value={recipeIngredientsText}
                  onChange={e => setRecipeIngredientsText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Pishirish Yo'riqnomasi (Har bir qatorda bitta bosqich)</label>
                <textarea
                  rows={3}
                  value={recipeInstructionsText}
                  onChange={e => setRecipeInstructionsText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6B4A] hover:bg-[#E55A39] text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
              >
                Saqlash va Nashr Etish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TALE MODAL EDITOR */}
      {showTaleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-sm text-[#2D2A26]">Yangi Sehrli Ertak Qo'shish</h3>
              <button onClick={() => setShowTaleModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTale} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Ertak Sarlavhasi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Zumrad va Qimmat"
                  value={taleTitle}
                  onChange={e => setTaleTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Yosh Toifasi</label>
                <select
                  value={taleAgeGroup}
                  onChange={e => setTaleAgeGroup(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="3-5">3-5 yosh</option>
                  <option value="6-8">6-8 yosh</option>
                  <option value="9-12">9-12 yosh</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Ertak Matni (1-sahifa)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Bir bor ekan, bir yo'q ekan..."
                  value={taleContentText}
                  onChange={e => setTaleContentText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
              >
                Ertakni Nashr Qilish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LIFEHACK MODAL */}
      {showLifehackModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-3xl max-w-md w-full space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-sm text-[#2D2A26]">Yangi Lifehack Qo'shish</h3>
              <button onClick={() => setShowLifehackModal(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLifehack} className="space-y-3">
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Sarlavha</label>
                <input
                  type="text"
                  required
                  placeholder="Sabzavotlarni tez va chiroyli to'g'rash"
                  value={lifehackTitle}
                  onChange={e => setLifehackTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Kategoriya</label>
                <select
                  value={lifehackCategory}
                  onChange={e => setLifehackCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="karving">Karving</option>
                  <option value="oyinchoq_yasash">O'yinchoq yasash</option>
                  <option value="uy_ishlari">Uy ishlari</option>
                  <option value="boshqa">Boshqa</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Maslahat matni</label>
                <textarea
                  rows={3}
                  value={lifehackDesc}
                  onChange={e => setLifehackDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl"
              >
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RIDDLE MODAL */}
      {showRiddleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-3xl max-w-md w-full space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-sm text-[#2D2A26]">Yangi Topishmoq Qo'shish</h3>
              <button onClick={() => setShowRiddleModal(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRiddle} className="space-y-3">
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Topishmoq savoli *</label>
                <input
                  type="text"
                  required
                  placeholder="Uzun bo'yli, qizil qalpoqli..."
                  value={riddleQuestion}
                  onChange={e => setRiddleQuestion(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">To'g'ri javob *</label>
                <input
                  type="text"
                  required
                  placeholder="Sabzi"
                  value={riddleAnswer}
                  onChange={e => setRiddleAnswer(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-[#2D2A26] block mb-1">Variantlar (Vergul bilan ajrating)</label>
                <input
                  type="text"
                  placeholder="Sabzi, Kartoshka, Bodring"
                  value={riddleOptions}
                  onChange={e => setRiddleOptions(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl"
              >
                Topishmoqni Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SCREENSHOT ZOOM MODAL */}
      {selectedProofPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white p-2 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedProofPreview(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedProofPreview}
              alt="Full Proof"
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
