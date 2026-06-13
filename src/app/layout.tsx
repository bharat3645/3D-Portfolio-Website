import type { Metadata } from 'next';
import { Inter, Inter_Tight, Oswald, Playfair_Display } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';
import { metadata as siteMetadata, globalJsonLd } from './metadata';

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Display font for headings (Tailwind `font-display`). Self-hosted via next/font
// to kill the render-blocking Google Fonts @import that was in globals.css.
const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['600', '700', '800', '900'],
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

// Export metadata from centralized config
export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${oswald.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        {/* Persistent entity graph — Person + WebSite (every page) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className="antialiased bg-bg-void text-text-primary selection:bg-accent-primary selection:text-bg-void">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-white text-black font-mono">
          Skip to content
        </a>
        <ClientProviders>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
