export type ProductCategory = 
  | 'Software & SaaS'
  | 'E-commerce'
  | 'Formación Online'
  | 'Hosting & Dominios'
  | 'Marketing'
  | 'Health & Wellness'
  | 'Home & Lifestyle'
  | 'Technology & Electronics'
  | 'Business & Productivity'
  | 'Online Services'
  | string;

export type AffiliateNetwork = 'Amazon Associates' | 'Awin' | 'CJ Affiliate' | 'ClickBank' | 'Direct Partner';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  brand: string;
  price: number;
  currency: string;
  priceVerifiedDate?: string;
  store: string;
  affiliateNetwork: AffiliateNetwork;
  affiliateUrl: string;
  image: string;
  logoImage?: string;
  summary: string;
  description: string;
  commissionRate?: string;
  badgeTag?: string;
  ctaLabel?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  specs?: Record<string, string>;
  buyersGuideNote?: string;
  isFeatured?: boolean;
  isRecommended?: boolean;
  isEditorChoice?: boolean;
  ratingScore?: number;
  comparisonHighlights?: string;
}

export interface ReviewArticle {
  id: string;
  title: string;
  slug: string;
  publishDate: string;
  category: ProductCategory;
  readingTime: string;
  summary: string;
  author: string;
  image?: string;
  badge?: string;
  recommendedProducts: string[]; // product IDs
  contentSections: {
    heading: string;
    body: string;
  }[];
}

export interface ClickRecord {
  id: string;
  productId: string;
  productName: string;
  store: string;
  network: AffiliateNetwork;
  timestamp: string;
  targetUrl: string;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  affiliateTracking: boolean;
  hasConsented: boolean;
  consentDate?: string;
}

export interface BrevoConfig {
  clientKey: string;
  apiKey: string;
  listId: string;
  formEmbedUrl: string;
  enableConversations: boolean;
  conversationsId: string;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  timestamp: string;
  source: string;
  syncedToBrevo?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  syncedToBrevo?: boolean;
  emailSent?: boolean;
}

