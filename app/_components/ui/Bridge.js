export default function Bridge({ text }) {
    return (
        <section className="relative h-100 w-screen overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-1 w-full absolute flex justify-center items-center" style={{backgroundColor: '#F7F7F7'}}></div>
                <div className="px-12 z-10" style={{backgroundColor: '#FFF'}}>   
                    <p className="text-center text-xl font-medium text-gray-900">
                        {text}
                    </p>
                </div>
            </div>
        </section>
    )
}