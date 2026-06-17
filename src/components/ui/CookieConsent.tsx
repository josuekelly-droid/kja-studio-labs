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
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 bg-white border-t border-gray-200 shadow-2xl animate-slide-up">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-700 leading-relaxed flex-1">
          Nous utilisons des cookies pour mesurer l&apos;audience et améliorer votre expérience.{' '}
          <Link href="/politique-confidentialite" className="text-violet hover:underline font-medium">En savoir plus</Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={acceptEssential} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Essentiels uniquement</button>
          <button onClick={acceptAll} className="px-5 py-2 bg-violet text-white text-sm font-heading font-semibold rounded-xl hover:bg-violet-700 transition-all">Tout accepter</button>
        </div>
      </div>
    </div>
  );
}