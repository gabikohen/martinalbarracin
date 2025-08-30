"use client";

import { useState, useMemo } from "react";

// Helper ARS
const fmtARS = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(isNaN(n) ? 0 : n);

// CATEGORÍAS DIVERTIDAS (mismo orden)
const CATEGORIAS = [
  { icon: "🎯", name: "El Novato", desc: "Primeras fichas, primera emoción.", comision: 6 },
  { icon: "🧢", name: "El Pibe del Barrio", desc: "Te mandás con lo que tenés, humilde pero decidido.", comision: 7 },
  { icon: "🎲", name: "El Tira Fichas", desc: "Siempre probás, aunque sea por diversión.", comision: 8 },
  { icon: "😎", name: "El Caradura", desc: "Apostás sin miedo, aunque no tengas tanto.", comision: 9 },
  { icon: "🔥", name: "El Quemado", desc: "Vas a todo o nada, sin cálculo.", comision: 10 },
  { icon: "🌶️", name: "El Picante", desc: "Metés presión, incomodás a todos en la mesa.", comision: 11 },
  { icon: "⚡", name: "El Máquina", desc: "Constancia total, no parás nunca de jugar.", comision: 12 },
  { icon: "🦊", name: "El Vivo", desc: "Jugás con picardía, siempre encontrás ventaja.", comision: 13 },
  { icon: "🦁", name: "El Fiera", desc: "Te imponés con garra, nadie te subestima.", comision: 14 },
  { icon: "🥇", name: "El Campeón", desc: "Empezás a ganar seguido y lo notan todos.", comision: 15 },
  { icon: "⭐", name: "El Crack", desc: "Sos referencia, hasta los demás te nombran.", comision: 16 },
  { icon: "💼", name: "El Patrón de las Fichas", desc: "Respetado, manejás la mesa como propia.", comision: 17 },
  { icon: "👑", name: "El Jefe de Mesa", desc: "Todos siguen tu ritmo, vos marcás el juego.", comision: 18 },
  { icon: "🚀", name: "El Fenómeno", desc: "La rompés, todos hablan de vos.", comision: 19 },
  { icon: "🏆", name: "El Inmortal", desc: "Te convertiste en leyenda, nadie te olvida.", comision: 20 },
];

// % de comisión por categoría (podés ajustar)
const COMISION_POR_CATEGORIA = [
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20
];

// Umbrales de PUNTOS -> categoría
const UMBRALES_PUNTOS = [
  { max: 4999, idx: 0 },
  { max: 19999, idx: 1 },
  { max: 49999, idx: 2 },
  // a partir de 50k puntos vamos escalando más arriba:
];

function categoriaPorPuntos(puntos) {
  if (puntos <= UMBRALES_PUNTOS[0].max) return 0;
  if (puntos <= UMBRALES_PUNTOS[1].max) return 1;
  if (puntos <= UMBRALES_PUNTOS[2].max) return 2;

  // Por cada 50k puntos extra, sube una categoría más hasta la última
  const extras = Math.floor((puntos - 50000) / 50000) + 3; // 50k → cat 3; 100k → cat 4; etc.
  return Math.min(extras, CATEGORIAS.length - 1);
}

