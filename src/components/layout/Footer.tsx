
import Link from 'next/link';
import { Globe, Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
            <div className="w-full h-full bg-[#43b495] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src="/images/logo.jpeg" alt="Logo Cosmopharmal Industry" className="w-full h-full rounded-full object-cover" />
                </div>
              <div>
                <div className="text-xl font-bold">
                  Cosmopharmal<span className="text-[#43b495]">Industry</span>
                </div>
                <div className="text-xs text-gray-400">
                  Excellence Marine
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
            Nous achetons vos stocks de concombres de mer pharmaceutiques. Vendez vos 
            bêches-de-mer à des prix compétitifs et sécurisés.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#43b495] rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#43b495] rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#43b495] rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-[#43b495] rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: 'Accueil', href: '/' },
                { name: 'Tous les produits', href: '/site/produits' },
                { name: 'Blog & Actualités', href: '/site/blog' },
                { name: 'Devenir fournisseur', href: '/site/soumissions' },
                { name: 'À propos', href: '/site/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-[#43b495] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white"> Quelques Produits</h3>
            <ul className="space-y-3">
              {[
                { name: 'Holothuria Scabra Grade A', href: '/site/produits/holothuria-scabra-grade-a' },
                { name: 'Holothuria Edulis Premium', href: '/site/produits/holothuria-edulis-premium' },
                { name: 'Stichopus Japonicus Bio', href: '/site/produits/stichopus-japonicus-bio' },
                { name: 'Thelenota Ananas', href: '/site/produits/thelenota-ananas-extract-ready' },
                { name: 'Holothuria Nobilis', href: '/site/produits/holothuria-nobilis-pharma-grade' }
              ].map((product) => (
                <li key={product.name}>
                  <Link 
                    href={product.href} 
                    className="text-gray-300 hover:text-[#43b495] transition-colors text-sm"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 hover:bg-[#43b495] rounded-lg flex items-center justify-center transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Support</div>
                  <div className="text-gray-300">+1 (504) 384 6092</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 hover:bg-[#43b495] rounded-lg flex items-center justify-center transition-colors">
                  <Mail className="w-7 h-7 text-white m-1" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-gray-300">cosmopharmaindustry@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
