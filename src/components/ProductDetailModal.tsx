import React from 'react';
import { X, ShoppingBag, ShieldCheck, AlertCircle, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl, generateProductEnquiryMessage } from '../utils/whatsapp';

export interface ProductItem {
  slug: string;
  name: string;
  brand: string;
  petType: string;
  category: string;
  lifeStage: string;
  packSize: string;
  price: number | null;
  mrp: number | null;
  inStock: boolean;
  image: string;
  tags: string[];
  description: string;
  feedingGuide?: Array<{
    ageMonths: string;
    targetWeightKg: string;
    dailyServingGrams: string;
  }>;
}

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const { t } = useLanguage();

  if (!product) return null;

  const handleAddAndClose = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      packSize: product.packSize,
      price: product.price,
    });
    onClose();
  };

  const whatsappDirectUrl = buildWhatsAppUrl(
    generateProductEnquiryMessage(product.name, product.packSize)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#1D2326] text-[#14181A] dark:text-[#F6EFE4] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-8 border border-[#14181A]/10 dark:border-[#F6EFE4]/10"
      >
        {/* Header with Close */}
        <div className="p-4 sm:p-6 border-b border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
              {product.brand}
            </span>
            <span aria-hidden="true" className="text-xs text-[#5E696E]">·</span>
            <span className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
              {product.packSize}
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

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#F6EFE4] dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10">
              <img
                src={product.image}
                alt={product.name}
                width={500}
                height={375}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <h3 id="product-detail-modal-title" className="font-heading text-xl sm:text-2xl font-bold leading-tight">
                {product.name}
              </h3>
              
              <div className="text-lg font-bold text-[#B5533C]">
                {product.price !== null ? (
                  <span>₹{product.price}</span>
                ) : (
                  <span className="text-sm font-semibold text-[#1F3A2E] dark:text-emerald-400">
                    Ask on WhatsApp for Current Batch Price
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-[#5E696E] dark:text-[#A2ADB3] bg-[#F6EFE4] dark:bg-[#14181A] px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleAddAndClose}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-xs sm:text-sm shadow-xs cursor-pointer min-h-[48px]"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E8A33D]" />
                  <span>{t.products.addToEnquiry}</span>
                </button>

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#14181A]/15 dark:border-[#F6EFE4]/15 hover:border-[#25D366] text-xs font-semibold min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Inquire Directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-2 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
            <h4 className="text-sm font-bold text-[#14181A] dark:text-[#F6EFE4]">
              Description & Quality Notes
            </h4>
            <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Feeding Guide Table if available */}
          {product.feedingGuide && product.feedingGuide.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1F3A2E] dark:text-emerald-400" />
                <h4 className="text-sm font-bold text-[#14181A] dark:text-[#F6EFE4]">
                  {t.products.feedingGuideTitle}
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#14181A]/10 dark:border-[#F6EFE4]/10 rounded-lg">
                  <thead className="bg-[#F6EFE4] dark:bg-[#14181A] text-[#14181A] dark:text-[#F6EFE4]">
                    <tr>
                      <th className="p-2.5 font-bold">Age (Months)</th>
                      <th className="p-2.5 font-bold">Target Adult Weight</th>
                      <th className="p-2.5 font-bold">Daily Serving (Grams)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#14181A]/5 dark:divide-[#F6EFE4]/5">
                    {product.feedingGuide.map((row, idx) => (
                      <tr key={idx} className="hover:bg-black/2 dark:hover:bg-white/2">
                        <td className="p-2.5 tabular-nums">{row.ageMonths}</td>
                        <td className="p-2.5 tabular-nums">{row.targetWeightKg}</td>
                        <td className="p-2.5 font-semibold text-[#B5533C] tabular-nums">
                          {row.dailyServingGrams}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Divide daily portion into 2-3 equal meals. Provide clean drinking water at all times.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
