import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, ShieldCheck, ArrowRight, X, Clock } from 'lucide-react';

export const AffiliateRedirectModal: React.FC = () => {
  const { pendingRedirect, setPendingRedirect, language } = useApp();
  const [secondsRemaining, setSecondsRemaining] = useState(3);

  useEffect(() => {
    if (!pendingRedirect) {
      setSecondsRemaining(3);
      return;
    }

    setSecondsRemaining(3);
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Redirect in a safe window/tab
          window.open(pendingRedirect.url, '_blank', 'noopener,noreferrer');
          setPendingRedirect(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pendingRedirect, setPendingRedirect]);

  if (!pendingRedirect) return null;

  const handleInstantProceed = () => {
    window.open(pendingRedirect.url, '_blank', 'noopener,noreferrer');
    setPendingRedirect(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'es' ? 'Redirección Segura' : 'Secure Store Redirect'}</span>
          </div>

          <button
            onClick={() => setPendingRedirect(null)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Snapshot */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <img
            src={pendingRedirect.product.image}
            alt={pendingRedirect.product.name}
            className="w-14 h-14 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">
              {pendingRedirect.product.name}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              ${pendingRedirect.product.price.toFixed(2)} · {pendingRedirect.store}
            </div>
          </div>
        </div>

        {/* Disclosure Notice */}
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>
            {language === 'es' ? (
              <>
                Te estás dirigiendo a <strong>{pendingRedirect.store}</strong> para acceder a la oferta verificada en su web oficial.
              </>
            ) : (
              <>
                You are connecting to <strong>{pendingRedirect.store}</strong> to access this verified offer on their official website.
              </>
            )}
          </p>
          <p className="text-[11px] text-slate-500 bg-purple-50/60 p-2.5 rounded-lg border border-purple-100">
            {language === 'es'
              ? 'CommissionPilot puede recibir una compensación del distribuidor si realizas una compra cualificada, sin ningún coste adicional para ti.'
              : 'CommissionPilot may earn a merchant referral compensation on qualifying orders. Your price remains exactly the same.'}
          </p>
        </div>

        {/* Actions & Countdown */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{secondsRemaining > 0 ? `${secondsRemaining}s...` : 'Redirigiendo...'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPendingRedirect(null)}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {language === 'es' ? 'Cancelar' : 'Cancel'}
            </button>
            <button
              onClick={handleInstantProceed}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
            >
              <span>{language === 'es' ? 'Ir a la Tienda' : 'Proceed Now'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
