import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowLeft, Share2, AlertCircle, MessageCircle } from 'lucide-react';
import { guidesData, GuideArticle } from '../data/guides';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const GuidesView: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);

  const handleShareArticle = (art: GuideArticle) => {
    const text = `Read this helpful pet care guide from Kurukshetra Pet Food & Supplies: "${art.title}"`;
    const url = buildWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (selectedArticle) {
    return (
      <div className="py-6 sm:py-10 bg-[#F6EFE4] dark:bg-[#14181A] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#B5533C] hover:underline cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Guides</span>
          </button>

          <article className="bg-white dark:bg-[#1D2326] p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E] dark:text-emerald-400">
                {selectedArticle.category}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] leading-tight">
                {lang === 'hi' ? selectedArticle.titleHindi : selectedArticle.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedArticle.date}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedArticle.readTime}</span>
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            {selectedArticle.disclaimer && (
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#E8A33D] mt-0.5" />
                <p>{selectedArticle.disclaimer}</p>
              </div>
            )}

            {/* Article Content */}
            <div className="space-y-4 text-xs sm:text-sm text-[#14181A] dark:text-[#F6EFE4] leading-relaxed pt-2 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Share / WhatsApp discussion */}
            <div className="pt-6 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleShareArticle(selectedArticle)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1F3A2E] text-white text-xs font-semibold hover:bg-[#15271F] cursor-pointer min-h-[44px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide on WhatsApp</span>
              </button>

              <a
                href={buildWhatsAppUrl(`Namaste! I just read your article "${selectedArticle.title}" and have a query regarding my dog's diet.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#14181A]/15 dark:border-[#F6EFE4]/15 hover:border-[#B5533C] text-xs font-semibold min-h-[44px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Ask Question on WhatsApp</span>
              </a>
            </div>
          </article>

        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 bg-[#F6EFE4] dark:bg-[#14181A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
            Local Pet Care Knowledge Base
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
            Pet Parenting & Nutrition Guides
          </h1>
          <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3]">
            Practical advice written for pet owners facing Haryana’s distinct climate, breed requirements, and local food availability.
          </p>
        </div>

        {/* 4 Starter Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidesData.map((art) => (
            <div
              key={art.slug}
              onClick={() => {
                setSelectedArticle(art);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white dark:bg-[#1D2326] p-6 rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                  <span className="font-semibold text-[#B5533C] uppercase tracking-wider text-[11px]">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                <h2 className="font-heading text-lg sm:text-xl font-bold text-[#14181A] dark:text-[#F6EFE4] group-hover:text-[#B5533C] transition-colors leading-snug">
                  {lang === 'hi' ? art.titleHindi : art.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] line-clamp-3 leading-relaxed">
                  {lang === 'hi' ? art.excerptHindi : art.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#1F3A2E] dark:text-emerald-400 group-hover:underline flex items-center gap-1">
                  <span>Read Full Guide</span>
                  <span>→</span>
                </span>
                <span className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3]">
                  {art.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Medical disclaimer note */}
        <div className="p-4 bg-white dark:bg-[#1D2326] rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex items-center gap-3 text-xs text-[#5E696E] dark:text-[#A2ADB3]">
          <AlertCircle className="w-4 h-4 text-[#B5533C] shrink-0" />
          <p>
            Disclaimer: All guides are provided for general educational purposes and represent honest owner experiences in Haryana. Always consult a licensed veterinarian for medical diagnoses or drug prescriptions.
          </p>
        </div>

      </div>
    </div>
  );
};
