import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, CheckCircle2, Shield, Eye, Target, Sparkles, Scale } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentPage, language } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>{language === 'es' ? 'Sobre el Proyecto' : 'About CommissionPilot'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {language === 'es' 
            ? 'Guiamos tu elección de productos con datos contrastados y rigor editorial.' 
            : 'Guiding smart purchasing decisions through verified product discovery.'}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {language === 'es'
            ? 'CommissionPilot es una plataforma digital independiente dedicada exclusivamente al descubrimiento, análisis comparativo y recomendación de productos tecnológicos, herramientas digitales y equipamiento de estilo de vida.'
            : 'CommissionPilot is an independent consumer recommendation engine dedicated solely to product discovery, technical comparisons, and verified purchasing guidance across consumer hardware, digital software, and lifestyle gear.'}
        </p>
      </div>

      {/* Core Mission & Distinction */}
      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">
          {language === 'es' ? 'Nuestra Identidad y Enfoque' : 'Our Identity and Focus'}
        </h2>
        <p>
          {language === 'es'
            ? 'A diferencia de las agencias de marketing o consultoras corporativas, CommissionPilot no vende servicios profesionales a empresas ni gestiona campañas de terceros. Nuestro único propósito es el usuario final: ayudar a los consumidores a encontrar los productos idóneos mediante fichas detalladas, especificaciones técnicas contrastadas y enlaces comerciales directos a los distribuidores oficiales.'
            : 'Unlike digital marketing agencies or corporate consultants, CommissionPilot does not sell business services or manage campaigns for clients. Our focus is squarely on the consumer: helping individuals discover exceptional products through meticulous technical specs, unbiased pros and cons, and verified direct links to official retail partners.'}
        </p>
        <p>
          {language === 'es'
            ? 'Cada producto catalogado en nuestra plataforma ha sido objeto de investigación sobre sus especificaciones oficiales de fábrica, opiniones consolidadas de usuarios y garantías de comercialización en redes y partners directos certificados.'
            : 'Every product cataloged on our platform undergoes rigorous analysis of official manufacturer data sheets, verified buyer telemetry, and authorized distribution channels through certified direct partner programs.'}
        </p>

        {/* Founder & Sole Ownership Card */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="space-y-1 text-xs">
            <div className="text-slate-500 uppercase tracking-wider font-semibold">
              {language === 'es' ? 'Titular y Dirección del Proyecto' : 'Founder & Sole Proprietorship'}
            </div>
            <div className="text-base font-bold text-slate-900">
              Amin Ajrif
            </div>
            <div className="text-slate-600">
              {language === 'es' 
                ? 'Trabajador autónomo (titular único al 100% de la actividad) · Provenza 148, Local, 08036 Barcelona' 
                : 'Sole Proprietor (100% activity ownership) · Provenza 148, Local, 08036 Barcelona, Spain'}
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/amin-ajrif-9464a2106"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors shrink-0 shadow-2xs"
          >
            <span>LinkedIn Profile</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Editorial Principles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {language === 'es' ? 'Especificaciones 100% Verificadas' : '100% Verified Specifications'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'es'
              ? 'No inventamos características técnicas, precios ni disponibilidades ficticias. Si un dato cambia o queda desfasado, actualizamos la ficha.'
              : 'We do not hallucinate technical features, invented discounts, or fictitious availability. If data shifts, our catalog reflects verified merchant terms.'}
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {language === 'es' ? 'Honestidad en Pros y Contras' : 'Balanced Pros & Cons'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'es'
              ? 'Todo producto tiene limitaciones. Resaltamos los inconvenientes con tanta claridad como las ventajas para prevenir compras insatisfactorias.'
              : 'Every product comes with trade-offs. We highlight limitations and considerations just as prominently as advantages to prevent buyer regret.'}
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {language === 'es' ? 'Divulgación Transparente' : 'Radical Affiliate Transparency'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'es'
              ? 'Financiamos nuestro trabajo mediante comisiones de afiliado cuando realizas una compra cualificada. El precio final para ti nunca se incrementa.'
              : 'We sustain our editorial research via qualifying affiliate commissions when you purchase through our links. You never pay a penny extra.'}
          </p>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {language === 'es' ? 'Sin Afirmaciones Engañosas' : 'No Deceptive Claims'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'es'
              ? 'No simulamos pruebas de laboratorio personales que no se hayan realizado ni emitimos afirmaciones médicas o de salud sin sustento clínico.'
              : 'We never simulate laboratory experiments that were not conducted or make exaggerated health claims unsupported by certified clinical trials.'}
          </p>
        </div>

      </div>

      {/* Call to action */}
      <div className="p-8 bg-slate-900 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <div className="text-base font-bold">
            {language === 'es' ? '¿Listo para descubrir tu próximo producto?' : 'Ready to discover your next essential tool?'}
          </div>
          <div className="text-xs text-slate-400">
            {language === 'es' ? 'Explora nuestro catálogo curado por categorías.' : 'Browse our verified catalog across all categories.'}
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentPage('categories');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto shadow-sm"
        >
          {language === 'es' ? 'Ver Catálogo Completo' : 'Explore Complete Catalog'}
        </button>
      </div>

    </div>
  );
};
