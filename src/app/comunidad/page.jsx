"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaGift,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";

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

/* Texto neón verde */
const NeonText = ({ children, className = "font-semibold" }) => (
  <motion.span
    className={className}
    style={{
      backgroundImage: "linear-gradient(90deg, #338c3b, #66ff66, #338c3b)",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: `
        0 0 10px #338c3b,
        0 0 20px #338c3b,
        0 0 30px #66ff66,
        0 0 40px #338c3b,
        0 0 50px rgba(51, 140, 59, 1)
      `,
      filter: "drop-shadow(0 0 10px rgba(51, 140, 59, 1))",
    }}
    initial={{ opacity: 0.4 }}
    animate={{ opacity: [0.4, 1, 0.4] }}
    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
  >
    {children}
  </motion.span>
);

export default function ComunidadSection() {
  // === Mock data ===
  const cargasMes = 327;
  const tiempoRespuesta = "5’";
  const estado = "Operando normal";

  const misiones = [
    { nombre: "Starter", req: "1 carga en la semana", bono: "+1%", icon: <FaBolt /> },
    { nombre: "Pro", req: "2 cargas en la semana", bono: "+3%", icon: <FaGift /> },
    { nombre: "Elite", req: "3+ cargas en la semana", bono: "+5% + prioridad", icon: <FaUsers /> },
  ];

  const eventos = [
    { fecha: "Sáb 23 · 22:00", titulo: "Sorteo Express", detalle: "Cupos limitados, anotate en el canal." },
    { fecha: "Mié 27 · 20:00", titulo: "Torneo Slots", detalle: "Top 10 se llevan bono." },
  ];

  const ganadores = [
    { inic: "L.M.", pais: "🇦🇷", premio: "25.000" },
    { inic: "C.R.", pais: "🇺🇾", premio: "10.000" },
    { inic: "M.S.", pais: "🇨🇱", premio: "7.500" },
  ];

  const [copied, setCopied] = useState(false);
  const referralLink = "https://marteam.com/r/tuusuario";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error(e);
    }
  };

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
          <NeonText>misiones con recompensa</NeonText>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-center">
            <div className="text-xs sm:text-sm text-white/60 mb-1">
              Cargas este mes
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold">{cargasMes}+</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-center">
            <div className="text-xs sm:text-sm text-white/60 mb-1">
              Tiempo de respuesta
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold">{tiempoRespuesta}</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-center">
            <div className="text-xs sm:text-sm text-white/60 mb-1">Estado</div>
            <div className="text-sm sm:text-base font-semibold text-[#bfb281] drop-shadow-[0_0_8px_rgba(191,178,129,0.7)]">
              {estado}
            </div>
          </div>
        </div>

        {/* ===== 2) MISIONES SEMANALES ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
          Misiones semanales
        </GoldenTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {misiones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 hover:border-white/30 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2 text-[#bfb281] drop-shadow-[0_0_8px_rgba(191,178,129,0.7)]">
                <span className="text-lg sm:text-xl">{m.icon}</span>
                <h3 className="text-lg sm:text-xl font-bold">{m.nombre}</h3>
              </div>
              <p className="text-sm text-white/80 mb-2">{m.req}</p>
              <p className="text-sm sm:text-base">
                Bono: <NeonText className="font-bold">{m.bono}</NeonText>
              </p>
            </motion.div>
          ))}
        </div>

        {/* ===== 3) CALENDARIO ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-4">
          Calendario
        </GoldenTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {eventos.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 hover:border-white/30"
            >
              <div className="flex items-center gap-2 text-[#bfb281] mb-1">
                <FaCalendarAlt className="text-base sm:text-lg" />
                <span className="text-xs sm:text-sm">{e.fecha}</span>
              </div>
              <div className="text-base sm:text-lg font-bold">{e.titulo}</div>
              <div className="text-sm text-white/80">{e.detalle}</div>

              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://t.me/tu_canal_telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-sm px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 text-center"
                  aria-label="Recordarme en Telegram"
                >
                  Recordarme en Telegram
                </a>
                <a
                  href="https://wa.me/5491112345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-sm px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 text-center"
                  aria-label="Participar por WhatsApp"
                >
                  Participar por WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== 4) HALL OF FAME ===== */}
        <GoldenTitle className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
          Hall of Fame
        </GoldenTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {ganadores.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/15 text-center"
            >
              <div className="text-xl sm:text-2xl mb-1">{g.pais}</div>
              <div className="text-base sm:text-lg font-bold">{g.inic}</div>
              <div className="text-xs sm:text-sm text-white/80">Bono ganado</div>
              <div className="text-xl sm:text-2xl font-extrabold mt-1">
                $ {g.premio}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota legal */}
        <p className="mt-8 text-[11px] sm:text-xs text-white/60 text-center">
          +18. Jugá con responsabilidad. Beneficios sujetos a verificación y términos.
        </p>
      </div>
    </section>
  );
}
