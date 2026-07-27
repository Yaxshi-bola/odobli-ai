import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BoshSahifa } from './components/BoshSahifa';
import { PazandaAI } from './components/PazandaAI';
import { Bolajon } from './components/Bolajon';
import { Lifehacklar } from './components/Lifehacklar';
import { Profil } from './components/Profil';

import { PaymentModal } from './components/PaymentModal';
import { RewardModal } from './components/RewardModal';
import { DynamicIslandTimer } from './components/DynamicIslandTimer';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#FCE7F0] text-[#2E121D] font-sans antialiased selection:bg-[#DB2777]/20">
      
      {/* Dynamic Island Kitchen Timer */}
      <DynamicIslandTimer />

      {/* Container wrapper constrained for mobile / desktop layout */}
      <div className="max-w-md mx-auto min-h-screen bg-[#FDF2F7] shadow-xl border-x border-[#FCE7F3] flex flex-col relative overflow-x-hidden">
        
        {/* Sticky Header */}
        <Header />

        {/* Main View Area based on Active Tab */}
        <main className="flex-1 px-4 pt-3">
          {activeTab === 'home' && <BoshSahifa />}
          {activeTab === 'pazanda' && <PazandaAI />}
          {activeTab === 'bolajon' && <Bolajon />}
          {activeTab === 'lifehacklar' && <Lifehacklar />}
          {activeTab === 'profil' && <Profil />}
        </main>

        {/* Fixed Mobile Bottom Bar */}
        <BottomNav />

        {/* Global Modals */}
        <PaymentModal />
        <RewardModal />

      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
