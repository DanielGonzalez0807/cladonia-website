"use client";
import Image from "next/image";
import { trails } from "@/data/trails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faPersonHiking, faMountain } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import  TrailModal from "@/app/_components/ui/TrailModal"


export default function Trails() {
    const [selectedTrail, setSelectedTrail] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (trail) => {
    setSelectedTrail(trail);
    setIsOpen(true);
    };

    const closeModal = () => {
    setIsOpen(false);
    setSelectedTrail(null);
    };
    return (
        <section className="relative w-full py-12 md:py-20 bg-white">  
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">Senderos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trails.map((trail) => (
                        <div key={trail.id} className="flex flex-col">
                            {/* Imagen del sendero */}
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg mb-4 cursor-pointer"onClick={() => openModal(trail)}>
                                <Image 
                                    src={trail.image} 
                                    alt={trail.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end">
                                    <h3 className="text-white text-xl font-bold p-4">{trail.name}</h3>
                                </div>
                            </div>

                            {/* Cajitas de información debajo */}
                            <div className="flex gap-2">
                                <div className="bg-white rounded-lg p-3 shadow-lg flex-1">
                                    <div className="flex flex-col items-center">
                                        <FontAwesomeIcon icon={faRoute} style={{width: '20px', height: '20px'}} className="mb-2 text-gray-800" />
                                        <p className="text-xs font-bold text-gray-900 mb-1">Distancia</p>
                                        <p className="text-sm font-bold text-gray-600">{trail.distance}</p>
                                        <p className="mt-1 text-xs font-bold text-gray-400">{trail.time}</p>
                                    </div>
                                </div>

                                <div className={`rounded-lg p-3 shadow-lg flex-1 text-sm font-bold ${trail.difficultyColor}`}>
                                    <div className="flex flex-col items-center">
                                        <FontAwesomeIcon icon={faPersonHiking} style={{width: '20px', height: '20px'}} className="mb-2 text-gray-800" />
                                        <p className="text-xs font-bold text-gray-900 mb-1">Dificultad</p>
                                        <p className={`text-sm font-bold ${trail.difficultyColor}`}>{trail.difficulty}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-3 shadow-lg flex-1">
                                    <div className="flex flex-col items-center">
                                        <FontAwesomeIcon icon={faMountain} style={{width: '20px', height: '20px'}} className="mb-2 text-gray-800" />
                                        <p className="text-xs font-bold text-gray-900 mb-1">Altitud Max.</p>
                                        <p className="text-sm font-bold text-gray-600">{trail.elevation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <TrailModal
            isOpen={isOpen}
            onClose={closeModal}
            trail={selectedTrail}
            />

        </section>                          
    )
}
