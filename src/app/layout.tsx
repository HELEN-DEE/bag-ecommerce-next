import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

// Context Providers
import { CartProvider } from "../components/context/cartContext";
import { AuthProvider } from '../components/context/authContext'
import { LayoutWrapper } from "../components/layout/layoutWrapper";

import { Toaster } from 'sonner'

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BagStore",
  description: "A modern e-commerce store for bags",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} ${montserrat.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <LayoutWrapper>
              <Toaster
                theme="dark"
                position="top-right"
                richColors/>
              {children}
            </LayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}