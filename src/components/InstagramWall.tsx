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
      image: "/images/puppy_german_shepherd.jpg",
      caption: "8-week-old long coat German Shepherd puppy at morning play in Kurukshetra",
      likes: "428"
    },
    {
      id: 2,
      image: "/images/puppy_labrador_golden.jpg",
      caption: "Golden Lab pup discovering grass in the shaded outdoor kennel run",
      likes: "512"
    },
    {
      id: 3,
      image: "/images/hero_kurukshetra_pet_store.jpg",
      caption: "Afternoon rest on the traditional charpai cot. Rural Haryana vibes",
      likes: "689"
    },
    {
      id: 4,
      image: "/images/about_kennel_kurukshetra.jpg",
      caption: "Clean, open-air kennel compound under mature neem shade",
      likes: "374"
    },
    {
      id: 5,
      image: "/images/dog_food_bag_premium.jpg",
      caption: "Fresh stock of high-protein puppy food arrived at our Thanesar store counter",
      likes: "295"
    },
    {
      id: 6,
      image: "/images/puppy_german_shepherd.jpg",
      caption: "Dewormed and certified vet check completed for this bundle of joy",
      likes: "441"
    },
    {
      id: 7,
      image: "/images/puppy_labrador_golden.jpg",
      caption: "Healthy coat and clear eyes: the result of wholesome maternal nutrition",
      likes: "389"
    },
    {
      id: 8,
      image: "/images/about_kennel_kurukshetra.jpg",
      caption: "Evening exercise run for our adult guardian German Shepherds",
      likes: "620"
    },
    {
      id: 9,
      image: "/images/hero_kurukshetra_pet_store.jpg",
      caption: "Meet the proud dam and sire on your weekend visit to Kurukshetra",
      likes: "530"
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
              <span>{siteConfig.instagramHandle} · 4.6K+ Community</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#14181A] dark:text-[#F6EFE4]">
              Daily Life at Our Kennel & Store
            </h2>
            <p className="text-xs sm:text-sm text-[#5E696E] dark:text-[#A2ADB3] mt-1">
              Real unfiltered photos from our Kurukshetra kennel and Thanesar store counter.
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
              {/* Overlay with caption on hover/touch */}
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
