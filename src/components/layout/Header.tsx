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
    `px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-medium transition-all duration-300 whitespace-nowrap ${
      isActive(href)
        ? 'text-white bg-white/10 border border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
        : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-[#05020a]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 z-[101] group">
            <div className="relative">
              <img
                src="/logo/kja-studio-labs.webp"
                alt="KJA Studio Labs"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-violet-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-heading font-bold text-white text-base sm:text-lg tracking-tight">
              KJA Studio Labs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
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
                    className={`${linkClass(item.href)} flex items-center gap-1.5 cursor-pointer`}
                  >
                    <span>{item.titre}</span>
                    <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen === item.titre ? 'rotate-180 text-violet-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link href={item.href} className={linkClass(item.href)}>
                    {item.titre}
                  </Link>
                )}

                {item.enfants && dropdownOpen === item.titre && (
                  <div className="absolute top-full left-0 mt-3 w-56 bg-[#0c0616]/95 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/10 py-3 animate-fadeIn z-50 backdrop-blur-2xl overflow-hidden">
                    {item.enfants.map((enfant) => (
                      <Link
                        key={enfant.href}
                        href={enfant.href}
                        onClick={() => setDropdownOpen(null)}
                        className="block px-5 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors font-light tracking-wide"
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
              className="ml-4 px-6 py-3 bg-white text-gray-950 font-heading font-bold text-xs tracking-wider uppercase rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden z-[103] p-3 -mr-2 text-white bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? 'rotate-45 translate-y-2 bg-violet-400' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${mobileOpen ? '-rotate-45 -translate-y-2 bg-violet-400' : ''}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[calc(100vw-3rem)] bg-[#05020a] border-l border-white/10 z-[102] lg:hidden transform transition-transform duration-300 ease-out shadow-2xl overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-28 pb-12 px-6">
          <nav className="flex flex-col gap-3">
            {navigation.map((item) => (
              <div key={item.titre} className="border-b border-white/5 last:border-0 pb-3">
                {item.enfants ? (
                  <>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item.titre ? null : item.titre)}
                      className="w-full flex items-center justify-between py-2.5 text-base font-heading font-semibold text-white hover:text-violet-300 transition-colors"
                    >
                      <span>{item.titre}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${mobileDropdown === item.titre ? 'rotate-180 text-violet-400' : 'text-gray-400'}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileDropdown === item.titre ? 'max-h-60 pt-2 pb-2 space-y-1' : 'max-h-0'
                      }`}
                    >
                      {item.enfants.map((enfant) => (
                        <Link
                          key={enfant.href}
                          href={enfant.href}
                          className="block pl-4 py-2 text-xs text-gray-400 hover:text-white transition-colors border-l border-violet-500/40 ml-2 font-light"
                        >
                          {enfant.titre}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-2.5 text-base font-heading font-semibold transition-colors ${
                      isActive(item.href) ? 'text-violet-400' : 'text-white hover:text-violet-300'
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
            className="mt-8 w-full py-4 bg-white text-gray-950 font-heading font-bold text-xs uppercase tracking-wider rounded-2xl text-center block shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-violet-100 transition-colors"
          >
            Contactez-nous
          </Link>
        </div>
      </div>
    </header>
  );
}