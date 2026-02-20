// Image Configuration
// Add your image URLs here to display them across the site
// Leave empty strings to show placeholder skeletons

export const IMAGES = {
  // Hero section background/image
  hero: "",
  
  // Solutions section image
  solutions: "",
  
  // Packages section image
  packages: "",
  
  // Foundation package image
  foundation: "",
  
  // Living package image
  living: "",
  
  // Security package image
  security: "",
  
  // Testimonials section
  testimonials: "",
  
  // Why us section
  whyUs: "",
  
  // Steps/Process section
  steps: "",
  
  // CTA section
  cta: "",
  
  // Footer
  footer: ""
} as const;

// Helper to check if image exists
export function hasImage(key: keyof typeof IMAGES): boolean {
  const value = IMAGES[key];
  return typeof value === 'string' && value.length > 0;
}
