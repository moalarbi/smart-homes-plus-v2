import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { getWhatsAppUrl, generateWhatsAppMessage } from '@/config/contact';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Star, MessageCircle, Home, Shield, Zap } from 'lucide-react';

type PackageType = 'foundation' | 'living' | 'security';

interface PackageData {
  name: string;
  description: string;
  features: string[];
}

const packageIcons: Record<PackageType, typeof Home> = {
  foundation: Home,
  living: Zap,
  security: Shield
};

const packageColors: Record<PackageType, { primary: string; secondary: string; bg: string }> = {
  foundation: {
    primary: 'text-blue-400',
    secondary: 'border-blue-500/30',
    bg: 'bg-blue-500/10'
  },
  living: {
    primary: 'text-teal-400',
    secondary: 'border-teal-500/30',
    bg: 'bg-teal-500/10'
  },
  security: {
    primary: 'text-red-400',
    secondary: 'border-red-500/30',
    bg: 'bg-red-500/10'
  }
};

export function Packages() {
  const { t, lang, getSection } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('living');

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

  const packages = getSection<{
    foundation: PackageData;
    living: PackageData;
    security: PackageData;
  }>('packages');

  const comparison = getSection<{
    features: {
      foundation: string;
      lighting: string;
      ac: string;
      curtains: string;
      scenes: string;
      security: string;
      support: string;
    }
  }>('packages.comparison');

  const packageKeys: PackageType[] = ['foundation', 'living', 'security'];

  const handlePackageSelect = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    
    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('package', pkg);
    window.history.replaceState({}, '', url);
  };

  const handleWhatsAppClick = (packageName: string) => {
    const message = generateWhatsAppMessage(packageName, lang);
    window.open(getWhatsAppUrl(message), '_blank');
  };

  // Comparison data for desktop table
  const comparisonFeatures = [
    { key: 'foundation', label: comparison?.features.foundation },
    { key: 'lighting', label: comparison?.features.lighting },
    { key: 'ac', label: comparison?.features.ac },
    { key: 'curtains', label: comparison?.features.curtains },
    { key: 'scenes', label: comparison?.features.scenes },
    { key: 'security', label: comparison?.features.security },
    { key: 'support', label: comparison?.features.support },
  ];

  const comparisonMatrix: Record<string, Record<PackageType, boolean>> = {
    foundation: { foundation: true, living: true, security: true },
    lighting: { foundation: false, living: true, security: false },
    ac: { foundation: false, living: true, security: false },
    curtains: { foundation: false, living: true, security: false },
    scenes: { foundation: false, living: true, security: false },
    security: { foundation: false, living: false, security: true },
    support: { foundation: true, living: true, security: true },
  };

  if (!packages) return null;

  return (
    <section
      ref={sectionRef}
      id="packages"
      className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            {t('packages.title')}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {packageKeys.map((pkgKey, index) => {
            const pkg = packages[pkgKey];
            const Icon = packageIcons[pkgKey];
            const colors = packageColors[pkgKey];
            const isPopular = pkgKey === 'living';
            const isSelected = selectedPackage === pkgKey;
            
            return (
              <Card
                key={pkgKey}
                onClick={() => handlePackageSelect(pkgKey)}
                className={cn(
                  'relative cursor-pointer transition-all duration-500 overflow-hidden',
                  isSelected 
                    ? 'border-teal-500/50 shadow-lg shadow-teal-500/10 scale-[1.02]' 
                    : 'border-slate-800 hover:border-slate-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 text-xs font-bold py-1 text-center">
                    <Star className="w-3 h-3 inline mr-1" />
                    {t('packages.mostPopular')}
                  </div>
                )}
                
                <CardHeader className={cn('pb-4', isPopular && 'pt-8')}>
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
                    colors.bg
                  )}>
                    <Icon className={cn('w-7 h-7', colors.primary)} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{pkg.name}</h3>
                  <p className="text-sm text-slate-400">{pkg.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-teal-400">
                    {t('packages.pricing')}
                  </div>
                  
                  <ul className="space-y-2">
                    {pkg.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppClick(pkg.name);
                    }}
                    className={cn(
                      'w-full',
                      isSelected 
                        ? 'bg-teal-500 hover:bg-teal-400 text-slate-950' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    )}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t('packages.selectPackage')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Section */}
        <div className={cn(
          'transition-all duration-700 delay-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h3 className="text-2xl font-bold text-slate-100 text-center mb-8">
            {t('packages.comparison.title')}
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">
                    {lang === 'ar' ? 'الميزة' : 'Feature'}
                  </th>
                  {packageKeys.map((pkgKey) => (
                    <th key={pkgKey} className="text-center py-4 px-4">
                      <span className={cn(
                        'font-semibold',
                        packageColors[pkgKey].primary
                      )}>
                        {packages[pkgKey].name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr 
                    key={feature.key} 
                    className={cn(
                      'border-b border-slate-800/50',
                      index % 2 === 0 && 'bg-slate-900/30'
                    )}
                  >
                    <td className="py-4 px-4 text-slate-300">{feature.label}</td>
                    {packageKeys.map((pkgKey) => (
                      <td key={pkgKey} className="text-center py-4 px-4">
                        {comparisonMatrix[feature.key]?.[pkgKey] ? (
                          <Check className={cn(
                            'w-5 h-5 mx-auto',
                            packageColors[pkgKey].primary
                          )} />
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible className="space-y-2">
              {comparisonFeatures.map((feature) => (
                <AccordionItem 
                  key={feature.key} 
                  value={feature.key}
                  className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/30"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <span className="text-slate-200">{feature.label}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      {packageKeys.map((pkgKey) => (
                        <div 
                          key={pkgKey} 
                          className="flex items-center justify-between"
                        >
                          <span className={cn(
                            'text-sm',
                            packageColors[pkgKey].primary
                          )}>
                            {packages[pkgKey].name}
                          </span>
                          {comparisonMatrix[feature.key]?.[pkgKey] ? (
                            <Check className={cn(
                              'w-4 h-4',
                              packageColors[pkgKey].primary
                            )} />
                          ) : (
                            <span className="text-slate-600 text-sm">—</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
