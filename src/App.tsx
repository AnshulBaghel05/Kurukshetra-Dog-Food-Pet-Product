import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { MobileActionBar } from './components/MobileActionBar';
import { EnquiryDrawer } from './components/EnquiryDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { PuppiesView } from './views/PuppiesView';
import { AboutView } from './views/AboutView';
import { GuidesView } from './views/GuidesView';
import { ContactView } from './views/ContactView';
import { siteConfig } from './config/site';

function MainApp() {
  const { lang } = useLanguage();

  // Read initial route from URL hash or path
  const getInitialTab = (): string => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (['products', 'puppies', 'about', 'guides', 'contact'].includes(hash)) {
        return hash;
      }
      const path = window.location.pathname.replace('/', '');
      if (['products', 'puppies', 'about', 'guides', 'contact'].includes(path)) {
        return path;
      }
    } catch {
      // Fallback
    }
    return 'home';
  };

  const [currentTab, setCurrentTab] = useState<string>(getInitialTab);

  // Sync tab with URL hash so back/forward works
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (['products', 'puppies', 'about', 'guides', 'contact', 'home'].includes(hash)) {
        setCurrentTab(hash);
      } else {
        setCurrentTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    try {
      if (tab === 'home') {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.history.pushState(null, '', `#${tab}`);
      }
    } catch {
      // Fallback
    }
  };

  // Dynamic Title for SEO
  useEffect(() => {
    const titles: Record<string, string> = {
      home: `${siteConfig.brandName} | Healthy Puppies & Pet Supplies in Thanesar`,
      products: `Dog Food & Pet Products Price Catalog | ${siteConfig.brandName} Thanesar`,
      puppies: `Available Puppies (German Shepherd, Labrador) | ${siteConfig.brandName} Kurukshetra`,
      about: `About Our Ethical Kennel & Story | ${siteConfig.brandShortName} Kurukshetra`,
      guides: `Pet Nutrition & Summer Care Guides | ${siteConfig.brandName} Haryana`,
      contact: `Visit Our Store in Thanesar, Kurukshetra | Location & Hours`,
    };
    document.title = titles[currentTab] || titles.home;
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6EFE4] dark:bg-[#14181A] text-[#14181A] dark:text-[#F6EFE4] selection:bg-[#B5533C]/20">
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} setCurrentTab={handleTabChange} />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && <HomeView onNavigateTab={handleTabChange} />}
        {currentTab === 'products' && <ProductsView />}
        {currentTab === 'puppies' && <PuppiesView onNavigateProducts={() => handleTabChange('products')} />}
        {currentTab === 'about' && <AboutView />}
        {currentTab === 'guides' && <GuidesView />}
        {currentTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={handleTabChange} />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp currentTab={currentTab} />

      {/* Mobile Sticky Bottom Action Bar */}
      <MobileActionBar />

      {/* Enquiry Cart Drawer */}
      <EnquiryDrawer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </LanguageProvider>
  );
}
