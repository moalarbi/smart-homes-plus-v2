import { useState, useEffect, useCallback } from 'react';
import ar from '../i18n/ar.json';
import en from '../i18n/en.json';

type Language = 'ar' | 'en';
type Translations = typeof ar;

const translations = {
  ar,
  en
} as const;

// Deep path type for nested keys
type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? `${K}.${Path<T[K]>}`
    : K
  : never;

type TranslationKey = Path<Translations>;

// Get nested value from object
function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function useI18n() {
  const [lang, setLang] = useState<Language>('ar');
  const [dir, setDir] = useState<'rtl' | 'ltr'>('rtl');
  const [isReady, setIsReady] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      setLang(savedLang);
      setDir(savedLang === 'ar' ? 'rtl' : 'ltr');
    }
    setIsReady(true);
  }, []);

  // Update HTML attributes when language changes
  useEffect(() => {
    if (isReady) {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      localStorage.setItem('language', lang);
    }
  }, [lang, dir, isReady]);

  // Toggle language
  const toggleLang = useCallback(() => {
    setLang(prev => {
      const newLang = prev === 'ar' ? 'en' : 'ar';
      setDir(newLang === 'ar' ? 'rtl' : 'ltr');
      return newLang;
    });
  }, []);

  // Set specific language
  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    setDir(newLang === 'ar' ? 'rtl' : 'ltr');
  }, []);

  // Translation function
  const t = useCallback((key: string): string => {
    const value = getNestedValue(translations[lang], key);
    
    if (typeof value === 'string') {
      return value;
    }
    
    // Return key if translation not found
    console.warn(`Translation key not found: ${key}`);
    return key;
  }, [lang]);

  // Get nested object
  const getSection = useCallback(<T>(key: string): T | undefined => {
    return getNestedValue(translations[lang], key) as T | undefined;
  }, [lang]);

  return {
    lang,
    dir,
    t,
    getSection,
    toggleLang,
    setLanguage,
    isReady,
    isRTL: dir === 'rtl',
    isLTR: dir === 'ltr'
  };
}

export type { Language, TranslationKey };
