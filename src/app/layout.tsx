import type { Metadata } from 'next';
import { Inter, Oswald, Playfair_Display } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Cinematic display font - bold and impactful for hero
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

// Elegant serif for sophisticated touch
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '404ghost | Bharat',
    template: '%s | Bharat',
  },
  description: 'Digital Reality Constructor. Systems Architect.',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${playfair.variable}`}>
      <body className="antialiased bg-bg-void text-text-primary selection:bg-accent-primary selection:text-bg-void">
        <ClientProviders>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
