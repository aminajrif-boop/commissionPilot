import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  Globe,
  Flame,
  Wind,
  LayoutGrid,
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  Check,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export const HomeSections: React.FC = () => {
  const { 
    products, 
    reviews, 
    setCurrentPage, 
    setSelectedCategory, 
    setSelectedProduct,
    addSubscriber,
    language 
  } = useApp();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  // 4 categories tailored to the active curated offers
  const horizontalCategories = [
    {
      name: language === 'es' ? 'Tecnología & Viajes' : 'Tech & Travel',
      desc: language === 'es' ? 'Traducción y viajes' : 'Translation & gear',
      icon: Globe,
      categoryKey: 'Tecnología & Viajes'
    },
    {
      name: language === 'es' ? 'Hogar & Jardín' : 'Home & Garden',
      desc: language === 'es' ? 'Barbacoa y limpieza' : 'Grill & cleaning',
      icon: Flame,
      categoryKey: 'Hogar & Jardín'
    },
    {
      name: language === 'es' ? 'Climatización & Confort' : 'Cooling & Comfort',
      desc: language === 'es' ? 'Aire portátil USB-C' : 'Portable cooling',
      icon: Wind,
      categoryKey: 'Climatización & Confort'
    },
    {
      name: language === 'es' ? 'Todas las Ofertas' : 'All Offers',
      desc: language === 'es' ? 'Ver catálogo completo' : 'Browse full catalog',
      icon: LayoutGrid,
      categoryKey: 'All'
    }
  ];

  // Curated offers from catalog (3 primary offers)
  const featuredOffers = products.slice(0, 3);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setSubscribeError(language === 'es' ? 'Introduce un email válido' : 'Please enter a valid email');
      return;
    }
    setSubscribeError('');
    setIsSubscribing(true);

    try {
      const res = await addSubscriber(newsletterEmail, 'homepage_box');
      if (res.success) {
        setSubscribeSuccess(true);
        setNewsletterEmail('');
        setTimeout(() => setSubscribeSuccess(false), 5000);
      } else {
        setSubscribeError(res.message);
      }
    } catch (err: any) {
      setSubscribeError(err.message || 'Error subscribing');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="space-y-12 lg:space-y-16 py-8 sm:py-10">
      
      {/* ============================================================== */}
      {/* 1. HORIZONTAL CATEGORY BAR (Matches photo directly under hero)  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {horizontalCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(item.categoryKey)}
                className="bg-white border border-slate-200/90 hover:border-purple-300 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-[13px] text-slate-900 truncate group-hover:text-purple-700 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. OFERTAS DESTACADAS DE AFILIACIÓN (5 cards in photo)         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header with vertical purple line */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-[#7C3AED]" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'es' ? 'Ofertas y Productos Destacados' : 'Featured Deals & Products'}
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage('categories');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors whitespace-nowrap group cursor-pointer"
          >
            <span>{language === 'es' ? 'Ver todas las ofertas' : 'View all offers'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Offers in a spacious, high-visibility 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. ÚLTIMAS GUÍAS Y RECURSOS + NEWSLETTER BOX (Matches photo)    */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header with vertical purple line */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 rounded-full bg-[#7C3AED]" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'es' ? 'Últimas Guías y Artículos' : 'Latest Guides & Articles'}
          </h2>
        </div>

        {/* Content Grid: 3 Guide cards on left + Newsletter Card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: 3 Guide Articles (lg:col-span-7 or 8) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {reviews.slice(0, 3).map((guide) => (
              <article
                key={guide.id}
                onClick={() => setCurrentPage('reviews')}
                className="bg-white border border-slate-200/90 hover:border-purple-300 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                  <img
                    src={guide.image || '/assets/guide_thumb_1.png'}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-purple-700 backdrop-blur-xs shadow-xs">
                    {guide.badge || (language === 'es' ? 'Guía' : 'Guide')}
                  </span>
                </div>

                {/* Body */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-[13px] leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
                    {guide.title}
                  </h3>

                  {/* Metadata Date & Reading time */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{guide.publishDate}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{guide.readingTime}</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right: Newsletter Card (lg:col-span-5) */}
          <div 
            id="newsletter-box"
            className="lg:col-span-5 bg-gradient-to-br from-[#1E1B4B] via-[#241E5D] to-[#312E81] text-white p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-5 shadow-xl relative overflow-hidden"
          >
            {/* Background subtle glow */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

            {/* Header info */}
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-purple-600/40 border border-purple-400/30 text-purple-200 flex items-center justify-center shadow-xs">
                <Mail className="w-5 h-5 text-purple-300" />
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                {language === 'es' 
                  ? 'Recibe las mejores ofertas y herramientas en tu email' 
                  : 'Get the best deals & digital tools in your inbox'}
              </h3>

              <p className="text-xs text-purple-200/90 leading-relaxed font-normal">
                {language === 'es'
                  ? 'Suscríbete gratis y obtén guías, ofertas exclusivas y consejos de marketing digital.'
                  : 'Subscribe for free and receive verified guides, exclusive offers, and marketing growth tactics.'}
              </p>
            </div>

            {/* Subscription Form */}
            <div className="space-y-3 relative z-10">
              {subscribeSuccess ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'es' 
                      ? '¡Suscripción confirmada! Revisa tu bandeja de entrada.' 
                      : 'Subscription confirmed! Check your inbox.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email address'}
                      className="flex-1 px-3.5 py-2.5 bg-white text-slate-900 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
                    />

                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-purple-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-sm cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubscribing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <span>{language === 'es' ? 'Suscribirme' : 'Subscribe'}</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </div>

                  {subscribeError && (
                    <p className="text-[11px] text-rose-300 font-medium">{subscribeError}</p>
                  )}
                </form>
              )}

              {/* 3 Checkmark bullets */}
              <div className="pt-2 border-t border-purple-800/60 flex flex-wrap items-center gap-4 text-[11px] text-purple-200/90 font-medium">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>{language === 'es' ? 'Ofertas exclusivas' : 'Exclusive deals'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>{language === 'es' ? 'Guías prácticas' : 'Practical guides'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>{language === 'es' ? 'Sin spam' : 'No spam'}</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
