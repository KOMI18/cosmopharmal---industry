// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateSEO, generateOrganizationStructuredData } from '@/lib/seo';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...generateSEO(),
  icons: {
    icon: '/favicon.jpeg', // ✅ ton icône ici
  },
  themeColor: '#43b495',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
