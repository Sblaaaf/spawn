import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


const clashDisplay = localFont({
  src: '../fonts/ClashDisplay-Variable.woff2',
  display: 'swap',
  variable: '--font-clash-display',
});

export const metadata: Metadata = {
  title: 'SPAWN - "Spawn In, Cash Out!"',
  description: 'E-Sport Betting App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${clashDisplay.variable} bg-gray-950 text-white font-space`}>
      <body>{children}</body>
    </html>
  );
}
