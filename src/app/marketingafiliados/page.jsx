"use client";

import { useState, useMemo } from "react";

// Helper de moneda ARS
const fmtARS = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(isNaN(n) ? 0 : n);

// CATEGORÍAS DIVERTIDAS (orden de progreso)
const CATEGORIAS = [
  { icon: "😅", name: "Mano Temblorosa", desc: "Recién empezás, con ganas de más." },
  { icon: "🎲", name: "Fichero Novato", desc: "Ya entendés la movida y sumás fichas." },
  { icon: "🪙", name: "Aventurero del Tapete", desc: "Jugás seguido y empezás a destacar." },
  { icon: "🎡", name: "Fan de la Ruleta", desc: "No te perdés una tirada." },
  { icon: "🦊", name: "Zorro Apostador", desc: "Jugadas inteligentes, comisiones que crecen." },
  { icon: "💥", name: "Rompe la Banca", desc: "Ganás en grande y te notan." },
  { icon: "🦁", name: "León High Roller", desc: "Dominás las mesas como un jefe." },
  { icon: "😏", name: "Maestro del Bluff", desc: "Estrategia y estilo, el combo ganador." },
  { icon: "👑", name: "Rey del Casino", desc: "Entre los mejores del mes." },
  { icon: "🏆", name: "Leyenda del Tapete", desc: "Nivel máximo, premios VIP y respeto total." },
];

