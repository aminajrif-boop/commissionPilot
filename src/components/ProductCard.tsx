import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ArrowRight, Scale, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setSelectedProduct, 
    comparisonProductIds, 
    toggleComparisonProduct,
    setPendingRedirect,
    recordClick,
    language 
  } = useApp();

  const isCompared = comparisonProductIds.includes(product.id);

  const handleStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordClick(product.id, product.name, product.store, product.affiliateNetwork, product.affiliateUrl);
    setPendingRedirect({
      product,
      store: product.store,
      url: product.affiliateUrl
    });
  };

  return (
    <article 
      onClick={() => setSelectedProduct(product)}
      className="bg-white border border-slate-200/90 hover:border-purple-300 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group cursor-pointer relative"
    >
      {/* 1. Large, Prominent Product Image Container */}
      <div className="relative h-56 sm:h-60 w-full bg-slate-900/5 overflow-hidden flex items-center justify-center border-b border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Brand badge or Brand logo */}
          <div className="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold shadow-md flex items-center gap-1.5">
            {product.logoImage ? (
              <img 
                src={product.logoImage} 
                alt={product.brand || product.name} 
                className="h-3.5 max-w-[60px] object-contain invert brightness-200" 
              />
            ) : null}
            <span>{product.brand}</span>
          </div>

          {/* Promotion / Discount badge */}
          {product.commissionRate && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#7C3AED] text-white shadow-md">
              {product.commissionRate}
            </span>
          )}
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
            <span className="text-purple-600 font-semibold">{product.category}</span>
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200/60">
              {product.badgeTag || (language === 'es' ? 'Verificado' : 'Verified')}
            </span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-purple-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* 3. Price & Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              {language === 'es' ? 'Precio / Oferta' : 'Deal Price'}
            </div>
            <div className="text-base sm:text-lg font-black text-slate-900">
              {product.price > 0 ? `${product.price} €` : (language === 'es' ? 'Promoción' : 'Special Offer')}
            </div>
          </div>

          <button
            onClick={handleStoreClick}
            className="py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer group-hover:scale-[1.02]"
          >
            <span>{product.ctaLabel || (language === 'es' ? 'Ver Oferta' : 'Get Deal')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
