// lib/seo.ts
import { Metadata } from 'next';
import { Product } from '@/types';
// Configuration SEO globale
export const siteConfig = {
  name: "Cosmopharmal industries - Fournisseurs de Concombres de Mer",
  description: "Plateforme B2B pour l'approvisionnement en concombres de mer de qualité pharmaceutique. Connectez-vous avec des fournisseurs vérifiés.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://acheuteur-comcombremer.com",
  keywords: [
    "concombre de mer",
    "holothurie",
    "industrie pharmaceutique",
    "fournisseur concombre mer",
    "bêche-de-mer",
    "produits marins pharmaceutiques",
    "approvisionnement concombre mer",
    "qualité Cosmopharmal industries",
    "concombre de mer pharmaceutique",
    "concombre de mer pharmaceutique",
    "acheteur de concombres de mer pharmaceutiques",
    "concombres de mer pharmaceutiques",
  ]
};

// Types pour les métadonnées dynamiques
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEO({
  title,
  description = siteConfig.description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: image ? [{
        url: image,
        width: 1200,
        height: 630,
        alt: title || siteConfig.name
      }] : [],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },
    
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : []
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    alternates: {
      canonical: fullUrl
    }
  };
}

// Fonction pour générer les données structurées (Schema.org)
export function generateProductStructuredData(product:Product ) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? `${siteConfig.url}${product.image}` : undefined,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      price: product.priceRange?.split('-')[0] || undefined
    },
    brand: {
      '@type': 'Organization',
      name: siteConfig.name
    }
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`
    }))
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French', 'English']
    }
  };
}