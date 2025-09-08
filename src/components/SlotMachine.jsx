"use client";
import { useEffect, useState, useRef } from "react";

export default function SlotMachine({ onContinue }) {
  const targetLetters = ["M", "A", "R", "T", "E", "A", "M"];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [success, setSuccess] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  // 🔗 Refs para cada contenedor de reel
  const containersRef = useRef([]);

  // 🔊 Audio
  let audioContext;
  function initAudio() {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log("Web Audio API not supported");
    }
  }
  function playClickSound() {
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  function createReel(reelIndex) {
    const container = containersRef.current[reelIndex];
    if (!container) return 0;

    container.innerHTML = ""; // limpiar contenido
    const letters = [];
    for (let i = 0; i < 20; i++) {
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    letters.push(targetLetters[reelIndex]);

    letters.forEach((letter) => {
      const letterDiv = document.createElement("div");
      letterDiv.className =
        "reel-letter text-white font-bold flex items-center justify-center " +
        "text-lg sm:text-xl md:text-2xl lg:text-4xl";
      letterDiv.textContent = letter;
      container.appendChild(letterDiv);
    });

    return letters.length - 1;
  }

  function spinReel(reelIndex, targetIndex, duration) {
    return new Promise((resolve) => {
      const container = containersRef.current[reelIndex];
      if (!container) return resolve();

      const firstLetter = container.querySelector(".reel-letter");
      const letterHeight = firstLetter.offsetHeight;

      let position = 0;
      const finalPosition = -targetIndex * letterHeight;
      const totalSpins = Math.floor(duration / 50);
      const increment =
        (Math.abs(finalPosition) + letterHeight * 10) / totalSpins;

      let currentSpin = 0;
      const spinInterval = setInterval(() => {
        if (currentSpin < totalSpins - 10) {
          position -= increment;
          if (currentSpin % 5 === 0) playClickSound();
        } else {
          position += (finalPosition - position) * 0.15;
          if (Math.abs(position - finalPosition) < 1) {
            position = finalPosition;
            clearInterval(spinInterval);
            resolve();
          }
        }
        container.style.transform = `translateY(${position}px)`;
        currentSpin++;
      }, 50);
    });
  }

  async function startSlotAnimation() {
    const reelTargetIndices = [];
    for (let i = 0; i < targetLetters.length; i++) {
      reelTargetIndices.push(createReel(i));
    }
    await new Promise((resolve) => setTimeout(resolve, 100));

    const spinPromises = [];
    targetLetters.forEach((_, index) => {
      setTimeout(() => {
        const duration = 2000 + index * 300;
        spinPromises.push(spinReel(index, reelTargetIndices[index], duration));
      }, index * 400);
    });

    setTimeout(async () => {
      await Promise.all(spinPromises);
      setSuccess(true);
      setTimeout(() => setShowBtn(true), 500);
    }, targetLetters.length * 400 + 3000);
  }

  useEffect(() => {
    initAudio();
    setTimeout(() => {
      startSlotAnimation();
    }, 1000);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0c1b0c] to-black overflow-hidden">
      <div className="flex flex-col items-center relative z-10">
        {/* Contenedor Slot adaptativo */}
        <div className="flex gap-4 md:gap-6 mb-8 md:mb-12 p-4 md:p-6 rounded-2xl border border-green-500 shadow-[0_0_40px_rgba(0,255,100,0.3)] bg-gradient-to-br from-green-500/10 to-green-500/5 w-[95%] sm:w-[85%] md:w-auto justify-center">
          {/* MAR */}
          <div className="flex gap-1 md:gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="reel 
                  w-12 h-20 
                  sm:w-14 sm:h-24 
                  md:w-16 md:h-28 
                  lg:w-20 lg:h-32
                  rounded-lg border-2 border-green-400 shadow-inner overflow-hidden relative bg-black/80"
              >
                <div ref={(el) => (containersRef.current[i] = el)} className="absolute w-full top-0"></div>
              </div>
            ))}
          </div>
          <div className="w-2 md:w-6"></div>
          {/* TEAM */}
          <div className="flex gap-1 md:gap-2">
            {[3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="reel 
                  w-12 h-20 
                  sm:w-14 sm:h-24 
                  md:w-16 md:h-28 
                  lg:w-20 lg:h-32
                  rounded-lg border-2 border-green-400 shadow-inner overflow-hidden relative bg-black/80"
              >
                <div ref={(el) => (containersRef.current[i] = el)} className="absolute w-full top-0"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón con fondo transparente + hover */}
        {showBtn && (
          <button
            onClick={onContinue}
            className="px-10 py-3 bg-transparent hover:bg-green-600 active:bg-green-700 border-2 border-green-500 rounded-md text-white text-lg md:text-xl font-bold uppercase tracking-wide transition-all duration-300"
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}
