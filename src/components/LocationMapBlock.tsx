import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, CheckCircle, AlertTriangle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { getStoreStatus } from '../utils/hours';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const LocationMapBlock: React.FC = () => {
  const { lang, t } = useLanguage();
  const status = getStoreStatus(siteConfig.hours);

  const whatsappVisitUrl = buildWhatsAppUrl(
    "Namaste HR Pets! I am planning to visit your Thanesar store / Kurukshetra kennel today. Could you please confirm the current location directions?"
  );

  return (
    <section className="py-12 sm:py-16 bg-[#F6EFE4] dark:bg-[#1D2326] border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
            Find Us in Kurukshetra
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
            {t.contact.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] mt-2">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Card */}
          <div className="lg:col-span-5 bg-white dark:bg-[#14181A] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm space-y-6">
            
            {/* Live Open / Closed indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-[#14181A]/10 dark:border-[#F6EFE4]/10">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#B5533C]" />
                <span className="text-sm font-bold text-[#14181A] dark:text-[#F6EFE4]">
                  {t.contact.hoursLabel}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {status.isOpen ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{status.statusText}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{status.statusText}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Timings summary */}
            <div className="text-xs text-[#5E696E] dark:text-[#A2ADB3] space-y-1">
              <p className="font-semibold text-[#14181A] dark:text-[#F6EFE4]">
                Monday – Sunday: 09:30 AM – 08:30 PM (IST)
              </p>
              <p>{status.nextTimeText}</p>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F3A2E] dark:text-emerald-400">
                <MapPin className="w-4 h-4" />
                <span>{t.contact.addressLabel}</span>
              </div>
              <p className="text-sm text-[#14181A] dark:text-[#F6EFE4] leading-relaxed">
                {lang === 'hi' ? siteConfig.addressHindi : siteConfig.address}
              </p>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] text-xs font-semibold min-h-[44px] transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#E8A33D]" />
                <span>{t.contact.getDirections}</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneClean}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#B5533C] text-[#B5533C] hover:bg-[#B5533C] hover:text-white text-xs font-semibold min-h-[44px] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{t.contact.callUs}</span>
              </a>
            </div>

            <a
              href={whatsappVisitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white dark:bg-[#1D2326] border border-[#14181A]/15 dark:border-[#F6EFE4]/15 hover:border-[#25D366] text-xs font-semibold min-h-[44px] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Message Ahead on WhatsApp</span>
            </a>

          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-7 bg-white dark:bg-[#14181A] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm h-[380px] sm:h-[420px] relative">
            <iframe
              title="Kurukshetra Dog Food & Pet Store Map"
              src={siteConfig.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            
            {/* Overlay badge with deep link */}
            <div className="absolute top-4 left-4 bg-white/95 dark:bg-[#14181A]/95 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-[#14181A]/10 dark:border-[#F6EFE4]/10 text-xs shadow-xs">
              <span className="font-bold text-[#14181A] dark:text-[#F6EFE4]">
                Thanesar, Kurukshetra
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
