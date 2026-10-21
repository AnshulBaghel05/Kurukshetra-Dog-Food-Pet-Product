import React from 'react';
import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const MobileActionBar: React.FC = () => {
  const { t } = useLanguage();

  const whatsappLink = buildWhatsAppUrl(
    "Namaste HR Pets! I am visiting your website and would like to enquire about pet food and supplies in Thanesar."
  );

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#F6EFE4]/95 dark:bg-[#14181A]/95 backdrop-blur-md border-t border-[#14181A]/10 dark:border-[#F6EFE4]/15 px-3 py-2"
      style={{ height: '58px' }}
    >
      <div className="grid grid-cols-3 gap-2 h-full items-center">
        {/* Call Button */}
        <a
          href={`tel:${siteConfig.phoneClean}`}
          className="flex items-center justify-center gap-1.5 bg-white dark:bg-[#1D2326] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 text-[#14181A] dark:text-[#F6EFE4] rounded-lg h-11 active:scale-95 transition-transform text-xs font-semibold"
        >
          <Phone className="w-4 h-4 text-[#B5533C]" />
          <span>{t.contact.callUs}</span>
        </a>

        {/* WhatsApp Button (High Intent Accent) */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-[#1F3A2E] text-white rounded-lg h-11 active:scale-95 transition-transform text-xs font-semibold shadow-xs"
        >
          <MessageCircle className="w-4 h-4 text-[#E8A33D]" />
          <span>{t.contact.whatsappUs}</span>
        </a>

        {/* Directions Button */}
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-white dark:bg-[#1D2326] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 text-[#14181A] dark:text-[#F6EFE4] rounded-lg h-11 active:scale-95 transition-transform text-xs font-semibold"
        >
          <Navigation className="w-4 h-4 text-[#B5533C]" />
          <span>Maps</span>
        </a>
      </div>
    </aside>
  );
};
