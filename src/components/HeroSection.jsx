'use client';
import { useEffect, useState } from "react";
import Coins from "./Coins";

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
    let timeoutId;
    const type = () => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
        const delay = text[i - 1] === "." ? 400 : 80;
        timeoutId = setTimeout(type, delay);
      } else {
        setIsComplete(true);
      }
    };
    type();
    return () => clearTimeout(timeoutId);
  }, [text]);

  // Scroll "lento" controlado por duración
  const smoothScrollTo = (toY, duration = 1200) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = toY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const handleScroll = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      const { top } = footer.getBoundingClientRect();
      const targetY = window.scrollY + top; // sin offset; ajustá si tenés header fijo
      smoothScrollTo(targetY, 1200);
    }
  };

  return (
    <section className="relative isolate w-full h-[80vh] md:h-screen bg-black overflow-hidden group">
      {/* Fondo de monedas que cubre toda la pantalla */}
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

      {/* Scroll Down Indicator */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Ir al pie de página"
        className="absolute bottom-40 left-1/2 -translate-x-1/2 z-50 cursor-pointer select-none"
        onClick={handleScroll}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleScroll()}
      >
        <div className="animate-bounce">
          <svg
            className="w-8 h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="#00ff80"
            style={{ filter: "drop-shadow(0 0 6px rgba(0, 255, 128, 0.8))" }}
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
