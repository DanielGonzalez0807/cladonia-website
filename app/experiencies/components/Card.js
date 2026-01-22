import Image from "next/image";
/**
 * Componente Card reutilizable para mostrar experiencias y actividades
 * Incluye imagen de fondo, título y descripción.
 */
export default function Card({ title, description, image }) {
    return (
        <div className="relative rounded-lg overflow-hidden w-98.25 h-174.75">
            {/* Imagen de fondo de la tarjeta */}
            <Image 
                src={image} 
                alt={title}
                width={393}
                height={699}
                className="w-full h-174.75 object-cover"
            />
            {/* Contenido superpuesto sobre la imagen */}
            <div className="absolute inset-0 p-6 flex flex-col items-center justify-end">
                <div className="text-center text-white">
                    {/* Título de la experiencia */}
                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                    
                    {/* Descripción */}
                    <p className="mb-4 text-m">{description}</p>
                </div>
            </div>
        </div>
    )
}