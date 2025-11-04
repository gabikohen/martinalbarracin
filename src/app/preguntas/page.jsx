'use client'

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    { question: "¿Cuáles son los métodos de pago para cargar dinero?", answer: "Métodos de pago para cargar: bancos (Santander, Galicia, BBVA, etc.), billeteras y bancos digitales (Mercado Pago, Brubank, etc.), efectivo (Rapipago y Pago Fácil) y criptomonedas (USDT)." },
    { question: "¿Hay comisiones por depósitos o retiros?", answer: "No hay comisiones, todo lo que cargas y todo lo que retiras es tuyo" },
    { question: "¿Cuál es la carga mínima y retiro mínimo?", answer: "Carga $10.000, retiro $30.000" },
    { question: "¿Qué tipos de juegos ofrecen?", 
  answer: "Ruleta, slots, blackjack, casino en vivo, apuestas deportivas y mucho más."},
    { question: "¿Cuál es el bono de bienvenida?", answer: "Te bonificamos el 50% con tu primera carga" },
    { question: "¿Desde dónde pueden jugar?", answer: "Podés jugar desde celular, computadora, tablet o cualquier dispositivo electrónico con acceso a Internet" },
    { question: "¿La plataforma cuenta con soporte las 24hs?", 
  answer: "Sí, contamos con soporte disponible las 24 horas, los 365 días del año."  },
    { question: "¿Qué pasa si olvido mi contraseña?", answer: "No hay problema, la restablecemos al instante" },
    
  ];

  return (
    <div  id="quienessomos" className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-[#dfb95a] text-lg sm:text-xl max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-trasnparent rounded-lg border border-gray-800 overflow-hidden transition-all duration-300 hover:border-gray-700"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <h3 className="text-white font-semibold text-base sm:text-lg pr-4">
                  {item.question}
                </h3>
                {openItems[index] ? (
                  <ChevronUp className="w-5 h-5 text-[#dfb95a]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#dfb95a]" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div className="mt-12 text-center">
          <div className="bg-transparent rounded-lg border border-gray-800 p-6 sm:p-8">
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-3">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-[#dfb95a] mb-6">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte
            </p>
            <button className="relative bg-transparent text-white py-4 px-8 rounded-lg border-2 border-[#dfb95a] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:shadow-[0_0_15px_#6b21a8,0_0_25px_#1e3a8a,0_0_35px_#312e81] before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:z-[-1] hover:text-[#FFF7D1] hover:shadow-[0_0_15px_rgba(255,247,209,0.8),0_0_25px_rgba(255,247,209,0.6)] hover:border-[#dfb95a]">
              <a
  href="https://wa.me/5491170817233"
  target="_blank"
  rel="noopener noreferrer"
 
>
  Contactar Soporte
</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
