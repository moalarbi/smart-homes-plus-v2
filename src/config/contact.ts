// Contact Configuration
// Edit these values to update contact information across the entire site

export const CONTACT = {
  // Phone number for calls (with country code)
  phone: "+966500000000",
  
  // WhatsApp number (with country code)
  whatsapp: "+966500000000",
  
  // Display phone number (formatted)
  phoneDisplay: "050 000 0000",
  
  // Company name
  companyName: {
    ar: "سمارت هوم بلس",
    en: "Smart Homes Plus"
  },
  
  // Location
  location: {
    ar: "الرياض، المملكة العربية السعودية",
    en: "Riyadh, Saudi Arabia"
  }
} as const;

// Generate WhatsApp message
export function generateWhatsAppMessage(packageName: string, lang: 'ar' | 'en'): string {
  if (lang === 'ar') {
    return `السلام عليكم، أبغى معاينة لمنزلي وتركيب: ${packageName}`;
  }
  return `Hi, I'd like an assessment and installation for: ${packageName}`;
}

// Generate WhatsApp URL
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = "https://wa.me/";
  const phone = CONTACT.whatsapp.replace(/\+/g, '');
  
  if (message) {
    return `${baseUrl}${phone}?text=${encodeURIComponent(message)}`;
  }
  
  return `${baseUrl}${phone}`;
}

// Generate phone call URL
export function getPhoneUrl(): string {
  return `tel:${CONTACT.phone}`;
}
