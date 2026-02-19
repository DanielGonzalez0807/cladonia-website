"use client";
import Image from "next/image";

export default function AboutService() {
    return (
        <section className="relative w-screen min-h-screen text-gray-900 py-12 md:py-20 bg-white">  
            {/* TÍTULO */}
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-12 md:mb-16">Nuestros Servicios</h2>
            
            {/* CONTENIDO */}
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-6 md:gap-8 lg:gap-32 px-4 md:px-6">
                {/* TEXTO IZQUIERDA */}
                <div className="w-full lg:w-full">
                    <p className="text-justify text-sm md:text-base lg:text-lg leading-relaxed text-gray-800">
                        Experiencias en ecosistemas únicos de alta montaña para grupos privados y viajes organizados, que inspiran una relación respetuosa con el ambiente y motivan un estilo de vida integralmente saludable.<br />
                        <br />
                        Cladonia diseña y ejecuta experiencias guiadas en ecosistemas de montaña tropical, integrando senderismo interpretativo, observación de flora y fauna y recorridos fotográficos especializados. Cada actividad se planifica bajo criterios técnicos de seguridad, gestión de riesgos y mínimo impacto ambiental, con acompañamiento profesional que garantiza una experiencia formativa y responsable.<br />
                        <br />
                        Asimismo, desarrolla programas de educación ambiental dirigidos a instituciones, organizaciones y grupos privados, mediante metodologías de aprendizaje experiencial en campo. Estos espacios fortalecen la cultura de conservación, la comprensión ecológica del territorio y la adopción de prácticas sostenibles.<br />
                        <br />
                        Finalmente, ofrece experiencias privadas y viajes organizados con logística integral, incluyendo diseño de ruta, coordinación operativa y gestión de permisos. Su propuesta de valor se centra en experiencias estructuradas que combinan bienestar, educación y conexión consciente con la naturaleza, manteniendo altos estándares de calidad y sostenibilidad. 
                    </p>
                </div>
                
            </div>
        </section>                          
    )
    
    //Experiencias en ecosistemas únicos de montañas tropicales para grupos privados y viajes organizados, que inspiran una relación respetuosa con el ambiente y motivan un estilo de vida integralmente saludable.
}