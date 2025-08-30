// src/components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  // 🔒 Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      // Fijamos el body para que no se mueva (iOS-friendly)
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflowY = "hidden";
      // Evitar “salto” por smooth scroll
      document.documentElement.style.scrollBehavior = "auto";
    } else {
      // Restaurar estado anterior del body y el scroll
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.documentElement.style.scrollBehavior = "";
      if (top) {
        const y = -parseInt(top, 10) || 0;
        window.scrollTo(0, y);
      }
    }
    // Limpieza por si el componente se desmonta con el menú abierto
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const triggerAnimation = () => {
      const letters = document.querySelectorAll(".letter");
      const subWords = document.querySelectorAll(".sub-word");

      letters.forEach((letter) => {
        letter.classList.remove("scale-100", "rotate-0");
        letter.classList.add("scale-125", "rotate-[360deg]");
        setTimeout(() => {
          letter.classList.remove("scale-125", "rotate-[360deg]");
          letter.classList.add("scale-100", "rotate-0");
        }, 600);
      });

      subWords.forEach((word, index) => {
        word.classList.add("-translate-y-5");
        setTimeout(() => {
          word.classList.remove("-translate-y-5");
        }, index * 100);
      });
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) triggerAnimation();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Home", href: "/", isExternal: false },
    { label: "Quienes Somos", href: "/quienessomos", isExternal: false },
    { label: "Comunidad", href: "/comunidad", isExternal: false },
    { label: "Afiliados", href: "/marketingafiliados", isExternal: false },
  ];

  const toggleMenu = () => setOpen(!isOpen);

  return (
    <div id="home" className="w-full p-4 bg-black relative z-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="inline-block transition-transform duration-300 hover:scale-110">
          <Image
            src="/2-b.svg"
            alt="MarTeam"
            width={180}
            height={90}
            className="md:w-[180px] md:h-[90px] w-[150px] h-[75px]"
          />
        </div>

        {/* Menú Desktop */}
        <ul className="hidden md:flex items-center gap-5 text-lg text-white">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-2 py-1 hover:text-[#dfb95a] hover:drop-shadow-[0_0_10px_rgba(255,247,209,0.8)] transition-colors duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="relative bg-transparent text-white py-4 px-8 rounded-lg border-2 border-[#dfb95a]
                              transition duration-300 hover:-translate-y-1 hover:scale-110
                              before:content-[''] before:absolute before:inset-0 before:rounded-lg
                              before:shadow-[0_0_15px_#6b21a8,0_0_25px_#1e3a8a,0_0_35px_#312e81]
                              before:opacity-0 hover:before:opacity-100
                              hover:text-[#FFF7D1] hover:shadow-[0_0_15px_rgba(255,247,209,0.8)]
                              hover:border-[#dfb95a]">
              JUGAR AHORA
            </button>
          </li>
        </ul>

        {/* Hamburger Mobile */}
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={toggleMenu} color="white" size={40} />
        </div>
      </div>

      {/* Menú Mobile - Centrado y sin líneas */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-8`}>
        <ul className="flex flex-col items-center space-y-6 p-6 text-xl font-bold text-white">
          {navItems.map((item) => (
            <li key={item.href} className="text-center">
              <Link
                href={item.href}
                onClick={toggleMenu}
                className="hover:text-[#dfb95a] hover:drop-shadow-[0_0_10px_rgba(255,247,209,0.8)] transition-colors duration-300 block py-2"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {/* Botón con más espacio y efectos */}
          <li className="mt-8 w-full max-w-xs">
            <button className="relative w-full bg-transparent text-white py-4 px-8 rounded-lg border-2 border-[#dfb95a]
                              transition duration-300 hover:-translate-y-1 hover:scale-110
                              before:content-[''] before:absolute before:inset-0 before:rounded-lg
                              before:shadow-[0_0_15px_#6b21a8,0_0_25px_#1e3a8a,0_0_35px_#312e81]
                              before:opacity-0 hover:before:opacity-100
                              hover:text-[#FFF7D1] hover:shadow-[0_0_15px_rgba(255,247,209,0.8)]
                              hover:border-[#dfb95a] text-lg font-bold">
              JUGAR AHORA
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
