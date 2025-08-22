// components/Bonificaciones.jsx
"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const BRAND = "#338c3b"; // verde principal (barras/números)
// Nota: "Bonificaciones" (plural) no lleva tilde; la forma singular "bonificación" sí.

// Datos en MILLONES (enero → agosto)
const bonificacionesData = [
  { mes: "Enero",   monto: 1.2 },
  { mes: "Febrero", monto: 1.8 },
  { mes: "Marzo",   monto: 0.9 },
  { mes: "Abril",   monto: 2.3 },
  { mes: "Mayo",    monto: 3.1 },
  { mes: "Junio",   monto: 1.6 },
  { mes: "Julio",   monto: 2.7 },
  { mes: "Agosto",  monto: 3.9 },
];

// Utils
const formatM = (n) =>
  `${n.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`;

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { y: 8, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 140, damping: 16 } },
};

// Sparkline minimal (inline SVG, sin librerías)
const Sparkline = ({ data, className = "" }) => {
  const width = 280;
  const height = 48;
  const pad = 6;

  const points = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const span = Math.max(1e-6, max - min);
    return data.map((v, i) => {
      const x = pad + (i * (width - pad * 2)) / (data.length - 1);
      const y = pad + (height - pad * 2) * (1 - (v - min) / span);
      return `${x},${y}`;
    });
  }, [data]);

  const last = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const span = Math.max(1e-6, max - min);
    const i = data.length - 1;
    const x = pad + (i * (width - pad * 2)) / (data.length - 1);
    const y = pad + (height - pad * 2) * (1 - (data[i] - min) / span);
    return { x, y };
  }, [data]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-label="Tendencia mensual" role="img">
      <polyline points={points.join(" ")} fill="none" stroke={BRAND} strokeWidth="2" opacity="0.9" />
      <circle cx={last.x} cy={last.y} r="3" fill={BRAND} />
    </svg>
  );
};

const Bonificaciones = () => {
  const [mostrarVariacion, setMostrarVariacion] = useState(true);

  const totalM = useMemo(() => bonificacionesData.reduce((a, b) => a + b.monto, 0), []);
  const promedioM = useMemo(() => totalM / bonificacionesData.length, [totalM]);
  const mejorMes = useMemo(
    () => bonificacionesData.reduce((max, b) => (b.monto > max.monto ? b : max), bonificacionesData[0]),
    []
  );
  const maxMonto = mejorMes.monto;

  // Variaciones vs. mes anterior
  const variaciones = useMemo(() => {
    return bonificacionesData.map((b, i) => {
      if (i === 0) return null;
      const prev = bonificacionesData[i - 1].monto;
      if (!prev) return null;
      const diff = b.monto - prev;
      const pct = (diff / prev) * 100;
      return { diff, pct };
    });
  }, []);

  return (
    <section className="bg-black py-12 sm:py-16">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header: título + sparkline al costado (sm+) */}
        <div className="mb-6 sm:mb-8 sm:flex sm:items-end sm:justify-between">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight text-center">
              Bonificaciones
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Enero — Agosto · montos en millones de pesos
            </p>

            {/* Toggle variación */}
            <button
              onClick={() => setMostrarVariacion((v) => !v)}
              className="mt-3 rounded-full border border-white/10 px-3 py-1.5 text-sm text-gray-300 hover:bg-white/5 transition-colors"
              aria-pressed={mostrarVariacion}
            >
              {mostrarVariacion ? "Ocultar variación %" : "Mostrar variación %"}
            </button>
          </div>

          {/* Sparkline al costado (en sm+). En mobile queda abajo por el flujo del DOM */}
          <Sparkline data={bonificacionesData.map((d) => d.monto)} className="hidden sm:block w-56 md:w-64 h-12 mt-4 sm:mt-0" />
        </div>

        {/* KPIs */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <motion.div variants={item} className="rounded-xl border border-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400">Total</p>
            <p className="mt-1 text-2xl font-bold tabular-nums" style={{ color: BRAND }}>
              {formatM(totalM)}
            </p>
          </motion.div>
          <motion.div variants={item} className="rounded-xl border border-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400">Promedio mensual</p>
            <p className="mt-1 text-2xl font-bold tabular-nums" style={{ color: BRAND }}>
              {formatM(promedioM)}
            </p>
          </motion.div>
          <motion.div variants={item} className="rounded-xl border border-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Mejor mes <span className="normal-case text-gray-500">({mejorMes.mes})</span>
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums" style={{ color: BRAND }}>
              {formatM(mejorMes.monto)}
            </p>
          </motion.div>
        </motion.div>

        {/* Lista con variación */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="divide-y divide-white/10 rounded-xl border border-white/10 overflow-hidden"
        >
          {bonificacionesData.map(({ mes, monto }, i) => {
            const pctWidth = Math.max(0.04, monto / maxMonto);
            const varData = variaciones[i];
            const signo = varData ? Math.sign(varData.pct) : 0;
            const varColor =
              signo > 0 ? "text-emerald-400" : signo < 0 ? "text-rose-400" : "text-gray-400";
            const varText =
              varData == null
                ? "—"
                : `${(varData.pct >= 0 ? "+" : "")}${varData.pct.toFixed(1)}%`;

            return (
              <motion.li key={mes} variants={item} className="relative p-4 sm:p-5 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-300 text-sm sm:text-base">{mes}</span>
                    {mostrarVariacion && <span className={`text-xs sm:text-sm ${varColor}`}>{varText}</span>}
                  </div>
                  <span className="text-white text-lg sm:text-xl font-semibold tabular-nums" style={{ color: BRAND }}>
                    {formatM(monto)}
                  </span>
                </div>

                {/* barrita mínima */}
                <div className="mt-3 h-px w-full bg-white/5">
                  <div className="h-px" style={{ width: `${pctWidth * 100}%`, backgroundColor: BRAND, opacity: 0.85 }} />
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default Bonificaciones;
