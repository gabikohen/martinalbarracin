import Ruleta from "../components/Ruleta";
import Bonificaciones from "../components/Bonificaciones";
import Testimonios from "../components/Testimonios";

import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <Ruleta />
    <HeroSection/>
    
      <Bonificaciones />
      <Testimonios />
    </main>
  );
}
