import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  Tag, 
  BookOpen, 
  User, 
  Mail, 
  Globe
} from 'lucide-react';

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
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Zone 1: Brand Wordmark with upward chart icon */}
        <button 
          onClick={() => navigateTo('home')} 
          className="flex items-center gap-2 sm:gap-2.5 text-base sm:text-xl font-black tracking-tight text-white hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 group text-left cursor-pointer"
        >
          {/* Logo icon: ascending bars in vibrant pink-purple gradient */}
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

        {/* Zone 2: Desktop Navigation Links (hidden on mobile, visible on lg+) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => navigateTo('home')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'home' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Inicio' : 'Home'}
          </button>

          <button 
            onClick={() => navigateTo('categories')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'categories' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Ofertas' : 'Offers'}
          </button>

          <button 
            onClick={() => navigateTo('reviews')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'reviews' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Guías' : 'Guides'}
          </button>

          <button 
            onClick={() => navigateTo('about')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'about' 
                ? 'text-white font-semibold' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'es' ? 'Sobre mí' : 'About'}
          </button>

          <button 
            onClick={() => navigateTo('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

        {/* Zone 3: Search, Suscríbete CTA, Language Selector & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
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
                  placeholder={language === 'es' ? 'Buscar gadgets u ofertas...' : 'Search gadgets & deals...'}
                  className="bg-transparent text-white placeholder:text-slate-500 focus:outline-none w-28 sm:w-48 text-xs"
                />
                <button 
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="text-slate-400 hover:text-white ml-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar en la web"
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Primary CTA: Suscríbete Button (hidden on extra small screens to give full priority to navigation) */}
          <button 
            onClick={handleOpenNewsletter}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl transition-all whitespace-nowrap shrink-0 shadow-sm shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{language === 'es' ? 'Suscríbete' : 'Subscribe'}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-xs font-bold px-2 py-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors uppercase cursor-pointer"
            >
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-28 bg-[#131B2E] border border-slate-700 rounded-xl shadow-xl py-1 z-50 text-xs">
                <button
                  onClick={() => { setLanguage('es'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer ${
                    language === 'es' ? 'text-purple-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>Español</span>
                  {language === 'es' && <span>✓</span>}
                </button>
                <button
                  onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer ${
                    language === 'en' ? 'text-purple-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle (hamburger button) */}
          <button 
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden p-2 rounded-xl transition-all border flex items-center justify-center cursor-pointer ${
              mobileMenuOpen 
                ? 'bg-[#7C3AED] text-white border-purple-500 shadow-sm' 
                : 'text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border-slate-700/80'
            }`}
            aria-label={mobileMenuOpen ? (language === 'es' ? 'Cerrar menú' : 'Close menu') : (language === 'es' ? 'Abrir menú móvil' : 'Open mobile menu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Always-Visible Menu Bar: Ensures navigation tabs are immediately visible on mobile */}
      <nav 
        aria-label="Barra de menú móvil rápida"
        className="lg:hidden bg-[#0A0E1A]/95 border-t border-slate-800/80 px-2 sm:px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-semibold"
      >
        <button
          onClick={() => navigateTo('home')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            currentPage === 'home'
              ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
              : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'Inicio' : 'Home'}</span>
        </button>

        <button
          onClick={() => navigateTo('categories')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            currentPage === 'categories'
              ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
              : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'Ofertas' : 'Offers'}</span>
        </button>

        <button
          onClick={() => navigateTo('reviews')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            currentPage === 'reviews'
              ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
              : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'Guías' : 'Guides'}</span>
        </button>

        <button
          onClick={() => navigateTo('glacier-breeze')}
          className="px-2.5 py-1.5 rounded-lg whitespace-nowrap text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900/80 transition-colors flex items-center gap-1 shadow-xs font-bold cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Glacier Breeze</span>
        </button>

        <button
          onClick={() => navigateTo('contact')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            currentPage === 'contact'
              ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
              : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'Contacto' : 'Contact'}</span>
        </button>

        <button
          onClick={() => navigateTo('about')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            currentPage === 'about'
              ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
              : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'Sobre mí' : 'About'}</span>
        </button>
      </nav>

      {/* Mobile navigation full drawer overlay (toggled by hamburger icon) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-x-0 top-16 bottom-0 z-50 bg-[#0B0F19]/98 backdrop-blur-md overflow-y-auto px-4 py-5 space-y-5 border-t border-slate-800 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Quick Search inside Drawer */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'es' ? 'Buscar gadgets, ofertas o guías...' : 'Search gadgets, deals & guides...'}
              className="bg-transparent text-white placeholder:text-slate-500 focus:outline-none w-full text-xs"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white ml-1 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Full Navigation Links List */}
          <div className="flex flex-col space-y-1.5">
            <button 
              onClick={() => navigateTo('home')}
              className={`flex items-center gap-3 text-left py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'home' ? 'bg-[#7C3AED] text-white font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4 text-purple-400" />
              <span>{language === 'es' ? 'Inicio' : 'Home'}</span>
            </button>

            <button 
              onClick={() => navigateTo('categories')}
              className={`flex items-center gap-3 text-left py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'categories' ? 'bg-[#7C3AED] text-white font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Tag className="w-4 h-4 text-purple-400" />
              <span>{language === 'es' ? 'Ofertas y Productos' : 'Offers & Products'}</span>
            </button>

            <button 
              onClick={() => navigateTo('reviews')}
              className={`flex items-center gap-3 text-left py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'reviews' ? 'bg-[#7C3AED] text-white font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>{language === 'es' ? 'Guías y Artículos' : 'Guides & Reviews'}</span>
            </button>

            <button 
              onClick={() => navigateTo('glacier-breeze')}
              className="flex items-center justify-between text-left py-2.5 px-3.5 text-sm font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 rounded-xl hover:bg-cyan-900/70 transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>❄️ Glacier Breeze Portable AC</span>
              </div>
              <span className="text-xs font-mono font-bold bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">-50%</span>
            </button>

            <button 
              onClick={() => navigateTo('about')}
              className={`flex items-center gap-3 text-left py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'about' ? 'bg-[#7C3AED] text-white font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <User className="w-4 h-4 text-purple-400" />
              <span>{language === 'es' ? 'Sobre el Proyecto' : 'About'}</span>
            </button>

            <button 
              onClick={() => navigateTo('contact')}
              className={`flex items-center gap-3 text-left py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'contact' ? 'bg-[#7C3AED] text-white font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>{language === 'es' ? 'Contacto' : 'Contact'}</span>
            </button>
          </div>

          {/* Quick Categories Section */}
          <div className="pt-3 border-t border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {language === 'es' ? 'Categorías Rápidas' : 'Quick Categories'}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              <button 
                onClick={() => navigateTo('categories', 'Tecnología & Viajes')}
                className="text-left text-xs text-slate-300 hover:text-white py-1.5 px-2 rounded-lg hover:bg-slate-800/60 cursor-pointer"
              >
                🌍 {language === 'es' ? 'Tecnología & Viajes (Traductor Enence)' : 'Tech & Travel (Enence Translator)'}
              </button>
              <button 
                onClick={() => navigateTo('categories', 'Hogar & Jardín')}
                className="text-left text-xs text-slate-300 hover:text-white py-1.5 px-2 rounded-lg hover:bg-slate-800/60 cursor-pointer"
              >
                🔥 {language === 'es' ? 'Hogar & Jardín (GrillWizz Cleaner)' : 'Home & Garden (GrillWizz)'}
              </button>
              <button 
                onClick={() => navigateTo('categories', 'Climatización & Confort')}
                className="text-left text-xs text-slate-300 hover:text-white py-1.5 px-2 rounded-lg hover:bg-slate-800/60 cursor-pointer"
              >
                ❄️ {language === 'es' ? 'Climatización (Glacier Breeze AC)' : 'Cooling (Glacier Breeze)'}
              </button>
            </div>
          </div>

          {/* Bottom Actions inside Mobile Drawer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-xs font-bold px-3 py-2 text-slate-300 hover:text-white rounded-xl border border-slate-700 uppercase bg-slate-900 cursor-pointer flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>{language === 'en' ? 'Español' : 'English'}</span>
            </button>

            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenNewsletter();
              }}
              className="flex-1 py-2 px-4 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl text-center shadow-md cursor-pointer"
            >
              {language === 'es' ? 'Suscríbete al Boletín' : 'Subscribe to Alerts'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
