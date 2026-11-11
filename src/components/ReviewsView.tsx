import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Calendar, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const { reviews, products, setSelectedProduct, language } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>{language === 'es' ? 'Análisis Editorial' : 'Editorial Engineering Reviews'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'es' ? 'Análisis y Recomendaciones de Productos' : 'Product Reviews & Technical Analysis'}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          {language === 'es'
            ? 'Nuestras evaluaciones se fundamentan estrictamente en fichas técnicas verificadas, arquitectura de hardware y normativas de los fabricantes, sin simular pruebas de laboratorio no ejecutadas.'
            : 'Our analyses are grounded strictly in manufacturer engineering whitepapers, verified acoustic telemetry, and verifiable technical benchmarks without simulating unperformed personal tests.'}
        </p>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2.5 mt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {language === 'es'
              ? 'Compromiso de integridad: no aceptamos compensación para alterar conclusiones técnicas ni emitimos afirmaciones sanitarias no sustentadas.'
              : 'Integrity commitment: we never accept sponsorship to manipulate technical conclusions or make unsubstantiated health claims.'}
          </span>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-12">
        {reviews.map((article) => {
          const matchedProducts = products.filter(p => article.recommendedProducts.includes(p.id));

          return (
            <article key={article.id} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="font-semibold text-blue-600">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.publishDate}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.readingTime}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{article.author}</span>
              </div>

              {/* Article Image Banner if present */}
              {article.image && (
                <div className="aspect-21/9 sm:aspect-16/7 w-full rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Title & Summary */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
                  {article.summary}
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-6 pt-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed">
                {article.contentSections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-base">
                      {sec.heading}
                    </h3>
                    <p className="text-slate-600">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mentioned Products Widget */}
              {matchedProducts.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    {language === 'es' ? 'Producto Analizado en este Artículo' : 'Featured Product In This Review'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchedProducts.map((p) => (
                      <div 
                        key={p.id}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-white border border-slate-200 shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {language === 'es' ? 'Verificado en' : 'Verified on'} {p.store} · <span className="font-mono font-bold text-slate-800">${p.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shrink-0 shadow-2xs"
                        >
                          <span>{language === 'es' ? 'Ficha' : 'View Spec'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </article>
          );
        })}
      </div>

    </div>
  );
};
