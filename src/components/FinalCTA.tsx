import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { CONTACT, getWhatsAppUrl, getPhoneUrl, generateWhatsAppMessage } from '@/config/contact';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';

export function FinalCTA() {
  const { t, lang } = useI18n();
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const whatsappMessage = generateWhatsAppMessage(
    lang === 'ar' ? 'استشارة عامة' : 'General Consultation',
    lang
  );

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-2xl" />
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] border border-teal-500/10 rounded-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'text-center transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 mb-8 shadow-lg shadow-teal-500/20">
            <Sparkles className="w-10 h-10 text-slate-950" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            {t('finalCta.title')}
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            {t('finalCta.subtitle')}
          </p>

          {/* Phone Number */}
          <div className="mb-8">
            <a 
              href={getPhoneUrl()}
              className="text-2xl sm:text-3xl font-bold text-teal-400 hover:text-teal-300 transition-colors"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-8 py-6 text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('finalCta.whatsapp')}
              </Button>
            </a>
            <a href={getPhoneUrl()}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 px-8 py-6 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('finalCta.call')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
