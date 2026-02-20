import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { CONTACT, getPhoneUrl, getWhatsAppUrl } from '@/config/contact';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Phone, MessageCircle, Globe, X, Home, Package, Shield, HelpCircle, Users } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'nav.home', icon: Home },
  { id: 'solutions', label: 'nav.solutions', icon: Package },
  { id: 'packages', label: 'nav.packages', icon: Shield },
  { id: 'why-us', label: 'nav.whyUs', icon: Users },
  { id: 'steps', label: 'nav.process', icon: Package },
  { id: 'faq', label: 'nav.faq', icon: HelpCircle },
];

export function Header() {
  const { t, lang, toggleLang, isRTL } = useI18n();
  const { activeSection, scrollToSection } = useScrollSpy(
    navItems.map(item => item.id),
    { offset: 100 }
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile: Hamburger Menu (Right in RTL, Left in LTR) */}
          <div className="lg:hidden order-1">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-200 hover:text-teal-400 hover:bg-slate-800"
                  aria-label={t('nav.home')}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side={isRTL ? 'right' : 'left'} 
                className="w-[280px] bg-slate-950 border-slate-800"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Logo */}
                  <div className="flex items-center justify-between py-4 border-b border-slate-800">
                    <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      {lang === 'ar' ? CONTACT.companyName.ar : CONTACT.companyName.en}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-slate-400 hover:text-slate-200"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Nav Links */}
                  <nav className="flex-1 py-6">
                    <ul className="space-y-2">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => handleNavClick(item.id)}
                              className={cn(
                                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right',
                                activeSection === item.id
                                  ? 'bg-teal-500/10 text-teal-400'
                                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                              )}
                            >
                              <Icon className="h-5 w-5 flex-shrink-0" />
                              <span className="font-medium">{t(item.label)}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* Language Switcher */}
                  <div className="py-4 border-t border-slate-800">
                    <button
                      onClick={toggleLang}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
                    </button>
                  </div>

                  {/* CTA Buttons */}
                  <div className="py-4 space-y-2">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-teal-500 text-slate-950 font-semibold hover:bg-teal-400 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{t('header.whatsapp')}</span>
                    </a>
                    <a
                      href={getPhoneUrl()}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{t('header.call')}</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - Center on mobile, Left on desktop */}
          <div className="order-2 lg:order-1 flex-1 lg:flex-none flex justify-center lg:justify-start">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('hero');
              }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              {lang === 'ar' ? CONTACT.companyName.ar : CONTACT.companyName.en}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex order-2 items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeSection === item.id
                    ? 'text-teal-400 bg-teal-500/10'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
                )}
              >
                {t(item.label)}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="order-3 flex items-center gap-2">
            {/* Language Switcher - Desktop */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLang}
              className="hidden lg:flex items-center gap-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
            >
              <Globe className="h-4 w-4" />
              <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
            </Button>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={getPhoneUrl()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{t('header.call')}</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 text-slate-950 text-sm font-semibold hover:bg-teal-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{t('header.whatsapp')}</span>
              </a>
            </div>

            {/* Mobile: Call Button (Circular) */}
            <a
              href={getPhoneUrl()}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors"
              aria-label={t('header.call')}
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
