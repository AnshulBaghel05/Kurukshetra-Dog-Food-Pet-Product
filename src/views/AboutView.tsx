import React, { useState } from 'react';
import { Heart, ShieldCheck, Users, Play, ExternalLink, Store, Sparkles, Truck } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

export const AboutView: React.FC = () => {
  const { t } = useLanguage();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div className="py-6 sm:py-10 bg-[#F6EFE4] dark:bg-[#14181A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
            {t.about.badge}
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
            {t.about.storyHeading}
          </h1>
          <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3]">
            Thanesar, Kurukshetra · Dedicated to providing pure nutrition, genuine brand health products, and reliable supplies for all pets.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#14181A] dark:text-[#F6EFE4] leading-relaxed">
            <p className="bg-white dark:bg-[#1D2326] p-4 rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs">
              {t.about.p1}
            </p>
            <p className="bg-white dark:bg-[#1D2326] p-4 rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs">
              {t.about.p2}
            </p>
            <p className="bg-white dark:bg-[#1D2326] p-4 rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs">
              {t.about.p3}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-16/10 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-md">
              <img
                src="/images/hero_pet_supplies_store.jpg"
                alt="Kurukshetra Pet Food and Pet Supplies retail store shelves"
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3] text-center mt-2">
              Our store counter and organized pet food aisles in Thanesar, Kurukshetra.
            </p>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="bg-white dark:bg-[#1D2326] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm space-y-6">
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
            {t.about.valuesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/5 dark:border-[#F6EFE4]/5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#B5533C]/10 flex items-center justify-center text-[#B5533C]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-[#14181A] dark:text-[#F6EFE4] font-medium leading-relaxed">
                {t.about.value1}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/5 dark:border-[#F6EFE4]/5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#1F3A2E]/10 flex items-center justify-center text-[#1F3A2E] dark:text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-[#14181A] dark:text-[#F6EFE4] font-medium leading-relaxed">
                {t.about.value2}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/5 dark:border-[#F6EFE4]/5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8A33D]/10 flex items-center justify-center text-[#E8A33D]">
                <Heart className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-[#14181A] dark:text-[#F6EFE4] font-medium leading-relaxed">
                {t.about.value3}
              </p>
            </div>
          </div>
        </div>

        {/* Video Tour (Lazy YouTube Facade) */}
        <div className="bg-white dark:bg-[#1D2326] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.about.videoTourTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3]">
                {t.about.videoTourDesc}
              </p>
            </div>

            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B5533C] hover:underline"
            >
              <span>{t.about.watchVideoCta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-black border border-[#14181A]/10 dark:border-[#F6EFE4]/10">
            {!isPlayingVideo ? (
              <div className="relative w-full h-full cursor-pointer group" onClick={() => setIsPlayingVideo(true)}>
                <img
                  src="/images/hero_pet_supplies_store.jpg"
                  alt="Store video tour preview"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#B5533C] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-xs">
                  Tap to watch store walkthrough video
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center space-y-3 bg-stone-900">
                <p className="text-sm">
                  Video hosted on YouTube channel ({siteConfig.social.youtube}).
                </p>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#B5533C] text-white rounded-lg text-xs font-bold"
                >
                  Open in YouTube App
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
