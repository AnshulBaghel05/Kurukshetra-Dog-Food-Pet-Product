import React, { useState, useEffect } from 'react';
import { MessageCircle, ShoppingBag, ShieldCheck, Award, HeartHandshake, Star } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  onNavigateProducts: () => void;
  onNavigatePuppies: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateProducts }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      src: "/images/hero_kurukshetra_pet_store.jpg",
      alt: "German Shepherd puppy and Labrador resting on woven charpai cot in Haryana",
      caption: "Ethical Kennels & Open Runs · Kurukshetra, Haryana"
    },
    {
      src: "/images/puppy_german_shepherd.jpg",
      alt: "Long coat German Shepherd puppy on warm terracotta linen",
      caption: "Healthy German Shepherd Puppies with Verified Lineage"
    },
    {
      src: "/images/puppy_labrador_golden.jpg",
      alt: "Playful Golden Labrador retriever puppy",
      caption: "Family-Socialized Labradors & Wholesome Pet Care"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const whatsappHeroUrl = buildWhatsAppUrl(
    "Namaste HR Pets! I found your website and would like to enquire about puppies / dog food in Thanesar, Kurukshetra."
  );

  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:py-12 lg:py-16 bg-charpai-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Intent */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Brand Pill Alternative: Unboxed clean typographic kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B5533C]">
              <span>Thanesar</span>
              <span aria-hidden="true">·</span>
              <span>Kurukshetra, Haryana</span>
              <span aria-hidden="true">·</span>
              <span>@kurukshetrakennel</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#14181A] dark:text-[#F6EFE4] leading-[1.15] text-balance">
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#5E696E] dark:text-[#A2ADB3] max-w-2xl leading-relaxed">
              {t.hero.subline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-sm sm:text-base shadow-md transition-all active:scale-95 min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 text-[#E8A33D]" />
                <span>{t.hero.whatsappCta}</span>
              </a>

              <button
                onClick={onNavigateProducts}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#1D2326] border border-[#14181A]/15 dark:border-[#F6EFE4]/15 hover:border-[#B5533C] text-[#14181A] dark:text-[#F6EFE4] font-semibold text-sm sm:text-base transition-colors min-h-[48px] cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#B5533C]" />
                <span>{t.hero.browseCta}</span>
              </button>
            </div>

            {/* Micro-guarantee */}
            <div className="flex items-center gap-4 text-xs text-[#5E696E] dark:text-[#A2ADB3] pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1F3A2E] dark:text-emerald-400" />
                <span>In-Person Kennel Visits Welcomed</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#B5533C]" />
                <span>Same-Day Local Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Reel */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 shadow-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white">
              {heroImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle contrast gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  {/* Image caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-medium drop-shadow-xs">
                    {img.caption}
                  </div>
                </div>
              ))}

              {/* Slider indicators */}
              <div className="absolute bottom-2 right-4 z-20 flex gap-1.5">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === currentSlide ? 'w-6 bg-[#E8A33D]' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Trust Strip */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#B5533C]" />
                <span className="text-xl sm:text-2xl font-bold font-heading text-[#14181A] dark:text-[#F6EFE4] tabular-nums">
                  {siteConfig.trustMetrics.yearsInBusiness}
                </span>
              </div>
              <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                {t.hero.trustYears}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#1F3A2E] dark:text-emerald-400" />
                <span className="text-xl sm:text-2xl font-bold font-heading text-[#14181A] dark:text-[#F6EFE4] tabular-nums">
                  {siteConfig.trustMetrics.puppiesHomed}
                </span>
              </div>
              <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                {t.hero.trustPups}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#E8A33D]" />
                <span className="text-xl sm:text-2xl font-bold font-heading text-[#14181A] dark:text-[#F6EFE4] tabular-nums">
                  {siteConfig.trustMetrics.instagramFollowers}
                </span>
              </div>
              <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                {t.hero.trustFollowers} ({siteConfig.instagramHandle})
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B5533C]" />
                <span className="text-xl sm:text-2xl font-bold font-heading text-[#14181A] dark:text-[#F6EFE4] tabular-nums">
                  {siteConfig.trustMetrics.googleRating}
                </span>
              </div>
              <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                {t.hero.trustRating}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
