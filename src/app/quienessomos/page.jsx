"use client";

import React from "react";
import { motion } from "framer-motion";

const beneficios = [
  "Cargas sin límites 24/7",
  "Atención personalizada real",
  "Bonificaciones diarias",
  "Premios únicos y exclusivos",
  "Afiliados con beneficios",
  "Transparencia asegurada",
];

/** 🔹 Mismo efecto del footer, pero en verde */
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

export default function QuienesSomos() {
  return (
    <section
      id="quienesSomos"
      className="w-full py-20 px-6 bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] text-white text-center relative overflow-hidden animate-[pulseBg_8s_ease-in-out_infinite]"
    >
      <style>
        {`
          @keyframes pulseBg {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>

      <div className="max-w-5xl mx-auto">
        {/* 🔹 Título dorado */}
        <h2
          className="text-4xl sm:text-5xl font-extrabold mb-8"
          style={{
            background: "linear-gradient(45deg, #bfb281, #fff3b0, #bfb281)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 10px rgba(191, 178, 129, 0.6), 0 0 15px rgba(191, 178, 129, 0.4)",
            filter: "drop-shadow(0 0 6px rgba(191, 178, 129, 0.6))",
            letterSpacing: "0.5px",
            paddingLeft: "4px",
          }}
        >
          ¿Quiénes Somos?
        </h2>

        {/* 🔹 Texto con efecto verde */}
        <p className="text-lg sm:text-xl mb-12 leading-relaxed text-gray-100 max-w-3xl mx-auto">
          En <NeonText>MarTeam</NeonText> somos tu agente en fichas digitales para jugar en casinos online.
          Lo que nos diferencia de los demás cajeros es nuestra combinación única de{" "}
          <NeonText className="font-semibold">
            confianza, atención humana y beneficios reales
          </NeonText>
          . No vendemos fichas: entregamos diversión, bonos y una experiencia inigualable.
        </p>

        {/* 🔹 Lista de beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {beneficios.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-transparent backdrop-blur-md border border-white/30 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.05, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.3)" }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-bold">
                <span style={GREEN_FOOTER_GLOW}>{item}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* 🔹 Llamado final con animación */}
       <motion.span
  className="mt-12 block text-2xl sm:text-3xl font-bold text-center"
  style={GREEN_FOOTER_GLOW}
  animate={{ opacity: [1, 0.6, 1, 0.8, 1] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
  ¡Sumate a <span className="uppercase">MarTeam</span> y llevá tus fichas al siguiente nivel!
</motion.span>
      </div>
    </section>
  );
}
