import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ReviewsAndFAQ: React.FC = () => {
  const { lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const reviews = [
    {
      name: "Sandeep Malik",
      location: "Sector 7, Kurukshetra",
      pet: "Golden Retriever Pet Parent",
      quote:
        "Finally, a trusted store in Kurukshetra that keeps genuine Royal Canin and Farmina N&D in stock with fresh expiry dates. I order on WhatsApp and receive it at my door within 2 hours.",
      verified: true
    },
    {
      name: "Gurpreet Singh",
      location: "Pipli Road, Thanesar",
      pet: "2 Cats & Indie Dog Parent",
      quote:
        "The best store in Thanesar for Whiskas, Sheba wet pouches, and bentonite cat litter. The staff knows pet nutrition well and never pushes expired or overpriced products.",
      verified: true
    },
    {
      name: "Dr. Ananya Sharma",
      location: "Near Birla Mandir, Kurukshetra",
      pet: "Aquarium & Cockatiel Enthusiast",
      quote:
        "Finding clean bird seeds and quality tropical fish flakes used to be difficult in Kurukshetra. Their Aviary's Finest seed mix and Aqua-Vital flakes are always clean and fresh.",
      verified: true
    }
  ];

  const faqs = [
    {
      q: "Do you offer same-day home delivery in Thanesar and Kurukshetra?",
      qHi: "क्या आप थानेसर और कुरुक्षेत्र में उसी दिन होम डिलीवरी करते हैं?",
      a: "Yes! We offer same-day doorstep delivery across Thanesar, Pipli Road, University Campus, and nearby residential sectors. Simply add your required pet food or accessories to the cart and submit your order via WhatsApp.",
      aHi: "हाँ! हम थानेसर, पिपली रोड, यूनिवर्सिटी कैंपस और आसपास के सभी सेक्टरों में उसी दिन होम डिलीवरी उपलब्ध कराते हैं। आप कार्ट से सीधे व्हाट्सएप पर ऑर्डर भेज सकते हैं।"
    },
    {
      q: "Are the pet food brands 100% genuine with verified batch seals?",
      qHi: "क्या सभी पेट फ़ूड ब्रांड्स 100% असली और सीलबंद हैं?",
      a: "Absolutely. We are authorized retail partners for leading veterinary and commercial brands including Royal Canin, Farmina N&D, Drools Focus, Whiskas, Sheba, Himalaya, and Beaphar. All items have tamper-evident manufacturer seals and verifiable expiration dates.",
      aHi: "बिल्कुल। हम रॉयल कैनिन, फारमिना, ड्रूल्स, व्हिस्कस और हिमालया के अधिकृत रिटेलर हैं। सभी बैग्स सीलबंद और ताज़ा एक्सपायरी डेट के साथ आते हैं।"
    },
    {
      q: "What pet supplies do you carry for cats, birds, and fish?",
      qHi: "बिल्लियों, पक्षियों और मछलियों के लिए क्या सामान उपलब्ध है?",
      a: "In addition to dog nutrition, we stock Whiskas dry cat food, Sheba wet gravy pouches, clumping odor-lock cat litter, gourmet bird seed mixes for budgies and parrots, and high-protein spirulina fish food flakes for clean aquarium water.",
      aHi: "कुत्तों के भोजन के अलावा हमारे पास कैट फ़ूड, शेबा ग्रेवी पाउच, क्लंपिंग लिटर, पक्षियों का शुद्ध दाना और एक्वेरियम मछलियों के फ्लेक्स उपलब्ध हैं।"
    },
    {
      q: "How do I place an order through WhatsApp?",
      qHi: "व्हाट्सएप के माध्यम से ऑर्डर कैसे दें?",
      a: "Browse our Products catalog, choose your quantity, and click 'Add to Cart'. Open your Cart drawer, choose Home Delivery or Store Pickup, type your name/area, and tap 'Place Order on WhatsApp'. Our team will instantly confirm availability and dispatch your order.",
      aHi: "उत्पाद देखकर 'कार्ट में जोड़ें' पर क्लिक करें। कार्ट खोलकर डिलीवरी का तरीका और पता लिखें, फिर 'व्हाट्सएप पर ऑर्डर भेजें' दबाएं। हम तुरंत ऑर्डर कन्फर्म करेंगे।"
    },
    {
      q: "Can I get personalized advice on what food is best for my pet's breed?",
      qHi: "क्या मुझे अपने पेट की नस्ल के अनुसार सही भोजन की सलाह मिल सकती है?",
      a: "Yes! Use our interactive 'Find the Right Food for Your Pet' quiz on this website, or message us directly on WhatsApp with your pet's age, breed, and current diet. We provide honest recommendations tailored to Haryana's seasonal weather.",
      aHi: "हाँ! हमारी वेबसाइट पर फूड क्विज़ का उपयोग करें या सीधे व्हाट्सएप पर अपने पेट की उम्र व नस्ल बताएं। हम उचित पोषण की सलाह देंगे।"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#14181A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
              Verified Pet Parent Reviews
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
              Trusted by Pet Families Across Kurukshetra
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#F6EFE4] dark:bg-[#1D2326] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#E8A33D] mb-3">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#B5533C]/40 mb-2" />
                  <p className="text-xs sm:text-sm text-[#14181A] dark:text-[#F6EFE4] leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#14181A] dark:text-[#F6EFE4]">
                      {rev.name}
                    </span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3]">
                    {rev.location} · {rev.pet}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E] dark:text-emerald-400">
              Clear & Honest Answers
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-[#F6EFE4]/60 dark:bg-[#1D2326]/60 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer min-h-[48px]"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#14181A] dark:text-[#F6EFE4]">
                      {lang === 'hi' ? faq.qHi : faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#B5533C] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#5E696E] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed border-t border-[#14181A]/5 dark:border-[#F6EFE4]/5 pt-3 animate-fadeIn">
                      {lang === 'hi' ? faq.aHi : faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
