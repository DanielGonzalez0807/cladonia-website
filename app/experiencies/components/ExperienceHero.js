import Image from "next/image";
import Header from "./Header";

export default function ExperienceHero({ data, slug }) {
  return (
    <section className="relative h-screen w-screen overflow-hidden">

      {/* IMAGEN */}
      <Image
        src={data.hero.image}
        alt="Hero background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* HEADER (fixed, ya definido internamente) */}
      <Header />

      {/* CONTENIDO */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center pt-24">
        <div className="text-center max-w-7xl mx-auto px-6 pb-20 text-white">
          <h2 className="text-4xl md:text-6xl font-medium mb-4 tracking-widest drop-shadow-lg">
            {data.subtitle}
          </h2>

          <h1 className="text-8xl md:text-9xl font-bold leading-tight drop-shadow-lg">
            {data.title.split(" ").pop().toUpperCase()}
          </h1>

          <p className="mt-4 max-w-300 text-2xl drop-shadow-lg text-balance">
            {data.hero.hectares} hectáreas de páramo y bosque altoandino te esperan.
            Desde {data.hero.founded} protegiendo la biodiversidad de Colombia.
          </p>
        </div>
      </div>

    </section>
  );
}
