import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeSections } from './components/HomeSections';
import { CategoriesView } from './components/CategoriesView';
import { ComparisonView } from './components/ComparisonView';
import { ReviewsView } from './components/ReviewsView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AffiliateDisclosureView } from './components/AffiliateDisclosureView';
import { LegalView } from './components/LegalView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AffiliateRedirectModal } from './components/AffiliateRedirectModal';
import { AdminModal } from './components/AdminModal';
import { CookieBanner } from './components/CookieBanner';
import { NewsletterPopup } from './components/NewsletterPopup';
import { Footer } from './components/Footer';
import { GlacierBreezeOfferPage } from './components/GlacierBreezeOfferPage';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const { currentPage, setCurrentPage, setIsAdminOpen } = useApp();

  // Dedicated Private Admin Portal (/admin)
  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-center">
        <ErrorBoundary 
          fallbackTitle="Error en el Panel de Gestión CMS" 
          onReset={() => {
            setIsAdminOpen(false);
            setCurrentPage('home');
            if (typeof window !== 'undefined') {
              window.history.pushState(null, '', '/');
            }
          }}
        >
          <AdminModal isPageMode={true} />
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-purple-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        <ErrorBoundary fallbackTitle="Error al cargar la sección principal">
          {currentPage === 'home' && (
            <>
              <Hero />
              <HomeSections />
            </>
          )}

          {currentPage === 'categories' && <CategoriesView />}

          {currentPage === 'comparisons' && <ComparisonView />}

          {currentPage === 'reviews' && <ReviewsView />}

          {currentPage === 'about' && <AboutView />}

          {currentPage === 'contact' && <ContactView />}

          {currentPage === 'affiliate-disclosure' && <AffiliateDisclosureView />}

          {currentPage === 'legal' && <LegalView />}

          {currentPage === 'glacier-breeze' && <GlacierBreezeOfferPage />}
        </ErrorBoundary>
      </main>

      {/* Global Modals & Overlays */}
      <ProductDetailModal />
      <AffiliateRedirectModal />
      <CookieBanner />
      <NewsletterPopup />

      {/* Footer (omitted if page has custom themed footer) */}
      {currentPage !== 'glacier-breeze' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
