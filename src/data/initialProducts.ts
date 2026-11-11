import { Product, ReviewArticle } from '../types';

export const CATEGORIES_LIST = [
  'All',
  'Tecnología & Viajes',
  'Hogar & Jardín',
  'Climatización & Confort'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'offer-enence',
    name: 'Traductor Instantáneo Enence',
    slug: 'enence-traductor-instantaneo',
    category: 'Tecnología & Viajes',
    brand: 'Enence',
    price: 89,
    currency: 'EUR',
    priceVerifiedDate: 'Noviembre 2026',
    store: 'Enence Oficial',
    affiliateNetwork: 'Direct Partner',
    affiliateUrl: 'https://www.xcxfi08q.com/3DCFHG/RXZ1Q4/?creative_id=1148',
    image: 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/669d5713-9b6a-46bb-bd7e-c542cff6dd6a/e3bf58712b5748708f93c1ad28901143/22W30-flags-enence-01-191x1.jpg',
    logoImage: 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/669d5713-9b6a-46bb-bd7e-c542cff6dd6a/e3bf58712b5748708f93c1ad28901143/logo-enence2-3.png',
    badgeTag: 'Top Ventas Viajes',
    commissionRate: 'Hasta 50% de Descuento',
    ctaLabel: 'DESCUBRE MÁS',
    summary: '¡Con Enence puedes hablar cualquier idioma con solo presionar un botón! Traducción instantánea para disfrutar de tus vacaciones sin barreras.',
    description: 'Cuando te vas de vacaciones, solo quieres centrarte en los momentos divertidos que te esperan: nadar en la playa, hacer senderismo por nuevos senderos o comprar en los mercados. El Traductor Instantáneo Enence te permite hablar cualquier idioma con solo presionar un botón, evitando perderte, previniendo malentendidos y facilitando la ayuda en situaciones de emergencia.',
    features: [
      'Traducción de voz bidireccional instantánea en tiempo real con solo presionar un botón',
      'Evita perderte: habla fácilmente con la gente local y pide direcciones al visitar nuevos lugares',
      'Evita malentendidos: previene situaciones embarazosas o involuntariamente ofensivas al hablar en el extranjero',
      'Evita situaciones peligrosas: comunícate con rapidez para pedir auxilio y entender señales o advertencias locales',
      'Diseño ultraligero de bolsillo, ideal para llevar en la playa, excursiones o paseos',
      'Batería recargable de larga duración para varios días de vacaciones'
    ],
    pros: [
      'Manejo extremadamente sencillo con dos botones para traducción bidireccional',
      'Audio claro con altavoz de alta fidelidad y micrófono con cancelación de ruido',
      'Elimina por completo el miedo y la ansiedad a viajar a países con idiomas desconocidos'
    ],
    cons: [
      'Se recomienda contar con cobertura móvil o conexión para el máximo abanico de dialectos'
    ],
    specs: {
      'Idiomas': 'Más de 36 idiomas globales bidireccionales en tiempo real',
      'Velocidad de Respuesta': 'Menos de 1,5 segundos por frase',
      'Batería': 'Batería de litio de alta duración para viajes prolongados',
      'Conectividad': 'Bluetooth ultraestable de bajo consumo',
      'Garantía': 'Garantía oficial del fabricante'
    },
    buyersGuideNote: 'El dispositivo número 1 recomendado para viajar al extranjero sin barreras lingüísticas ni estrés.',
    isFeatured: true,
    isRecommended: true,
    isEditorChoice: true,
    ratingScore: 9.8,
    comparisonHighlights: 'Habla cualquier idioma con solo presionar un botón y viaja sin preocupaciones.'
  },
  {
    id: 'offer-grillwizz',
    name: 'GrillWizz - Limpiador Automático de Parrillas',
    slug: 'grillwizz-limpiador-parrillas',
    category: 'Hogar & Jardín',
    brand: 'GrillWizz',
    price: 48,
    currency: 'USD',
    priceVerifiedDate: 'Noviembre 2026',
    store: 'GrillWizz Store',
    affiliateNetwork: 'Direct Partner',
    affiliateUrl: 'https://www.autocustompack.com/5111QJJ/2BW43X2S/?creative_id=62347',
    image: '/assets/grillwizz_cleaner.jpg',
    logoImage: '/assets/grillwizz_cleaner.jpg',
    badgeTag: '100% Seguro para la Salud',
    commissionRate: '48 $ · Limpieza en 60s',
    ctaLabel: 'Ver Oferta',
    summary: 'Ahorra 25 minutos de frote. Limpia tu parrilla en 60 segundos con motor de alto torque y cerdas fusionadas que nunca caen en la comida.',
    description: 'Skip 25 minutes of scrubbing. Clean your grill in 60 seconds. GrillWizz incorpora un cabezal giratorio en ángulo de alto torque que envuelve cada barra de la parrilla, alcanzando lo que los cepillos planos tradicionales no tocan. Sus cerdas de alambre fusionadas eliminan el grave riesgo de que se desprendan hilos metálicos en los alimentos, protegiendo a tu familia e invitados.',
    features: [
      'Motor de alto torque: realiza todo el fregado pesado automáticamente sin esfuerzo manual',
      'Limpieza en 60 segundos: sustituye más de 20 minutos de cepillado manual tradicional',
      'Cerdas de alambre fusionadas (Bonded wire bristles): fundidas en el cabezal, no se desprenden ni acaban en la comida',
      '3 velocidades de funcionamiento: pasada ligera para uso diario o máxima potencia para grasa requemada',
      'Cabezal en ángulo envolvente: limpia alrededor de cada barra y en las esquinas difíciles de una pasada',
      'Inalámbrico y recargable: puerto USB-C para múltiples limpiezas profundas por carga',
      'Compatibilidad universal: gas, carbón, pellets e infrarrojos; sobre porcelana, hierro fundido o acero inoxidable',
      'Mango ergonómico ligero y equilibrado para un uso cómodo con una sola mano'
    ],
    pros: [
      'Elimina el riesgo de visitas a urgencias por pelos de alambre sueltos en la comida',
      'Deja las parrillas relucientes como el primer día en 1 minuto sin cansancio',
      'Batería recargable USB-C para usar en cualquier rincón del jardín o terraza'
    ],
    cons: [
      'Stock limitado durante la temporada de barbacoas'
    ],
    specs: {
      'Motor': 'Alto torque con 3 niveles de potencia ajustables',
      'Tiempo de Limpieza': '60 segundos por ciclo',
      'Cerdas': 'Alambre fusionado antirrotura (Bonded Bristles)',
      'Carga': 'Puerto USB-C (cable incluido)',
      'Compatibilidad': 'Acero inoxidable, hierro fundido, porcelana, gas, carbón y pellets',
      'Precio Oficial': '48 dólares'
    },
    buyersGuideNote: 'La inversión definitiva para los amantes de las barbacoas que valoran su tiempo y la seguridad alimentaria de sus invitados.',
    isFeatured: true,
    isRecommended: true,
    isEditorChoice: true,
    ratingScore: 9.7,
    comparisonHighlights: 'Limpia en 60 segundos sin esfuerzo y elimina el riesgo de cerdas metálicas en la comida.'
  },
  {
    id: 'offer-glacier-breeze',
    name: 'Glacier Breeze - Aire Acondicionado Portátil',
    slug: 'glacier-breeze-portable-ac',
    category: 'Climatización & Confort',
    brand: 'Glacier Breeze',
    price: 54.99,
    currency: 'USD',
    priceVerifiedDate: 'Noviembre 2026',
    store: 'Glacier Breeze Oficial',
    affiliateNetwork: 'Direct Partner',
    affiliateUrl: 'https://www.autocustompack.com/5111QJJ/2BW43X2S/?creative_id=62347',
    image: 'https://onninest.com/glacierbreeze/images/pre/product.webp',
    logoImage: 'https://onninest.com/glacierbreeze/images/inter/logo.webp',
    badgeTag: '50% Descuento Especial',
    commissionRate: '50% Dto. · $54.99 (Antes $109.98)',
    ctaLabel: 'CHECK THE DISCOUNT',
    summary: 'Enfría tu espacio personal sin encender el aire central todo el día. 10h de autonomía inalámbrica, depósito de 500ml y 3 velocidades.',
    description: 'Glacier Breeze es un sistema de climatización personal compacto diseñado para proporcionar confort térmico localizado con bajo consumo. Funciona de manera inalámbrica hasta 10 horas con batería recargable USB-C y depósito de 500 ml para agua o hielo. Actualmente disponible con un descuento promocional del 50% ($54.99 en lugar de $109.98) y garantía de reembolso de 90 días.',
    features: [
      'Hasta 10 horas de enfriamiento inalámbrico sin cables en cualquier habitación u oficina',
      'Depósito de 500 ml para agua fría o cubitos de hielo que multiplica la sensación de frescor',
      '3 velocidades de ventilador regulables para adaptar el flujo de aire al instante',
      'Tres sencillos pasos: 1. Llenar el depósito, 2. Encender, 3. Sentir el frescor inmediato',
      'Ahorro del 50%: precio promocionado de $109.98 a solo $54.99',
      'Garantía oficial de devolución de dinero de 90 días'
    ],
    pros: [
      'Reduce drásticamente la factura de luz al evitar el aire acondicionado central',
      'Ultracompacto y ligero para llevarlo a dormitorios, despachos o terrazas',
      'Ultrasilencioso, perfecto para trabajar o dormir plácidamente'
    ],
    cons: [
      'Diseñado para refrigeración personal directa, no para viviendas enteras de múltiples estancias'
    ],
    specs: {
      'Autonomía': 'Hasta 10 horas de uso continuo inalámbrico',
      'Capacidad del Depósito': '500 ml para agua y cubitos de hielo',
      'Velocidades': '3 niveles de ventilador ajustables',
      'Carga': 'USB-C de bajo consumo energético',
      'Garantía': '90 días de devolución asegurada',
      'Precio Promoción': '$54.99 (50% de descuento aplicado)'
    },
    buyersGuideNote: 'La solución más eficiente para mantenerse fresco y cómodo durante los días calurosos sin arruinarse en la factura eléctrica.',
    isFeatured: true,
    isRecommended: true,
    isEditorChoice: true,
    ratingScore: 9.9,
    comparisonHighlights: 'Enfriamiento personal eficiente con 10h de autonomía, 3 velocidades y 50% de descuento.'
  }
];

