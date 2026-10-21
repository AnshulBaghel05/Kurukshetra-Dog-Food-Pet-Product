import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Eye, ShieldCheck, Check } from 'lucide-react';
import { Hero } from '../components/Hero';
import { EntryCards } from '../components/EntryCards';
import { StarterBundle } from '../components/StarterBundle';
import { FoodQuiz } from '../components/FoodQuiz';
import { InstagramWall } from '../components/InstagramWall';
import { ReviewsAndFAQ } from '../components/ReviewsAndFAQ';
import { LocationMapBlock } from '../components/LocationMapBlock';
import { ProductDetailModal, ProductItem } from '../components/ProductDetailModal';
import { PuppyLightboxModal, PuppyItem } from '../components/PuppyLightboxModal';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl, generatePuppyEnquiryMessage } from '../utils/whatsapp';
import rawProducts from '../data/products.json';
import rawPuppies from '../data/puppies.json';

const products = rawProducts as ProductItem[];
const puppies = rawPuppies as PuppyItem[];

interface HomeViewProps {
  onNavigateTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateTab }) => {
  const { t } = useLanguage();
  const { addItem, items: cartItems } = useCart();

  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [activePuppy, setActivePuppy] = useState<PuppyItem | null>(null);

  const featuredProducts = products.slice(0, 6);
  const featuredPuppies = puppies.slice(0, 3);

  return (
    <div>
      {/* 1. Hero */}
      <Hero
        onNavigateProducts={() => onNavigateTab('products')}
        onNavigatePuppies={() => onNavigateTab('puppies')}
      />

      {/* 2. Two Equal-Weight Entry Cards */}
      <EntryCards
        onSelectPuppies={() => onNavigateTab('puppies')}
        onSelectProducts={() => onNavigateTab('products')}
      />

      {/* 3. Featured Products Strip (6 items) */}
      <section className="py-12 sm:py-16 bg-[#F6EFE4] dark:bg-[#14181A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
                Popular in Thanesar
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
                Featured Dog Food & Essentials
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('products')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B5533C] hover:underline cursor-pointer min-h-[44px]"
            >
              <span>View All Products & Prices</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => {
              const inCart = cartItems.some((ci) => ci.slug === p.slug);
              return (
                <div
                  key={p.slug}
                  className="group bg-white dark:bg-[#1D2326] rounded-2xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setActiveProduct(p)}
                      className="relative aspect-4/3 overflow-hidden bg-[#F6EFE4] dark:bg-[#14181A] cursor-pointer"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/90 dark:bg-[#14181A]/90 text-[#1F3A2E] dark:text-emerald-400">
                          {p.inStock ? 'In Stock' : 'Order on WhatsApp'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-2">
                      <div className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3]">
                        <span className="font-semibold text-[#B5533C]">{p.brand}</span> · {p.packSize}
                      </div>

                      <h3
                        onClick={() => setActiveProduct(p)}
                        className="font-heading text-base font-bold text-[#14181A] dark:text-[#F6EFE4] group-hover:text-[#B5533C] transition-colors cursor-pointer line-clamp-1"
                      >
                        {p.name}
                      </h3>

                      <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] line-clamp-2">
                        {p.description}
                      </p>

                      <div className="pt-2 text-xs font-bold text-[#14181A] dark:text-[#F6EFE4]">
                        {p.price !== null ? `₹${p.price}` : 'Price on WhatsApp'}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0">
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
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition-colors cursor-pointer min-h-[44px] ${
                        inCart
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#1F3A2E] text-white hover:bg-[#15271F]'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{t.products.inEnquiry}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-[#E8A33D]" />
                          <span>{t.products.addToEnquiry}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Available Puppies Preview (3 items) */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#1D2326]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E] dark:text-emerald-400">
                Ethical Breeding · Haryana
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
                Healthy Puppies Ready for Loving Homes
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('puppies')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F3A2E] dark:text-emerald-400 hover:underline cursor-pointer min-h-[44px]"
            >
              <span>View All Available Puppies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPuppies.map((pup) => {
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
                  className="bg-[#F6EFE4] dark:bg-[#14181A] rounded-2xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-xs overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setActivePuppy(pup)}
                      className="relative aspect-4/3 bg-[#14181A] cursor-pointer group overflow-hidden"
                    >
                      <img
                        src={pup.images[0]}
                        alt={pup.breed}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          pup.status === 'Available' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                        }`}>
                          {pup.status}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Gallery</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-lg font-bold text-[#14181A] dark:text-[#F6EFE4]">
                          {pup.breed}
                        </h3>
                        <span className="text-xs font-semibold text-[#5E696E] dark:text-[#A2ADB3]">
                          {pup.ageWeeks} wks
                        </span>
                      </div>
                      <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
                        {pup.coat} · {pup.gender}
                      </p>
                      <div className="text-[11px] text-[#5E696E] dark:text-[#A2ADB3] flex items-center gap-1 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1F3A2E] dark:text-emerald-400" />
                        <span className="truncate">Vaccinated & Vet-Certified</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-xs min-h-[44px] transition-colors"
                    >
                      <span>Inquire / Reserve</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Starter Kit Bundle Block */}
      <StarterBundle />

      {/* 6. Food Quiz */}
      <FoodQuiz />

      {/* 7. Instagram Wall */}
      <InstagramWall />

      {/* 8. Reviews & FAQ */}
      <ReviewsAndFAQ />

      {/* 9. Location, Live Hours & Map Block */}
      <LocationMapBlock />

      {/* Modals */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />

      <PuppyLightboxModal
        puppy={activePuppy}
        onClose={() => setActivePuppy(null)}
      />
    </div>
  );
};
