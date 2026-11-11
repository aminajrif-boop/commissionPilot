import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, CheckCircle2, ShieldCheck, Send, Sparkles, AlertCircle } from 'lucide-react';

interface BrevoNewsletterProps {
  sourceLocation?: string;
  className?: string;
}

export const BrevoNewsletter: React.FC<BrevoNewsletterProps> = ({ 
  sourceLocation = 'homepage',
  className = '' 
}) => {
  const { addSubscriber, brevoConfig, openLegalDoc, language } = useApp();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setFeedback({
        type: 'error',
        message: language === 'es' ? 'Por favor introduce un correo electrónico válido.' : 'Please enter a valid email address.'
      });
      return;
    }

    if (!consent) {
      setFeedback({
        type: 'error',
        message: language === 'es' ? 'Debes aceptar la política de privacidad para suscribirte.' : 'You must accept the privacy terms to subscribe.'
      });
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    const result = await addSubscriber(email, sourceLocation);
    setIsLoading(false);

    if (result.success) {
      setFeedback({ type: 'success', message: result.message });
      setEmail('');
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
  };

  // If user configured a custom Brevo Hosted Form URL or Iframe embed
  if (brevoConfig.formEmbedUrl) {
    return (
      <div className={`p-6 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden ${className}`}>
        <iframe
          src={brevoConfig.formEmbedUrl}
          title="Brevo Subscription Form"
          className="w-full min-h-[360px] border-0"
        />
      </div>
    );
  }

  return (
    <section className={`bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden ${className}`}>
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'Boletín Oficial Brevo' : 'Official Brevo Newsletter'}</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
          {language === 'es' 
            ? 'Recibe avisos exclusivos cuando verifiquemos ofertas del 50% al 60%' 
            : 'Get alerted the instant 50%-60% verified discounts go live'}
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {language === 'es'
            ? 'Te notificamos únicamente cuando comprobamos descuentos vigentes y condiciones oficiales en productos de salud y bienestar. Cero spam, baja inmediata con un solo clic.'
            : 'No marketing spam. We strictly broadcast genuine price drops, verified promo codes, and technical buyer advisories via our Brevo integration.'}
        </p>

        {/* Feedback message */}
        {feedback && (
          <div className={`p-3 rounded-xl text-xs max-w-md mx-auto flex items-center justify-center gap-2 ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-200' 
              : 'bg-rose-500/20 border border-rose-400/30 text-rose-200'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'es' ? 'Tu correo electrónico...' : 'Enter your email...'}
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/15"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-75"
            >
              <span>{isLoading ? (language === 'es' ? 'Enviando...' : 'Joining...') : (language === 'es' ? 'Suscribirme' : 'Join Alerts')}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* RGPD Consent Checkbox */}
          <div className="flex items-start justify-center gap-2 text-left pt-1">
            <input
              type="checkbox"
              id={`consent-${sourceLocation}`}
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-white/30 text-blue-600 focus:ring-blue-500 mt-0.5"
            />
            <label htmlFor={`consent-${sourceLocation}`} className="text-[11px] text-slate-400 leading-tight">
              {language === 'es' ? (
                <>
                  Acepto la{' '}
                  <button
                    type="button"
                    onClick={() => openLegalDoc('privacidad')}
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    Política de Privacidad
                  </button>{' '}
                  para gestionar mi suscripción con Brevo.
                </>
              ) : (
                <>
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => openLegalDoc('privacidad')}
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    Privacy Policy
                  </button>{' '}
                  for Brevo subscription processing.
                </>
              )}
            </label>
          </div>
        </form>

        {/* Trust marker */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'es' ? 'Protegido por Brevo CRM' : 'Powered by Brevo CRM'}</span>
          </div>
          <span>·</span>
          <span>{language === 'es' ? 'Baja en 1 clic garantizada' : 'Instant 1-click unsubscribe'}</span>
        </div>

      </div>
    </section>
  );
};
