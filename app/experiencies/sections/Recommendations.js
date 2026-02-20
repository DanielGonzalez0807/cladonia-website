export default function Recommendations() {
    return (
    <section className="relative w-full py-12 md:py-16 xl:py-20 bg-white">
        <h2 className="text-2xl md:text-4xl font-bold text-center mt-8 md:mt-12 text-gray-900 mb-12">
        Recomendaciones para tu Visita
        </h2>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
            
            {/* Destacado especial - Guía obligatorio */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">⚠️</span>
                    <h3 className="text-xl font-bold text-gray-900">IMPORTANTE</h3>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                    Es <strong>OBLIGATORIO</strong> contar con un guía o intérprete avalado para ingresar al parque
                </p>
            </div>

            {/* Grid de dos columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Columna izquierda - Requisitos */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Requisitos Previos</h3>
                        </div>
                        <ul className="space-y-3 text-gray-800">
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">✓</span>
                                <span><strong>Reserva:</strong> Lo gestionamos por tí, sin costo adicional.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">✓</span>
                                <span><strong>Seguro:</strong> Lo incluimos en tu experiencia</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">✓</span>
                                <span><strong>Guía certificado:</strong> Cuentas con nosotros</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2 mt-1">✓</span>
                                <span><strong>Inducción audiovisual:</strong> Antes de ingresar</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Qué Llevar</h3>
                        </div>
                        <ul className="space-y-3 text-gray-800">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                <span><strong>Botas antideslizantes</strong> para senderos</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                <span><strong>Ropa abrigada</strong> e impermeable</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                <span><strong>Protector solar</strong> y gorra</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                <span><strong>Ropa y calzado de cambio</strong> recomendado</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                <span><strong>Hidratación</strong> en termo</span>
                            </li>
                            <li>
                                <p>

                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Columna derecha - Prohibiciones y Seguridad */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Buen comportamiento ambiental</h3>
                        </div>
                        <ul className="space-y-3 text-gray-800">
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2 mt-1">✗</span>
                                <span><strong>Plásticos desechables</strong></span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2 mt-1">✗</span>
                                <span><strong>Plásticos desechables</strong></span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2 mt-1">✗</span>
                                <span><strong>Mascotas</strong></span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2 mt-1">✗</span>
                                <span><strong>Tocar o alimentar animales</strong></span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2 mt-1">✗</span>
                                <span><strong>Drones y vehículos</strong></span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2 mt-1">✗</span>
                                <span><strong>Alcohol y sustancias</strong></span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-600 mr-2 mt-1">✗</span>
                                <span><strong>Fogatas y armas</strong></span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Seguridad</h3>
                        </div>
                        <ul className="space-y-3 text-gray-800">
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 mt-1">!</span>
                                <span><strong>Un sector por día:</strong> Distancias largas</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 mt-1">!</span>
                                <span><strong>Velocidad máxima:</strong> 40 km/h con luces</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 mt-1">!</span>
                                <span><strong>Condición física:</strong> Requerida para caminatas</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 mt-1">!</span>
                                <span><strong>Centros médicos:</strong> La Calera y Guasca</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 mt-1">!</span>
                                <span><strong>No dejar basura:</strong> Llevar todo contigo</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>        

    </section>
    );
}