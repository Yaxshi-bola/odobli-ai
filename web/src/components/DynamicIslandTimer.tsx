import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Play, Pause, Square, Timer as TimerIcon } from 'lucide-react';

export const DynamicIslandTimer: React.FC = () => {
  const {
    timerSeconds,
    isTimerRunning,
    pauseGlobalTimer,
    resumeGlobalTimer,
    stopGlobalTimer,
    t
  } = useApp();

  if (timerSeconds <= 0 && !isTimerRunning) return null;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.85 }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-[#5A1827]/95 text-white p-1.5 px-3.5 rounded-full shadow-2xl border border-amber-500/20 backdrop-blur-md flex items-center gap-3.5 min-w-[170px] justify-between">
          
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 flex items-center justify-center">
              <svg className="w-5 h-5 transform -rotate-90">
                <circle cx="10" cy="10" r="7" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="transparent" />
                <circle cx="10" cy="10" r="7" stroke="#F59E0B" strokeWidth="2" fill="transparent" strokeDasharray="44" strokeDashoffset={isTimerRunning ? "10" : "44"} className="transition-all duration-500" />
              </svg>
            </div>
            <div className="flex items-center gap-1 font-bold text-xs">
              <span className="font-mono tracking-wider text-white font-extrabold text-[12px]">{formattedTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {isTimerRunning ? (
              <button
                onClick={pauseGlobalTimer}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 flex items-center justify-center transition-all active:scale-90"
                title={t("Pauza")}
              >
                <Pause className="w-3 h-3 fill-amber-300" />
              </button>
            ) : (
              <button
                onClick={resumeGlobalTimer}
                className="w-6 h-6 rounded-full bg-[#F59E0B] text-white flex items-center justify-center transition-all active:scale-90"
                title={t("Davom ettirish")}
              >
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </button>
            )}

            <button
              onClick={stopGlobalTimer}
              className="w-6 h-6 rounded-full bg-red-950/80 hover:bg-red-900 text-rose-300 border border-rose-800/40 flex items-center justify-center transition-all active:scale-90"
              title={t("To'xtatish")}
            >
              <Square className="w-2.5 h-2.5 fill-rose-300" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
