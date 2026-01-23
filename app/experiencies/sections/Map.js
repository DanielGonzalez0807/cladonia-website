import Image from "next/image";

export default function Map() {
    return (
        <section className="relative w-full min-h-screen bg-[#EEE] flex flex-col text-black justify-between items-center">
            <div className="mt-36 ">
                <h2 className="text-4xl font-semibold text-center mb-2 px-4">
                Mapa del Recorrido
                </h2>
                <div className="relative w-full md:w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 lg:gap-2 px-6 py-4 mb-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 w-full">
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-3 py-1">
                             <Image
                             src="/icons/mountains.svg"
                             alt="books icon"
                             width={32}
                             height={32}
                             className="w-9.5 h-9.5 object-contain mx-2"
                             />
                             <p className="relative text-center text-balance font-bold">Meditación Ancestral</p>
                        </div>
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-3 py-1">
                             <Image
                             src="/icons/prismatics.svg"
                             alt="books icon"
                             width={32}
                             height={32}
                             className="w-8.5 h-8.5 object-contain mx-2"
                             />
                             <p className="relative text-center text-balance font-bold">Ojo de la Montaña</p>
                        </div>
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-3 py-1">
                             <Image
                             src="/icons/bird.svg"
                             alt="books icon"
                             width={32}
                             height={32}
                             className="w-8 h-8 object-contain mx-2"
                             />
                             <p className="relative text-center text-balance font-bold">Avistamiento de aves</p>
                        </div>
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-3 py-1">
                             <Image
                             src="/icons/flower.svg"
                             alt="books icon"
                             width={32}
                             height={32}
                             className="w-8 h-8 object-contain mx-2"
                             />
                             <p className="relative text-center text-balance font-bold">Conexión Natural</p>
                        </div>
                        <div className="relative w-auto flex flex-row items-center justify-center rounded-full border-2 border-black px-3 py-1">
                             <Image
                             src="/icons/books.svg"
                             alt="books icon"
                             width={32}
                             height={32}
                             className="w-8 h-8 object-contain mx-2"
                             />
                             <p className="relative text-center text-balance font-bold">Memoria Viva</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div className="relative w-full md:aspect-video xl:w-340 aspect-video">
                <Image
                    src="/images/map.png"
                    alt="Mapa del Parque Natural Nacional Chingaza"
                    fill
                    className="object-contain"
                />
                <div className="absolute top-8 md:top-4 left-6 md:left-8 lg:left-24 xl:left-40 xl:top-16 2xl:left-44 text-center">
                    <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-black px-4 mb-2">Distancia aprox.</h2>
                    <div className="flex flex-row items-baseline justify-center">
                        <h2 className="text-6xl md:text-4xl lg:text-8xl font-bold text-black">8</h2>
                        <p className="text-2xl md:text-xl lg:text-2xl font-semibold text-black px-1">km</p>
                    </div>
                </div>
            </div>
        </section>
    );

}