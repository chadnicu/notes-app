import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import Providers from "./providers";

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
          // variables: {
          //   // colorBackground: "#1D283A",
          // },
          baseTheme: dark,
        }}
      >
        <body className={`${inter.className} dark min-h-screen tracking-tight`}>
          <nav className="flex items-center justify-around py-10 font-semibold">
            <Link
              href="/"
              className="text-xl duration-200 md:hover:text-purple-400"
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
          <Providers>{children}</Providers>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
