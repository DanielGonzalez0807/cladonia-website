export default function Hero() {
  return (
    <section className="relative h-screen w-screen overflow-hidden">
      
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute h-full w-full object-cover object-center"
        src="/video/hero-video.mp4"
      />

      {/* Con overlay */}
      
      


      {/* CONTENIDO */}
      <div className="relative z-10 h-full flex items-end justify-center">
        <div className="absolute bg-linear-b from-black/50 to-black/80 w-full h-full" />
        <div className="text-center max-w-7xl mx-auto px-6 pb-10 text-white">
          <h1 className="text-3xl md:text-5xl font-black italic leading-tight text-white drop-shadow-md drop-shadow-black">
            EXPLORA RESERVAS NATURALES
          </h1>
          <p className="mt-4 max-w-1200px text-xl font-semibold text-white drop-shadow-md drop-shadow-black">
            Ven a conocer los más increíbles ecosistemas en la alta montaña en compañía de guías expertos.
          </p>
        </div>
      </div>

    </section>
  );
}
