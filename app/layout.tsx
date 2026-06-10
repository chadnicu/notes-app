import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import "./globals.css";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        afterSignOutUrl="/"
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
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="text-xl duration-200 md:hover:text-purple-400"
              >
                Sign in
              </Link>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </nav>
          <Providers>{children}</Providers>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
