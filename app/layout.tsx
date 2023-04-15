export const dynamic = 'auto';

import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  currentUser,
} from '@clerk/nextjs/app-beta';
import { dark } from '@clerk/themes';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Notes App',
  description: 'App for taking notes',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <ClerkProvider
        appearance={{
          variables: {
            colorBackground: '#27272a',
          },
          baseTheme: dark,
        }}
      >
        <body className="bg-zinc-900 text-zinc-200">
          <nav className="mb-10 flex items-center justify-around pt-10">
            <Link href="/" className="text-lg md:hover:text-purple-400 ">
              Home
            </Link>
            <Link href="/notes" className="text-lg md:hover:text-purple-400">
              Notes
            </Link>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-lg md:hover:text-purple-400"
              >
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl={'/'} />
            </SignedIn>
          </nav>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
