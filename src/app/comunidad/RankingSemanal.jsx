export default function RankingSemanal() {
  const ganadores = [
    { id: 1, alias: 'FieraDelPixel', monto: 2500 },
    { id: 2, alias: 'ReyDelClick', monto: 1850 },
    { id: 3, alias: 'DamaDeLaSuerte', monto: 1500 },
    { id: 4, alias: 'ElEstratega', monto: 1100 },
    { id: 5, alias: 'GenioDigital', monto: 950 },
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="bg-[#1f1f1f] rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-[#E5C07B]">
          🏆 Ranking Semanal
        </h2>

        <ul className="space-y-4">
          {ganadores.map((g, index) => (
            <li
              key={g.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#E5C07B] font-bold text-xl">{index + 1}.</span>
                <span className="text-white font-semibold">{g.alias}</span>
              </div>
              <span className="text-[#E5C07B] font-bold">${g.monto.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