// COMPONENTE PARA ÍTEMS DE FAQ (JSX sin TypeScript)
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-gray-700 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-xl font-semibold text-gray-100">{question}</span>
        <span className="text-2xl text-[#E5C07B]">{isOpen ? "−" : "+"}</span>
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
  // Estado del simulador
  const [clientes, setClientes] = useState(5);
  const [ticket, setTicket] = useState(10000); // ARS ticket promedio semanal por cliente (min 1000)
  const [fee, setFee] = useState(12); // % comisión base referidor
  const [sesiones, setSesiones] = useState(1); // sesiones del partner / semana (actividad propia)
  const [cashPct, setCashPct] = useState(50); // % del pago en efectivo (resto en fichas)

  // Validaciones simples
  const ticketError = ticket < 1000 ? "El ticket mínimo es de $1.000 ARS." : "";
  const clientesError = clientes < 0 ? "No puede ser negativo." : "";
  const feeError = fee < 0 || fee > 50 ? "Entre 0% y 50%." : "";
  const sesionesError = sesiones < 0 ? "No puede ser negativo." : "";

  // Bonus motivador por sesiones (sin imponer): +5% (3+) y +10% (5+)
  const bonus = sesiones >= 5 ? 10 : sesiones >= 3 ? 5 : 0; // % extra por actividad propia
  const comisionEfectiva = Math.max(0, Math.min(50, fee)) + bonus;

  // Mapeo de sesiones -> categoría (0 o 1 → cat 0, 2 → cat 1, ... 10+ → cat 9)
  const categoriaIndex = Math.max(0, Math.min(9, sesiones <= 1 ? 0 : sesiones - 1));
  const categoria = CATEGORIAS[categoriaIndex];

  // Ingreso mensual estimado (4 semanas)
  const ingresoMensual = useMemo(() => {
    if (ticket < 1000 || clientes < 0) return 0;
    return Math.round(clientes * ticket * (comisionEfectiva / 100) * 4);
  }, [clientes, ticket, comisionEfectiva]);

  const efectivo = Math.round((ingresoMensual * cashPct) / 100);
  const fichas = Math.max(0, ingresoMensual - efectivo);

  return (
    <main className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] text-white">
      {/* SECCIÓN HÉROE */}
      <section
        id="hero"
        className="py-24 px-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1593309405286-4438d5c4b1f6?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="container mx-auto text-center bg-black/60 p-12 rounded-xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            Hacé Negocio con MarTeam
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Convertite en <span className="text-[#E5C07B] font-bold">jugador-inversionista</span>: jugá todas
            las semanas, traé clientes y cobrá comisiones en{" "}
            <span className="text-[#E5C07B]">dinero + fichas</span>.
          </p>
          <a
            href="#simulador"
            className="bg-[#E5C07B] text-black py-4 px-10 rounded-lg font-bold hover:bg-yellow-300 transition-colors text-lg shadow-lg shadow-[#E5C07B]/30"
          >
            Calcular cuánto gano
          </a>
        </div>
      </section>

      {/* SECCIÓN VALOR */}
      <section id="negocio" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-[#E5C07B] mb-4">Hacé negocio con MarTeam</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
            Jugás, referís y crecés. Mientras más participás, más subís de nivel y mejores premios desbloqueás
            en <span className="text-[#E5C07B] font-semibold">fichas + dinero</span>.
          </p>

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
              <p className="text-gray-400">Condiciones transparentes y trazabilidad de referidos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN CATEGORÍAS (por ticket semanal) */}
      <section id="categorias" className="py-16 px-4 bg-[#111]">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center text-[#E5C07B] mb-10">
            Categorías por ticket semanal (ARS)
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold">Micro</h3>
              <p className="text-gray-400 mt-2">
                {fmtARS(1000)} – {fmtARS(4999)}
              </p>
              <p className="text-sm text-gray-500 mt-2">Entrada mínima</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold">Starter</h3>
              <p className="text-gray-400 mt-2">
                {fmtARS(5000)} – {fmtARS(19999)}
              </p>
              <p className="text-sm text-gray-500 mt-2">Volumen inicial</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="text-gray-400 mt-2">
                {fmtARS(20000)} – {fmtARS(49999)}
              </p>
              <p className="text-sm text-gray-500 mt-2">Buen rendimiento</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold">Elite</h3>
              <p className="text-gray-400 mt-2">{fmtARS(50000)}+</p>
              <p className="text-sm text-gray-500 mt-2">Alto volumen</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN SIMULADOR */}
      <section id="simulador" className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-black text-[#E5C07B] mb-4">Simulá tus ganancias</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Ingresá los datos. El ticket semanal por cliente debe ser de al menos <b>{fmtARS(1000)}</b>.
          </p>

          <form
            className="text-left bg-[#151515] border border-gray-700 rounded-2xl p-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-400">Clientes activos</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={clientes}
                  onChange={(e) => setClientes(Number(e.target.value))}
                  className="w-full mt-1 bg-transparent border border-gray-700 rounded-lg p-3 outline-none"
                  aria-invalid={!!clientesError}
                />
                {clientesError && <p className="text-xs text-red-400 mt-1">{clientesError}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-400">Ticket semanal por cliente (ARS)</label>
                <input
                  type="number"
                  min={1000}
                  step={100}
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  className="w-full mt-1 bg-transparent border border-gray-700 rounded-lg p-3 outline-none"
                  aria-invalid={!!ticketError}
                />
                {ticketError && <p className="text-xs text-red-400 mt-1">{ticketError}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-400">% Comisión base</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  step={1}
                  value={fee}
                  onChange={(e) => setFee(Number(e.target.value))}
                  className="w-full mt-1 bg-transparent border border-gray-700 rounded-lg p-3 outline-none"
                  aria-invalid={!!feeError}
                />
                {feeError && <p className="text-xs text-red-400 mt-1">{feeError}</p>}
              </div>

              <div>
                <label className="text-sm text-gray-400">Sesiones propias/semana</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={sesiones}
                  onChange={(e) => setSesiones(Number(e.target.value))}
                  className="w-full mt-1 bg-transparent border border-gray-700 rounded-lg p-3 outline-none"
                  aria-invalid={!!sesionesError}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: a partir de 3 sesiones sumás +5% y desde 5 sesiones +10%.
                </p>
                {sesionesError && <p className="text-xs text-red-400 mt-1">{sesionesError}</p>}
              </div>

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
                <p className="text-xs text-gray-500 mt-1">
                  Cash: {cashPct}% • Fichas: {100 - cashPct}%
                </p>
              </div>

              <div className="bg-[#101010] border border-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-400">Tu categoría estimada</p>
                <div className="text-xl font-bold mt-1">
                  {categoria.icon} {categoria.name}{" "}
                  {bonus ? <span className="text-[#E5C07B]">(+{bonus}% bonus)</span> : null}
                </div>
                <p className="text-xs text-gray-500 mt-1">Comisión efectiva: {comisionEfectiva}%</p>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
              <div className="bg-[#101010] border border-gray-700 rounded-xl p-6">
                <p className="text-sm text-gray-400">Ingreso mensual estimado</p>
                <div className="text-3xl font-black text-[#E5C07B]">{fmtARS(ingresoMensual)}</div>
              </div>
              <div className="bg-[#101010] border border-gray-700 rounded-xl p-6">
                <p className="text-sm text-gray-400">Efectivo (cash)</p>
                <div className="text-2xl font-bold">{fmtARS(efectivo)}</div>
              </div>
              <div className="bg-[#101010] border border-gray-700 rounded-xl p-6">
                <p className="text-sm text-gray-400">Fichas</p>
                <div className="text-2xl font-bold">{fmtARS(fichas)}</div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* SECCIÓN NIVELES DIVERTIDOS */}
      <section id="rangos" className="py-20 px-4 bg-[#111]">
        <div className="container mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-center text-[#E5C07B] mb-12">
            Subí de Nivel Jugando
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {CATEGORIAS.map((c) => (
              <div
                key={c.name}
                className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 text-center hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl">{c.icon}</div>
                <h3 className="text-2xl font-bold mt-2">{c.name}</h3>
                <p className="text-gray-400 mt-2 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN ¿CÓMO FUNCIONA? */}
      <section id="guia" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-[#E5C07B] mb-4">¿Cómo Funciona?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
            Tres pasos: registrate, jugá cada semana y compartí tu enlace. Mientras más jugás, más ganás.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <div className="text-5xl font-black text-[#E5C07B] mb-4">1</div>
              <h3 className="text-2xl font-bold mb-2">Registrate</h3>
              <p className="text-gray-400">Te damos tu enlace único y tu panel.</p>
            </div>
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <div className="text-5xl font-black text-[#E5C07B] mb-4">2</div>
              <h3 className="text-2xl font-bold mb-2">Jugá & Traé Clientes</h3>
              <p className="text-gray-400">Participá cada semana y activá tus referidos.</p>
            </div>
            <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700 hover:-translate-y-2 transition-all">
              <div className="text-5xl font-black text-[#E5C07B] mb-4">3</div>
              <h3 className="text-2xl font-bold mb-2">Cobrá</h3>
              <p className="text-gray-400">
                Recibí comisiones en <span className="text-[#E5C07B]">dinero + fichas</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-black text-center text-[#E5C07B] mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <FaqItem
              question="¿Conviene jugar todas las semanas?"
              answer="Sí, porque desbloqueás categorías más altas y sumás bonus de comisión (+5% desde 3 sesiones, +10% desde 5)."
            />
            <FaqItem
              question="¿Cómo gano plata como partner?"
              answer="Referís jugadores con tu enlace único y cobrás un % de su actividad. Además recibís premios en fichas + dinero."
            />
            <FaqItem
              question="¿Cómo se pagan los premios?"
              answer="Podés definir el % en efectivo y el % en fichas en tu panel. El cash se retira, las fichas potencian tu juego."
            />
            <FaqItem
              question="¿Cuándo cobro mis comisiones?"
              answer="Según plan, semanal o mensual, con reporte detallado de tus referidos y tu actividad propia."
            />
            <FaqItem
              question="¿Hay mínimo de ticket?"
              answer="Sí, el ticket semanal por cliente parte desde $1.000 ARS para ingresar al sistema de beneficios."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
