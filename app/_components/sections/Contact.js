import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faWhatsapp, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Contact() {
    return (
        <section className="relative w-screen min-h-160 text-gray-900 py-12 md:py-20 bg-white">  
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-16 md:mb-24">Contacto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-xs md:max-w-200 mx-auto">
                    <a href="https://wa.me/573163081869" target="blank" rel="noopener noreferrer">
                        <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                            <FontAwesomeIcon icon={faWhatsapp} style={{width: '42px', height: '42px'}} className="w-9 h-9 mx-auto mb-4 block"/>
                            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">WhatsApp</h3>
                            <p className="text-gray-600 text-sm md:text-base font-semibold">+57 316 308 1869</p>
                        </div>
                    </a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@cladonia.org&su=&body=&tf=1" target="blank" rel="noopener noreferrer">
                        <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                            
                            <FontAwesomeIcon icon={faEnvelope} style={{width: '42px', height: '42px'}} className="w-9 h-9 mx-auto mb-4 block"/>
                            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">Email</h3>
                            <p className="text-gray-600 text-sm md:text-base font-semibold">info@cladonia.org</p>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/cladonia_org?utm_source=qr&igsh=MWU4Nmc2NDRzOXNrdA==" target="blank">
                        <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                            <FontAwesomeIcon icon={faInstagram} style={{width: '42px', height: '42px'}} className="w-9 h-9 mx-auto mb-4 block"/>
                            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">Instagram</h3>
                            <p className="text-gray-600 text-sm md:text-base font-semibold">@cladonia_org</p>
                        </div>
                    </a>
                    
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center items center shadow-gray-300 shadow-lg">
                        <FontAwesomeIcon icon={faFacebookF} style={{width: '42px', height: '42px'}} className="w-9 h-9 mx-auto mb-4 block"/>
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">Facebook</h3>
                        <p className="text-gray-600 text-sm md:text-base font-semibold">Cladonia_Org</p>
                    </div>
    
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                        <FontAwesomeIcon icon={faYoutube} style={{width: '42px', height: '42px'}} className="w-9 h-9 mx-auto mb-4 block"/>
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">Youtube</h3>
                        <p className="text-gray-600 text-sm md:text-base font-semibold">@cladonia_org</p>
                    </div>
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg">
                        <FontAwesomeIcon icon={faTiktok} style={{width: '42px', height: '42px'}} className="w-9 h-9 mx-auto mb-4 block"/>
                        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-900">TikTok</h3>
                        <p className="text-gray-600 text-sm md:text-base font-semibold">@cladonia_org</p>
                    </div>
                </div>
            </div>
        </section>                          
    )
    
}