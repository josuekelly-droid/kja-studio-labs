// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './globals.css';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    alternateLocale: [...siteConfig.alternateLocales],
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    emails: [siteConfig.contact.email],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.social.twitter,
    site: siteConfig.social.twitter,
  },
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
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'fr-BE': '/be',
      'fr-CH': '/ch',
      'fr-CA': '/ca',
    },
  },
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION,
  },
  icons: {
    icon: siteConfig.favicon,
    apple: '/logo/kja-apple-touch.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#05020a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth bg-[#05020a]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="me" href={siteConfig.social.instagram} />
        <link rel="me" href={siteConfig.social.facebook} />
        <link rel="me" href={siteConfig.social.twitter} />
        <link rel="me" href={siteConfig.social.github} />
        <link rel="me" href={siteConfig.social.linkedin} />
      </head>
      <body className="font-body antialiased bg-[#05020a] text-white min-h-screen flex flex-col selection:bg-violet-600 selection:text-white">
        {/* Google Analytics - Consent Mode v2 par défaut refusé */}
        <Script id="google-consent" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              wait_for_update: 500,
            });
          `}
        </Script>

        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
        )}

        <JsonLd data={{ 
          '@context': 'https://schema.org', 
          '@type': 'Organization', 
          name: siteConfig.name, 
          alternateName: 'KJA Studio', 
          url: siteConfig.url, 
          logo: `${siteConfig.url}${siteConfig.logo}`, 
          description: siteConfig.description, 
          email: siteConfig.contact.email, 
          sameAs: [
            siteConfig.social.instagram, 
            siteConfig.social.facebook, 
            siteConfig.social.twitter, 
            siteConfig.social.linkedin, 
            siteConfig.social.github
          ], 
          contactPoint: { 
            '@type': 'ContactPoint', 
            email: siteConfig.contact.email, 
            contactType: 'customer service', 
            availableLanguage: ['French'] 
          }, 
          foundingDate: '2023', 
          areaServed: ['FR', 'BE', 'CH', 'CA', 'LU', 'BJ', 'CI', 'SN', 'CM', 'GA', 'TG', 'NE', 'BF', 'ML', 'GN', 'CD', 'CG', 'TD', 'RW', 'BI'] 
        }} />

        <LayoutWrapper>{children}</LayoutWrapper>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
        <WhatsAppButton />
      </body>
    </html>
  );
}