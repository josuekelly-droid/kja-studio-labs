// src/app/not-found.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Page introuvable',
          url: `${siteConfig.url}/404`,
        }}
      />

      <section className="min-h-[100svh] flex items-center justify-center bg-hero-pattern relative overflow-hidden px-4">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-violet-300 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto text-center">
          <p className="text-8xl sm:text-9xl font-heading font-bold text-white/10 select-none mb-4">
            404
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Page introuvable
          </h1>

          <p className="text-base sm:text-lg text-violet-200/90 mb-4 leading-relaxed">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>

          <p className="text-sm text-violet-200/60 mb-10">
            Vérifiez l&apos;URL ou retournez à l&apos;accueil pour naviguer sur le site.
          </p>

          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="btn-primary !bg-white !text-violet hover:!bg-violet-50 text-sm sm:text-base px-8 py-4"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/contact"
              className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 text-sm sm:text-base px-8 py-4"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}