import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ShieldCheck, Cookie, ArrowUpRight, Scale, Lock } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/initialProducts';

export const Footer: React.FC = () => {
  const { 
    setCurrentPage, 
    setSelectedCategory, 
    openLegalDoc, 
    setIsCookieModalOpen,
    setIsAdminOpen,
    language 
  } = useApp();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      
      {/* Top Affiliate Disclosure Strip */}
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="font-semibold text-xs">
                {language === 'es' ? 'Transparencia de Afiliación Oficial' : 'Official Affiliate Transparency'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-4xl leading-relaxed">
              {language === 'es' ? (
                <>
                  CommissionPilot (<strong>https://commissionpilot.org</strong>) participa en el programa de afiliados de Amazon Services LLC, Awin, CJ Affiliate y partners de software. Cuando realizas compras a través de nuestros enlaces, podemos obtener una comisión de afiliación sin ningún coste añadido para ti.{' '}
                  <button 
                    onClick={() => handlePageClick('affiliate-disclosure')}
                    className="text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Leer divulgación completa
                  </button>.
                </>
              ) : (
                <>
                  CommissionPilot (<strong>https://commissionpilot.org</strong>) is an independent product discovery portal participating in the Amazon Services LLC Associates Program, Awin, and CJ Affiliate networks. We may earn qualifying commissions on referral purchases at 0% additional cost to you.{' '}
                  <button 
                    onClick={() => handlePageClick('affiliate-disclosure')}
                    className="text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Read full disclosure
                  </button>.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 text-lg font-bold text-white tracking-tight">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-500 p-0.5 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-4-4-5 5" />
                  <polyline points="14 9 18 9 18 13" />
                </svg>
              </div>
              <span className="font-extrabold text-white">
                Commission<span className="text-[#C084FC]">Pilot</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {language === 'es'
                ? 'Portal independiente de análisis y recomendaciones de gadgets innovadores, tecnología para viajes, hogar y ofertas exclusivas verificadas.'
                : 'Independent discovery and review portal for innovative gadgets, travel tech, home essentials, and verified exclusive deals.'}
            </p>

            <div className="text-[11px] text-slate-400 pt-1">
              <span>{language === 'es' ? 'Dominio Oficial' : 'Official Domain'}: </span>
              <a href="https://commissionpilot.org" className="text-white hover:text-blue-400 font-mono">
                https://commissionpilot.org
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'es' ? 'Categorías de Productos' : 'Product Categories'}
            </div>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & Discovery */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'es' ? 'Editorial y Guías' : 'Editorial & Guides'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handlePageClick('reviews')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Guías y Reseñas' : 'Guides & Reviews'}
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('reviews')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Análisis Editoriales' : 'Technical Reviews'}
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('about')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Sobre CommissionPilot' : 'About CommissionPilot'}
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('contact')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Contacto y Soporte' : 'Contact Us'}
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('affiliate-disclosure')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Declaración de Afiliados' : 'Affiliate Notice'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'es' ? 'Marco Legal (RGPD & LSSI)' : 'Legal & Compliance (EU)'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => openLegalDoc('aviso-legal')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Aviso Legal (LSSI-CE)' : 'Legal Notice (LSSI-CE)'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalDoc('privacidad')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Política de Privacidad (RGPD)' : 'Privacy Policy (GDPR)'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalDoc('cookies')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Política de Cookies' : 'Cookie Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalDoc('afiliacion')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Política de Afiliación' : 'Affiliate Terms'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegalDoc('condiciones')} className="text-slate-400 hover:text-white transition-colors">
                  {language === 'es' ? 'Condiciones Generales de Uso' : 'Terms of Service'}
                </button>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => setIsCookieModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
                >
                  <Cookie className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Configurar Cookies' : 'Cookie Settings'}</span>
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-purple-300 font-medium transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{language === 'es' ? 'Panel de Gestión (Admin)' : 'Admin Portal'}</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} CommissionPilot · Titular: <strong>Amin Ajrif</strong> (N.I.E. Z3277056K). Provenza 148, Local, 08036 Barcelona.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/amin-ajrif-9464a2106" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              LinkedIn: Amin Ajrif
            </a>
            <span>·</span>
            <span>{language === 'es' ? 'Afiliación Ética y Verificada' : 'Ethical Affiliate Discovery'}</span>
            <span>·</span>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-purple-300 transition-colors cursor-pointer"
              title="Acceso al Panel de Administración"
            >
              <Lock className="w-3 h-3 text-purple-400" />
              <span>Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
