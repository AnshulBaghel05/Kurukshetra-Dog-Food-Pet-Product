import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Store, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl, generateCartWhatsAppMessage } from '../utils/whatsapp';

export const EnquiryDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, isCartOpen, setIsCartOpen, totalItems } = useCart();
  const { t } = useLanguage();

  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerArea, setCustomerArea] = useState('');

  if (!isCartOpen) return null;

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    const msg = generateCartWhatsAppMessage({
      items,
      fulfillment,
      customerName: customerName.trim(),
      customerArea: customerArea.trim(),
    });
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity"
    >
      <div
        className="w-full max-w-md bg-[#F6EFE4] dark:bg-[#1D2326] text-[#14181A] dark:text-[#F6EFE4] h-full shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B5533C]" />
            <h2 id="enquiry-drawer-title" className="font-heading text-lg font-bold">
              {t.enquiryDrawer.title}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1F3A2E] text-white tabular-nums">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Enquiry Drawer"
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center text-[#5E696E] dark:text-[#A2ADB3]">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#14181A] dark:text-white" />
              <p className="text-sm font-medium">{t.enquiryDrawer.emptyMessage}</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="p-3 bg-white dark:bg-[#14181A] rounded-xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate text-[#14181A] dark:text-[#F6EFE4]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                        {item.brand} · {item.packSize}
                      </p>
                      <p className="text-xs font-semibold text-[#B5533C] mt-0.5">
                        {item.price !== null ? `₹${item.price}` : 'Price on WhatsApp'}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-[#F6EFE4] dark:bg-[#252D30] rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.slug, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.slug, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeItem(item.slug)}
                      aria-label={`Remove ${item.name}`}
                      className="text-stone-400 hover:text-red-600 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear button */}
              <div className="text-right">
                <button
                  onClick={clearCart}
                  className="text-xs text-[#B5533C] hover:underline font-semibold cursor-pointer py-1"
                >
                  {t.enquiryDrawer.clearAll}
                </button>
              </div>

              {/* Fulfillment Option */}
              <div className="pt-3 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5E696E] dark:text-[#A2ADB3] mb-2">
                  {t.enquiryDrawer.fulfillmentType}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer min-h-[44px] transition-colors ${
                      fulfillment === 'pickup'
                        ? 'border-[#1F3A2E] bg-[#1F3A2E] text-white'
                        : 'border-[#14181A]/15 dark:border-[#F6EFE4]/15 bg-white dark:bg-[#14181A]'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>{t.enquiryDrawer.storePickup}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer min-h-[44px] transition-colors ${
                      fulfillment === 'delivery'
                        ? 'border-[#1F3A2E] bg-[#1F3A2E] text-white'
                        : 'border-[#14181A]/15 dark:border-[#F6EFE4]/15 bg-white dark:bg-[#14181A]'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>{t.enquiryDrawer.homeDelivery}</span>
                  </button>
                </div>
                {fulfillment === 'delivery' && (
                  <p className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3] mt-1.5">
                    {t.enquiryDrawer.deliveryNote}
                  </p>
                )}
              </div>

              {/* Customer Info for prefilling message */}
              <div className="space-y-3 pt-2">
                <div>
                  <label htmlFor="drawer-name" className="block text-xs font-medium mb-1">
                    {t.enquiryDrawer.yourName}
                  </label>
                  <input
                    id="drawer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t.enquiryDrawer.namePlaceholder}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-[#14181A] border border-[#14181A]/15 dark:border-[#F6EFE4]/15 focus:outline-hidden focus:border-[#B5533C]"
                  />
                </div>
                <div>
                  <label htmlFor="drawer-area" className="block text-xs font-medium mb-1">
                    {t.enquiryDrawer.yourArea}
                  </label>
                  <input
                    id="drawer-area"
                    type="text"
                    value={customerArea}
                    onChange={(e) => setCustomerArea(e.target.value)}
                    placeholder={t.enquiryDrawer.areaPlaceholder}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-[#14181A] border border-[#14181A]/15 dark:border-[#F6EFE4]/15 focus:outline-hidden focus:border-[#B5533C]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with WhatsApp CTA */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10 bg-white dark:bg-[#14181A]">
            <button
              onClick={handleSendWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-sm cursor-pointer shadow-md min-h-[48px] active:scale-[0.98] transition-transform"
            >
              <MessageCircle className="w-5 h-5 text-[#E8A33D]" />
              <span>{t.enquiryDrawer.sendWhatsApp}</span>
            </button>
            <p className="text-[11px] text-center text-[#5E696E] dark:text-[#A2ADB3] mt-2">
              Opens WhatsApp with your items pre-listed for our Thanesar team.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
