"use client";

import { useEffect, useRef } from "react";

export default function Coins() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    // 👉 Cantidad y TAMAÑO según breakpoint (sincronizado con CSS)
    const w = window.innerWidth;
    let numCoins = 20;
    let coinWidth = 50; // Ancho por defecto para desktop

    if (w < 640) {
      numCoins = 15; // mobile
      coinWidth = 20; // Ancho de moneda en mobile (font-size: 20px)
    } else if (w < 1024) {
      numCoins = 20; // tablet
      coinWidth = 32; // Ancho de moneda en tablet (font-size: 32px)
    } else {
      numCoins = 35; // desktop
      coinWidth = 50; // Ancho de moneda en desktop (font-size: 50px)
    }

    const maxLeft = w - coinWidth; // Usamos el ancho correcto

    for (let i = 0; i < numCoins; i++) {
      const coin = document.createElement("div");
      coin.className = "coin";

      // Posición horizontal → ahora se calcula correctamente
      coin.style.left = `${Math.random() * maxLeft}px`;

      // Duraciones y delays
      const fallDuration = 5 + Math.random() * 10;
      const spinDuration = 3 + Math.random() * 3;
      coin.style.animationDuration = `${fallDuration}s, ${spinDuration}s`;
      coin.style.animationDelay = `-${Math.random() * 15}s, 0s`;

      container.appendChild(coin);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="container"></div>;
}