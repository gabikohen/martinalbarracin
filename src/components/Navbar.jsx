"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Hamburger from "hamburger-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  // 🔒 Bloquear scroll cuando el menú mobile/tablet está abierto
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflowY = "hidden";
      document.documentElement.style.scrollBehavior = "auto";
    } else {
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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Quienes Somos", href: "/quienessomos" },
    { label: "Comunidad", href: "/comunidad" },
  ];

  const toggleMenu = () => setOpen((v) => !v);
  const closeMenu = () => setOpen(false);

  // 🌟 Sin rayas (desktop/laptop)
  const DesktopNavItem = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        prefetch
        className={`px-2 py-1 transition-colors duration-300 hover:text-[#dfb95a] 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb95a]/60 rounded
        ${isActive ? "text-[#dfb95a]" : ""}`}
      >
        {children}
      </Link>
    );
  };

  // 📱 Con rayas + hover text-xl (mobile/tablet)
  const MobileNavItem = ({ href, children, onClick }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        prefetch
        onClick={onClick}
        className={`
          relative block w-full text-center py-2 mb-5
          transition-all duration-300 ease-in-out
          border-b-2 border-transparent hover:border-[#dfb95a] hover:text-xl
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb95a]/60 rounded
          ${isActive ? "text-[#dfb95a]" : ""}
        `}
      >
        {children}
      </Link>
    );
  };

  return (
    <div id="home" className="w-full p-4 bg-black relative z-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="inline-block transition-transform duration-300 hover:scale-110"
          onClick={closeMenu}
        >
          <Image
            src="/2-b.svg"
            alt="MarTeam"
            width={180}
            height={90}
            className="lg:w-[180px] lg:h-[90px] w-[150px] h-[75px]"
            priority
          />
        </Link>

        {/* Menú Desktop/Laptop (desde lg) — sin rayas */}
        <ul className="hidden lg:flex items-center gap-5 text-lg text-white">
          {navItems.map((item) => (
            <li key={item.href}>
              <DesktopNavItem href={item.href}>{item.label}</DesktopNavItem>
            </li>
          ))}
          <li>
            {/* Botón a WhatsApp (desktop) */}
            <a
              href="https://wa.me/5491123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <span
                className="relative inline-block bg-transparent text-white py-3 px-6 rounded-lg border-2 border-[#dfb95a]
                transition duration-300 hover:-translate-y-1 hover:scale-110
                before:content-[''] before:absolute before:inset-0 before:rounded-lg
                before:shadow-[0_0_15px_#6b21a8,0_0_25px_#1e3a8a,0_0_35px_#312e81]
                before:opacity-0 hover:before:opacity-100
                hover:text-[#FFF7D1] hover:shadow-[0_0_15px_rgba(255,247,209,0.8)]
                hover:border-[#dfb95a]"
              >
                JUGAR AHORA
              </span>
            </a>
          </li>
        </ul>

        {/* Hamburger Mobile/Tablet (sm + md, oculto en lg) */}
        <div className="lg:hidden">
          <Hamburger toggled={isOpen} toggle={toggleMenu} color="white" size={40} />
        </div>
      </div>

      {/* Menú Mobile + Tablet (<= 1023px) — con rayas animado */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 
        ${isOpen ? "h-screen mt-8" : "h-0"}`}
      >
        <ul className="flex flex-col items-center p-6 text-xl font-bold text-white w-full max-w-md mx-auto">
          {navItems.map((item) => (
            <li key={item.href} className="w-full">
              <MobileNavItem href={item.href} onClick={closeMenu}>
                {item.label}
              </MobileNavItem>
            </li>
          ))}

          <li className="mt-2 w-full">
            {/* Botón a WhatsApp (mobile/tablet) */}
            <a
              href="https://wa.me/5491168324349"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="block"
            >
              <span
                className="relative block text-center w-full bg-transparent text-white py-4 px-8 rounded-lg border-2 border-[#dfb95a]
                transition duration-300 hover:-translate-y-1 hover:scale-110
                before:content-[''] before:absolute before:inset-0 before:rounded-lg
                before:shadow-[0_0_15px_#6b21a8,0_0_25px_#1e3a8a,0_0_35px_#312e81]
                before:opacity-0 hover:before:opacity-100
                hover:text-[#FFF7D1] hover:shadow-[0_0_15px_rgba(255,247,209,0.8)]
                hover:border-[#dfb95a] text-lg font-bold"
              >
                JUGAR AHORA
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
