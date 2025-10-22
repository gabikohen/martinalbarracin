"use client";

import React from "react";
import { motion } from "framer-motion";

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

/** 👥 Miembros del equipo (usa imágenes desde /public) */
const teamMembers = [
  { name: "Martin Albarracin", role: " CEO & Fundador", image: "/Martin.jpg" },
  { name: "Miguel Dross", role: "Operaciones e Innovación", image: "/miguel.jpg" },
  { name: "Paulina Stevenson", role: "Gerente de Ventas", image: "/paulina.jpg" },
  { name: "Sabrina Madero", role: "Secretaria", bio: "Lunes a Viernes de 6am a 2pm", image: "/Sabrina.jpg" },
  { name: "Ringo Martinez", role: "Secretario", bio: "Lunes a Viernes de 2pm a 9pm", image: "/ringo.jpg" },
  { name: "Tino Jhonson", role: "Secretario", bio: "Lunes a Viernes de 9pm a 6am", image: "/tino.jpg" },
  { name: "Alison Moreno", role: "Secretario", bio: "Sábados y Domingos de 6am a 6pm. Feriados de 6am a 6pm", image: "/alison.jpg" },
  { name: "Vito Gianolli", role: "Secretario", bio: "Sábados y Domingos de 6pm a 6am. Feriados de 6pm a 6am", image: "/vito.jpg" },
];

export default function NuestroEquipo() {
  return (
    <section
      id="nuestroEquipo"
      aria-labelledby="ne-title"
      className="w-full min-h-screen py-20 px-6 bg-black text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="ne-title"
          className="text-4xl sm:text-5xl font-extrabold mb-6 text-center"
          style={GOLD_TITLE_SOFT}
        >
          Nuestro Equipo
        </h2>

        <p className="text-lg sm:text-xl mb-16 leading-relaxed text-gray-100 max-w-3xl mx-auto text-center">
          Somos un equipo{" "}
          <span style={GREEN_FOOTER_GLOW_SOFT} className="font-semibold">
            apasionado por crear experiencias únicas y hacer que tu diversión llegue al siguiente nivel.
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name + index}
              className="p-4 sm:p-6 md:p-7 lg:p-8 rounded-xl bg-transparent backdrop-blur-md border border-white/15 shadow-xl hover:border-white/30 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03, boxShadow: "0px 18px 28px rgba(0,0,0,0.28)" }}
              viewport={{ once: true }}
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto mb-4 rounded-full border-2 border-green-400/40 overflow-hidden">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <h3
                className="text-lg sm:text-xl font-bold mb-2 text-center"
                style={GREEN_FOOTER_GLOW_SOFT}
              >
                {member.name}
              </h3>

              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-300 mb-2 sm:mb-3 text-center">
                {member.role}
              </p>

              {member.bio && (
                <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
                  {member.bio}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
