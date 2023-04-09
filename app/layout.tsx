import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Notes App',
  description: 'App for taking notes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-900 text-slate-200">
        <nav className="mb-10 flex items-center justify-around pt-10">
          <Link href="/" className="text-xl md:hover:text-purple-400 ">
            Home
          </Link>
          <Link href="/notes" className="text-xl md:hover:text-purple-400">
            Notes
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
