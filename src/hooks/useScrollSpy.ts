import { useState, useEffect, useCallback } from 'react';

interface ScrollSpyOptions {
  offset?: number;
  rootMargin?: string;
  threshold?: number;
}

export function useScrollSpy(
  sectionIds: string[],
  options: ScrollSpyOptions = {}
) {
  const { offset = 100, rootMargin = '-100px 0px -50% 0px', threshold = 0 } = options;
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<string, boolean>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        visibilityMap.set(entry.target.id, entry.isIntersecting);
      });

      // Find the first visible section
      for (const id of sectionIds) {
        if (visibilityMap.get(id)) {
          setActiveSection(id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin,
      threshold
    });

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    observers.push(observer);

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [sectionIds, rootMargin, threshold]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [offset]);

  return {
    activeSection,
    scrollToSection,
    isActive: (id: string) => activeSection === id
  };
}
