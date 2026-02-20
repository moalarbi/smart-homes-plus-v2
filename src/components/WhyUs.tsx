import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { Card, CardContent } from '@/components/ui/card';
import { Ruler, Paintbrush, BadgeCheck, Puzzle, HeadphonesIcon } from 'lucide-react';

const whyUsIcons = [
  { icon: Ruler, color: 'text-teal-400', bgColor: 'bg-teal-500/10' },
  { icon: Paintbrush, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  { icon: BadgeCheck, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  { icon: Puzzle, color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  { icon: HeadphonesIcon, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
];

export function WhyUs() {
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

  const points = getSection<{
    engineering: { title: string; description: string };
    cleanInstall: { title: string; description: string };
    warranty: { title: string; description: string };
    brands: { title: string; description: string };
    support: { title: string; description: string };
  }>('whyUs.points');

  const pointData = points ? [
    points.engineering,
    points.cleanInstall,
    points.warranty,
    points.brands,
    points.support
  ] : [];

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            {t('whyUs.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('whyUs.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pointData.map((point, index) => {
            const IconConfig = whyUsIcons[index];
            const Icon = IconConfig.icon;
            
            return (
              <Card
                key={index}
                className={cn(
                  'bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-500 group',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                  index === 3 && 'sm:col-span-2 lg:col-span-1'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110',
                    IconConfig.bgColor
                  )}>
                    <Icon className={cn('w-7 h-7', IconConfig.color)} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className={cn(
          'mt-16 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {['2-Year Warranty', 'Professional Team', '24/7 Support', 'Quality Guaranteed'].map((badge, index) => (
            <div 
              key={index}
              className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-sm"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
