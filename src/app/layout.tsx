import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Vidyalaya Academy | Leading CBSE School, Dwarka New Delhi',
    template: '%s | Vidyalaya Academy',
  },
  description: 'Vidyalaya Academy is a premier CBSE educational institution in Dwarka, New Delhi. Discover our smart classrooms, world-class labs, outstanding board results, and admissions information.',
  keywords: ['Vidyalaya Academy', 'CBSE School Dwarka', 'Best School Delhi', 'Dwarka School Admissions', 'SMC Disclosures', 'RTE Admissions'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-gold/30">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
