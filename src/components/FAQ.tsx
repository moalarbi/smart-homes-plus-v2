import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export function FAQ() {
  const { t, getSection } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const items = getSection<{
    duration: { question: string; answer: string };
    existingWiring: { question: string; answer: string };
    brands: { question: string; answer: string };
    warranty: { question: string; answer: string };
    expansion: { question: string; answer: string };
    afterAssessment: { question: string; answer: string };
  }>('faq.items');

  const faqData = items ? [
    items.duration,
    items.existingWiring,
    items.brands,
    items.warranty,
    items.expansion,
    items.afterAssessment
  ] : [];

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 mb-6">
            <HelpCircle className="w-8 h-8 text-teal-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            {t('faq.title')}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={cn(
                'border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30 transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline text-right [&[data-state=open]>svg]:rotate-180">
                <span className="text-slate-200 font-medium text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
