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
    <nav className="fixed bottom-4 left-3 right-3 z-50 max-w-md mx-auto">
      <div className="glass-nav p-1.5 rounded-full shadow-2xl flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-[#5A1827] text-white font-extrabold px-3.5 py-2 rounded-full shadow-md gap-1.5 text-xs'
                  : 'text-gray-500 dark:text-gray-400 hover:text-[#5A1827] dark:hover:text-white p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              {isActive && (
                <span className="text-[11.5px] leading-none tracking-tight font-extrabold whitespace-nowrap text-white animate-in fade-in zoom-in-95 duration-150">
                  {t(item.label)}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

