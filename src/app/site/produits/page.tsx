import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { generateSEO, generateProductStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';
import { ArrowRight, Globe } from 'lucide-react';

export const metadata: Metadata = generateSEO({
  title: 'Produits - Concombres de Mer de qualité',
  description: 'Découvrez la sélection de concombres de mer que nous recherchons. Holothuries, bêches-de-mer, concombres pacifiques...',
  keywords: ['concombre de mer', 'holothurie', 'bêche-de-mer', 'concombre pacifique', 'produits marins pharmaceutiques', 'qualité Cosmopharmal industries'],
});

export default async function Page() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { categories: { include: { category: true } } },
  });

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-4xl font-bold text-[#43b495] mb-4">Les produit que nous recherchons</h1>
      <p className="text-left text-xl text-black py-4 mb-8">
        Même si votre produit n'est pas dans cette liste, n'hésitez pas à nous contacter pour nous proposer une offre de concombre de mer. Nous sommes à votre disposition pour discuter de vos besoins.
        <br />
        <br />
        <Link href="https://wa.me/+15043846092?text=Bonjour%2C+je+vous+contacte+depuis+votre+site+web+car.+Je+poss%C3%A8de+un+stock+de+concombres+de+mer+%C3%A0+vendre.+" className='py-2'>
          <span className="bg-[#43b495] text-white px-4 py-2 rounded-md hover:bg-[#43b495]/90 transition-all duration-500">
            Contacter-nous par WhatsApp
          </span>
        </Link>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3 gap-8">
            {products.map((product) => (
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
    </div>
  );
}
