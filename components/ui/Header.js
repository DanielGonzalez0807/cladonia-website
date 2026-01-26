import Link from "next/link";
import Image from "next/image";
import ReserveBtn from "./Reserve_btn";

/**
 * Componente Header fijo para navegación principal
 * Incluye logo clickeable, título centrado y botón de reserva
 */
export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="relative mx-auto max-w-au px-6 py-4 flex items-center justify-between bg-(--bg-header) backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
            
            {/* Logo clickeable que redirige al inicio */}
            <Link href="/" className="invert">
                    <Image src="/logo.svg" alt="Cladonia Logo" width={40} height={40} priority/>
            </Link>
            
            {/* Título principal centrado */}
            <Image
                src="/tipografia.svg"
                alt="Nombre del proyecto"
                width={200} height={40}
                className="absolute left-1/2 -translate-x-1/2 object-cover invert"
            />

            {/* Botón de acción principal */}
            <ReserveBtn />

            </nav>   
        </header>    
    );
}