"use client";
import Image from "next/image";
import { useState } from "react";

/**
 * Componente About para la página de experiencias
 * Muestra información del Parque Nacional Chingaza con carrusel side-to-side
 */
export default function About() {
  // Estado para controlar qué imagen está activa en el carrusel
  const [currentImage, setCurrentImage] = useState(0);
  
  // Datos de las diferentes experiencias disponibles
  const events = [
    {
      image: "/images/exp_1.png",
      title: "CHINGAZA",
      description: "Hogar de 531 especies de aves y más de 1,400 especies de plantas. Desde frailejones centenarios hasta el majestuoso oso andino, cada paso revela la riqueza biológica de los Andes."
    },
    {
      image: "/images/img_1.png",
      title: "CHINGAZA",
      description: "Explora 40 lagos de origen glaciar en un rango altitudinal de 800 a 4,000 metros. Las lagunas de Siecha y los humedales altoandinos te conectan con la historia geológica de Colombia."
    },
    {
      image: "/images/img_3.png",
      title: "CHINGAZA",
      description: "Reconocido internacionalmente como Sitio Ramsar y Área de Importancia para la Conservación de las Aves. Un ecosistema vital que regula el ciclo del agua para millones de colombianos."
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

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center text-gray-900 py-8 bg-white">
      
      {/* Sección del título principal */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center space-y-4">
            {/* Título fijo del parque */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            Parque Natural Nacional
            </h2>
            {/* Título dinámico que cambia según la imagen activa */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-16 font-bold text-gray-900">
            {events[currentImage].title}
            </h2>
        </div> 
      </div>

      {/* Layout más amplio */}
      <div className="relative w-full max-w-7xl mx-auto px-4">
        
        {/* Layout móvil: foto arriba, texto abajo */}
        <div className="md:hidden">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={events[currentImage].image}
              alt="Evento"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Flechas móvil */}
          <div className="flex justify-center gap-8 mb-4">
            <button onClick={prevImage} className="text-gray-900/50 hover:text-gray-900 text-3xl">
              ‹
            </button>
            <button onClick={nextImage} className="text-gray-900/50 hover:text-gray-900 text-3xl">
              ›
            </button>
          </div>
          
          {/* Texto móvil */}
          <div className="px-4">
            <p className="text-base leading-relaxed text-gray-800 text-center">
              {events[currentImage].description}
            </p>
          </div>
        </div>
        
        {/* Layout desktop side-to-side más amplio */}
        <div className="hidden md:flex items-center gap-12">
          
          {/* Flecha izquierda */}
          <button onClick={prevImage} className="text-gray-900/50 hover:text-gray-900 text-5xl lg:text-6xl z-20 shrink-0">
            ‹
          </button>

          {/* Imagen lado izquierdo */}
          <div className="relative w-1/2 aspect-video rounded-lg overflow-hidden">
            <Image
              src={events[currentImage].image}
              alt="Evento"
              fill
              className="object-cover"
            />
          </div>

          {/* Información lado derecho */}
          <div className="w-1/2 flex flex-col justify-center px-4">
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-800">
              {events[currentImage].description}
            </p>
          </div>

          {/* Flecha derecha */}
          <button onClick={nextImage} className="text-gray-900/50 hover:text-gray-900 text-5xl lg:text-6xl z-20 shrink-0">
            ›
          </button>

        </div>

      </div>

    </section>
  );
}