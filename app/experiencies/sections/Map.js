import Image from "next/image";

export default function Map() {
    return (
        <section className="relative w-full min-h-screen bg-[#EEE] flex flex-col text-black justify-between">
            <h2 className="text-3xl font-semibold text-center mb-2 px-4">
            Mapa del Recorrido
            </h2>
            <div className="relative max-w-300 w-md h-8 bg-amber-400 flex mb-6" >
                <nav className="relative max-w-300 bg-amber-400 flex"></nav>
            </div>

            
            <div className=" relative bottom-0 max-w-360 h-1/2 flex justify-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 aspect-video ">
                <Image
                    src="/images/map.png"
                    alt="Mapa del Parque Natural Nacional Chingaza"
                    fill
                    className=" object-cover object-bottom"
                />
            </div>
        </section>
    );

}