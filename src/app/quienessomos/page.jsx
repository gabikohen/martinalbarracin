"use client";

import React from "react";
import { motion } from "framer-motion";
import NuestroEquipo from "../team/page"; // ← NO desde /app/team/page

const beneficios = [
  "Cargas sin límites 24/7",
  "Atención personalizada real",
  "Bonificaciones diarias",
  "Premios únicos y exclusivos",
  "Afiliados con beneficios",
  "Transparencia asegurada",
];

/** 🌿 Glow verde suave */
const GREEN_FOOTER_GLOW_SOFT = {
  background: "linear-gradient(45deg, #338c3b, #66ff66, #338c3b)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `
    0 0 3px rgba(51,140,59,0.45),
    0 0 6px rgba(51,140,59,0.30),
    0 0 12px rgba(51,140,59,0.18)
  `,
  filter: "drop-shadow(0 0 3px rgba(51,140,59,0.45))",
  letterSpacing: "0.3px",
};

/** 🟨 Glow dorado suave */
const GOLD_TITLE_SOFT = {
  background: "linear-gradient(45deg, #dfb95a, #fff1a6, #dfb95a)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textShadow: "0 0 3px rgba(223,185,90,0.35), 0 0 6px rgba(223,185,90,0.22)",
  filter: "drop-shadow(0 0 3px rgba(223,185,90,0.35))",
  letterSpacing: "0.3px",
  paddingLeft: "4px",
};

const NeonText = ({ children, className = "font-bold" }) => (
  <span className={className} style={GREEN_FOOTER_GLOW_SOFT}>
    {children}
  </span>
);

export default function QuienesSomos() {
  return (
    <>
      {/* Sección Quiénes Somos */}
      <section
        id="quienesSomos"
        className="w-full py-20 px-6 bg-black text-white text-center relative overflow-hidden animate-[pulseBg_8s_ease-in-out_infinite]"
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
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8" style={GOLD_TITLE_SOFT}>
            Quiénes Somos
          </h2>

          <p className="text-lg sm:text-xl mb-12 leading-relaxed text-gray-100 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            En <NeonText>MarTeam</NeonText> te prometemos el mejor servicio de{" "}
            <NeonText className="font-semibold">entretenimiento online</NeonText>{" "}
            del mercado. Además, estamos obsesionados con la mejora continua para poder brindarte una{" "}
            <NeonText className="font-semibold">experiencia premium</NeonText>, como vos te mereces.
            Al ser servicio, tu <NeonText className="font-semibold">opinión</NeonText> es lo que más nos importa y eso nos diferencia del resto: no dudes en compartirnos tus sensaciones.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {beneficios.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-transparent backdrop-blur-md border border-white/20 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.45 }}
                whileHover={{ y: -6, scale: 1.04, boxShadow: "0px 16px 26px rgba(0,0,0,0.28)" }}
                viewport={{ once: true }}
              >
                <p className="text-lg font-bold">
                  <span style={GREEN_FOOTER_GLOW_SOFT}>{item}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Debajo, el equipo */}
      <NuestroEquipo />
    </>
  );
}
