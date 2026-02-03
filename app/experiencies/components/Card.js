import Image from "next/image";
/**
 * Componente Card reutilizable para mostrar experiencias y actividades
 * Incluye imagen de fondo, título y descripción.
 */
export default function Card({ title, description, image }) {
    return (
        <div className="relative rounded-lg overflow-hidden w-full h-[calc(100vh-8rem)] md:h-[450px] lg:h-[520px] my-8 md:my-0">
            {/* Imagen de fondo de la tarjeta */}
            <Image 
                src={image} 
                alt={title}
                width={393}
                height={699}
                className="w-full h-full object-cover"
            />
            {/* Contenido superpuesto sobre la imagen */}
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col items-center justify-end bg-black/12">
                <div className="text-center text-white">
                    {/* Título de la experiencia */}
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
                    
                    {/* Descripción */}
                    <p className="mb-4 text-sm md:text-base text-balance">{description}</p>
                </div>
            </div>
        </div>
    )
}