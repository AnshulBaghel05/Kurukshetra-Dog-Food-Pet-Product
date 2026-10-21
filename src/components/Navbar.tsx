import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { lang, t, toggleLang } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'products', label: t.nav.products },
    { id: 'categories', label: t.nav.categories },
    { id: 'about', label: t.nav.about },
    { id: 'guides', label: t.nav.guides },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#F6EFE4]/95 dark:bg-[#14181A]/95 backdrop-blur-md shadow-xs py-2.5 border-[#14181A]/10 dark:border-[#F6EFE4]/10'
          : 'bg-[#F6EFE4] dark:bg-[#14181A] py-3.5 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B5533C] rounded-sm shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B5533C]" aria-hidden="true" />
            <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#14181A] dark:text-[#F6EFE4] group-hover:text-[#B5533C] transition-colors whitespace-nowrap">
              {siteConfig.logoText}
            </span>
          </div>
          <span className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3] tracking-wide block truncate max-w-[190px] sm:max-w-xs">
            Thanesar, Kurukshetra
          </span>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap py-1 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B5533C] rounded-sm ${
                  isActive
                    ? 'text-[#B5533C] font-semibold border-b-2 border-[#B5533C]'
                    : 'text-[#14181A]/80 dark:text-[#F6EFE4]/80 hover:text-[#B5533C]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Language toggle, Cart Drawer Trigger, Call/WhatsApp) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            aria-label="Switch Language (English / Hindi)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-[#14181A]/15 dark:border-[#F6EFE4]/20 hover:border-[#B5533C] hover:text-[#B5533C] transition-colors cursor-pointer min-h-[44px]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase">{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Enquiry Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View Enquiry Cart"
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#1F3A2E] text-white hover:bg-[#15271F] transition-colors cursor-pointer min-h-[44px] min-w-[44px] justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.enquiryCart}</span>
            {totalItems > 0 && (
              <span className="bg-[#E8A33D] text-[#14181A] font-bold text-xs px-1.5 py-0.2 rounded-full tabular-nums">
                {totalItems}
              </span>
            )}
          </button>

          {/* Quick Call Button (Desktop) */}
          <a
            href={`tel:${siteConfig.phoneClean}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg border border-[#B5533C] text-[#B5533C] hover:bg-[#B5533C] hover:text-white transition-colors min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="lg:hidden p-2 text-[#14181A] dark:text-[#F6EFE4] hover:text-[#B5533C] rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-[#F6EFE4] dark:bg-[#14181A] px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-3 rounded-md text-base font-medium min-h-[44px] flex items-center cursor-pointer ${
                  currentTab === item.id
                    ? 'bg-[#B5533C]/10 text-[#B5533C] font-bold'
                    : 'text-[#14181A] dark:text-[#F6EFE4] hover:bg-black/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10 grid grid-cols-2 gap-2">
            <a
              href={`tel:${siteConfig.phoneClean}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-[#14181A]/20 dark:border-[#F6EFE4]/20 text-sm font-medium min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#B5533C]" />
              <span>{t.contact.callUs}</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumberClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#1F3A2E] text-white text-sm font-medium min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 text-[#E8A33D]" />
              <span>{t.contact.whatsappUs}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
