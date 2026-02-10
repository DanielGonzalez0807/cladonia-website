import Link from "next/link";

export default function BridgeReservePdf({ text, slug }) {
    return (
        <section className="relative h-100 w-screen overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-0.5 w-full absolute flex justify-center items-center mb-12" style={{backgroundColor: '#F7F7F7'}}></div>
                <div className="py-2 px-12 z-50 bg-white">   
                    <p className="text-center text-1xl font-medium text-gray-900">
                        {text}
                    </p>
                </div>
                <div className="flex gap-4 mt-4">
                    <Link
                    href={`/form?experience=${slug}`}
                    className="bg-yellow-400 text-black px-16 py-1 rounded-full text-sm font-bold hover:bg-yellow-500 transition">
                    Reservar
                    </Link>
                    <button
                    className="bg-gray-800 text-white px-12 py-1 rounded-full text-sm font-bold hover:bg-gray-700 transition">
                    Descargar PDF
                    </button>
                </div>
            </div>
        </section>
    )
}