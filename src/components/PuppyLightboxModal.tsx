import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl, generatePuppyEnquiryMessage } from '../utils/whatsapp';

export interface PuppyItem {
  id: string;
  breed: string;
  coat: string;
  gender: string;
  ageWeeks: number;
  status: 'Available' | 'Reserved' | 'Sold';
  price: number | null;
  vaccinationNote: string;
  images: string[];
  videoPoster?: string;
  parentsNote?: string;
}

interface PuppyLightboxModalProps {
  puppy: PuppyItem | null;
  onClose: () => void;
}

export const PuppyLightboxModal: React.FC<PuppyLightboxModalProps> = ({ puppy, onClose }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!puppy) return null;

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev + 1) % puppy.images.length);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev - 1 + puppy.images.length) % puppy.images.length);
  };

  const whatsappUrl = buildWhatsAppUrl(
    generatePuppyEnquiryMessage({
      id: puppy.id,
      breed: puppy.breed,
      coat: puppy.coat,
      gender: puppy.gender,
      ageWeeks: puppy.ageWeeks,
    })
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="puppy-lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#1D2326] text-[#14181A] dark:text-[#F6EFE4] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-6 border border-[#14181A]/10 dark:border-[#F6EFE4]/10"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex items-center justify-between">
          <div>
            <h3 id="puppy-lightbox-title" className="font-heading text-lg sm:text-xl font-bold">
              {puppy.breed} · {puppy.coat}
            </h3>
            <span className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
              ID: {puppy.id} · {puppy.gender} · {puppy.ageWeeks} weeks
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Photo Viewer */}
        <div className="relative aspect-4/3 sm:aspect-16/10 bg-[#14181A]">
          <img
            src={puppy.images[activePhotoIndex] || puppy.images[0]}
            alt={`${puppy.breed} photo ${activePhotoIndex + 1}`}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />

          {puppy.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Indicator */}
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-xs">
            Photo {activePhotoIndex + 1} of {puppy.images.length}
          </div>
        </div>

        {/* Details & Actions */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1F3A2E] dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Veterinary & Immunization Record</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] bg-[#F6EFE4] dark:bg-[#14181A] p-3 rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 leading-relaxed">
              {puppy.vaccinationNote}
            </p>
          </div>

          {puppy.parentsNote && (
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
                Parents & Family Temperament
              </h4>
              <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3]">
                {puppy.parentsNote}
              </p>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-xs sm:text-sm shadow-md min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 text-[#E8A33D]" />
              <span>Reserve / Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
