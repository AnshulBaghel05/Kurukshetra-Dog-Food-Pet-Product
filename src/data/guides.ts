export interface GuideArticle {
  slug: string;
  title: string;
  titleHindi: string;
  excerpt: string;
  excerptHindi: string;
  date: string;
  readTime: string;
  category: string;
  disclaimer?: string;
  content: string[];
}

export const guidesData: GuideArticle[] = [
  {
    slug: "best-dog-food-thanesar-how-to-choose",
    title: "Best Dog Food in Thanesar: How to Choose for Your Dog's Breed and Climate",
    titleHindi: "थानेसर में सबसे अच्छा डॉग फ़ूड: अपनी नस्ल और मौसम के अनुसार कैसे चुनें",
    excerpt: "A practical buyer's guide for pet parents in Kurukshetra navigating protein levels, dry vs wet kibble, and monsoon humidity storage.",
    excerptHindi: "कुरुक्षेत्र के पेट पैरेंट्स के लिए प्रोटीन स्तर, सूखा बनाम गीला खाना और नमी से बचाव का व्यावहारिक गाइड।",
    date: "2026-10-15",
    readTime: "5 min read",
    category: "Dog Nutrition",
    disclaimer: "General guidance only. Not veterinary advice. Individual dogs have unique caloric and metabolic requirements.",
    content: [
      "Choosing the right dog food in Thanesar requires balancing three key factors: your dog's activity level, their breed size (e.g. large German Shepherds vs toy Pomeranians), and the distinct seasonal extremes of Haryana—blistering dry summers, high monsoon humidity, and chilly winter months.",
      "1. Check the First Three Ingredients: The first ingredient should always be a named animal protein (like deboned chicken, lamb meal, or whole eggs), not unidentified grain cereals or wheat gluten fillers.",
      "2. Storage in Haryana Weather: During Kurukshetra's humid July-September months, kibble stored improperly can absorb moisture and develop harmful molds. Always store dry food in its original bag sealed inside an airtight food-grade plastic or steel container away from direct sunlight.",
      "3. Local Water & Hydration: Kurukshetra water can have high mineral content in certain sectors. Always provide filtered, fresh drinking water and ensure your dog drinks adequately when eating dry kibble.",
      "Need personalized advice for your dog? Message our Thanesar store on WhatsApp with their age, weight, and current diet for a customized recommendation."
    ]
  },
  {
    slug: "cat-nutrition-wet-vs-dry-hydration-guide",
    title: "Cat Nutrition in India: Balancing Dry Kibble & Wet Pouches for Urinary Health",
    titleHindi: "बिल्लियों का सही पोषण: यूरिनरी हेल्थ के लिए सूखा खाना और गीले पाउच का संतुलन",
    excerpt: "Why cats naturally drink very little water and how pairing quality kibble with wet gravy pouches prevents common feline kidney problems.",
    excerptHindi: "बिल्लियां कम पानी क्यों पीती हैं और सूखा व गीला खाना मिलाकर खिलाना क्यों जरूरी है।",
    date: "2026-10-12",
    readTime: "5 min read",
    category: "Cat Care",
    disclaimer: "Educational information for pet parents. Always consult a veterinarian if your cat exhibits straining or changes in urination.",
    content: [
      "Felines evolved as desert predators, deriving the majority of their hydration directly from prey. Consequently, domestic cats have an inherently low thirst drive and often do not drink enough standing bowl water.",
      "1. The Risk of Dry-Only Diets: Feeding cats 100% dry kibble without sufficient moisture intake concentrates their urine, which can lead to painful feline lower urinary tract disease (FLUTD) and kidney strain over time.",
      "2. The Gravy Pouch Solution: Incorporate at least one wet gravy pouch (such as Whiskas Ocean Fish gravy or Sheba Chicken/Tuna fillet) daily into their meal routine. Wet food contains approximately 75-82% moisture, keeping their urinary tract naturally flushed.",
      "3. Ceramic & Stainless Steel Bowls: Cats dislike their whiskers touching narrow plastic bowl edges ('whisker fatigue'). Use wide, shallow stainless steel or ceramic saucers placed away from their litter tray.",
      "Visit our Kurukshetra store or order fresh Whiskas and Sheba multipacks with fast same-day local delivery."
    ]
  },
  {
    slug: "caring-for-pets-haryana-summers",
    title: "Caring for Dogs in Haryana Summers: Heat Protection, Coat Care & Hydration",
    titleHindi: "हरियाणा की गर्मियों में कुत्तों की देखभाल: गर्मी से बचाव, कोट केयर और खानपान",
    excerpt: "Essential cooling strategies, paw protection on hot tarmac, and summer feeding adjustments for double-coated breeds in North India.",
    excerptHindi: "उत्तर भारत की 42°C+ गर्मी में कुत्तों के लिए वॉक का सही समय, पंजे की सुरक्षा और हल्के भोजन के सुझाव।",
    date: "2026-10-05",
    readTime: "6 min read",
    category: "Seasonal Wellness",
    disclaimer: "General welfare recommendations. For symptoms of heat exhaustion (excessive panting, glassed eyes, vomiting), seek immediate veterinary care.",
    content: [
      "When temperatures in Thanesar and Pipli cross 42°C in May and June, companion dogs need thoughtful adjustments to their routine, exercise, and diet.",
      "1. Never Shave a Double Coat: Shaving dogs like German Shepherds, Golden Retrievers, or Pomeranians removes their natural thermal insulation barrier and exposes vulnerable skin to sunburn, heatstroke, and insect bites. Regular deshedding with an undercoat rake is vastly superior.",
      "2. Asphalt Check & Walking Schedule: Walk exclusively before 6:30 AM or after 8:00 PM. Test the road with the back of your hand: if the asphalt feels too hot after 7 seconds, it will burn your dog's sensitive paw pads.",
      "3. Summer Diet Adjustments: Appetite frequently dips during high heat. Feed during the coolest morning and night hours. Light additions like curd (dahi), bone broth ice pops, or watermelon slices (seeds removed) provide soothing hydration.",
      "4. Tick & Flea Prevention: Haryana's summer and monsoon months see a spike in ticks. Use herbal anti-tick shampoos and veterinarian-approved spot-on treatments regularly."
    ]
  },
  {
    slug: "aquarium-fish-care-water-feeding-guide",
    title: "Beginner's Guide to Aquarium Fish: Feeding Schedules & Water Conditioning",
    titleHindi: "एक्वेरियम और रंगीन मछलियों की देखभाल: सही दाना और पानी साफ़ रखने का तरीका",
    excerpt: "How to avoid overfeeding tropical fish, maintaining proper dissolved oxygen, and treating Kurukshetra tap water for healthy aquariums.",
    excerptHindi: "मछलियों को ज़रूरत से ज़्यादा खाना खिलाने से कैसे बचें और पानी का संतुलन कैसे बनाए रखें।",
    date: "2026-09-22",
    readTime: "4 min read",
    category: "Aquarium Care",
    disclaimer: "General hobbyist guide. Water parameters vary based on specific freshwater or planted community tank species.",
    content: [
      "Keeping healthy, colorful tropical fish in Kurukshetra is rewarding, but the #1 mistake new aquarium keepers make is overfeeding and poor water conditioning.",
      "1. The 2-Minute Feeding Rule: Fish stomachs are tiny—roughly the size of their eye. Feed only what your fish can completely consume within 2 minutes once or twice daily. Uneaten flakes sink to the bottom, rot, and cause dangerous ammonia spikes.",
      "2. Tap Water Chlorine Treatment: Municipal water in Haryana contains chlorine that is toxic to delicate fish gills. Always treat new water with an aquarium water conditioner or dechlorinator before adding it to the tank.",
      "3. Partial Water Changes: Never replace 100% of your aquarium water at once, as this destroys beneficial nitrifying bacteria. Perform a gentle 20-25% partial water change every 10 to 14 days.",
      "We stock Aqua-Vital tropical flakes, spirulina granules, water conditioners, and sponge filters at our Thanesar retail counter."
    ]
  }
];
