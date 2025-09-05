"use client";

import { useEffect, useRef } from "react";

export default function Coins() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    // 👉 Cantidad según breakpoint
    const w = window.innerWidth;
    let numCoins = 20;
    if (w < 640) {
      numCoins = 12; // mobile
    } else if (w < 1024) {
      numCoins = 20; // tablet
    } else {
      numCoins = 30; // desktop
    }

    for (let i = 0; i < numCoins; i++) {
      const coin = document.createElement("div");
      coin.className = "coin";

      // Posición horizontal (aleatoria)
      coin.style.left = `${Math.random() * 100}%`;

      // Duraciones y delays
      coin.style.animationDuration = `${5 + Math.random() * 10}s, ${3 + Math.random() * 3}s`;
      coin.style.animationDelay = `-${Math.random() * 15}s, 0s`;

      container.appendChild(coin);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="container"></div>;
}
