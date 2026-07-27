import React, { useState } from 'react';
import { ScriptType } from '../types';
import { t } from '../utils/transliterate';
import { MOCK_TOPISHMOQLAR, MOCK_MATEMATIK } from '../services/api';
import { HelpCircle, Calculator, Check, Trophy, Sparkles } from 'lucide-react';

interface TopishmoqlarProps {
  script: ScriptType;
  onAddPoints: (points: number) => void;
  streak: number;
  points: number;
}

export const Topishmoqlar: React.FC<TopishmoqlarProps> = ({ script, onAddPoints, streak, points }) => {
  const [activeTab, setActiveTab] = useState<'topishmoq' | 'matematik'>('topishmoq');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const riddle = MOCK_TOPISHMOQLAR[currentIdx % MOCK_TOPISHMOQLAR.length];
  const math = MOCK_MATEMATIK[currentIdx % MOCK_MATEMATIK.length];

  const mathOptions = math ? [math.togri_javob, ...math.notogri_variantlar].sort() : [];

  const handleSelectMath = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    if (opt === math.togri_javob) {
      onAddPoints(10);
      setTimeout(() => setShowCelebration(true), 600);
    }
  };

  const handleNext = () => {
    setShowCelebration(false);
    setSelectedOption(null);
    setCurrentIdx(prev => prev + 1);
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Quiz Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <button
          className={`filter-pill ${activeTab === 'topishmoq' ? 'filter-pill-active' : ''}`}
          style={{ flex: 1, padding: '10px' }}
          onClick={() => { setActiveTab('topishmoq'); setSelectedOption(null); }}
        >
          {t("Topishmoqlar", script)}
        </button>
        <button
          className={`filter-pill ${activeTab === 'matematik' ? 'filter-pill-active' : ''}`}
          style={{ flex: 1, padding: '10px' }}
          onClick={() => { setActiveTab('matematik'); setSelectedOption(null); }}
        >
          {t("Matematik masala", script)}
        </button>
      </div>

      {activeTab === 'matematik' && math && (
        <div className="quiz-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '10px' }}>
            <span>{t("Matematik masala", script)}</span>
            <span>1 / 10</span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '20px', lineHeight: '1.4' }}>
            {t(math.savol, script)}
          </h3>

          <div>
            {mathOptions.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === math.togri_javob;

              let btnStyle: React.CSSProperties = {};
              if (selectedOption !== null) {
                if (isCorrect) {
                  btnStyle = { background: '#ECFDF5', color: '#065F46', borderColor: '#10B981' };
                } else if (isSelected && !isCorrect) {
                  btnStyle = { background: '#FEF2F2', color: '#991B1B', borderColor: '#EF4444' };
                }
              }

              return (
                <button
                  key={i}
                  className="quiz-option-btn"
                  style={btnStyle}
                  onClick={() => handleSelectMath(opt)}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && isCorrect && (
                    <div style={{ background: '#10B981', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <button className="btn-cta-orange" style={{ marginTop: '14px' }} onClick={handleNext}>
              <span>{t("Javob yuborish", script)}</span>
            </button>
          )}
        </div>
      )}

      {activeTab === 'topishmoq' && riddle && (
        <div className="quiz-card" style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '10px' }}>
            <span>{t("Topishmoq", script)}</span>
            <span>1 / 10</span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '20px', lineHeight: '1.4' }}>
            "{t(riddle.savol, script)}"
          </h3>

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', color: '#FDE047', fontWeight: 700 }}>
              💡 {t("Javobi:", script)} {t(riddle.javob, script)}
            </span>
          </div>

          <button className="btn-cta-orange" style={{ marginTop: '16px' }} onClick={handleNext}>
            <span>{t("Keyingi topishmoq", script)}</span>
          </button>
        </div>
      )}

      {/* Celebration Modal (Matching Mockup) */}
      {showCelebration && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ background: '#FEF3C7', width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={48} color="#D97706" />
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1F2937' }}>
              {t("Ajoyib!", script)} 🎉
            </h2>
            <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '2px' }}>
              {t("To'g'ri javob!", script)}
            </p>

            <div style={{ fontSize: '20px', fontWeight: 900, color: '#10B981', margin: '10px 0' }}>
              +10 ball
            </div>

            <div style={{ background: '#F8F6F2', padding: '10px', borderRadius: '14px', margin: '12px 0', fontSize: '13px', color: '#374151', fontWeight: 700 }}>
              🔥 Streak: {streak + 1} kun <br />
              ⭐️ Jami ball: {points + 10}
            </div>

            <button className="btn-cta-orange" onClick={handleNext}>
              <span>{t("Davom ettirish", script)}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
