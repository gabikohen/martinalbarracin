"use client";
import { useState } from "react";

import SlotMachine from "@/components/SlotMachine";
import HeroSection from "@/components/HeroSection";
import Bonificaciones from "@/components/Bonificaciones";
import Testimonios from "@/components/Testimonios";

export default function Page() {
  const [showContent, setShowContent] = useState(false);

  const handleContinue = () => {
    setShowContent(true);
  };

  if (!showContent) {
    // 🔹 SOLO SlotMachine, sin Navbar ni Footer
    return <SlotMachine onContinue={handleContinue} />;
  }

  return (
    <>
      <HeroSection />
      <Bonificaciones />
      <Testimonios />
    </>
  );
}
