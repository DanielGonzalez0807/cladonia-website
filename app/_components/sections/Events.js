"use client";
import Image from "next/image";
import { useEvents } from "@/hooks/useEvents";
import EventReserveButton from "../ui/EventReserveButton";

export default function Events() {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <section className="relative w-full text-gray-900 bg-white py-12">
        <div className="text-center">
          <p className="text-gray-600">Cargando eventos...</p>
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return (
      <section className="relative w-full text-gray-900 bg-white py-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Eventos Programados
          </h2>
          <p className="text-gray-600">No hay eventos disponibles en este momento.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="relative w-full text-gray-900 bg-white">
      
      <div className="text-center mb-12 md:mb-24 px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Eventos Programados
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {events.map((event, index) => (
          <div key={event.id} className="mb-16 md:mb-24 lg:mb-32 last:mb-0">
            {/* Mobile */}
            <div className="md:hidden">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{event.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Información</h4>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">Fecha:</span> {new Date(event.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })}</p>
                    <p className="text-sm"><span className="font-semibold">Cupos:</span> <span className="text-xl font-bold">{event.cuposDisponibles}</span>/{event.totalCupos}</p>
                    <p className="text-sm"><span className="font-semibold">Precio:</span> <span className="text-xl font-bold">${event.precio?.toLocaleString('es-CO')}</span></p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Horario</h4>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">Salida:</span> {event.horaPartida}</p>
                    <p className="text-sm"><span className="font-semibold">Regreso:</span> {event.horaRegreso}</p>
                    <p className="text-xs text-gray-600 mt-2">{event.lugarPartida}</p>
                  </div>
                </div>
              </div>
              
              {event.itinerarioDescripcion && (
                <div className="mb-6">
                  <h4 className="text-base font-bold text-gray-900 mb-2">Itinerario</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{event.itinerarioDescripcion}</p>
                </div>
              )}
              
              {event.incluye && event.incluye.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Incluye:</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.incluye.map((item, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{item}</span>
                    ))}
                  </div>
                </div>
              )}
              
              <EventReserveButton eventId={event.id} cuposDisponibles={event.cuposDisponibles} />
            </div>
            
            {/* Desktop */}
            <div className={`hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 items-center`}>
              <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                  <Image src={event.image} alt={event.title} fill className="object-cover" />
                </div>
              </div>

              <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{event.title}</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Información</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-semibold">Fecha:</span> {new Date(event.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <p className="text-sm"><span className="font-semibold">Cupos disponibles:</span> <span className="text-xl font-bold text-gray-900">{event.cuposDisponibles}</span>/{event.totalCupos}</p>
                      <p className="text-sm"><span className="font-semibold">Precio:</span> <span className="text-xl font-bold text-gray-900">${event.precio?.toLocaleString('es-CO')}</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Horario</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-semibold">Salida:</span> {event.horaPartida}</p>
                      <p className="text-sm"><span className="font-semibold">Regreso:</span> {event.horaRegreso}</p>
                      <p className="text-xs text-gray-600 mt-2">{event.lugarPartida}</p>
                    </div>
                  </div>
                </div>
                
                {event.itinerarioDescripcion && (
                  <div className="mb-5">
                    <h4 className="text-base font-bold text-gray-900 mb-2">Itinerario</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{event.itinerarioDescripcion}</p>
                  </div>
                )}
                
                {event.incluye && event.incluye.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Incluye:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.incluye.map((item, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                <EventReserveButton eventId={event.id} cuposDisponibles={event.cuposDisponibles} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}