import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Providers from "~/components/providers";
import { Toaster } from "~/components/ui/toaster";
import ReactQueryProvider from "~/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "HNG Boilerplate",
  description: "HNG Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto w-full max-w-[1440px]">
          <Providers />
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
