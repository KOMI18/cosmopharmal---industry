// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateSEO, generateOrganizationStructuredData } from '@/lib/seo';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generateSEO();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <meta name="theme-color" content="#43b495" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-white`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            {children}
          </main>
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}