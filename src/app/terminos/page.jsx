"use client";

import { Shield, AlertTriangle, FileText } from "lucide-react";

export default function LegalSection() {
  return (
    <section id="terminos" className="bg-black text-gray-100 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Encabezado */}
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 text-[#dfb95a] mx-auto" />
          <h1 className="text-3xl md:text-4xl font-bold text-[#dfb95a]">
            Aviso Legal y Condiciones de Uso
          </h1>
          <p className="text-sm text-gray-400">Última actualización: Septiembre 2025</p>
        </div>

        {/* Términos */}
        <div className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#dfb95a]">
            <FileText className="w-6 h-6 text-[#dfb95a]" /> Términos y Condiciones
          </h2>
          <p>
            MarTeam no es un casino ni organiza juegos de azar. Nuestro rol es
            únicamente actuar como intermediario en la gestión de fichas digitales
            de terceros.
          </p>
          <p>
            El uso del servicio es voluntario y bajo exclusiva responsabilidad del
            usuario. Debés ser mayor de 18 años. MarTeam no garantiza resultados ni
            ganancias.
          </p>
          <p>
            MarTeam no asume responsabilidad por pérdidas económicas, problemas
            técnicos o cualquier consecuencia derivada del uso de plataformas de
            terceros. El servicio se ofrece “tal cual”, sin garantías expresas o
            implícitas.
          </p>
          <p>
            Una vez confirmadas, las operaciones no tienen reembolso. Cualquier
            inconveniente con plataformas externas queda fuera de nuestra
            responsabilidad.
          </p>
        </div>

        {/* Privacidad */}
        <div className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#dfb95a]">
            <FileText className="w-6 h-6 text-[#dfb95a]" /> Aviso de Privacidad
          </h2>
          <p>
            MarTeam puede solicitar datos mínimos de contacto (ejemplo: nombre,
            número de WhatsApp, información de pago). Los datos se utilizan
            únicamente para gestionar transacciones y comunicaciones.
          </p>
          <p>
            No compartimos datos personales con terceros, salvo cuando sea
            estrictamente necesario para completar operaciones o por obligación
            legal.
          </p>
          <p>
            El usuario puede pedir en cualquier momento la baja de sus datos de
            contacto enviando un mensaje a nuestro canal oficial.
          </p>
        </div>

        {/* Aviso Importante */}
        <div className="bg-[#dfb95a]/10 border border-[#dfb95a]/30 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-[#dfb95a] shrink-0" />
          <p className="text-sm md:text-base text-gray-200">
            ⚠️ El uso de MarTeam está destinado exclusivamente a mayores de 18
            años. Al utilizar este servicio, aceptás que lo hacés bajo tu propia
            responsabilidad, reconociendo que MarTeam no es responsable por
            actividades de plataformas externas.
          </p>
        </div>
      </div>
    </section>
  );
}
