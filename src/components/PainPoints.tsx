import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Settings, ShieldAlert, RefreshCw } from 'lucide-react';

const painPointIcons = [
  { icon: Zap, color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  { icon: Settings, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  { icon: ShieldAlert, color: 'text-red-400', bgColor: 'bg-red-500/10' },
  { icon: RefreshCw, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
];

export function PainPoints() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = getSection<{
    highBills: { title: string; description: string };
    complexControls: { title: string; description: string };
    securityConcerns: { title: string; description: string };
    futureProof: { title: string; description: string };
  }>('painPoints.cards');

  const cardData = cards ? [
    cards.highBills,
    cards.complexControls,
    cards.securityConcerns,
    cards.futureProof
  ] : [];

  return (
    <section
      ref={sectionRef}
      id="pain-points"
      className="relative py-20 lg:py-32 bg-slate-950"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            {t('painPoints.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('painPoints.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => {
            const IconConfig = painPointIcons[index];
            const Icon = IconConfig.icon;
            
            return (
              <Card
                key={index}
                className={cn(
                  'bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-500 group',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
