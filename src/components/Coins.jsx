import { useEffect, useRef } from "react";

export default function Coins() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const createCoins = () => {
      // Limpio
      el.innerHTML = "";

      // Medimos el ancho REAL del contenedor (no la ventana)
      const { width } = el.getBoundingClientRect();

      // Breakpoints (coinciden con tu CSS)
      let numCoins, coinSize;
      if (width < 640) {
        numCoins = 10; coinSize = 20;
      } else if (width < 1024) {
        numCoins = 15; coinSize = 32;
      } else {
        numCoins = 30; coinSize = 50;
      }

      // Hasta el borde derecho sin cortar
      const maxLeft = Math.max(0, width - coinSize);

      for (let i = 0; i < numCoins; i++) {
        const coin = document.createElement("div");
        coin.className = "coin";

        // Posición horizontal uniforme en TODO el ancho
        coin.style.left = `${Math.random() * maxLeft}px`;

        // Opcional: empezar un poco arriba, aleatorio
        coin.style.top = `${-Math.random() * 200}px`;

        // Animaciones
        const fallDuration = 5 + Math.random() * 10;
        const spinDuration = 3 + Math.random() * 3;
        coin.style.animationDuration = `${fallDuration}s, ${spinDuration}s`;
        coin.style.animationDelay = `-${Math.random() * 15}s, 0s`;

        el.appendChild(coin);
      }
    };

    // Crear al montar
    createCoins();

    // Re-crear al redimensionar
    const onResize = () => createCoins();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      el.innerHTML = "";
    };
  }, []);

  // relative+w-full+h-full => las coins (absolute) se posicionan bien
  return <div ref={containerRef} className="relative w-full h-full"></div>;
}
