import Link from "next/link";
import Image from "next/image";
import ReserveBtn from "./Reserve_btn";

/**
 * Componente Card reutilizable para mostrar experiencias
 * Incluye imagen de fondo, título, descripción y enlaces de navegación
 */
export default function Card({ title, description, image }) {
    return (
        <div className="relative rounded-lg overflow-hidden w-98.25 h-174.75 hover:animate-float">
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
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    
                    {/* Descripción con enlace para ver más */}
                    <p className="mb-4 text-sm">{description}
                        <Link href="/experiencies" className="text-white text-lg font-extrabold ml-1">
                            ...ver más
                        </Link>
                    </p>
                </div>
                
                {/* Botón de reserva */}
                <ReserveBtn />
            </div>
        </div>
    )
}