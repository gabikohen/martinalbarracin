"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HallOfFameList from "./HallOfFameList";

/* Título dorado - Mejorado */
const GoldenTitle = ({ children, className = "" }) => (
  <h2
    className={`font-extrabold ${className}`}
    style={{
      background: "linear-gradient(45deg, #e0c26b, #fff7c0, #e0c26b)", // Ligeramente más brillante
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow:
        "0 0 12px rgba(224,194,107,0.7), 0 0 20px rgba(224,194,107,0.5)", // Sombras más pronunciadas
      filter: "drop-shadow(0 0 8px rgba(224,194,107,0.7))", // Drop shadow más intenso
      letterSpacing: "0.8px", // Mayor espaciado para un look más premium
    }}
  >
    {children}
  </h2>
);

/* Texto neón verde mejorado (más legible y vibrante) */
const NeonText = ({ children, className = "font-semibold" }) => (
  <motion.span
    className={className}
    style={{
      backgroundImage: "linear-gradient(90deg, #66ff80, #ccffcc, #66ff80)", // Tonos más brillantes y vivos
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: `
        0 0 8px rgba(102, 255, 128, 0.9),
        0 0 16px rgba(102, 255, 128, 0.7),
        0 0 24px rgba(102, 255, 128, 0.5)
      `, // Sombras más potentes para el efecto neón
      filter: "drop-shadow(0 0 7px rgba(102, 255, 128, 0.9))", // Drop shadow más intenso
    }}
    initial={{ opacity: 0.7 }}
    animate={{ opacity: [0.7, 1, 0.7] }}
    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
  >
    {children}
  </motion.span>
);

export default function ComunidadSection() {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Sin categoría");

  // === Mock data ===
  const cargasMes = 7500;
  const tiempoRespuesta = "1 Min";
  const estado = "Operando normal";

  const categorias = [
    { nombre: "MS5", valor: 142, etiqueta: "Cargas realizadas" },
    { nombre: "MS6", valor: 87, etiqueta: "Cargas realizadas" },
    { nombre: "MS7", valor: 64, etiqueta: "Cargas realizadas" },
    { nombre: "MS8", valor: 41, etiqueta: "Cargas realizadas" },
  ];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategoryList(false);
  };

  return (
    <section
      id="comunidad"
      className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white bg-black relative overflow-hidden" // Aseguramos overflow-hidden para los efectos
    >
      {/* Fondo con un sutil patrón o efecto para romper la monotonía del negro puro */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(30,30,30,0.8) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%)',
        backgroundBlendMode: 'overlay',
        backgroundSize: '150% 150%'
      }}></div>
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: 'url(/path-to-subtle-texture.png)', // Considera una textura muy sutil si tienes una
        opacity: 0.05, // Muy baja opacidad
        pointerEvents: 'none'
      }}></div>


      <div className="max-w-7xl mx-auto relative z-10"> {/* Contenido principal elevado sobre el fondo */}
        {/* ===== 1) ESTADO EN VIVO ===== */}
        <GoldenTitle className="text-3xl sm:text-4xl lg:text-5xl mb-3 text-center">
          Comunidad MarTeam
        </GoldenTitle>

        <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-8 sm:mb-10 max-w-3xl mx-auto text-center font-light"> {/* Texto un poco más ligero */}
          Sumate y recibí <NeonText>promos reales</NeonText>,{" "}
          <NeonText>cargas priorizadas</NeonText> y{" "}
          <NeonText>ascensos con recompensa</NeonText>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16"> {/* Mayor gap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 ease-in-out text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> {/* Efecto hover sutil */}
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
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="text-xs sm:text-sm text-white/70 mb-2">Estado</div>
              <div className="text-lg sm:text-xl font-semibold"> {/* Tamaño ajustado para estado */}
                <NeonText>{estado}</NeonText>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== 2) ASCENSOS DE CATEGORÍA ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center">
          Ascensos de Categoría
        </GoldenTitle>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-16"> {/* Mayor gap */}
          {categorias.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-green-500/30 shadow-xl hover:shadow-green-500/20 transition-all duration-300 ease-in-out text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3">
                  <NeonText>{c.nombre}</NeonText>
                </h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                  <NeonText>{c.valor}</NeonText>
                </p>
                <p className="text-xs sm:text-sm text-gray-400">{c.etiqueta}</p> {/* Color más claro */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- NUEVA SECCIÓN: Tu categoría actual --- */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center">
          Tu categoría actual
        </GoldenTitle>
        <div className="relative max-w-sm mx-auto mb-16 z-20"> {/* Mayor z-index para el dropdown */}
          <motion.div
            className="w-full cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-green-500/30 shadow-xl hover:shadow-green-500/20 transition-all duration-300 ease-in-out text-center relative overflow-hidden group flex items-center justify-center space-x-3" // Añadido flex para icono
            onClick={() => setShowCategoryList(!showCategoryList)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
             <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold relative">
              <NeonText>{selectedCategory}</NeonText>
            </h3>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white/70 relative"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: showCategoryList ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.div>
          
          <AnimatePresence>
            {showCategoryList && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute w-full mt-2 bg-black/80 rounded-2xl border border-white/20 backdrop-blur-lg shadow-2xl z-20 overflow-hidden" // Fondo más oscuro y blur, border más pronunciado
              >
                {categorias.map((c, i) => (
                  <motion.li
                    key={i}
                    className="p-4 text-center cursor-pointer hover:bg-white/15 transition-colors text-lg font-medium" // Mayor padding, texto más grande
                    onClick={() => handleCategorySelect(c.nombre)}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NeonText className="text-lg sm:text-xl font-bold">{c.nombre}</NeonText> {/* Usar NeonText para los items */}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        {/* --- FIN NUEVA SECCIÓN --- */}

        {/* ===== 3) HALL OF FAME ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center">
          Hall of Fame
        </GoldenTitle>
        <div className="flex justify-center mb-10"> {/* Añadido margin-bottom */}
          <HallOfFameList />
        </div>
      </div>
    </section>
  );
}