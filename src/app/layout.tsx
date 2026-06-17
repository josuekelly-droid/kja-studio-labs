// src/app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/config/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocales,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    emails: [siteConfig.contact.email],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.social.twitter,
    site: siteConfig.social.twitter,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical + hreflang
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'fr-BE': '/be',
      'fr-CH': '/ch',
      'fr-CA': '/ca',
    },
  },

  // Vérification Google Search Console
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION,
  },

  // Métadonnées additionnelles
  other: {
    'theme-color': '#4F19A4',
    'msapplication-TileColor': '#4F19A4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Préchargement polices Google */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon & App Icons */}
        <link rel="icon" href="/logo/kja-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo/kja-apple-touch.png" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#4F19A4" />

        {/* Vérification identité - Liens profils sociaux */}
        <link rel="me" href="https://instagram.com/kjastudiolabs" />
        <link rel="me" href="https://web.facebook.com/profile.php?id=61590969716943" />
        <link rel="me" href="https://twitter.com/kjastudiolabs" />
        <link rel="me" href="https://github.com/KJA-Studio-Labs" />
        <link rel="me" href="https://linkedin.com/company/kja-studio-labs" />
      </head>
      <body className="font-body antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        {/* Google Analytics - Next.js Script */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* JSON-LD Organization - Google Knowledge Graph */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteConfig.name,
            alternateName: 'KJA Studio',
            url: siteConfig.url,
            logo: `${siteConfig.url}${siteConfig.logo}`,
            description: siteConfig.description,
            email: siteConfig.contact.email,
            sameAs: [
              'https://instagram.com/kjastudiolabs',
              'https://facebook.com/kjastudiolabs',
              'https://twitter.com/kjastudiolabs',
              siteConfig.social.linkedin,
              siteConfig.social.github,
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              email: siteConfig.contact.email,
              contactType: 'customer service',
              availableLanguage: ['French'],
            },
            foundingDate: '2023',
            areaServed: [
              'FR',
              'BE',
              'CH',
              'CA',
              'LU',
              'BJ',
              'CI',
              'SN',
              'CM',
              'GA',
              'TG',
              'NE',
              'BF',
              'ML',
              'GN',
              'CD',
              'CG',
              'TD',
              'RW',
              'BI',
            ],
          }}
        />

        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}