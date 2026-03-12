import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faWhatsapp, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Contact() {
    return (
        <section id="contacto" className="relative w-screen min-h-160 text-gray-900 py-16 md:py-24 bg-white overflow-hidden">  

            {/* fondo decorativo */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-700px h-700px bg-green-100/40 blur-3xl rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-16 md:mb-24">
                    Contacto
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-xs md:max-w-200 mx-auto">

                    <a href="https://wa.me/573163081869" target="blank" rel="noopener noreferrer">
                        <div className="group bg-white/70 backdrop-blur-md p-6 rounded-xl text-center aspect-square flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] cursor-pointer">
                            <FontAwesomeIcon icon={faWhatsapp} style={{width: '42px', height: '42px'}} className="w-10 h-10 mx-auto mb-5 text-green-600 transition-transform duration-500 group-hover:scale-110"/>
                            <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">WhatsApp</h3>
                            <p className="text-gray-600 text-sm md:text-base font-semibold">+57 316 308 1869</p>
                        </div>
                    </a>

                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@cladonia.org&su=&body=&tf=1" target="blank" rel="noopener noreferrer">
                        <div className="group bg-white/70 backdrop-blur-md p-6 rounded-xl text-center aspect-square flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] cursor-pointer">
                            <FontAwesomeIcon icon={faEnvelope} style={{width: '42px', height: '42px'}} className="w-10 h-10 mx-auto mb-5 text-gray-700 transition-transform duration-500 group-hover:scale-110"/>
                            <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">Email</h3>
                            <p className="text-gray-600 text-sm md:text-base font-semibold">info@cladonia.org</p>
                        </div>
                    </a>

                    <a href="https://www.instagram.com/cladonia_org?utm_source=qr&igsh=MWU4Nmc2NDRzOXNrdA==" target="blank">
                        <div className="group bg-white/70 backdrop-blur-md p-6 rounded-xl text-center aspect-square flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] cursor-pointer">
                            <FontAwesomeIcon icon={faInstagram} style={{width: '42px', height: '42px'}} className="w-10 h-10 mx-auto mb-5 text-pink-500 transition-transform duration-500 group-hover:scale-110"/>
                            <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">Instagram</h3>
                            <p className="text-gray-600 text-sm md:text-base font-semibold">@cladonia_org</p>
                        </div>
                    </a>

                    <div className="group bg-white/70 backdrop-blur-md p-6 rounded-xl text-center aspect-square flex flex-col justify-center items-center shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] cursor-pointer">
                        <FontAwesomeIcon icon={faFacebookF} style={{width: '42px', height: '42px'}} className="w-10 h-10 mx-auto mb-5 text-blue-600 transition-transform duration-500 group-hover:scale-110"/>
                        <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">Facebook</h3>
                        <p className="text-gray-600 text-sm md:text-base font-semibold">Cladonia_Org</p>
                    </div>

                    <div className="group bg-white/70 backdrop-blur-md p-6 rounded-xl text-center aspect-square flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] cursor-pointer">
                        <FontAwesomeIcon icon={faYoutube} style={{width: '42px', height: '42px'}} className="w-10 h-10 mx-auto mb-5 text-red-600 transition-transform duration-500 group-hover:scale-110"/>
                        <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">Youtube</h3>
                        <p className="text-gray-600 text-sm md:text-base font-semibold">@cladonia_org</p>
                    </div>

                    <div className="group bg-white/70 backdrop-blur-md p-6 rounded-xl text-center aspect-square flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] cursor-pointer">
                        <FontAwesomeIcon icon={faTiktok} style={{width: '42px', height: '42px'}} className="w-10 h-10 mx-auto mb-5 text-black transition-transform duration-500 group-hover:scale-110"/>
                        <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">TikTok</h3>
                        <p className="text-gray-600 text-sm md:text-base font-semibold">@cladonia_org</p>
                    </div>

                </div>
            </div>
        </section>                          
    )
}
