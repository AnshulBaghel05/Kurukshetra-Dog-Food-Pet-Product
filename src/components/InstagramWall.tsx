import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/site';

interface PostThumbnail {
  id: number;
  image: string;
  caption: string;
  likes: string;
}

export const InstagramWall: React.FC = () => {
  const posts: PostThumbnail[] = [
    {
      id: 1,
      image: "/images/hero_pet_supplies_store.jpg",
      caption: "Freshly restocked premium dry kibble and nutrition aisles at our Thanesar store counter",
      likes: "482"
    },
    {
      id: 2,
      image: "/images/products/cat_whiskas_ocean_fish.jpg",
      caption: "Feline nutrition restock: Whiskas Ocean fish and Sheba tender chicken gravy pouches in store",
      likes: "518"
    },
    {
      id: 3,
      image: "/images/products/dog_orthopedic_bed.jpg",
      caption: "Luxury orthopedic memory foam dog beds now available in Large & XL sizes",
      likes: "614"
    },
    {
      id: 4,
      image: "/images/products/dog_harness_leash_set.jpg",
      caption: "Reflective no-pull padded walking harnesses fitted for local Kurukshetra dogs",
      likes: "392"
    },
    {
      id: 5,
      image: "/images/products/dog_dental_treats_chew.jpg",
      caption: "Healthy dental chews and roasted real meat jerky snacks for daily training",
      likes: "345"
    },
    {
      id: 6,
      image: "/images/products/bird_food_seed_mix.jpg",
      caption: "Clean gourmet triple-cleaned seed mixes for budgies, lovebirds, and cockatiels",
      likes: "288"
    },
    {
      id: 7,
      image: "/images/products/fish_food_aquarium_flakes.jpg",
      caption: "Aqua-Vital color-enhancing tropical fish flakes for crystal clear aquarium water",
      likes: "310"
    },
    {
      id: 8,
      image: "/images/products/cat_litter_clumping.jpg",
      caption: "Instant clumping odor-lock bentonite cat litter with soothing lavender scent",
      likes: "420"
    },
    {
      id: 9,
      image: "/images/products/small_pet_rabbit_food.jpg",
      caption: "Fragrant sun-cured timothy grass hay and botanical pellets for rabbits and guinea pigs",
      likes: "275"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F6EFE4] dark:bg-[#1D2326] border-t border-[#14181A]/10 dark:border-[#F6EFE4]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B5533C] mb-1">
              <Instagram className="w-4 h-4" />
              <span>{siteConfig.instagramHandle} · Community of Pet Parents</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
              Daily Updates from Our Store & Happy Pets
            </h2>
            <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] mt-1">
              Real product arrivals, pet care advice, and customer highlights in Kurukshetra.
            </p>
          </div>

          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14181A] dark:bg-white text-white dark:text-[#14181A] hover:bg-[#B5533C] hover:text-white transition-colors text-xs font-semibold shrink-0 min-h-[44px]"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow {siteConfig.instagramHandle}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* 9-Image Static Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white dark:bg-[#14181A] border border-[#14181A]/10 dark:border-[#F6EFE4]/10 shadow-2xs cursor-pointer block"
            >
              <img
                src={post.image}
                alt={post.caption}
                width={400}
                height={400}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 sm:p-4 flex flex-col justify-end text-white">
                <p className="text-xs line-clamp-2 font-medium">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 mt-1">
                  <span>♥ {post.likes}</span>
                  <span>· View on Instagram</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
