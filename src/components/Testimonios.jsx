"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  { id: 1, name: "Diego Armando", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { id: 2, name: "Marisa Saba", text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." },
  { id: 3, name: "Jane Doe 3", text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti." },
  { id: 4, name: "Jane Doe 4", text: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio." },
  { id: 5, name: "Jane Doe 5", text: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates." },
  { id: 6, name: "Jane Doe 6", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse." },
  { id: 7, name: "Jane Doe 7", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse." },
  { id: 8, name: "Jane Doe 8", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse." },
  { id: 9, name: "Jane Doe 0", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse." },
];

const TestimonialCard = ({ name, text }) => (
  <div className="bg-transparent bg-[radial-gradient(ellipse_at_top_left,rgba(229,192,123,0.08),transparent)] border border-white/20 rounded-2xl px-8 py-12 shadow-[0_0_15px_rgba(255,255,255,0.1)] h-full w-full flex flex-col justify-between">
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
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
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