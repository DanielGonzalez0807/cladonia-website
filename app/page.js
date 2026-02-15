import Hero from "@/app/_components/sections/Hero";
import Header from "@/app/_components/ui/Header";
import Bridge from "@/app/_components/ui/Bridge";
import Experiencies from "@/app/_components/sections/Experiencies";
import Events from "@/app/_components/sections/Events";
import About from "@/app/_components/sections/About";
import Contact from "@/app/_components/sections/Contact";
import BridgeReserve from "@/app/_components/ui/BridgeReserve";
import News from "./_components/sections/News";

export default function Home() {
  return (
      <main>
          <Header />
          <Hero />
          <News />
          <Events />
          <Bridge text="Vive experiencias únicas" />
          <Experiencies />
          <Bridge text="Descubre quienes somos" />
          <About />
          <Bridge text="Contacta con nosotros" />
          <Contact />
          <BridgeReserve text="Comienza tu próxima aventura" />
      </main>
  );
}
