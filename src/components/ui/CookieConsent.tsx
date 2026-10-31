// src/components/ui/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  function acceptAll() {
    localStorage.setItem('cookie-consent', 'all');
    setVisible(false);
    window.gtag?.('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
    window.gtag?.('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', { page_path: window.location.pathname });
  }

  function acceptEssential() {
    localStorage.setItem('cookie-consent', 'essential');
    setVisible(false);
    window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' });
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 bg-[#0c0616]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] animate-slide-up text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-start gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping mt-1.5 shrink-0" />
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-white mb-1">
              Respect de votre vie privée
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-3xl">
              Nous utilisons des cookies pour mesurer l&apos;audience, analyser les performances et améliorer votre expérience numérique.{' '}
              <Link href="/politique-confidentialite" className="text-violet-300 hover:text-white underline underline-offset-4 transition-colors font-medium">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto justify-end">
          <button 
            onClick={acceptEssential} 
            className="px-5 py-2.5 text-xs sm:text-sm font-heading font-medium text-gray-300 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 backdrop-blur-md"
          >
            Essentiels uniquement
          </button>
          <button 
            onClick={acceptAll} 
            className="px-6 py-2.5 bg-white text-gray-950 text-xs sm:text-sm font-heading font-bold rounded-full hover:bg-violet-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}