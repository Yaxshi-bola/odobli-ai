import React, { useState } from 'react';
import { ScriptType } from '../types';
import { t } from '../utils/transliterate';
import { MOCK_LIFEHACKLAR } from '../services/api';
import { Lightbulb } from 'lucide-react';

interface LifehacklarProps {
  script: ScriptType;
}

export const Lifehacklar: React.FC<LifehacklarProps> = ({ script }) => {
  const [activeCategory, setActiveCategory] = useState<string>('hamma');

  const categories = [
    { key: 'hamma', label: 'Hamma' },
    { key: 'karving', label: 'Karving' },
    { key: 'oyinchoq_yasash', label: "O'yinchoq" },
    { key: 'uy_ishlari', label: 'Uy ishlari' },
  ];

  const filteredHacks = activeCategory === 'hamma'
    ? MOCK_LIFEHACKLAR
    : MOCK_LIFEHACKLAR.filter(h => h.kategoriya === activeCategory);

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-banner card-banner-hack">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px' }}>
            <Lightbulb size={20} />
            <span>{t("Foydali Lifehacklar", script)}</span>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '12px' }}>
          {t("Uy ro'zg'or va bolalar tarbiyasini yengillashtiruvchi amaliy maslahatlar.", script)}
        </p>

        {/* Categories Horizontal Scroll / Chips */}
        <div className="chips-container">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                className={`chip ${isSelected ? 'chip-selected' : ''}`}
                style={isSelected ? { background: '#ECFDF5', color: '#10B981', borderColor: '#10B981' } : {}}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span>{t(cat.label, script)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredHacks.map((hack) => (
          <div key={hack.id} className="card">
            <img
              src={hack.rasm_url}
              alt={hack.sarlavha}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', marginBottom: '10px' }}
            />
            <span style={{ fontSize: '11px', background: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
              {t(hack.kategoriya, script)}
            </span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginTop: '6px' }}>
              {t(hack.sarlavha, script)}
            </h4>
            <p style={{ fontSize: '13px', color: '#4B5563', marginTop: '4px', lineHeight: '1.5' }}>
              {t(hack.tavsif_matni, script)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
