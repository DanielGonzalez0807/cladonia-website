"use client";
import Image from "next/image";
import { useState } from "react";

/**
 * Componente About para la página de experiencias
 * Muestra información del Parque Nacional Chingaza con carrusel interactivo
 */
export default function About() {
  // Estado para controlar qué imagen está activa en el carrusel
  const [currentImage, setCurrentImage] = useState(0);
  
  // Datos de las diferentes experiencias disponibles
  const events = [
    {
      image: "/images/exp_1.png",
      title: "CHINGAZA",
      description: "Recorre senderos milenarios siguiendo las huellas de nuestros ancestros. Descubre petroglifos, plantas medicinales y la sabiduría de los pueblos originarios en una experiencia transformadora."
    },
    {
      image: "/images/img_1.png",
      title: "CHINGAZA",
      description: "Encuentra la paz interior en medio de la naturaleza. Sesión de meditación guiada junto a cascadas naturales, respiración consciente y conexión profunda con el entorno."
    },
    {
      image: "/images/img_3.png",
      title: "CHINGAZA",
      description: "Explora la vida nocturna del bosque bajo un cielo estrellado. Avista fauna nocturna, escucha los sonidos de la noche y aprende sobre astronomía en un ambiente mágico."
    }
  ];

  // Función para avanzar a la siguiente imagen
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % events.length);
  };

  // Función para retroceder a la imagen anterior
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + events.length) % events.length);
  };

  // Obtiene el índice de la imagen anterior para mostrar en el carrusel
  const getPrevIndex = () => (currentImage - 1 + events.length) % events.length;
  
  // Obtiene el índice de la imagen siguiente para mostrar en el carrusel
  const getNextIndex = () => (currentImage + 1) % events.length;
  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col justify-center text-white py-8">
      
      {/* Sección del título principal */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center space-y-4">
            {/* Título fijo del parque */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Parque Natural Nacional
            </h2>
            {/* Título dinámico que cambia según la imagen activa */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold">
            {events[currentImage].title}
            </h2>
        </div> 
      </div>

      {/* Carrusel de imagen única apaisada */}
      <div className="relative w-full max-w-4xl mx-auto aspect-video px-4">
        
        {/* Imagen principal apaisada */}
        <Image
          src={events[currentImage].image}
          alt="Evento"
          fill
          className="object-cover rounded-lg"
        />
        
        {/* Overlay oscuro para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
        
        {/* Botón para navegar a la imagen anterior */}
        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white text-4xl md:text-5xl">
          ‹
        </button>

        {/* Botón para navegar a la imagen siguiente */}
        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white text-4xl md:text-5xl">
          ›
        </button>
        
        {/* Descripción en la parte inferior de la imagen */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
          <p className="max-w-5xl mx-auto text-center text-sm md:text-base lg:text-lg text-white text-balance">
            {events[currentImage].description}
          </p>
        </div>

      </div>

    </section>
  );
}
