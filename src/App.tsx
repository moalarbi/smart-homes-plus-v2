import { useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { SEO } from '@/config/seo';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PainPoints } from '@/components/PainPoints';
import { Solutions } from '@/components/Solutions';
import { Packages } from '@/components/Packages';
import { WhyUs } from '@/components/WhyUs';
import { Steps } from '@/components/Steps';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';

function App() {
  const { lang, dir, t, isReady } = useI18n();

  // Update document title and meta tags
  useEffect(() => {
    if (isReady) {
      document.title = t('meta.title');
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', t('meta.description'));
      }
      
      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', t('meta.keywords'));
      }
    }
  }, [lang, isReady, t]);

  // Add JSON-LD schema
  useEffect(() => {
    if (isReady) {
      const existingScript = document.getElementById('json-ld-schema');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(SEO.getLocalBusinessSchema(lang as 'ar' | 'en'));
      document.head.appendChild(script);
    }
  }, [lang, isReady]);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950" dir={dir}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pb-20 lg:pb-0">
        <Hero />
        <PainPoints />
        <Solutions />
        <Packages />
        <WhyUs />
        <Steps />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}

export default App;
