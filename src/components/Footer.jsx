'use client';
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#E5C07B]/5 to-transparent border-t-2 border-[#E5C07B]/20 text-white pt-20 pb-10 px-6 sm:px-12 lg:px-32 transition-all duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 border-b border-white/20 pb-10 text-center">
        {/* Logo y descripción */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#E5C07B] drop-shadow-[0_0_12px_#facc15]">
            MARTEAM
          </h2>
          <p className="mt-4 text-base text-white/90">
            Confianza. Rapidez, seguridad y atención 24/7.
          </p>
          <div className="flex justify-center gap-6 mt-5">
            <a
              href="https://www.facebook.com/profile.php?id=61578820077854"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-2xl hover:text-blue-500 transition drop-shadow-[0_0_5px_#3b82f6]" />
            </a>

            <a
              href="https://www.instagram.com/marteamok/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl hover:text-pink-500 transition drop-shadow-[0_0_5px_#ec4899]" />
            </a>

            <FaTelegramPlane className="text-2xl hover:text-blue-500 transition drop-shadow-[0_0_5px_#38bdf8]" />
          </div>
        </div>

        {/* Soporte */}
        <div>
          <h3
            className="text-2xl font-bold mb-4"
            style={{
              background: "linear-gradient(45deg, #bfb281, #fff3b0, #bfb281)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow:
                "0 0 10px rgba(191, 178, 129, 0.6), 0 0 15px rgba(191, 178, 129, 0.4)",
              filter: "drop-shadow(0 0 6px rgba(191, 178, 129, 0.6))",
              letterSpacing: "0.5px",
            }}
          >
            Soporte
          </h3>
          <ul className="space-y-3 text-base text-white/90">
            <li className="hover:text-[#E5C07B] transition">
              <Link href="/preguntas">Preguntas Frecuentes</Link>
            </li>
          </ul>
        </div>

        {/* Compañía */}
        <div>
          <h3
            className="text-2xl font-bold mb-4"
            style={{
              background: "linear-gradient(45deg, #bfb281, #fff3b0, #bfb281)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow:
                "0 0 10px rgba(191, 178, 129, 0.6), 0 0 15px rgba(191, 178, 129, 0.4)",
              filter: "drop-shadow(0 0 6px rgba(191, 178, 129, 0.6))",
              letterSpacing: "0.5px",
            }}
          >
            Compañía
          </h3>
          <ul className="space-y-3 text-base text-white/90">
            <li className="hover:text-[#E5C07B] transition">
              <Link href="/afiliate">Afíliate</Link>
            </li>
            <li className="hover:text-[#E5C07B] transition">
              <Link href="/terminos">Términos y Condiciones</Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3
            className="text-2xl font-bold mb-4"
            style={{
              background: "linear-gradient(45deg, #bfb281, #fff3b0, #bfb281)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow:
                "0 0 10px rgba(191, 178, 129, 0.6), 0 0 15px rgba(191, 178, 129, 0.4)",
              filter: "drop-shadow(0 0 6px rgba(191, 178, 129, 0.6))",
              letterSpacing: "0.5px",
            }}
          >
            Contacto
          </h3>
          <p className="text-base text-white/90 mb-2">
            Tel: +54 9 11 2345 6789
          </p>
          <p className="text-base text-white/90 mb-2">
            ventas@martinalbarracin.com
          </p>
        </div>
      </div>

      {/* Copyright centrado + badge 18+ al lado */}
     <div className="mt-10 flex items-center justify-center gap-4 text-base text-white/80 text-center">
  <span
    aria-label="Contenido para mayores de 18"
    className="inline-flex w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#E5C07B] text-[#E5C07B] items-center justify-center font-semibold text-sm md:text-base tracking-wide"
  >
    18+
  </span>
  <p>© 2025 Marteam by Martín Albarracín. Todos los derechos reservados.</p>
</div>

      {/* Botón de WhatsApp flotante */}
      <a
        href="https://wa.me/5491123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
      >
        <FaWhatsapp className="text-5xl" />
      </a>
    </footer>
  );
}
