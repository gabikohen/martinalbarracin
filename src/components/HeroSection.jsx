"use client";

import { useEffect, useState, memo } from "react";

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = [
    "Lo",
    "que",
    "importa",
    "es",
    "la",
    "confianza",
    "en",
    "el",
    "cajero,",
    "no",
    "la",
    "plataforma",
  ];

 useEffect(() => {
  const id = setInterval(() => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
  }, 2000);
  return () => clearInterval(id);
}, []); // ✅ array vacío

  const leftCoins = [
    { left: "2%", size: 35, duration: 16, delay: 0, spin: 10 },
    { left: "8%", size: 30, duration: 18, delay: 1200, spin: 10 },
    { left: "14%", size: 40, duration: 17, delay: 2400, spin: 10 },
    { left: "20%", size: 33, duration: 19, delay: 3600, spin: 10 },
    { left: "26%", size: 42, duration: 21, delay: 4800, spin: 10 },
    { left: "30%", size: 28, duration: 15, delay: 6000, spin: 10 },
  ];
  const rightCoins = [
    { right: "2%", size: 31, duration: 22, delay: 600, spin: 10 },
    { right: "8%", size: 39, duration: 19, delay: 1800, spin: 10 },
    { right: "14%", size: 29, duration: 16, delay: 3000, spin: 10 },
    { right: "20%", size: 36, duration: 20, delay: 4200, spin: 10 },
    { right: "26%", size: 32, duration: 17, delay: 5400, spin: 10 },
    { right: "30%", size: 41, duration: 21, delay: 6600, spin: 10 },
  ];

  return (
    <>
      {/* CSS monedas 3D */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root{
            --coin-gold-1:#dfb95a;
            --coin-gold-2:#7a6524;
            --coin-highlight:#fff8d3;
            --coin-thickness:0.14em; 
          }
          @keyframes fallLinear {
            0% { transform: translateY(-30vh); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateY(130vh); opacity: 0; }
          }
          @keyframes coin-rotate { to { transform: rotateY(360deg); } }

          .coin3d{
            font-size: var(--coin-size,60px);
            width: var(--coin-thickness);
            height: 1em;
            position: relative;
            margin: 0 auto;
            transform-style: preserve-3d;
            border-radius: calc(var(--coin-thickness) / 2);
            background: linear-gradient(var(--coin-gold-1), var(--coin-gold-2));
            box-shadow: inset 0 0 10px rgba(0,0,0,.35);
            animation: coin-rotate var(--coin-spin,6s) linear infinite;
          }

          .coin3d::before, .coin3d::after{
            content:"";
            position:absolute; width:1em; height:1em; border-radius:50%;
            backface-visibility:hidden;
            background: radial-gradient(ellipse at 30% 30%, var(--coin-highlight) 0%, var(--coin-gold-1) 40%, #b08a2e 60%, var(--coin-gold-2) 100%);
            box-shadow: inset 0 0 10px rgba(0,0,0,.45);
          }
          .coin3d::before{
            right: calc(var(--coin-thickness) * -4);
            transform: rotateY(90deg);
          }
          .coin3d::after{
            left: calc(var(--coin-thickness) * -4);
            transform: rotateY(-90deg);
          }

          .coin3d .side{
            position:absolute; width:1em; height:1em;
            border-radius:50%; overflow:hidden;
            box-shadow: inset 0 0 8px rgba(0,0,0,.35);
            backface-visibility:hidden;
          }
          .coin3d .side.heads{
            right: calc(var(--coin-thickness) * -4);
            transform: rotateY(-90deg);
          }
          .coin3d .side.tails{
            left: calc(var(--coin-thickness) * -4);
            transform: rotateY(90deg);
          }
          .coin3d .side > img{
            width:100%; height:100%; display:block;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,.55));
          }
        `,
        }}
      />

      <section className="relative w-full h-[80vh] md:h-screen bg-black overflow-hidden">
        {/* Monedas cayendo */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {leftCoins.map((c, i) => (
            <FallingCoin
              key={`l-${i}`}
              size={c.size}
              duration={c.duration}
              delay={c.delay}
              spin={c.spin}
              position={{ left: c.left }}
            />
          ))}
          {rightCoins.map((c, i) => (
            <FallingCoin
              key={`r-${i}`}
              size={c.size}
              duration={c.duration}
              delay={c.delay}
              spin={c.spin}
              position={{ right: c.right }}
            />
          ))}
        </div>

        {/* Texto central */}
        <div className="absolute inset-0 z-50 flex items-center justify-center px-4">
          <h1 className="w-full max-w-4xl text-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-2 sm:mr-3 md:mr-4 transition-all duration-1000 transform ${
                  index === currentWordIndex
                    ? "opacity-100"
                    : "opacity-0 -translate-y-4"
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
    </>
  );
}

/* Contenedor de la moneda que cae */
const FallingCoin = memo(function FallingCoin({
  size = 60,
  duration = 16,
  delay = 0,
  spin = 11,
  position = {},
}) {
  return (
    <div
      className="absolute will-change-transform"
      style={{
        ...position,
        top: "-30vh",
        animation: `fallLinear ${duration}s linear infinite`,
        animationDelay: `${delay}ms`,
        perspective: "900px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <Coin3D size={size} spin={spin} front="/money.svg" back="/money.svg" />
    </div>
  );
});

/* Moneda 3D */
function Coin3D({ size = 90, spin = 9, front = "/money.svg", back = "/money.svg" }) {
  return (
    <div
      className="coin3d drop-shadow-[0_0_28px_rgba(255,215,0,0.38)]"
      style={{ ["--coin-size"]: `${size}px`, ["--coin-spin"]: `${spin}s` }}
    >
      <div className="side heads">
        <img src={front} alt="cara" draggable={false} />
      </div>
      <div className="side tails">
        <img src={back} alt="cruz" draggable={false} style={{ transform: "scaleX(-1)" }} />
      </div>
    </div>
  );
}
