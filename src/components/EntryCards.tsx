import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EntryCardsProps {
  onSelectDog: () => void;
  onSelectCat: () => void;
}

export const EntryCards: React.FC<EntryCardsProps> = ({
  onSelectDog,
  onSelectCat,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-[#14181A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Dog Food & Supplies */}
          <div
            onClick={onSelectDog}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-[#F6EFE4] dark:bg-[#1D2326] p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-3 z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B5533C]">
                For Dogs & Puppies
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.entryCards.dogTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#5E696E] dark:text-[#A2ADB3] max-w-md leading-relaxed">
                {t.entryCards.dogDesc}
              </p>
            </div>

            <div className="pt-6 z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#B5533C] group-hover:translate-x-1 transition-transform">
                <span>{t.entryCards.dogCta}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Product image decoration */}
            <div className="absolute -bottom-6 -right-6 w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden opacity-35 dark:opacity-25 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
              <img
                src="/images/products/dog_food_bag_premium.jpg"
                alt="Dog Food & Supplies"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 2: Cat Food & Supplies */}
          <div
            onClick={onSelectCat}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-[#F6EFE4] dark:bg-[#1D2326] p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-3 z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1F3A2E] dark:text-emerald-400">
                For Cats & Kittens
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.entryCards.catTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#5E696E] dark:text-[#A2ADB3] max-w-md leading-relaxed">
                {t.entryCards.catDesc}
              </p>
            </div>

            <div className="pt-6 z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#1F3A2E] dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>{t.entryCards.catCta}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Product image decoration */}
            <div className="absolute -bottom-6 -right-6 w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden opacity-35 dark:opacity-25 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
              <img
                src="/images/products/cat_whiskas_ocean_fish.jpg"
                alt="Cat Food & Supplies"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
