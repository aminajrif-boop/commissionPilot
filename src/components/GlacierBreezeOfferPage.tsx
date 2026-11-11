import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Check, 
  Droplets, 
  Power, 
  Wind, 
  BatteryCharging, 
  ExternalLink, 
  Percent, 
  Star,
  CheckCircle2,
  AlertCircle,
  Copy,
  Share2
} from 'lucide-react';

export const GlacierBreezeOfferPage: React.FC = () => {
  const { 
    setCurrentPage, 
    setPendingRedirect, 
    recordClick, 
    products, 
    language 
  } = useApp();

  // Find product in catalog or fallback
  const glacierProduct = products.find(p => p.id === 'prod-glacier-breeze-ac') || {
    id: 'prod-glacier-breeze-ac',
    name: 'Glacier Breeze Portable AC',
    slug: 'glacier-breeze-portable-ac',
    category: 'Home & Lifestyle',
    brand: 'Glacier Breeze',
    price: 54.99,
    currency: 'EUR',
    priceVerifiedDate: 'Verificado Hoy',
    store: 'Distribuidor Oficial Glacier Breeze',
    affiliateNetwork: 'Direct Partner',
    affiliateUrl: 'https://www.autocustompack.com/5111QJJ/2BW43X2S/?creative_id=62347',
    image: 'https://onninest.com/glacierbreeze/images/pre/product.webp',
    logoImage: 'https://onninest.com/glacierbreeze/images/inter/logo.webp',
    badgeTag: '50% Dto. Flash',
    commissionRate: '50% dto. (54,99 € antes 109,98 €)',
    ctaLabel: 'Ver Oferta al 50%',
    summary: 'Climatizador personal portátil recargable con batería de 10 horas y depósito hydro-chill.',
    description: '',
    features: [],
    pros: [],
    cons: [],
    specs: {},
    ratingScore: 9.8
  };

  // Simulated countdown timer for urgency (14 min 35 sec)
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 35 });
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 14, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimOffer = (origin: string = 'hero_cta') => {
    recordClick(
      glacierProduct.id,
      glacierProduct.name,
      glacierProduct.store,
      glacierProduct.affiliateNetwork as any,
      glacierProduct.affiliateUrl
    );
    setPendingRedirect({
      product: glacierProduct as any,
      store: glacierProduct.store,
      url: glacierProduct.affiliateUrl
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="bg-[#070A12] text-white min-h-screen selection:bg-purple-600 selection:text-white">
      
      {/* ============================================================== */}
      {/* 1. TOP ANNOUNCEMENT BAR (CommissionPilot Style)                */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 border-b border-purple-800/50 py-2.5 px-4 text-center text-xs font-semibold text-purple-100 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>
          {language === 'es'
            ? 'OFERTA FLASH EXCLUSIVA: 50% de descuento directo en el distribuidor oficial'
            : 'EXCLUSIVE FLASH DEAL: 50% instant discount at authorized distributor'}
        </span>
        <span className="hidden sm:inline bg-purple-800/80 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-300">
          {language === 'es' ? 'AHORRA 54,99 €' : 'SAVE $54.99'}
        </span>
      </div>

      {/* ============================================================== */}
      {/* 2. SUB-HEADER & BREADCRUMB NAVIGATION                          */}
      {/* ============================================================== */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-800/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-purple-400 font-medium truncate max-w-[200px] sm:max-w-none">
            {language === 'es' ? 'Ofertas Verificadas' : 'Verified Deals'}
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-none">
            Glacier Breeze
          </span>
        </div>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">{language === 'es' ? '¡Enlace copiado!' : 'Link copied!'}</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Compartir Oferta' : 'Share Deal'}</span>
            </>
          )}
        </button>
      </nav>

      {/* ============================================================== */}
      {/* 3. HERO SPLIT SECTION (High-Conversion Layout)                 */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-20">
        
        {/* Ambient radial lighting */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Offer Headlines, Specs & CTA */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Brand Header & Category Tag */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white px-3.5 py-1.5 rounded-xl flex items-center shadow-md">
                  <img 
                    src="https://onninest.com/glacierbreeze/images/inter/logo.webp" 
                    alt="Glacier Breeze Official Logo" 
                    className="h-6 w-auto object-contain"
                  />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {language === 'es' ? 'Climatización Portátil · Alerta de Oferta' : 'Portable Cooling · Deal Alert'}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {language === 'es' ? '50% Descuento' : '50% Off'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                {language === 'es' ? (
                  <>
                    Enfría tu espacio personal <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                      sin gastar en aire acondicionado
                    </span> tradicional todo el día
                  </>
                ) : (
                  <>
                    Cool Your Personal Space <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                      Without Running Full-Size AC
                    </span> All Day
                  </>
                )}
              </h1>

              {/* Body Summary */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {language === 'es' ? (
                  <>
                    <strong>Glacier Breeze - Portable AC</strong> es un climatizador compacto diseñado para confort focalizado: funcionamiento inalámbrico con hasta 10 horas de autonomía, conector universal USB-C y depósito hydro-chill para agua fría o cubitos de hielo.
                  </>
                ) : (
                  <>
                    <strong>Glacier Breeze - Portable AC</strong> is a compact cooling option designed for targeted comfort, with cordless operation, USB-C power, and a water or ice reservoir for instant relief.
                  </>
                )}
              </p>

              {/* Price & Savings Highlight Box */}
              <div className="p-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl space-y-3 shadow-xl backdrop-blur-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      {language === 'es' ? 'Promoción Activa Verificada' : 'Verified Promotional Price'}
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                        54,99 €
                      </span>
                      <span className="text-lg font-mono text-slate-400 line-through">
                        109,98 €
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                        -50%
                      </span>
                    </div>
                  </div>

                  {/* Stock countdown alert */}
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                      <span>
                        {language === 'es' ? 'Oferta temporal' : 'Limited time'}: {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {language === 'es' ? 'Garantía oficial de 90 días incluida' : '90-day money back guarantee included'}
                    </div>
                  </div>
                </div>

                {/* Micro note */}
                <p className="text-xs text-cyan-300/90 italic pt-1 border-t border-slate-800">
                  {language === 'es'
                    ? '✓ Descuento del 50% aplicado automáticamente a través del enlace oficial autorizado.'
                    : '✓ 50% discount applied automatically through official authorized portal link.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => handleClaimOffer('hero_cta')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-xl shadow-purple-950/60 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Wind className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                  <span>
                    {language === 'es'
                      ? 'RECLAMAR 50% DE DESCUENTO (54,99 €)'
                      : 'CLAIM 50% DISCOUNT ($54.99)'}
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Trust guarantee points */}
                <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'es' ? '90 días de garantía total' : '90-day money-back guarantee'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'es' ? 'Distribuidor oficial verificado' : 'Verified official distributor'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BatteryCharging className="w-4 h-4 text-cyan-400" />
                    <span>{language === 'es' ? 'Envío rápido con seguimiento' : 'Fast tracked shipping'}</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: High-Res Visual Product Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden group">
                
                {/* Floating Discount Tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? '50% DESCUENTO' : '50% OFF'}</span>
                </div>

                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-emerald-400 text-xs font-mono font-bold rounded-lg">
                  {language === 'es' ? 'En Stock' : 'In Stock'}
                </div>

                {/* Product Image */}
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-950/60 border border-slate-800 flex items-center justify-center p-4 relative">
                  <img
                    src="https://onninest.com/glacierbreeze/images/pre/product.webp"
                    alt="Glacier Breeze - Portable AC Unit"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                </div>

                {/* Quick specs pill badges below photo */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <div className="text-[11px] text-slate-400">{language === 'es' ? 'Potencia' : 'Power'}</div>
                    <div className="text-xs font-bold text-cyan-300 mt-0.5">USB-C 5V</div>
                  </div>
                  <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <div className="text-[11px] text-slate-400">{language === 'es' ? 'Ruido' : 'Noise'}</div>
                    <div className="text-xs font-bold text-cyan-300 mt-0.5">&lt; 30 dB</div>
                  </div>
                  <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <div className="text-[11px] text-slate-400">{language === 'es' ? 'Garantía' : 'Guarantee'}</div>
                    <div className="text-xs font-bold text-cyan-300 mt-0.5">90 {language === 'es' ? 'Días' : 'Days'}</div>
                  </div>
                </div>

                {/* Quick direct action button */}
                <button
                  onClick={() => handleClaimOffer('card_cta')}
                  className="w-full mt-4 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <span>{language === 'es' ? 'Ver Detalles en Distribuidor Oficial' : 'View On Official Store'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. 3 CORE STATS CELLS (Adapted from HTML stats)                */}
      {/* ============================================================== */}
      <section className="border-y border-slate-800 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            {/* Stat 1 */}
            <div className="py-8 sm:py-10 px-6 text-center space-y-2 group hover:bg-slate-900/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                10h
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                {language === 'es' ? 'Enfriamiento Inalámbrico' : 'Cordless Cooling'}
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {language === 'es'
                  ? 'Batería de larga duración recargable mediante USB-C para llevarlo a cualquier habitación o terraza.'
                  : 'Long-lasting battery recharged via USB-C for untethered comfort anywhere in your home.'}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="py-8 sm:py-10 px-6 text-center space-y-2 group hover:bg-slate-900/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                500ml
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
                {language === 'es' ? 'Depósito Hydro-Chill' : 'Water Reservoir'}
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {language === 'es'
                  ? 'Compatible con agua fría y cubitos de hielo para generar una brisa helada y refrescante al instante.'
                  : 'Top-fill tank accommodates cold water and ice cubes to blast refreshing chilled air.'}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="py-8 sm:py-10 px-6 text-center space-y-2 group hover:bg-slate-900/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                3
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                {language === 'es' ? 'Velocidades Silenciosas' : 'Fan Speeds'}
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {language === 'es'
                  ? 'Ajuste de flujo de aire ultra silencioso para trabajar concentrado o dormir profundamente.'
                  : 'Multi-speed whisper-quiet motor allows focused productivity or undisturbed night sleep.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. HOW IT WORKS (3 Simple Steps adapted with CommissionPilot)  */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Funcionamiento Sencillo' : 'How It Works'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {language === 'es'
              ? 'Tres sencillos pasos para enfriar tu espacio'
              : 'Three Simple Steps to Personal Cooling'}
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {language === 'es'
              ? 'Glacier Breeze ha sido diseñado sin complicaciones técnicas: añade agua o hielo, enciéndelo y ajusta el flujo de aire al nivel exacto que deseas.'
              : 'Glacier Breeze is designed to be effortless: add water or ice, power it on, and adjust airflow for custom targeted cooling.'}
          </p>
        </div>

        {/* 3 Steps in Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-purple-500/50 transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/50 text-purple-300 font-mono font-bold flex items-center justify-center text-lg">
                1
              </span>
              <Droplets className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              {language === 'es' ? 'Llena el depósito' : 'Fill the tank'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Vierte agua fría en el depósito superior de 500 ml. Para un frescor extra intenso en días calurosos, añade cubitos de hielo directamente.'
                : 'Pour chilled water into the 500ml top reservoir. For maximum chill on scorchingly hot afternoons, drop in standard ice cubes.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-cyan-600/30 border border-cyan-500/50 text-cyan-300 font-mono font-bold flex items-center justify-center text-lg">
                2
              </span>
              <Power className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              {language === 'es' ? 'Enciéndelo con 1 clic' : 'Turn it on'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Pulsa el botón de encendido y selecciona entre sus 3 intensidades de ventilador la brisa perfecta para trabajar, relajarte o descansar.'
                : 'Press the intuitive power switch and choose from 3 fan settings to tailor the exact breeze strength for work or sleep.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-teal-500/50 transition-all hover:-translate-y-1 group">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-500/50 text-teal-300 font-mono font-bold flex items-center justify-center text-lg">
                3
              </span>
              <Wind className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
              {language === 'es' ? 'Siente el frescor' : 'Feel the chill'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Disfruta de una corriente continua de aire frío y húmedo que desciende la temperatura en tu radio personal en menos de 60 segundos.'
                : 'Experience an immediate stream of cool, conditioned air that drops ambient temperature around your immediate zone in under 60 seconds.'}
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. COMPARISON MATRIX (Glacier Breeze vs AC vs Fan)              */}
      {/* ============================================================== */}
      <section className="py-12 bg-slate-950/60 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {language === 'es'
                ? '¿Por qué elegir Glacier Breeze frente a otras opciones?'
                : 'Why Choose Glacier Breeze Over Alternatives?'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'es'
                ? 'Comparativa técnica de consumo, portabilidad y coste frente al aire tradicional y ventiladores de aspas.'
                : 'Objective engineering comparison across power consumption, portability, and upfront cost.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-800 rounded-xl overflow-hidden bg-slate-900/90">
              <thead>
                <tr className="bg-slate-800/90 border-b border-slate-700 text-slate-300">
                  <th className="p-3.5 font-bold uppercase">{language === 'es' ? 'Criterio' : 'Feature'}</th>
                  <th className="p-3.5 font-bold text-cyan-300 bg-cyan-950/40">Glacier Breeze Portable AC</th>
                  <th className="p-3.5 font-bold">{language === 'es' ? 'Aire Central Tradicional' : 'Traditional Central AC'}</th>
                  <th className="p-3.5 font-bold">{language === 'es' ? 'Ventilador Convencional' : 'Regular Blade Fan'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3.5 font-semibold text-slate-400">{language === 'es' ? 'Precio de adquisición' : 'Purchase Cost'}</td>
                  <td className="p-3.5 font-bold text-emerald-400 bg-cyan-950/20">54,99 € ({language === 'es' ? 'Oferta 50%' : '50% Deal'})</td>
                  <td className="p-3.5 text-slate-400">&gt; 800 € - 2.500 €</td>
                  <td className="p-3.5 text-slate-400">30 € - 60 €</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-400">{language === 'es' ? 'Gasto de electricidad' : 'Electricity Cost'}</td>
                  <td className="p-3.5 font-bold text-emerald-400 bg-cyan-950/20">~0,02 € / {language === 'es' ? 'día (USB-C)' : 'day (USB)'}</td>
                  <td className="p-3.5 text-rose-400 font-semibold">&gt; 4 € - 8 € / {language === 'es' ? 'día' : 'day'}</td>
                  <td className="p-3.5 text-slate-400">~0,30 € / {language === 'es' ? 'día' : 'day'}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-400">{language === 'es' ? 'Portabilidad inalámbrica' : 'Cordless Portability'}</td>
                  <td className="p-3.5 font-bold text-emerald-400 bg-cyan-950/20">✓ {language === 'es' ? 'Hasta 10h sin cables' : 'Up to 10h battery'}</td>
                  <td className="p-3.5 text-rose-400">✕ {language === 'es' ? 'Fijo en la pared' : 'Fixed wall mount'}</td>
                  <td className="p-3.5 text-slate-400">✕ {language === 'es' ? 'Requiere enchufe' : 'Corded plug only'}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-400">{language === 'es' ? 'Enfriamiento real del aire' : 'True Cooling Effect'}</td>
                  <td className="p-3.5 font-bold text-emerald-400 bg-cyan-950/20">✓ {language === 'es' ? 'Hydro-chill con agua y hielo' : 'Hydro-chill with ice/water'}</td>
                  <td className="p-3.5 text-emerald-400">✓ {language === 'es' ? 'Compresor frigorífico' : 'Compressor refrigerant'}</td>
                  <td className="p-3.5 text-rose-400">✕ {language === 'es' ? 'Solo remueve aire caliente' : 'Circulates warm air only'}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-400">{language === 'es' ? 'Garantía de satisfacción' : 'Guarantee'}</td>
                  <td className="p-3.5 font-bold text-emerald-400 bg-cyan-950/20">90 {language === 'es' ? 'Días 100% Devolución' : 'Days Money-Back'}</td>
                  <td className="p-3.5 text-slate-400">{language === 'es' ? 'Garantía limitada de averías' : 'Repair warranty only'}</td>
                  <td className="p-3.5 text-slate-400">14 {language === 'es' ? 'Días' : 'Days'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. VERIFIED TESTIMONIAL SECTION                                */}
      {/* ============================================================== */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-slate-800 rounded-3xl p-7 sm:p-9 space-y-5 relative shadow-xl">
          
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
            <span className="text-xs text-slate-400 ml-2 font-mono">5.0 / 5.0</span>
          </div>

          <blockquote className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
            {language === 'es' ? (
              <>
                «Tenía dudas sobre si un aparato tan compacto enfriaría mi despacho. En 5 minutos la temperatura de mi mesa de trabajo bajó radicalmente sin tener que encender el aire acondicionado central de toda la casa. La batería aguanta toda mi jornada laboral y apenas hace ruido.»
              </>
            ) : (
              <>
                “I was skeptical about whether such a compact unit could cool my home office. Within five minutes the air temperature around my desk plummeted without firing up whole-house central air. The battery lasts through my entire workday with almost no noise.”
              </>
            )}
          </blockquote>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-white">Marta R. · Barcelona</div>
              <div className="text-slate-400">{language === 'es' ? 'Compradora verificada' : 'Verified Buyer'} · Teletrabajo & Hogar</div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'es' ? 'Compra Verificada' : 'Verified Order'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. BOTTOM CTA CONVERSION BLOCK                                 */}
      {/* ============================================================== */}
      <section className="pb-20 pt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-cyan-900 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden border border-purple-500/30">
          
          {/* Ambient glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-block px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-cyan-200 tracking-wider uppercase border border-white/10">
              {language === 'es' ? 'AHORRO DEL 50% POR TIEMPO LIMITADO' : 'LIMITED-TIME 50% SAVINGS'}
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'es'
                ? 'Consigue tu Glacier Breeze por solo 54,99 €'
                : 'Get Your Glacier Breeze For Only $54.99'}
            </h2>

            <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto leading-relaxed">
              {language === 'es'
                ? 'El precio de lista de 109,98 € está rebajado a 54,99 € mientras queden unidades asignadas a esta promoción estacional.'
                : 'The standard $109.98 list price is promoted at $54.99 while current inventory allocation remains available.'}
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <button
              onClick={() => handleClaimOffer('bottom_cta')}
              className="inline-flex items-center gap-3 px-9 py-4 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Wind className="w-5 h-5 text-purple-700" />
              <span>{language === 'es' ? 'VER OFERTA AL 50% EN DISTRIBUIDOR' : 'CHECK THE 50% DISCOUNT'}</span>
              <ArrowRight className="w-5 h-5 text-purple-700" />
            </button>

            <div className="text-xs text-purple-200/80 font-medium">
              {language === 'es'
                ? '✓ 90 días de garantía de reembolso sin preguntas indicada en la oferta oficial.'
                : '✓ 90-day money-back guarantee stated in the official distributor offer.'}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. TRANSPARENT COMPLIANCE FOOTER                               */}
      {/* ============================================================== */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 space-y-2">
        <p>
          {language === 'es'
            ? 'Esta oferta es una recomendación curada y verificada de CommissionPilot (commissionpilot.org). Recibes esta información como parte de nuestras alertas de ofertas en confort y estilo de vida.'
            : 'This offer is a curated verified recommendation from CommissionPilot (commissionpilot.org). You are viewing this update as part of our lifestyle cooling alerts.'}
        </p>
        <p>
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-purple-400 hover:text-purple-300 underline cursor-pointer"
          >
            {language === 'es' ? 'Volver a CommissionPilot' : 'Return to CommissionPilot'}
          </button>
          {' · '}
          <button 
            onClick={() => setCurrentPage('affiliate-disclosure')}
            className="text-slate-400 hover:text-white underline cursor-pointer"
          >
            {language === 'es' ? 'Transparencia Editorial' : 'Editorial Disclosure'}
          </button>
        </p>
      </footer>

    </div>
  );
};
