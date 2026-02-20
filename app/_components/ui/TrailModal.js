"use client";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faPersonHiking, faMountain } from "@fortawesome/free-solid-svg-icons";
import ReserveButton from "./ReserveButton";

export default function TrailModal({ isOpen, onClose, trail }) {
  if (!trail) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Contenedor centrado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">

          {/* Header con imagen (no scrollea) */}
          <div className="relative h-48 md:h-56 shrink-0">
            <Image
              src={trail.image}
              alt={trail.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end">
              <Dialog.Title className="text-white text-2xl md:text-3xl font-bold p-6">
                {trail.name}
              </Dialog.Title>
            </div>
          </div>

          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-10">

            {/* Datos técnicos */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 text-center border-b pb-2">

              <div>
                <FontAwesomeIcon icon={faRoute} className="text-gray-600 mb-3" />
                <p className="font-semibold text-gray-900">Distancia</p>
                <p className="text-sm font-medium text-gray-600">{trail.distance}</p>
                <p className="text-sm text-gray-500">{trail.time}</p>
              </div>

              <div>
                <FontAwesomeIcon icon={faPersonHiking} className="text-gray-600 mb-3" />
                <p className="font-semibold text-gray-900">Dificultad</p>
                <p className={`text-sm font-semibold ${trail.difficultyColor}`}>
                  {trail.difficulty}
                </p>
              </div>

              <div>
                <FontAwesomeIcon icon={faMountain} className="text-gray-600 mb-3" />
                <p className="font-semibold text-gray-900">Altitud Máx.</p>
                <p className="text-sm font-medium text-gray-600">{trail.elevation}</p>
              </div>

            </div>

            {/* Descripción */}
            {trail.description && (
              <div className="space-y-4 text-left">

                {trail.description.intro && (
                  <p className="text-gray-700 leading-relaxed">
                    {trail.description.intro}
                  </p>
                )}

                {trail.description.itinerary && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">
                      Itinerario
                    </h3>
                    <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
                      {trail.description.itinerary.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {trail.description.notes && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">
                      Notas
                    </h3>
                    <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
                      {trail.description.notes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Galería */}
              {trail.description?.images && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Galería
                  </h3>

                  {/* 📱 Carrusel SOLO móvil */}
                  <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-2 no-scrollbar">
                    {trail.description.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative min-w-[85%] snap-center rounded-lg overflow-hidden aspect-3/4"
                      >
                        <Image
                          src={img}
                          alt={`${trail.name} ${index + 1}`}
                          fill
                          sizes="85vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 💻 Grid SOLO desktop */}
                  <div className="hidden md:grid md:grid-cols-3 gap-4">
                    {trail.description.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden aspect-3/4"
                      >
                        <Image
                          src={img}
                          alt={`${trail.name} ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              </div>
            )}

          </div>

          {/* Footer fijo */}
          <div className="shrink-0 p-2 border-t bg-white flex justify-between">

            <button
              onClick={onClose}
              className="bg-gray-300 px-6 py-2 rounded-full font-semibold hover:bg-gray-400 transition"
            >
              Cerrar
            </button>
            <div className="scale-90 md:scale-100">
              <ReserveButton />
            </div>
          </div>

        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
