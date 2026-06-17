// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  {
    titre: 'Portfolio',
    href: '/portfolio',
    enfants: [
      { titre: 'Tous les projets', href: '/portfolio' },
      { titre: 'UI/UX Design', href: '/portfolio/ui-ux-design' },
      { titre: 'Fullstack', href: '/portfolio/fullstack' },
      { titre: 'Connect', href: '/portfolio/connect' },
    ],
  },
  {
    titre: 'Services',
    href: '/services',
    enfants: [
      { titre: 'UI/UX Design', href: '/services/design-ui-ux' },
      { titre: 'Fullstack', href: '/services/developpement-fullstack' },
      { titre: 'Connect', href: '/services/connect' },
    ],
  },
  { titre: 'Blog', href: '/blog' },
  { titre: 'À propos', href: '/a-propos' },
  { titre: 'Recrutement', href: '/carrieres' },
  { titre: 'Avis', href: '/avis' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  if (mobileOpen) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.dataset.scrollY = String(scrollY);
  } else {
    const scrollY = parseInt(document.body.style.top || '0') * -1;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo({ top: scrollY, behavior: 'instant' as any });
  }
  return () => {
    const scrollY = parseInt(document.body.style.top || '0') * -1;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    if (!mobileOpen) window.scrollTo({ top: scrollY, behavior: 'instant' as any });
  };
}, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdown(null);
    setDropdownOpen(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const linkClass = (href: string) =>
    `px-2 xl:px-4 py-2 rounded-full text-sm font-heading font-medium transition-all duration-200 whitespace-nowrap ${
      isActive(href)
        ? isScrolled ? 'text-violet bg-violet-50' : 'text-white bg-white/15'
        : isScrolled ? 'text-gray-600 hover:text-violet hover:bg-violet-50' : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 z-[101]">
            <img src="/logo/kja-studio-labs.jpg" alt="KJA Studio Labs" className="h-8 sm:h-10 w-auto" />
            <span className={`font-heading font-bold text-sm sm:text-base ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              KJA Studio Labs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navigation.map((item) => (
              <div
                key={item.titre}
                className="relative"
                onMouseEnter={() => item.enfants && setDropdownOpen(item.titre)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {item.enfants ? (
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === item.titre ? null : item.titre)}
                    className={linkClass(item.href)}
                  >
                    {item.titre}
                  </button>
                ) : (
                  <Link href={item.href} className={linkClass(item.href)}>{item.titre}</Link>
                )}
                {item.enfants && dropdownOpen === item.titre && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in z-50">
                    {item.enfants.map((enfant) => (
                      <Link
                        key={enfant.href}
                        href={enfant.href}
                        onClick={() => setDropdownOpen(null)}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-violet hover:bg-violet-50 transition-colors"
                      >
                        {enfant.titre}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="ml-2 xl:ml-4 px-4 xl:px-6 py-2 xl:py-2.5 bg-violet text-white font-heading font-semibold text-sm rounded-full hover:bg-violet-700 transition-all shadow-sm"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden z-[103] p-2 -mr-2"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 transition-all duration-300 rounded-full ${
                isScrolled || mobileOpen ? 'bg-gray-900' : 'bg-white'
              } ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 transition-all duration-300 rounded-full ${
                isScrolled || mobileOpen ? 'bg-gray-900' : 'bg-white'
              } ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 transition-all duration-300 rounded-full ${
                isScrolled || mobileOpen ? 'bg-gray-900' : 'bg-white'
              } ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[calc(100vw-3rem)] bg-white z-[102] lg:hidden transform transition-transform duration-300 ease-out shadow-2xl overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-20 pb-8 px-6">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <div key={item.titre} className="border-b border-gray-50 last:border-0">
                {item.enfants ? (
                  <>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item.titre ? null : item.titre)}
                      className="w-full flex items-center justify-between py-3.5 text-base font-heading font-semibold text-gray-900 hover:text-violet transition-colors"
                    >
                      {item.titre}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${mobileDropdown === item.titre ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        mobileDropdown === item.titre ? 'max-h-60 pb-2' : 'max-h-0'
                      }`}
                    >
                      {item.enfants.map((enfant) => (
                        <Link
                          key={enfant.href}
                          href={enfant.href}
                          className="block pl-4 py-2.5 text-sm text-gray-600 hover:text-violet transition-colors border-l-2 border-violet-100 ml-2"
                        >
                          {enfant.titre}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-3.5 text-base font-heading font-semibold transition-colors ${
                      isActive(item.href) ? 'text-violet' : 'text-gray-900 hover:text-violet'
                    }`}
                  >
                    {item.titre}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <Link
            href="/contact"
            className="mt-6 w-full py-3.5 bg-violet text-white font-heading font-semibold text-base rounded-full text-center block shadow-md hover:bg-violet-700 transition-colors"
          >
            Contactez-nous
          </Link>
        </div>
      </div>
    </header>
  );
}