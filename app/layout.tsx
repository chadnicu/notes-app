export const dynamic = "auto";

import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Notes App",
  description: "App for taking notes",
  colorScheme: "dark",
  creator: "nicu420",
  themeColor: "black",
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
            colorBackground: "#27272a",
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
              <UserButton afterSignOutUrl={"/"} />
            </SignedIn>
          </nav>
          <main>{children}</main>
          <footer className="fixed bottom-10 flex w-full justify-center gap-1 text-center">
            <p>Powered by</p>
            <Link href={"https://vercel.com/"} target="_blank">
              <Image
                src="/vercel.svg"
                width={100}
                height={100}
                alt="vercel logo"
              />
            </Link>
          </footer>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
