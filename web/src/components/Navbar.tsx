import React from 'react';
import { Home, Utensils, BookOpen, HelpCircle, User } from 'lucide-react';
import { ScriptType } from '../types';
import { t } from '../utils/transliterate';

export type TabType = 'home' | 'pazanda' | 'ertak' | 'hack' | 'topishmoq' | 'profil';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  script: ScriptType;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, script }) => {
  const tabs = [
    { id: 'home', label: 'Bosh sahifa', icon: Home },
    { id: 'pazanda', label: 'Pazanda AI', icon: Utensils },
    { id: 'ertak', label: 'Ertaklar', icon: BookOpen },
    { id: 'topishmoq', label: 'Topishmoqlar', icon: HelpCircle },
    { id: 'profil', label: 'Profil', icon: User },
  ] as const;

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            onClick={() => onTabChange(tab.id as TabType)}
          >
            <Icon size={20} color={isActive ? '#FF6B4A' : '#9CA3AF'} strokeWidth={isActive ? 2.5 : 2} />
            <span>{t(tab.label, script)}</span>
          </button>
        );
      })}
    </nav>
  );
};
