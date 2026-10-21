import React from 'react';
import { Instagram, Youtube, Phone, MessageCircle, MapPin, Heart } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { lang, t } = useLanguage();

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14181A] text-[#F6EFE4] pt-12 pb-24 md:pb-12 border-t border-[#F6EFE4]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B5533C]" />
              <span className="font-heading text-lg font-bold tracking-tight">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="text-xs text-[#A2ADB3] leading-relaxed">
              {t.footer.aboutText}
            </p>
            <div className="pt-2 text-xs text-[#A2ADB3] space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B5533C] shrink-0 mt-0.5" />
                <span>{lang === 'hi' ? siteConfig.addressHindi : siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1F3A2E] shrink-0" />
                <a href={`tel:${siteConfig.phoneClean}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs text-[#A2ADB3]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('categories')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.categories}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('guides')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.guides}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Community */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Community & Social
            </h3>
            <p className="text-xs text-[#A2ADB3]">
              Follow our daily product unboxings, fresh stock arrivals, and pet care tips.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-lg bg-[#252D30] hover:bg-[#B5533C] text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="w-10 h-10 rounded-lg bg-[#252D30] hover:bg-[#B5533C] text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumberClean}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-lg bg-[#252D30] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <span className="text-[11px] text-[#A2ADB3] block pt-1">
              Instagram: {siteConfig.instagramHandle} (HR Pets)
            </span>
          </div>

          {/* Local Thanesar SEO & Hours */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Store Timings
            </h3>
            <div className="text-xs text-[#A2ADB3] space-y-1">
              <p className="text-white font-semibold">Everyday (Mon – Sun):</p>
              <p>09:30 AM – 08:30 PM (IST)</p>
              <p className="pt-2 text-[11px] text-amber-300">
                ★ Same-day local delivery in Thanesar & Kurukshetra
              </p>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Performance budget note */}
        <div className="pt-8 border-t border-[#F6EFE4]/10 text-center space-y-2 text-[11px] text-[#A2ADB3]">
          <p>{t.footer.legalNotice}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
            <span>© {new Date().getFullYear()} {siteConfig.brandName}. {t.footer.allRights}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3 h-3 text-[#B5533C] fill-current" />
              <span>for Haryana Pet Parents</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
