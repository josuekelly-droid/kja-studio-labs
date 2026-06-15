// src/config/navigation.ts
export interface NavItem {
  titre: string;
  href: string;
  description?: string;
  enfants?: NavItem[];
  icone?: string;
}

export const navigationPrincipale: NavItem[] = [
  {
    titre: 'Accueil',
    href: '/',
  },
  {
    titre: 'Portfolio',
    href: '/portfolio',
    enfants: [
      {
        titre: 'Tous les projets',
        href: '/portfolio',
        description: 'Découvrez l\'ensemble de nos réalisations',
      },
      {
        titre: 'UI/UX Design',
        href: '/portfolio/ui-ux-design',
        description: 'Design d\'interfaces et expérience utilisateur',
      },
      {
        titre: 'Développement Fullstack',
        href: '/portfolio/fullstack',
        description: 'Applications web complètes et performantes',
      },
      {
        titre: 'Connect',
        href: '/portfolio/connect',
        description: 'Solutions connectées et intégrations',
      },
    ],
  },
  {
    titre: 'Services',
    href: '/services',
    enfants: [
      {
        titre: 'UI/UX Design',
        href: '/services/design-ui-ux',
        description: 'Recherche UX, wireframes, prototypes, design systems',
      },
      {
        titre: 'Développement Fullstack',
        href: '/services/developpement-fullstack',
        description: 'Frontend, backend, bases de données, déploiement',
      },
      {
        titre: 'Connect',
        href: '/services/connect',
        description: 'APIs, intégrations, automatisation, synchronisation',
      },
    ],
  },
  {
    titre: 'Blog',
    href: '/blog',
  },
  {
    titre: 'À propos',
    href: '/a-propos',
  },
  {
    titre: 'Avis clients',
    href: '/avis',
  },
  {
    titre: 'Contact',
    href: '/contact',
  },
];

export const navigationFooter = {
  services: [
    { titre: 'UI/UX Design', href: '/services/design-ui-ux' },
    { titre: 'Développement Fullstack', href: '/services/developpement-fullstack' },
    { titre: 'Connect', href: '/services/connect' },
  ],
  entreprise: [
    { titre: 'À propos', href: '/a-propos' },
    { titre: 'Portfolio', href: '/portfolio' },
    { titre: 'Blog', href: '/blog' },
    { titre: 'Avis clients', href: '/avis' },
  ],
  legal: [
    { titre: 'Mentions légales', href: '/mentions-legales' },
    { titre: 'Politique de confidentialité', href: '/politique-confidentialite' },
    { titre: 'CGV', href: '/cgv' },
  ],
  contact: {
    email: 'contact@kja-studio-labs.com',
    reseaux: [
      { nom: 'LinkedIn', href: 'https://linkedin.com/company/kja-studio-labs' },
      { nom: 'GitHub', href: 'https://github.com/kja-studio-labs' },
      { nom: 'Twitter', href: 'https://twitter.com/kjastudiolabs' },
    ],
  },
};