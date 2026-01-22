
export default function Bridge({ text }) {
    return (
        <section className="relative h-100 w-screen overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-0.5 w-full absolute flex justify-center items-center bg-white/10"></div>
                <div className="px-12 bg-black z-10">   
                    <p className="text-center text-xl font-medium">
                        {text}
                    </p>
                </div>
            </div>
        </section>
    )
}
