import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Info, ExternalLink, HelpCircle, AlertCircle } from 'lucide-react';

export const AffiliateDisclosureView: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'es' ? 'Transparencia Comercial' : 'Commercial Transparency'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'es' ? 'Divulgación de Enlaces de Afiliación' : 'Affiliate Disclosure & Transparency Statement'}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          {language === 'es'
            ? 'En cumplimiento con las directrices de la FTC y las normativas de la Unión Europea (incluyendo la LSSI-CE española), explicamos de manera clara y transparente cómo se financia CommissionPilot.'
            : 'In full accordance with Federal Trade Commission (FTC) guidelines and European Union consumer directives (including Spanish LSSI-CE), here is an open disclosure of how CommissionPilot is funded.'}
        </p>
      </div>

      {/* Main Callout Box */}
      <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-start gap-4">
        <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-sm text-blue-900 leading-relaxed">
          <p className="font-bold">
            {language === 'es' ? 'Resumen para el usuario:' : 'Key takeaway for visitors:'}
          </p>
          <p>
            {language === 'es'
              ? 'CommissionPilot (https://commissionpilot.org) contiene enlaces de afiliación. Esto significa que si haces clic en un enlace a una tienda asociada y realizas una compra cualificada, podemos recibir una pequeña comisión comercial por parte del vendedor. Esto nunca supone ningún coste adicional para ti.'
              : 'CommissionPilot (https://commissionpilot.org) participates in affiliate marketing programs. When you click an affiliate link and complete a qualifying purchase at a partner store, we may earn an affiliate commission from the retailer. This comes at absolutely no additional cost to you.'}
          </p>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'es' ? '1. ¿Qué es el Marketing de Afiliación?' : '1. What is Affiliate Marketing?'}
          </h2>
          <p>
            {language === 'es'
              ? 'El marketing de afiliación es un modelo de colaboración publicitaria en el que una plataforma editorial recomienda productos de terceros. Cuando un lector decide adquirir un producto a través de nuestros enlaces verificados, el distribuidor o fabricante nos remite una comisión porcentual fija por la intermediación comercial.'
              : 'Affiliate marketing is a performance-based partnership model where digital publishers recommend third-party products. When a reader decides to purchase a product through our verified links, the merchant pays a standardized referral commission.'}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'es' ? '2. Declaración de Amazon Associates' : '2. Amazon Associates Disclosure'}
          </h2>
          <p className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800">
            {language === 'es'
              ? '«CommissionPilot participa en el Programa de Afiliados de Amazon Services LLC, un programa de publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener comisiones por publicidad mediante publicidad y enlaces a Amazon.com, Amazon.es y sitios afiliados.»'
              : '“CommissionPilot is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com, Amazon subsidiaries, and regional storefronts.”'}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'es' ? '3. Otras Redes de Afiliación' : '3. Additional Affiliate Networks'}
          </h2>
          <p>
            {language === 'es'
              ? 'Además de Amazon, CommissionPilot trabaja o está preparada para colaborar con redes de afiliados auditadas internacionalmente como:'
              : 'In addition to Amazon, CommissionPilot is integrated and prepared to partner with established international affiliate networks including:'}
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Awin:</strong> {language === 'es' ? 'Para servicios digitales, hardware europeo y suscripciones.' : 'Global network for digital tools, electronics, and verified retail merchants.'}</li>
            <li><strong>CJ Affiliate (Commission Junction):</strong> {language === 'es' ? 'Plataforma para software empresarial y herramientas de productividad.' : 'Enterprise software, cloud platforms, and productivity suites.'}</li>
            <li><strong>ClickBank:</strong> {language === 'es' ? 'Para productos educativos digitales y herramientas especializadas.' : 'Digital resources and specialized consumer software.'}</li>
            <li><strong>{language === 'es' ? 'Programas Directos:' : 'Direct Merchant Partnerships:'}</strong> {language === 'es' ? 'Acuerdos directos con proveedores de software (SaaS) y marcas oficiales.' : 'Direct verified creator & SaaS affiliate programs.'}</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'es' ? '4. ¿Afecta esto al precio que pagas?' : '4. Does this affect the price you pay?'}
          </h2>
          <p>
            <strong>{language === 'es' ? 'Rotundamente no.' : 'Absolutely not.'}</strong> {language === 'es'
              ? 'El precio de compra que ves en la tienda asociada es exactamente el mismo tanto si accedes a través de nuestros enlaces de CommissionPilot como si visitas la tienda directamente. En muchas ocasiones, incluso mostramos promociones o descuentos verificados que reducen el importe final.'
              : 'The price you pay at the merchant is identical whether you use our tracking link or navigate directly to the store URL. The commission is paid directly out of the merchant’s standard operating marketing budget.'}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'es' ? '5. Independencia Editorial y Honestidad' : '5. Editorial Independence & Objectivity'}
          </h2>
          <p>
            {language === 'es'
              ? 'Las comisiones de afiliado no dictan nuestras recomendaciones. Nuestro compromiso ético exige resaltar las desventajas, limitaciones técnicas y puntos de fricción de cualquier producto. Si un producto no cumple con los estándares de calidad o presenta fallos comunes contrastados por los usuarios, lo indicamos explícitamente en la ficha.'
              : 'Commercial commissions do not determine our editorial verdicts. We actively highlight product downsides, trade-offs, and software limitations. If a product fails technical standards or receives negative reliability reports, we state this clearly in our specifications and cons list.'}
          </p>
        </section>

      </div>

    </div>
  );
};
