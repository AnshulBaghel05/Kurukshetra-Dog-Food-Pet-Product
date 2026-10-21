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

  let msg = `*Namaste Kurukshetra Pet Store!* 🐾\n`;
  msg += `I would like to place an order for the following pet supplies:\n\n`;

  let totalAmount = 0;
  let hasNullPrice = false;

  items.forEach((item, idx) => {
    const itemTotal = item.price !== null ? `₹${item.price * item.quantity}` : `[Ask price]`;
    if (item.price !== null) {
      totalAmount += item.price * item.quantity;
    } else {
      hasNullPrice = true;
    }
    msg += `${idx + 1}. *${item.quantity}x ${item.name}* (${item.packSize}) — ${itemTotal}\n`;
  });

  msg += `\n*Total Items:* ${items.reduce((acc, curr) => acc + curr.quantity, 0)}`;
  if (!hasNullPrice && totalAmount > 0) {
    msg += `\n*Order Total:* ₹${totalAmount}`;
  } else {
    msg += `\n*Total:* Please confirm item availability and final total`;
  }

  msg += `\n*Fulfillment Mode:* ${fulfillment === 'delivery' ? 'Same-Day Home Delivery (Kurukshetra Area)' : 'Store Pickup (Thanesar Counter)'}`;
  if (customerName) {
    msg += `\n*Customer Name:* ${customerName}`;
  }
  if (customerArea) {
    msg += `\n*Delivery Address / Area:* ${customerArea}`;
  }

  msg += `\n\nPlease confirm availability and delivery dispatch time. Thank you!`;
  return msg;
}

export function generateCategoryEnquiryMessage(categoryName: string): string {
  return `*Namaste Kurukshetra Pet Store!* 🐾\nI am browsing your catalog for *${categoryName}*. Could you please let me know what brands and pack sizes you currently have in stock at your Thanesar store?`;
}

export function generateProductEnquiryMessage(productName: string, packSize: string): string {
  return `*Namaste!* I would like to order or check availability for *${productName}* (${packSize}) at your Thanesar store. Do you have this in stock for immediate delivery / pickup?`;
}
