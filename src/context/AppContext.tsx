import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductCategory, ReviewArticle, ClickRecord, CookiePreferences, BrevoConfig, SubscriberRecord } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/initialProducts';

export type PageView = 
  | 'home'
  | 'categories'
  | 'comparisons'
  | 'reviews'
  | 'about'
  | 'contact'
  | 'affiliate-disclosure'
  | 'legal'
  | 'glacier-breeze'
  | 'admin';

export type LegalDocType = 
  | 'aviso-legal'
  | 'privacidad'
  | 'cookies'
  | 'afiliacion'
  | 'condiciones';

interface AffiliateConfig {
  amazonTag: string;
  awinId: string;
  cjId: string;
  clickBankUser: string;
}

interface AppContextType {
  products: Product[];
  reviews: ReviewArticle[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  comparisonProductIds: string[];
  toggleComparisonProduct: (productId: string) => void;
  clearComparison: () => void;
  activeLegalDoc: LegalDocType;
  setActiveLegalDoc: (doc: LegalDocType) => void;
  openLegalDoc: (doc: LegalDocType) => void;
  // Affiliate management
  affiliateConfig: AffiliateConfig;
  updateAffiliateConfig: (config: AffiliateConfig) => void;
  clickRecords: ClickRecord[];
  recordClick: (productId: string, productName: string, store: string, network: Product['affiliateNetwork'], targetUrl: string) => void;
  // Redirect modal
  pendingRedirect: { product: Product; store: string; url: string } | null;
  setPendingRedirect: (redirect: { product: Product; store: string; url: string } | null) => void;
  // Admin CMS
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  addProduct: (newProduct: Product) => void;
  updateProduct: (updated: Product) => void;
  deleteProduct: (id: string) => void;
  resetCatalogToDefault: () => void;
  // Article Reviews CRUD
  addReview: (newReview: ReviewArticle) => void;
  updateReview: (updatedReview: ReviewArticle) => void;
  deleteReview: (id: string) => void;
  // Cookie Preferences
  cookiePreferences: CookiePreferences;
  saveCookiePreferences: (prefs: Partial<CookiePreferences>) => void;
  isCookieModalOpen: boolean;
  setIsCookieModalOpen: (open: boolean) => void;
  // Brevo Email Marketing & Subscriptions
  brevoConfig: BrevoConfig;
  updateBrevoConfig: (config: BrevoConfig) => void;
  subscribers: SubscriberRecord[];
  addSubscriber: (email: string, source?: string) => Promise<{ success: boolean; message: string }>;
  // Newsletter popup
  isNewsletterOpen: boolean;
  setIsNewsletterOpen: (open: boolean) => void;
  // Language
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_PRODUCTS_KEY = 'commissionpilot_products_v7';
const LOCAL_REVIEWS_KEY = 'commissionpilot_reviews_v3';
const LOCAL_CLICKS_KEY = 'commissionpilot_clicks_v2';
const LOCAL_AFFILIATE_CONFIG_KEY = 'commissionpilot_affiliate_config_v2';
const LOCAL_COOKIES_KEY = 'commissionpilot_cookies_consent_v1';
const LOCAL_BREVO_CONFIG_KEY = 'commissionpilot_brevo_config_v1';
const LOCAL_SUBSCRIBERS_KEY = 'commissionpilot_subscribers_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => ({
            ...item,
            price: Number(item.price) || 0,
            features: Array.isArray(item.features) ? item.features : [],
            pros: Array.isArray(item.pros) ? item.pros : [],
            cons: Array.isArray(item.cons) ? item.cons : [],
            specs: typeof item.specs === 'object' && item.specs !== null ? item.specs : {}
          }));
        }
      }
    } catch (e) {
      console.warn('Error reading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<ReviewArticle[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_REVIEWS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => ({
            ...item,
            recommendedProducts: Array.isArray(item.recommendedProducts) ? item.recommendedProducts : [],
            contentSections: Array.isArray(item.contentSections) ? item.contentSections : []
          }));
        }
      }
    } catch (e) {
      console.warn('Error reading reviews from localStorage', e);
    }
    return INITIAL_REVIEWS;
  });

  // Sync reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Could not save reviews to localStorage', e);
    }
  }, [reviews]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // URL-driven page view (supports /admin directly)
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path === '/admin/' || path.startsWith('/admin')) {
        return 'admin';
      }
      if (path === '/glacier-breeze' || path.startsWith('/glacier-breeze')) {
        return 'glacier-breeze';
      }
    }
    return 'home';
  });

  // Listen to browser navigation (back/forward or URL changes)
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname.toLowerCase();
        if (path === '/admin' || path.startsWith('/admin')) {
          setCurrentPage('admin');
        } else if (path === '/glacier-breeze' || path.startsWith('/glacier-breeze')) {
          setCurrentPage('glacier-breeze');
        } else {
          setCurrentPage('home');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonProductIds, setComparisonProductIds] = useState<string[]>([]);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>('aviso-legal');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState<boolean>(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'es'>('es');

  const [pendingRedirect, setPendingRedirect] = useState<{ product: Product; store: string; url: string } | null>(null);

  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_AFFILIATE_CONFIG_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      amazonTag: 'commissionpilot-20',
      awinId: '11000',
      cjId: '9999',
      clickBankUser: 'commpilot'
    };
  });

  const [clickRecords, setClickRecords] = useState<ClickRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CLICKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_COOKIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      essential: true,
      analytics: false,
      affiliateTracking: false,
      hasConsented: false
    };
  });

  // Brevo Configuration State
  const [brevoConfig, setBrevoConfig] = useState<BrevoConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_BREVO_CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          apiKey: parsed.apiKey || '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',
          listId: parsed.listId && parsed.listId !== '2' ? parsed.listId : '7'
        };
      }
    } catch (e) {
      // ignore
    }
    return {
      clientKey: '',
      apiKey: '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',
      listId: '7',
      formEmbedUrl: '',
      enableConversations: false,
      conversationsId: ''
    };
  });

  // Subscriber Lead Capture State
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_SUBSCRIBERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage', e);
    }
  }, [products]);

  // Sync click records
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_CLICKS_KEY, JSON.stringify(clickRecords));
    } catch (e) {
      // ignore
    }
  }, [clickRecords]);

  // Sync affiliate config
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_AFFILIATE_CONFIG_KEY, JSON.stringify(affiliateConfig));
    } catch (e) {
      // ignore
    }
  }, [affiliateConfig]);

  // Sync cookies
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_COOKIES_KEY, JSON.stringify(cookiePreferences));
    } catch (e) {
      // ignore
    }
  }, [cookiePreferences]);

  // Sync Brevo config
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_BREVO_CONFIG_KEY, JSON.stringify(brevoConfig));
    } catch (e) {
      // ignore
    }
  }, [brevoConfig]);

  // Sync subscribers
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_SUBSCRIBERS_KEY, JSON.stringify(subscribers));
    } catch (e) {
      // ignore
    }
  }, [subscribers]);

  // Inject Brevo Conversations or Tracking Script if enabled & configured
  useEffect(() => {
    if (brevoConfig.enableConversations && brevoConfig.conversationsId) {
      const scriptId = 'brevo-conversations-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://conversations-widget.brevo.com/sib-conversations.js`;
        script.onload = () => {
          (window as any).SibConversations = (window as any).SibConversations || {};
          (window as any).SibConversations('init', {
            widgetId: brevoConfig.conversationsId
          });
        };
        document.body.appendChild(script);
      }
    }
  }, [brevoConfig.enableConversations, brevoConfig.conversationsId]);

  const updateBrevoConfig = (config: BrevoConfig) => {
    setBrevoConfig(config);
  };

  const addSubscriber = async (email: string, source: string = 'homepage') => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      return { 
        success: false, 
        message: language === 'es' ? 'Introduce una dirección de email válida.' : 'Please enter a valid email address.' 
      };
    }

    const alreadySubscribed = subscribers.some(s => s.email === trimmed);
    if (alreadySubscribed) {
      return {
        success: true,
        message: language === 'es' ? '¡Ya estás registrado para recibir alertas de ofertas!' : 'You are already registered for deal alerts!'
      };
    }

    const newRecord: SubscriberRecord = {
      id: 'sub-' + Date.now().toString(36),
      email: trimmed,
      timestamp: new Date().toISOString(),
      source,
      syncedToBrevo: false
    };

    // 1. Try server-side proxy route to avoid browser CORS restrictions
    try {
      const serverRes = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          source,
          listId: brevoConfig.listId || '7'
        })
      });
      if (serverRes.ok) {
        const data = await serverRes.json().catch(() => ({}));
        if (data.syncedToBrevo) {
          newRecord.syncedToBrevo = true;
        }
      } else if (brevoConfig.apiKey) {
        // Fallback: direct client-side fetch if server endpoint is unavailable
        const directRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoConfig.apiKey
          },
          body: JSON.stringify({
            email: trimmed,
            listIds: [parseInt(brevoConfig.listId || '7', 10)],
            updateEnabled: true
          })
        });
        if (directRes.ok || directRes.status === 201 || directRes.status === 204) {
          newRecord.syncedToBrevo = true;
        }
      }
    } catch (err) {
      console.warn('Brevo sync deferred to local queue', err);
    }

    setSubscribers((prev) => [newRecord, ...prev]);

    return { 
      success: true, 
      message: newRecord.syncedToBrevo 
        ? (language === 'es' ? '¡Suscripción confirmada y sincronizada con Brevo!' : 'Subscription confirmed & synced with Brevo!')
        : (language === 'es' ? '¡Suscripción completada! Recibirás avisos cuando se publiquen ofertas verificadas.' : 'Subscription completed! You will receive verified deal alerts.')
    };
  };

  const toggleComparisonProduct = (productId: string) => {
    setComparisonProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        // limit to 3 for clean side-by-side view
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const clearComparison = () => {
    setComparisonProductIds([]);
  };

  const openLegalDoc = (doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    setCurrentPage('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateAffiliateConfig = (config: AffiliateConfig) => {
    setAffiliateConfig(config);
  };

  const recordClick = (
    productId: string,
    productName: string,
    store: string,
    network: Product['affiliateNetwork'],
    targetUrl: string
  ) => {
    const newRecord: ClickRecord = {
      id: 'clk-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      productId,
      productName,
      store,
      network,
      timestamp: new Date().toISOString(),
      targetUrl
    };
    setClickRecords((prev) => [newRecord, ...prev.slice(0, 199)]);
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setComparisonProductIds((prev) => prev.filter((item) => item !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  const resetCatalogToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    setReviews(INITIAL_REVIEWS);
    localStorage.removeItem(LOCAL_PRODUCTS_KEY);
    localStorage.removeItem(LOCAL_REVIEWS_KEY);
  };

  const addReview = (newReview: ReviewArticle) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const updateReview = (updatedReview: ReviewArticle) => {
    setReviews((prev) => prev.map((r) => (r.id === updatedReview.id ? updatedReview : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const saveCookiePreferences = (prefs: Partial<CookiePreferences>) => {
    setCookiePreferences((prev) => ({
      ...prev,
      ...prefs,
      essential: true, // always required
      hasConsented: true,
      consentDate: new Date().toISOString()
    }));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        reviews,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        comparisonProductIds,
        toggleComparisonProduct,
        clearComparison,
        activeLegalDoc,
        setActiveLegalDoc,
        openLegalDoc,
        affiliateConfig,
        updateAffiliateConfig,
        clickRecords,
        recordClick,
        pendingRedirect,
        setPendingRedirect,
        isAdminOpen,
        setIsAdminOpen,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalogToDefault,
        addReview,
        updateReview,
        deleteReview,
        cookiePreferences,
        saveCookiePreferences,
        isCookieModalOpen,
        setIsCookieModalOpen,
        brevoConfig,
        updateBrevoConfig,
        subscribers,
        addSubscriber,
        isNewsletterOpen,
        setIsNewsletterOpen,
        language,
        setLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
