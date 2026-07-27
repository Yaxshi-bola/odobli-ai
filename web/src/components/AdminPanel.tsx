import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Recipe, Tale, Lifehack } from '../types';
import { Shield, CheckCircle, XCircle, Plus, Eye, ArrowLeft, Database, Sparkles } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    paymentProofs,
    verifyPaymentProof,
    recipes,
    addRecipe,
    toggleRecipeStatus,
    tales,
    lifehacks,
    setActiveTab,
    t
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'payments' | 'recipes' | 'tales'>('payments');

  // Form state for creating new recipe
  const [newRecipeTitle, setNewRecipeTitle] = useState('');
  const [newRecipeTime, setNewRecipeTime] = useState(25);
  const [newRecipeDiff, setNewRecipeDiff] = useState<'oson' | 'orta' | 'qiyin'>('oson');
  const [newRecipeImage, setNewRecipeImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');
  const [newRecipeDesc, setNewRecipeDesc] = useState('');
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipeTitle.trim()) return;

    const newRecipe: Recipe = {
      id: `rec_custom_${Date.now()}`,
      nomi: newRecipeTitle.trim(),
      tayyorlash_vaqti_daq: Number(newRecipeTime),
      qiyinlik: newRecipeDiff,
      rasm_url: newRecipeImage,
      tarif_matni: newRecipeDesc || 'Admin tomonidan qo\'shilgan retsept.',
      masalliqlar_matni: 'Kartoshka, Sabzi, Piyoz, Ziravorlar',
      korsatmalari: ['Barcha masalliqlarni to`g`rang.', 'Past olovda pishiring.'],
      holat: 'nashr',
      required_ingredient_ids: ['ing_kartoshka', 'ing_piyoz', 'ing_sabzi']
    };

    addRecipe(newRecipe);
    setNewRecipeTitle('');
    setShowAddRecipeForm(false);
  };

  return (
    <div className="space-y-6 pb-28 pt-2">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-[#2D2A26] to-[#433E38] p-4 rounded-3xl text-white flex items-center justify-between shadow-md">
        <div>
          <div className="inline-flex items-center gap-1 bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full mb-1">
            <Database className="w-3 h-3" />
            Supabase Studio Simulyatsiyasi
          </div>
          <h2 className="text-xl font-black tracking-tight">
            Admin Boshqaruv Markazi
          </h2>
          <p className="text-xs text-[#D1C9BD] mt-0.5">
            Kontentlarni nashr etish va to'lov cheklarini tasdiqlash
          </p>
        </div>
        <button
          onClick={() => setActiveTab('profil')}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Chiqish")}
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-3 gap-1.5 bg-[#FAF6EF] p-1 rounded-2xl border border-[#EFE8DC]">
        <button
          onClick={() => setActiveAdminTab('payments')}
          className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeAdminTab === 'payments'
              ? 'bg-[#FF6B4A] text-white shadow-xs'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          To'lovlar ({paymentProofs.filter(p => p.holat === 'kutilmoqda').length})
        </button>

        <button
          onClick={() => setActiveAdminTab('recipes')}
          className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeAdminTab === 'recipes'
              ? 'bg-[#FF6B4A] text-white shadow-xs'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          Retseptlar ({recipes.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('tales')}
          className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeAdminTab === 'tales'
              ? 'bg-[#FF6B4A] text-white shadow-xs'
              : 'text-[#6B6359] hover:bg-white'
          }`}
        >
          Ertaklar ({tales.length})
        </button>
      </div>

      {/* TAB 1: Payment Verification Inbox */}
      {activeAdminTab === 'payments' && (
        <div className="space-y-3">
          <h3 className="font-extrabold text-[#2D2A26] text-sm">
            To'lov cheklari so'rovlari
          </h3>

          {paymentProofs.length === 0 ? (
            <div className="bg-white p-6 rounded-3xl border border-dashed border-[#EFE8DC] text-center text-xs text-[#8C8479]">
              Hozircha kutilayotgan to'lov cheklari yo'q.
            </div>
          ) : (
            paymentProofs.map(proof => (
              <div
                key={proof.id}
                className="bg-white p-4 rounded-3xl border border-[#EFE8DC] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2D2A26]">
                    Summa: {proof.summa.toLocaleString()} so'm
                  </span>
                  <span
                    className={`font-extrabold px-2.5 py-0.5 rounded-full text-[10px] ${
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
                  <img
                    src={proof.screenshot_preview_url}
                    alt="Proof"
                    className="w-full h-32 object-cover rounded-2xl border border-[#EFE8DC]"
                  />
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
            ))
          )}
        </div>
      )}

      {/* TAB 2: Recipes Manager */}
      {activeAdminTab === 'recipes' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-[#2D2A26] text-sm">
              Retseptlar bazasi
            </h3>
            <button
              onClick={() => setShowAddRecipeForm(!showAddRecipeForm)}
              className="px-3 py-1.5 bg-[#FF6B4A] text-white text-xs font-bold rounded-xl flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Yangi retsept
            </button>
          </div>

          {showAddRecipeForm && (
            <form onSubmit={handleCreateRecipe} className="bg-white p-4 rounded-3xl border border-[#FF6B4A] space-y-3 shadow-sm">
              <h4 className="font-bold text-xs text-[#2D2A26]">Yangi retsept qo'shish</h4>
              <input
                type="text"
                required
                placeholder="Retsept nomi (masalan: Manti)"
                value={newRecipeTitle}
                onChange={e => setNewRecipeTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Vaqti (daq)"
                  value={newRecipeTime}
                  onChange={e => setNewRecipeTime(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
                <select
                  value={newRecipeDiff}
                  onChange={e => setNewRecipeDiff(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white"
                >
                  <option value="oson">Oson</option>
                  <option value="orta">O'rta</option>
                  <option value="qiyin">Qiyin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FF6B4A] text-white font-bold text-xs rounded-xl"
              >
                Saqlash va Nashr etish
              </button>
            </form>
          )}

          <div className="space-y-2">
            {recipes.map(recipe => (
              <div key={recipe.id} className="bg-white p-3.5 rounded-2xl border border-[#EFE8DC] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#2D2A26]">{recipe.nomi}</p>
                  <p className="text-[11px] text-[#7C746B]">{recipe.tayyorlash_vaqti_daq} daq • Status: <span className="font-bold">{recipe.holat}</span></p>
                </div>
                <button
                  onClick={() => toggleRecipeStatus(recipe.id)}
                  className={`px-3 py-1 rounded-xl text-[10px] font-bold ${
                    recipe.holat === 'nashr' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {recipe.holat === 'nashr' ? 'Nashrdan olish' : 'Nashr qilish'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Tales Manager */}
      {activeAdminTab === 'tales' && (
        <div className="space-y-2">
          <h3 className="font-extrabold text-[#2D2A26] text-sm mb-2">Ertaklar va sahifalar</h3>
          {tales.map(tale => (
            <div key={tale.id} className="bg-white p-3.5 rounded-2xl border border-[#EFE8DC] flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#2D2A26]">{tale.sarlavha}</p>
                <p className="text-[11px] text-[#7C746B]">{tale.yosh_toifasi} yosh • {tale.sahifalar.length} sahifa</p>
              </div>
              <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                {tale.holat}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
