// Importación de secciones principales del sitio
import Hero from "@/sections/Hero";
import Header from "@/components/ui/Header";
import Bridge from "@/components/ui/Bridge";
import Experiencies from "@/sections/Experiencies";
import Events from "@/sections/Events";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Bridge_reserv from "@/components/ui/Bridge_reserv";

/**
 * Página principal del sitio web Cladonia
 * Estructura completa con todas las secciones y elementos de transición
 */
export default function Home() {
  return (
      <main>
          {/* Navegación principal fija */}
          <Header />
          <Header />
          
          {/* Sección hero con video de fondo */}
          <Hero />
          
          {/* Elemento de transición hacia experiencias */}
          <Bridge text="Conoce lo que hacemos" />  
          
          {/* Sección de experiencias disponibles */}
          <Experiencies />
          
          {/* Transición hacia eventos */}
          <Bridge text="Vive experiencias únicas" />
          
          {/* Sección de eventos programados */}
          <Events />
          
          {/* Transición hacia información corporativa */}
          <Bridge text="Descubre quienes somos" />
          
          {/* Sección sobre la empresa */}
          <About />
          
          {/* Transición hacia contacto */}
          <Bridge text="Contacta con nosotros" />
          
          {/* Sección de información de contacto */}
          <Contact />
          
          {/* Llamada final a la acción */}
          <Bridge_reserv text="Comienza tu próxima aventura" />
      </main>
  );
}
