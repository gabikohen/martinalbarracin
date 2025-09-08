"use client";
import { useEffect, useState } from "react";

export default function SlotMachine({ onContinue }) {
  const targetLetters = ["M", "A", "R", "T", "E", "A", "M"];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [success, setSuccess] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

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
    const container = document.getElementById(`container${reelIndex}`);
    const letters = [];
    for (let i = 0; i < 20; i++) {
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    letters.push(targetLetters[reelIndex]);

    letters.forEach((letter) => {
      const letterDiv = document.createElement("div");
      // Letras SIEMPRE blancas
      letterDiv.className =
        "reel-letter !text-white text-3xl font-bold flex items-center justify-center";
      letterDiv.textContent = letter;
      container.appendChild(letterDiv);
    });

    return letters.length - 1;
  }

  function spinReel(reelIndex, targetIndex, duration) {
    return new Promise((resolve) => {
      const container = document.getElementById(`container${reelIndex}`);
      const reel = document.getElementById(`reel${reelIndex}`);
      const firstLetter = container.querySelector(".reel-letter");
      const letterHeight = firstLetter.offsetHeight;

      reel.classList.add("spinning");
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
            reel.classList.remove("spinning");
            reel.classList.add("final-glow");
            setTimeout(() => reel.classList.remove("final-glow"), 1000);
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
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0c1b0c] to-black relative overflow-hidden">
      <div className="background-light absolute inset-0"></div>

      <div className="flex flex-col items-center relative z-10">
        <div className="flex gap-6 mb-12 p-6 rounded-2xl border border-green-500 shadow-[0_0_40px_rgba(0,255,100,0.3)] bg-gradient-to-br from-green-500/10 to-green-500/5">
          {/* MAR */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                id={`reel${i}`}
                className="reel w-20 h-32 rounded-lg border-2 border-green-400 shadow-inner overflow-hidden relative bg-black/80"
              >
                <div id={`container${i}`} className="absolute w-full top-0"></div>
              </div>
            ))}
          </div>
          <div className="w-6"></div>
          {/* TEAM */}
          <div className="flex gap-2">
            {[3, 4, 5, 6].map((i) => (
              <div
                key={i}
                id={`reel${i}`}
                className="reel w-20 h-32 rounded-lg border-2 border-green-400 shadow-inner overflow-hidden relative bg-black/80"
              >
                <div id={`container${i}`} className="absolute w-full top-0"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Continuar — hover sutil (glow verde) */}
        {showBtn && (
          <button
            onClick={onContinue}
            className="inline-flex items-center justify-center px-12 py-4 rounded-md border border-green-500 text-white text-xl font-bold uppercase tracking-wide bg-transparent transition-shadow duration-200 hover:shadow-[0_0_24px_rgba(34,197,94,0.35)] focus:outline-none focus:ring-2 focus:ring-green-500/40 active:scale-[0.99]"
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}
