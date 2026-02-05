import Image from "next/image";

export default function Contact() {
    return (
        <section className="relative w-screen min-h-160 text-gray-900 py-12 md:py-20 bg-white">  
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-16 md:mb-24">Contacto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 max-w-sm md:max-w-none mx-auto">
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                        <Image
                            src="/icons/whatsappLogo.svg"
                            alt="Icono de WhatsApp"
                            width={48}
                            height={48}
                            className="mx-auto mb-4 invert"
                        />
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">WhatsApp</h3>
                        <p className="text-gray-600 text-sm md:text-base">+57 300 123 4567</p>
                    </div>
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                        <Image
                            src="/icons/mail.svg"
                            alt="Icono de email"
                            width={48}
                            height={48}
                            className="mx-auto mb-4 invert"
                        />
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">Email</h3>
                        <p className="text-gray-600 text-sm md:text-base">info@cladonia.com</p>
                    </div>
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                        <Image
                            src="/icons/facebook.svg"
                            alt="Icono de Facebook"
                            width={48}
                            height={48}
                            className="mx-auto mb-4 invert"
                        />
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">Facebook</h3>
                        <p className="text-gray-600 text-sm md:text-base">@CladoniaTurismo</p>
                    </div>
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                        <Image
                            src="/icons/instagramLogo.svg"
                            alt="Icono de Instagram"
                            width={48}
                            height={48}
                            className="mx-auto mb-4 invert"
                        />
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">Instagram</h3>
                        <p className="text-gray-600 text-sm md:text-base">@cladonia_eco</p>
                    </div>
                </div>
            </div>
        </section>                          
    )
    
}