import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { Card, CardContent } from '@/components/ui/card';
import { SmartImage } from './SmartImage';
import { Lightbulb, Wind, Blinds, Shield, Layers, Wifi } from 'lucide-react';

const solutionIcons = [
  { icon: Lightbulb, color: 'text-amber-400', bgColor: 'bg-amber-500/10', key: 'lighting' },
  { icon: Wind, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', key: 'ac' },
  { icon: Blinds, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', key: 'curtains' },
  { icon: Shield, color: 'text-red-400', bgColor: 'bg-red-500/10', key: 'security' },
  { icon: Layers, color: 'text-purple-400', bgColor: 'bg-purple-500/10', key: 'scenes' },
  { icon: Wifi, color: 'text-blue-400', bgColor: 'bg-blue-500/10', key: 'network' },
];

export function Solutions() {
  const { t, lang, getSection } = useI18n();
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
    lighting: { title: string; description: string };
    ac: { title: string; description: string };
    curtains: { title: string; description: string };
    security: { title: string; description: string };
    scenes: { title: string; description: string };
    network: { title: string; description: string };
  }>('solutions.items');

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className={cn(
            'space-y-8 transition-all duration-700',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          )}>
            {/* Section Header */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
                {t('solutions.title')}
              </h2>
              <p className="text-lg text-slate-400">
                {t('solutions.subtitle')}
              </p>
            </div>

            {/* Solutions Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {solutionIcons.map((solution, index) => {
                const item = items?.[solution.key as keyof typeof items];
                if (!item) return null;
                
                const Icon = solution.icon;
                
                return (
                  <Card
                    key={solution.key}
                    className={cn(
                      'bg-slate-900/50 border-slate-800 hover:border-teal-500/30 transition-all duration-500 group cursor-pointer',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110',
                          solution.bgColor
                        )}>
                          <Icon className={cn('w-6 h-6', solution.color)} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-100 mb-1 group-hover:text-teal-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className={cn(
            'relative transition-all duration-700 delay-300',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          )}>
            <SmartImage
              src=""
              alt={lang === 'ar' ? 'حلول المنزل الذكي' : 'Smart Home Solutions'}
              aspectRatio="square"
              label={lang === 'ar' ? 'صورة الحلول' : 'Solutions Image'}
              containerClassName="shadow-2xl shadow-teal-500/5"
            />
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-teal-500/20 rounded-xl" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-cyan-500/20 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
