import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { getPhoneUrl, getWhatsAppUrl, generateWhatsAppMessage } from '@/config/contact';
import { Phone, MessageCircle } from 'lucide-react';

export function StickyMobileCTA() {
  const { t, lang } = useI18n();

  const whatsappMessage = generateWhatsAppMessage(
    lang === 'ar' ? 'استشارة عامة' : 'General Consultation',
    lang
  );

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 safe-area-pb">
      <div className="flex items-center gap-2 p-3 max-w-lg mx-auto">
        {/* Call Button */}
        <a
          href={getPhoneUrl()}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl',
            'bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors'
          )}
        >
          <Phone className="w-5 h-5" />
          <span className="font-medium">{t('stickyCta.call')}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex-[1.5] flex items-center justify-center gap-2 py-3 px-4 rounded-xl',
            'bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors font-semibold'
          )}
        >
          <MessageCircle className="w-5 h-5" />
          <span>{t('stickyCta.whatsapp')}</span>
        </a>
      </div>
    </div>
  );
}
