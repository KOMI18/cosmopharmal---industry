// app/produits/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { generateSEO, generateProductStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';

interface ProductPageProps {
  params: { slug: string };
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata(
    { params }: ProductPageProps): Promise<Metadata> {
  const {slug} = params;  
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: { 
      categories: { 
        include: { 
          category: true 
        } 
      } 
    }
  });

  if (!product) {
    return generateSEO({
      title: 'Produit non trouvé',
      description: 'Le produit recherché n\'existe pas.'
    });
  }

  const keywords = [
    product.name.toLowerCase(),
    ...(product.keywords?.split(',').map(k => k.trim()) || []),
    ...product.categories.map(pc => pc.category.name.toLowerCase())
  ];

  return generateSEO({
    title: product.metaTitle || `${product.name} - Fournisseur Concombre de Mer`,
    description: product.metaDesc || product.shortDesc || product.description.substring(0, 160),
    keywords,
    // image: product.image,
    url: `/produits/${product.slug}`,
    type: 'website'
  });
}

// Génération statique des pages (ISG)
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true }
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug:  params.slug },
    include: {
      categories: { 
        include: { 
          category: true 
        } 
      },
      submissions: { 
        where: { status: 'ACCEPTED' }, 
        take: 5,
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  // Données structurées pour le SEO
  const productStructuredData = generateProductStructuredData(product);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Accueil', url: '/' },
    { name: 'Produits', url: '/produits' },
    { name: product.name, url: `/produits/${product.slug}` }
  ]);

  return (
    <>
      {/* Données structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      {/* Fil d'Ariane */}
      <nav className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Accueil</Link>
            <span>/</span>
            <Link href="/produits" className="hover:text-blue-600">Produits</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            {product.image && (
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={`${product.name} - Concombre de mer qualité pharmaceutique`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {/* Galerie d'images si disponible */}
            {product.gallery && (
              <div className="grid grid-cols-3 gap-2">
                {JSON.parse(product.gallery).map((img: string, index: number) => (
                  <div key={index} className="relative aspect-square rounded overflow-hidden">
                    <Image
                      src={img}
                      alt={`${product.name} vue ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="space-y-6">
            {/* Titre H1 optimisé SEO */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              {/* Catégories */}
              {product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map(pc => (
                    <Link
                      key={pc.categoryId}
                      href={`/produits?category=${pc.category.slug}`}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
                    >
                      {pc.category.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Prix et quantité */}
              <div className="flex items-center gap-4 text-lg">
                {product.priceRange && (
                  <span className="font-semibold text-green-600">
                    {product.priceRange}
                  </span>
                )}
                {product.minQuantity && (
                  <span className="text-gray-600">
                    Min: {product.minQuantity}kg
                  </span>
                )}
              </div>
            </div>

            {/* Description courte */}
            {product.shortDesc && (
              <div className="text-lg text-gray-700">
                {product.shortDesc}
              </div>
            )}

            {/* Informations clés */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              {product.quality && (
                <div>
                  <span className="font-medium text-gray-900">Qualité:</span>
                  <p className="text-gray-700">{product.quality}</p>
                </div>
              )}
              {product.origin && (
                <div>
                  <span className="font-medium text-gray-900">Origine:</span>
                  <p className="text-gray-700">{product.origin}</p>
                </div>
              )}
            </div>

            {/* CTA Principal */}
            <div className="space-y-3">
              <Link
                href={`/soumissions?product=${product.slug}`}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
              >
                Soumettre une Offre
              </Link>
              <Link
                href="/contact"
                className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block"
              >
                Demander des Informations
              </Link>
            </div>
          </div>
        </div>

        {/* Description détaillée - Optimisée SEO avec H2 */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Description Détaillée - {product.name}
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <div className='article-content' dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          {/* Spécifications */}
          {product.specs && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Spécifications Techniques
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="whitespace-pre-wrap text-gray-700">
                  {product.specs}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}