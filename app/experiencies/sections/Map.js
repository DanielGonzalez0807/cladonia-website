import Image from "next/image";

export default function Map() {
    return (
        <section className="relative w-full min-h-screen bg-[#F7F7F7] flex flex-col text-black justify-between items-center">
            <div className="mt-24 md:mt-36">
                <h2 className="text-2xl md:text-4xl font-semibold text-center mb-4 md:mb-2 px-4">
                Mapa del Recorrido
                </h2>
                <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 md:gap-2 lg:gap-2 px-4 md:px-6 py-4 mb-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-2 lg:gap-4 w-full max-w-5xl">
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-2 md:px-3 py-1">
                             <Image
                             src="/icons/mountains.svg"
                             alt="mountains icon"
                             width={24}
                             height={24}
                             className="md:w-8 md:h-8 object-contain mx-1 md:mx-2"
                             />
                             <p className="relative text-center text-balance font-bold text-xs md:text-sm lg:text-base">Meditación Ancestral</p>
                        </div>
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-2 md:px-3 py-1">
                             <Image
                             src="/icons/prismatics.svg"
                             alt="prismatics icon"
                             width={24}
                             height={24}
                             className="md:w-8 md:h-8 object-contain mx-1 md:mx-2"
                             />
                             <p className="relative text-center text-balance font-bold text-xs md:text-sm lg:text-base">Ojo de la Montaña</p>
                        </div>
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-2 md:px-3 py-1">
                             <Image
                             src="/icons/bird.svg"
                             alt="bird icon"
                             width={24}
                             height={24}
                             className="md:w-8 md:h-8 object-contain mx-1 md:mx-2"
                             />
                             <p className="relative text-center text-balance font-bold text-xs md:text-sm lg:text-base">Avistamiento de aves</p>
                        </div>
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-2 md:px-3 py-1">
                             <Image
                             src="/icons/flower.svg"
                             alt="flower icon"
                             width={24}
                             height={24}
                             className="md:w-8 md:h-8 object-contain mx-1 md:mx-2"
                             />
                             <p className="relative text-center text-balance font-bold text-xs md:text-sm lg:text-base">Conexión Natural</p>
                        </div>
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-2 md:px-3 py-1">
                             <Image
                             src="/icons/books.svg"
                             alt="books icon"
                             width={24}
                             height={24}
                             className="md:w-8 md:h-8 object-contain mx-1 md:mx-2"
                             />
                             <p className="relative text-center text-balance font-bold text-xs md:text-sm lg:text-base">Memoria Viva</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="relative w-full aspect-video max-w-7xl">
                <Image
                    src="/images/map.png"
                    alt="Mapa del Parque Natural Nacional Chingaza"
                    fill
                    className="object-contain"
                />
                <div className="absolute top-4 md:top-8 left-4 md:left-8 lg:left-16 xl:left-24 text-center">
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-black px-2 md:px-4 mb-1 md:mb-2">Distancia aprox.</h2>
                    <div className="flex flex-row items-baseline justify-center">
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-black">8</h2>
                        <p className="text-lg md:text-2xl lg:text-2xl font-semibold text-black px-1">km</p>
                    </div>
                </div>
            </div>
        </section>
    );

}