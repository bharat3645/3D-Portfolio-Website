import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased bg-bg-void text-text-primary selection:bg-accent-primary selection:text-bg-void">
        <ClientProviders>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
