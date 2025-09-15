// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { generateSEO } from '@/lib/seo';
import prisma from '@/lib/prisma';
import { ArrowRight, Shield, Globe, Users, TrendingUp, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
export const metadata = generateSEO({
  title: 'Cosmopharmal Industries - Acheter des Concombres de Mer Pharmaceutiques en gros, de qualité et en confiance',
  description: 'Plateforme leader pour l\'achat de concombres de mer de qualité pharmaceutique.',
  keywords: ['concombre de mer pharmaceutique', 'holothurie qualité pharma','acheteur de concombres de mer pharmaceutiques', 'fournisseur bêche-de-mer', 'approvisionnement pharmaceutique marin']
});

async function getFeaturedData() {
  const [featuredProducts, recentPosts, totalSuppliers] = await Promise.all([
    prisma.product.findMany({
      where: {isActive: true },
      take: 3,
      include: { categories: { include: { category: true } } }
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      take: 2,
      orderBy: { publishedAt: 'desc' }
    }),
    prisma.submission.count({
      where: { status: 'ACCEPTED' }
    })
  ]);

  return { featuredProducts, recentPosts, totalSuppliers };
}

export default async function HomePage() {
  const { featuredProducts, recentPosts, totalSuppliers } = await getFeaturedData();

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#43b495] via-[#43b495]/90 to-[#358971]"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <Shield className="w-4 h-4" />
              Certifié Pharmaceutique EU
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              L'Excellence
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Pharmaceutique
              </span>
              <span className="block text-white/90 text-4xl md:text-6xl">Marine</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Nous achetons vos stocks de concombres de mer pharmaceutiques. Vendez vos 
              bêches-de-mer à des prix compétitifs et sécurisés. <Link href="/contact" className="text-white underline hover:no-underline">Contactez-nous</Link> maintenant.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 py-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{featuredProducts.length}+</div>
                <div className="text-white/80">Produits Premium</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{totalSuppliers}+</div>
                <div className="text-white/80">Fournisseurs Certifiés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/80">Pays Couverts</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/site/produits"
                className="group inline-flex items-center gap-3 bg-white text-[#43b495] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                Découvrir les Produits
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/site/soumissions"
                className="group inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#43b495] transition-all duration-300"
              >
                Devenir Fournisseur
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Produits <span className="text-[#43b495]">Premium</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les types de concombres de mer que nous achetons, 
              depuis l'holothurie sèche jusqu'aux bêches-de-mer premium.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Product image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-[#43b495]/10 to-[#43b495]/5 rounded-2xl mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#43b495]/20 rounded-full flex items-center justify-center">
                      <Globe className="w-12 h-12 text-[#43b495]" />
                    </div>
                  </div>
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                
                {/* Product info */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.categories.slice(0, 2).map((pc) => (
                      <span key={pc.categoryId} className="px-3 py-1 bg-[#43b495]/10 text-[#43b495] rounded-full text-sm font-medium">
                        {pc.category.name}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#43b495] transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-2">
                    {product.shortDesc}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-2xl font-bold text-[#43b495]">
                      {product.priceRange}
                    </div>
                    <Link
                      href={`/site/produits/${product.slug}`}
                      className="inline-flex items-center gap-2 text-[#43b495] font-medium hover:gap-3 transition-all"
                    >
                      Voir détails
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/site/produits"
              className="inline-flex items-center gap-3 bg-[#43b495] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#358971] transition-all duration-300 hover:scale-105"
            >
              Voir tous les produits
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir <span className="text-[#43b495]">Cosmopharmal Industry</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vendez vos concombres de qualité avec nous, votre partenaire de confiance pour un approvisionnement pharmaceutique de qualité
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Qualité Certifiée",
                description: "Tous nos produits respectent les normes pharmaceutiques les plus strictes (GMP, ISO, Pharmacopées)"
              },
              {
                icon: Globe,
                title: "Réseau Global",
                description: "Fournisseurs vérifiés dans plus de 50 pays pour une diversité d'approvisionnement unique"
              },
              {
                icon: TrendingUp,
                title: "Innovation Continue",
                description: "Recherche constante de nouvelles sources et méthodes pour optimiser la qualité"
              },
              {
                icon: Users,
                title: "Support Expert",
                description: "Équipe de spécialistes dédiée pour vous accompagner dans vos projets"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#43b495] to-[#358971] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {recentPosts.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Actualités <span className="text-[#43b495]">& Expertise</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Restez informé des dernières tendances et réglementations du marché
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {recentPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="h-64 bg-gradient-to-br from-[#43b495]/20 to-[#43b495]/10 relative">
                    {post.featuredImage && (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-[#43b495] text-sm font-medium mb-4">
                      <CheckCircle className="w-4 h-4" />
                      Article Expert
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-[#43b495] transition-colors">
                      <Link href={`/site/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      href={`/site/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#43b495] font-medium hover:gap-3 transition-all"
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/site/blog"
                className="inline-flex items-center gap-3 bg-[#43b495] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#358971] transition-all duration-300"
              >
                Voir tous les articles
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#43b495] to-[#358971] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Commencer ?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Rejoignez notre réseau de laboratoires pharmaceutiques et découvrez 
            l'excellence de nos produits marins
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/site/soumissions"
              className="group inline-flex items-center gap-3 bg-white text-[#43b495] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Soumettre une Offre
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="https://wa.me/+237695511268?text=Bonjour%2C+je+vous+contacte+depuis+votre+site+web+car.+Je+poss%C3%A8de+un+stock+de+concombres+de+mer+%C3%A0+vendre.+%0A%0AJe+suis+int%C3%A9ress%C3%A9+par+une+collaboration."
              className="group inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#43b495] transition-all duration-300"
            >
              Nous Contacter
              <Users className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}