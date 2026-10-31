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
    <div className="bg-[#05020a] text-white selection:bg-violet-600 selection:text-white min-h-[100svh] flex flex-col justify-between">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Page introuvable',
          url: `${siteConfig.url}/404`,
        }}
      />

      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-12 py-20">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-violet-600/15 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center">
          <span className="font-mono text-xs tracking-widest text-violet-400 uppercase block mb-4">
            // ERRORED_404_STATE
          </span>

          <h1 className="text-8xl sm:text-9xl lg:text-[10rem] font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none mb-6 tracking-tighter">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
            Page introuvable
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light mb-3 leading-relaxed">
            La ressource que vous tentez de joindre n'existe pas ou a été déplacée vers un autre univers digital.
          </p>

          <p className="text-xs sm:text-sm text-gray-500 font-mono mb-12">
            Vérifiez l'URL ou revenez à la base de départ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-950 font-heading font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-violet-100 transition-all duration-300"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:border-violet-500/50 text-white font-heading font-semibold text-sm tracking-wider uppercase rounded-full backdrop-blur-md transition-all duration-300 hover:bg-white/10"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}