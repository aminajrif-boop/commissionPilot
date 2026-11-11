import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cookie, Shield, Check, X, Settings2 } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { 
    cookiePreferences, 
    saveCookiePreferences, 
    isCookieModalOpen, 
    setIsCookieModalOpen,
    openLegalDoc,
    language 
  } = useApp();

  const [localAnalytics, setLocalAnalytics] = useState(cookiePreferences.analytics);
  const [localAffiliate, setLocalAffiliate] = useState(cookiePreferences.affiliateTracking);

  const handleAcceptAll = () => {
    saveCookiePreferences({
      analytics: true,
      affiliateTracking: true,
      hasConsented: true
    });
  };

  const handleRejectNonEssential = () => {
    saveCookiePreferences({
      analytics: false,
      affiliateTracking: false,
      hasConsented: true
    });
  };

  const handleSaveCustomPreferences = () => {
    saveCookiePreferences({
      analytics: localAnalytics,
      affiliateTracking: localAffiliate,
      hasConsented: true
    });
    setIsCookieModalOpen(false);
  };

  // If already consented and modal is not open, show nothing
  if (cookiePreferences.hasConsented && !isCookieModalOpen) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Bar if not yet consented */}
      {!cookiePreferences.hasConsented && !isCookieModalOpen && (
        <aside aria-label="Cookie consent" className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900 text-sm">
                  {language === 'es' ? 'Gestión de Cookies y Privacidad' : 'Cookie Preferences & Privacy'}
                </div>
                <p className="max-w-3xl leading-relaxed">
                  {language === 'es' ? (
                    <>
                      En <strong>commissionpilot.org</strong> utilizamos cookies técnicas necesarias para el funcionamiento del sitio y cookies analíticas y de atribución de afiliados para medir clics hacia tiendas externas. Cumplimos con el RGPD y la LSSI-CE española. Puedes consultar nuestra{' '}
                      <button 
                        onClick={() => openLegalDoc('cookies')} 
                        className="text-blue-600 underline font-semibold"
                      >
                        Política de Cookies
                      </button>.
                    </>
                  ) : (
                    <>
                      At <strong>commissionpilot.org</strong>, we use strictly necessary technical cookies to operate the site, and optional analytical and affiliate tracking cookies to measure external store referrals. We comply with EU GDPR and Spanish LSSI-CE. Learn more in our{' '}
                      <button 
                        onClick={() => openLegalDoc('cookies')} 
                        className="text-blue-600 underline font-semibold"
                      >
                        Cookie Policy
                      </button>.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsCookieModalOpen(true)}
                className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 underline decoration-slate-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                {language === 'es' ? 'Configurar' : 'Customize'}
              </button>

              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
                <span>{language === 'es' ? 'Rechazar Cookies' : 'Reject Cookies'}</span>
              </button>

              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl transition-all whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Aceptar Cookies' : 'Accept Cookies'}</span>
              </button>
            </div>

          </div>
        </aside>
      )}

      {/* Detailed Preferences Modal */}
      {isCookieModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">
                  {language === 'es' ? 'Configuración de Cookies' : 'Cookie Preferences Center'}
                </h2>
              </div>
              <button
                onClick={() => setIsCookieModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-4 text-xs">
              
              {/* Technical / Essential */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>{language === 'es' ? 'Cookies Técnicas y Esenciales' : 'Technical & Strictly Necessary'}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                      {language === 'es' ? 'Obligatorias' : 'Required'}
                    </span>
                  </div>
                  <p className="text-slate-600">
                    {language === 'es'
                      ? 'Garantizan la navegación, persistencia de filtros de producto y el registro seguro de este consentimiento. No se pueden desactivar.'
                      : 'Required for core website functionality, security integrity, and remembering your privacy settings.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  disabled
                  checked
                  className="w-4 h-4 rounded text-blue-600 mt-1 cursor-not-allowed opacity-75"
                />
              </div>

              {/* Affiliate Attribution */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">
                    {language === 'es' ? 'Cookies de Atribución de Afiliados' : 'Affiliate Referral Tracking'}
                  </div>
                  <p className="text-slate-600">
                    {language === 'es'
                      ? 'Permiten a las plataformas de destino (Amazon, Awin, CJ) reconocer que llegaste desde CommissionPilot para acreditar posibles comisiones sin coste para ti.'
                      : 'Allows external merchant stores (Amazon, Awin, CJ) to recognize referrals originating from CommissionPilot without adding any cost.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={localAffiliate}
                  onChange={(e) => setLocalAffiliate(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                />
              </div>

              {/* Analytics */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">
                    {language === 'es' ? 'Cookies Analíticas y Estadísticas' : 'Anonymous Analytics'}
                  </div>
                  <p className="text-slate-600">
                    {language === 'es'
                      ? 'Nos ayudan a saber qué categorías o productos resultan más útiles a los usuarios para enriquecer el catálogo editorial.'
                      : 'Helps us analyze aggregated traffic metrics and popular comparison queries to improve catalog curation.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={localAnalytics}
                  onChange={(e) => setLocalAnalytics(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                />
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                {language === 'es' ? 'Rechazar Cookies' : 'Reject Cookies'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveCustomPreferences}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                >
                  {language === 'es' ? 'Guardar Selección' : 'Save Selection'}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  {language === 'es' ? 'Aceptar Cookies' : 'Accept Cookies'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
