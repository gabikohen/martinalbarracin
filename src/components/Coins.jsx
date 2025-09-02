"use client";

import { useEffect, useRef } from "react";

export default function Coins() {
  const containerRef = useRef(null);

  useEffect(() => {
   const container = document.querySelector('.container');
        const numCoins = 30;

        for (let i = 0; i < numCoins; i++) {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            coin.style.left = `${Math.random() * 100}%`; // Posición horizontal aleatoria
            coin.style.animationDuration = `${5 + Math.random() * 10}s, ${3 + Math.random() * 3}s`; // Duración caída (5-15s), rotación (3-6s)
            coin.style.animationDelay = `-${Math.random() * 15}s, 0s`; // Delay para loop
            coin.style.fontSize = `${30 + Math.random() * 40}px`; // Tamaño aleatorio (30-70px)

            // Cara "heads"
            const heads = document.createElement('div');
            heads.classList.add('side', 'heads');

            // Cara "tails"
            const tails = document.createElement('div');
            tails.classList.add('side', 'tails');

            coin.appendChild(heads);
            coin.appendChild(tails);
            container.appendChild(coin);
        }
    
  }, []);

  return <div ref={containerRef} className="container"></div>;
}
