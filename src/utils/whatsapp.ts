import { siteConfig } from '../config/site';

export interface CartItem {
  slug: string;
  name: string;
  brand: string;
  packSize: string;
  price: number | null;
  quantity: number;
}

export function buildWhatsAppUrl(message: string): string {
  const cleanNumber = siteConfig.whatsappNumberClean.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export function generateCartWhatsAppMessage(params: {
  items: CartItem[];
  fulfillment: 'pickup' | 'delivery';
  customerName?: string;
  customerArea?: string;
}): string {
  const { items, fulfillment, customerName, customerArea } = params;

  let msg = `*Namaste HR Pets / Kurukshetra Dog Food!* 🐾\n`;
  msg += `I would like to enquire / order the following items:\n\n`;

  let knownTotal = 0;
  let hasNullPrice = false;

  items.forEach((item, idx) => {
    const priceText = item.price !== null ? `₹${item.price * item.quantity}` : `[Ask price]`;
    if (item.price !== null) {
      knownTotal += item.price * item.quantity;
    } else {
      hasNullPrice = true;
    }
    msg += `${idx + 1}. *${item.quantity}x ${item.name}* (${item.packSize}) — ${priceText}\n`;
  });

  msg += `\n*Total Items:* ${items.reduce((acc, curr) => acc + curr.quantity, 0)}`;
  if (!hasNullPrice && knownTotal > 0) {
    msg += `\n*Estimated Total:* ₹${knownTotal}`;
  } else {
    msg += `\n*Total:* Please confirm item availability and prices`;
  }

  msg += `\n*Fulfillment:* ${fulfillment === 'delivery' ? 'Home Delivery (Kurukshetra Area)' : 'Store Pickup (Thanesar)'}`;
  if (customerName) {
    msg += `\n*Name:* ${customerName}`;
  }
  if (customerArea) {
    msg += `\n*Area / Colony:* ${customerArea}`;
  }

  msg += `\n\nPlease let me know availability and delivery timing. Thank you!`;
  return msg;
}

export function generatePuppyEnquiryMessage(puppy: {
  id: string;
  breed: string;
  coat: string;
  gender: string;
  ageWeeks: number;
}): string {
  return `*Namaste HR Pets!* 🐾\nI am interested in visiting the kennel to see the puppy:\n- *Breed:* ${puppy.breed} (${puppy.coat})\n- *Gender:* ${puppy.gender}\n- *Age:* ${puppy.ageWeeks} weeks\n- *Puppy ID:* ${puppy.id}\n\nCould you please share parent details, vaccination record card, and visiting hours for the Kurukshetra kennel? Thank you!`;
}

export function generateProductEnquiryMessage(productName: string, packSize: string): string {
  return `*Namaste!* I would like to check price and availability for *${productName}* (${packSize}) at your Thanesar store. Do you have this in stock?`;
}
