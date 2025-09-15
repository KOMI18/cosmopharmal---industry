// app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { generateSEO } from '@/lib/seo';
import prisma from '@/lib/prisma';
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';

export const metadata = generateSEO({
  title: 'Blog Expert - Concombres de Mer Pharmaceutiques',
  description: 'Articles experts sur l\'industrie des concombres de mer pharmaceutiques : guides d\'achat, réglementation, tendances marché et conseils professionnels.',
  keywords: ['blog concombres mer', 'expertise pharmaceutique marine', 'guides achat holothuries', 'réglementation produits marins'],
  url: '/blog'
});

async function getBlogPosts() {
  return await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      author: true,
      keywords: true
    }
  });
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

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#43b495] via-[#43b495] to-[#358971] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Expertise Pharmaceutique Marine
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog <span className="text-white/90">Expert</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Restez à la pointe de l'industrie des concombres de mer pharmaceutiques avec nos analyses, 
              guides et actualités réglementaires.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-10 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">{posts.length}</div>
                <div className="text-white/80 text-sm">Articles Experts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-white/80 text-sm">Lecteurs/mois</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-white/80 text-sm">Experts Contributeurs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16 -mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-full bg-gradient-to-br from-[#43b495]/20 to-[#43b495]/10">
                  {featuredPost.featuredImage ? (
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-24 h-24 bg-[#43b495]/30 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-12 h-12 text-[#43b495]" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#43b495] text-white rounded-full text-sm font-medium">
                      <BookOpen className="w-4 h-4" />
                      Article Vedette
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPost.publishedAt!)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {getReadingTime(featuredPost.excerpt || '')} min de lecture
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 hover:text-[#43b495] transition-colors">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Par <span className="font-medium text-[#43b495]">{featuredPost.author}</span>
                    </div>
                    
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="group inline-flex items-center gap-2 bg-[#43b495] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#358971] transition-all duration-300 hover:gap-3"
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Articles */}
      {otherPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tous nos <span className="text-[#43b495]">Articles</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Explorez notre bibliothèque d'expertise en concombres de mer pharmaceutiques
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <article key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#43b495]/10 to-[#43b495]/5">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-16 h-16 bg-[#43b495]/20 rounded-full flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-[#43b495]" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedAt!)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getReadingTime(post.excerpt || '')}min
                      </div>
                    </div>
                    
                    {/* Keywords as tags */}
                    {post.keywords && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.keywords.split(',').slice(0, 2).map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-[#43b495]/10 text-[#43b495] text-xs rounded-full">
                            {keyword.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#43b495] transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Par <span className="font-medium text-[#43b495]">{post.author}</span>
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group/link inline-flex items-center gap-2 text-[#43b495] hover:text-[#358971] transition-all duration-300"
                      >
                        Lire l'article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}