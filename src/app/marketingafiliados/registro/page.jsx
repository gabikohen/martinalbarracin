"use client";
import { useState } from "react";

function RegistroForm() {
  const [nombre, setNombre] = useState("");
  const [whats, setWhats] = useState("");
  const [plataforma, setPlataforma] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !whats || !plataforma) return alert("Completá todos los campos.");

    // Sanitizar número para wa.me (solo dígitos)
    const phoneRaw = "5491123456789"; // ← CAMBIÁ ESTO A TU NÚMERO
    const phone = phoneRaw.replace(/\D/g, "");

    const msg = `Hola! Quiero registrarme en MarTeam.
- Nombre: ${nombre}
- WhatsApp: ${whats}
- Plataforma: ${plataforma}`;

    const wa = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(wa, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl mx-auto text-left">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Nombre completo</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E5C07B]"
          placeholder="Ej: Gabriel Kohen"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">WhatsApp (con código país)</label>
        <input
          value={whats}
          onChange={(e) => setWhats(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E5C07B]"
          placeholder="Ej: +54 9 11 2345-6789"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Plataforma donde jugás</label>
        <select
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
          className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E5C07B]"
        >
          <option value="">Elegí una opción</option>
          <option value="Casino A">Casino A</option>
          <option value="Casino B">Casino B</option>
          <option value="A definir">A definir</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 bg-[#E5C07B] text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
      >
        Enviar y crear registro
      </button>

      <p className="text-xs text-gray-500">
        Al enviar, se abre WhatsApp con tus datos prellenados para confirmar el alta. Luego te guiamos para verificar la cuenta y activar tus bonificaciones.
      </p>
    </form>
  );
}

export default function RegistroPage() {
  return (
    <main className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] text-white min-h-screen py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-[#E5C07B] mb-4">Registro rápido</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Completá tus datos y te contactamos por WhatsApp para activar tu cuenta, verificar identidad y habilitar tus bonificaciones.
        </p>
        <RegistroForm />
      </div>
    </main>
  );
}
