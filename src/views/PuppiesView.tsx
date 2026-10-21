import React, { useState, useMemo } from 'react';
import { ShieldCheck, MessageCircle, HeartHandshake, Eye, Sparkles, AlertCircle, Award } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { PuppyLightboxModal, PuppyItem } from '../components/PuppyLightboxModal';
import { buildWhatsAppUrl, generatePuppyEnquiryMessage } from '../utils/whatsapp';
import rawPuppies from '../data/puppies.json';

const puppies = rawPuppies as PuppyItem[];

interface PuppiesViewProps {
  onNavigateProducts: () => void;
}

export const PuppiesView: React.FC<PuppiesViewProps> = ({ onNavigateProducts }) => {
  const { t } = useLanguage();
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [lightboxPuppy, setLightboxPuppy] = useState<PuppyItem | null>(null);

  // Extract unique breeds
  const breeds = useMemo(() => {
    return ['all', ...Array.from(new Set(puppies.map((p) => p.breed)))];
  }, []);

  // Filtered list
  const filteredPuppies = useMemo(() => {
    return puppies.filter((p) => {
      if (selectedBreed !== 'all' && p.breed !== selectedBreed) return false;
      if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedBreed, selectedStatus]);

  return (
    <div className="py-6 sm:py-10 bg-[#F6EFE4] dark:bg-[#14181A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
            Kurukshetra Kennel · Ethical Raising
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
            {t.puppies.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed">
            {t.puppies.subtitle}
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-[#1D2326] p-3.5 sm:p-4 rounded-2xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs">
          {/* Breed filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#5E696E] dark:text-[#A2ADB3]">
              {t.puppies.filterBreed}:
            </label>
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C] cursor-pointer"
            >
              {breeds.map((b) => (
                <option key={b} value={b}>
                  {b === 'all' ? t.products.all : b}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#5E696E] dark:text-[#A2ADB3]">
              {t.puppies.filterStatus}:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C] cursor-pointer"
            >
              <option value="all">{t.products.all}</option>
              <option value="Available">Available</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>

        {/* Puppies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredPuppies.map((pup) => {
            const isAvailable = pup.status === 'Available';
            const whatsappUrl = buildWhatsAppUrl(
              generatePuppyEnquiryMessage({
                id: pup.id,
                breed: pup.breed,
                coat: pup.coat,
                gender: pup.gender,
                ageWeeks: pup.ageWeeks,
              })
            );

            return (
              <div
                key={pup.id}
                className="bg-white dark:bg-[#1D2326] rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-xs overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Lightbox trigger */}
                  <div
                    onClick={() => setLightboxPuppy(pup)}
                    className="relative aspect-4/3 sm:aspect-16/10 bg-[#14181A] cursor-pointer overflow-hidden group"
                  >
                    <img
                      src={pup.images[0]}
                      alt={`${pup.breed} puppy`}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Status badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-xs ${
                          pup.status === 'Available'
                            ? 'bg-emerald-600 text-white'
                            : pup.status === 'Reserved'
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-600 text-white'
                        }`}
                      >
                        {pup.status}
                      </span>
                    </div>

                    {/* Gallery indicator */}
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{pup.images.length} Photos</span>
                    </div>
                  </div>

                  {/* Puppy Specs */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
                          {pup.breed}
                        </h2>
                        <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                          {pup.coat} · {pup.gender}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#F6EFE4] dark:bg-[#14181A] text-[#14181A] dark:text-[#F6EFE4] tabular-nums">
                          {pup.ageWeeks} {t.puppies.ageWeeks}
                        </span>
                      </div>
                    </div>

                    {/* Vaccination Note */}
                    <div className="bg-[#F6EFE4] dark:bg-[#14181A] p-3 rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1F3A2E] dark:text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Health & Vaccination</span>
                      </div>
                      <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed">
                        {pup.vaccinationNote}
                      </p>
                    </div>

                    {/* Parents note if available */}
                    {pup.parentsNote && (
                      <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] italic">
                        "{pup.parentsNote}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer with Price & Reserve CTA */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#14181A]/5 dark:border-[#F6EFE4]/5 mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs font-semibold text-[#5E696E] dark:text-[#A2ADB3]">
                    {pup.price !== null ? (
                      <span className="text-base font-bold text-[#B5533C]">₹{pup.price}</span>
                    ) : (
                      <span className="text-[#1F3A2E] dark:text-emerald-400 font-bold">
                        Price on WhatsApp Enquiry
                      </span>
                    )}
                  </div>

                  {isAvailable ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-xs min-h-[44px] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#E8A33D]" />
                      <span>{t.puppies.reserveCta}</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-500 text-xs font-semibold cursor-not-allowed min-h-[44px]"
                    >
                      Currently Reserved
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* "Before You Buy" Welfare Trust Block */}
        <div className="bg-white dark:bg-[#1D2326] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
              Ethical Breeding Transparency
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
              {t.puppies.trustTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] mt-1">
              {t.puppies.trustSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#F6EFE4] dark:bg-[#14181A] space-y-2 border border-[#14181A]/5 dark:border-[#F6EFE4]/5">
              <h3 className="font-heading text-base font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.puppies.standard1Title}
              </h3>
              <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed">
                {t.puppies.standard1Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6EFE4] dark:bg-[#14181A] space-y-2 border border-[#14181A]/5 dark:border-[#F6EFE4]/5">
              <h3 className="font-heading text-base font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.puppies.standard2Title}
              </h3>
              <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed">
                {t.puppies.standard2Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6EFE4] dark:bg-[#14181A] space-y-2 border border-[#14181A]/5 dark:border-[#F6EFE4]/5">
              <h3 className="font-heading text-base font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.puppies.standard3Title}
              </h3>
              <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed">
                {t.puppies.standard3Desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6EFE4] dark:bg-[#14181A] space-y-2 border border-[#14181A]/5 dark:border-[#F6EFE4]/5">
              <h3 className="font-heading text-base font-bold text-[#14181A] dark:text-[#F6EFE4]">
                {t.puppies.standard4Title}
              </h3>
              <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed">
                {t.puppies.standard4Desc}
              </p>
            </div>
          </div>

          {/* Conditional Registration / KCI Badges - ONLY shown if supplied in config */}
          {siteConfig.registrationNumbers && siteConfig.registrationNumbers.length > 0 && (
            <div className="pt-4 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex flex-wrap gap-3">
              {siteConfig.registrationNumbers.map((reg, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F3A2E] text-white text-xs font-semibold">
                  <Award className="w-4 h-4 text-[#E8A33D]" />
                  <span>Verified Kennel Registration: {reg}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cross-Sell Starter Kit */}
        <div className="bg-[#1F3A2E] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="font-heading text-xl sm:text-2xl font-bold">
              {t.puppies.crossSellTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 max-w-xl">
              {t.puppies.crossSellDesc}
            </p>
          </div>

          <button
            onClick={onNavigateProducts}
            className="px-6 py-3 rounded-xl bg-[#E8A33D] text-[#14181A] font-bold text-xs sm:text-sm hover:bg-[#D5912F] transition-colors cursor-pointer shrink-0 min-h-[44px]"
          >
            {t.puppies.crossSellCta}
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <PuppyLightboxModal
        puppy={lightboxPuppy}
        onClose={() => setLightboxPuppy(null)}
      />
    </div>
  );
};