export const INITIAL_REVIEWS: ReviewArticle[] = [
  {
    id: 'review-enence',
    title: 'Enence Traductor Instantáneo: Tu Compañero Imprescindible para Vacaciones sin Barreras',
    slug: 'enence-traductor-instantaneo-analisis-vacaciones',
    publishDate: '10 Nov 2026',
    category: 'Tecnología & Viajes',
    badge: 'Guía de Viaje',
    readingTime: '5 min',
    image: 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/669d5713-9b6a-46bb-bd7e-c542cff6dd6a/e3bf58712b5748708f93c1ad28901143/22W30-flags-enence-01-191x1.jpg',
    author: 'Amin Ajrif',
    summary: 'Cuando te vas de vacaciones solo quieres centrarte en los momentos divertidos. Analizamos cómo el Traductor Instantáneo Enence te permite hablar cualquier idioma con un solo botón y evitar pérdidas, malentendidos y riesgos.',
    recommendedProducts: ['offer-enence'],
    contentSections: [
      {
        heading: '1. Vacaciones despreocupadas: habla cualquier idioma con solo un botón',
        body: 'Cuando te vas de vacaciones, solo quieres centrarte en los momentos divertidos que te esperan. Ya sea que estés nadando en la playa, haciendo senderismo por nuevos senderos o comprando en los mercados locales, debes llevar contigo un Traductor Instantáneo Enence. ¡Con Enence puedes hablar cualquier idioma con solo presionar un botón!'
      },
      {
        heading: '2. 🗺️ Evita perderte al visitar nuevos lugares',
        body: 'Perderse en una ciudad extranjera sin saber el idioma local puede ser frustrante y abrumador. Con Enence puedes comunicarte con naturalidad con los habitantes locales, preguntar por direcciones hacia monumentos, estaciones de tren o tu hotel, y recibir indicaciones claras en tu propio idioma.'
      },
      {
        heading: '3. 💬 Evita malentendidos y momentos incómodos',
        body: 'Si hablas mal o no hablas en absoluto un idioma, la comunicación a veces puede malinterpretarse, llevando a situaciones embarazosas. Por ejemplo, si ofendes accidentalmente a alguien usando una palabra equivocada, esto puede causar conflictos innecesarios. Evita esto llevando siempre contigo tu Enence cuando viajes al extranjero.'
      },
      {
        heading: '4. ☠️ Prevención de situaciones peligrosas y emergencias',
        body: 'Cuando viajamos a nuevos países, el conocimiento del idioma y la cultura local puede prevenir riesgos. Lleva siempre contigo tu Enence para pedir ayuda rápidamente en caso de emergencia médica o desorientación, y comprender mejor las advertencias o señales de seguridad locales.'
      }
    ]
  },
  {
    id: 'review-grillwizz',
    title: 'GrillWizz: Limpia tu Parrilla en 60 Segundos y Dile Adiós al Frote Manual',
    slug: 'grillwizz-limpiador-parrillas-analisis-seguridad',
    publishDate: '8 Nov 2026',
    category: 'Hogar & Jardín',
    badge: 'Seguridad & Barbacoa',
    readingTime: '6 min',
    image: '/assets/grillwizz_cleaner.jpg',
    author: 'Amin Ajrif',
    summary: 'Ahorra 25 minutos de frote pesado tras cada barbacoa. Descubre por qué GrillWizz revoluciona la limpieza con su motor de alto torque y cerdas fusionadas 100% seguras que nunca caen en la comida.',
    recommendedProducts: ['offer-grillwizz'],
    contentSections: [
      {
        heading: '1. Recupera tu tiempo: limpieza profunda en 60 segundos',
        body: 'Skip 25 minutes of scrubbing. Clean your grill in 60 seconds. Un cabezal giratorio de alto torque envuelve cada barra de la rejilla, alcanzando lo que los cepillos planos tradicionales no tocan. Solo presionas el botón, lo deslizas y listo. No estás pagando por un cepillo; estás comprando más de 20 minutos de tiempo libre tras cada barbacoa.'
      },
      {
        heading: '2. Cerdas de alambre fusionadas: cero riesgo para la salud de tus comensales',
        body: 'Los cepillos metálicos convencionales provocan más de 130 visitas al año a salas de emergencias debido a cerdas sueltas que caen en las hamburguesas o carnes asadas. De hecho, en 2026 los principales fabricantes tuvieron que retirar del mercado más de 10 millones de cepillos de alambre. GrillWizz incorpora cerdas fusionadas y fundidas en el propio cabezal (Bonded Wire Bristles), eliminando por completo este peligro mortal.'
      },
      {
        heading: '3. 3 niveles de potencia y cabezal en ángulo envolvente',
        body: 'A diferencia de los cepillos planos que solo rascan la superficie superior, el cabezal envolvente en ángulo de GrillWizz limpia las 3 caras de cada barra y las esquinas en una sola pasada. Dispone de 3 velocidades para regular la fuerza según se trate de un mantenimiento ligero o grasa quemada incrustada.'
      },
      {
        heading: '4. Inalámbrico con USB-C y compatibilidad universal',
        body: 'Cuenta con batería recargable por USB-C que rinde para múltiples limpiezas a fondo por cada carga. Además, es universalmente compatible con parrillas de gas, carbón, pellets e infrarrojos, y seguro sobre superficies de hierro fundido, porcelana o acero inoxidable. Su precio promocional es de solo 48 dólares.'
      }
    ]
  },
  {
    id: 'review-glacier-breeze',
    title: 'Glacier Breeze: Climatización Personal Eficiente sin Arruinarte en la Factura de la Luz',
    slug: 'glacier-breeze-portable-ac-analisis-verano',
    publishDate: '5 Nov 2026',
    category: 'Climatización & Confort',
    badge: 'Ahorro Energético',
    readingTime: '7 min',
    image: 'https://onninest.com/glacierbreeze/images/pre/product.webp',
    author: 'Amin Ajrif',
    summary: 'Cool your personal space without running full-size AC all day. Analizamos el climatizador portátil Glacier Breeze, su autonomía de 10h, su depósito de 500ml y la oferta especial con 50% de descuento.',
    recommendedProducts: ['offer-glacier-breeze'],
    contentSections: [
      {
        heading: '1. Enfriamiento específico sin encender el aire central todo el día',
        body: 'Mantener el aire acondicionado de toda la casa encendido durante horas es una de las mayores causas de facturas desorbitadas en verano. Glacier Breeze es una alternativa de enfriamiento personal compacta pensada para ofrecer confort térmico inmediato donde tú te encuentres con un consumo eléctrico diminuto.'
      },
      {
        heading: '2. Tres pasos sencillos para sentir el frío polar',
        body: 'Glacier Breeze está diseñado para ser sumamente intuitivo: 1. Llenas el depósito de 500 ml con agua o cubitos de hielo, 2. Enciendes el dispositivo, 3. Sientes el flujo de aire helado ajustable entre sus 3 velocidades de ventilación.'
      },
      {
        heading: '3. Hasta 10 horas de funcionamiento inalámbrico',
        body: 'Gracias a su batería recargable mediante cable USB-C, puedes mover Glacier Breeze de tu escritorio de teletrabajo a la mesa del salón, la mesita de noche o incluso al exterior sin necesidad de alargaderas ni enchufes cercanos.'
      },
      {
        heading: '4. Descuento promocional del 50% y garantía de 90 días',
        body: 'El precio de catálogo habitual de $109.98 se encuentra rebajado temporalmente a tan solo $54.99 mientras dure la promoción. Además, el fabricante respalda la oferta con una garantía de reembolso y devolución del 100% durante 90 días.'
      }
    ]
  }
];
