# Kurukshetra Dog Food & Pet Products (HR Pets)
> Production-ready, mobile-first website for a local pet business in Thanesar / Kurukshetra, Haryana, India.

---

## 📁 File Tree Overview

```text
├── index.html                     # HTML5 entry point with preloaded Google Fonts & JSON-LD PetStore Schema
├── metadata.json                  # Applet metadata
├── package.json                   # Project scripts and dependencies
├── vite.config.ts                 # Vite + Tailwind v4 + React plugin configuration
├── tsconfig.json                  # TypeScript compiler settings
├── /public/
│   ├── sw.js                      # Offline caching service worker for contact info
│   ├── manifest.json              # PWA manifest
│   ├── robots.txt                 # Search engine crawler directives
│   ├── sitemap.xml                # Multi-language sitemap for local SEO
│   └── /images/
│       └── README.md              # Owner photography guidelines & exact shot checklist
└── /src/
    ├── main.tsx                   # React root mount
    ├── App.tsx                    # Main app with client router, SEO titles & context providers
    ├── index.css                  # Tailwind CSS, custom design tokens, charpai textures, fonts
    ├── /config/
    │   ├── site.ts                # Central configuration: brand name, phone, hours, placeholders
    │   └── translations.ts        # Complete English & Hindi (हिन्दी) translation dictionary
    ├── /context/
    │   ├── CartContext.tsx        # In-memory + session storage enquiry cart state
    │   └── LanguageContext.tsx    # Persistent English / Hindi switcher
    ├── /data/
    │   ├── products.json          # 12 Sample products with nutritional specs & feeding tables
    │   ├── puppies.json           # 4 Sample puppies with welfare notes and vaccination cards
    │   └── guides.ts              # 4 SEO starter care articles for Haryana climate
    ├── /utils/
    │   ├── hours.ts               # Asia/Kolkata (IST) Open/Closed calculation engine
    │   └── whatsapp.ts            # URL-safe prefilled WhatsApp order & enquiry generator
    ├── /components/
    │   ├── Navbar.tsx             # Sticky header, brand wordmark, language toggle, cart trigger
    │   ├── MobileActionBar.tsx    # Mobile sticky bottom bar (Call | WhatsApp | Directions)
    │   ├── EnquiryDrawer.tsx      # Slide-out drawer with fulfillment picker & WhatsApp checkout
    │   ├── Hero.tsx               # Hero banner with what & where, looping reel, trust strip
    │   ├── EntryCards.tsx         # "Find a Puppy" and "Shop Food & Supplies" entry blocks
    │   ├── StarterBundle.tsx      # Puppy Parent Starter Kit bundle highlight
    │   ├── FoodQuiz.tsx           # 4-step interactive nutrition quiz with catalog matching
    │   ├── InstagramWall.tsx      # Privacy-friendly 9-photo static wall linking to @kurukshetrakennel
    │   ├── ReviewsAndFAQ.tsx      # Client reviews & accessible FAQ accordion with local SEO schema
    │   ├── LocationMapBlock.tsx   # Live store hours badge, embedded Google Map & directions
    │   ├── ProductDetailModal.tsx # Product details, pack size, schema markup & feeding table
    │   ├── PuppyLightboxModal.tsx # High-res puppy photo viewer with health notes
    │   ├── FloatingWhatsApp.tsx   # Context-aware floating WhatsApp button
    │   └── Footer.tsx             # NAP, hours, social links & legal disclaimer
    └── /views/
        ├── HomeView.tsx           # Assembled homepage
        ├── ProductsView.tsx       # Shareable catalog with search, filter tabs, in-stock toggle
        ├── PuppiesView.tsx        # Available puppies with breed/status filters & welfare block
        ├── AboutView.tsx          # Founder story, open kennel setting & YouTube tour facade
        ├── GuidesView.tsx         # 4 Local SEO articles with medical disclaimers
        └── ContactView.tsx        # Full contact page, live hours & WhatsApp enquiry generator
```

---

## 🚀 Quickstart & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will boot on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

---

## ✏️ How the Owner Edits Products and Puppies

All business data is intentionally separated from code components:

1. **Brand, Phone, WhatsApp, and Address**:
   - Open `/src/config/site.ts`.
   - Update `phone`, `whatsappNumber`, `address`, `hours`, and `pricesUpdatedOn`.
2. **Products & Prices**:
   - Open `/src/data/products.json`.
   - Change `price: null` to a number (e.g. `price: 2850`) whenever distributor prices are set.
   - Set `inStock: true` or `false`.
3. **Available Puppies**:
   - Open `/src/data/puppies.json`.
   - Update `status` to `"Available"`, `"Reserved"`, or `"Sold"`.
   - Update `ageWeeks` and `vaccinationNote`.
4. **Registration / KCI Badges**:
   - Open `/src/config/site.ts`.
   - Add verified registration numbers to `registrationNumbers: ["KCI-123456"]`. If left empty `[]`, badges remain hidden per ethical breeding guardrails.

---

## ☁️ Deploying to Vercel (Static / Edge)

