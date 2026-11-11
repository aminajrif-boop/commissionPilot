import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ChevronDown, Menu, X, ArrowUpRight, Lock } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    setSelectedCategory, 
    setSelectedProduct, 
    language,
    setLanguage,
    searchQuery,
    setSearchQuery,
    setIsAdminOpen,
    setIsNewsletterOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navigateTo = (page: typeof currentPage, category: string = 'All') => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNewsletter = () => {
    setIsNewsletterOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19] border-b border-slate-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark with upward chart icon */}
        <button 
          onClick={() => navigateTo('home')} 
          className="flex items-center gap-2.5 text-lg sm:text-xl font-black tracking-tight text-white hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 group text-left"
        >
          {/* Logo icon: 3 ascending bars with upward trendline in vibrant pink-purple gradient */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-500 p-0.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5 5-4-4-5 5" />
              <polyline points="14 9 18 9 18 13" />
            </svg>
          </div>
          <span className="font-extrabold text-white">
            Commission<span className="text-[#C084FC]">Pilot</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => navigateTo('home')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'home' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Inicio' : 'Home'}
          </button>

          <button 
            onClick={() => navigateTo('categories')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'categories' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Ofertas' : 'Offers'}
          </button>

          <button 
            onClick={() => navigateTo('reviews')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'reviews' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Guías' : 'Guides'}
          </button>

          <button 
            onClick={() => navigateTo('about')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'about' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Sobre mí' : 'About'}
          </button>

          <button 
            onClick={() => navigateTo('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'contact' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Contacto' : 'Contact'}
          </button>

          {/* Featured Offer link */}
          <button 
            onClick={() => navigateTo('glacier-breeze')}
            className="transition-all whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80 hover:text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Glacier Breeze -50%</span>
          </button>
        </nav>

        {/* Zone 3: Search, Suscríbete CTA & Language Selector */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Button / Input */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-white">
                <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'es' ? 'Buscar ofertas o guías...' : 'Search offers & tools...'}
                  className="bg-transparent text-white placeholder:text-slate-500 focus:outline-none w-36 sm:w-48 text-xs"
                />
                <button 
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="text-slate-400 hover:text-white ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar en la web"
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Primary CTA: Suscríbete Button */}
          <button 
            onClick={handleOpenNewsletter}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl transition-all whitespace-nowrap shrink-0 shadow-sm shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{language === 'es' ? 'Suscríbete' : 'Subscribe'}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors uppercase"
            >
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-28 bg-[#131B2E] border border-slate-700 rounded-xl shadow-xl py-1 z-50 text-xs">
                <button
                  onClick={() => { setLanguage('es'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    language === 'es' ? 'text-purple-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>Español</span>
                  {language === 'es' && <span>✓</span>}
                </button>
                <button
                  onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    language === 'en' ? 'text-purple-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0B0F19] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button 
              onClick={() => navigateTo('home')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-200 rounded-lg hover:bg-slate-800"
            >
              {language === 'es' ? 'Inicio' : 'Home'}
            </button>
            <button 
              onClick={() => navigateTo('categories')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-200 rounded-lg hover:bg-slate-800"
            >
              {language === 'es' ? 'Ofertas' : 'Offers'}
            </button>
            <button 
              onClick={() => navigateTo('reviews')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-200 rounded-lg hover:bg-slate-800"
            >
              {language === 'es' ? 'Guías' : 'Guides'}
            </button>

            <button 
              onClick={() => navigateTo('about')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-200 rounded-lg hover:bg-slate-800"
            >
              {language === 'es' ? 'Sobre mí' : 'About'}
            </button>
            <button 
              onClick={() => navigateTo('contact')}
              className="text-left py-2 px-3 text-sm font-medium text-slate-200 rounded-lg hover:bg-slate-800"
            >
              {language === 'es' ? 'Contacto' : 'Contact'}
            </button>
            <button 
              onClick={() => navigateTo('glacier-breeze')}
              className="text-left py-2 px-3 text-sm font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-lg hover:bg-cyan-900/60 flex items-center justify-between"
            >
              <span>❄️ Glacier Breeze Portable AC</span>
              <span className="text-xs font-mono font-bold bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">-50%</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-xs font-semibold px-3 py-1.5 text-slate-300 rounded-lg border border-slate-700 uppercase"
            >
              {language === 'en' ? 'Español' : 'English'}
            </button>

            <button 
              onClick={handleOpenNewsletter}
              className="px-4 py-2 text-xs font-bold text-white bg-[#7C3AED] rounded-xl"
            >
              {language === 'es' ? 'Suscríbete' : 'Subscribe'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
