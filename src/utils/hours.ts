import { BusinessHours } from '../config/site';

export interface StoreStatus {
  isOpen: boolean;
  statusText: string;
  nextTimeText: string;
}

/**
 * Calculates current open/closed status according to Asia/Kolkata (IST: UTC+05:30)
 */
export function getStoreStatus(hours: Record<string, BusinessHours>): StoreStatus {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  // Calculate current date/time in Asia/Kolkata
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000; // IST is UTC+5:30
  const istDate = new Date(utc + istOffset);

  const dayIndex = istDate.getDay();
  const currentDayName = days[dayIndex];
  const todayHours = hours[currentDayName];

  if (!todayHours || todayHours.closed) {
    return {
      isOpen: false,
      statusText: "Closed Today",
      nextTimeText: "Opens tomorrow at 09:30 AM"
    };
  }

  const currentMinutes = istDate.getHours() * 60 + istDate.getMinutes();

  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);

  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    const formattedClose = format12Hour(todayHours.close);
    return {
      isOpen: true,
      statusText: "Open Now",
      nextTimeText: `Closes at ${formattedClose}`
    };
  } else if (currentMinutes < openMinutes) {
    const formattedOpen = format12Hour(todayHours.open);
    return {
      isOpen: false,
      statusText: "Closed Now",
      nextTimeText: `Opens today at ${formattedOpen}`
    };
  } else {
    // Next day
    const nextDayIndex = (dayIndex + 1) % 7;
    const nextDayHours = hours[days[nextDayIndex]];
    const formattedOpen = nextDayHours ? format12Hour(nextDayHours.open) : "09:30 AM";
    return {
      isOpen: false,
      statusText: "Closed for Today",
      nextTimeText: `Opens tomorrow at ${formattedOpen}`
    };
  }
}

function format12Hour(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const minStr = m < 10 ? `0${m}` : `${m}`;
  return `${hour12}:${minStr} ${period}`;
}
