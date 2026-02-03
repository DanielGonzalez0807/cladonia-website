"use client";
import Image from "next/image";
import { useState } from "react";
import ReserveBtn from "../components/ui/Reserve_btn";

export default function Events() {
  const [currentImage, setCurrentImage] = useState(0);
  const events = [
    {
      image: "/images/img_1.png",
      title: "Caminata Ancestral",
      date: "Próximo 16 de marzo",
      cupos: "12 cupos disponibles",
      description: "Recorre senderos milenarios siguiendo las huellas de nuestros ancestros. Descubre petroglifos, plantas medicinales y la sabiduría de los pueblos originarios en una experiencia transformadora."
    },
    {
      image: "/images/img_2.png",
      title: "Tarde de Meditación",
      date: "Próximo 23 de marzo",
      cupos: "8 cupos disponibles",
      description: "Encuentra la paz interior en medio de la naturaleza. Sesión de meditación guiada junto a cascadas naturales, respiración consciente y conexión profunda con el entorno."
    },
    {
      image: "/images/img_3.png",
      title: "Observación Nocturna",
      date: "Próximo 30 de marzo",
      cupos: "15 cupos disponibles",
      description: "Explora la vida nocturna del bosque bajo un cielo estrellado. Avista fauna nocturna, escucha los sonidos de la noche y aprende sobre astronomía en un ambiente mágico."
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % events.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + events.length) % events.length);
  };

  const getPrevIndex = () => (currentImage - 1 + events.length) % events.length;
  const getNextIndex = () => (currentImage + 1) % events.length;
  return (
    <section className="top-0 relative w-full bg-black py-8 md:py-12 text-white">
      
      {/* TITULO */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
        Eventos Programados
        </h2>
      </div>

      {/* SLIDER DESKTOP - CARRUSEL MÓVIL */}
      <div className="relative w-full px-4 md:px-0">
        
        {/* Carrusel móvil */}
        <div className="md:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {events.map((event, index) => (
            <div key={index} className="relative min-w-full aspect-video rounded-lg overflow-hidden snap-start">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute top-4 left-4 right-4 text-white text-center">
                <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                <p className="text-sm opacity-90">{event.date}</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-bold">{event.cupos}</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <ReserveBtn />
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider tablet y desktop */}
        <div className="hidden md:flex items-center justify-center max-w-6xl mx-auto">
          
          {/* Flecha izquierda */}
          <button onClick={prevImage} className="absolute left-2 md:left-6 z-20 text-white/30 hover:text-white/60 text-4xl md:text-6xl">
            ‹
          </button>

          {/* IMAGEN ANTERIOR */}
          <div className="relative w-1/4 aspect-video rounded-lg overflow-hidden opacity-60">
            <Image
              src={events[getPrevIndex()].image}
              alt="Imagen anterior"
              fill
              className="object-cover"
            />
          </div>

          {/* IMAGEN PRINCIPAL */}
          <div className="relative w-1/2 aspect-video rounded-xl overflow-hidden shadow-xl z-10 mx-2 md:mx-4">
            <Image
              src={events[currentImage].image}
              alt="Evento"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Información del evento */}
            <div className="absolute top-4 left-4 right-4 text-white text-center">
              <h3 className="text-lg md:text-xl font-bold mb-1">{events[currentImage].title}</h3>
              <p className="text-sm md:text-base opacity-90">{events[currentImage].date}</p>
            </div>
            
            {/* Cupos disponibles */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-bold">{events[currentImage].cupos}</p>
            </div>

            {/* BOTÓN */}
            <div className="absolute bottom-4 right-4">
              <ReserveBtn />
            </div>
          </div>

          {/* IMAGEN SIGUIENTE */}
          <div className="relative w-1/4 aspect-video rounded-lg overflow-hidden opacity-60">
            <Image
              src={events[getNextIndex()].image}
              alt="Imagen siguiente"
              fill
              className="object-cover"
            />
          </div>

          {/* Flecha derecha */}
          <button onClick={nextImage} className="absolute right-2 md:right-6 z-20 text-white/30 hover:text-white/60 text-4xl md:text-6xl">
            ›
          </button>

        </div>

      </div>

      {/* DESCRIPCIÓN */}
      <p className="mt-6 md:mt-10 max-w-2xl mx-auto text-center text-xs md:text-sm lg:text-base text-white/70 px-4">
        {events[currentImage].description}
      </p>

    </section>
  );
}
