"use client";

import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const words = [
    "Lo", "que", "importa", "es", "la", "confianza", "en", "el", "cajero,", "no", "la", "plataforma"
  ];

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isClient, words.length]);

  // Columnas de monedas (izq/der)
  const leftCoins = [
    { left: "2%",  size: 35, duration: 16, delay: 0,    spin: 6.5 },
    { left: "8%",  size: 30, duration: 18, delay: 1200, spin: 6.1 },
    { left: "14%", size: 40, duration: 17, delay: 2400, spin: 6.8 },
    { left: "20%", size: 33, duration: 19, delay: 3600, spin: 6.2 },
    { left: "26%", size: 42, duration: 21, delay: 4800, spin: 7.4 },
    { left: "30%", size: 28, duration: 15, delay: 6000, spin: 5.8 },
  ];

  const rightCoins = [
    { right: "2%",  size: 31, duration: 22, delay: 600,  spin: 6.6 },
    { right: "8%",  size: 39, duration: 19, delay: 1800, spin: 6.3 },
    { right: "14%", size: 29, duration: 16, delay: 3000, spin: 6.0 },
    { right: "20%", size: 36, duration: 20, delay: 4200, spin: 6.9 },
    { right: "26%", size: 32, duration: 17, delay: 5400, spin: 6.2 },
    { right: "30%", size: 41, duration: 21, delay: 6600, spin: 7.2 },
  ];

  return (
    <>
      {/* Keyframes locales */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fallLinear {
            0%   { transform: translateY(-30vh); opacity: 0; }
            5%   { opacity: 1; }
            95%  { opacity: 1; }
            100% { transform: translateY(130vh); opacity: 0; }
          }
          @keyframes rotateCoin {
            to { transform: rotateY(360deg); }
          }
        `,
        }}
      />

      <section className="relative w-full h-[80vh] md:h-screen bg-black overflow-hidden">
        {/* Monedas detrás del texto */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {leftCoins.map((c, i) => (
            <FallingCoin3D
              key={`left-${i}`}
              size={c.size}
              duration={c.duration}
              delay={c.delay}
              spin={c.spin}
              position={{ left: c.left }}
            />
          ))}
          {rightCoins.map((c, i) => (
            <FallingCoin3D
              key={`right-${i}`}
              size={c.size}
              duration={c.duration}
              delay={c.delay}
              spin={c.spin}
              position={{ right: c.right }}
            />
          ))}
        </div>

        {/* Texto central */}
        <div className="absolute inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-8">
          <h1 className="w-full max-w-4xl text-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight backdrop-blur-sm bg-black/20 rounded-lg p-4 sm:p-6 md:p-8">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-2 sm:mr-3 md:mr-4 transition-all duration-1000 transform ${
                  index <= currentWordIndex ? "opacity-100" : "opacity-0 -translate-y-4"
                }`}
                style={{
                  color: "#dfb95a",
                  textShadow:
                    "0 0 20px rgba(229,192,123,0.8), 0 0 40px rgba(229,192,123,0.5), 2px 2px 4px rgba(0,0,0,0.8)",
                  transitionDelay: `${index * 0.15}s`,
                }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>
      </section>
    </>
  );
}

/* ===== Moneda 3D que cae por los costados ===== */
function FallingCoin3D({ size = 70, duration = 16, delay = 0, spin = 6.5, position = {} }) {
  return (
    <div
      className="absolute will-change-transform"
      style={{
        ...position,
        top: "-30vh",
        animation: `fallLinear ${duration}s linear infinite`,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Cuerpo de la moneda (con grosor y brillo) */}
      <div
        className="
          relative w-[0.15em] h-[1em]
          bg-[conic-gradient(from_180deg_at_50%_50%,#dfb95a,#fff8d3,#dfb95a,#b08a2e,#dfb95a)]
          [transform-style:preserve-3d]
          drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]
          
          before:content-[''] before:absolute before:w-[1em] before:h-[1em]
          before:rounded-full before:right-[-0.4em]
          before:[transform:rotateY(90deg)]
          before:[-webkit-backface-visibility:hidden]
          before:[backface-visibility:hidden]
          before:bg-[linear-gradient(#dfb95a,#7a6524)]
          before:shadow-[inset_2px_0_6px_rgba(0,0,0,0.6)]
          
          after:content-[''] after:absolute after:w-[1em] after:h-[1em]
          after:rounded-full after:left-[-0.4em]
          after:[transform:rotateY(-90deg)]
          after:[-webkit-backface-visibility:hidden]
          after:[backface-visibility:hidden]
          after:bg-[linear-gradient(#dfb95a,#7a6524)]
          after:shadow-[inset_-2px_0_6px_rgba(0,0,0,0.6)]
        "
        style={{
          fontSize: `${size}px`,
          animation: `rotateCoin ${spin}s linear infinite`,
        }}
      >
        {/* Cara frontal */}
        <div
          className="
            absolute w-[1em] h-[1em] overflow-hidden rounded-full
            right-[-0.4em]
            [transform:rotateY(-90deg)]
            [-webkit-backface-visibility:hidden]
            [backface-visibility:hidden]
          "
        >
          <CoinFace />
        </div>

        {/* Cara trasera (espejada) */}
        <div
          className="
            absolute w-[1em] h-[1em] overflow-hidden rounded-full
            left-[-0.4em]
            [transform:rotateY(90deg)]
            [-webkit-backface-visibility:hidden]
            [backface-visibility:hidden]
          "
        >
          <CoinFace mirrored />
        </div>
      </div>
    </div>
  );
}

/* Caras con la imagen money.svg desde /public */
function CoinFace({ mirrored = false }) {
  return (
    <img
      src="/money.svg"
      alt="coin face"
      draggable={false}
      className="w-full h-full"
      style={{
        display: "block",
        objectFit: "contain",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))",
        transform: mirrored ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
