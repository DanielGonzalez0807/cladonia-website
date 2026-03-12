import Image from 'next/image';
import Header from "@/app/_components/ui/Header";

export default function ExperienceHero({ data, slug }) {
  return (
    <section className="relative h-[80vh] w-screen overflow-hidden">
      <Image
        src="/images/og-image.jpg"
        alt="Hero background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* overlay para mejorar contraste */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/10" />

      {/* HEADER */}
      <Header />

      {/* CONTENIDO */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center pt-20 md:pt-24">
        <div className="text-center max-w-5xl mx-auto px-6 text-white">
          <h2 className="text-lg md:text-3xl lg:text-4xl font-medium mb-3 md:mb-4 tracking-widest drop-shadow-lg">
            {data.subtitle}
          </h2>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold leading-tight drop-shadow-lg">
            {data.title.split(' ').pop().toUpperCase()}
          </h1>

          <p className="mt-4 max-w-xl md:max-w-4xl mx-auto text-base md:text-xl lg:text-2xl drop-shadow-lg text-balance mb-16">
            {data.hero.hectares} hectáreas de páramo y bosque altoandino te
            esperan.
            <br></br>
            Desde {data.hero.founded} protegiendo la biodiversidad de Colombia.
          </p>
        </div>
      </div>
    </section>
  );
}
