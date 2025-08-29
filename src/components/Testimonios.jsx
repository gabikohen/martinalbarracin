"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  { id: 1, name: "Nicolás Pereyra", text: "Probé varios cajeros, pero con ustedes las cargas entran al toque y todo es transparente. Me quedé por la confianza y las comisiones claras." },
  { id: 2, name: "Rocío Medina", text: "Soy de Córdoba y valoro que me atiendan 24/7. Me avisan promos, cargan rápido y los retiros salen sin vueltas." },
  { id: 3, name: "Diego Bustos", text: "El mejor precio y soporte por WhatsApp cuando lo necesito. Siempre cumplen y explican el tipo de cambio sin letra chica." },
  { id: 4, name: "Julieta Benítez", text: "Entré por recomendación y sigo por el servicio: velocidad, atención humana y cero drama con los comprobantes." },
  { id: 5, name: "Lautaro Acosta", text: "Para mí la rapidez es clave. Acá cargo en minutos y puedo aprovechar las mesas. Encima tiran bonificaciones seguido." },
  { id: 6, name: "Camila Funes", text: "Confío porque priorizan la seguridad: validaciones, recibos y todo prolijo. Se nota que cuidan al jugador." },
  { id: 7, name: "Federico Domínguez", text: "No solo venden, también asesoran. Me ayudaron a ordenar límites y no sobreapostar. Trato de primera." },
  { id: 8, name: "Milagros Sosa", text: "Me copa el programa de fidelidad y los rankings semanales. Además, la atención es rápida y con buena onda." },
  { id: 9, name: "Bruno Rinaldi", text: "Con otros siempre había demoras. Con ustedes, retiros en tiempo y forma incluso feriados. Cero estrés." },
];

const TestimonialCard = ({ name, text }) => (
  <div className="bg-black border border-white/20 rounded-2xl px-8 py-12  h-full w-full flex flex-col justify-between">
    <div>
      <div className="text-[#dfb95a] mb-4 text-3xl">{"★".repeat(7)}</div>
      <p className="text-base leading-relaxed tracking-wide mb-6">“{text}”</p>
    </div>
    <p className="text-right text-sm font-light">{name}</p>
  </div>
);

const Testimonial = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div id="testimonios" className="max-w-full mx-auto px-4 py-6 overflow-hidden">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="px-2 sm:px-3 md:px-4 h-[340px]">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;