import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { getStoreStatus } from '../utils/hours';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const ContactView: React.FC = () => {
  const { lang, t } = useLanguage();
  const status = getStoreStatus(siteConfig.hours);

  // Form state
  const [name, setName] = useState('');
  const [interest, setInterest] = useState<'food' | 'puppy' | 'advice'>('food');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const interestLabel =
      interest === 'food'
        ? 'Dog Food & Accessories'
        : interest === 'puppy'
        ? 'Puppy Availability & Lineage'
        : 'Dietary Guidance & Summer Care';

    let text = `*Namaste HR Pets!* 🐾\nNew enquiry from website:\n- *Name:* ${name || 'Prospective Pet Parent'}\n- *Interest:* ${interestLabel}`;
    if (message.trim()) {
      text += `\n- *Message:* ${message.trim()}`;
    }
    text += `\n\nCould you please help me with this? Thank you!`;

    const url = buildWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-6 sm:py-10 bg-[#F6EFE4] dark:bg-[#14181A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
            Direct Contact & Directions
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
            {t.contact.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3]">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details + Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white dark:bg-[#1D2326] p-6 rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#14181A]/10 dark:border-[#F6EFE4]/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5E696E] dark:text-[#A2ADB3]">
                  Store Status (IST)
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  status.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {status.isOpen ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>{status.statusText}</span>
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B5533C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#14181A] dark:text-[#F6EFE4]">
                      {t.contact.addressLabel}
                    </span>
                    <p className="text-[#5E696E] dark:text-[#A2ADB3]">
                      {lang === 'hi' ? siteConfig.addressHindi : siteConfig.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#1F3A2E] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#14181A] dark:text-[#F6EFE4]">
                      {t.contact.hoursLabel}
                    </span>
                    <p className="text-[#5E696E] dark:text-[#A2ADB3]">
                      Monday – Sunday: 09:30 AM to 08:30 PM (Asia/Kolkata)
                    </p>
                    <p className="text-[11px] text-[#B5533C] mt-0.5">{status.nextTimeText}</p>
                  </div>
                </div>
              </div>

              {/* Direct Links */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#B5533C] text-[#B5533C] hover:bg-[#B5533C] hover:text-white font-semibold text-xs min-h-[44px] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.contact.callUs}</span>
                </a>

                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-xs min-h-[44px] transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#E8A33D]" />
                  <span>{t.contact.getDirections}</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Enquiry Generator Form */}
            <div className="bg-white dark:bg-[#1D2326] p-6 rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs space-y-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-[#14181A] dark:text-[#F6EFE4]">
                  {t.contact.formTitle}
                </h2>
                <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                  {t.contact.formSubtitle}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold mb-1">
                    {t.contact.formName}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 rounded-lg bg-[#F6EFE4]/60 dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    {t.contact.formInterest}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'food', label: t.contact.interestFood },
                      { id: 'puppy', label: t.contact.interestPuppy },
                      { id: 'advice', label: t.contact.interestAdvice },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setInterest(opt.id as any)}
                        className={`p-2 rounded-lg border text-xs font-medium cursor-pointer min-h-[44px] transition-colors ${
                          interest === opt.id
                            ? 'bg-[#1F3A2E] text-white border-[#1F3A2E]'
                            : 'bg-white dark:bg-[#14181A] border-[#14181A]/15 dark:border-[#F6EFE4]/15'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-semibold mb-1">
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Which food do you recommend for a 3-month German Shepherd puppy?"
                    className="w-full px-3 py-2 rounded-lg bg-[#F6EFE4]/60 dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 focus:outline-hidden focus:border-[#B5533C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-slate-950 font-bold text-xs sm:text-sm hover:bg-[#20ba59] shadow-sm cursor-pointer min-h-[48px] active:scale-[0.98] transition-transform"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>{t.contact.formSubmit}</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Google Maps */}
          <div className="lg:col-span-6 bg-white dark:bg-[#1D2326] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm h-[480px] lg:h-[580px] relative">
            <iframe
              title="Google Maps Location"
              src={siteConfig.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            <div className="absolute top-4 left-4 bg-white/95 dark:bg-[#14181A]/95 backdrop-blur-xs py-2 px-3.5 rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 text-xs shadow-md">
              <span className="font-bold text-[#14181A] dark:text-[#F6EFE4] block">
                {siteConfig.brandName}
              </span>
              <span className="text-[#5E696E] dark:text-[#A2ADB3]">
                Thanesar, Kurukshetra, Haryana 136118
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
