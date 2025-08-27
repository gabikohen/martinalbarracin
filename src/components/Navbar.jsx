// src/components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

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
 
    { label: "Afiliados", href: "/marketingafiliados", isExternal: false }
  ];

  const toggleMenu = () => setOpen(!isOpen);

  return (
    <div id="home" className="w-full p-4 bg-black">
      <div className="flex items-center justify-between">
  {/* Logo */}
<div className="inline-block transition-transform duration-300 hover:scale-110">
  <Image
    src="/marteam.svg"   // poné acá el nombre del archivo que subas a /public
    alt="MarTeam"
    width={180}                   // ancho lógico del @2x (doble del original)
    height={90}                  // alto lógico del @2x
   
  />
</div>
        {/* Menú Desktop */}
        <ul className="hidden md:flex items-center gap-5 text-lg text-white">
          {navItems.map(item => (
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

      {/* Menú Mobile */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <ul className="flex flex-col space-y-4 p-4 text-2xl font-bold text-white">
          {navItems.map(item => (
            <li key={item.href} className="border-b-2 border-white pb-2 w-full">
              <Link
                href={item.href}
                onClick={toggleMenu}
                className="hover:text-[#dfb95a] hover:drop-shadow-[0_0_10px_rgba(255,247,209,0.8)] transition-colors duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-4 w-full">
            <button className="w-full bg-[#e0ddcc] hover:bg-[#f7eab3] text-black py-2 px-4 rounded-lg
                               transition-shadow duration-300 shadow-md hover:shadow-[0_0_15px_rgba(255,247,209,0.8)]">
              JUGAR AHORA
            </button>
          </li>
        </ul>
      </div>
    </div>
);
}
