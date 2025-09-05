"use client";

import { useState, useEffect, useRef } from "react";
import { X, Sparkles, Gift } from "lucide-react";

export default function PrizeWheel3D({
  onClose,
  autoOpenOnce = true,
  whatsappNumber = "5491155555555", // tu número (sin +)
  whatsappMessage, // opcional; si no viene, se arma con el %
}) {
  const [isOpen, setIsOpen] = useState(!autoOpenOnce);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [idleRotation, setIdleRotation] = useState(0);
  const playedFlag = useRef(false);

  // 🔹 Colores únicos por segmento (no repetir)
  const prizes = [
    { id: 1, text: "10%", value: 10, color: "#FF00FF" }, // fucsia
    { id: 2, text: "20%", value: 20, color: "#00FFFF" }, // celeste
    { id: 3, text: "30%", value: 30, color: "#39FF14" }, // verde flúo
    { id: 4, text: "5%",  value: 5,  color: "#FFFF00" }, // amarillo
    { id: 5, text: "15%", value: 15, color: "#FF1493" }, // rosa fuerte
    { id: 6, text: "25%", value: 25, color: "#00FF00" }, // verde
    { id: 7, text: "35%", value: 35, color: "#FF4500" }, // naranja
  ];
  const segmentAngle = 360 / prizes.length;

  // idle rotation suave
  useEffect(() => {
    if (!isSpinning) {
      const itv = setInterval(() => setIdleRotation((p) => p + 0.3), 50);
      return () => clearInterval(itv);
    }
  }, [isSpinning]);

  // abrir una sola vez por sesión si autoOpenOnce
  useEffect(() => {
    if (!autoOpenOnce) return;
    if (playedFlag.current) return;
    setIsOpen(true);
  }, [autoOpenOnce]);

  const spinWheel = () => {
    if (isSpinning || hasPlayed) return;
    setIsSpinning(true);
    setShowResult(false);

    const i = Math.floor(Math.random() * prizes.length);
    const sel = prizes[i];
    const targetAngle = i * segmentAngle + segmentAngle / 2;
    const spinRotation = 1440 + (360 - targetAngle); // 4 vueltas + alineación

    setRotation((prev) => prev + spinRotation);
    setSelectedPrize(sel);

    setTimeout(() => {
      setIsSpinning(false);
      setShowResult(true);
      setHasPlayed(true);
    }, 3000);
  };

  const resetGame = () => {
    setHasPlayed(false);
    setShowResult(false);
    setSelectedPrize(null);
    setRotation(0);
    setIdleRotation(0);
  };

  const closePopup = () => {
    setIsOpen(false);
    playedFlag.current = true;
    resetGame();
    onClose?.();
  };

  const handleClaim = () => {
    const msg =
      whatsappMessage ??
      `Hola, quiero reclamar mi premio de ${selectedPrize?.value}% de descuento 🎉`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* accesibilidad motion-safe */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (prefers-reduced-motion: reduce) {
              .motion-safe\\:animate-spin { animation: none !important; }
            }
          `,
        }}
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        <div className="relative bg-black/60 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-8 w-full max-w-[92vw] sm:max-w-xl md:max-w-2xl shadow-2xl border border-white/20 backdrop-blur-md">
          <button
            onClick={closePopup}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-300 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2 shadow-lg hover:shadow-xl"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#dfb95a] to-[#dfb95a] bg-clip-text mb-4 sm:mb-6">
              🎉 ¡Gira y Gana! 🎉
            </h2>

            {/* RULETA — MISMA ESTRUCTURA (segmentos con clipPath) */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto mb-6 sm:mb-8">
              <div
                className="relative w-full h-full rounded-full border-[6px] sm:border-[8px] border-white/30 overflow-hidden shadow-[0_0_30px_rgba(255,255,0,0.45)] transition-transform duration-[3000ms] ease-out will-change-transform"
                style={{ transform: `rotate(${rotation + idleRotation}deg)` }}
              >
                {/* Segmentos individuales (sin solapes visuales) */}
                {prizes.map((prize, index) => {
                  const startAngle = index * segmentAngle;
                  const endAngle = (index + 1) * segmentAngle;
                  return (
                    <div
                      key={`segment-${prize.id}`}
                      className="absolute inset-0"
                      style={{
                        // un conic "corto" por segmento + clipPath del sector
                        background: `conic-gradient(from ${startAngle}deg, ${prize.color} 0deg, ${prize.color} ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                        clipPath: `polygon(50% 50%, ${
                          50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)
                        }% ${
                          50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)
                        }%, ${
                          50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)
                        }% ${
                          50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)
                        }%)`,
                      }}
                    />
                  );
                })}

                {/* Labels — SOLO TEXTO, con sombra para legibilidad */}
                {prizes.map((prize, index) => {
                  const midAngle = index * segmentAngle + segmentAngle / 2;
                  const textAngle = (midAngle - 90) * (Math.PI / 180);
                  const r = 90;
                  const x = Math.cos(textAngle) * r;
                  const y = Math.sin(textAngle) * r;
                  return (
                    <div
                      key={`text-${prize.id}`}
                      className="absolute text-white font-black text-base sm:text-lg md:text-xl flex flex-col items-center justify-center select-none"
                      style={{
                        left: `calc(50% + ${x}px - 24px)`,
                        top: `calc(50% + ${y}px - 24px)`,
                        transform: `rotate(${midAngle}deg)`,
                      }}
                    >
                      <span
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-none"
                        style={{
                          textShadow:
                            "0 0 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)",
                        }}
                      >
                        {prize.text}
                      </span>
                      <span
                        className="text-[10px] sm:text-xs font-bold mt-0.5 sm:mt-1 leading-none"
                        style={{
                          textShadow:
                            "0 0 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)",
                        }}
                      >
                        DESC
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Centro */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-yellow-400 rounded-full border-[3px] sm:border-[4px] border-white shadow-[0_0_18px_rgba(255,215,0,0.85)] flex items-center justify-center">
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-800" />
                </div>
              </div>

              {/* Puntero */}
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-30">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] sm:border-l-[8px] sm:border-r-[8px] sm:border-b-[16px] border-transparent border-b-red-500" />
              </div>
            </div>

            {/* Botón de girar */}
            {!hasPlayed && (
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className={`w-full py-3 sm:py-4 px-4 sm:px-8 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform 
                  border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]
                  ${isSpinning
                    ? "bg-gray-400 cursor-not-allowed scale-95 text-white"
                    : "bg-transparent text-[#dfb95a] hover:scale-105 hover:text-[#dfb95a] hover:drop-shadow-[0_0_10px_rgba(229,192,123,0.8)]"}`}
              >
                {isSpinning ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin motion-safe:animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Procesando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="mr-2 sm:mr-3 animate-pulse" size={22} />
                    ¡GIRAR RULETA!
                    <Sparkles className="ml-2 sm:ml-3 animate-pulse" size={22} />
                  </div>
                )}
              </button>
            )}

            {/* Resultado — texto más chico, sin “Código” */}
            {showResult && selectedPrize && (
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl text-white shadow-2xl border-2 sm:border-4 border-white/30">
                <p className="text-[11px] sm:text-sm font-semibold mb-2 sm:mb-3 text-center">
                  📸 Para reclamar tu premio, sacá un screenshot
                </p>
                <h3 className="text-lg sm:text-xl md:text-xl font-black mb-1 sm:mb-2">
                  🎉 ¡FELICITACIONES! 🎉
                </h3>
                <p className="text-sm sm:text-base mb-1">Ganaste:</p>
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-yellow-300 mb-3 drop-shadow-lg">
                  {selectedPrize.value}% DE DESCUENTO
                </div>

                <div className="flex justify-center mt-3 sm:mt-4">
                  <button
                    onClick={handleClaim}
                    className="bg-white text-green-600 font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    📸 Reclamar tu premio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