// Item simple de FAQ
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b-2 border-gray-700 pb-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
        <span className="text-xl font-semibold text-gray-100">{question}</span>
        <span className="text-2xl text-[#dfb95a]">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  // NUEVOS CAMPOS (según tu texto)
  const [recomendados, setRecomendados] = useState(5);      // cantidad de referidos/recomendados
  const [jugadoRefs, setJugadoRefs] = useState(3000000);    // ARS jugado por recomendados
  const [jugadoPropio, setJugadoPropio] = useState(0);      // ARS jugado por vos
  const [cashPct, setCashPct] = useState(50);               // % del pago en efectivo (resto en fichas)

  // Selección manual/automática de categoría
  const [manualCategoria, setManualCategoria] = useState(false);
  const [catManualIdx, setCatManualIdx] = useState(0);

  // Validaciones simples
  const errores = {
    recomendados: recomendados < 0 ? "No puede ser negativo." : "",
    jugadoRefs: jugadoRefs < 0 ? "No puede ser negativo." : "",
    jugadoPropio: jugadoPropio < 0 ? "No puede ser negativo." : "",
  };

  // SISTEMA DE PUNTOS
  const puntos = useMemo(() => {
    const base = (recomendados * 10) + (Math.max(0, jugadoRefs) + Math.max(0, jugadoPropio));
    return Math.max(0, Math.floor(base));
  }, [recomendados, jugadoRefs, jugadoPropio]);

  // CATEGORÍA (automática por puntos o manual)
  const categoriaIdx = manualCategoria ? catManualIdx : categoriaPorPuntos(puntos);
  const categoria = CATEGORIAS[categoriaIdx];

  // % comisión según categoría
  const comisionPct = COMISION_POR_CATEGORIA[categoriaIdx] ?? 0;

  // Ingreso mensual estimado
  const baseComisionable = Math.max(0, jugadoRefs) + Math.max(0, jugadoPropio);
  const ingresoMensual = Math.round(baseComisionable * (comisionPct / 100));

  // Split efectivo / fichas
  const efectivo = Math.round((ingresoMensual * cashPct) / 100);
  const fichas = Math.max(0, ingresoMensual - efectivo);

  return (
    <main className="bg-black text-white">
      {/* HÉROE */}
      <section
        id="hero"
        className="py-24 px-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1593309405286-4438d5c4b1f6?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="container mx-auto text-center bg-black/60 p-12 rounded-xl">
          <h1 className="text-5xl md:text-7xl font-black text-[#dfb95a] mb-4 leading-tight">
            Afiliate a MarTeam
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Convertite en <span className="text-[#dfb95a] font-bold">jugador estratégico</span>: Jugá todas
            las semanas, recomendá clientes y cobrá comisiones en{" "}
            <span className="text-[#dfb95a]">dinero + fichas</span>.
          </p>
        </div>
      </section>

      {/* VALOR — LEVANTADO UN POCO */}
      <section id="negocio" className="py-10 px-4 -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16 relative z-10">
        <div className="container mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-2">Ingresos Recurrentes</h3>
              <p className="text-gray-400">Pagos semanales o mensuales según plan.</p>
            </div>
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-2">Premio Mixto</h3>
              <p className="text-gray-400">Definí el % en cash y en fichas cada semana.</p>
            </div>
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-2">Todo Claro</h3>
              <p className="text-gray-400">Condiciones transparentes y trazabilidad de recomendados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULADOR (según tu texto) */}
      <section id="simulador" className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-black text-[#dfb95a] mb-4">Sección: calculá tu ganancia</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Completá los datos. Si preferís, podés elegir tu categoría manualmente o que se calcule automáticamente por puntos.
          </p>

          <form className="text-left bg-[#151515] border border-gray-700 rounded-2xl p-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1) Recomendados */}
              <div>
                <label className="text-sm text-gray-400">Recomendados</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={recomendados}
                  onChange={(e) => setRecomendados(Number(e.target.value))}
                  className="w-full mt-1 bg-transparent border border-gray-700 rounded-lg p-3 outline-none"
                  aria-invalid={!!errores.recomendados}
                />
                {errores.recomendados && <p className="text-xs text-red-400 mt-1">{errores.recomendados}</p>}
                <p className="text-xs text-gray-500 mt-1">10 puntos por cada recomendado.</p>
              </div>

              {/* 2) $ jugado por recomendados */}
              <div>
                <label className="text-sm text-gray-400">AR$ jugado por recomendados</label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={jugadoRefs}
                  onChange={(e) => setJugadoRefs(Number(e.target.value))}
                  className="w-full mt-1 bg-transparent border border-gray-700 rounded-lg p-3 outline-none"
                  aria-invalid={!!errores.jugadoRefs}
                />
                {errores.jugadoRefs && <p className="text-xs text-red-400 mt-1">{errores.jugadoRefs}</p>}
                <p className="text-xs text-gray-500 mt-1">1 punto por cada peso jugado.</p>
              </div>

              {/* 3) $ jugado propio */}
              <div>
                <label className="text-sm text-gray-400">AR$ jugado por vos</label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={jugadoPropio}
                  onChange={(e) => setJugadoPropio(Number(e.target.value))}
                  className="w-full mt-1 bg-transparent border border-gray-700 rounded-lg p-3 outline-none"
                  aria-invalid={!!errores.jugadoPropio}
                />
                {errores.jugadoPropio && <p className="text-xs text-red-400 mt-1">{errores.jugadoPropio}</p>}
                <p className="text-xs text-gray-500 mt-1">1 punto por cada peso jugado.</p>
              </div>

              {/* Toggle manual/auto */}
              <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-3 mt-2">
                <input
                  id="manualCategoria"
                  type="checkbox"
                  checked={manualCategoria}
                  onChange={(e) => setManualCategoria(e.target.checked)}
                  className="accent-[#dfb95a] w-5 h-5"
                />
                <label htmlFor="manualCategoria" className="text-sm text-gray-300">
                  Elegir categoría manualmente (si no, se calcula automática por puntos)
                </label>
              </div>

              {/* Selector manual de categoría */}
              {manualCategoria && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="text-sm text-gray-400">Tu categoría (manual)</label>
                  <select
                    value={catManualIdx}
                    onChange={(e) => setCatManualIdx(Number(e.target.value))}
                    className="w-full mt-1 bg-transparent border border-gray-700 rounded-lg p-3 outline-none"
                  >
                    {CATEGORIAS.map((c, i) => (
                      <option key={c.name} value={i} className="bg-[#0F0F0F]">
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* INFO de categoría y comisión */}
              <div className="bg-[#101010] border border-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-400">Tu categoría actual</p>
                <div className="text-xl font-bold mt-1">
                  {categoria.icon} {categoria.name}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {manualCategoria ? "Seleccionada manualmente." : "Calculada automáticamente por puntos."}
                </p>
              </div>

              <div className="bg-[#101010] border border-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-400">Tu % de comisión</p>
                <div className="text-2xl font-black text-[#dfb95a]">{comisionPct}%</div>
                <p className="text-xs text-gray-500 mt-1">
                  A partir de <span className="font-semibold">Aventurero del Tapete</span> empezás a desbloquear premios especiales.
                </p>
              </div>

              {/* Split cash/fichas */}
              <div>
                <label className="text-sm text-gray-400">% en efectivo (cash)</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={cashPct}
                  onChange={(e) => setCashPct(Number(e.target.value))}
                  className="w-full mt-3"
                />
                <p className="text-xs text-gray-500 mt-1">Cash: {cashPct}% • Fichas: {100 - cashPct}%</p>
              </div>
            </div>

            {/* RESULTADOS: Puntos y Dinero a cobrar */}
            <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
              <div className="bg-[#101010] border border-gray-700 rounded-xl p-6">
                <p className="text-sm text-gray-400">Tus puntos</p>
                <div className="text-3xl font-black text-[#dfb95a]">{puntos.toLocaleString("es-AR")}</div>
                <p className="text-xs text-gray-500 mt-1">
                  Siguiente salto cada 50.000 pts (~AR$50.000), sube tu categoría.
                </p>
              </div>
              <div className="bg-[#101010] border border-gray-700 rounded-xl p-6">
                <p className="text-sm text-gray-400">Dinero a cobrar (mensual)</p>
                <div className="text-2xl font-bold">{fmtARS(ingresoMensual)}</div>
              </div>
              <div className="bg-[#101010] border border-gray-700 rounded-xl p-6">
                <p className="text-sm text-gray-400">Detalle</p>
                <div className="text-sm">
                  <div>Efectivo: <span className="font-semibold">{fmtARS(efectivo)}</span></div>
                  <div>Fichas: <span className="font-semibold">{fmtARS(fichas)}</span></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* RANGOS */}
      <section id="rangos" className="py-20 px-4 bg-[#111]">
        <div className="container mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-center text-[#dfb95a] mb-12">
            Subí de Nivel Jugando
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {CATEGORIAS.map((c, i) => (
              <div
                key={c.name}
                className={`bg-[#1a1a1a] border rounded-2xl p-6 text-center hover:-translate-y-1 transition-all ${
                  i === categoriaIdx ? "border-[#dfb95a]" : "border-gray-700"
                }`}
              >
                <div className="text-4xl">{c.icon}</div>
                <h3 className="text-2xl font-bold mt-2">{c.name}</h3>
                <p className="text-gray-400 mt-2 text-sm">{c.desc}</p>
                <p className="text-xs text-gray-500 mt-3">
                  Comisión estimada: <span className="font-semibold">{COMISION_POR_CATEGORIA[i]}%</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿CÓMO FUNCIONA? */}
      <section id="guia" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-[#dfb95a] mb-4">¿Cómo funciona?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
            Tres pasos: recomendá, jugá cada semana y mirá cómo suben tus puntos. Podés elegir la categoría
            manualmente o dejar que el sistema la calcule según tu actividad.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <div className="text-5xl font-black text-[#dfb95a] mb-4">1</div>
              <h3 className="text-2xl font-bold mb-2">Recomendá</h3>
              <p className="text-gray-400">Sumás 10 puntos por cada recomendado activo.</p>
            </div>
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <div className="text-5xl font-black text-[#dfb95a] mb-4">2</div>
              <h3 className="text-2xl font-bold mb-2">Jugá</h3>
              <p className="text-gray-400">Cada peso jugado (tuyo o de tus recomendados) suma 1 punto.</p>
            </div>
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <div className="text-5xl font-black text-[#dfb95a] mb-4">3</div>
              <h3 className="text-2xl font-bold mb-2">Cobrá</h3>
              <p className="text-gray-400">
                Tu comisión depende de tu categoría. A partir de “Aventurero del Tapete” desbloqueás premios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-black text-center text-[#dfb95a] mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <FaqItem
              question="¿Cómo se calculan los puntos?"
              answer="10 puntos por recomendado + 1 punto por cada peso jugado por tus recomendados y por vos."
            />
            <FaqItem
              question="¿Cómo se define mi categoría?"
              answer="Podés elegirla manualmente o dejar que el sistema la calcule por puntos. Cada 50.000 puntos subís un nivel."
            />
            <FaqItem
              question="¿Cuál es mi comisión?"
              answer="Depende de tu categoría. En la sección del simulador ves tu % y cuánto cobrás en dinero + fichas."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
