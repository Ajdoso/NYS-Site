import type { Metadata } from 'next';
import '@/styles/shared/globals.css';
import '@/styles/tyn/tyn.css';
import '@/styles/proathletic/proathletic.css';
import { CartProvider } from '@/lib/context/CartContext';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { CartDrawer } from '@/components/shared/CartDrawer';

export const metadata: Metadata = {
  title: 'TYN × PROATHLETIC | Luxury Streetwear & Performance Sportswear',
  description: 'Two iconic brands under one roof: TYN (Kazakh Heritage × Modern Streetwear) and PROATHLETIC (Precision Athletic Gear). Free shipping across Kazakhstan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-800 selection:text-white">
        <LanguageProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
