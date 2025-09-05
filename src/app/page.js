
import Bonificaciones from "../components/Bonificaciones";
import Testimonios from "../components/Testimonios";

import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>

    <HeroSection/>
    
      <Bonificaciones />
      <Testimonios />
    </main>
  );
}
