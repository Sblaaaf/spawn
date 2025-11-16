import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';
import { AuthProvider } from '../lib/auth-context';
import Navbar from '../components/Navbar';
import './globals.css';

const clashDisplay = localFont({
  src: '../fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SPAWN - "Spawn In, Cash Out!"',
  description: 'E-Sport Betting App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${clashDisplay.variable} ${spaceGrotesk.variable} bg-gray-950 text-white font-space`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
