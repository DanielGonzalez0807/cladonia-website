'use client';
import { useState, useMemo, useEffect } from 'react';
import { dynamicOptions } from '@/data/dynamicOptions';

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

  // Notificar cambios al componente padre
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

  const childrenParsed = parseInt(childrenCount) || 0;
  const adultsParsed = parseInt(adults) || 0;
  const seniorsParsed = parseInt(seniors) || 0;
  const foreignersParsed = parseInt(foreigners) || 0;
  
  const totalPersons =
  childrenParsed +
  adultsParsed +
  seniorsParsed +
  foreignersParsed;

    const dynamicTotal = useMemo(() => {
      if (!selectedActivity) return 0;
      if (totalPersons === 0) return 0;

      const rates = plans.basic.rates[selectedActivity];
      if (!rates) return 0;

      let total =
      (childrenParsed * rates.children) +
      (adultsParsed * rates.adults) +
      (seniorsParsed * rates.seniors) +
      (foreignersParsed * rates.foreigners);


      // Transporte
      if (selectedTransport) {
        const transport = dynamicOptions.transport.find(
          t => t.id === selectedTransport
        );
        if (transport) {
          total += transport.price * totalPersons;
        }
      }

      // Comidas
      selectedMeals.forEach(mealId => {
        const meal = dynamicOptions.meals.find(m => m.id === mealId);
        if (meal) {
          total += meal.price * totalPersons;
        }
      });


      // Guía
      if (selectedGuide) {
        const guide = dynamicOptions.guides.find(g => g.id === selectedGuide);
        if (guide) {
        total += guide.price;
        }
      }


      return total;

    }, [
        selectedActivity,
        childrenParsed,
        adultsParsed,
        seniorsParsed,
        foreignersParsed,
        selectedTransport,
        selectedMeals,
        selectedGuide,
        plans,
        totalPersons
      ]
    );

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
          <span className="text-gray-400 text-xs block mb-1">Destino</span>
          <span className="text-white font-semibold text-sm">
            PNN CHINGAZA
          </span>
        </div>
        <div className="bg-gray-700/50 border border-gray-600 p-2 rounded text-center">
          <span className="text-gray-400 text-xs block mb-1">Sendero</span>
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
            <p className="text-white font-bold text-lg">
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


      {/* Base incluido */}
      <div className="bg-green-500/10 border border-green-500 p-5 rounded mb-5">
        <p className="text-green-400 text-xl font-bold mb-3 text-center">
          ✅ INCLUIDO EN EL PLAN BASE
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-green-400 font-bold text-sm">✅ Entrada</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-green-400 font-bold text-sm">✅ Seguro</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-green-400 font-bold text-sm">✅ Guía Básico</p>
          </div>
        </div>
      </div>

      {/* Personaliza tu experiencia */}
      <div className="bg-blue-500/10 border border-blue-400 p-5 rounded mb-5">
        <p className="text-blue-400 text-xl font-bold mb-4 text-center">
          🎯 Personaliza tu Experiencia
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
                <p className="text-gray-400 text-xs">por persona</p>
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
                <p className="text-gray-400 text-xs">por persona</p>
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
                <p className="text-gray-400 text-xs">precio fijo</p>
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
                  <span className="text-gray-300">
                    🚐 {transport.label} x{totalPersons}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {formatPrice(transport.price * totalPersons)}
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
                  <span className="text-gray-300">
                    🍽️ {meal.label} x{totalPersons}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {formatPrice(meal.price * totalPersons)}
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
                  <span className="text-gray-300">
                    👨‍🏫 {guide.label}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {formatPrice(guide.price)}
                  </span>
                </div>
              ) : null;
            })()}

          </div>
        </div>
      )}

      {/* Total */}
      {totalPersons > 0 && (
        <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300 font-semibold">
                Total Plan Dinámico
              </p>
              <p className="text-gray-400 text-sm">
                {totalPersons} visitante{totalPersons !== 1 ? 's' : ''}
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
