"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import Head from "./head";
import { AuthProvider } from "@/store/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <AuthProvider>
          <SessionProvider>
            <Providers>{children}</Providers>
          </SessionProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
