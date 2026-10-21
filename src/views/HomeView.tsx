import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Check, ShieldCheck, Sparkles, Truck, CheckCircle2 } from 'lucide-react';
import { Hero } from '../components/Hero';
import { EntryCards } from '../components/EntryCards';
import { StarterBundle } from '../components/StarterBundle';
import { FoodQuiz } from '../components/FoodQuiz';
import { InstagramWall } from '../components/InstagramWall';
import { ReviewsAndFAQ } from '../components/ReviewsAndFAQ';
import { LocationMapBlock } from '../components/LocationMapBlock';
import { ProductDetailModal, ProductItem } from '../components/ProductDetailModal';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import rawProducts from '../data/products.json';

const products = rawProducts as ProductItem[];

interface HomeViewProps {
  onNavigateTab: (tab: string, categoryFilter?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateTab }) => {
  const { t } = useLanguage();
  const { addItem, items: cartItems } = useCart();
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);

  const featuredProducts = products.slice(0, 6);

  const petDepartments = [
    {
      id: 'dog',
      title: 'Dogs & Puppies',
      subtitle: 'Breed nutrition, orthopedic beds, harness sets & dental chews',
      image: '/images/products/dog_food_bag_premium.jpg',
      badge: 'Popular',
      itemCount: '250+ Products',
      color: 'border-[#B5533C]/20 hover:border-[#B5533C]',
    },
    {
      id: 'cat',
      title: 'Cats & Kittens',
      subtitle: 'Whiskas, Sheba pouches, clumping litter & grooming tools',
      image: '/images/products/cat_whiskas_ocean_fish.jpg',
      badge: 'Essential',
      itemCount: '120+ Products',
      color: 'border-[#1F3A2E]/20 hover:border-[#1F3A2E]',
    },
    {
      id: 'fish',
      title: 'Aquarium & Fish',
      subtitle: 'Aqua-Vital flakes, spirulina pellets, filters & water conditioners',
      image: '/images/products/fish_food_aquarium_flakes.jpg',
      badge: 'Fresh Stock',
      itemCount: '45+ Products',
      color: 'border-blue-500/20 hover:border-blue-500',
    },
    {
      id: 'bird',
      title: 'Birds & Parrots',
      subtitle: 'Aviary gourmet seed blends, cuttlefish bone & bird treats',
      image: '/images/products/bird_food_seed_mix.jpg',
      badge: '100% Pure',
      itemCount: '30+ Products',
      color: 'border-amber-500/20 hover:border-amber-500',
    },
    {
      id: 'small-pet',
      title: 'Rabbits & Small Pets',
      subtitle: 'Timothy hay, botanical pellet blends, vitamins & soft bedding',
      image: '/images/products/small_pet_rabbit_food.jpg',
      badge: 'High Fiber',
      itemCount: '25+ Products',
      color: 'border-emerald-500/20 hover:border-emerald-500',
    },
  ];

  return (
    <div>
      {/* 1. Hero */}
      <Hero
        onNavigateProducts={() => onNavigateTab('products')}
        onNavigateCategories={() => onNavigateTab('categories')}
      />

      {/* 2. Equal-Weight Department Entry Cards */}
      <EntryCards
        onSelectDog={() => onNavigateTab('products', 'dog')}
        onSelectCat={() => onNavigateTab('products', 'cat')}
      />

      {/* 3. Featured Products Strip (6 real items) */}
      <section className="py-12 sm:py-16 bg-[#F6EFE4] dark:bg-[#14181A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
                Top Rated in Thanesar
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
                Featured Pet Food & Essentials
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
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/95 dark:bg-[#14181A]/95 text-[#1F3A2E] dark:text-emerald-400 shadow-xs">
                          {p.inStock ? 'In Stock' : 'Order on WhatsApp'}
                        </span>
                        {p.mrp && p.price && p.mrp > p.price && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#B5533C] text-white shadow-xs">
                            Save ₹{p.mrp - p.price}
                          </span>
                        )}
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

                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-[#14181A] dark:text-[#F6EFE4]">
                          {p.price !== null ? `₹${p.price}` : 'Price on WhatsApp'}
                        </span>
                        {p.mrp && (
                          <span className="text-xs text-[#5E696E] dark:text-[#A2ADB3] line-through">
                            ₹{p.mrp}
                          </span>
                        )}
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

      {/* 4. Shop By Pet Departments Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#1D2326]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3A2E] dark:text-emerald-400">
                Complete Animal Care Range
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4] mt-1">
                Shop Supplies by Pet
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('categories')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F3A2E] dark:text-emerald-400 hover:underline cursor-pointer min-h-[44px]"
            >
              <span>Explore All Departments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {petDepartments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => onNavigateTab('products', dept.id)}
                className={`group cursor-pointer rounded-2xl bg-[#F6EFE4] dark:bg-[#14181A] border ${dept.color} p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300`}
              >
                <div className="space-y-4">
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-black/5">
                    <img
                      src={dept.image}
                      alt={dept.title}
                      width={380}
                      height={240}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-black/90 text-[#14181A] dark:text-[#F6EFE4] shadow-xs">
                        {dept.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#1F3A2E] text-white shadow-xs">
                        {dept.itemCount}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#14181A] dark:text-[#F6EFE4] group-hover:text-[#B5533C] transition-colors">
                      {dept.title}
                    </h3>
                    <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] mt-1 line-clamp-2">
                      {dept.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10 flex items-center justify-between text-xs font-bold text-[#B5533C]">
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Authenticity Trust Strip */}
          <div className="mt-8 rounded-2xl bg-[#1F3A2E] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-[#E8A33D]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold">Fast Same-Day Delivery in Kurukshetra</h3>
                <p className="text-xs text-white/80 max-w-lg mt-0.5">
                  Order any heavy food bag, cat litter, or pet medicine before 4:00 PM for prompt doorstep delivery to Thanesar, Sector 3, 5, 7, 13, and University area.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-[#E8A33D]" />
                <span>100% Brand Sealed Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Starter Kit Bundle Block */}
      <StarterBundle />

      {/* 6. Food Quiz (Multi-Pet) */}
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
    </div>
  );
};
