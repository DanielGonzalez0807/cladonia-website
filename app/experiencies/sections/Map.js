"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faPersonHiking, faMountain, faMapLocationDot, faLeaf, faDove, faPaw, faAward, faDroplet, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { experiences } from "@/data/experiences";

export default function Map({ data = experiences.chingaza }) {
    return (
        <section className="relative w-full min-h-screen flex flex-col text-black justify-center items-center px-6 py-12 bg-white">
            <div className="w-full max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    Detalles de la Aventura
                </h2>
                
                {/* Grid de métricas del recorrido */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                            <FontAwesomeIcon icon={faRoute} style={{width: '32px', height: '32px'}} className="mr-3 text-green-600" />
                            <h3 className="text-xl font-bold text-gray-900">Distancia Total</h3>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Progreso del sendero</span>
                                <span>8.2 km</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full" style={{width: '75%'}}></div>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{data.map.distance}</p>
                        <p className="text-sm text-gray-600">Duración: {data.map.duration}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                            <FontAwesomeIcon icon={faPersonHiking} style={{width: '32px', height: '32px'}} className="mr-3 text-orange-600" />
                            <h3 className="text-xl font-bold text-gray-900">Nivel de Dificultad</h3>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="flex space-x-1">
                                <div className="w-4 h-8 bg-green-500 rounded"></div>
                                <div className="w-4 h-8 bg-yellow-500 rounded"></div>
                                <div className="w-4 h-8 bg-orange-500 rounded"></div>
                                <div className="w-4 h-8 bg-gray-300 rounded"></div>
                                <div className="w-4 h-8 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{data.map.difficulty}</p>
                        <p className="text-sm text-gray-600">Senderos irregulares</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                            <FontAwesomeIcon icon={faMountain} style={{width: '32px', height: '32px'}} className="mr-3 text-blue-600" />
                            <h3 className="text-xl font-bold text-gray-900">Elevación</h3>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Ganancia de altura</span>
                                <span>+450m</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full" style={{width: '60%'}}></div>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{data.map.elevation}</p>
                        <p className="text-sm text-gray-600">Altitud máxima</p>
                    </div>
                </div>

                {/* Grid de datos oficiales del parque */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                            <FontAwesomeIcon icon={faMapLocationDot} style={{width: '32px', height: '32px'}} className="mr-3 text-green-600" />
                            <h3 className="text-xl font-bold text-gray-900">Extensión del Parque</h3>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-green-600 mb-2">{data.map.hectares}</p>
                            <p className="text-sm text-gray-600">Hectáreas protegidas</p>
                            <p className="text-xs text-gray-500 mt-2">Declarado en 1977</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                            <FontAwesomeIcon icon={faLeaf} style={{width: '32px', height: '32px'}} className="mr-3 text-green-600" />
                            <h3 className="text-xl font-bold text-gray-900">Biodiversidad</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Especies de aves</span>
                                <span className="text-lg font-bold text-yellow-600">{data.map.birdSpecies}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Especies de plantas</span>
                                <span className="text-lg font-bold text-green-600">{data.map.plantSpecies}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Mamíferos</span>
                                <span className="text-lg font-bold text-blue-600">{data.map.mammals}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ecosistemas y reconocimientos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Ecosistemas */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Ecosistemas Principales</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-800">Bosque altoandino y subandino</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-800">Páramo</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-800">Humedales altoandinos</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-800">Complejo lacustre (40+ lagos)</span>
                            </div>
                        </div>
                    </div>

                    {/* Reconocimientos */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Reconocimientos</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-800">Área de Importancia para Aves (AICA)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-800">Sitio Ramsar por humedales</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-800">Lista Verde de la UICN</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-800">Declarado en 1977</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fauna destacada */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Fauna Emblemática</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-brown-100 p-4 rounded-full mb-3">
                                <FontAwesomeIcon icon={faPaw} style={{width: '32px', height: '32px'}} className="text-brown-600" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Oso Andino</p>
                            <p className="text-xs text-gray-600">Especie emblemática</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-gray-100 p-4 rounded-full mb-3">
                                <FontAwesomeIcon icon={faDove} style={{width: '32px', height: '32px'}} className="text-gray-600" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Cóndor Andino</p>
                            <p className="text-xs text-gray-600">Ave nacional</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-yellow-100 p-4 rounded-full mb-3">
                                <FontAwesomeIcon icon={faSeedling} style={{width: '32px', height: '32px'}} className="text-yellow-600" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Frailejones</p>
                            <p className="text-xs text-gray-600">Flora característica</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-100 p-4 rounded-full mb-3">
                                <FontAwesomeIcon icon={faDroplet} style={{width: '32px', height: '32px'}} className="text-blue-600" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Lagos Glaciares</p>
                            <p className="text-xs text-gray-600">Lagunas de Siecha</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}