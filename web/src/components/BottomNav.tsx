import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { Home, ChefHat, Sparkles, Lightbulb, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Home className="w-5 h-5" /> },
    { id: 'pazanda', label: 'Pazanda AI', icon: <ChefHat className="w-5 h-5" /> },
    { id: 'bolajon', label: 'Bolajon', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'lifehacklar', label: 'Lifehacklar', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 max-w-md mx-auto">
      <div className="glass-dock p-1.5 rounded-full flex items-center justify-between shadow-2xl relative">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.90 }}
              onClick={() => setActiveTab(item.id)}
              className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
                isActive
                  ? 'text-white font-extrabold px-3.5 py-2 text-xs'
                  : 'text-white/70 hover:text-white p-2.5 rounded-full hover:bg-white/10'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full shadow-lg border border-amber-300/40 -z-10"
                />
              )}
              <div className="shrink-0 drop-shadow-xs">{item.icon}</div>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                  className="ml-1.5 text-[11.5px] leading-none tracking-tight font-extrabold whitespace-nowrap text-white drop-shadow-xs"
                >
                  {t(item.label)}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

