"use client";

export default function HallOfFameList() {
  const fmtARS = (n) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(n);

  const fmtFecha = (iso) =>
    new Date(iso).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  // Top 5 destacados
  const ganadoresTop = [
    { id: 1, alias: "Marisa23", categoria: "MS8", fecha: "2025-08-24", monto: 2500000 },
    { id: 2, alias: "Diegoarma", categoria: "MS7", fecha: "2025-08-23", monto: 1850000 },
    { id: 3, alias: "Topo23", categoria: "MS6", fecha: "2025-08-22", monto: 1500000 },
    { id: 4, alias: "Marisab", categoria: "MS5", fecha: "2025-08-21", monto: 1100000 },
    { id: 5, alias: "Marianosv2", categoria: "MS4", fecha: "2025-08-20", monto: 950000 },
  ];

  // Resto hasta 100
  const otros = Array.from({ length: 95 }, (_, i) => {
    const nivel = Math.ceil(Math.random() * 8);
    return {
      id: i + 6,
      alias: `Jugador${i + 6}`,
      categoria: `MS${nivel}`,
      fecha: "2025-08-19",
      monto: Math.floor(Math.random() * 500000 + 10000),
    };
  });

  const jugadores = [...ganadoresTop, ...otros];

  // Colores categorías
  const categoriaColor = (cat) => {
    switch (cat) {
      case "MS8":
        return "bg-yellow-400/90 text-black";
      case "MS7":
        return "bg-green-400/90 text-black";
      case "MS6":
        return "bg-cyan-400/90 text-black";
      case "MS5":
        return "bg-purple-400/90 text-black";
      case "MS4":
        return "bg-pink-400/90 text-black";
      case "MS3":
        return "bg-orange-400/90 text-black";
      case "MS2":
        return "bg-gray-400/90 text-black";
      case "MS1":
        return "bg-white/20 text-white";
      default:
        return "bg-white/10 text-white/80";
    }
  };

  return (
    <section className="py-10 sm:py-16">
      <div className="w-full max-w-6xl mx-auto rounded-2xl border border-white/15 bg-transparent backdrop-blur-md shadow-2xl p-6">
        
        {/* 🏆 Top 5 jugadores */}
        <h3 className="text-center text-2xl sm:text-3xl font-extrabold text-[#E5C07B] mb-8">
          Top 5 Ganadores
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ganadoresTop.map((g, index) => (
            <div
              key={g.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/15 shadow-xl hover:scale-[1.02] transition-transform"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#E5C07B] font-extrabold text-2xl">
                  #{index + 1}
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-lg font-bold ${categoriaColor(
                    g.categoria
                  )}`}
                >
                  {g.categoria}
                </span>
              </div>
              <h4 className="text-white font-bold text-xl truncate">{g.alias}</h4>
              <p className="text-[#E5C07B] font-extrabold text-3xl mt-2">
                {fmtARS(g.monto)}
              </p>
              <p className="text-white/70 text-sm mt-2">Fecha: {fmtFecha(g.fecha)}</p>
            </div>
          ))}
        </div>

        {/* 📋 Resto de jugadores */}
        <h3 className="text-center text-xl sm:text-2xl font-bold text-white mb-6">
          Ranking completo (6–100)
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

          {/* Lista scrollable */}
          <ul className="max-h-[500px] overflow-y-auto divide-y divide-white/10 scrollbar-thin scrollbar-thumb-[#E5C07B]/40 scrollbar-track-transparent">
            {jugadores.slice(5).map((g, index) => (
              <li
                key={g.id}
                className="md:grid md:grid-cols-[0.6fr,2fr,1.2fr,1.2fr,1.5fr] md:items-center md:gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
              >
                {/* Desktop */}
                <div className="hidden md:block text-[#E5C07B] font-bold">
                  {index + 6}
                </div>
                <div className="hidden md:block text-white font-medium truncate">
                  {g.alias}
                </div>
                <div className="hidden md:block">
                  <span
                    className={`px-2 py-1 text-xs rounded-lg font-semibold ${categoriaColor(
                      g.categoria
                    )}`}
                  >
                    {g.categoria}
                  </span>
                </div>
                <div className="hidden md:block text-white/80">{fmtFecha(g.fecha)}</div>
                <div className="hidden md:block text-right text-[#E5C07B] font-bold">
                  {fmtARS(g.monto)}
                </div>

                {/* Mobile */}
                <div className="md:hidden flex flex-col gap-2 bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-[#E5C07B] font-bold">
                      #{index + 6}
                    </span>
                    <span className="text-[#E5C07B] font-bold">{fmtARS(g.monto)}</span>
                  </div>
                  <span className="text-white font-semibold">{g.alias}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-lg font-semibold ${categoriaColor(
                        g.categoria
                      )}`}
                    >
                      {g.categoria}
                    </span>
                    <span className="text-white/70 text-xs">{fmtFecha(g.fecha)}</span>
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
