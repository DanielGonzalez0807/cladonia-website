"use client";

import Image from "next/image";
import { trails } from "@/data/trails";
import { topPlanDates } from "@/data/topPlanDates";
import { useMemo } from "react";
import { formatDateColombian } from "@/lib/dateUtils";

function getNextDate(dates) {
  const today = new Date();
  const upcoming = dates
    .map((d) => ({ ...d, dateObj: new Date(d.date) }))
    .filter((d) => d.dateObj >= today && d.disponibles > 0)
    .sort((a, b) => a.dateObj - b.dateObj);
  return upcoming.length ? upcoming[0] : null;
}

export default function News() {
  const trailInfo = useMemo(() => {
    return trails
      .map((trail) => {
        const key = `sendero_${trail.id}`;
        const next = topPlanDates[key] ? getNextDate(topPlanDates[key]) : null;
        const dates = topPlanDates[key] || [];
        return { ...trail, nextDate: next, allDates: dates };
      })
      .filter((t) => t.nextDate);
  }, []);

  return (
    <section className="relative w-screen min-h-160 text-gray-900 py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-16 md:mb-24">
          Próximas salidas disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 max-w-sm md:max-w-none mx-auto">
          {trailInfo.map((trail) => (
            <div
              key={trail.id}
              className="relative p-4 md:p-6 rounded-lg aspect-square flex flex-col justify-center shadow-gray-300 shadow-lg overflow-hidden"
              style={{
                backgroundImage: `url(${trail.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-white text-lg md:text-xl font-bold mb-1 md:mb-2">
                  {trail.name}
                </h3>
                <p className="text-yellow-200 text-xs mb-2">
                  Fechas: {trail.allDates.map(d=> formatDateColombian(d.date, {day:'numeric',month:'short'})).join(', ')}
                </p>
                {trail.nextDate ? (
                  <p className="text-white text-lg font-semibold">
                    Próx. fecha: {formatDateColombian(trail.nextDate.date, { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                ) : (
                  <p className="text-white text-lg font-semibold">Sin fechas disponibles</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
