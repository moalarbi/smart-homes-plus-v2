import { useRef } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { getWhatsAppUrl, getPhoneUrl, generateWhatsAppMessage } from '@/config/contact';
import { SmartImage } from './SmartImage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Shield, Wrench, Headphones, Sparkles } from 'lucide-react';

export function Hero() {
  const { t, lang, getSection } = useI18n();
  const heroRef = useRef<HTMLElement>(null);

  const trustChips = getSection<{ warranty: string; installation: string; support: string }>('hero.trustChips');
  const whatsappMessage = generateWhatsAppMessage(
    lang === 'ar' ? 'استشارة عامة' : 'General Consultation',
    lang
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-start space-y-8">
            {/* Trust Chips */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {trustChips && (
                <>
                  <Badge 
                    variant="outline" 
                    className="bg-teal-500/10 border-teal-500/30 text-teal-400 px-3 py-1"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {trustChips.warranty}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 px-3 py-1"
                  >
                    <Wrench className="w-3 h-3 mr-1" />
                    {trustChips.installation}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-3 py-1"
                  >
                    <Headphones className="w-3 h-3 mr-1" />
                    {trustChips.support}
                  </Badge>
                </>
              )}
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight">
                {t('hero.title')}
                <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={getWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-8 py-6 text-lg group"
                >
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {t('hero.ctaPrimary')}
                </Button>
              </a>
              <a href={getPhoneUrl()}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('hero.ctaSecondary')}
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">+500</div>
                <div className="text-sm text-slate-500">
                  {lang === 'ar' ? 'منزل ذكي' : 'Smart Homes'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">2+</div>
                <div className="text-sm text-slate-500">
                  {lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">100%</div>
                <div className="text-sm text-slate-500">
                  {lang === 'ar' ? 'رضا العملاء' : 'Satisfaction'}
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <SmartImage
                src=""
                alt={lang === 'ar' ? 'منزل ذكي' : 'Smart Home'}
                aspectRatio="video"
                label={lang === 'ar' ? 'صورة المنزل الذكي' : 'Smart Home Image'}
                containerClassName="shadow-2xl shadow-teal-500/10"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">
                    {lang === 'ar' ? 'تركيب احترافي' : 'Professional'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === 'ar' ? 'ضمان شامل' : 'Full Warranty'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
