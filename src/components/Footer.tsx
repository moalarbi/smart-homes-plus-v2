import { useI18n } from '@/hooks/useI18n';
import { CONTACT, getPhoneUrl, getWhatsAppUrl } from '@/config/contact';
import { Phone, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  const { t, lang } = useI18n();

  const navLinks = [
    { id: 'hero', label: 'nav.home' },
    { id: 'solutions', label: 'nav.solutions' },
    { id: 'packages', label: 'nav.packages' },
    { id: 'why-us', label: 'nav.whyUs' },
    { id: 'faq', label: 'nav.faq' },
  ];

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {lang === 'ar' ? CONTACT.companyName.ar : CONTACT.companyName.en}
            </h3>
            <p className="text-slate-400">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {lang === 'ar' ? CONTACT.location.ar : CONTACT.location.en}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-100 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {t(link.label)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-slate-100 mb-4">
              {t('footer.contact') || 'Contact'}
            </h4>
            <div className="space-y-3">
              <a
                href={getPhoneUrl()}
                className="flex items-center gap-3 text-slate-400 hover:text-teal-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">{t('footer.phone')}</div>
                  <div className="font-medium">{CONTACT.phoneDisplay}</div>
                </div>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-teal-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">{t('footer.whatsapp')}</div>
                  <div className="font-medium flex items-center gap-1">
                    {CONTACT.phoneDisplay}
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center sm:text-start">
              © {new Date().getFullYear()} {lang === 'ar' ? CONTACT.companyName.ar : CONTACT.companyName.en}. {t('footer.rights')}.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-600">
                Smart Home Solutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
