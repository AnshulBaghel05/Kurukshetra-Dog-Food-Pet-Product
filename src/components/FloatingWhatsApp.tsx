import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  currentTab: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentTab }) => {
  const getContextMessage = () => {
    switch (currentTab) {
      case 'products':
        return `Namaste HR Pets Store! I am browsing your pet food and products catalog for Thanesar. Can you assist me with prices and same-day delivery?`;
      case 'categories':
        return `Namaste HR Pets Store! I am looking for food and supplies for my pet in Kurukshetra. Could you share what options you currently have in stock?`;
      case 'about':
        return `Namaste! I read about your pet store in Kurukshetra. I would like to visit or order authentic pet food.`;
      case 'guides':
        return `Namaste! I was reading your pet nutrition guides and had a question regarding dietary requirements in Haryana.`;
      case 'contact':
        return `Namaste! I am reaching out to visit your Thanesar store or order pet supplies for local delivery.`;
      default:
        return `Namaste HR Pets Store! I am on your website and would like to enquire about pet food and supplies in Thanesar, Kurukshetra.`;
    }
  };

  const whatsappUrl = buildWhatsAppUrl(getContextMessage());

  return (
    <aside
      aria-label="Floating WhatsApp contact"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-30"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />

        {/* Hover pill tooltip on desktop */}
        <span className="hidden md:group-hover:inline-block absolute right-16 bg-[#14181A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
