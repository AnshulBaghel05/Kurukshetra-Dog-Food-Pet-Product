/**
 * Site Configuration for Kurukshetra Pet Food & Pet Supplies (HR Pets)
 * Dedicated pet food, treats, toys, healthcare, and pet accessories store in Thanesar, Kurukshetra, Haryana.
 */

export interface BusinessHours {
  open: string;  // 24hr format "09:30"
  close: string; // 24hr format "20:30"
  closed?: boolean;
}

export interface SiteConfig {
  brandName: string;
  brandShortName: string;
  instagramHandle: string;
  tagline: string;
  taglineHindi: string;
  logoText: string;
  phone: string;
  phoneClean: string;
  whatsappNumber: string;
  whatsappNumberClean: string;
  address: string;
  addressHindi: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  mapsUrl: string;
  embedMapUrl: string;
  lat: number;
  lng: number;
  hours: Record<string, BusinessHours>;
  social: {
    instagram: string;
    youtube: string;
    threads: string;
  };
  pricesUpdatedOn: string;
  trustMetrics: {
    productsCount: string;
    ordersDelivered: string;
    genuineGuarantee: string;
    googleRating: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: "Kurukshetra Pet Food & Pet Supplies",
  brandShortName: "HR Pets",
  instagramHandle: "@kurukshetrakennel",
  tagline: "Premium pet food, treats, grooming, and pet supplies in Thanesar, Kurukshetra",
  taglineHindi: "थानेसर, कुरुक्षेत्र में प्रीमियम डॉग फ़ूड, कैट फ़ूड, ग्रूमिंग और पेट सप्लाइज़",
  logoText: "Kurukshetra Pet Store",
  
  phone: "+91 98960 00000",
  phoneClean: "+919896000000",
  whatsappNumber: "+91 98960 00000",
  whatsappNumberClean: "919896000000",
  
  address: "Near Pipli Road / Main Market, Thanesar, Kurukshetra, Haryana 136118",
  addressHindi: "पिपली रोड / मुख्य बाज़ार के पास, थानेसर, कुरुक्षेत्र, हरियाणा 136118",
  city: "Thanesar",
  district: "Kurukshetra",
  state: "Haryana",
  pincode: "136118",
  mapsUrl: "https://maps.google.com/?q=Thanesar,Kurukshetra,Haryana",
  embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55288.7505193952!2d76.8122676579899!3d29.96951239100146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e4659b8c04ec5%3A0xb231c51877dc1120!2sThanesar%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  lat: 29.9695,
  lng: 76.8783,

  hours: {
    monday: { open: "09:30", close: "20:30" },
    tuesday: { open: "09:30", close: "20:30" },
    wednesday: { open: "09:30", close: "20:30" },
    thursday: { open: "09:30", close: "20:30" },
    friday: { open: "09:30", close: "20:30" },
    saturday: { open: "09:30", close: "20:30" },
    sunday: { open: "09:30", close: "20:30" },
  },

  social: {
    instagram: "https://www.instagram.com/kurukshetrakennel",
    youtube: "https://www.youtube.com/@kurukshetrapets",
    threads: "https://www.threads.net/@kurukshetrakennel",
  },

  pricesUpdatedOn: "October 2026",

  trustMetrics: {
    productsCount: "500+ Items",
    ordersDelivered: "2,400+ Delivered",
    genuineGuarantee: "100% Genuine",
    googleRating: "4.9 ★ Rating",
  },
};
