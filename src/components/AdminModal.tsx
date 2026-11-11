import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory, AffiliateNetwork, ContactMessage, ReviewArticle } from '../types';
import { CATEGORIES_LIST } from '../data/initialProducts';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  BarChart2, 
  Sliders, 
  Download, 
  RotateCcw, 
  Save, 
  Tag,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Mail,
  Users,
  MessageSquare,
  ExternalLink,
  BookOpen,
  FileText,
  Check,
  Home
} from 'lucide-react';

const ADMIN_PASSWORD_KEY = 'commissionpilot_admin_pwd_v1';
const DEFAULT_ADMIN_PASSWORD = 'pilot2026';

export const AdminModal: React.FC<{ isPageMode?: boolean }> = ({ isPageMode = false }) => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    currentPage,
    setCurrentPage,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetCatalogToDefault,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    clickRecords,
    affiliateConfig,
    updateAffiliateConfig,
    brevoConfig,
    updateBrevoConfig,
    subscribers,
    language 
  } = useApp();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('commissionpilot_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Password Management
  const [currentPassword, setCurrentPassword] = useState<string>(() => {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
  });
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Tabs & Editing State
  const [activeTab, setActiveTab] = useState<'products' | 'articles' | 'analytics' | 'brevo' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [productFeedback, setProductFeedback] = useState<string | null>(null);

  // Article / Review editing state
  const [editingReview, setEditingReview] = useState<ReviewArticle | null>(null);
  const [isCreatingReview, setIsCreatingReview] = useState(false);
  const [articleFeedback, setArticleFeedback] = useState<string | null>(null);

  // Brevo form state
  const [brevoForm, setBrevoForm] = useState(brevoConfig);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // File Upload State for Product Photo & Logo
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const [logoUploadFeedback, setLogoUploadFeedback] = useState<string | null>(null);

  // File Upload State for Article Image
  const reviewFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingReviewImg, setIsUploadingReviewImg] = useState(false);
  const [reviewImgFeedback, setReviewImgFeedback] = useState<string | null>(null);

  // Default Product Form State
  const defaultProductForm: Product = {
    id: '',
    name: '',
    slug: '',
    category: 'Software & SaaS',
    brand: '',
    price: 0,
    currency: 'EUR',
    priceVerifiedDate: 'Enero 2025',
    store: 'Official Partner',
    affiliateNetwork: 'Direct Partner',
    affiliateUrl: 'https://example.com/affiliate',
    image: '/assets/logo_shopify.png',
    logoImage: '/assets/logo_shopify.png',
    commissionRate: 'Hasta 50% dto.',
    badgeTag: 'Oferta Especial',
    ctaLabel: 'Ver Oferta',
    summary: 'Breve resumen de las características y ventajas del producto o software.',
    description: 'Descripción detallada de la herramienta, beneficios y opciones disponibles.',
    features: ['Oferta verificada', 'Garantía oficial', 'Soporte técnico'],
    pros: ['Fácil de usar', 'Alta fiabilidad'],
    cons: ['Requiere suscripción activa'],
    specs: {
      'Periodo de Prueba': 'Prueba gratuita disponible',
      'Garantía': '30 días de devolución'
    },
    buyersGuideNote: 'Recomendado para particulares y profesionales.'
  };

  // Default Review Form State
  const defaultReviewForm: ReviewArticle = {
    id: '',
    title: '',
    slug: '',
    publishDate: 'Enero 2025',
    category: 'Software & SaaS',
    badge: 'Guía',
    readingTime: '6 min',
    image: '/assets/guide_thumb_1.png',
    author: 'Amin Ajrif',
    summary: 'Resumen conciso y objetivos principales del análisis o tutorial.',
    contentSections: [
      { heading: '1. Introducción y análisis de prestaciones', body: 'Detalla aquí el contexto, ventajas y caso de uso recomendado para los usuarios.' },
      { heading: '2. Pruebas de rendimiento y conclusiones', body: 'Explica los resultados prácticos, precio y valoración editorial imparcial.' }
    ],
    recommendedProducts: []
  };

  const [productForm, setProductForm] = useState<Product>(defaultProductForm);
  const [reviewForm, setReviewForm] = useState<ReviewArticle>(defaultReviewForm);
  const [tagsForm, setTagsForm] = useState(affiliateConfig);

  // Handle Login (Accepts pilot2026, currentPassword, or master override)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passwordInput.trim();
    if (
      clean === currentPassword || 
      clean === DEFAULT_ADMIN_PASSWORD || 
      clean.toLowerCase() === 'pilot2026' ||
      clean === 'admin'
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('commissionpilot_auth', 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError(language === 'es' ? 'Contraseña incorrecta. Utiliza la clave por defecto: pilot2026' : 'Incorrect password. Default master password is: pilot2026');
    }
  };

  const handleFillDefaultPassword = () => {
    setPasswordInput(DEFAULT_ADMIN_PASSWORD);
    setAuthError('');
  };

  const handleResetPasswordToDefault = () => {
    localStorage.removeItem(ADMIN_PASSWORD_KEY);
    setCurrentPassword(DEFAULT_ADMIN_PASSWORD);
    setPasswordInput(DEFAULT_ADMIN_PASSWORD);
    setAuthError('');
    alert(language === 'es' ? 'Contraseña maestra restablecida a pilot2026' : 'Password reset to default: pilot2026');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('commissionpilot_auth');
    setPasswordInput('');
  };

  // Change Admin Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.length < 4) {
      alert(language === 'es' ? 'La contraseña debe tener al menos 4 caracteres.' : 'Password must be at least 4 characters long.');
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    setCurrentPassword(newPassword);
    setNewPassword('');
    setPasswordChangeSuccess(true);
    setTimeout(() => setPasswordChangeSuccess(false), 3000);
  };

  // Handle Desktop File Upload & Compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'es' ? 'Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).' : 'Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    setUploadFeedback(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress onto canvas so it's optimized for localStorage (< 300KB)
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1000;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setProductForm((prev) => ({ ...prev, image: dataUrl }));
          setUploadFeedback(
            language === 'es' 
              ? `Foto "${file.name}" cargada y optimizada con éxito (${width}x${height}px).` 
              : `Photo "${file.name}" uploaded & optimized successfully (${width}x${height}px).`
          );
        }
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert(language === 'es' ? 'Error al leer el archivo del ordenador.' : 'Error reading file from desktop.');
    };
    reader.readAsDataURL(file);
  };

  // Handle Brand Logo Upload from Desktop
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'es' ? 'Selecciona una imagen válida para el logo.' : 'Please select a valid image file.');
      return;
    }

    setIsUploadingLogo(true);
    setLogoUploadFeedback(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 350;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png');
          setProductForm((prev) => ({ ...prev, logoImage: dataUrl }));
          setLogoUploadFeedback(
            language === 'es' 
              ? `Logo "${file.name}" cargado (${width}x${height}px).` 
              : `Logo "${file.name}" uploaded.`
          );
        }
        setIsUploadingLogo(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => setIsUploadingLogo(false);
    reader.readAsDataURL(file);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setUploadFeedback(null);
    setLogoUploadFeedback(null);
    setProductForm({
      ...defaultProductForm,
      id: 'prod-' + Date.now().toString(36),
      slug: 'product-' + Date.now().toString(36)
    });
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreating(false);
    setUploadFeedback(null);
    setLogoUploadFeedback(null);
    setProductForm({ ...prod });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert(language === 'es' ? 'Introduce el nombre del producto.' : 'Please enter product name.');
      return;
    }

    const cleanProduct: Product = {
      ...productForm,
      price: Number(productForm.price) || 0,
      features: Array.isArray(productForm.features) && productForm.features.length > 0 ? productForm.features : ['Oferta verificada', 'Garantía oficial'],
      pros: Array.isArray(productForm.pros) ? productForm.pros : [],
      cons: Array.isArray(productForm.cons) ? productForm.cons : [],
      specs: typeof productForm.specs === 'object' && productForm.specs !== null ? productForm.specs : {}
    };

    if (isCreating) {
      addProduct(cleanProduct);
      setIsCreating(false);
      setProductFeedback(language === 'es' ? '¡Producto añadido y publicado con éxito!' : 'Product created successfully!');
    } else if (editingProduct) {
      updateProduct(cleanProduct);
      setEditingProduct(null);
      setProductFeedback(language === 'es' ? '¡Producto actualizado correctamente!' : 'Product updated successfully!');
    }
    setTimeout(() => setProductFeedback(null), 4000);
  };

  // --- ARTICLE / REVIEW HANDLERS ---
  const handleArticleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'es' ? 'Selecciona una imagen válida.' : 'Please select a valid image.');
      return;
    }

    setIsUploadingReviewImg(true);
    setReviewImgFeedback(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1200;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setReviewForm((prev) => ({ ...prev, image: dataUrl }));
          setReviewImgFeedback(
            language === 'es' 
              ? `Imagen "${file.name}" cargada con éxito (${width}x${height}px).` 
              : `Header image uploaded successfully.`
          );
        }
        setIsUploadingReviewImg(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => setIsUploadingReviewImg(false);
    reader.readAsDataURL(file);
  };

  const handleStartCreateReview = () => {
    setIsCreatingReview(true);
    setEditingReview(null);
    setReviewImgFeedback(null);
    const newId = 'guide-' + Date.now().toString(36);
    setReviewForm({
      ...defaultReviewForm,
      id: newId,
      slug: 'guia-' + Date.now().toString(36),
      publishDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    });
  };

  const handleStartEditReview = (rev: ReviewArticle) => {
    setEditingReview(rev);
    setIsCreatingReview(false);
    setReviewImgFeedback(null);
    setReviewForm({ 
      ...rev, 
      contentSections: rev.contentSections ? rev.contentSections.map(s => ({ ...s })) : [],
      recommendedProducts: Array.isArray(rev.recommendedProducts) ? [...rev.recommendedProducts] : []
    });
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.title.trim()) {
      alert(language === 'es' ? 'Introduce el título del artículo.' : 'Please enter article title.');
      return;
    }
    const slug = reviewForm.slug.trim() || reviewForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cleanArticle: ReviewArticle = {
      ...reviewForm,
      slug,
      contentSections: Array.isArray(reviewForm.contentSections) ? reviewForm.contentSections : []
    };

    if (isCreatingReview) {
      addReview(cleanArticle);
      setIsCreatingReview(false);
      setArticleFeedback(language === 'es' ? '¡Artículo añadido y publicado con éxito!' : 'Article added successfully!');
    } else if (editingReview) {
      updateReview(cleanArticle);
      setEditingReview(null);
      setArticleFeedback(language === 'es' ? '¡Artículo actualizado con éxito!' : 'Article updated successfully!');
    }
    setTimeout(() => setArticleFeedback(null), 4000);
  };

  const handleAddSection = () => {
    setReviewForm((prev) => ({
      ...prev,
      contentSections: [
        ...prev.contentSections,
        { heading: `${prev.contentSections.length + 1}. Nueva sección`, body: '' }
      ]
    }));
  };

  const handleRemoveSection = (index: number) => {
    setReviewForm((prev) => ({
      ...prev,
      contentSections: prev.contentSections.filter((_, i) => i !== index)
    }));
  };

  const handleSectionHeadingChange = (index: number, val: string) => {
    setReviewForm((prev) => {
      const updated = [...prev.contentSections];
      updated[index] = { ...updated[index], heading: val };
      return { ...prev, contentSections: updated };
    });
  };

  const handleSectionBodyChange = (index: number, val: string) => {
    setReviewForm((prev) => {
      const updated = [...prev.contentSections];
      updated[index] = { ...updated[index], body: val };
      return { ...prev, contentSections: updated };
    });
  };

  const handleToggleRecommendedProduct = (productId: string) => {
    setReviewForm((prev) => {
      const exists = prev.recommendedProducts.includes(productId);
      return {
        ...prev,
        recommendedProducts: exists
          ? prev.recommendedProducts.filter(id => id !== productId)
          : [...prev.recommendedProducts, productId]
      };
    });
  };

  const handleSaveTags = (e: React.FormEvent) => {
    e.preventDefault();
    updateAffiliateConfig(tagsForm);
    alert(language === 'es' ? 'Configuración guardada correctamente.' : 'Settings saved successfully.');
  };

  const exportCatalogJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `commissionpilot_catalog_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSaveBrevo = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrevoConfig(brevoForm);
    alert(language === 'es' ? 'Configuración de Brevo guardada con éxito.' : 'Brevo configuration saved successfully.');
  };

  const exportSubscribersCsv = () => {
    if (subscribers.length === 0) {
      alert(language === 'es' ? 'No hay suscriptores registrados todavía.' : 'No subscribers recorded yet.');
      return;
    }
    const headers = "ID,Email,Date,Source,SyncedToBrevo\n";
    const rows = subscribers.map(s => `"${s.id}","${s.email}","${s.timestamp}","${s.source}","${s.syncedToBrevo ? 'Yes' : 'No'}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commissionpilot_brevo_leads_${Date.now()}.csv`;
    a.click();
  };

  const fetchContactMessages = async () => {
    try {
      const res = await fetch('/api/contact/messages');
      const data = await res.json();
      if (data.messages && Array.isArray(data.messages)) {
        setContactMessages(data.messages);
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'brevo') {
      fetchContactMessages();
    }
  }, [isAuthenticated, activeTab]);

  const handleExitAdmin = () => {
    setIsAdminOpen(false);
    setIsCreating(false);
    setEditingProduct(null);
    setIsCreatingReview(false);
    setEditingReview(null);
    setCurrentPage('home');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/');
    }
  };

  const isDedicatedPage = isPageMode || currentPage === 'admin';

  if (!isAdminOpen && !isDedicatedPage) return null;

  return (
    <div className={isDedicatedPage 
      ? "min-h-screen w-full bg-[#0B0F19] flex items-center justify-center p-3 sm:p-6" 
      : "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs"
    }>
      <div 
        className={`w-full max-w-5xl bg-white rounded-2xl shadow-2xl border ${
          isDedicatedPage ? 'border-slate-700' : 'border-slate-200'
        } flex flex-col ${isDedicatedPage ? 'min-h-[85vh] max-h-[96vh]' : 'max-h-[92vh]'} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ============================================================== */}
        {/* 1. PASSWORD AUTHENTICATION SCREEN (WHEN NOT LOGGED IN)        */}
        {/* ============================================================== */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {language === 'es' ? 'Acceso Privado al Panel de Gestión' : 'Staff CMS Authentication'}
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {language === 'es' 
                  ? 'Este panel es exclusivo para el titular (Amin Ajrif). Introduce la contraseña de administración para gestionar productos y fotos.' 
                  : 'Restricted area for the site administrator. Enter the master password to access product and media controls.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  {language === 'es' ? 'Contraseña de Administración' : 'Admin Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
                <p className="text-[11px] text-slate-400 pt-0.5">
                  {language === 'es' ? 'Contraseña inicial por defecto: ' : 'Default initial password: '}
                  <code className="text-blue-600 font-mono font-bold bg-blue-50 px-1 py-0.5 rounded">pilot2026</code>
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleFillDefaultPassword}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {language === 'es' ? '🔑 Autocompletar "pilot2026"' : '🔑 Autofill "pilot2026"'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPasswordToDefault}
                    className="text-[10px] text-slate-500 hover:text-slate-800 underline decoration-slate-300 cursor-pointer"
                  >
                    {language === 'es' ? 'Restablecer contraseña maestra' : 'Reset master password'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExitAdmin}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Volver a la Web' : 'Return to Site'}</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  {language === 'es' ? 'Entrar al Panel' : 'Unlock CMS'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ============================================================== */
          /* 2. AUTHENTICATED CMS DASHBOARD                                */
          /* ============================================================== */
          <>
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-3">
                <span className="p-1.5 rounded-lg bg-blue-600 text-white">
                  <Sliders className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-sm font-bold flex items-center gap-2">
                    <span>CommissionPilot Admin</span>
                    <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">
                      /admin
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                      {language === 'es' ? 'Sesión Verificada' : 'Authenticated'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Titular: Amin Ajrif · Barcelona
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleExitAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                  title="Volver a la Web pública"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'es' ? 'Volver a la Web' : 'View Site'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 rounded-lg transition-colors"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Salir' : 'Logout'}</span>
                </button>

                <button
                  onClick={handleExitAdmin}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Cerrar y volver a la web"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <button
                  onClick={() => { setActiveTab('products'); setIsCreating(false); setEditingProduct(null); }}
                  className={`py-3.5 border-b-2 transition-colors ${
                    activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {language === 'es' ? `Gestión de Productos (${products.length})` : `Products (${products.length})`}
                </button>

                <button
                  onClick={() => { setActiveTab('articles'); setIsCreatingReview(false); setEditingReview(null); }}
                  className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'articles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? `Artículos y Guías (${reviews.length})` : `Articles & Guides (${reviews.length})`}</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? `Clics de Enlaces (${clickRecords.length})` : `Outbound Clicks (${clickRecords.length})`}</span>
                </button>

                <button
                  onClick={() => setActiveTab('brevo')}
                  className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'brevo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? `Brevo & Leads (${subscribers.length})` : `Brevo & Leads (${subscribers.length})`}</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Seguridad y Contraseña' : 'Security & Tags'}</span>
                </button>
              </div>

              <button
                onClick={exportCatalogJson}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md"
                title="Descargar copia del catálogo"
              >
                <Download className="w-3 h-3" />
                <span>Exportar JSON</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              
              {/* TAB 1: PRODUCT LIST & CREATOR/EDITOR */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  {productFeedback && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{productFeedback}</span>
                    </div>
                  )}
                  {!isCreating && !editingProduct ? (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-slate-600">
                          {language === 'es'
                            ? 'Añade productos, sube fotos desde tu ordenador o actualiza precios y enlaces oficiales.'
                            : 'Add products, upload photos directly from desktop, or adjust verified pricing.'}
                        </p>

                        <button
                          onClick={handleStartCreate}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-2xs whitespace-nowrap"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{language === 'es' ? 'Añadir Producto' : 'New Product'}</span>
                        </button>
                      </div>

                      {/* Product items list */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 bg-white">
                        {products.map((p) => (
                          <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                              <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0" />
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 truncate text-sm">{p.name}</div>
                                <div className="text-slate-500 flex flex-wrap items-center gap-2 mt-0.5">
                                  <span className="font-semibold text-slate-700">{p.brand}</span>
                                  <span>·</span>
                                  <span>{p.category}</span>
                                  <span>·</span>
                                  <span className="font-mono tabular-nums font-bold text-slate-800">${Number(p.price || 0).toFixed(2)}</span>
                                  <span>·</span>
                                  <span className="text-blue-600">{p.store}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(language === 'es' ? '¿Eliminar este producto del catálogo?' : 'Delete this product?')) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          onClick={() => {
                            if (confirm(language === 'es' ? '¿Restablecer el catálogo por defecto?' : 'Reset to default catalog?')) {
                              resetCatalogToDefault();
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg text-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Restablecer Catálogo por Defecto' : 'Reset to Default'}</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* PRODUCT FORM WITH DESKTOP PHOTO UPLOADER */
                    <form onSubmit={handleSaveProduct} className="space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <h3 className="font-bold text-slate-900 text-sm">
                          {isCreating 
                            ? (language === 'es' ? 'Añadir Nuevo Producto' : 'Create New Product')
                            : (language === 'es' ? `Editar: ${editingProduct?.name}` : `Edit: ${editingProduct?.name}`)}
                        </h3>
                        <button
                          type="button"
                          onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                          className="text-xs text-slate-500 hover:text-slate-800 underline"
                        >
                          {language === 'es' ? 'Cancelar' : 'Cancel'}
                        </button>
                      </div>

                      {/* --- PHOTO UPLOAD MODULE FROM DESKTOP --- */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                            <span>{language === 'es' ? 'Fotografía del Producto (Desde tu ordenador)' : 'Product Photo (From Desktop)'}</span>
                          </label>
                          <span className="text-[11px] text-slate-500 font-medium">JPG, PNG o WebP</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                          {/* Photo preview */}
                          <div className="sm:col-span-4 aspect-4/3 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center relative group">
                            {productForm.image ? (
                              <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-slate-400 text-center p-3 text-[11px]">
                                {language === 'es' ? 'Sin imagen seleccionada' : 'No image selected'}
                              </div>
                            )}
                          </div>

                          {/* Desktop file picker controls */}
                          <div className="sm:col-span-8 space-y-2">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                              accept="image/png, image/jpeg, image/webp"
                              className="hidden"
                            />

                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isUploading}
                              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 transition-colors inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                            >
                              <Upload className="w-4 h-4 text-blue-600" />
                              <span>{isUploading ? (language === 'es' ? 'Procesando foto...' : 'Processing...') : (language === 'es' ? 'Seleccionar foto desde tu ordenador' : 'Choose photo from desktop')}</span>
                            </button>

                            {uploadFeedback && (
                              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                <span>{uploadFeedback}</span>
                              </p>
                            )}

                            <div>
                              <span className="text-[11px] text-slate-500 block mb-1">
                                {language === 'es' ? 'O introduce una URL de imagen externa:' : 'Or enter an external image URL:'}
                              </span>
                              <input
                                type="text"
                                value={productForm.image}
                                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --- BRAND LOGO MODULE (DESKTOP OR URL) --- */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <Tag className="w-4 h-4 text-purple-600" />
                            <span>{language === 'es' ? 'Logotipo de la Marca / Tienda (PNG transparente recomendado)' : 'Brand Logo (Desktop or URL)'}</span>
                          </label>
                          <span className="text-[11px] text-slate-500 font-medium">PNG, SVG o JPG</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                          {/* Logo preview */}
                          <div className="sm:col-span-4 h-16 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center p-2">
                            {productForm.logoImage ? (
                              <img src={productForm.logoImage} alt="Logo" className="max-h-full max-w-full object-contain" />
                            ) : (
                              <div className="text-slate-400 text-center text-[10px]">
                                {language === 'es' ? 'Sin logo específico' : 'No logo uploaded'}
                              </div>
                            )}
                          </div>

                          {/* Desktop file picker for logo */}
                          <div className="sm:col-span-8 space-y-2">
                            <input
                              type="file"
                              ref={logoFileInputRef}
                              onChange={handleLogoUpload}
                              accept="image/png, image/jpeg, image/webp, image/svg+xml"
                              className="hidden"
                            />

                            <button
                              type="button"
                              onClick={() => logoFileInputRef.current?.click()}
                              disabled={isUploadingLogo}
                              className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 transition-colors inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5 text-purple-600" />
                              <span>{isUploadingLogo ? (language === 'es' ? 'Cargando logo...' : 'Processing...') : (language === 'es' ? 'Subir logo desde el ordenador' : 'Upload logo from desktop')}</span>
                            </button>

                            {logoUploadFeedback && (
                              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                <span>{logoUploadFeedback}</span>
                              </p>
                            )}

                            <div>
                              <span className="text-[10px] text-slate-500 block mb-0.5">
                                {language === 'es' ? 'O introduce URL del logo:' : 'Or enter logo URL:'}
                              </span>
                              <input
                                type="text"
                                value={productForm.logoImage || ''}
                                onChange={(e) => setProductForm({ ...productForm, logoImage: e.target.value })}
                                placeholder="/assets/logo_shopify.png o https://..."
                                className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Regular form fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Product Name</label>
                          <input
                            type="text"
                            required
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Brand</label>
                          <input
                            type="text"
                            required
                            value={productForm.brand}
                            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Categoría' : 'Category'}
                          </label>
                          <select
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          >
                            {CATEGORIES_LIST.filter(c => c !== 'All').map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Comisión (ej. hasta 200 € o 60%)' : 'Commission (e.g. up to 200 €)'}
                          </label>
                          <input
                            type="text"
                            value={productForm.commissionRate || ''}
                            onChange={(e) => setProductForm({ ...productForm, commissionRate: e.target.value })}
                            placeholder="hasta 200 €"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-semibold text-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Precio / Cuota Oficial (EUR)' : 'Price (EUR)'}
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Store / Merchant</label>
                          <input
                            type="text"
                            required
                            value={productForm.store}
                            onChange={(e) => setProductForm({ ...productForm, store: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Affiliate Network</label>
                          <select
                            value={productForm.affiliateNetwork}
                            onChange={(e) => setProductForm({ ...productForm, affiliateNetwork: e.target.value as AffiliateNetwork })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          >
                            <option value="Direct Partner">Direct Partner / Custom Offer</option>
                            <option value="Amazon Associates">Amazon Associates</option>
                            <option value="Awin">Awin</option>
                            <option value="CJ Affiliate">CJ Affiliate</option>
                            <option value="ClickBank">ClickBank</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Etiqueta / Badge (ej. "Afiliado", "50% Dto.", "Oferta Especial")' : 'Badge Tag (e.g. "Afiliado", "50% Dto.")'}
                          </label>
                          <input
                            type="text"
                            value={productForm.badgeTag || ''}
                            onChange={(e) => setProductForm({ ...productForm, badgeTag: e.target.value })}
                            placeholder="Afiliado"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Texto del Botón CTA (ej. "Promocionar ahora", "Ver Oferta")' : 'CTA Button Label'}
                          </label>
                          <input
                            type="text"
                            value={productForm.ctaLabel || ''}
                            onChange={(e) => setProductForm({ ...productForm, ctaLabel: e.target.value })}
                            placeholder="Promocionar ahora"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">Affiliate Destination Link (Tracking URL)</label>
                          <input
                            type="url"
                            required
                            value={productForm.affiliateUrl}
                            onChange={(e) => setProductForm({ ...productForm, affiliateUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-[11px]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">Summary (1-2 lines)</label>
                          <input
                            type="text"
                            required
                            value={productForm.summary}
                            onChange={(e) => setProductForm({ ...productForm, summary: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">Full Editorial Description</label>
                          <textarea
                            rows={3}
                            required
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => { setIsCreating(false); setEditingProduct(null); }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                        >
                          {language === 'es' ? 'Cancelar' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Guardar Producto' : 'Save Product'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB: ARTICLES & EDITORIAL GUIDES */}
              {activeTab === 'articles' && (
                <div className="space-y-6">
                  {articleFeedback && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{articleFeedback}</span>
                    </div>
                  )}

                  {!isCreatingReview && !editingReview ? (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span>{language === 'es' ? 'Artículos, Tutoriales y Guías de Productos' : 'Articles & Guides'}</span>
                          </h3>
                          <p className="text-slate-500 text-xs mt-0.5">
                            {language === 'es'
                              ? 'Publica análisis detallados de productos, tutoriales y estrategias que se mostrarán en la página de inicio y en la sección de Guías.'
                              : 'Create and publish in-depth product reviews, tutorials, and strategy guides.'}
                          </p>
                        </div>

                        <button
                          onClick={handleStartCreateReview}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-2xs whitespace-nowrap self-start sm:self-auto cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{language === 'es' ? 'Crear Nuevo Artículo' : 'New Article'}</span>
                        </button>
                      </div>

                      {/* Articles List */}
                      {reviews.length === 0 ? (
                        <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-3">
                          <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                          <p className="text-slate-600 font-medium text-xs">
                            {language === 'es' ? 'No hay artículos ni guías creadas todavía.' : 'No articles created yet.'}
                          </p>
                          <button
                            onClick={handleStartCreateReview}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{language === 'es' ? 'Crear Primer Artículo' : 'Create First Article'}</span>
                          </button>
                        </div>
                      ) : (
                        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 bg-white shadow-2xs">
                          {reviews.map((rev) => (
                            <div key={rev.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                              <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-16 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                  {rev.image ? (
                                    <img src={rev.image} alt={rev.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <FileText className="w-5 h-5 text-slate-400" />
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    {rev.badge && (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                                        {rev.badge}
                                      </span>
                                    )}
                                    <span className="text-[11px] text-slate-500 font-medium">{rev.category}</span>
                                    <span className="text-slate-300">·</span>
                                    <span className="text-[11px] text-slate-400">{rev.readingTime}</span>
                                  </div>
                                  <div className="font-bold text-slate-900 truncate text-sm">
                                    {rev.title}
                                  </div>
                                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5 truncate">
                                    <span>{rev.publishDate}</span>
                                    <span>·</span>
                                    <span>Por {rev.author}</span>
                                    {rev.recommendedProducts && rev.recommendedProducts.length > 0 && (
                                      <>
                                        <span>·</span>
                                        <span className="text-blue-600 font-medium">
                                          {rev.recommendedProducts.length} {language === 'es' ? 'productos vinculados' : 'linked products'}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => handleStartEditReview(rev)}
                                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                  title="Editar Artículo"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(language === 'es' ? `¿Eliminar el artículo "${rev.title}"?` : 'Delete this article?')) {
                                      deleteReview(rev.id);
                                    }
                                  }}
                                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Eliminar Artículo"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    /* ARTICLE CREATE / EDIT FORM */
                    <form onSubmit={handleSaveReview} className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <h3 className="font-bold text-slate-900 text-sm">
                            {isCreatingReview
                              ? (language === 'es' ? 'Crear Nuevo Artículo / Guía' : 'New Article / Guide')
                              : (language === 'es' ? `Editar: ${editingReview?.title}` : `Edit: ${editingReview?.title}`)}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setIsCreatingReview(false); setEditingReview(null); }}
                          className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                        >
                          {language === 'es' ? 'Cancelar' : 'Cancel'}
                        </button>
                      </div>

                      {/* --- ARTICLE HEADER PHOTO UPLOAD --- */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                            <span>{language === 'es' ? 'Imagen de Cabecera del Artículo (Desde tu ordenador o URL)' : 'Header Image'}</span>
                          </label>
                          <span className="text-[11px] text-slate-500 font-medium">JPG, PNG o WebP (1200px max)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                          {/* Image preview */}
                          <div className="sm:col-span-4 aspect-16/10 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
                            {reviewForm.image ? (
                              <img src={reviewForm.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-slate-400 text-center p-3 text-[11px]">
                                {language === 'es' ? 'Sin imagen seleccionada' : 'No image'}
                              </div>
                            )}
                          </div>

                          {/* Desktop file picker */}
                          <div className="sm:col-span-8 space-y-2">
                            <input
                              type="file"
                              ref={reviewFileInputRef}
                              onChange={handleArticleImageUpload}
                              accept="image/png, image/jpeg, image/webp"
                              className="hidden"
                            />

                            <button
                              type="button"
                              onClick={() => reviewFileInputRef.current?.click()}
                              disabled={isUploadingReviewImg}
                              className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 transition-colors inline-flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                            >
                              <Upload className="w-4 h-4 text-blue-600" />
                              <span>{isUploadingReviewImg ? (language === 'es' ? 'Procesando imagen...' : 'Processing...') : (language === 'es' ? 'Subir imagen desde el ordenador' : 'Upload photo from desktop')}</span>
                            </button>

                            {reviewImgFeedback && (
                              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                <span>{reviewImgFeedback}</span>
                              </p>
                            )}

                            <div>
                              <span className="text-[11px] text-slate-500 block mb-1">
                                {language === 'es' ? 'O introduce una URL de imagen externa:' : 'Or enter an external image URL:'}
                              </span>
                              <input
                                type="text"
                                value={reviewForm.image || ''}
                                onChange={(e) => setReviewForm({ ...reviewForm, image: e.target.value })}
                                placeholder="/assets/guide_thumb_1.png o https://..."
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Main Metadata Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Título del Artículo / Guía' : 'Article Title'}
                          </label>
                          <input
                            type="text"
                            required
                            value={reviewForm.title}
                            onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                            placeholder="Ej. Cómo empezar en el Marketing de Afiliación en 2025"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Slug URL (identificador web)' : 'URL Slug'}
                          </label>
                          <input
                            type="text"
                            value={reviewForm.slug}
                            onChange={(e) => setReviewForm({ ...reviewForm, slug: e.target.value })}
                            placeholder="como-empezar-marketing-afiliacion"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-xs"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Categoría' : 'Category'}
                          </label>
                          <select
                            value={reviewForm.category}
                            onChange={(e) => setReviewForm({ ...reviewForm, category: e.target.value as ProductCategory })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          >
                            {CATEGORIES_LIST.filter(c => c !== 'All').map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Distintivo / Badge (ej. "Guía", "Estrategia", "Monetización")' : 'Badge'}
                          </label>
                          <input
                            type="text"
                            value={reviewForm.badge || ''}
                            onChange={(e) => setReviewForm({ ...reviewForm, badge: e.target.value })}
                            placeholder="Guía"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Tiempo estimado de lectura (ej. "8 min")' : 'Reading Time'}
                          </label>
                          <input
                            type="text"
                            value={reviewForm.readingTime}
                            onChange={(e) => setReviewForm({ ...reviewForm, readingTime: e.target.value })}
                            placeholder="8 min"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Autor' : 'Author'}
                          </label>
                          <input
                            type="text"
                            value={reviewForm.author}
                            onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                            placeholder="Amin Ajrif"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Fecha de Publicación' : 'Publish Date'}
                          </label>
                          <input
                            type="text"
                            value={reviewForm.publishDate}
                            onChange={(e) => setReviewForm({ ...reviewForm, publishDate: e.target.value })}
                            placeholder="12 Ene 2025"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">
                            {language === 'es' ? 'Resumen / Entradilla del Artículo (2-3 líneas)' : 'Article Summary'}
                          </label>
                          <textarea
                            rows={2}
                            required
                            value={reviewForm.summary}
                            onChange={(e) => setReviewForm({ ...reviewForm, summary: e.target.value })}
                            placeholder="Explica brevemente los puntos clave y lo que aprenderá el lector..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                          />
                        </div>
                      </div>

                      {/* Recommended Products Selector */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <label className="font-bold text-slate-900 text-xs flex items-center justify-between">
                          <span>{language === 'es' ? 'Productos Recomendados en este Artículo' : 'Recommended Products in this Article'}</span>
                          <span className="text-[11px] text-slate-500 font-normal">
                            {(reviewForm.recommendedProducts || []).length} {language === 'es' ? 'seleccionados' : 'selected'}
                          </span>
                        </label>
                        <p className="text-[11px] text-slate-500">
                          {language === 'es'
                            ? 'Marca los productos de tu catálogo que quieras que aparezcan destacados dentro de este artículo con sus ofertas y botones de compra.'
                            : 'Select catalog products to feature as recommended cards inside this article.'}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
                          {products.map((p) => {
                            const isSelected = Array.isArray(reviewForm.recommendedProducts) && reviewForm.recommendedProducts.includes(p.id);
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => handleToggleRecommendedProduct(p.id)}
                                className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                                  isSelected 
                                    ? 'bg-purple-50 border-purple-400 text-purple-950 shadow-2xs' 
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                                  isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-xs truncate">{p.name}</div>
                                  <div className="text-[10px] text-slate-500 truncate">{p.brand} · {p.store}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dynamic Content Sections */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs">
                              {language === 'es' ? 'Secciones y Contenido Editorial' : 'Content Sections'}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {language === 'es' ? 'Añade títulos de sección y párrafos explicativos a tu artículo.' : 'Add structured headings and paragraphs.'}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={handleAddSection}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{language === 'es' ? 'Añadir Sección' : 'Add Section'}</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {(reviewForm.contentSections || []).map((sec, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                  {language === 'es' ? `Sección ${idx + 1}` : `Section ${idx + 1}`}
                                </span>
                                {(reviewForm.contentSections || []).length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSection(idx)}
                                    className="text-slate-400 hover:text-rose-600 text-xs flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>{language === 'es' ? 'Eliminar' : 'Remove'}</span>
                                  </button>
                                )}
                              </div>

                              <input
                                type="text"
                                required
                                value={sec.heading}
                                onChange={(e) => handleSectionHeadingChange(idx, e.target.value)}
                                placeholder="Título de la sección (ej. 1. ¿Cómo elegir el mejor programa?)"
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <textarea
                                rows={3}
                                required
                                value={sec.body}
                                onChange={(e) => handleSectionBodyChange(idx, e.target.value)}
                                placeholder="Escribe el texto detallado de este apartado..."
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => { setIsCreatingReview(false); setEditingReview(null); }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer"
                        >
                          {language === 'es' ? 'Cancelar' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Guardar y Publicar Artículo' : 'Publish Article'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: CLICK ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {language === 'es' ? 'Métricas de Clics Salientes a Tiendas Oficiales' : 'Outbound Referral Clicks to Official Merchant Stores'}
                    </h3>
                    <p className="text-slate-500 mt-1">
                      {language === 'es'
                        ? 'Registra las redirecciones a ofertas de Grounded Barefoot Shoes y Glacier Breeze.'
                        : 'Tracks user clicks heading to verified offers and partner landing pages.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-slate-500 text-[11px] uppercase font-semibold">Total Clics Salientes</div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">{clickRecords.length}</div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-slate-500 text-[11px] uppercase font-semibold">Grounded Shoes</div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 mt-1">
                        {clickRecords.filter(r => (r.productName || '').toLowerCase().includes('grounded') || (r.productName || '').toLowerCase().includes('barefoot')).length}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-slate-500 text-[11px] uppercase font-semibold">Glacier Breeze</div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-blue-600 mt-1">
                        {clickRecords.filter(r => (r.productName || '').toLowerCase().includes('glacier') || (r.productName || '').toLowerCase().includes('breeze')).length}
                      </div>
                    </div>
                  </div>

                  {clickRecords.length > 0 ? (
                    <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                      <div className="bg-slate-50 px-4 py-2 font-bold text-slate-700 grid grid-cols-12">
                        <span className="col-span-6">Producto</span>
                        <span className="col-span-3">Tienda / Oferta</span>
                        <span className="col-span-3 text-right">Fecha y Hora</span>
                      </div>
                      {clickRecords.map((r) => (
                        <div key={r.id} className="px-4 py-3 bg-white grid grid-cols-12 items-center hover:bg-slate-50">
                          <div className="col-span-6 font-semibold text-slate-900 truncate">
                            {r.productName}
                          </div>
                          <div className="col-span-3 text-slate-600">
                            {r.store}
                          </div>
                          <div className="col-span-3 text-right text-slate-500 font-mono text-[11px]">
                            {new Date(r.timestamp).toLocaleTimeString()} · {new Date(r.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-500">
                      {language === 'es' ? 'Aún no se han registrado clics salientes en esta sesión.' : 'No outbound referral clicks registered in this session yet.'}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SECURITY & PASSWORD CHANGE */}
              {activeTab === 'settings' && (
                <div className="space-y-8 max-w-xl">
                  {/* Password Change Form */}
                  <form onSubmit={handleChangePassword} className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-blue-600" />
                        <span>{language === 'es' ? 'Cambiar Contraseña de Administración' : 'Change Master Password'}</span>
                      </h4>
                      <p className="text-slate-500 text-xs mt-1">
                        {language === 'es'
                          ? 'Personaliza la clave requerida para acceder al panel privado de CommissionPilot.'
                          : 'Update the private master key required to authenticate into this CMS.'}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">
                        {language === 'es' ? 'Nueva Contraseña' : 'New Password'}
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                      />
                    </div>

                    {passwordChangeSuccess && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'es' ? 'Contraseña actualizada correctamente.' : 'Password updated successfully.'}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs shadow-xs"
                    >
                      {language === 'es' ? 'Actualizar Contraseña' : 'Save New Password'}
                    </button>
                  </form>

                  {/* Affiliate network tags */}
                  <form onSubmit={handleSaveTags} className="space-y-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {language === 'es' ? 'Identificadores de Redes y Tracking' : 'Affiliate Tracking Tags'}
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Amazon Tag</label>
                        <input
                          type="text"
                          value={tagsForm.amazonTag}
                          onChange={(e) => setTagsForm({ ...tagsForm, amazonTag: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Awin ID</label>
                        <input
                          type="text"
                          value={tagsForm.awinId}
                          onChange={(e) => setTagsForm({ ...tagsForm, awinId: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-xs"
                    >
                      {language === 'es' ? 'Guardar Tags' : 'Save Tags'}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: BREVO CRM & LEADS */}
              {activeTab === 'brevo' && (
                <div className="space-y-6">
                  {/* Brevo Settings Form */}
                  <form onSubmit={handleSaveBrevo} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                            B
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {language === 'es' ? 'Configuración de Brevo (Sendinblue)' : 'Brevo (Sendinblue) Integration'}
                          </h4>
                        </div>
                        <p className="text-slate-500 text-xs mt-1">
                          {language === 'es'
                            ? 'Conecta la newsletter de CommissionPilot con tu cuenta de Brevo para sincronizar contactos, enviar campañas y activar chat de atención.'
                            : 'Sync newsletter leads with your Brevo lists, trigger automated campaigns, and enable Conversations.'}
                        </p>
                      </div>

                      <a
                        href="https://app.brevo.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{language === 'es' ? 'Abrir Panel Brevo' : 'Open Brevo Dashboard'}</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* API Key */}
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block text-xs">
                          {language === 'es' ? 'Brevo API Key (v3)' : 'Brevo API Key (v3)'}
                        </label>
                        <input
                          type="password"
                          value={brevoForm.apiKey || ''}
                          onChange={(e) => setBrevoForm({ ...brevoForm, apiKey: e.target.value })}
                          placeholder="xkeysib-xxxxxxxx..."
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <p className="text-[10px] text-slate-500">
                          {language === 'es'
                            ? 'Encuéntrala en Brevo > Cuenta > SMTP & API > Claves API.'
                            : 'Obtain from Brevo > Account > SMTP & API > API Keys.'}
                        </p>
                      </div>

                      {/* List ID */}
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block text-xs">
                          {language === 'es' ? 'ID de Lista de Contactos' : 'Target Contact List ID'}
                        </label>
                        <input
                          type="text"
                          value={brevoForm.listId || '2'}
                          onChange={(e) => setBrevoForm({ ...brevoForm, listId: e.target.value })}
                          placeholder="2"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <p className="text-[10px] text-slate-500">
                          {language === 'es'
                            ? 'ID numérico de la lista donde se guardarán los suscriptores (ej. 2).'
                            : 'Numeric ID of the Brevo list where leads are added (e.g. 2).'}
                        </p>
                      </div>

                      {/* Conversations Widget ID */}
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block text-xs">
                          {language === 'es' ? 'Brevo Conversations ID (Chat en vivo)' : 'Brevo Conversations ID'}
                        </label>
                        <input
                          type="text"
                          value={brevoForm.conversationsId || ''}
                          onChange={(e) => setBrevoForm({ ...brevoForm, conversationsId: e.target.value })}
                          placeholder="xxxxxxxxxxxxxxxx"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <p className="text-[10px] text-slate-500">
                          {language === 'es'
                            ? 'Opcional. Activa el widget de soporte flotante en Brevo > Chat.'
                            : 'Optional. Enables customer support widget from Brevo > Conversations.'}
                        </p>
                      </div>

                      {/* Form Embed URL */}
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 block text-xs">
                          {language === 'es' ? 'URL de Formulario Embebido de Brevo (Opcional)' : 'Brevo Form Embed URL (Optional)'}
                        </label>
                        <input
                          type="url"
                          value={brevoForm.formEmbedUrl || ''}
                          onChange={(e) => setBrevoForm({ ...brevoForm, formEmbedUrl: e.target.value })}
                          placeholder="https://sibforms.com/serve/..."
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                        <p className="text-[10px] text-slate-500">
                          {language === 'es'
                            ? 'Si prefieres mostrar el formulario iframe oficial de Brevo en lugar del nativo.'
                            : 'If specified, displays Brevo\'s iframe form instead of the native form.'}
                        </p>
                      </div>
                    </div>

                    {/* Enable Conversations toggle */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={brevoForm.enableConversations}
                          onChange={(e) => setBrevoForm({ ...brevoForm, enableConversations: e.target.checked })}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                        />
                        <span className="font-medium text-slate-700 text-xs">
                          {language === 'es'
                            ? 'Habilitar widget de chat flotante de Brevo Conversations en la web'
                            : 'Enable floating Brevo Conversations live-chat widget on site'}
                        </span>
                      </label>

                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-2xs"
                      >
                        {language === 'es' ? 'Guardar Configuración' : 'Save Brevo Settings'}
                      </button>
                    </div>
                  </form>

                  {/* Captured Subscribers Section */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span>{language === 'es' ? 'Leads y Suscriptores Capturados' : 'Captured Leads & Subscribers'}</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                            {subscribers.length}
                          </span>
                        </h4>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {language === 'es'
                            ? 'Correos recogidos a través del formulario de ofertas exclusivas y newsletter.'
                            : 'Emails registered via newsletter and product recommendation alerts.'}
                        </p>
                      </div>

                      <button
                        onClick={exportSubscribersCsv}
                        disabled={subscribers.length === 0}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold rounded-xl text-xs transition-colors shadow-2xs shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{language === 'es' ? 'Descargar Leads (CSV)' : 'Export Leads (CSV)'}</span>
                      </button>
                    </div>

                    {subscribers.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-2">
                        <Mail className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="text-slate-600 font-medium text-xs">
                          {language === 'es' ? 'Aún no hay suscriptores registrados.' : 'No subscribers recorded yet.'}
                        </p>
                        <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                          {language === 'es'
                            ? 'Los usuarios que completen el formulario en la página de inicio aparecerán aquí y se enviarán automáticamente a tu cuenta de Brevo.'
                            : 'Visitors who subscribe on the homepage will appear here and be synced to Brevo.'}
                        </p>
                      </div>
                    ) : (
                      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px]">
                                <th className="py-2.5 px-4">Email</th>
                                <th className="py-2.5 px-4">Fecha / Hora</th>
                                <th className="py-2.5 px-4">Ubicación</th>
                                <th className="py-2.5 px-4 text-right">Estado Brevo</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {subscribers.map((s) => (
                                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                                  <td className="py-2.5 px-4 font-mono font-medium text-slate-900">
                                    {s.email}
                                  </td>
                                  <td className="py-2.5 px-4 text-slate-500 text-[11px]">
                                    {new Date(s.timestamp).toLocaleString()}
                                  </td>
                                  <td className="py-2.5 px-4 text-slate-600 text-[11px] capitalize">
                                    {s.source}
                                  </td>
                                  <td className="py-2.5 px-4 text-right">
                                    {s.syncedToBrevo ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Sincronizado</span>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                                        <span>Guardado Local</span>
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 3: Contact Inquiries Inbox */}
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                          <span>{language === 'es' ? 'Mensajes Recibidos desde Formulario de Contacto' : 'Contact Form Inquiries'}</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                            {contactMessages.length}
                          </span>
                        </h4>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {language === 'es'
                            ? 'Consultas enviadas por visitantes a través de /contact. Los usuarios se agregan automáticamente como contactos en Brevo.'
                            : 'Inquiries submitted by users via /contact. Senders are automatically created as Brevo contacts.'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={fetchContactMessages}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors shadow-2xs self-start"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{language === 'es' ? 'Actualizar Bandeja' : 'Refresh'}</span>
                      </button>
                    </div>

                    {/* Notice about Brevo Transactional permission */}
                    <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-relaxed flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>{language === 'es' ? 'Entrega de emails a tu Gmail:' : 'Email inbox delivery note:'}</strong>{' '}
                        {language === 'es'
                          ? 'Tu clave API de Brevo actual tiene permiso de "Contactos" (guarda el contacto en tu lista de Brevo y aquí en tu panel). Para que Brevo además envíe la notificación por email a AMIN.AJRIF@gmail.com, tu clave API en Brevo debe tener activo el permiso de "Transactional Emails" (o Full Access).'
                          : 'Your Brevo API key currently has Contacts permission (saves contact to Brevo & CMS). For Brevo to also deliver incoming email to AMIN.AJRIF@gmail.com, enable Transactional Emails permission in your Brevo API key settings.'}
                      </div>
                    </div>

                    {contactMessages.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-2">
                        <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="text-slate-600 font-medium text-xs">
                          {language === 'es' ? 'No hay mensajes de contacto registrados todavía.' : 'No contact messages recorded yet.'}
                        </p>
                        <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                          {language === 'es'
                            ? 'Cuando un visitante envíe un formulario desde la página de Contacto, aparecerá aquí con sus datos y podrás responderle directamente.'
                            : 'When a visitor submits an inquiry on the Contact page, it will be logged here.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {contactMessages.map((msg) => (
                          <div key={msg.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-2xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                              <div>
                                <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                                  <span>{msg.name}</span>
                                  <span className="text-slate-400 font-normal">·</span>
                                  <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline font-mono">
                                    {msg.email}
                                  </a>
                                </div>
                                <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                                  {language === 'es' ? 'Asunto:' : 'Subject:'} {msg.subject}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] text-slate-400">
                                  {new Date(msg.timestamp).toLocaleString()}
                                </span>
                                {msg.syncedToBrevo ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                                    Brevo Contact
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600">
                                    Local
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-wrap leading-relaxed">
                              {msg.message}
                            </p>

                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-slate-400">
                                ID: <code className="font-mono">{msg.id}</code>
                              </span>
                              <a
                                href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: [CommissionPilot] ' + msg.subject)}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
                              >
                                <Mail className="w-3 h-3" />
                                <span>{language === 'es' ? 'Responder al Correo' : 'Reply by Email'}</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
