import React from 'react';
import { PackageCheck, MessageCircle, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const StarterBundle: React.FC = () => {
  const { t } = useLanguage();

  const bundleWhatsAppUrl = buildWhatsAppUrl(
    "Namaste Kurukshetra Pet Store! I am interested in ordering the *New Pet Parent Starter Essentials Kit*. My pet is a [Species / Breed / Age]. Could you please share the tailored price and items available for delivery?"
  );

  return (
    <section className="py-10 sm:py-14 bg-[#F6EFE4] dark:bg-[#1D2326] border-y border-[#14181A]/10 dark:border-[#F6EFE4]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#14181A] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B5533C]">
                <PackageCheck className="w-4 h-4" />
                <span>{t.bundle.badge}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.bundle.title}
              </h2>

              <p className="text-sm sm:text-base text-[#5E696E] dark:text-[#A2ADB3]">
                {t.bundle.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {t.bundle.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1F3A2E]/10 dark:bg-emerald-950 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#1F3A2E] dark:text-emerald-400" />
                    </span>
                    <span className="text-xs sm:text-sm text-[#14181A] dark:text-[#F6EFE4] leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs italic text-[#5E696E] dark:text-[#A2ADB3] pt-2">
                {t.bundle.note}
              </p>

              <div className="pt-2">
                <a
                  href={bundleWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-sm shadow-xs transition-colors min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#E8A33D]" />
                  <span>{t.bundle.cta}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-lg">
                <img
                  src="/images/products/dog_orthopedic_bed.jpg"
                  alt="Pet starter care essentials bundle"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
