"use client";

export default function ContactButton() {
    const handleClick = () => {
        const subject = encodeURIComponent("Consulta sobre nuestras experiencias");
        const body = encodeURIComponent(`Hola Cladonia,

Me gustaría obtener más información sobre tus experiencias.

Saludos`);

        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=info@cladonia.org&su=${subject}&body=${body}&tf=1`;

        window.open(
            url,
            "GmailCompose",
            "width=600,height=600,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes"
        );
    };

    return (
        <button
            onClick={handleClick}
            className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-500 transition cursor-pointer"
        >
            Contáctanos
        </button>
    );
}
