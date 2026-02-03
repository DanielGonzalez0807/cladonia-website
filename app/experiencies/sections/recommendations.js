import Image from "next/image";

export default function Recommendations() {
    return (
    <section className="relative w-full min-h-screen md:h-screen bg-[#EEE] p-4 md:p-8 xl:p-24">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mt-8 md:mt-12 text-black">
        Recomendaciones
        </h2>
        <div className="relative w-full max-w-7xl mx-auto h-[calc(100%-4rem)] md:h-[calc(100%-6rem)] p-4 md:p-6 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-2 w-full">
                <div className="bg-white p-4 md:py-6 md:px-4 xl:py-8 xl:px-6 rounded-lg text-center flex flex-col justify-center items-center">
                    <Image
                        src="/icons/recycle.svg"
                        alt="Icono de reciclaje para no usar plásticos"
                        width={48}
                        height={48}
                        className="mb-2"
                    />
                    <h3 className="text-base md:text-lg font-bold mb-2 text-black">No lleves plásticos ni desechables</h3>
                    <p className="text-gray-600 text-xs md:text-sm text-balance">Ayuda a conservar el ecosistema libre de contaminación.</p>
                </div>
                <div className="bg-white p-4 md:py-6 md:px-4 xl:py-8 xl:px-6 rounded-lg text-center flex flex-col justify-center items-center">
                    <Image
                        src="/icons/shoes.svg"
                        alt="Icono de zapatos deportivos para senderismo"
                        width={48}
                        height={48}
                        className="mb-2"
                    />
                    <h3 className="text-base md:text-lg font-bold mb-2 text-black">Usa calzado cómodo y resistente</h3>
                    <p className="text-gray-600 text-xs md:text-sm text-balance">Los senderos pueden ser irregulares y húmedos</p>
                </div>
                <div className="bg-white p-4 md:py-6 md:px-4 xl:py-8 xl:px-6 rounded-lg text-center flex flex-col justify-center items-center">
                    <Image
                        src="/icons/drop.svg"
                        alt="Icono de gota de agua para hidratación"
                        width={48}
                        height={48}
                        className="mb-2"
                    />
                    <h3 className="text-base md:text-lg font-bold mb-2 text-black">Hidrátate con tarro reutilizable</h3>
                    <p className="text-gray-600 text-xs md:text-sm text-balance">Preferiblemente evita botellas plásticas.</p>
                </div>
                <div className="bg-white p-4 md:py-6 md:px-4 xl:py-8 xl:px-6 rounded-lg text-center flex flex-col justify-center items-center">
                    <Image
                        src="/icons/plant.svg"
                        alt="Icono de planta para respeto a la naturaleza"
                        width={48}
                        height={48}
                        className="mb-2"
                    />
                    <h3 className="text-base md:text-lg font-bold mb-2 text-black">Respeta la naturaleza</h3>
                    <p className="text-gray-600 text-xs md:text-sm text-balance">No extraer plantas ni molestar animales.</p>
                </div>
            </div>
        </div>        

    </section>
    );
}