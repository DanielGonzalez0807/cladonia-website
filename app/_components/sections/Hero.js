"use client";

import { motion } from "framer-motion";


export default function Hero() {
  return (
    <section className="relative h-[80vh] w-screen overflow-hidden">
      
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute h-full w-full object-cover object-center"
        src="/video/hero-allvid.mp4"
        aria-label="Video de fondo mostrando naturaleza colombiana"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/72 to-black/0"></div>
      
      
      


      {/* CONTENIDO */}
      <div className="relative z-10 h-full flex items-end justify-center">
        <div className="absolute bg-linear-b from-black/50 to-black/80 w-full h-full" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-7xl mx-auto px-6 pb-10 text-white">
          <h1 className="text-3xl md:text-5xl font-black italic leading-tight text-white drop-shadow-md drop-shadow-black">
            EXPLORA RESERVAS NATURALES
          </h1>
          <p className="mt-4 max-w-1200px text-xl font-semibold text-white drop-shadow-md drop-shadow-black">
            Ven a conocer los más increíbles ecosistemas en la alta montaña en compañía de guías expertos.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
