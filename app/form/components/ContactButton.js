"use client";

export default function ContactButton() {
    return (
        <a
            href="mailto:info@cladonia.org?subject=Consulta%20sobre%20nuestras%20experiencias&body=Hola%20Cladonia,%0A%0AMe%20gustaría%20obtener%20más%20información%20sobre%20tus%20experiencias.%0A%0nSaludos"
            className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-500 transition cursor-pointer inline-block"
        >
            Contáctanos
        </a>
    );
}
