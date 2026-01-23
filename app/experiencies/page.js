import Hero_exp from "@/app/experiencies/components/Hero_exp";
import Bridge from "@/components/ui/Bridge";
import Bridge_reserv from "@/components/ui/Bridge_reserv";
import About from "@/app/experiencies/sections/About";
import Activities from "./sections/Activities";
import Map from "./sections/Map";
import Recommendations from "./sections/recommendations";
import Experiencies from "@/app/experiencies/sections/Experiencies";

export default function ExperiencesPage() {
    return (
        <main>
            <Hero_exp />
            <Bridge text="Conoce este mágico lugar" />
            <About />
            <Bridge_reserv text="Obtén más información de este lugar" />
            <Activities />
            <Bridge text="Explora tu próxima aventura!" />
            <Map />
            <Recommendations />
            <Bridge_reserv text="¿Que esperas para vivir esta experiencia?" />
            <Experiencies />
        </main>
    ); 
}