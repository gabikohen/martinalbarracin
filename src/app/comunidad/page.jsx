"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import HallOfFameList from "./HallOfFameList";

/* Título dorado */
const GoldenTitle = ({ children, className = "" }) => (
  <h2
    className={`font-extrabold ${className}`}
    style={{
      background: "linear-gradient(45deg, #bfb281, #fff3b0, #bfb281)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow:
        "0 0 10px rgba(191,178,129,0.6), 0 0 15px rgba(191,178,129,0.4)",
      filter: "drop-shadow(0 0 6px rgba(191,178,129,0.6))",
      letterSpacing: "0.5px",
    }}
  >
    {children}
  </h2>
);

/* Texto neón verde mejorado (más legible) */
const NeonText = ({ children, className = "font-semibold" }) => (
  <motion.span
    className={className}
    style={{
      backgroundImage: "linear-gradient(90deg, #33cc4d, #99ff99, #33cc4d)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: `
        0 0 6px rgba(50, 200, 80, 0.8),
        0 0 12px rgba(50, 200, 80, 0.6),
        0 0 18px rgba(50, 200, 80, 0.4)
      `,
      filter: "drop-shadow(0 0 5px rgba(50, 200, 80, 0.8))",
    }}
    initial={{ opacity: 0.6 }}
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
  >
    {children}
  </motion.span>
);

export default function ComunidadSection() {
  // === Mock data ===
  const cargasMes = 7500;
  const tiempoRespuesta = "1 Min";
  const estado = "Operando normal";

  const categorias = [
    { nombre: "MS5", valor: 142 },
    { nombre: "MS6", valor: 87 },
    { nombre: "MS7", valor: 64 },
    { nombre: "MS8", valor: 41 },
  ];

  return (
    <section
      id="comunidad"
      className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* ===== 1) ESTADO EN VIVO ===== */}
        <GoldenTitle className="text-3xl sm:text-4xl lg:text-5xl mb-3 text-center">
          Comunidad MarTeam
        </GoldenTitle>

        <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-8 sm:mb-10 max-w-3xl mx-auto text-center">
          Sumate y recibí <NeonText>promos reales</NeonText>,{" "}
          <NeonText>cargas priorizadas</NeonText> y{" "}
          <NeonText>ascensos con recompensa</NeonText>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-center">
            <div className="text-xs sm:text-sm text-white/60 mb-1">
              Cargas este mes
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold">
              <NeonText>{cargasMes}+</NeonText>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-center">
            <div className="text-xs sm:text-sm text-white/60 mb-1">
              Tiempo de respuesta
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold">
              <NeonText>{tiempoRespuesta}</NeonText>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-center">
            <div className="text-xs sm:text-sm text-white/60 mb-1">Estado</div>
            <div className="text-sm sm:text-base font-semibold">
              <NeonText>{estado}</NeonText>
            </div>
          </div>
        </div>

        {/* ===== 2) ASCENSOS DE CATEGORÍA ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-center">
          Ascensos de Categoría
        </GoldenTitle>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {categorias.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 hover:border-white/30 shadow-2xl text-center"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">
                <NeonText>{c.nombre}</NeonText>
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                <NeonText>{c.valor}</NeonText>
              </p>
              <p className="text-xs sm:text-sm text-gray-300">{c.etiqueta}</p>
            </motion.div>
          ))}
        </div>

        {/* ===== 3) HALL OF FAME ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-center">
          Hall of Fame
        </GoldenTitle>
        <div className="flex justify-center">
          <HallOfFameList />
        </div>
      </div>
    </section>
  );
}
