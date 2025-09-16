"use client";

export default function HallOfFameList() {
  // 🎨 Glows
  const GOLD_GLOW = {
    color: "#E5C07B",
    textShadow:
      "0 0 6px rgba(229,192,123,.75), 0 0 14px rgba(229,192,123,.45), 0 0 26px rgba(229,192,123,.25)",
    filter: "drop-shadow(0 0 6px rgba(229,192,123,.35))",
  };

  const NEON_GREEN_GLOW = {
    color: "#00ff88",
    textShadow:
      "0 0 8px rgba(0,255,136,.85), 0 0 18px rgba(0,255,136,.55), 0 0 34px rgba(0,255,136,.35)",
    filter: "drop-shadow(0 0 8px rgba(0,255,136,.35))",
    letterSpacing: "0.3px",
  };

  // 💵 ARS
  const fmtARS = (n) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n);

  // 📅 DD-MM-AAAA / AAAA-MM-DD
  const parseFecha = (str) => {
    const [p1, p2, p3] = str.split("-");
    let y, m, d;
    if (p1.length === 4) {
      y = +p1; m = +p2; d = +p3;
    } else {
      d = +p1; m = +p2; y = +p3;
    }
    return new Date(y, m - 1, d);
  };

  const fmtFechaAR = (str) =>
    parseFecha(str).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  // 🏆 Datos
 const ganadoresTop = [
  { id: 1, alias: "marianorm...",   categoria: "MA8", fecha: "25-07-2025", monto: 850_867_834 },
  { id: 2, alias: "cachorrops23...", categoria: "MA8", fecha: "15-04-2024", monto: 220_102_433 },
  { id: 3, alias: "dieogrs2...",     categoria: "MA7", fecha: "04-10-2023", monto: 166_443_923 },
  { id: 4, alias: "marisab...",      categoria: "MA7", fecha: "04-10-2023", monto: 117_656_243 },
  { id: 5, alias: "monirs2...",      categoria: "MA7", fecha: "29-09-2022", monto: 76_642_321 },
  { id: 6, alias: "rlucasg...",      categoria: "MA7", fecha: "07-06-2024", monto: 40_340_009 },
];

const puestos6a10 = [
  { id: 7,  alias: "adrimansurms1...", categoria: "MA6", fecha: "18-08-2021", monto: 25_483_219 },
  { id: 8,  alias: "roberst9...",      categoria: "MA6", fecha: "17-03-2022", monto: 9_127_504 },
  { id: 9,  alias: "danigrid...",      categoria: "MA6", fecha: "16-05-2023", monto: 5_394_872 },
  { id: 10, alias: "Josemendesr...",   categoria: "MA6", fecha: "15-01-2024", monto: 4_056_783 },
];
  // 🏷️ Pill de categoría (glow verde)
  const CategoriaPill = ({ text }) => (
    <span
      style={NEON_GREEN_GLOW}
      className="px-3 py-1 text-xs sm:text-sm rounded-lg font-bold border border-emerald-400/40 bg-black/30 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
    >
      {text}
    </span>
  );

  return (
    <section className="py-10 sm:py-16">
      <div className="w-full max-w-6xl mx-auto rounded-2xl border border-white/15 bg-transparent backdrop-blur-md shadow-2xl p-6">
        {/* 🏆 Título con glow dorado */}
        <h3 style={GOLD_GLOW} className="text-center text-2xl sm:text-3xl font-extrabold mb-8">
          Top 10 Ganadores
        </h3>

        {/* Top 1–5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {ganadoresTop.map((g, index) => (
            <div
              key={g.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/15 shadow-xl hover:scale-[1.02] transition-transform"
            >
              <div className="flex justify-between items-center mb-4">
                <span  className="font-extrabold text-2xl"></span>
                <CategoriaPill text={g.categoria} />
              </div>

              <h4 className="text-white font-bold text-xl truncate">{g.alias}</h4>

              {/* 💸 Monto con glow verde */}
              <p style={NEON_GREEN_GLOW} className="font-extrabold text-3xl sm:text-4xl mt-2">
                {fmtARS(g.monto)}
              </p>

              <p className="text-white/70 text-sm mt-2">Fecha: {fmtFechaAR(g.fecha)}</p>
            </div>
          ))}
        </div>

        {/* 📋 Puestos 6–10 */}
        <h3 style={GOLD_GLOW} className="text-center text-xl sm:text-2xl font-bold mb-6">
          Puestos 6–10
        </h3>

        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="hidden md:grid grid-cols-[0.6fr,2fr,1.2fr,1.2fr,1.5fr] gap-4 px-6 py-3 border-b border-white/10 text-sm font-semibold uppercase text-white/70">
            <span>#</span>
            <span>Usuario</span>
            <span>Categoría</span>
            <span>Fecha</span>
            <span className="text-right">Ganado</span>
          </div>

          <ul className="divide-y divide-white/10">
            {puestos6a10.map((g, index) => (
              <li
                key={g.id}
                className="md:grid md:grid-cols-[0.6fr,2fr,1.2fr,1.2fr,1.5fr] md:items-center md:gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
              >
                {/* Desktop */}
                <div style={GOLD_GLOW} className="hidden md:block font-bold">{index + 6}</div>
                <div className="hidden md:block text-white font-medium truncate">{g.alias}</div>
                <div className="hidden md:block">
                  <CategoriaPill text={g.categoria} />
                </div>
                <div className="hidden md:block text-white/80">{fmtFechaAR(g.fecha)}</div>
                <div style={NEON_GREEN_GLOW} className="hidden md:block text-right font-bold">
                  {fmtARS(g.monto)}
                </div>

                {/* Mobile */}
                <div className="md:hidden flex flex-col gap-2 bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span style={GOLD_GLOW} className="font-bold">#{index + 6}</span>
                    <span style={NEON_GREEN_GLOW} className="font-bold">{fmtARS(g.monto)}</span>
                  </div>
                  <span className="text-white font-semibold">{g.alias}</span>
                  <div className="flex items-center gap-2">
                    <CategoriaPill text={g.categoria} />
                    <span className="text-white/70 text-xs">{fmtFechaAR(g.fecha)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
