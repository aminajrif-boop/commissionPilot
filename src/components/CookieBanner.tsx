import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cookie, Shield, Check, X, Settings2, SlidersHorizontal, ArrowLeft, ExternalLink } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { 
    cookiePreferences, 
    saveCookiePreferences, 
    isCookieModalOpen, 
    setIsCookieModalOpen,
    openLegalDoc, 
    language 
  } = useApp();

  // Mode: either 'overview' (the 3 quick buttons: Accept all, Reject, Customize) or 'customize'
  const [showDetailedView, setShowDetailedView] = useState(false);

  const [localAnalytics, setLocalAnalytics] = useState(cookiePreferences.analytics);
  const [localAffiliate, setLocalAffiliate] = useState(cookiePreferences.affiliateTracking);

  // If already consented and modal is not triggered from footer/header, don't show
  if (cookiePreferences.hasConsented && !isCookieModalOpen) {
    return null;
  }

  const handleAcceptAll = () => {
    saveCookiePreferences({
      analytics: true,
      affiliateTracking: true,
      hasConsented: true
    });
    setIsCookieModalOpen(false);
    setShowDetailedView(false);
  };

  const handleRejectNonEssential = () => {
    saveCookiePreferences({
      analytics: false,
      affiliateTracking: false,
      hasConsented: true
    });
    setIsCookieModalOpen(false);
    setShowDetailedView(false);
  };

  const handleSaveCustomPreferences = () => {
    saveCookiePreferences({
      analytics: localAnalytics,
      affiliateTracking: localAffiliate,
      hasConsented: true
    });
    setIsCookieModalOpen(false);
    setShowDetailedView(false);
  };

  const handleClose = () => {
    // If closing without explicit choice, keep default essential-only consent
    if (!cookiePreferences.hasConsented) {
      saveCookiePreferences({
        analytics: false,
        affiliateTracking: false,
        hasConsented: true
      });
    }
    setIsCookieModalOpen(false);
    setShowDetailedView(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 px-6 py-5 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-md font-bold shrink-0">
              <Cookie className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="cookie-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {language === 'es' ? 'Centro de Privacidad y Cookies' : 'Cookie Privacy & Consent'}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  <Shield className="w-3 h-3" />
                  RGPD & LSSI-CE
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'es' ? 'Transparencia en el uso de cookies y enlaces de afiliación' : 'Transparency in cookies and affiliate referrals'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Cerrar modal de cookies"
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Scrollable if small screen */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {!showDetailedView ? (
            /* --- Overview Mode --- */
            <>
              <p className="text-slate-700">
                {language === 'es' ? (
                  <>
                    En <strong>commissionpilot.org</strong> utilizamos cookies propias y de terceros con el fin de garantizar el funcionamiento técnico del sitio web, analizar el tráfico de navegación y registrar de manera transparente la atribución de compras a través de nuestros enlaces de afiliados (como Amazon, CJ, Awin), sin ningún coste extra para ti.
                  </>
                ) : (
                  <>
                    At <strong>commissionpilot.org</strong>, we use first and third-party cookies to ensure technical functionality, understand aggregated site traffic, and attribute affiliate purchases to partner platforms (such as Amazon, CJ, Awin) at no added cost to you.
                  </>
                )}
              </p>

              {/* Categorization Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center justify-between mb-1">
                    <span>{language === 'es' ? 'Técnicas' : 'Strictly Necessary'}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                      {language === 'es' ? 'Activas' : 'Active'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {language === 'es' ? 'Imprescindibles para navegar y recordar tus decisiones.' : 'Essential for site operation & security.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center justify-between mb-1">
                    <span>{language === 'es' ? 'Atribución Afiliados' : 'Affiliate Tracking'}</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-medium">
                      {language === 'es' ? 'Configurable' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {language === 'es' ? 'Acredita comisiones al comprar en tiendas oficiales.' : 'Credits external merchant referrals.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center justify-between mb-1">
                    <span>{language === 'es' ? 'Analíticas' : 'Analytics'}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-medium">
                      {language === 'es' ? 'Configurable' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {language === 'es' ? 'Métricas anónimas para mejorar el catálogo.' : 'Anonymous stats to improve curation.'}
                  </p>
                </div>
              </div>

              {/* Legal Link */}
              <div className="text-xs text-slate-500 pt-1 flex items-center gap-1.5">
                <span>{language === 'es' ? 'Para más información, consulta nuestra' : 'For more information, see our'}</span>
                <button 
                  onClick={() => {
                    setIsCookieModalOpen(false);
                    openLegalDoc('cookies');
                  }} 
                  className="text-purple-700 hover:text-purple-900 font-semibold underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  <span>{language === 'es' ? 'Política de Cookies' : 'Cookie Policy'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </>
          ) : (
            /* --- Detailed / Modify Mode --- */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {language === 'es' ? 'Personalizar categorías de cookies' : 'Customize cookie categories'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'es' ? 'Marca o desmarca según tus preferencias personales.' : 'Toggle categories based on your preferences.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetailedView(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Volver' : 'Back'}</span>
                </button>
              </div>

              {/* 1. Technical */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-2 text-xs sm:text-sm">
                    <span>{language === 'es' ? '1. Cookies Técnicas y de Navegación' : '1. Technical & Functional'}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                      {language === 'es' ? 'OBLIGATORIAS' : 'REQUIRED'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {language === 'es'
                      ? 'Garantizan la navegación segura, el filtrado de ofertas y el registro de este consentimiento. No se pueden desactivar.'
                      : 'Essential for browsing, security, and remembering your privacy settings. Cannot be disabled.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  disabled
                  checked
                  aria-label="Cookies técnicas obligatorias"
                  className="w-5 h-5 rounded text-purple-600 mt-1 cursor-not-allowed opacity-80"
                />
              </div>

              {/* 2. Affiliate Tracking */}
              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <span>{language === 'es' ? '2. Cookies de Atribución de Afiliados' : '2. Affiliate Referral Tracking'}</span>
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-semibold">
                      {language === 'es' ? 'Recomendado' : 'Recommended'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {language === 'es'
                      ? 'Permiten a las plataformas de las marcas (Amazon, Awin, CJ) reconocer de forma segura que el enlace provino de CommissionPilot para acreditar comisiones sin coste extra.'
                      : 'Allows merchant platforms (Amazon, Awin, CJ) to verify external store referrals without adding any cost to you.'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={localAffiliate}
                    onChange={(e) => setLocalAffiliate(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                </label>
              </div>

              {/* 3. Analytics */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    {language === 'es' ? '3. Cookies Analíticas y de Rendimiento' : '3. Anonymous Analytics'}
                  </div>
                  <p className="text-xs text-slate-600">
                    {language === 'es'
                      ? 'Recogen información estadística anónima sobre visitas y artículos más leídos para optimizar el contenido editorial del portal.'
                      : 'Collects aggregated anonymous traffic stats to help improve guides and deal reviews.'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={localAnalytics}
                    onChange={(e) => setLocalAnalytics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0">
          {!showDetailedView ? (
            /* --- Overview Actions: 3 Clear Options --- */
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              
              <button
                type="button"
                onClick={() => setShowDetailedView(true)}
                className="order-3 sm:order-1 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span>{language === 'es' ? 'Modificar preferencias' : 'Customize preferences'}</span>
              </button>

              <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <X className="w-4 h-4 text-slate-500" />
                  <span>{language === 'es' ? 'Rechazar cookies' : 'Reject cookies'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === 'es' ? 'Aceptar todas' : 'Accept all cookies'}</span>
                </button>
              </div>

            </div>
          ) : (
            /* --- Detailed Actions --- */
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={() => setShowDetailedView(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'es' ? 'Volver a la vista general' : 'Back to overview'}</span>
              </button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  {language === 'es' ? 'Rechazar no esenciales' : 'Reject optional'}
                </button>

                <button
                  type="button"
                  onClick={handleSaveCustomPreferences}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{language === 'es' ? 'Guardar mi selección' : 'Save selection'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-all cursor-pointer"
                >
                  {language === 'es' ? 'Aceptar todas' : 'Accept all'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
