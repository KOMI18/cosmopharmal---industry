
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { generateSEO, generateBreadcrumbStructuredData } from '@/lib/seo';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, BookOpen, TrendingUp } from 'lucide-react';

interface BlogPostPageProps {
  params: { slug: string };
}

// Génération des métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  });

  if (!post) {
    return generateSEO({
      title: 'Article non trouvé',
      description: 'L\'article recherché n\'existe pas.'
    });
  }

  const keywords = post.keywords?.split(',').map(k => k.trim()) || [];

  return generateSEO({
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt || post.content.substring(0, 160),
    keywords,
    // image: post.featuredImage,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.updatedAt.toISOString()
  });
}

// Génération statique des pages
export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true }
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

function getReadingTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, relatedPosts] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { slug: params.slug }
    }),
    prisma.blogPost.findMany({
      where: { 
        published: true,
        slug: { not: params.slug }
      },
      take: 3,
      orderBy: { publishedAt: 'desc' }
    })
  ]);

  if (!post) {
    notFound();
  }

  // Données structurées pour le SEO
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ]);

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    author: {
      '@type': 'Person',
      name: post.author || 'Expert ConcombresPharm'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ConcombresPharm'
    },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString()
  };

  return (
    <>
      {/* Données structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-[#43b495]/5 to-[#43b495]/10 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#43b495]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#43b495]/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Fil d'Ariane */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#43b495] transition-colors">Accueil</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-[#43b495] transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Article</span>
              </div>
            </nav>

            {/* Back link */}
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[#43b495] hover:text-[#358971] font-medium mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour au blog
            </Link>

            {/* Article Header */}
            <div className="text-center">
              {/* Meta informations */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt!)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {getReadingTime(post.content)} min de lecture
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author || 'Expert ConcombresPharm'}
                </div>
              </div>

              {/* Keywords as tags */}
              {post.keywords && (
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {post.keywords.split(',').slice(0, 4).map((keyword, index) => (
                    <span key={index} className="px-4 py-2 bg-[#43b495]/10 text-[#43b495] text-sm rounded-full font-medium">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed max-w-7xl mx-auto">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section className="py-8">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <article className="py-16">
          <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-12">
              {/* Main Content */}
              <div className="flex-1">
                <div className="prose prose-lg prose-gray max-w-none">
                <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="article-content  text-gray-700"
                ></div>

                </div>

                {/* Share buttons */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Partagez cet article</h3>
                      <p className="text-gray-600">Aidez vos collègues à rester informés</p>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-[#43b495] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#358971] transition-colors">
                      <Share2 className="w-4 h-4" />
                      Partager
                    </button>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#43b495] to-[#358971] rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {post.author || 'Expert ConcombresPharm'}
                      </h3>
                      <p className="text-gray-600">
                        Expert en produits marins pharmaceutiques avec plus de 10 ans d'expérience 
                        dans l'industrie des concombres de mer et holothuries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="w-80 hidden lg:block">
                <div className="sticky top-8 space-y-8">
                  {/* Table of contents placeholder */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#43b495]" />
                      Dans cet article
                    </h3>
                    <nav className="space-y-2">
                      <a href="#" className="block text-gray-600 hover:text-[#43b495] transition-colors text-sm">
                        Introduction
                      </a>
                      <a href="#" className="block text-gray-600 hover:text-[#43b495] transition-colors text-sm">
                        Points clés
                      </a>
                      <a href="#" className="block text-gray-600 hover:text-[#43b495] transition-colors text-sm">
                        Recommandations
                      </a>
                      <a href="#" className="block text-gray-600 hover:text-[#43b495] transition-colors text-sm">
                        Conclusion
                      </a>
                    </nav>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-[#43b495] to-[#358971] rounded-2xl p-6 text-white">
                    <h3 className="font-bold text-xl mb-3">Besoin d'expertise ?</h3>
                    <p className="text-white/90 mb-4 text-sm">
                      Nos experts sont là pour vous accompagner dans vos projets pharmaceutiques marins.
                    </p>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-2 bg-white text-[#43b495] px-4 py-2 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
                    >
                      Nous contacter
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Articles <span className="text-[#43b495]">Similaires</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-br from-[#43b495]/10 to-[#43b495]/5">
                      {relatedPost.featuredImage ? (
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-16 h-16 bg-[#43b495]/20 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-[#43b495]" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                        <Calendar className="w-3 h-3" />
                        {formatDate(relatedPost.publishedAt!)}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#43b495] transition-colors line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center gap-2 text-[#43b495] font-medium hover:gap-3 transition-all"
                      >
                        Lire l'article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Custom styles for article content
      <style jsx global>{`
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          color: #43b495;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .article-content h1 { font-size: 2.5rem; }
        .article-content h2 { font-size: 2rem; }
        .article-content h3 { font-size: 1.5rem; }
        
        .article-content a {
          color: #43b495;
          text-decoration: underline;
        }
        
        .article-content a:hover {
          color: #358971;
        }
        
        .article-content blockquote {
          border-left: 4px solid #43b495;
          background-color: #f8fafc;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
        }
        
        .article-content ul,
        .article-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .article-content li {
          margin: 0.5rem 0;
        }
      `}</style> */}
    </>
  );
}