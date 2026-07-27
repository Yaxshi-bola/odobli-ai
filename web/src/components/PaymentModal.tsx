import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CreditCard, Upload, CheckCircle2, ShieldCheck, Copy, Sparkles } from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { showPaymentModal, setShowPaymentModal, submitPaymentProof, user, t } = useApp();

  const [copied, setCopied] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string>(
    'https://images.unsplash.com/photo-1556742049-0a67daf4005a?auto=format&fit=crop&w=600&q=80'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!showPaymentModal) return null;

  const cardNumber = '8600 1234 5678 9012';

  const handleCopyCard = () => {
    navigator.clipboard.writeText('8600123456789012');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendProof = (e: React.FormEvent) => {
    e.preventDefault();
    submitPaymentProof(25000, screenshotUrl);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] w-full max-w-md rounded-3xl p-5 space-y-4 border border-[#EFE8DC] shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowPaymentModal(false);
            setIsSubmitted(false);
          }}
          className="absolute top-4 right-4 p-2 text-[#8C8479] hover:bg-[#F2ECE1] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-200 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                {t("Qo'lda tekshirish oqimi")}
              </span>
              <h3 className="text-xl font-black text-[#2D2A26] mt-1">
                {t("Premium obunani rasmiylashtirish")}
              </h3>
              <p className="text-xs text-[#7C746B] mt-0.5">
                {t("Oylik obuna narxi: 25,000 so'm. Reklamasiz to'liq oilaviy kontent.")}
              </p>
            </div>

            {/* Payment Step 1: Card Details */}
            <div className="bg-gradient-to-r from-[#2D2A26] to-[#433E38] p-4 rounded-2xl text-white space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span>UZCARD / HUMO</span>
                <span>Odobli.ai Rasmiy</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-lg font-black tracking-widest text-amber-100">
                  {cardNumber}
                </p>
                <button
                  type="button"
                  onClick={handleCopyCard}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? t("Nusxalandi!") : t("Nusxalash")}
                </button>
              </div>
              <p className="text-[11px] text-[#D1C9BD]">
                {t("Qabul qiluvchi")}: Ona va Bola Ta'lim Jamg'armasi
              </p>
            </div>

            {/* Payment Step 2: Upload Screenshot Form */}
            <form onSubmit={handleSendProof} className="space-y-3 pt-1">
              <label className="text-xs font-bold text-[#4A443C] block">
                {t("To'lov cheki (Screenshot) faylini biriktiring")}:
              </label>

              <div className="border-2 border-dashed border-[#DCD4C7] rounded-2xl p-4 text-center bg-[#FDFBF7] space-y-2">
                <img
                  src={screenshotUrl}
                  alt="Proof preview"
                  className="w-full h-28 object-cover rounded-xl shadow-2xs mx-auto"
                />
                <div className="flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4 text-[#FF6B4A]" />
                  <span className="text-xs font-bold text-[#FF6B4A]">
                    {t("Chek rasmi tanlandi")} (250 KB)
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FF6B4A] hover:bg-[#E8593A] text-white font-black text-xs rounded-2xl shadow-md shadow-[#FF6B4A]/25 transition-all active:scale-98 min-h-[48px]"
              >
                {t("To'ladim — Chekni Adminga yuborish")} →
              </button>
            </form>
          </>
        ) : (
          /* Submitted State */
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-[#2D2A26]">
              {t("To'lov cheki qabul qilindi!")}
            </h3>
            <p className="text-xs text-[#6B6359] max-w-xs mx-auto leading-relaxed">
              {t("Admin (sizning Telegram ID) xabarni oldi. Tasdiqlanishi bilan status avtomatik Premium bo'ladi.")}
            </p>
            <div className="bg-[#FAF6EF] p-3 rounded-2xl border border-[#EFE8DC] text-xs text-[#7C746B]">
              <p className="font-bold text-[#2D2A26] mb-0.5">{t("Holat")}: <span className="text-amber-600">⏳ Kutilmoqda</span></p>
              <p>{t("Admin tekshirib tasdiqlagach, Premium status avtomatik faollashadi.")}</p>
            </div>
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setIsSubmitted(false);
              }}
              className="w-full py-3 bg-[#2D2A26] text-white text-xs font-bold rounded-2xl mt-2"
            >
              {t("Tushunarli")}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
