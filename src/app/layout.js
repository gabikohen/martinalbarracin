// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  description: "Plataforma de fichas y entretenimiento digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body className={`
        ${geistSans.variable} ${geistMono.variable} 
        min-h-screen 
        bg-gradient-to-br from-[#E5C07B]/5 to-transparent 
        border-t-2 border-[#E5C07B]/20 
        text-white 
        transition-all duration-500
      `}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
