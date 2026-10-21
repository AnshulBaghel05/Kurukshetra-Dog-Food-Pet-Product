import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CategoriesViewProps {
  onSelectCategory: (petType: string, category?: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  const { lang } = useLanguage();

  const petSections = [
    {
      id: 'dog',
      name: 'Dog Supplies & Nutrition',
      nameHi: 'कुत्तों का भोजन और सामान',
      tagline: 'Kibble, joint care, treats, orthopedic beds & strong harnesses',
      image: '/images/products/dog_food_bag_premium.jpg',
      badge: 'Bestselling Department',
      subcategories: [
        { label: 'Large Breed & Puppy Food', cat: 'food' },
        { label: 'Dental Chews & Treats', cat: 'treats' },
        { label: 'Harnesses & Leashes', cat: 'accessories' },
        { label: 'Herbal Shampoos', cat: 'grooming' },
        { label: 'Bone & Joint Tablets', cat: 'health' },
      ],
    },
    {
      id: 'cat',
      name: 'Cat Food & Essentials',
      nameHi: 'बिल्लियों का भोजन और ज़रूरी सामान',
      tagline: 'Whiskas, Sheba gravy pouches, clumping litter & grooming',
      image: '/images/products/cat_whiskas_ocean_fish.jpg',
      badge: 'Popular for Felines',
      subcategories: [
        { label: 'Dry Ocean Fish Food', cat: 'food' },
        { label: 'Wet Food Gravy Pouches', cat: 'food' },
        { label: 'Odor-Lock Bentonite Litter', cat: 'grooming' },
      ],
    },
    {
      id: 'bird',
      name: 'Bird Seed & Aviary Care',
      nameHi: 'पक्षियों का दाना और पोषण',
      tagline: 'Triple-cleaned millets, seed blends, and dried fruit mixes',
      image: '/images/products/bird_food_seed_mix.jpg',
      badge: 'Clean Gourmet Seeds',
      subcategories: [
        { label: 'Budgie & Parrot Blends', cat: 'food' },
        { label: 'Golden Millets & Treats', cat: 'food' },
      ],
    },
    {
      id: 'fish',
      name: 'Aquarium & Fish Care',
      nameHi: 'मछलियों का आहार और एक्वेरियम',
      tagline: 'High-protein spirulina flakes, tropical pellets & clean water diet',
      image: '/images/products/fish_food_aquarium_flakes.jpg',
      badge: 'Clear Water Formula',
      subcategories: [
        { label: 'Tropical Flake Food', cat: 'food' },
        { label: 'Color-Enhancing Pellets', cat: 'food' },
      ],
    },
    {
      id: 'small-pet',
      name: 'Rabbits & Small Pets',
      nameHi: 'खरगोश और छोटे पालतू जीव',
      tagline: 'Sun-cured timothy grass hay, alfalfa pellets & botanical chews',
      image: '/images/products/small_pet_rabbit_food.jpg',
      badge: 'High Fiber Grass',
      subcategories: [
        { label: 'Sun-Cured Timothy Hay', cat: 'food' },
        { label: 'Botanical Pellets', cat: 'food' },
      ],
    },
  ];

  const brands = [
    'Royal Canin',
    'Farmina N&D',
    'Drools Focus',
    'Whiskas',
    'Sheba',
    'Himalaya Pet',
    'Gnawlers',
    'Beaphar',
    'Aqua-Vital',
    'Aviary’s Finest',
  ];

  return (
    <div className="py-6 sm:py-10 bg-[#F6EFE4] dark:bg-[#14181A] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
            Explore by Pet Category
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
            {lang === 'hi' ? 'पालतू जानवरों के अनुसार खरीदारी करें' : 'Shop Pet Food & Supplies by Category'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] leading-relaxed">
            From vet-recommended nutrition to everyday grooming and housing accessories in Thanesar, Kurukshetra. 100% genuine guaranteed inventory.
          </p>
        </div>

        {/* Pet Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {petSections.map((sec) => (
            <div
              key={sec.id}
              className="bg-white dark:bg-[#1D2326] rounded-2xl sm:rounded-3xl border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                <div
                  onClick={() => onSelectCategory(sec.id)}
                  className="relative aspect-4/3 bg-[#F6EFE4] dark:bg-[#14181A] cursor-pointer group overflow-hidden"
                >
                  <img
                    src={sec.image}
                    alt={sec.name}
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 dark:bg-[#14181A]/95 text-[#1F3A2E] dark:text-emerald-400 shadow-xs">
                      {sec.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <h2
                      onClick={() => onSelectCategory(sec.id)}
                      className="font-heading text-xl font-bold text-[#14181A] dark:text-[#F6EFE4] hover:text-[#B5533C] cursor-pointer transition-colors"
                    >
                      {lang === 'hi' ? sec.nameHi : sec.name}
                    </h2>
                    <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3] mt-1">
                      {sec.tagline}
                    </p>
                  </div>

                  {/* Subcategories list */}
                  <div className="pt-2 border-t border-[#14181A]/5 dark:border-[#F6EFE4]/5 space-y-1.5">
                    {sec.subcategories.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => onSelectCategory(sec.id, sub.cat)}
                        className="w-full text-left flex items-center justify-between text-xs py-1 text-[#14181A] dark:text-[#F6EFE4] hover:text-[#B5533C] cursor-pointer group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {sub.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:text-[#B5533C]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => onSelectCategory(sec.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1F3A2E] text-white hover:bg-[#15271F] font-semibold text-xs transition-colors cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
                >
                  <span>Browse All {sec.name.split(' ')[0]} Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Authenticity Showcase */}
        <div className="bg-white dark:bg-[#1D2326] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B5533C]">
              Direct Brand Partnerships
            </span>
            <h2 className="font-heading text-2xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
              Authorized Domestic & Imported Brands
            </h2>
            <p className="text-xs text-[#5E696E] dark:text-[#A2ADB3]">
              Every bag, can, and supplement in our Thanesar store comes with genuine batch seals and verifiable expiry dates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {brands.map((b, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#F6EFE4] dark:bg-[#14181A] rounded-xl border border-[#14181A]/5 dark:border-[#F6EFE4]/5 text-center"
              >
                <span className="text-xs font-bold text-[#14181A] dark:text-[#F6EFE4]">
                  {b}
                </span>
                <span className="block text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                  ✓ Verified Stock
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
