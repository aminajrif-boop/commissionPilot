import React from 'react';
import { useApp } from '../context/AppContext';
import { Rocket, BookOpen, CheckCircle, BarChart3, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { 
    setCurrentPage, 
    setSelectedCategory,
    language 
  } = useApp();

  return (
    <section className="relative overflow-hidden bg-[#0A0E1A] text-white pt-8 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-800/80">
      {/* Subtle radial glow in background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines, CTAs, Trust points */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.14]">
              {language === 'es' ? (
                <>
                  Gadgets Innovadores <br className="hidden sm:inline" />
                  y <span className="text-[#A855F7] bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">Ofertas Verificadas</span>
                </>
              ) : (
                <>
                  Innovative Gadgets <br className="hidden sm:inline" />
                  & <span className="text-[#A855F7] bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">Verified Deals</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              {language === 'es'
                ? 'Descubre los mejores gadgets, dispositivos y soluciones prácticas para tu día a día con análisis reales y descuentos exclusivos verificados.'
                : 'Discover top innovative gadgets, smart devices, and practical solutions with honest reviews and verified discounts.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage('categories');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl transition-all shadow-lg shadow-purple-950/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                <span>{language === 'es' ? 'Ver Todas las Ofertas' : 'Explore All Deals'}</span>
                <span>→</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('reviews');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 rounded-xl transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>{language === 'es' ? 'Leer Guías' : 'Read Guides'}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('contact');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-300 bg-slate-900/60 hover:bg-slate-800 hover:text-white border border-slate-700/60 rounded-xl transition-all cursor-pointer"
              >
                <span>{language === 'es' ? 'Contacto' : 'Contact'}</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{language === 'es' ? 'Ofertas 100% verificadas' : '100% Verified deals'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{language === 'es' ? 'Análisis imparciales' : 'Unbiased reviews'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{language === 'es' ? 'Ahorra tiempo y dinero' : 'Save time & money'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Laptop Showcase from user design */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl shadow-purple-950/30 group bg-slate-950">
              <img
                src="/assets/hero_desk_laptop.png"
                alt="CommissionPilot Digital Deals & Marketing Showcase"
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                loading="eager"
              />

              {/* Floating revenue glass pill overlay for crisp interactivity */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/60 rounded-xl flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">
                    {language === 'es' ? 'Ofertas y Ahorro Verificado' : 'Verified Deals & Active Savings'}
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-400">+32% Ahorro</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
