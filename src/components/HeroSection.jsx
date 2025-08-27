"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const sceneContainerRef = useRef();
  const threeRef = useRef();
  const animationFrameRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });

  const words = ["Lo", "que", "importa", "es","la","confianza","en","el","cajero,", "no", "la", "plataforma"];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isClient, words.length]);

  useEffect(() => {
    if (!isClient) return;
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !sceneContainerRef.current || sceneContainerRef.current.clientWidth === 0) return;

    // Se declaran las variables aquí para que sean accesibles en todo el hook
    let spawnHeight, spawnWidth;

    const initScene = (container) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3.5);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const objects = [];
      const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * 15;
      
      // Se asigna el valor a las variables
      spawnWidth = viewHeight * 2.5;
      spawnHeight = viewHeight;

      for (let i = 0; i < 150; i++) {
        const coin = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.2, 0.04, 24),
          new THREE.MeshPhongMaterial({
            color: 0xFFBF00, shininess: 300, specular: 0xffeeaa, emissive: 0x332200
          })
        );
        coin.position.set(
          (Math.random() - 0.5) * spawnWidth,
          (Math.random() - 0.5) * spawnHeight,
          (Math.random() - 0.5) * 15
        );
        coin.rotation.set(Math.random() * Math.PI, 0, Math.random() * Math.PI);
        coin.userData.vy = Math.sin(Math.random() * Math.PI * 2) * 0.015;
        scene.add(coin);
        objects.push(coin);
      }
      
      camera.position.z = 15;

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.2, 0.4, 0.8);
      composer.addPass(bloomPass);

      return { scene, camera, renderer, objects, composer };
    };

    const threeData = initScene(sceneContainerRef.current);
    threeRef.current = threeData;

    const animate = () => {
      if (!threeRef.current) return;
      animationFrameRef.current = requestAnimationFrame(animate);

      const { scene, camera, renderer, objects, composer } = threeRef.current;
      
      scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, mousePosition.current.x * 0.1, 0.05);
      scene.rotation.x = THREE.MathUtils.lerp(scene.rotation.x, -mousePosition.current.y * 0.1, 0.05);
      
      const mouseVector = new THREE.Vector3(mousePosition.current.x, mousePosition.current.y, 0.5);
      mouseVector.unproject(camera);
      const dir = mouseVector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      objects.forEach((o) => {
        o.rotation.y += 0.01;
        o.position.y += o.userData.vy;

        const distanceToMouse = o.position.distanceTo(pos);
        if (distanceToMouse < 2) {
          const repelForce = (1 - distanceToMouse / 2) * 0.1;
          const repelVector = o.position.clone().sub(pos).normalize().multiplyScalar(repelForce);
          o.position.add(repelVector);
        }

        // Reposiciona las monedas para que se mantengan en la pantalla (wrapping)
        if(o.position.y > spawnHeight / 2) o.position.y = -spawnHeight / 2;
        if(o.position.y < -spawnHeight / 2) o.position.y = spawnHeight / 2;
        
        // --- CÓDIGO CORREGIDO ---
        // Se añade la comprobación horizontal para que las monedas no se escapen
        if(o.position.x > spawnWidth / 2) o.position.x = -spawnWidth / 2;
        if(o.position.x < -spawnWidth / 2) o.position.x = spawnWidth / 2;
      });

      composer.render();
    };

    animate();

    const handleResize = () => {
      const container = sceneContainerRef.current;
      if (!container || !threeRef.current) return;
      
      const { camera, renderer, composer } = threeRef.current;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      if(sceneContainerRef.current && threeRef.current?.renderer) {
          sceneContainerRef.current.removeChild(threeRef.current.renderer.domElement);
          threeRef.current.renderer.dispose();
      }
    };
  }, [isClient]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] overflow-hidden">
      <div ref={sceneContainerRef} className="absolute inset-0 z-0 w-full h-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-11/12 md:w-2/3 lg:w-1/2 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block mr-4 transition-all duration-1000 transform ${
                index <= currentWordIndex ? 'opacity-100' : 'opacity-0 -translate-y-4'
              }`}
              style={{
                color: '#dfb95a',
                textShadow: '0 0 10px rgba(229,192,123,0.5), 0 0 25px rgba(229,192,123,0.3)',
                transitionDelay: `${index * 0.15}s`
              }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;