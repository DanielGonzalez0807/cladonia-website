import Link from "next/link";

export default function Bridge_reserv({ text }) {
    return (
        <section className="relative h-100 w-screen overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="h-0.5 w-full absolute flex justify-center items-center bg-white/10"></div>
                <div className="py-2 px-12 bg-black z-50">   
                    <p className="text-center text-1xl font-medium">
                        {text}
                    </p>
                </div>
                <Link
                href="/form"
                className="bg-yellow-400 text-black px-16 py-1 rounded-full text-sm font-bold hover:bg-yellow-500 transition">
                Reservar
                </Link>
            </div>
        </section>
    )
}
