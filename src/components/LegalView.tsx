import React from 'react';
import { useApp, LegalDocType } from '../context/AppContext';
import { Shield, FileText, Lock, Cookie, Scale } from 'lucide-react';

export const LegalView: React.FC = () => {
  const { activeLegalDoc, setActiveLegalDoc, language } = useApp();

  const legalTabs: { id: LegalDocType; labelEn: string; labelEs: string; icon: React.ReactNode }[] = [
    { id: 'aviso-legal', labelEn: 'Legal Notice (LSSI)', labelEs: 'Aviso Legal (LSSI-CE)', icon: <Scale className="w-4 h-4" /> },
    { id: 'privacidad', labelEn: 'Privacy Policy (GDPR)', labelEs: 'Política de Privacidad (RGPD)', icon: <Lock className="w-4 h-4" /> },
    { id: 'cookies', labelEn: 'Cookie Policy', labelEs: 'Política de Cookies', icon: <Cookie className="w-4 h-4" /> },
    { id: 'afiliacion', labelEn: 'Affiliate Policy', labelEs: 'Política de Afiliación', icon: <Shield className="w-4 h-4" /> },
    { id: 'condiciones', labelEn: 'Terms of Use', labelEs: 'Condiciones de Uso', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {language === 'es' ? 'Marco Legal y Regulatorio' : 'Legal & Regulatory Framework'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {language === 'es' ? 'Documentación Legal y Normativa Europea' : 'Legal Compliance & European Regulations'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          {language === 'es'
            ? 'Documentación adaptada a la legislación española y comunitaria europea (RGPD, LOPDGDD y LSSI-CE 34/2002) para el dominio oficial https://commissionpilot.org.'
            : 'Compliant with European GDPR, Spanish LOPDGDD and LSSI-CE 34/2002 for official domain https://commissionpilot.org.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {legalTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveLegalDoc(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeLegalDoc === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab.icon}
            <span>{language === 'es' ? tab.labelEs : tab.labelEn}</span>
          </button>
        ))}
      </div>

      {/* Fiscal Data Verified Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1">
        <span className="font-bold flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>{language === 'es' ? 'Datos identificativos y fiscales del titular verificados:' : 'Verified Publisher & Legal Entity Information:'}</span>
        </span>
        <p className="text-slate-700">
          {language === 'es'
            ? 'En cumplimiento de la LSSI-CE (Ley 34/2002) y del RGPD europeo, se hacen públicos los datos del titular responsable de la explotación de https://commissionpilot.org.'
            : 'In compliance with European GDPR and Spanish LSSI-CE (Law 34/2002), the legal and fiscal details of the publisher operating https://commissionpilot.org are published below.'}
        </p>
      </div>

      {/* Document Body */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 text-sm text-slate-700 space-y-8 leading-relaxed shadow-xs">
        
        {/* AVISO LEGAL */}
        {activeLegalDoc === 'aviso-legal' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              {language === 'es' ? 'Aviso Legal (LSSI-CE 34/2002)' : 'Legal Notice (LSSI-CE Spain & EU)'}
            </h2>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">1. Datos Identificativos del Responsable</h3>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición de los usuarios los datos identificativos del titular de este sitio web:
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs font-mono">
                <div><strong>Nombre y apellidos del titular:</strong> Amin Ajrif</div>
                <div><strong>Nombre comercial:</strong> CommissionPilot (dominio y marca web)</div>
                <div><strong>N.I.E. / N.I.F.:</strong> Z3277056K</div>
                <div><strong>Situación profesional:</strong> Trabajador autónomo (titular único al 100% de la actividad)</div>
                <div><strong>Domicilio profesional:</strong> Provenza 148, Local, 08036 Barcelona, España</div>
                <div><strong>Página web oficial:</strong> <a href="https://commissionpilot.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://commissionpilot.org</a></div>
                <div><strong>Correo electrónico de contacto:</strong> <a href="mailto:AMIN.AJRIF@gmail.com" className="text-blue-600 hover:underline">AMIN.AJRIF@gmail.com</a> / legal@commissionpilot.org</div>
                <div><strong>Perfil profesional oficial:</strong> <a href="https://www.linkedin.com/in/amin-ajrif-9464a2106" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.linkedin.com/in/amin-ajrif-9464a2106</a></div>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">2. Objeto y Ámbito de Aplicación</h3>
              <p>
                El presente Aviso Legal regula el acceso y la utilización del sitio web <strong>https://commissionpilot.org</strong>. La navegación por el sitio web atribuye la condición de usuario e implica la aceptación plena de todas las disposiciones incluidas en este documento.
              </p>
              <p>
                CommissionPilot es una plataforma digital de descubrimiento, análisis y recomendación de productos comercializados por terceros mediante programas de afiliación. CommissionPilot no comercializa de manera directa ninguno de los productos mostrados en la web, ni actúa como tienda física o transportista, remitiendo a los distribuidores oficiales autorizados.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">3. Condiciones de Acceso y Uso</h3>
              <p>
                El usuario se compromete a hacer un uso lícito, diligente y correcto de la web y de los contenidos ofrecidos, de conformidad con la ley, la moral y el orden público.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">4. Exclusión de Responsabilidad</h3>
              <p>
                CommissionPilot verifica rigurosamente las características y precios de los productos en el momento de su publicación. Sin embargo, las condiciones comerciales, existencias, precios y promociones son gestionadas con exclusividad por las tiendas de destino (como distribuidores autorizados o plataformas de comercio). Por ello, CommissionPilot declina cualquier responsabilidad derivada de modificaciones de precio posteriores no comunicadas por las plataformas terceras.
              </p>
            </section>
          </div>
        )}

        {/* POLITICA DE PRIVACIDAD */}
        {activeLegalDoc === 'privacidad' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              {language === 'es' ? 'Política de Privacidad (RGPD 2016/679 y LOPDGDD 3/2018)' : 'Privacy Policy (GDPR Compliance)'}
            </h2>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">1. Responsable del Tratamiento de Datos</h3>
              <p>
                El Responsable del tratamiento de los datos personales recabados a través de https://commissionpilot.org es <strong>Amin Ajrif</strong>, con N.I.E. <strong>Z3277056K</strong> (trabajador autónomo titular al 100% de la actividad), con domicilio profesional en <strong>Provenza 148, Local, 08036 Barcelona, España</strong>. Correo de contacto directo para el ejercicio de derechos: <a href="mailto:AMIN.AJRIF@gmail.com" className="text-blue-600 font-semibold hover:underline">AMIN.AJRIF@gmail.com</a> o <strong>privacy@commissionpilot.org</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">2. Finalidad del Tratamiento</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Gestionar consultas y solicitudes enviadas a través del formulario de contacto.</li>
                <li>Monitorear de forma anonimizada y agregada el rendimiento de los enlaces de afiliación cuando el usuario consiente expresamente las cookies analíticas.</li>
                <li>Garantizar la seguridad técnica y prevenir accesos no autorizados a la infraestructura web.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">3. Base Jurídica que Legítima el Tratamiento</h3>
              <p>
                La base legal para el tratamiento de los datos aportados voluntariamente en formularios es el consentimiento del usuario (artículo 6.1.a del RGPD). Para la navegación técnica esencial, la base es el interés legítimo en mantener la web operativa y segura (artículo 6.1.f del RGPD).
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">4. Conservación de los Datos</h3>
              <p>
                Los datos de contacto se conservarán durante el tiempo estrictamente necesario para responder a la consulta planteada o hasta que el usuario solicite su supresión.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">5. Derechos del Interesado (ARCO-POL)</h3>
              <p>
                El usuario puede ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Supresión (Olvido), Limitación del tratamiento, Portabilidad y Oposición</strong> enviando una comunicación escrita acompañada de copia de su documento de identidad a <strong>privacy@commissionpilot.org</strong>. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD - www.aepd.es) si considera vulnerados sus derechos.
              </p>
            </section>
          </div>
        )}

        {/* POLITICA DE COOKIES */}
        {activeLegalDoc === 'cookies' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              {language === 'es' ? 'Política de Cookies (LSSI-CE y Guía AEPD)' : 'Cookie Policy (EU ePrivacy Directive)'}
            </h2>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">1. ¿Qué son las Cookies?</h3>
              <p>
                Una cookie es un pequeño archivo que se almacena en el navegador del usuario al acceder a determinadas páginas web. Permite a una página web, entre otras cosas, recordar las preferencias del usuario y garantizar el funcionamiento de la sesión.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">2. Tipología de Cookies Utilizadas en CommissionPilot</h3>
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-900 text-xs">A) Cookies Técnicas / Necesarias (Siempre Activas):</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Imprescindibles para permitir la navegación por la web, guardar la configuración de cookies y garantizar la seguridad técnica. No requieren consentimiento según el art. 22.2 LSSI.
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-900 text-xs">B) Cookies de Seguimiento de Afiliación (Requieren Consentimiento):</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Cuando haces clic en un enlace de afiliado hacia una tienda externa (ej. Amazon Associates, Awin, CJ), la tienda externa puede depositar una cookie técnica en tu navegador para identificar que la visita procedió de CommissionPilot y registrar una comisión cualificada. No se instalan cookies de terceros antes de tu consentimiento o acción voluntaria.
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-900 text-xs">C) Cookies Analíticas (Requieren Consentimiento):</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Permiten cuantificar el número de usuarios y realizar la medición estadística anónima del uso del catálogo.
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">3. Configuración y Revocación del Consentimiento</h3>
              <p>
                Puedes cambiar tus preferencias o revocar tu consentimiento en cualquier momento haciendo clic en el botón de Configuración de Cookies en el pie de página de CommissionPilot o a través de la configuración de tu navegador (Chrome, Safari, Firefox, Edge).
              </p>
            </section>
          </div>
        )}

        {/* POLITICA DE AFILIACION */}
        {activeLegalDoc === 'afiliacion' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              {language === 'es' ? 'Política de Afiliación y Transparencia Comercial' : 'Affiliate Policy & Commercial Framework'}
            </h2>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">1. Naturaleza de los Enlaces</h3>
              <p>
                El sitio web https://commissionpilot.org incluye enlaces patrocinados y códigos de seguimiento de afiliación comercial. Al hacer clic en un enlace de producto identificado como «Ver Precio», «Consultar Precio» o «Visitar Tienda», el usuario es redirigido a la tienda oficial o plataforma autorizada.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">2. Garantía de Coste Cero para el Consumidor</h3>
              <p>
                Las comisiones percibidas por CommissionPilot proceden exclusivamente de los márgenes de marketing de los vendedores y distribuidores asociados. En ningún supuesto el uso de un enlace de afiliado incrementa el precio final cobrado al usuario.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">3. Redes Participantes</h3>
              <p>
                CommissionPilot mantiene o está en proceso de suscripción a los programas oficiales de Amazon Associates, Awin, CJ Affiliate, ClickBank y acuerdos de partner directo con proveedores de software.
              </p>
            </section>
          </div>
        )}

        {/* CONDICIONES DE USO */}
        {activeLegalDoc === 'condiciones' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              {language === 'es' ? 'Condiciones Generales de Uso' : 'Terms and Conditions of Use'}
            </h2>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">1. Aceptación de las Condiciones</h3>
              <p>
                El acceso y uso de CommissionPilot presupone el conocimiento y la conformidad con los presentes Términos de Uso. El portal se reserva la facultad de modificar las condiciones en cualquier momento para adecuarlas a novedades legislativas.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">2. Propiedad Intelectual e Industrial</h3>
              <p>
                Los textos, comparativas, composiciones gráficas y código fuente propios de CommissionPilot son titularidad de sus autores y están protegidos por las leyes de propiedad intelectual. Las marcas comerciales, denominaciones de producto y fotografías de productos pertenecen a sus respectivos fabricantes y propietarios legítimos, siendo utilizadas bajo propósitos informativos y de referencia comercial legítima.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base">3. Ley Aplicable y Jurisdicción</h3>
              <p>
                Para la resolución de cualquier controversia relativa a este sitio web o a las actividades en él desarrolladas, será de aplicación la legislación española vigente, sometiéndose las partes a los Juzgados y Tribunales de la ciudad de Barcelona, España, sin perjuicio de los fueros legales imperativos que correspondan a los usuarios consumidores.
              </p>
            </section>
          </div>
        )}

      </div>

    </div>
  );
};
