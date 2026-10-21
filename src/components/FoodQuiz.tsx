import React, { useState } from 'react';
import { HelpCircle, ChevronRight, ChevronLeft, RotateCcw, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

export const FoodQuiz: React.FC = () => {
  const { t } = useLanguage();
  const { addItem } = useCart();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    petType: 'dog',
    lifeStage: 'adult',
    size: 'large',
    need: 'general',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
  };

  // Find 2-3 matching products
  const matchingProducts = productsData.filter((p) => {
    if (answers.petType === 'bird') return p.petType === 'bird';
    if (answers.petType === 'fish') return p.petType === 'fish';
    if (answers.petType === 'cat') return p.petType === 'cat';
    const matchesStage = p.lifeStage === answers.lifeStage || p.category === 'treats';
    return p.petType === 'dog' && matchesStage;
  }).slice(0, 3);

  const generateQuizWhatsAppUrl = () => {
    const text = `*Namaste Kurukshetra Pet Store!* 🐾\nI took your 'Find the Right Food for Your Pet' nutrition quiz on your website:\n- Pet: ${answers.petType}\n- Life Stage: ${answers.lifeStage}\n- Breed / Size: ${answers.size}\n- Nutritional Focus: ${answers.need}\n\nCould you please suggest the best in-stock food and pack sizes available at your Thanesar store?`;
    return buildWhatsAppUrl(text);
  };

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#14181A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6EFE4] dark:bg-[#1D2326] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B5533C] mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Interactive Nutrition Matcher</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
              {t.quiz.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] mt-2">
              {t.quiz.subtitle}
            </p>
          </div>

          {!submitted ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6 text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                <span className="font-semibold text-[#14181A] dark:text-[#F6EFE4]">
                  {t.quiz.step} {step} {t.quiz.of} 4
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i <= step ? 'w-6 bg-[#B5533C]' : 'w-2 bg-[#14181A]/15 dark:bg-[#F6EFE4]/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step Questions */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-bold text-[#14181A] dark:text-[#F6EFE4]">
                    {t.quiz.q1}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelect('petType', 'dog')}
                      className={`p-4 rounded-xl text-left border cursor-pointer min-h-[48px] flex items-center justify-between transition-colors ${
                        answers.petType === 'dog'
                          ? 'border-[#B5533C] bg-white dark:bg-[#14181A] shadow-xs ring-2 ring-[#B5533C]/20 font-bold'
                          : 'border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white/60 dark:bg-[#14181A]/60'
                      }`}
                    >
                      <span>{t.quiz.options.petDog}</span>
                      {answers.petType === 'dog' && <CheckCircle2 className="w-5 h-5 text-[#B5533C]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect('petType', 'cat')}
                      className={`p-4 rounded-xl text-left border cursor-pointer min-h-[48px] flex items-center justify-between transition-colors ${
                        answers.petType === 'cat'
                          ? 'border-[#B5533C] bg-white dark:bg-[#14181A] shadow-xs ring-2 ring-[#B5533C]/20 font-bold'
                          : 'border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white/60 dark:bg-[#14181A]/60'
                      }`}
                    >
                      <span>{t.quiz.options.petCat}</span>
                      {answers.petType === 'cat' && <CheckCircle2 className="w-5 h-5 text-[#B5533C]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect('petType', 'bird')}
                      className={`p-4 rounded-xl text-left border cursor-pointer min-h-[48px] flex items-center justify-between transition-colors ${
                        answers.petType === 'bird'
                          ? 'border-[#B5533C] bg-white dark:bg-[#14181A] shadow-xs ring-2 ring-[#B5533C]/20 font-bold'
                          : 'border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white/60 dark:bg-[#14181A]/60'
                      }`}
                    >
                      <span>{t.quiz.options.petBird}</span>
                      {answers.petType === 'bird' && <CheckCircle2 className="w-5 h-5 text-[#B5533C]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect('petType', 'fish')}
                      className={`p-4 rounded-xl text-left border cursor-pointer min-h-[48px] flex items-center justify-between transition-colors ${
                        answers.petType === 'fish'
                          ? 'border-[#B5533C] bg-white dark:bg-[#14181A] shadow-xs ring-2 ring-[#B5533C]/20 font-bold'
                          : 'border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white/60 dark:bg-[#14181A]/60'
                      }`}
                    >
                      <span>{t.quiz.options.petFish}</span>
                      {answers.petType === 'fish' && <CheckCircle2 className="w-5 h-5 text-[#B5533C]" />}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-bold text-[#14181A] dark:text-[#F6EFE4]">
                    {t.quiz.q2}
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { id: 'puppy', label: t.quiz.options.stagePuppy },
                      { id: 'adult', label: t.quiz.options.stageAdult },
                      { id: 'senior', label: t.quiz.options.stageSenior },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect('lifeStage', opt.id)}
                        className={`p-3.5 rounded-xl text-left border cursor-pointer min-h-[48px] flex items-center justify-between transition-colors ${
                          answers.lifeStage === opt.id
                            ? 'border-[#B5533C] bg-white dark:bg-[#14181A] shadow-xs ring-2 ring-[#B5533C]/20 font-bold'
                            : 'border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white/60 dark:bg-[#14181A]/60'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {answers.lifeStage === opt.id && <CheckCircle2 className="w-5 h-5 text-[#B5533C]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-bold text-[#14181A] dark:text-[#F6EFE4]">
                    {t.quiz.q3}
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { id: 'small', label: t.quiz.options.sizeSmall },
                      { id: 'medium', label: t.quiz.options.sizeMedium },
                      { id: 'large', label: t.quiz.options.sizeLarge },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect('size', opt.id)}
                        className={`p-3.5 rounded-xl text-left border cursor-pointer min-h-[48px] flex items-center justify-between transition-colors ${
                          answers.size === opt.id
                            ? 'border-[#B5533C] bg-white dark:bg-[#14181A] shadow-xs ring-2 ring-[#B5533C]/20 font-bold'
                            : 'border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white/60 dark:bg-[#14181A]/60'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {answers.size === opt.id && <CheckCircle2 className="w-5 h-5 text-[#B5533C]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-bold text-[#14181A] dark:text-[#F6EFE4]">
                    {t.quiz.q4}
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { id: 'general', label: t.quiz.options.needGeneral },
                      { id: 'digestion', label: t.quiz.options.needDigestion },
                      { id: 'joints', label: t.quiz.options.needJoints },
                      { id: 'coat', label: t.quiz.options.needCoat },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect('need', opt.id)}
                        className={`p-3.5 rounded-xl text-left border cursor-pointer min-h-[48px] flex items-center justify-between transition-colors ${
                          answers.need === opt.id
                            ? 'border-[#B5533C] bg-white dark:bg-[#14181A] shadow-xs ring-2 ring-[#B5533C]/20 font-bold'
                            : 'border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white/60 dark:bg-[#14181A]/60'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {answers.need === opt.id && <CheckCircle2 className="w-5 h-5 text-[#B5533C]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-[#14181A]/15 dark:border-[#F6EFE4]/15 hover:bg-black/5 cursor-pointer min-h-[44px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t.quiz.prev}</span>
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] text-xs sm:text-sm font-semibold cursor-pointer min-h-[44px] shadow-xs"
                >
                  <span>{step === 4 ? 'See Recommendation' : t.quiz.next}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    {t.quiz.resultsTitle}
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5">
                    {t.quiz.resultsSubtitle}
                  </p>
                </div>
              </div>

              {/* Matching Products */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {matchingProducts.map((p) => (
                  <div
                    key={p.slug}
                    className="bg-white dark:bg-[#14181A] p-3.5 rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-4/3 rounded-lg overflow-hidden mb-2 bg-[#F6EFE4]">
                        <img
                          src={p.image}
                          alt={p.name}
                          width={200}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h5 className="text-xs font-bold line-clamp-2 text-[#14181A] dark:text-[#F6EFE4]">
                        {p.name}
                      </h5>
                      <p className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3] mt-0.5">
                        {p.brand} · {p.packSize}
                      </p>
                      <p className="text-xs font-bold text-[#B5533C] mt-1">
                        ₹{p.price}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        addItem({
                          slug: p.slug,
                          name: p.name,
                          brand: p.brand,
                          packSize: p.packSize,
                          price: p.price,
                        })
                      }
                      className="mt-3 w-full py-2 px-3 rounded-lg bg-[#F6EFE4] dark:bg-[#252D30] hover:bg-[#B5533C] hover:text-white text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
                    >
                      {t.products.addToEnquiry}
                    </button>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={generateQuizWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-xs sm:text-sm min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#E8A33D]" />
                  <span>{t.quiz.whatsappEnquireQuiz}</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-[#14181A]/15 dark:border-[#F6EFE4]/15 hover:bg-black/5 text-xs font-semibold cursor-pointer min-h-[48px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.quiz.restart}</span>
                </button>
              </div>

              {/* Mandatory Medical Disclaimer */}
              <div className="flex items-center gap-2 text-[11px] text-[#5E696E] dark:text-[#A2ADB3] bg-black/5 dark:bg-white/5 p-2.5 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#B5533C]" />
                <span>{t.quiz.disclaimer}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
