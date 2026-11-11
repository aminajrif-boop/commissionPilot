import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, CheckCircle2, Sparkles, Tag, ShieldCheck, ArrowRight, Loader2, BellRing } from 'lucide-react';

const POPUP_SESSION_KEY = 'commissionpilot_popup_session_v2';

export const NewsletterPopup: React.FC = () => {
  const { 
    language, 
    addSubscriber, 
    openLegalDoc, 
    isNewsletterOpen, 
    setIsNewsletterOpen,
    cookiePreferences 
  } = useApp();

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Automatically trigger directly when entering the web page, after cookie popup is addressed
  useEffect(() => {
    if (!cookiePreferences.hasConsented) {
      return;
    }

    const timer = setTimeout(() => {
      setIsNewsletterOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cookiePreferences.hasConsented, setIsNewsletterOpen]);

  const handleClose = () => {
    setIsNewsletterOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg(language === 'es' ? 'Introduce una dirección de email válida.' : 'Please enter a valid email address.');
      return;
    }

    if (!consent) {
      setErrorMsg(language === 'es' ? 'Debes aceptar la política de privacidad para suscribirte.' : 'Please agree to the privacy policy to subscribe.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addSubscriber(email, 'popup_notification');
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          setIsNewsletterOpen(false);
          setSuccess(false);
        }, 2800);
      } else {
        setErrorMsg(result.message);
      }
    } catch (err: any) {
      setErrorMsg(language === 'es' ? 'Error al procesar la suscripción. Inténtalo de nuevo.' : 'Error processing subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isNewsletterOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-300"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-left animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top visual banner with brand gradient */}
        <div className="bg-gradient-to-tr from-[#0B0F19] via-[#1E1B4B] to-[#4338CA] px-6 pt-7 pb-6 text-white relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Cerrar notificación"
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-xs text-[11px] font-bold tracking-wide uppercase text-purple-200 mb-3 border border-purple-400/30 shadow-xs">
            <BellRing className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span>{language === 'es' ? '¡Boletín Oficial de Ofertas & Guías!' : 'Exclusive Deals Alert'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {language === 'es' 
              ? 'Suscríbete gratis y obtén guías, ofertas exclusivas y consejos de marketing digital' 
              : 'Subscribe for free and get guides, exclusive deals, and digital marketing insights'}
          </h3>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
            {language === 'es'
              ? 'Recibe alertas instantáneas en tu correo con las mejores promociones verificadas, comparativas y recursos para potenciar tu negocio.'
              : 'Get early notifications on verified price drops, affiliate software deals, and private reviews.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {success ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900">
                {language === 'es' ? '¡Bienvenido a la Comunidad!' : 'You Are Subscribed!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                {language === 'es'
                  ? 'Tu correo ha sido registrado con éxito. Recibirás las mejores ofertas y promociones exclusivas.'
                  : 'Your email has been added to our list. Expect curated deals in your inbox.'}
              </p>
            </div>
          ) : (
            <>
              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Tag className="w-3 h-3" />
                  </div>
                  <span className="font-semibold text-slate-800">
                    {language === 'es' ? 'Hasta -50% Dto.' : 'Up to 50% Off'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <span className="font-semibold text-slate-800">
                    {language === 'es' ? '0% Spam garantizado' : '100% Spam-Free'}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {errorMsg && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'es' ? 'Introduce tu correo electrónico...' : 'Enter your email...'}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all font-medium"
                  />
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="popup-consent-checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="popup-consent-checkbox" className="text-[11px] text-slate-500 leading-tight cursor-pointer">
                    {language === 'es' ? (
                      <>
                        Acepto la{' '}
                        <button
                          type="button"
                          onClick={() => { handleClose(); openLegalDoc('privacidad'); }}
                          className="text-purple-600 underline font-semibold"
                        >
                          Política de Privacidad
                        </button>{' '}
                        y recibir ofertas de CommissionPilot en mi correo. Baja en 1 clic.
                      </>
                    ) : (
                      <>
                        I accept the{' '}
                        <button
                          type="button"
                          onClick={() => { handleClose(); openLegalDoc('privacidad'); }}
                          className="text-purple-600 underline font-semibold"
                        >
                          Privacy Policy
                        </button>{' '}
                        and agree to deal notifications.
                      </>
                    )}
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-400 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'es' ? 'Suscribiendo...' : 'Subscribing...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{language === 'es' ? '¡Suscribirme y Recibir Ofertas!' : 'Subscribe Now'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Dismiss link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-[11px] font-medium text-slate-400 hover:text-slate-600 underline transition-colors cursor-pointer"
                >
                  {language === 'es' ? 'No gracias, continuar navegando' : 'No thanks, continue browsing'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
