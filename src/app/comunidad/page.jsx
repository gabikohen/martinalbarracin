"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HallOfFameList from "./HallOfFameList";

/* Título dorado - Mejorado */
const GoldenTitle = ({ children, className = "" }) => (
  <h2
    className={`font-extrabold ${className}`}
    style={{
      background: "linear-gradient(45deg, #e0c26b, #fff7c0, #e0c26b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow:
        "0 0 12px rgba(224,194,107,0.7), 0 0 20px rgba(224,194,107,0.5)",
      filter: "drop-shadow(0 0 8px rgba(224,194,107,0.7))",
      letterSpacing: "0.8px",
    }}
  >
    {children}
  </h2>
);

/** 🔹 Mismo efecto del footer (QuienesSomos), en verde */
const GREEN_FOOTER_GLOW = {
  background: "linear-gradient(45deg, #338c3b, #66ff66, #338c3b)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 10px rgba(51,140,59,0.6), 0 0 15px rgba(51,140,59,0.4)",
  filter: "drop-shadow(0 0 6px rgba(51,140,59,0.6))",
  letterSpacing: "0.5px",
};

/** 🔹 Texto reutilizable con el glow del footer (sin animación) */
const NeonText = ({ children, className = "font-bold" }) => (
  <span className={className} style={GREEN_FOOTER_GLOW}>
    {children}
  </span>
);

export default function ComunidadSection() {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Sin categoría");

  // === Mock data ===
  const cargasMes = 7500;
  const tiempoRespuesta = "1 Min";
  const estado = "Operando normal";

  const categorias = [
    { nombre: "MA5", valor: 142, etiqueta: "Cargas realizadas" },
    { nombre: "MA6", valor: 87, etiqueta: "Cargas realizadas" },
    { nombre: "MA7", valor: 64, etiqueta: "Cargas realizadas" },
    { nombre: "MA8", valor: 41, etiqueta: "Cargas realizadas" },
  ];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategoryList(false);
  };

  return (
    <section
      id="comunidad"
      className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white bg-black relative overflow-hidden"
    >
      {/* Fondo sutil */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(30,30,30,0.8) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%)",
          backgroundBlendMode: "overlay",
          backgroundSize: "150% 150%",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/path-to-subtle-texture.png)",
          opacity: 0.05,
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ===== 1) ESTADO EN VIVO ===== */}
        <GoldenTitle className="text-3xl sm:text-4xl lg:text-5xl mb-3 text-center">
          Comunidad MarTeam
        </GoldenTitle>

        <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-8 sm:mb-10 max-w-3xl mx-auto text-center font-light">
          Sumate y recibí <NeonText>promos reales</NeonText>,{" "}
          <NeonText>cargas priorizadas</NeonText> y{" "}
          <NeonText>ascensos con recompensa</NeonText>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 ease-in-out text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="text-xs sm:text-sm text-white/70 mb-2">
                Cargas este mes
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold">
                <NeonText>{cargasMes}+</NeonText>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 ease-in-out text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="text-xs sm:text-sm text-white/70 mb-2">
                Tiempo de respuesta
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold">
                <NeonText>{tiempoRespuesta}</NeonText>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 ease-in-out text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="text-xs sm:text-sm text-white/70 mb-2">Estado</div>
              <div className="text-lg sm:text-xl font-semibold">
                <NeonText>{estado}</NeonText>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== 2) ASCENSOS DE CATEGORÍA ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center">
          Ascensos de Categoría
        </GoldenTitle>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {categorias.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-green-500/30 shadow-xl hover:shadow-green-500/20 transition-all duration-300 ease-in-out text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3">
                  <NeonText>{c.nombre}</NeonText>
                </h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                  <NeonText>{c.valor}</NeonText>
                </p>
                <p className="text-xs sm:text-sm text-gray-400">{c.etiqueta}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== 3) HALL OF FAME ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center">
          Hall of Fame
        </GoldenTitle>
        <div className="flex justify-center mb-10">
          <HallOfFameList />
        </div>
      </div>
    </section>
  );
}