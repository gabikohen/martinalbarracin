"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, TrendingUp, Clock, Gift, BarChart3, Settings, Headphones, Sparkles, Zap, Star, X, Eye, EyeOff } from 'lucide-react';

const AfiliateSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    acceptTerms: false,
    referralCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué es el programa de afiliados?",
      answer: "Un sistema que te permite generar ingresos recomendando jugadores a nuestro casino y sportsbook."
    },
    {
      question: "¿Hay límite de ganancias?",
      answer: "No. Mientras más jugadores refieras, más ganas."
    },
    {
      question: "¿Dónde puedo promocionar?",
      answer: "En redes sociales, sitios web, foros, grupos privados, newsletters y más."
    },
    {
      question: "¿Cuándo cobro?",
      answer: "Los pagos se procesan de forma cómoda, rápida y segura, con opciones flexibles de retiro."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-8">
              <Sparkles className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-400 font-medium">Programa Premium de Afiliados</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Conéctate y gana con cada
              <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-yellow-400 bg-clip-text text-transparent">
                cliente recomendado
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Únete a nuestro programa de afiliados y empieza a generar ingresos de por vida. 
              Obtén hasta un <span className="text-green-400 font-bold text-2xl">40% de comisión</span> sobre 
              las ganancias de tus clientes y accede a beneficios exclusivos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 border-2 border-transparent hover:border-green-400/50"
              >
                <span className="flex items-center">
                  <Zap className="w-6 h-6 mr-2" />
                  Únete a Nuestro Programa de Afiliados
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Empezar */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Cómo Empezar
            </h2>
            <p className="text-xl text-gray-400">En solo 3 simples pasos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-green-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Crea tu campaña</h3>
                <p className="text-gray-400 text-lg">
                  Regístrate en el programa y recibe tu enlace único de referidos.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-emerald-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Comparte tu enlace</h3>
                <p className="text-gray-400 text-lg">
                  Difunde tu enlace en redes sociales, grupos de chat, email o directamente con tus amigos.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-yellow-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Gana comisiones</h3>
                <p className="text-gray-400 text-lg">
                  Cada vez que alguien se registre y apueste usando tu enlace, recibirás comisiones en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estructura de Comisiones */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Estructura de Comisiones
            </h2>
            <p className="text-xl text-gray-400">Transparente y competitiva</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-3xl">🏈</span>
                </div>
                <h3 className="text-3xl font-bold text-white">Deportes</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                Cada apuesta deportiva genera comisión sobre el 3% del monto apostado.
              </p>
              <div className="bg-black/40 rounded-2xl p-6 border border-gray-700">
                <div className="text-gray-400 text-sm mb-2">Fórmula:</div>
                <code className="text-green-400 text-lg font-mono">
                  (0.03 × Monto Apostado × Tasa de Comisión) ÷ 2
                </code>
              </div>
            </div>
            
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-purple-500/30 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-3xl">🎰</span>
                </div>
                <h3 className="text-3xl font-bold text-white">Casino</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                Cada juego genera comisión basada en la ventaja de la casa.
              </p>
              <div className="bg-black/40 rounded-2xl p-6 border border-gray-700">
                <div className="text-gray-400 text-sm mb-2">Fórmula:</div>
                <code className="text-green-400 text-lg font-mono">
                  (Ventaja × Monto Apostado × Tasa de Comisión) ÷ 2
                </code>
              </div>
            </div>
          </div>
          
          <div className="text-center bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Comisión Garantizada</h3>
            </div>
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text mb-2">
              Comisión base: 10%+
            </p>
            <p className="text-gray-300 text-lg">Con posibilidad de escalar según tu rendimiento</p>
          </div>
        </div>
      </section>

      {/* Ventajas Exclusivas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              VENTAJAS EXCLUSIVAS
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Lifetime Earning */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-green-500/30 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <span className="text-3xl">💰</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ganancias de por Vida</h3>
              <p className="text-gray-400 leading-relaxed">
                Obtén recompensas de por vida en todas las jugadas de cualquier amigo que refiera en apuestas de Casino y Deportes o compras de Lotería de un solo ticket.
              </p>
            </div>

            {/* Personalised User Experience */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-blue-500/30 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <span className="text-3xl">⚙️</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Experiencia de Usuario Personalizada</h3>
              <p className="text-gray-400 leading-relaxed">
                Shuffle tiene numerosas promociones semanales, desafíos y bonos creados para mantener a tus referidos comprometidos.
              </p>
            </div>

            {/* Instant Payout */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-emerald-500/30 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <span className="text-3xl">⚡</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pago Instantáneo</h3>
              <p className="text-gray-400 leading-relaxed">
                Gana comisiones al instante en cada apuesta de uno resultó, y reclama comisiones al instante sin tiempo de espera.
              </p>
            </div>

            {/* Marketing Tools */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-purple-500/30 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <span className="text-3xl">🛠️</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Herramientas de Marketing</h3>
              <p className="text-gray-400 leading-relaxed">
                Shuffle ha reunido materiales promocionales y un recorrido de incorporación para ayudarte a llegar a tus referidos.
              </p>
            </div>

            {/* Campaign Performance Tracking */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-yellow-500/30 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <span className="text-3xl">📊</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Seguimiento del Rendimiento de Campañas</h3>
              <p className="text-gray-400 leading-relaxed">
                Accede a herramientas de seguimiento de rendimiento para rastrear el registro de tus referidos, depósitos, cantidad apostada y comisiones ganadas a lo largo del tiempo.
              </p>
            </div>

            {/* Tailored Deals */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-500 border border-gray-800 hover:border-indigo-500/30 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <span className="text-3xl">🤝</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Acuerdos Personalizados</h3>
              <p className="text-gray-400 leading-relaxed">
                Si tienes un gran alcance online, comunícate con nosotros y nuestros gerentes de asociación pueden elaborar un acuerdo personalizado para ti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-400">Resolvemos tus dudas</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-all duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-xl font-semibold text-white pr-4">{faq.question}</h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-green-500/30 rotate-180' : ''}`}>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6 border-t border-gray-800">
                    <p className="text-gray-300 text-lg leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent rounded-3xl"></div>
            <div className="relative">
              <div className="flex justify-center mb-6">
                <Sparkles className="w-16 h-16 text-green-400" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                ¿Listo para empezar a ganar?
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Únete a miles de afiliados que ya están generando ingresos con nosotros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 px-12 rounded-2xl text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 border-2 border-transparent hover:border-green-400/50"
                >
                  <span className="flex items-center">
                    <Zap className="w-6 h-6 mr-3" />
                    Únete al Programa de Afiliados
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex h-full">
              {/* Left Side - 3D Design */}
              <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-green-600 via-emerald-600 to-green-800 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-300/10 rounded-full blur-xl animate-pulse delay-500"></div>
                </div>

                {/* 3D "S" Logo */}
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <div className="relative">
                    <div className="text-white text-9xl font-bold transform rotate-12 hover:rotate-0 transition-transform duration-700" style={{
                      textShadow: '0 0 50px rgba(255,255,255,0.3), 0 10px 20px rgba(0,0,0,0.5)',
                      filter: 'drop-shadow(0 20px 40px rgba(34, 197, 94, 0.4))'
                    }}>
                      S
                    </div>
                    <div className="absolute -top-4 -left-4 text-6xl font-bold text-green-200/20">S</div>
                    <div className="absolute -bottom-4 -right-4 text-6xl font-bold text-emerald-200/20">S</div>
                  </div>
                </div>

                {/* MARTEAM Brand */}
                <div className="absolute top-8 left-8 flex items-center">
                  <span className="text-white text-2xl font-bold">MARTEAM</span>
                </div>

                {/* Age verification text */}
                <div className="absolute bottom-8 left-8 text-white/80 text-sm">
                  <p>By accessing the site, I attest that I am at least 18 years old</p>
                  <p>and have read the <span className="underline cursor-pointer">Terms and Conditions</span></p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 relative">
                <button 
                  onClick={() => setShowRegisterModal(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="h-full flex flex-col">
                  {/* Tab Navigation */}
                  <div className="flex mb-8">
                    <button 
                      onClick={() => setActiveTab('register')}
                      className={`px-6 py-3 text-lg font-semibold border-b-2 transition-colors ${
                        activeTab === 'register' 
                          ? 'text-green-400 border-green-400' 
                          : 'text-gray-400 border-transparent hover:text-white'
                      }`}
                    >
                      Register
                    </button>
                    <button 
                      onClick={() => setActiveTab('login')}
                      className={`px-6 py-3 text-lg font-semibold border-b-2 transition-colors ml-8 ${
                        activeTab === 'login' 
                          ? 'text-green-400 border-green-400' 
                          : 'text-gray-400 border-transparent hover:text-white'
                      }`}
                    >
                      Login
                    </button>
                  </div>

                  {/* Register Form */}
                  {activeTab === 'register' && (
                    <div className="flex-1 space-y-6">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Username*</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Enter Username"
                          className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter Email"
                          className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Password*</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 pr-12 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-green-500 text-green-600"
                        />
                        <label className="ml-3 text-gray-300 text-sm">
                          I agree to the <span className="text-green-400 underline cursor-pointer">Terms & Conditions</span> and <span className="text-green-400 underline cursor-pointer">Privacy Policy</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Referral Code (Optional)</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="referralCode"
                            value={formData.referralCode}
                            onChange={handleInputChange}
                            placeholder="Enter referral code"
                            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                          />
                          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25">
                        Registro
                      </button>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="flex-1 h-px bg-gray-600"></div>
                          <p className="text-gray-400">Or continue with</p>
                          <div className="flex-1 h-px bg-gray-600"></div>
                        </div>
                        <div className="flex justify-center">
                          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-white py-3 px-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Login Form */}
                  {activeTab === 'login' && (
                    <div className="flex-1 space-y-6">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Username or Email*</label>
                        <input
                          type="text"
                          placeholder="Enter Username or Email"
                          className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Password*</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 pr-12 bg-transparent border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/25">
                        Login
                      </button>

                      <div className="text-center">
                        <p className="text-gray-400 mb-4">Or continue with</p>
                        <div className="flex justify-center">
                          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-white py-3 px-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AfiliateSection;