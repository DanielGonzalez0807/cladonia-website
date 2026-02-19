'use client';
import { useState, useMemo, useEffect } from 'react';
import { dynamicOptions } from '@/data/dynamicOptions';
import { guideRates } from '@/data/guideRates';

export default function DynamicPlan({ 
  plans, 
  activities, 
  selectedActivity, 
  selectedPlan,
  childrenCount, 
  adults, 
  seniors, 
  foreigners, 
  formatPrice,
  watch,
  onOptionsChange
}) {

  const parkEntryRates = { exempt: 0, student: 24500, adult: 29000, foreigner: 78500 };

  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    if (onOptionsChange) {
      onOptionsChange({
        selectedTransport,
        selectedMeals,
        selectedGuide
      });
    }
  }, [selectedTransport, selectedMeals, selectedGuide, onOptionsChange]);

  const toggleMeal = (mealId) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) ? prev.filter(id => id !== mealId) : [...prev, mealId]
    );
  };

  const childrenCountNum = parseInt(childrenCount) || 0;
  const adultsCount = parseInt(adults) || 0;
  const seniorsCount = parseInt(seniors) || 0;
  const foreignersCount = parseInt(foreigners) || 0;

  const totalVisitors =
    childrenCountNum +
    adultsCount +
    seniorsCount +
    foreignersCount;

  const insurancePerPerson = 10000;

  // ===============================
  // 🧭 GUÍA BÁSICO AUTOMÁTICO
  // ===============================
  const guideRate = selectedActivity? (guideRates[selectedActivity] || 0) : 0;

  const guidesRequired =
    totalVisitors > 0 ? Math.ceil(totalVisitors / 10) : 0;

  const totalGuideCost =
    guidesRequired * guideRate;

  const exemptEntry = seniorsCount * parkEntryRates.exempt;
  const studentEntry = childrenCountNum * parkEntryRates.student;
  const adultEntry = adultsCount * parkEntryRates.adult;
  const foreignerEntry = foreignersCount * parkEntryRates.foreigner;

  const exemptInsurance = seniorsCount * insurancePerPerson;
  const studentInsurance = childrenCountNum * insurancePerPerson;
  const adultInsurance = adultsCount * insurancePerPerson;
  const foreignerInsurance = foreignersCount * insurancePerPerson;

  const dynamicTotal = useMemo(() => {
    if (totalVisitors === 0) return 0;

    let total = 0;

    const totalEntry =
      exemptEntry +
      studentEntry +
      adultEntry +
      foreignerEntry;

    const totalInsurance =
      exemptInsurance +
      studentInsurance +
      adultInsurance +
      foreignerInsurance;

    total += totalEntry + totalInsurance;

    // ✅ Guía básico automático SIEMPRE se suma
    total += totalGuideCost;

    // Transporte
    if (selectedTransport) {
      const transport = dynamicOptions.transport.find(
        t => t.id === selectedTransport
      );
      if (transport) {
        total += transport.price;
      }
    }

    // Comidas
    selectedMeals.forEach(mealId => {
      const meal = dynamicOptions.meals.find(m => m.id === mealId);
      if (meal) {
        total += meal.price * totalVisitors;
      }
    });

    // Guía especializado (precio fijo adicional)
    if (selectedGuide) {
      const guide = dynamicOptions.guides.find(
        g => g.id === selectedGuide
      );
      if (guide) {
        total += guide.price;
      }
    }

    return total;

  }, [
    totalVisitors,
    exemptEntry,
    studentEntry,
    adultEntry,
    foreignerEntry,
    exemptInsurance,
    studentInsurance,
    adultInsurance,
    foreignerInsurance,
    selectedTransport,
    selectedMeals,
    selectedGuide,
    totalGuideCost
  ]);

    const formatThousandsK = (value) => {
  if (!value) return "0K";
  return `${Math.round(value / 1000)}K`;
};

  return (
    <div className="mt-6 p-6 bg-gray-800/60 border-2 border-yellow-400 rounded-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h4 className="text-3xl font-bold text-white">
            {plans[selectedPlan].name}
          </h4>
          <p className="text-yellow-400 text-xl font-bold">
            {plans[selectedPlan].subtitle}
          </p>
        </div>
        <div className="text-right bg-gray-700/50 border border-gray-600 px-3 py-2 rounded">
          <p className="text-yellow-400 font-bold text-xs mb-1">Fecha</p>
          <p className="text-white font-bold text-base">
            {watch('date')
              ? new Date(watch('date')).toLocaleDateString('es-CO')
              : 'No seleccionada'}
          </p>
        </div>
      </div>

      {/* Destino y Sendero */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-gray-700/50 border border-gray-600 p-2 rounded text-center">
          <span className="text-white text-xs block mb-1">Destino</span>
          <span className="text-white font-semibold text-sm">
            PNN CHINGAZA
          </span>
        </div>
        <div className="bg-gray-700/50 border border-gray-600 p-2 rounded text-center">
          <span className="text-white text-xs block mb-1">Sendero</span>
          <span className="text-white font-semibold text-sm">
            {activities['PNN CHINGAZA'].find(a => a.value === selectedActivity)?.label}
          </span>
        </div>
      </div>

      {/* Tarifas de entrada */}
      <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5">
        <p className="text-white font-semibold mb-3">
          Tarifas de entrada al parque
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-xs mb-1">
              Exento
            </p>
            <p className="text-green-500 font-bold text-lg">
              Gratis
            </p>
          </div>

          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-xs mb-1">
              Estudiantes
            </p>
            <p className="text-white font-bold text-lg">
              $24.5K
            </p>
          </div>

          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-xs mb-1">
              Adultos
            </p>
            <p className="text-white font-bold text-lg">
              $29K
            </p>
          </div>

          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-xs mb-1">
              Extranjeros
            </p>
            <p className="text-white font-bold text-lg">
              $78.5K
            </p>
          </div>

        </div>
      </div>

      <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5 flex flex-row justify-between items-center">
        <div>
          <span className="text-yellow-400 font-bold text-sm block mb-1">Póliza x persona</span>
        </div>
        <div>
          <span className="text-white font-bold text-2xl">$10K</span>
        </div>
      </div>

      {/* Desglose por visitante */}
      {totalVisitors > 0 && (
        <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5">
          <p className="text-white font-semibold mb-3 text-center">Desglose por tipo de visitante</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {seniorsCount > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
                <p className="text-yellow-400 font-bold text-sm mb-1">Exentos x{seniorsCount}</p>
                <p className="text-white font-bold text-xl mb-1">${exemptEntry.toLocaleString()}</p>
                <p className="text-white font-semibold text-xs">+ Póliza ${exemptInsurance.toLocaleString()}</p>
              </div>
            )}
            {childrenCountNum > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
                <p className="text-yellow-400 font-bold text-sm mb-1">Estudiantes x{childrenCountNum}</p>
                <p className="text-white font-bold text-xl mb-1">${studentEntry.toLocaleString()}</p>
                <p className="text-white font-semibold text-xs">+ Póliza ${studentInsurance.toLocaleString()}</p>
              </div>
            )}
            {adultsCount > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
                <p className="text-yellow-400 font-bold text-sm mb-1">Adultos x{adultsCount}</p>
                <p className="text-white font-bold text-xl mb-1">${adultEntry.toLocaleString()}</p>
                <p className="text-white font-semibold text-xs">+ Póliza ${adultInsurance.toLocaleString()}</p>
              </div>
            )}
            {foreignersCount > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
                <p className="text-yellow-400 font-bold text-sm mb-1">Extranjeros x{foreignersCount}</p>
                <p className="text-white font-bold text-xl mb-1">${foreignerEntry.toLocaleString()}</p>
                <p className="text-white font-semibold text-xs">+ Póliza ${foreignerInsurance.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      )}


      {totalVisitors > 0 && (
        <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5 flex flex-row justify-between items-center">
          <div>
            <span className="text-yellow-400 font-bold text-lg block mb-1">
              Guía Básico
            </span>
            <p className="text-white text-sm font-bold">
              1 x cada 10 visitantes
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-white font-bold text-2xl">
              {formatThousandsK(totalGuideCost)}
            </span>

            {guidesRequired > 1 && (
              <p className="text-yellow-400 text-sm mt-1 font-bold">
                {guidesRequired} guías requeridos
              </p>
            )}
          </div>
        </div>
      )}

      
      {/* Personaliza tu experiencia */}
      <div className="bg-blue-500/10 border border-blue-400 p-5 rounded mb-5">
        <p className="text-white text-xl font-bold mb-4 text-center">Personaliza tu Experiencia
        </p>

        {/* Transporte */}
        <div className="mb-4">
          <p className="text-white font-semibold mb-2">
            Transporte (opcional)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dynamicOptions.transport.map(transport => (
              <div
                key={transport.id}
                onClick={() =>
                  setSelectedTransport(
                    selectedTransport === transport.id
                      ? null
                      : transport.id
                  )
                }
                className={`bg-gray-800/60 border-2 p-3 rounded cursor-pointer hover:border-blue-400 transition-colors ${
                  selectedTransport === transport.id
                    ? 'border-blue-400'
                    : 'border-gray-600'
                }`}
              >
                <p className="text-white font-bold text-sm mb-1">
                  {selectedTransport === transport.id ? '✅' : '⬜'}{' '}
                  {transport.label}
                </p>
                <p className="text-yellow-400 font-bold text-base">
                  {formatPrice(transport.price)}
                </p>
                <p className="text-white text-xs">por grupo</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comidas */}
        <div className="mb-4">
          <p className="text-white font-semibold mb-2">
            Alimentación (puedes seleccionar varias)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dynamicOptions.meals.map(meal => (
              <div
                key={meal.id}
                onClick={() => toggleMeal(meal.id)}
                className={`bg-gray-800/60 border-2 p-3 rounded cursor-pointer hover:border-blue-400 transition-colors ${
                  selectedMeals.includes(meal.id)
                    ? 'border-blue-400'
                    : 'border-gray-600'
                }`}
              >
                <p className="text-white font-bold text-sm mb-1">
                  {selectedMeals.includes(meal.id) ? '✅' : '⬜'}{' '}
                  {meal.label}
                </p>
                <p className="text-yellow-400 font-bold text-base">
                  {formatPrice(meal.price)}
                </p>
                <p className="text-white text-xs">por persona</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guías */}
        <div>
          <p className="text-white font-semibold mb-2">
            Guía Especializado (opcional)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dynamicOptions.guides.map(guide => (
              <div
                key={guide.id}
                onClick={() =>
                  setSelectedGuide(
                    selectedGuide === guide.id ? null : guide.id
                  )
                }
                className={`bg-gray-800/60 border-2 p-3 rounded cursor-pointer hover:border-blue-400 transition-colors ${
                  selectedGuide === guide.id
                    ? 'border-blue-400'
                    : 'border-gray-600'
                }`}
              >
                <p className="text-white font-bold text-sm mb-1">
                  {selectedGuide === guide.id ? '✅' : '⬜'}{' '}
                  {guide.label}
                </p>
                <p className="text-yellow-400 font-bold text-base">
                  {formatPrice(guide.price)}
                </p>
                <p className="text-white text-xs">precio fijo</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen extras */}
      {(selectedTransport || selectedMeals.length > 0 || selectedGuide) && (
        <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5">
          <p className="text-white font-semibold mb-3">
            Servicios adicionales seleccionados
          </p>
          <div className="space-y-2">

            {/* Transporte */}
            {selectedTransport && (() => {
              const transport = dynamicOptions.transport.find(
                t => t.id === selectedTransport
              );
              return transport ? (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white">
                    🚐 {transport.label}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {formatPrice(transport.price)}
                  </span>
                </div>
              ) : null;
            })()}

            {/* Meals */}
            {selectedMeals.map(mealId => {
              const meal = dynamicOptions.meals.find(m => m.id === mealId);
              return meal ? (
                <div
                  key={mealId}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-white">
                    🍽️ {meal.label} x{totalVisitors}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {formatPrice(meal.price * totalVisitors)}
                  </span>
                </div>
              ) : null;
            })}

            {/* Guide */}
            {selectedGuide && (() => {
              const guide = dynamicOptions.guides.find(
                g => g.id === selectedGuide
              );
              return guide ? (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white">
                👨‍🏫 {guide.label} x{guidesRequired}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {formatPrice(totalGuideCost)}
                  </span>

                </div>
              ) : null;
            })()}

          </div>
        </div>
      )}

      {/* TOTAL FINAL */}
      {totalVisitors > 0 && (
        <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">
                Total Plan Dinámico
              </p>
              <p className="text-white text-sm">
                {totalVisitors} visitante{totalVisitors !== 1 ? 's' : ''}
              </p>
            </div>
            <p className="text-yellow-400 font-bold text-4xl">
              {formatPrice(dynamicTotal)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
