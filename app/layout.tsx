import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import { TypingText } from "@/components/TypingText";

const inter = Inter({
  subsets: ["latin"],
  // display: "swap",
});

export const metadata = {
  title: "Notes App",
  description: "App for taking notes",
  colorScheme: "dark",
  creator: "nicu420",
  themeColor: "black",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: {
            colorBackground: "#27272a",
          },
          baseTheme: dark,
        }}
      >
        <body className={`${inter.className} dark min-h-screen tracking-tight`}>
          <nav className="flex items-center justify-around py-10 font-semibold">
            <Link
              href="/"
              className="text-xl duration-200 md:hover:text-purple-400 "
            >
              Home
            </Link>
            <Link
              href="/notes"
              className="text-xl duration-200 md:hover:text-purple-400"
            >
              Notes
            </Link>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-xl duration-200 md:hover:text-purple-400"
              >
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl={"/"} />
            </SignedIn>
          </nav>
          <main>{children}</main>
          {/* <footer className="absolute bottom-10 flex w-full justify-center gap-1 text-center">
            <p>Powered by</p>
            <Link href={"https://vercel.com/"} target="_blank">
              <Image
                src="/vercel.svg"
                width={100}
                height={100}
                alt="vercel logo"
              />
            </Link>
          </footer> */}
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
