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
      pet: "Long-Coat German Shepherd Owner",
      quote:
        "Visited their kennel in person before reserving our GSD puppy. The owner let us spend time with both mother and father dogs. Clean open spaces and very honest feeding advice for Haryana summers.",
      verified: true
    },
    {
      name: "Gurpreet Singh",
      location: "Pipli Road, Thanesar",
      pet: "Golden Labrador Owner",
      quote:
        "Got our Labrador puppy and their starter food kit last year. Whenever I need Royal Canin or calcium supplements, I message them on WhatsApp and get it delivered in Thanesar within 2 hours.",
      verified: true
    },
    {
      name: "Dr. Ananya Sharma",
      location: "Near Birla Mandir, Kurukshetra",
      pet: "Beagle & Indie Pet Parent",
      quote:
        "Honest store counter. They won't push unnecessary expensive brands if your dog is doing well on a balanced diet. Appreciate their transparent guidance.",
      verified: true
    }
  ];

  const faqs = [
    {
      q: "Can I visit your kennel in Kurukshetra before deciding on a puppy?",
      qHi: "क्या पिल्ला लेने से पहले मैं कुरुक्षेत्र में आपके केनेल का दौरा कर सकता हूँ?",
      a: "Yes, we strongly encourage in-person visits! You can meet the puppy, observe their mother's temperament, and inspect the shaded, hygienic open kennel runs. Please message us on WhatsApp or call ahead so we can ensure the kennel manager is available to assist you.",
      aHi: "हाँ, हम व्यक्तिगत विज़िट को प्राथमिकता देते हैं! आप पिल्ले से मिल सकते हैं, मां के स्वभाव को देख सकते हैं और केनेल की स्वच्छता जांच सकते हैं। कृपया पहले व्हाट्सएप या फोन पर समय तय कर लें।"
    },
    {
      q: "Are the puppies vaccinated and dewormed?",
      qHi: "क्या पिल्लों को टीका (Vaccination) और डिवॉर्मिंग दी गई है?",
      a: "All puppies receive age-appropriate deworming cycles (starting at 4 weeks) and their primary core vaccination (such as 6-in-1 or 7-in-1 DHPPiL) administered and signed by a licensed local veterinary surgeon with an official health card.",
      aHi: "सभी पिल्लों को उम्र अनुसार डिवॉर्मिंग और प्राथमिक वैक्सीन (6-in-1 / 7-in-1) अधिकृत पशु चिकित्सक द्वारा लगाकर आधिकारिक कार्ड दिया जाता है।"
    },
    {
      q: "Do you offer home delivery for dog food in Thanesar?",
      qHi: "क्या आप थानेसर में डॉग फ़ूड की होम डिलीवरी करते हैं?",
      a: "Yes! We provide same-day local delivery across Thanesar, Pipli, University Campus, and nearby sectors in Kurukshetra for qualifying orders. Simply add products to your enquiry or message your list directly on WhatsApp.",
      aHi: "हाँ! हम थानेसर, पिपली, विश्वविद्यालय परिसर और आसपास के सेक्टरों में उसी दिन होम डिलीवरी उपलब्ध कराते हैं।"
    },
    {
      q: "Why are some prices listed as 'Ask on WhatsApp'?",
      qHi: "कुछ उत्पादों की कीमत 'Ask on WhatsApp' क्यों लिखी है?",
      a: "Distributor pack prices and seasonal offers fluctuate, and live puppy availability varies weekly. To ensure you never receive outdated or incorrect pricing, we confirm exact batch prices and bag sizes directly on WhatsApp.",
      aHi: "सप्लाई और स्टॉक की ताज़ा स्थिति के अनुसार सटीक और पारदर्शी मूल्य सुनिश्चित करने के लिए हम व्हाट्सएप पर तुरंत सही कीमत बताते हैं।"
    },
    {
      q: "Which dog food brands do you carry in stock?",
      qHi: "आपकी दुकान में कौन से प्रमुख ब्रांड्स उपलब्ध हैं?",
      a: "We stock leading brands including Royal Canin (Maxi Puppy, Medium Adult, Giant), Drools Focus Super Premium, Farmina N&D Grain-Free, Pedigree PRO, Himalaya Healthy Pet, and specialized grooming & anti-tick products.",
      aHi: "हमारे पास रॉयल कैनिन, ड्रूल्स फोकस, फारमिना ग्रेन-फ्री, पेडिग्री प्रो, हिमालया और एंटी-टिक शैम्पू व सप्लीमेंट्स का ताज़ा स्टॉक रहता है।"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#14181A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
              Local Community Trust
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
              Words from Pet Families in Kurukshetra
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
