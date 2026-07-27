import React, { useState } from 'react';
import { ScriptType, Ertak } from '../types';
import { t } from '../utils/transliterate';
import { MOCK_ERTAKLAR } from '../services/api';
import { BookOpen, ChevronLeft, ChevronRight, ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';

interface ErtaklarProps {
  script: ScriptType;
}

export const Ertaklar: React.FC<ErtaklarProps> = ({ script }) => {
  const [selectedErtak, setSelectedErtak] = useState<Ertak | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(17.5);

  const startReading = (ertak: Ertak) => {
    setSelectedErtak(ertak);
    setPageIndex(0);
  };

  const closeReader = () => {
    setSelectedErtak(null);
    setPageIndex(0);
  };

  if (selectedErtak) {
    const page = selectedErtak.sahifalar[pageIndex];
    const totalPages = selectedErtak.sahifalar.length;

    return (
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={closeReader}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#6B7280',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '4px 0'
            }}
          >
            <ArrowLeft size={18} />
            <span>{t("Ertaklar ro'yxatiga qaytish", script)}</span>
          </button>

          <div style={{ display: 'flex', gap: '6px', background: '#E5E7EB', padding: '3px 8px', borderRadius: '14px' }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              title="Shriftni kichiklashtirish"
            >
              <ZoomOut size={16} color="#4B5563" />
            </button>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#374151', alignSelf: 'center' }}>
              {fontSize}px
            </span>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              onClick={() => setFontSize(Math.min(26, fontSize + 2))}
              title="Shriftni kattalashtirish"
            >
              <ZoomIn size={16} color="#4B5563" />
            </button>
          </div>
        </div>

        <div className="reader-container">
          <img src={page.rasm_url} alt="Ertak sahifasi" className="reader-img" />
          <div className="reader-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#8B5CF6', fontWeight: 800 }}>
                {t(selectedErtak.sarlavha, script)}
              </span>
              <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 700 }}>
                {pageIndex + 1} / {totalPages}
              </span>
            </div>

            <p className="reader-text" style={{ fontSize: `${fontSize}px` }}>
              {t(page.matn, script)}
            </p>

            <div className="reader-controls">
              <button
                className="btn btn-secondary"
                style={{ width: '48%', minHeight: '44px' }}
                disabled={pageIndex === 0}
                onClick={() => setPageIndex(pageIndex - 1)}
              >
                <ChevronLeft size={18} />
                <span>{t("Oldingi", script)}</span>
              </button>

              {pageIndex < totalPages - 1 ? (
                <button
                  className="btn btn-ertak"
                  style={{ width: '48%', minHeight: '44px' }}
                  onClick={() => setPageIndex(pageIndex + 1)}
                >
                  <span>{t("Keyingi", script)}</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ width: '48%', minHeight: '44px', background: '#10B981' }}
                  onClick={closeReader}
                >
                  <span>{t("Tamomlash", script)} ✨</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-banner card-banner-ertak">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '15px' }}>
            <BookOpen size={20} />
            <span>{t("Ibratli Ertaklar", script)}</span>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.4' }}>
          {t("Farzandingiz bilan birga o'qish uchun tarbiyaviy, odob-ahloqli hamda sehrli ertaklar to'plami.", script)}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {MOCK_ERTAKLAR.map((ertak) => (
          <div key={ertak.id} className="card card-interactive" onClick={() => startReading(ertak)}>
            <div style={{ display: 'flex', gap: '14px' }}>
              <img
                src={ertak.muqova_rasm_url}
                alt={ertak.sarlavha}
                style={{ width: '90px', height: '100px', objectFit: 'cover', borderRadius: '14px' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', background: '#F5F3FF', color: '#8B5CF6', padding: '3px 8px', borderRadius: '10px', fontWeight: 800, width: 'fit-content', marginBottom: '6px' }}>
                  👶 {ertak.yosh_toifasi} {t("yosh", script)}
                </span>
                <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#111827' }}>
                  {t(ertak.sarlavha, script)}
                </h4>
                <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px', fontWeight: 600 }}>
                  📖 {ertak.sahifalar.length} {t("sahifa", script)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
