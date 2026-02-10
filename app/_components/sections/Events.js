import Image from "next/image";
import { events } from "@/data/events";
import EventReserveButton from "../ui/EventReserveButton";

export default function Events() {
  return (
    <section className="relative w-full text-gray-900 bg-white">
      
      <div className="text-center mb-12 md:mb-24 px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Eventos Programados
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {events.map((event, index) => (
          <div key={event.id} className="mb-12 md:mb-20 lg:mb-24 last:mb-0">
            <div className="md:hidden">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{event.date}</p>
                <p className="text-sm text-gray-600 mb-4">{event.cuposDisponibles} de {event.totalCupos} cupos disponibles</p>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  {event.description}
                </p>
                <EventReserveButton eventId={event.id} cuposDisponibles={event.cuposDisponibles} />
              </div>
            </div>
            
            <div className={`hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 items-center`}>
              <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">{event.title}</h3>
                <p className="text-lg text-gray-600 mb-2">{event.date}</p>
                <p className="text-lg text-gray-600 mb-4">{event.cuposDisponibles} de {event.totalCupos} cupos disponibles</p>
                <p className="text-base lg:text-lg xl:text-xl leading-relaxed text-gray-700 mb-6">
                  {event.description}
                </p>
                <EventReserveButton eventId={event.id} cuposDisponibles={event.cuposDisponibles} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}