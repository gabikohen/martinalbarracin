// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Marteam",
  description:  "Entretenimiento digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-black text-white`}
      >
        {/* Navbar siempre visible */}
        <Navbar />

        {/* Contenido dinámico (ej: HeroSection, LegalSection, etc.) */}
        <main className="flex-1">{children}</main>

        {/* Footer siempre visible */}
        <Footer />
      </body>
    </html>
  );
}
