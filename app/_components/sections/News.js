"use client";

import { trails } from "@/data/trails";
import { topPlanDates } from "@/data/topPlanDates";
import { useMemo } from "react";
import { formatDateColombian } from "@/lib/dateUtils";
import { motion } from "framer-motion";

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
        const next = topPlanDates[key]
          ? getNextDate(topPlanDates[key])
          : null;

        const dates = topPlanDates[key] || [];

        return { ...trail, nextDate: next, allDates: dates };
      })
      .filter((t) => t.nextDate);
  }, []);

  return (
    <section className="relative w-screen min-h-600px py-14 md:py-24 bg-linear-to-b from-white via-gray-50 to-white overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/bridge-img.png')" }}>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">

        {/* Título */}
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-14 md:mb-20">
          Próximas salidas disponibles
        </h2>

        {/* Contenedor tarjetas */}
        <div
          className="
          flex md:grid
          md:grid-cols-2 lg:grid-cols-3
          gap-6 md:gap-8 lg:gap-12
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory
          pb-4
        "
        >
          {trailInfo.map((trail) => (
            <div
              key={trail.id}
              className="
              relative
              p-5 md:p-6
              rounded-2xl
              aspect-video
              flex flex-col
              justify-between
              overflow-hidden
              group
              snap-center
              min-w-[85%] md:min-w-0
              cursor-pointer

              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
              hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)]

              transition-all duration-500
              hover:scale-[1.02]
              "
              style={{
                backgroundImage: `url(${trail.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay gradiente */}
              <div
                className="
                absolute inset-0
                bg-linear-to-t
                from-black/80
                via-black/40
                to-black/10
                "
              ></div>

              {/* Hover highlight */}
              <div
                className="
                absolute inset-0
                bg-white/0
                group-hover:bg-white/5
                transition
                "
              ></div>

              {/* Contenido */}
              <div className="relative z-10 flex flex-col justify-between h-full">

                <h3
                  className="
                  text-white
                  text-lg md:text-xl
                  font-semibold
                  tracking-wide
                  drop-shadow-lg
                  "
                >
                  {trail.name}
                </h3>

                {trail.nextDate ? (
                  <div
                    className="
                    self-start
                    px-4 py-2
                    rounded-full
                    bg-white/15
                    backdrop-blur-md
                    border border-white/20
                    shadow-lg
                    "
                  >
                    <p className="text-white text-sm font-medium">
                      Próx. fecha:{" "}
                      {formatDateColombian(trail.nextDate.date, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ) : (
                  <p className="text-white text-sm font-medium">
                    Sin fechas disponibles
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
