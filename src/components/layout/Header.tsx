
// components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Globe, Phone, Mail } from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/' },
  { 
    name: 'Produits', 
    href: '/site/produits',
    submenu: [
      { name: 'Tous les produits', href: '/site/produits' },
      { name: 'Holothurie Séchée', href: '/site/produits?category=holothurie-sechee' },
      { name: 'Bêche-de-mer Premium', href: '/site/produits?category=beche-de-mer-premium' },
      { name: 'Concombre Pacifique', href: '/site/produits?category=concombre-pacifique' }
    ]
  },
  { name: 'Blog', href: '/site/blog' },
  { name: 'Devenir Fournisseur', href: '/site/soumissions' },
  { name: 'Contact', href: '/site/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Détecter le scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#43b495] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="hidden md:flex items-center gap-6">
              <a href="mailto:contact@concombrespharm.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Mail className="w-3 h-3" />
                contact@cosmopharmal.com
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone className="w-3 h-3" />
                +33 1 23 45 67 89
              </a>
            </div>
            <div className="flex items-center gap-4">
              {/* <span className="flex items-center gap-2">
                <Globe className="w-3 h-3" />
                Livraison mondiale
              </span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#43b495] to-[#358971] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">
                    Cosmopharmal<span className="text-[#43b495]">Industry</span>
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    Excellence Pharmaceutique Marine
                  </div>
                </div>
              </Link>
            </div>

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        ? 'text-[#43b495] bg-[#43b495]/10'
                        : 'text-gray-700 hover:text-[#43b495] hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {item.submenu && (
                    <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                      activeDropdown === item.name 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-gray-700 hover:text-[#43b495] hover:bg-[#43b495]/5 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
            
                href="https://wa.me/+237695511268?text=Bonjour%2C+je+vous+contacte+depuis+votre+site+web+car.+Je+poss%C3%A8de+un+stock+de+concombres+de+mer+%C3%A0+vendre.+%0A%0AJe+suis+int%C3%A9ress%C3%A9+par+une+collaboration."
                className="bg-[#43b495] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#358971] transition-all duration-300 hover:scale-105"
              >
              Nous Contacter
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-6 bg-white border-t border-gray-100">
            <div className="space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                        ? 'text-[#43b495] bg-[#43b495]/10'
                        : 'text-gray-700 hover:text-[#43b495] hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile submenu */}
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[#43b495] hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/soumissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-[#43b495] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#358971] transition-colors"
                >
                  Devenir Fournisseur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}