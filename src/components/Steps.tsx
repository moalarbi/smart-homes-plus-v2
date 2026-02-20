import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { Phone, ClipboardList, FileText, Wrench, HandshakeIcon } from 'lucide-react';

const stepIcons = [Phone, ClipboardList, FileText, Wrench, HandshakeIcon];
const stepColors = [
  'text-teal-400',
  'text-cyan-400',
  'text-blue-400',
  'text-purple-400',
  'text-emerald-400'
];

export function Steps() {
  const { t, getSection } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
    contact: { title: string; description: string };
    assessment: { title: string; description: string };
    proposal: { title: string; description: string };
    installation: { title: string; description: string };
    handover: { title: string; description: string };
  }>('steps.items');

  const stepData = items ? [
    items.contact,
    items.assessment,
    items.proposal,
    items.installation,
    items.handover
  ] : [];

  return (
    <section
      ref={sectionRef}
      id="steps"
      className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            {t('steps.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('steps.subtitle')}
          </p>
        </div>

        {/* Steps - Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 transition-all duration-700"
                style={{ width: `${(activeStep / (stepData.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-5 gap-4">
              {stepData.map((step, index) => {
                const Icon = stepIcons[index];
                const isActive = index <= activeStep;
                const isCurrent = index === activeStep;
                
                return (
                  <div
                    key={index}
                    className={cn(
                      'text-center transition-all duration-500 cursor-pointer',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    onMouseEnter={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Icon Circle */}
                    <div className={cn(
                      'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 border-2',
                      isActive 
                        ? 'bg-slate-900 border-teal-500 shadow-lg shadow-teal-500/20' 
                        : 'bg-slate-900 border-slate-700'
                    )}>
                      <Icon className={cn(
                        'w-10 h-10 transition-colors',
                        isActive ? stepColors[index] : 'text-slate-600'
                      )} />
                    </div>
                    
                    {/* Step Number */}
                    <div className={cn(
                      'text-sm font-bold mb-2 transition-colors',
                      isActive ? 'text-teal-400' : 'text-slate-600'
                    )}>
                      0{index + 1}
                    </div>
                    
                    {/* Title */}
                    <h3 className={cn(
                      'text-lg font-semibold mb-2 transition-colors',
                      isCurrent ? 'text-slate-100' : 'text-slate-400'
                    )}>
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={cn(
                      'text-sm transition-all duration-300',
                      isCurrent ? 'text-slate-400 opacity-100' : 'text-slate-500 opacity-0 h-0 overflow-hidden'
                    )}>
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Steps - Mobile */}
        <div className="lg:hidden space-y-4">
          {stepData.map((step, index) => {
            const Icon = stepIcons[index];
            const isActive = index === activeStep;
            
            return (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer',
                  isActive 
                    ? 'bg-slate-900 border-teal-500/50' 
                    : 'bg-slate-900/50 border-slate-800'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                  isActive ? 'bg-teal-500/10' : 'bg-slate-800'
                )}>
                  <Icon className={cn(
                    'w-6 h-6',
                    isActive ? stepColors[index] : 'text-slate-500'
                  )} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-xs font-bold',
                      isActive ? 'text-teal-400' : 'text-slate-600'
                    )}>
                      0{index + 1}
                    </span>
                    <h3 className={cn(
                      'font-semibold',
                      isActive ? 'text-slate-100' : 'text-slate-400'
                    )}>
                      {step.title}
                    </h3>
                  </div>
                  {isActive && (
                    <p className="text-sm text-slate-400 mt-1 animate-in fade-in slide-in-from-top-2">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
