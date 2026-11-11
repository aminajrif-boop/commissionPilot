import React from 'react';
import { useApp } from '../context/AppContext';
import { Scale, X, Plus, Check, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ComparisonView: React.FC = () => {
  const { 
    products, 
    comparisonProductIds, 
    toggleComparisonProduct, 
    clearComparison,
    setSelectedProduct,
    setPendingRedirect,
    recordClick,
    language 
  } = useApp();

  // If no items specifically selected, compare all available products (both verified items)
  const comparedProducts = comparisonProductIds.length > 0
    ? products.filter((p) => comparisonProductIds.includes(p.id))
    : products;

  const remainingProducts = products.filter((p) => !comparedProducts.some((cp) => cp.id === p.id));

  const handleStoreClick = (prod: typeof products[0]) => {
    recordClick(prod.id, prod.name, prod.store, prod.affiliateNetwork, prod.affiliateUrl);
    setPendingRedirect({
      product: prod,
      store: prod.store,
      url: prod.affiliateUrl
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>{language === 'es' ? 'Comparador Técnico' : 'Technical Comparator'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {language === 'es' ? 'Comparativas de Productos Frente a Frente' : 'Side-by-Side Product Comparisons'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {language === 'es'
              ? 'Contrasta especificaciones técnicas, ventajas, desventajas y precios verificados para tomar la mejor decisión de compra.'
              : 'Contrast technical specifications, pros, cons, and verified pricing to make an informed purchasing decision.'}
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <button
            onClick={clearComparison}
            className="self-start sm:self-auto text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
          >
            {language === 'es' ? 'Limpiar Comparativa' : 'Clear Comparison'}
          </button>
        )}
      </div>

      {/* When Empty State */}
      {comparedProducts.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'es' ? 'No hay productos seleccionados todavía' : 'No products selected for comparison yet'}
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {language === 'es'
              ? 'Haz clic en el botón "Comparar" de cualquier ficha de producto o añade directamente desde las opciones recomendadas abajo.'
              : 'Click the "Compare" action on any product card or add directly from our verified recommendations below.'}
          </p>

          <div className="pt-4 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {products.slice(0, 4).map((p) => (
              <div 
                key={p.id}
                onClick={() => toggleComparisonProduct(p.id)}
                className="p-3 bg-white border border-slate-200 hover:border-blue-500 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                  <div className="text-[11px] text-slate-500">{p.brand} · ${p.price.toFixed(2)}</div>
                </div>
                <button className="p-1 text-blue-600 bg-blue-50 rounded hover:bg-blue-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Comparison Matrix */
        <div className="space-y-6">
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500 w-1/4">
                    {language === 'es' ? 'Parámetro' : 'Criteria'}
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-4 text-left w-1/3 min-w-[240px]">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">{p.brand}</span>
                          <h3 className="text-sm font-bold text-slate-900 leading-snug mt-0.5 line-clamp-2">{p.name}</h3>
                        </div>
                        <button
                          onClick={() => toggleComparisonProduct(p.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                  {comparedProducts.length < 3 && (
                    <th className="p-4 text-center border-l border-slate-200 bg-slate-50/50 min-w-[180px]">
                      <span className="text-xs text-slate-400 font-medium">
                        {language === 'es' ? 'Hueco Disponible' : 'Slot Available'}
                      </span>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-xs">
                
                {/* Visual Preview */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">
                    {language === 'es' ? 'Imagen' : 'Preview'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <div className="w-32 h-24 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden mx-auto">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                  ))}
                  {comparedProducts.length < 3 && <td className="bg-slate-50/20" />}
                </tr>

                {/* Price & Store */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">
                    {language === 'es' ? 'Precio Verificado' : 'Verified Price'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <div className="text-base font-extrabold font-mono tabular-nums text-slate-900">
                        ${p.price.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {language === 'es' ? 'en' : 'at'} <span className="font-semibold text-slate-700">{p.store}</span> ({p.priceVerifiedDate})
                      </div>
                    </td>
                  ))}
                  {comparedProducts.length < 3 && <td className="bg-slate-50/20" />}
                </tr>

                {/* Rating Score */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">
                    {language === 'es' ? 'Puntuación Técnica' : 'Evaluation Score'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">{p.ratingScore}</span>
                        <span className="text-slate-400">/ 10</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {p.comparisonHighlights}
                      </div>
                    </td>
                  ))}
                  {comparedProducts.length < 3 && <td className="bg-slate-50/20" />}
                </tr>

                {/* Pros */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">
                    {language === 'es' ? 'Ventajas Clave' : 'Key Advantages'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 align-top">
                      <ul className="space-y-1.5">
                        {(p.pros || []).map((pro, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {comparedProducts.length < 3 && <td className="bg-slate-50/20" />}
                </tr>

                {/* Cons */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">
                    {language === 'es' ? 'Inconvenientes' : 'Considerations'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 align-top">
                      <ul className="space-y-1.5">
                        {(p.cons || []).map((con, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {comparedProducts.length < 3 && <td className="bg-slate-50/20" />}
                </tr>

                {/* Buyer Recommendation */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">
                    {language === 'es' ? 'Para quién es' : 'Ideal For'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 align-top text-slate-700 leading-relaxed">
                      {p.buyersGuideNote}
                    </td>
                  ))}
                  {comparedProducts.length < 3 && <td className="bg-slate-50/20" />}
                </tr>

                {/* Store Action */}
                <tr>
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/50">
                    {language === 'es' ? 'Acceso Directo' : 'Direct Link'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <button
                        onClick={() => handleStoreClick(p)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-2xs"
                      >
                        <span>{language === 'es' ? 'Ver en' : 'View on'} {p.store}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  ))}
                  {comparedProducts.length < 3 && <td className="bg-slate-50/20" />}
                </tr>

              </tbody>
            </table>
          </div>

          {/* Quick Add Selector Bar if less than 3 */}
          {comparedProducts.length < 3 && remainingProducts.length > 0 && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-700 font-semibold">
                {language === 'es' ? 'Añadir otro producto a la comparativa:' : 'Add another product to comparison:'}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {remainingProducts.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => toggleComparisonProduct(p.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-blue-500 text-slate-800 text-xs font-medium rounded-lg transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-600" />
                    <span>{p.name.split(' ')[0]} {p.name.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
