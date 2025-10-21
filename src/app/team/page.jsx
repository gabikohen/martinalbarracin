"use client";

import React from "react";
import { motion } from "framer-motion";

/** 🎨 Estilos */
const GREEN_FOOTER_GLOW = {
  background: "linear-gradient(45deg, #338c3b, #66ff66, #338c3b)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 10px rgba(51,140,59,0.6), 0 0 15px rgba(51,140,59,0.4)",
  filter: "drop-shadow(0 0 6px rgba(51,140,59,0.6))",
  letterSpacing: "0.5px",
};

const GOLD_TITLE = {
  background: "linear-gradient(45deg, #dfb95a, #fff3b0, #dfb95a)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textShadow: "0 0 10px rgba(223,185,90,0.6), 0 0 15px rgba(223,185,90,0.4)",
  filter: "drop-shadow(0 0 6px rgba(223,185,90,0.6))",
  letterSpacing: "0.5px",
  paddingLeft: "4px",
};

/** 👥 Miembros del equipo (usa imágenes desde /public) */
const teamMembers = [
  { name: "Martin Albarracin", role: "Fundador",image:"/Martin.jpg" },
  { name: "Miguel Dross", role: "Operación e Innovación", image: "/miguel.jpg" },
  { name: "Paulina Stevenson", role: "Gerente de Ventas", image: "/paulina.jpg" },
  { name: "Sabrina Madero", role: "Cajera", bio: "Lunes a Viernes de 6am a 2pm", image: "/Sabrina.jpg" }, // mayúscula
  { name: "Ringo Martinez", role: "Cajero", bio: "Lunes a Viernes de 2pm a 9pm", image: "/ringo.jpg" },
  { name: "Tino Jhonson", role: "Cajero", bio: "Lunes a Viernes de 9pm a 6am",image: "/tino.jpg" },
  { name: "Alison Moreno", role: "Cajero", bio: "Sábados y Domingos de 6am a 6pm. Feriados de 6am a 6pm", image: "/alison.jpg" },
  { name: "Vito Gianolli", role: "Cajero", bio: "Sábados y Domingos de 6pm a 6am. Feriados de 6pm a 6am", image: "/vito.jpg" },
];

export default function NuestroEquipo() {
  return (
    <section id="nuestroEquipo" aria-labelledby="ne-title" className="w-full py-20 px-6 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 id="ne-title" className="text-4xl sm:text-5xl font-extrabold mb-6 text-center" style={GOLD_TITLE}>
          Nuestro Equipo
        </h2>

        <p className="text-lg sm:text-xl mb-16 leading-relaxed text-gray-100 max-w-3xl mx-auto text-center">
          Somos un equipo <span style={GREEN_FOOTER_GLOW} className="font-semibold">que ama crear experiencias increíbles y generar conexiones significativas. </span> 
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name + index}
              className="p-6 rounded-xl bg-transparent backdrop-blur-md border border-white/20 shadow-2xl hover:border-white/40 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 20px 35px rgba(51, 140, 59, 0.3)" }}
              viewport={{ once: true }}
            >
              {/* Avatar: imagen si existe, si no inicial */}
              {member.image ? (
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-500/50 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20 border-2 border-green-500/50 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-400">{member.name.charAt(0)}</span>
                </div>
              )}

              <h3 className="text-xl font-bold mb-2 text-center" style={GREEN_FOOTER_GLOW}>{member.name}</h3>
              <p className="text-sm font-semibold text-gray-300 mb-3 text-center">{member.role}</p>
              <p className="text-sm text-gray-400 text-center leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
