import Link from "next/link";
import Image from "next/image";
import ReserveButton from "./ReserveButton";

export default function Card({ title, description, image, slug = "chingaza" }) {
    return (
        <div className="relative rounded-lg overflow-hidden w-full h-[calc(100vh-8rem)] md:h-112.5 lg:h-130 my-8 md:my-0 hover:animate-float">
            {/* Imagen de fondo de la tarjeta */}
            <Image 
                src={image} 
                alt={title}
                width={393}
                height={699}
                className="w-full h-full object-cover"
            />
            
            {/* Contenido superpuesto sobre la imagen */}
            <Link href={`/experiencies/${slug}`}>
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col items-center justify-end">
                    <div className="text-center text-white">
                        {/* Título de la experiencia */}
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
                        
                        {/* Descripción con enlace para ver más */}
                        <p className="mb-4 text-sm md:text-base">{description}
                            
                        </p>
                    </div>
                
                    <div className="scale-75 md:scale-90 lg:scale-100">
                        <ReserveButton slug={slug} />
                    </div>
                </div>
            </Link>    
        </div>
    )
}