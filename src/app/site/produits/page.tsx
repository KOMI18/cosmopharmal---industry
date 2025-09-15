import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { generateSEO, generateProductStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';

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
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Les produit que nous recherchons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/produits/${product.slug}`}>
            <p className="block overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/products/holothuria-edulis-premium.jpeg" 
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-sm">{product.shortDesc}</p>
                <div className="flex items-center">
                  {product.categories.map((category) => (
                    <Link key={category.categoryId} href={`/produits?category=${category.category.slug}`}>
                      <p className="text-sm font-bold mr-2">{category.category.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
