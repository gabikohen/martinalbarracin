
import styles from "./page.module.css";

// src/app/page.js
import HeroSection from "../components/HeroSection";
import Bonificaciones from "../components/Bonificaciones";
import Ruleta from "../components/Ruleta";
import Testimonios from "../components/Testimonios";

export default function Home() {
  return (
    <main>
       <Ruleta />
      <HeroSection />
      <Bonificaciones />
   
      <Testimonios />
    </main>
  );
}
