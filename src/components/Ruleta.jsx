"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Gift } from "lucide-react";

const PrizeWheel3D = ({ onClose }) => {
  // MODIFICACIÓN 1: Inicializa 'isOpen' en 'false'. Se decidirá en useEffect si se abre.
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [idleRotation, setIdleRotation] = useState(0);

  const prizes = [
    { id: 1, text: "10%", value: 10, color: "#FF00FF" },
    { id: 2, text: "20%", value: 20, color: "#00FFFF" },
    { id: 3, text: "30%", value: 30, color: "#39FF14" },
    { id: 4, text: "5%", value: 5, color: "#FFFF00" },
    { id: 5, text: "15%", value: 15, color: "#FF1493" },
    { id: 6, text: "25%", value: 25, color: "#00FF00" },
    { id: 7, text: "35%", value: 35, color: "#FF4500" }
  ];

  const segmentAngle = 360 / prizes.length;

  useEffect(() => {
    if (!isSpinning) {
      const interval = setInterval(() => {
        setIdleRotation((prev) => prev + 0.3);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  const spinWheel = () => {
    if (isSpinning || hasPlayed) return;
    setIsSpinning(true);
    setShowResult(false);
    
    // MODIFICACIÓN 3: Marcar que el usuario ya jugó en esta sesión.
    sessionStorage.setItem('hasPlayedPrizeWheel', 'true');

    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomPrizeIndex];

    const targetAngle = randomPrizeIndex * segmentAngle + segmentAngle / 2;
    const spinRotation = 1440 + (360 - targetAngle);

    setRotation((prev) => prev + spinRotation);
    setSelectedPrize(selectedPrize);

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
    // MODIFICACIÓN 4: Marcar también al cerrar, para que no vuelva a aparecer si no jugó.
    sessionStorage.setItem('hasPlayedPrizeWheel', 'true');
    resetGame();
    if (onClose) onClose();
  };
  
  // MODIFICACIÓN 2: Lógica principal para mostrar la ruleta solo una vez por sesión.
  useEffect(() => {
    const hasPlayedInSession = sessionStorage.getItem('hasPlayedPrizeWheel');
    
    // Si no hay registro de que haya jugado en esta sesión, mostramos la ruleta.
    if (!hasPlayedInSession) {
      setIsOpen(true);
    }
  }, []); // El array vacío asegura que esto se ejecute solo una vez cuando el componente se monta.

  // Solo renderizamos el componente si isOpen es true.
  if (!isOpen) {
    return null;
  }

  return (
    <div className=" bg-transparent flex items-center justify-center">
      {/* Ya no es necesario el condicional {isOpen && ...} porque lo manejamos arriba */}
      <div className="fixed inset-0  flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-black/60 rounded-3xl p-6 sm:p-8 max-w-md sm:max-w-2xl w-full relative shadow-2xl border border-white/20 backdrop-blur-md">
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2 shadow-lg hover:shadow-xl"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#dfb95a] to-[#dfb95a] bg-clip-text mb-6">
              🎉 ¡Gira y Gana! 🎉
            </h2>

            <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto mb-8">
              <div
                className="relative w-full h-full rounded-full border-8 border-white/30 overflow-hidden shadow-[0_0_40px_rgba(255,255,0,0.5)] transition-transform duration-[3000ms] ease-out"
                style={{
                  transform: `rotate(${rotation + idleRotation}deg)`
                }}
              >
                {prizes.map((prize, index) => {
                  const startAngle = index * segmentAngle;
                  const endAngle = (index + 1) * segmentAngle;

                  return (
                    <div
                      key={`segment-${prize.id}`}
                      className="absolute inset-0"
                      style={{
                        background: `conic-gradient(from ${startAngle}deg, ${prize.color} 0deg, ${prize.color} ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)}%)`
                      }}
                    ></div>
                  );
                })}

                {prizes.map((prize, index) => {
                  const midAngle = index * segmentAngle + segmentAngle / 2;
                  const textAngle = (midAngle - 90) * (Math.PI / 180);
                  const textRadius = 110;
                  const textX = Math.cos(textAngle) * textRadius;
                  const textY = Math.sin(textAngle) * textRadius;

                  return (
                    <div
                      key={`text-${prize.id}`}
                      className="absolute text-white font-black text-lg sm:text-xl flex flex-col items-center justify-center"
                      style={{
                        left: `calc(50% + ${textX}px - 28px)`,
                        top: `calc(50% + ${textY}px - 28px)`,
                        transform: `rotate(${midAngle}deg)`
                      }}
                    >
                      <span className="text-2xl sm:text-3xl font-black drop-shadow-lg leading-none">
                        {prize.text}
                      </span>
                      <span className="text-xs font-bold mt-1 drop-shadow-lg leading-none">
                        DESC
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-white shadow-[0_0_20px_rgba(255,255,0,0.8)] flex items-center justify-center">
                  <Gift className="w-6 h-6 text-yellow-800" />
                </div>
              </div>

              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-red-500"></div>
              </div>
            </div>

            {!hasPlayed && (
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform 
                border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] 
                ${isSpinning
                    ? 'bg-gray-400 cursor-not-allowed scale-95'
                    : 'bg-transparent text-[#dfb95a] hover:scale-105 hover:text-[#dfb95a] hover:drop-shadow-[0_0_10px_rgba(229,192,123,0.8)]'
                  }
                `}
              >
                {isSpinning ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Girando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="mr-3 animate-pulse" size={24} />
                    ¡GIRAR RULETA!
                    <Sparkles className="ml-3 animate-pulse" size={24} />
                  </div>
                )}
              </button>
            )}

            {showResult && selectedPrize && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl text-white shadow-2xl border-4 border-white/30">
                <p className="text-sm sm:text-base font-semibold mb-3 text-center">📸 Para reclamar tu premio, sacá un screenshot</p>
                <h3 className="text-3xl font-black mb-2 animate-pulse">🎉 ¡FELICITACIONES! 🎉</h3>
                <p className="text-xl">Ganaste:</p>
                <div className="text-4xl font-extrabold text-yellow-300 mb-2 drop-shadow-lg">
                  {selectedPrize.value}% DE DESCUENTO
                </div>
                <p className="text-sm mb-3">
                  Código: <span className="bg-white text-black px-3 py-1 rounded font-mono">SPIN{selectedPrize.value}</span>
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={closePopup}
                    className="bg-white text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    📸 Reclamar tu premio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeWheel3D;