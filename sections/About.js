"use client";
import Image from "next/image";

export default function About() {
    return (
        <section className="relative w-screen min-h-screen bg-black text-white py-12 md:py-20">  
            {/* TÍTULO */}
            <h2 className="text-2xl md:text-4xl font-medium text-center mb-12 md:mb-16">C L A D O N I A</h2>
            
            {/* CONTENIDO */}
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-6 md:gap-8 lg:gap-32 px-4 md:px-6">
                {/* TEXTO IZQUIERDA */}
                <div className="w-full lg:w-full">
                    <p className="text-justify text-sm md:text-base lg:text-lg leading-relaxed">
                        En Cladonia, somos apasionados por la naturaleza y las aventuras al aire libre.
                        Nuestra misión es ofrecer experiencias únicas que conecten a las personas con el entorno natural.
                        <br /><br />Fundada por un grupo de entusiastas del senderismo y la exploración, Cladonia se dedica a organizar excursiones,
                        talleres y eventos que promueven la conservación y el respeto por la naturaleza.
                        <br /><br />Nuestro propósito es ofrecer experiencias de conexión con la naturaleza a través de recorridos guiados, observación de fauna y programas de educación ambiental. 
                    </p>
                </div>
                
                {/* BENTO GRID DERECHA - CARRUSEL EN MÓVIL */}
                <div className="w-full">
                    {/* Carrusel móvil y tablet */}
                    <div className="lg:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                        <div className="relative min-w-full h-48 md:h-64 rounded-lg overflow-hidden snap-start">
                            <Image src="/images/img_1.png" alt="Paisaje natural del Parque Chingaza" fill className="object-cover"/>
                        </div>
                        <div className="relative min-w-full h-48 md:h-64 rounded-lg overflow-hidden snap-start">
                            <Image src="/images/img_2.png" alt="Senderos ecológicos en reserva natural" fill className="object-cover"/>
                        </div>
                        <div className="relative min-w-full h-48 md:h-64 rounded-lg overflow-hidden snap-start">
                            <Image src="/images/img_3.png" alt="Flora y fauna en tour fotográfico" fill className="object-cover"/>
                        </div>
                    </div>
                    
                    {/* Bento Grid desktop */}
                    <div className="hidden lg:grid grid-cols-5 grid-rows-4 gap-2 h-96">
                        <div className="relative rounded-lg bg-black overflow-hidden row-span-2"></div>
                         <div className="relative rounded-lg overflow-hidden row-span-2">
                            <Image src="/images/img_1.png" alt="Paisaje natural del Parque Chingaza" fill className="object-cover"/>
                        </div>
                        <div className="relative rounded-lg overflow-hidden col-span-2">
                            <Image src="/images/img_2.png" alt="Senderos ecológicos en reserva natural" fill className="object-cover"/>
                        </div>
                        <div className="relative rounded-lg bg-black overflow-hidden row-span-1"></div>
                        <div className="relative rounded-lg overflow-hidden row-span-2">
                            <Image src="/images/img_3.png" alt="Flora y fauna en tour fotográfico" fill className="object-cover"/>
                        </div>
                        <div className="relative rounded-lg overflow-hidden col-span-2">
                            <Image src="/images/img_3.png" alt="Flora y fauna en tour fotográfico" fill className="object-cover"/>
                        </div>
                        
                        <div className="relative rounded-lg overflow-hidden col-span-2">
                            <Image src="/images/img_3.png" alt="Flora y fauna en tour fotográfico" fill className="object-cover"/>
                        </div>
                        <div className="relative rounded-lg overflow-hidden row-span-2">
                            <Image src="/images/img_3.png" alt="Flora y fauna en tour fotográfico" fill className="object-cover"/>
                        </div>
                        <div className="relative rounded-lg bg-black overflow-hidden row-span-2"></div>
                        <div className="relative rounded-lg bg-black overflow-hidden row-span-2"></div>
                        <div className="relative rounded-lg overflow-hidden col-span-2">
                            <Image src="/images/img_2.png" alt="Senderos ecológicos en reserva natural" fill className="object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>                          
    )
    
}