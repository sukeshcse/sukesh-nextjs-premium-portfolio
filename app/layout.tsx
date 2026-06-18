import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sukesh-varma-portfolio.vercel.app'),
  title: 'Sukesh Varma Sangaraju – Full Stack & GenAI Engineer',
  description: 'Full Stack Developer & GenAI Engineer with 6+ years building scalable web platforms, intelligent AI agents, and enterprise eCommerce systems.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sukesh Varma Sangaraju – Full Stack & GenAI Engineer',
    description: 'Full Stack Developer & GenAI Engineer with 6+ years building scalable web platforms, intelligent AI agents, and enterprise eCommerce systems.',
    url: 'https://sukesh-varma-portfolio.vercel.app',
    siteName: 'Sukesh Varma Portfolio',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
