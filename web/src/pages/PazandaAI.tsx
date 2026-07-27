import React, { useState } from 'react';
import { ScriptType } from '../types';
import { t } from '../utils/transliterate';
import { MOCK_INGREDIENTS, matchRecipes, RecipeMatchResult } from '../services/api';
import { Check, Search, AlertCircle, Sparkles, Lightbulb } from 'lucide-react';

interface PazandaAIProps {
  script: ScriptType;
}

export const PazandaAI: React.FC<PazandaAIProps> = ({ script }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [results, setResults] = useState<RecipeMatchResult | null>(null);

  const toggleIngredient = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSearch = () => {
    const match = matchRecipes(selectedIds);
    setResults(match);
  };

  const categories = [
    { key: 'Barchasi', label: 'Barchasi' },
    { key: 'sabzavot', label: 'Sabzavot' },
    { key: 'gosht', label: "Go'sht" },
    { key: 'sut_mahsuloti', label: 'Sut mahsulotlari' },
    { key: 'boshqa', label: 'Boshqa' },
  ];

  const filteredIngredients = activeCategory === 'Barchasi'
    ? MOCK_INGREDIENTS
    : MOCK_INGREDIENTS.filter(i => i.kategoriya === activeCategory);

  const ingredientThumbnails: Record<string, string> = {
    'Sabzi': 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=150&q=80',
    'Piyoz': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=150&q=80',
    'Kartoshka': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80',
    'Pomidor': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80',
    'Bodring': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=150&q=80',
    'Bulg\'or qalampiri': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=150&q=80',
    'Oshqovoq': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
    'Mol go\'shti': 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=150&q=80',
    'Tovuq go\'shti': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=150&q=80',
    'Qo\'y go\'shti': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&q=80',
    'Sut': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80',
    'Tuxum': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=150&q=80',
    'Qatiq / Smetana': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=150&q=80',
    'Sariyog\'': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=150&q=80',
    'Guruch': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=150&q=80',
    'Un': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Top Banner with 3D Chef */}
      <div className="pazanda-hero-card">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FF5533', letterSpacing: '-0.4px' }}>
            Pazanda AI
          </h2>
          <p style={{ fontSize: '12.5px', color: '#565C68', marginTop: '2px', fontWeight: 600 }}>
            {t("Mavjud mahsulotlaringizni tanlang", script)}
          </p>
        </div>
        <div style={{ background: '#FF5533', color: 'white', width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', boxShadow: '0 6px 16px rgba(255, 85, 51, 0.35)' }}>
          👩‍🍳
        </div>
      </div>

      {/* Horizontal Filter Pills */}
      <div className="filter-pills-row">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`filter-pill-btn ${activeCategory === cat.key ? 'filter-pill-active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {t(cat.label, script)}
          </button>
        ))}
      </div>

      {/* 4-Column Ingredient Clay Grid */}
      <div className="ingredient-clay-grid">
        {filteredIngredients.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          const imgUrl = ingredientThumbnails[item.nomi] || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80';
          return (
            <div
              key={item.id}
              className={`ingredient-clay-card ${isSelected ? 'ingredient-clay-selected' : ''}`}
              onClick={() => toggleIngredient(item.id)}
            >
              {isSelected && (
                <div className="ingredient-check-badge">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
              <img src={imgUrl} alt={item.nomi} className="ingredient-clay-img" />
              <span className="ingredient-clay-name">{t(item.nomi, script)}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Bright CTA Button */}
      <div style={{ marginTop: '20px' }}>
        <button className="btn-cta-clay" onClick={handleSearch}>
          <Sparkles size={20} />
          <span>{t("Retsept topish", script)} ✨ ({selectedIds.length})</span>
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#18191D', letterSpacing: '-0.3px' }}>
            {t("Natijalar", script)} 🍳
          </h3>

          {results.exactMatches.length === 0 && results.partialMatches.length === 0 && (
            <div style={{ background: 'white', borderRadius: '22px', padding: '28px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.03)' }}>
              <AlertCircle size={36} color="#9DA3AE" style={{ margin: '0 auto 8px auto' }} />
              <p style={{ fontSize: '13.5px', color: '#565C68', fontWeight: 600 }}>
                {t("Kechirasiz, tanlangan mahsulotlarga mos retsept topilmadi. Boshqa masalliqlar tanlab ko'ring!", script)}
              </p>
            </div>
          )}

          {/* 1. To'liq mos retseptlar */}
          {results.exactMatches.length > 0 && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#10B981', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} />
                <span>{t("To'liq mos retseptlar", script)} ({results.exactMatches.length})</span>
              </h4>
              {results.exactMatches.map(({ recipe }) => (
                <div key={recipe.id} style={{ background: 'white', borderRadius: '22px', padding: '14px', display: 'flex', gap: '14px', marginBottom: '12px', boxShadow: '0 8px 22px rgba(0,0,0,0.04)', border: '1.5px solid #A7F3D0' }}>
                  <img src={recipe.rasm_url} alt={recipe.nomi} style={{ width: '84px', height: '84px', borderRadius: '16px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#18191D' }}>{t(recipe.nomi, script)}</h4>
                    <p style={{ fontSize: '12.5px', color: '#565C68', marginTop: '3px', fontWeight: 600 }}>
                      ⏱ {recipe.tayyorlash_vaqti_daq} {t("daqiqa", script)} • {t(recipe.qiyinlik, script)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Yana 1 ta mahsulot kerak */}
          {results.partialMatches.length > 0 && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#FF5533', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lightbulb size={16} />
                <span>{t("Yana 1 ta mahsulot kerak", script)} ({results.partialMatches.length})</span>
              </h4>
              {results.partialMatches.map(({ recipe, missingIngredientNames, substitutionTip }) => (
                <div key={recipe.id} style={{ background: 'white', borderRadius: '22px', padding: '14px', marginBottom: '12px', boxShadow: '0 8px 22px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <img src={recipe.rasm_url} alt={recipe.nomi} style={{ width: '74px', height: '74px', borderRadius: '16px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800 }}>{t(recipe.nomi, script)}</h4>
                      <div style={{ background: '#FFF5F0', color: '#FF5533', fontSize: '11.5px', fontWeight: 800, padding: '4px 10px', borderRadius: '10px', marginTop: '4px', width: 'fit-content' }}>
                        🛒 {t("Yana faqat:", script)} {t(missingIngredientNames.join(', '), script)} {t("kerak", script)}
                      </div>
                    </div>
                  </div>

                  {substitutionTip && (
                    <div style={{ background: '#EFF6FF', color: '#1E40AF', fontSize: '12px', padding: '10px 12px', borderRadius: '14px', marginTop: '10px', lineHeight: '1.4', border: '1px solid #DBEAFE', fontWeight: 500 }}>
                      💡 **{t("Pazanda Maslahati:", script)}** {t(substitutionTip, script)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
