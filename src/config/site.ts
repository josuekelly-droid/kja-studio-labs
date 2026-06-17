// src/config/site.ts
export const siteConfig = {
  name: 'KJA Studio Labs',
  slogan: 'Design UI/UX & Développement Fullstack',
  description: 'Studio créatif francophone spécialisé en Design UI/UX, Développement Web Fullstack et Solutions Connect. Projets sur mesure, études de cas détaillées.',
  
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  logo: '/logo/kja-logo.svg',
  logoWhite: '/logo/kja-logo-white.svg',
  favicon: '/logo/kja-favicon.svg',
  ogImage: '/logo/kja-og-image.jpg',
  
  social: {
  instagram: 'https://instagram.com/kjastudiolabs',
  twitter: '@kjastudiolabs',
  facebook: 'https://web.facebook.com/profile.php?id=61590969716943',
  linkedin: 'https://linkedin.com/company/kja-studio-labs',
  github: 'https://github.com/KJA-Studio-Labs',
},
  
  contact: {
    email: 'contact@kja-studio-labs.com',
  },
  
  keywords: [
    'UI/UX Design',
    'Développement Web',
    'Fullstack',
    'Design Premium',
    'Agence Web Francophone',
    'KJA Studio',
    'Création Site Web',
    'Application Web',
  ],
  
  authors: [
    { name: 'KJA Studio Labs', url: 'https://kja-studio-labs.com' },
  ],
  
  creator: 'KJA Studio Labs',
  publisher: 'KJA Studio Labs',
  
  locale: 'fr_FR',
  alternateLocales: ['fr_BE', 'fr_CH', 'fr_CA', 'fr_LU'],
};