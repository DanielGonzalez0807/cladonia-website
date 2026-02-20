import Image from "next/image";

export default function About({ data }) {
  const events = data.about;

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 text-gray-900 bg-white">
      
      <div className="text-center mb-12 md:mb-20 px-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-600 mb-2 md:mb-4">
          {data.subtitle}
        </h2>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          {data.title}
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {events.map((item, index) => (
          <div key={index} className="mb-12 md:mb-20 lg:mb-24 last:mb-0">
            <div className="md:hidden">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                <Image
                  src={item.image}
                  alt="{item.title}"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-base leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </div>
            </div>
            
            <div className={`hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 items-center`}>
              <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={item.image}
                    alt="{item.title}"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Contenido - orden cambia según el índice */}
              <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">{item.title}</h3>
                <p className="text-base lg:text-lg xl:text-xl leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}