"use client";

export default function HallOfFameList() {
  // 💵 Número completo en ARS
  const fmtARS = (n) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n);

  // 📅 Parsear "DD-MM-AAAA" (AR) o "AAAA-MM-DD" (ISO) por si viene mezclado
  const parseFecha = (str) => {
    const [p1, p2, p3] = str.split("-");
    let y, m, d;
    if (p1.length === 4) {
      // ISO -> AAAA-MM-DD
      y = +p1; m = +p2; d = +p3;
    } else {
      // AR -> DD-MM-AAAA
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

  // 🏆 Top 5 (fechas en formato AR: DD-MM-AAAA)
  const ganadoresTop = [
    { id: 1, alias: "marino23",   categoria: "A8", fecha: "26-07-2025", monto: 851_867_834 },
    { id: 2, alias: "Diegoarma",  categoria: "A7", fecha: "17-04-2024", monto: 574_102_433 },
    { id: 3, alias: "Topo23",     categoria: "A6", fecha: "04-10-2023", monto: 488_443_923 },
    { id: 4, alias: "Marisab",    categoria: "A5", fecha: "29-09-2022", monto: 378_642_321 },
    { id: 5, alias: "Marianosv2", categoria: "A5", fecha: "07-06-2021", monto: 329_340_009 },
  ];

  // 👉 Puestos 6–10 (fechas AR: 2020+)
  const puestos6a10 = [
    { id: 6,  alias: "Solicapa21",  categoria: "A7", fecha: "19-12-2020", monto: 231_430_921 },
    { id: 7,  alias: "adrimansur",  categoria: "A6", fecha: "18-08-2021", monto: 189_760_489 },
    { id: 8,  alias: "Chanchos",    categoria: "A5", fecha: "17-03-2022", monto: 165_320_054 },
    { id: 9,  alias: "Danyliv",     categoria: "A8", fecha: "16-05-2023", monto: 122_229_873 },
    { id: 10, alias: "Josemendes",  categoria: "A6", fecha: "15-01-2024", monto: 86_488_532 },
  ];

  // 🎨 Colores por categoría (A5–A8)
  const categoriaColor = (cat) => {
    switch (cat) {
      case "A8": return "bg-yellow-400/90 text-black";
      case "A7": return "bg-green-400/90 text-black";
      case "A6": return "bg-cyan-400/90 text-black";
      case "A5": return "bg-purple-400/90 text-black";
      default:   return "bg-white/10 text-white/80";
    }
  };

  return (
    <section className="py-10 sm:py-16">
      <div className="w-full max-w-6xl mx-auto rounded-2xl border border-white/15 bg-transparent backdrop-blur-md shadow-2xl p-6">
        {/* 🏆 Título */}
        <h3 className="text-center text-2xl sm:text-3xl font-extrabold text-[#E5C07B] mb-8">
          Top 10 Ganadores
        </h3>

        {/* Top 1–5 como tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {ganadoresTop.map((g, index) => (
            <div
              key={g.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/15 shadow-xl hover:scale-[1.02] transition-transform"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#E5C07B] font-extrabold text-2xl">#{index + 1}</span>
                <span className={`px-3 py-1 text-sm rounded-lg font-bold ${categoriaColor(g.categoria)}`}>
                  {g.categoria}
                </span>
              </div>
              <h4 className="text-white font-bold text-xl truncate">{g.alias}</h4>
              <p className="text-[#E5C07B] font-extrabold text-3xl mt-2">
                {fmtARS(g.monto)}
              </p>
              <p className="text-white/70 text-sm mt-2">Fecha: {fmtFechaAR(g.fecha)}</p>
            </div>
          ))}
        </div>

        {/* 📋 Puestos 6–10 */}
        <h3 className="text-center text-xl sm:text-2xl font-bold text-white mb-6">
          Puestos 6–10
        </h3>

        <div className="rounded-xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[0.6fr,2fr,1.2fr,1.2fr,1.5fr] gap-4 px-6 py-3 border-b border-white/10 text-sm font-semibold uppercase text-white/70">
            <span>#</span>
            <span>Usuario</span>
            <span>Categoría</span>
            <span>Fecha</span>
            <span className="text-right">Ganado</span>
          </div>

          {/* Lista (solo 5 filas) */}
          <ul className="divide-y divide-white/10">
            {puestos6a10.map((g, index) => (
              <li
                key={g.id}
                className="md:grid md:grid-cols-[0.6fr,2fr,1.2fr,1.2fr,1.5fr] md:items-center md:gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
              >
                {/* Desktop */}
                <div className="hidden md:block text-[#E5C07B] font-bold">{index + 6}</div>
                <div className="hidden md:block text-white font-medium truncate">{g.alias}</div>
                <div className="hidden md:block">
                  <span className={`px-2 py-1 text-xs rounded-lg font-semibold ${categoriaColor(g.categoria)}`}>
                    {g.categoria}
                  </span>
                </div>
                <div className="hidden md:block text-white/80">{fmtFechaAR(g.fecha)}</div>
                <div className="hidden md:block text-right text-[#E5C07B] font-bold">
                  {fmtARS(g.monto)}
                </div>

                {/* Mobile */}
                <div className="md:hidden flex flex-col gap-2 bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-[#E5C07B] font-bold">#{index + 6}</span>
                    <span className="text-[#E5C07B] font-bold">{fmtARS(g.monto)}</span>
                  </div>
                  <span className="text-white font-semibold">{g.alias}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-lg font-semibold ${categoriaColor(g.categoria)}`}>
                      {g.categoria}
                    </span>
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
