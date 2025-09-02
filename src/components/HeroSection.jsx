// src/components/HeroSection.jsx
"use client";

import { useEffect, useState } from "react";
import Coins from "./Coins";

export default function HeroSection() {
  const words = [
    "Lo", "que", "importa", "es", "la",
    "confianza", "en", "el", "cajero,", "no", "la", "plataforma"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // usamos el array vacío para mantener el ritmo constante

  return (
    // isolate crea un stacking context propio: respeta z-index internos
    <section className="relative isolate w-full h-[80vh] md:h-screen bg-black overflow-hidden">
      {/* Capa de monedas (debajo) */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <Coins />
      </div>

      {/* Capa de texto (encima) */}
      <div className="absolute inset-0 z-50 flex items-center justify-center px-4">
        <h1 className="w-full max-w-4xl text-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight select-none">
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block mr-2 transition-all duration-700 will-change-transform ${
                index === currentWordIndex ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
              style={{
                color: "#dfb95a",
                textShadow:
                  "0 0 20px rgba(229,192,123,0.8), 0 0 40px rgba(229,192,123,0.5), 2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
