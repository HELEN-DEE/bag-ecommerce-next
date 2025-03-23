import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat } from "next/font/google";
import "./globals.css";

import Navbar from "../components/navigation/Navbar";
import SearchBar from "../components/navigation/SearchBar";
import Footer from "../components/footer/Footer";


// Define fonts
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

// Metadata
export const metadata: Metadata = {
  title: "BagStore",
  description: "A modern e-commerce store for bags",
};

// Root Layout
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar />
        <SearchBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
