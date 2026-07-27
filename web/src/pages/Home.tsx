import React from 'react';
import { ScriptType } from '../types';
import { t } from '../utils/transliterate';
import { Flame, Star, Lightbulb, Heart } from 'lucide-react';
import { TabType } from '../components/Navbar';

interface HomeProps {
  script: ScriptType;
  onNavigate: (tab: TabType) => void;
  streak: number;
  points: number;
}

export const Home: React.FC<HomeProps> = ({ script, onNavigate, streak, points }) => {
  return (
    <div style={{ padding: '16px' }}>
      {/* Stat Cards Grid (7 kun streak, 125 ball) */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#FFF0EB' }}>
            <Flame size={22} color="#FF5533" fill="#FF5533" />
          </div>
          <div>
            <div className="stat-val">{streak} {t("kun", script)}</div>
            <div className="stat-lbl">streak</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#FFF9E6' }}>
            <Star size={22} color="#F59E0B" fill="#F59E0B" />
          </div>
          <div>
            <div className="stat-val">{points}</div>
            <div className="stat-lbl">ball</div>
          </div>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="hero-banner">
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#18191D' }}>
            {t("Bugungi faoliyat tayyor!", script)} 🌟
          </h3>
          <p style={{ fontSize: '12px', color: '#565C68', marginTop: '3px', fontWeight: 600 }}>
            {t("Keling, streakni davom ettiramiz!", script)}
          </p>
        </div>
        <div style={{ background: '#FF5533', color: 'white', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 4px 12px rgba(255, 85, 51, 0.3)' }}>
          👩‍👧
        </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#18191D', marginBottom: '12px', letterSpacing: '-0.3px' }}>
        {t("Bugungi faoliyat", script)}
      </h3>

      {/* 2x2 Clay Grid Cards */}
      <div className="clay-grid">
        {/* 1. Bugungi Taom G'oyasi */}
        <div className="clay-card clay-card-pazanda" onClick={() => onNavigate('pazanda')}>
          <div className="clay-card-title">{t("Bugungi taom g'oyasi", script)}</div>
          <img
            src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=300&q=80"
            alt="Taom"
            className="clay-card-img"
          />
          <button className="clay-btn">{t("Ko'rish", script)}</button>
        </div>

        {/* 2. Bugungi Ertak */}
        <div className="clay-card clay-card-ertak" onClick={() => onNavigate('ertak')}>
          <div className="clay-card-title">{t("Bugungi ertak", script)}</div>
          <img
            src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80"
            alt="Ertak"
            className="clay-card-img"
          />
          <button className="clay-btn">{t("Ko'rish", script)}</button>
        </div>

        {/* 3. Bugungi Topishmoq */}
        <div className="clay-card clay-card-riddle" onClick={() => onNavigate('topishmoq')}>
          <div className="clay-card-title">{t("Bugungi topishmoq", script)}</div>
          <div style={{ background: 'rgba(255,255,255,0.25)', width: '68px', height: '68px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto', fontSize: '36px', fontWeight: 900, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            ?
          </div>
          <button className="clay-btn">{t("Yechish", script)}</button>
        </div>

        {/* 4. Bugungi Lifehack */}
        <div className="clay-card clay-card-hack" onClick={() => onNavigate('hack')}>
          <div className="clay-card-title">{t("Bugungi lifehack", script)}</div>
          <div style={{ background: 'rgba(255,255,255,0.25)', width: '68px', height: '68px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
            <Lightbulb size={36} color="white" />
          </div>
          <button className="clay-btn">{t("Ko'rish", script)}</button>
        </div>
      </div>
    </div>
  );
};
