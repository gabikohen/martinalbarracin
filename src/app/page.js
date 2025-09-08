"use client";
import { useState } from "react";

import SlotMachine from "@/components/SlotMachine";
import HeroSection from "@/components/HeroSection";
import Bonificaciones from "@/components/Bonificaciones";
import Testimonios from "@/components/Testimonios";

export default function Page() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent ? (
        <SlotMachine onContinue={() => setShowContent(true)} />
      ) : (
        <>
          <HeroSection />
          <Bonificaciones />
          <Testimonios />
      
        </>
      )}
    </>
  );
}
