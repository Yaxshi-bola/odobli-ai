import React from 'react';
import { ScriptType, UserProfile } from '../types';
import { t } from '../utils/transliterate';
import { Flame, Star, ChevronRight, Crown, Settings } from 'lucide-react';

interface ProfilProps {
  user: UserProfile;
  script: ScriptType;
  onToggleScript: () => void;
}

export const Profil: React.FC<ProfilProps> = ({ user, script, onToggleScript }) => {
  return (
    <div style={{ padding: '16px' }}>
      {/* Profile Header */}
      <div style={{ background: 'white', borderRadius: '22px', padding: '20px', textAlign: 'center', marginBottom: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#FFE4E6', border: '3px solid #FF6B4A', margin: '0 auto 10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
          👩‍👧
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1F2937' }}>
          {user.ism || t("Foydalanuvchi", script)}
        </h2>
        <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
          @{user.username || 'user'}
        </p>

        {/* 2 Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px' }}>
          <div style={{ background: '#FFF7ED', padding: '10px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={20} color="#EA580C" fill="#EA580C" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>{user.joriy_streak} {t("kun", script)}</div>
              <div style={{ fontSize: '11px', color: '#9A3412' }}>streak</div>
            </div>
          </div>

          <div style={{ background: '#FEF3C7', padding: '10px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={20} color="#D97706" fill="#D97706" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>{user.jami_ball}</div>
              <div style={{ fontSize: '11px', color: '#92400E' }}>ball</div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      <div style={{ background: '#FFF7ED', border: '1.5px solid #FFEDD5', borderRadius: '20px', padding: '16px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#C2410C', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Crown size={16} />
            <span>{t("Premium holat", script)}</span>
          </div>
          <p style={{ fontSize: '12px', color: '#9A3412', marginTop: '2px' }}>
            Trial: 2 {t("kun qoldi", script)}
          </p>
        </div>

        <button
          style={{ background: '#FF6B4A', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 800, cursor: 'pointer' }}
          onClick={() => {
            const tg = (window as any).Telegram;
            if (tg?.WebApp) {
              tg.WebApp.close();
            }
          }}
        >
          {t("Premium sotib olish", script)}
        </button>
      </div>

      {/* Settings Options List */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '8px 16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F3F4F6', cursor: 'pointer' }}
          onClick={onToggleScript}
        >
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#374151' }}>{t("Til skripti", script)}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '13px', fontWeight: 600 }}>
            <span>{script === 'lotin' ? 'Lotin' : 'Кирилл'}</span>
            <ChevronRight size={16} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#374151' }}>{t("Bolalarim", script)}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '13px', fontWeight: 600 }}>
            <span>2 {t("nafar", script)}</span>
            <ChevronRight size={16} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', color: '#EF4444', fontWeight: 700, fontSize: '14px' }}>
          <span>{t("Chiqish", script)}</span>
        </div>
      </div>
    </div>
  );
};
