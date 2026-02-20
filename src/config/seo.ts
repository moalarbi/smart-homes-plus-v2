// SEO Configuration
import ar from '../i18n/ar.json';
import en from '../i18n/en.json';

export const SEO = {
  // Site URL (update after deployment)
  siteUrl: "https://yourusername.github.io/smart-homes-plus",
  
  // Default locale
  defaultLocale: "ar",
  
  // Supported locales
  locales: ["ar", "en"],
  
  // JSON-LD LocalBusiness schema
  getLocalBusinessSchema: (lang: 'ar' | 'en') => {
    const meta = lang === 'ar' ? ar.meta : en.meta;
    
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": lang === 'ar' ? "سمارت هوم بلس" : "Smart Homes Plus",
      "description": meta.description,
      "url": SEO.siteUrl,
      "telephone": "+966500000000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": lang === 'ar' ? "الرياض" : "Riyadh",
        "addressCountry": "SA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "24.7136",
        "longitude": "46.6753"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "priceRange": "$$$",
      "areaServed": {
        "@type": "City",
        "name": lang === 'ar' ? "الرياض" : "Riyadh"
      }
    };
  }
} as const;
