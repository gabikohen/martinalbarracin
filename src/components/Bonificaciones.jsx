"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Datos ordenados de enero a agosto
const bonificacionesData = [
  { mes: "Enero", monto: "$12.5 Millones" },
  { mes: "Febrero", monto: "$15.7 Millones" },
  { mes: "Marzo", monto: "$18.0 Millones" },
  { mes: "Abril", monto: "$21.3 Millones" },
  { mes: "Mayo", monto: "$23.3 Millones" },
  { mes: "Junio", monto: "$25.9 Millones" },
  { mes: "Julio", monto: "$29.1 Millones" },
  { mes: "Agosto", monto: "$36.5 Millones" },
];

// Calcular monto total numérico (1 decimal)
const montoTotalNumber = Number(
  bonificacionesData
    .reduce((total, item) => total + parseFloat(item.monto.replace(/[^0-9.]/g, "")), 0)
    .toFixed(1)
);

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const Bonificaciones = () => {
  const [count, setCount] = useState(0);
  const animatedOnceRef = useRef(false);
  const rafIdRef = useRef(null);

  useEffect(() => {
    if (animatedOnceRef.current) return;
    animatedOnceRef.current = true;

    const duration = 2000; // ms
    const startValue = 0;
    const endValue = montoTotalNumber;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);
      const value = startValue + (endValue - startValue) * eased;

      setCount(value); // guardamos el valor "vivo" (sin toFixed)

      if (t < 1) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        setCount(endValue); // asegurar valor final exacto
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <section id="bonificaciones" className="py-16 bg-black sm:py-20">
      <div className="max-w-6xl px-4 sm:px-6 mx-auto lg:px-8">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-center sm:text-5xl mb-12 tracking-tight"
          style={{ color: "#dfb95a" }}
        >
          Bonificaciones
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
          {/* Columna Izquierda: Bonificaciones Mensuales */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {bonificacionesData.map((bono) => (
              <motion.div
                key={bono.mes}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 6px 18px rgba(223, 185, 90, 0.25)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-transparent border border-neutral-800 rounded-xl p-5 text-center"
              >
                <p className="text-base font-medium text-gray-400">
                  {bono.mes} 2025
                </p>
                <p className="text-xl font-bold mt-2" style={{ color: "#dfb95a" }}>
                  {bono.monto}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Columna Derecha: Bonificaciones Totales */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/3 flex flex-col items-center lg:items-start mt-8 lg:mt-0 lg:pl-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-transparent border border-neutral-800 backdrop-blur-sm p-8 rounded-xl shadow text-center lg:text-left"
            >
              <h3 className="text-xl font-semibold text-gray-300">
                Bonificaciones Totales
              </h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold mt-3 tracking-tight"
                style={{ color: "#dfb95a" }}
              >
                {count.toFixed(1)} Millones
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Bonificaciones;
