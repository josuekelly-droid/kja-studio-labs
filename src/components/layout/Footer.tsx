// src/components/layout/Footer.tsx
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const footerLinks = {
  services: [
    { titre: 'UI/UX Design', href: '/services/design-ui-ux' },
    { titre: 'Développement Fullstack', href: '/services/developpement-fullstack' },
    { titre: 'Connect', href: '/services/connect' },
  ],
  entreprise: [
    { titre: 'Portfolio', href: '/portfolio' },
    { titre: 'Blog', href: '/blog' },
    { titre: 'À propos', href: '/a-propos' },
    { titre: 'Avis clients', href: '/avis' },
    { titre: 'Nos offres de recrutement', href: '/carrieres' },
    { titre: 'Laisser un avis', href: '/laisser-un-avis' },
  ],
  legal: [
    { titre: 'Mentions légales', href: '/mentions-legales' },
    { titre: 'Confidentialité', href: '/politique-confidentialite' },
    { titre: 'CGV', href: '/cgv' },
  ],
};

const reseaux = [
  {
    nom: 'Instagram',
    href: 'https://instagram.com/kjastudiolabs',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    nom: 'Twitter',
    href: 'https://twitter.com/kjastudiolabs',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    nom: 'Facebook',
    href: 'https://facebook.com/kjastudiolabs',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    nom: 'GitHub',
    href: 'https://github.com/kja-studio-labs',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand - Logo SANS invert pour qu'il soit visible */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4 sm:mb-6">
              <img
                src="/logo/kja-studio-labs.jpg"
                alt="KJA Studio Labs"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm">
              Studio créatif francophone. Design UI/UX, Développement Web Fullstack et Solutions Connect. 
              Projets sur mesure, SEO optimisé, performance garantie.
            </p>
            
            {/* Réseaux sociaux avec vraies icônes */}
            <div className="flex gap-2 sm:gap-3">
              {reseaux.map((reseau) => (
                <a
                  key={reseau.nom}
                  href={reseau.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-violet transition-colors"
                  aria-label={reseau.nom}
                >
                  {reseau.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider text-violet-300 mb-3 sm:mb-4">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.services.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {lien.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider text-violet-300 mb-3 sm:mb-4">
              Entreprise
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.entreprise.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {lien.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider text-violet-300 mb-3 sm:mb-4">
              Contact
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-400 hover:text-white transition-colors text-sm break-all">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block mt-4 px-4 sm:px-5 py-2 sm:py-2.5 border border-violet-400/30 text-violet-300 font-heading font-semibold text-xs sm:text-sm rounded-full hover:bg-violet hover:text-white hover:border-violet transition-all"
            >
              Démarrer un projet
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
            </p>
            <nav className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1">
              {footerLinks.legal.map((lien) => (
                <Link
                  key={lien.href}
                  href={lien.href}
                  className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors"
                >
                  {lien.titre}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}