1. Push this repository to GitHub or GitLab.
2. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your site will be live worldwide in under 60 seconds with SSL and global CDN caching.

### Connecting a Custom Domain (e.g. `kurukshetrapets.in`)
1. Go to your Vercel Project Dashboard → **Settings** → **Domains**.
2. Enter your domain: `kurukshetrapets.in`.
3. Add the two DNS records in your domain registrar (GoDaddy, Namecheap, Google Domains):
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
4. SSL certificate provisions automatically within 10 minutes.

---

## 📊 Google Sheets to JSON Sync Script (Optional)

If the owner prefers managing products and inventory in a shared Google Sheet:

1. Create a Google Sheet with columns matching `/src/data/products.json`:
   `slug | name | brand | petType | category | lifeStage | packSize | price | inStock | description`
2. Go to **File → Share → Publish to web** as CSV.
3. Save this Node.js script in your project as `scripts/sync-sheets.mjs`:
```javascript
import fs from 'fs';
import https from 'https';

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv";

https.get(SHEET_CSV_URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const products = lines.slice(1).map(line => {
      const values = line.split(',');
      const item = {};
      headers.forEach((h, i) => {
        let val = values[i]?.trim();
        if (h === 'price') val = val === '' ? null : Number(val);
        if (h === 'inStock') val = val.toLowerCase() === 'true';
        if (h === 'tags') val = val ? val.split(';') : [];
        item[h] = val;
      });
      return item;
    });
    fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2));
    console.log(`Synced ${products.length} products successfully!`);
  });
});
```
4. Run `node scripts/sync-sheets.mjs` before deploying!

---

## 📍 Google Business Profile Optimization Checklist (Thanesar)

To maximize calls and map visits from local pet owners:

- [ ] **Name Consistency**: Ensure your Google Business Profile name matches the website exactly: `Kurukshetra Dog Food & Pet Products (HR Pets)`.
- [ ] **Primary Category**: Set primary category to **"Pet store"** and secondary category to **"Dog breeder"**.
- [ ] **Address & Pin**: Drop the pin accurately on Pipli Road / Thanesar to prevent confused buyers.
- [ ] **Website Link**: Add `https://kurukshetrapets.in?utm_source=google_business&utm_medium=organic&utm_campaign=gbp_listing` as the Website URL.
- [ ] **Phone Number**: List the primary phone number with `+91` format identical to `siteConfig.phoneClean`.
- [ ] **Opening Hours**: Set 09:30 AM – 08:30 PM (matching the live badge).
- [ ] **Products Section**: Upload top food bags (Royal Canin, Drools, Farmina) in Google Business Profile Products tab linking back to your `/products` page.

---

## 📱 Instagram "Link in Bio" Setup

Replace the existing single YouTube link in your Instagram bio with your new high-converting website:

1. Open Instagram on your mobile device.
2. Tap **Edit Profile** → **Links** → **Add External Link**.
3. Enter URL:
   `https://kurukshetrapets.in?utm_source=instagram&utm_medium=bio&utm_campaign=ig_profile`
4. Set Title: **"🐾 Puppies, Dog Food & Supplies (Thanesar)"**.
5. Add a line to your Instagram bio:
   *📍 Thanesar, Kurukshetra | 🐕 Healthy Puppies & Honest Pet Food | 💬 WhatsApp for Home Delivery 👇*

---

## ⚡ Lighthouse & Performance Verification Steps

1. Open Chrome in Incognito mode.
2. Navigate to your deployed production URL.
3. Open Chrome DevTools (`F12` or `Cmd+Option+I`) → Select **Lighthouse** tab.
4. Settings:
   - **Mode**: Navigation
   - **Device**: Mobile
   - **Categories**: Performance, Accessibility, Best Practices, SEO
5. Click **"Analyze page load"**.
   - Verified targets:
     - Performance: **95+**
     - Accessibility: **100**
     - Best Practices: **100**
     - SEO: **100**
     - LCP: < 2.0s on 4G

---

## 📋 Launch Readiness Checklist (Placeholders to Replace)

Before the grand public launch, verify and replace these items inside `/src/config/site.ts`:

- [ ] **Store Phone Number**: Replace `+91 98960 00000 [PLACEHOLDER]` with the verified mobile phone number.
- [ ] **WhatsApp Number**: Replace `+91 98960 00000 [PLACEHOLDER]` with the official WhatsApp business number.
- [ ] **Store Address**: Replace `Near Pipli Road / Main Market [PLACEHOLDER]` with the exact building / shop number in Thanesar.
- [ ] **Years in Business**: In `trustMetrics.yearsInBusiness`, replace placeholder with actual founding year.
- [ ] **Puppies Homed**: In `trustMetrics.puppiesHomed`, replace placeholder with confirmed pup count.
- [ ] **Google Rating**: In `trustMetrics.googleRating`, replace placeholder once 5+ Google reviews are recorded.
- [ ] **YouTube Channel Link**: Replace the placeholder YouTube channel URL.
- [ ] **Kennel Registration Numbers**: If registered with KCI or State Animal Welfare Board, insert numbers into `registrationNumbers: []`.
