"use client";

import { useEffect, useState } from "react";
import Coins from "./Coins";

// 🎨 Estilo de texto neon blanco + verde
const NEON_GREEN_GLOW = {
  color: "#ffffff",
  textShadow: `
    0 0 5px rgba(0, 255, 128, 0.8),
    0 0 10px rgba(0, 255, 128, 0.6),
    0 0 20px rgba(0, 255, 128, 0.4),
    0 0 40px rgba(0, 255, 128, 0.2)
  `,
  filter: "drop-shadow(0 0 6px rgba(0, 255, 128, 0.8))",
  letterSpacing: "0.5px",
};

export default function HeroSection() {
  const text =
    "Lo que verdaderamente importa no es la plataforma. Sino, la confianza con tu cajero.";

  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;

    const type = () => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;

        // 🔹 Pausa extra después del punto
        const delay = text[i - 1] === "." ? 800 : 160;
        setTimeout(type, delay);
      } else {
        setIsComplete(true);
      }
    };

    type(); // arranca typing
  }, [text]);

  return (
    <section className="relative isolate w-full h-[80vh] md:h-screen bg-black overflow-visible group">
      {/* Fondo de monedas SOLO en mobile y solo en hover */}
    <div className="pointer-events-none absolute inset-0 w-full h-full z-10">
  <Coins />
</div>

      {/* Texto central */}
      <div className="absolute inset-0 z-50 flex items-center justify-center px-4 mt-[-40px] sm:mt-[-60px] lg:mt-[-80px]">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center max-w-4xl select-none ${
            isComplete ? "animate-heartbeat" : ""
          }`}
          style={NEON_GREEN_GLOW}
        >
          {displayedText}
        </h1>
      </div>
    </section>
  );
}
