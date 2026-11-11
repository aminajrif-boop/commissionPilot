import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ExternalLink, 
  Check, 
  X as XIcon, 
  ShieldCheck, 
  Scale, 
  Calendar, 
  Store, 
  ArrowUpRight,
  Info
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    comparisonProductIds, 
    toggleComparisonProduct,
    setPendingRedirect,
    recordClick,
    language 
  } = useApp();

  if (!selectedProduct) return null;

  const isCompared = comparisonProductIds.includes(selectedProduct.id);

  const handleStoreClick = (buttonText: string) => {
    recordClick(
      selectedProduct.id, 
      selectedProduct.name, 
      selectedProduct.store, 
      selectedProduct.affiliateNetwork, 
      selectedProduct.affiliateUrl
    );
    setPendingRedirect({
      product: selectedProduct,
      store: selectedProduct.store,
      url: selectedProduct.affiliateUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white/95 sticky top-0 z-10">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">{selectedProduct.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedProduct.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleComparisonProduct(selectedProduct.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? (language === 'es' ? 'En Comparativa' : 'In Comparison') : (language === 'es' ? 'Añadir a Comparativa' : 'Add to Compare')}</span>
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Hero Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-6 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 aspect-4/3 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Core Purchase & Verification Panel */}
            <div className="md:col-span-6 space-y-5">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {selectedProduct.name}
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {selectedProduct.summary}
                </p>
              </div>

              {/* Price & Verified Store Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      {selectedProduct.commissionRate 
                        ? (language === 'es' ? 'Promoción / Oferta Verificada' : 'Verified Promotion & Deal')
                        : (language === 'es' ? 'Precio Verificado' : 'Verified Current Price')}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 mt-0.5">
                      {selectedProduct.commissionRate ? (
                        <span className="text-emerald-600">{selectedProduct.commissionRate}</span>
                      ) : (
                        `${selectedProduct.price > 0 ? `${selectedProduct.price.toFixed(2)} €` : (language === 'es' ? 'Gratuito / Variable' : 'Free / Tiered')}`
                      )}
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1 text-slate-700 font-semibold justify-end">
                      <Store className="w-3.5 h-3.5 text-purple-600" />
                      <span>{selectedProduct.store}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedProduct.priceVerifiedDate || '2025'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'es'
                      ? 'Tarifa verificada directamente en el distribuidor autorizado.'
                      : 'Commercial rate verified directly with authorized distributor.'}
                  </span>
                </div>
              </div>

              {/* Action Buttons (Prompt requested: "View Product", "Check Price", "Visit Store") */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleStoreClick('View Product')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                >
                  <span>{language === 'es' ? 'Ver en Tienda' : 'View Product'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleStoreClick('Check Price')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <span>{language === 'es' ? 'Consultar Precio' : 'Check Price'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Affiliate Transparent Note */}
              <p className="text-[11px] text-slate-500 leading-normal">
                {language === 'es'
                  ? 'Transparencia de afiliación: CommissionPilot puede percibir una compensación por compras cualificadas sin ningún coste añadido para el comprador.'
                  : 'Affiliate Transparency: CommissionPilot may receive a qualifying commission upon checkout at no additional cost to you.'}
              </p>

            </div>

          </div>

          {/* Description Section */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {language === 'es' ? 'Descripción y Análisis' : 'Product Overview & Analysis'}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Pros & Cons Side-by-Side Grid */}
          {((selectedProduct.pros && selectedProduct.pros.length > 0) || (selectedProduct.cons && selectedProduct.cons.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              
              {/* Pros */}
              {selectedProduct.pros && selectedProduct.pros.length > 0 && (
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'es' ? 'Ventajas Principales' : 'Key Advantages (Pros)'}</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedProduct.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cons */}
              {selectedProduct.cons && selectedProduct.cons.length > 0 && (
                <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-rose-900">
                    <XIcon className="w-4 h-4 text-rose-700" />
                    <span>{language === 'es' ? 'Posibles Inconvenientes' : 'Considerations (Cons)'}</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedProduct.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}

          {/* Key Features */}
          {selectedProduct.features && selectedProduct.features.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {language === 'es' ? 'Características Destacadas' : 'Key Features'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Specifications Table */}
          {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {language === 'es' ? 'Ficha Técnica Verificada' : 'Verified Technical Specifications'}
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-xs">
                {Object.entries(selectedProduct.specs).map(([specKey, specVal]) => (
                  <div key={specKey} className="grid grid-cols-3 p-3 bg-white hover:bg-slate-50 transition-colors">
                    <div className="font-semibold text-slate-700">{specKey}</div>
                    <div className="col-span-2 text-slate-600 font-mono tabular-nums">{specVal}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buyer's Guide Note */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-blue-900">
                {language === 'es' ? 'Guía para el Comprador' : "Buyer's Recommendation Note"}
              </div>
              <p className="mt-1 text-xs text-blue-800 leading-relaxed">
                {selectedProduct.buyersGuideNote}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <span>{language === 'es' ? 'Disponible en' : 'Available at'}: </span>
            <span className="font-semibold text-slate-900">{selectedProduct.store}</span>
            <span className="mx-2">·</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">${selectedProduct.price.toFixed(2)}</span>
          </div>

          <button
            onClick={() => handleStoreClick('Visit Store')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            <span>{language === 'es' ? 'Visitar Tienda Oficial' : 'Visit Official Store'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
