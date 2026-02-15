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
  currentPrices, 
  formatPrice, 
  watch,
  onOptionsChange
}) {
  const [includeTransport, setIncludeTransport] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Notificar cambios al componente padre
  useEffect(() => {
    if (onOptionsChange) {
      onOptionsChange({
        includeTransport,
        selectedMeals,
        selectedGuide
      });
    }
  }, [includeTransport, selectedMeals, selectedGuide, onOptionsChange]);

  const toggleMeal = (mealId) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) ? prev.filter(id => id !== mealId) : [...prev, mealId]
    );
  };

  const totalPersons = (parseInt(childrenCount) || 0) + (parseInt(adults) || 0) + (parseInt(seniors) || 0) + (parseInt(foreigners) || 0);
  
  const dynamicTotal = useMemo(() => {
    if (totalPersons === 0) return 0;
    
    let total = currentPrices[selectedPlan] * totalPersons;
    
    if (includeTransport) {
      total += dynamicOptions.transport.price * totalPersons;
    }
    
    selectedMeals.forEach(mealId => {
      const meal = dynamicOptions.meals.find(m => m.id === mealId);
      if (meal) total += meal.price * totalPersons;
    });
    
    if (selectedGuide) {
      const guide = dynamicOptions.guides.find(g => g.id === selectedGuide);
      if (guide) total += guide.price;
    }
    
    return total;
  }, [currentPrices, selectedPlan, totalPersons, includeTransport, selectedMeals, selectedGuide]);

  return (
    <div className="mt-6 p-6 bg-gray-800/60 border-2 border-yellow-400 rounded-xl">
      {/* Header con nombre, slogan y fecha */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h4 className="text-3xl font-bold text-white">{plans[selectedPlan].name}</h4>
          <p className="text-yellow-400 text-xl font-bold">{plans[selectedPlan].subtitle}</p>
        </div>
        <div className="text-right bg-gray-700/50 border border-gray-600 px-3 py-2 rounded">
          <p className="text-yellow-400 font-bold text-xs mb-1">Fecha</p>
          <p className="text-white font-bold text-base">
            {watch('date') ? new Date(watch('date')).toLocaleDateString('es-CO') : 'No seleccionada'}
          </p>
        </div>
      </div>

      {/* Destino y Sendero */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-gray-700/50 border border-gray-600 p-2 rounded text-center">
          <span className="text-gray-400 text-xs block mb-1">Destino</span>
          <span className="text-white font-semibold text-sm">PNN CHINGAZA</span>
        </div>
        <div className="bg-gray-700/50 border border-gray-600 p-2 rounded text-center">
          <span className="text-gray-400 text-xs block mb-1">Sendero</span>
          <span className="text-white font-semibold text-sm">
            {activities['PNN CHINGAZA'].find(a => a.value === selectedActivity)?.label}
          </span>
        </div>
      </div>

      {/* Base incluido */}
      <div className="bg-green-500/10 border border-green-500 p-5 rounded mb-5">
        <p className="text-green-400 text-xl font-bold mb-3 text-center">✅ INCLUIDO EN EL PLAN BASE</p>
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

      {/* Precio base por persona */}
      <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5 text-center">
        <p className="text-yellow-400 font-bold text-sm mb-2">Precio base por persona</p>
        <p className="text-white font-bold text-3xl">{formatPrice(currentPrices[selectedPlan])}</p>
        <p className="text-gray-300 text-xs mt-1">{totalPersons} visitante{totalPersons !== 1 ? 's' : ''} = {formatPrice(currentPrices[selectedPlan] * totalPersons)}</p>
      </div>

      {/* Personaliza tu experiencia */}
      <div className="bg-blue-500/10 border border-blue-400 p-5 rounded mb-5">
        <p className="text-blue-400 text-xl font-bold mb-4 text-center">🎯 Personaliza tu Experiencia</p>
        
        {/* Transporte */}
        <div className="mb-4">
          <div 
            onClick={() => setIncludeTransport(!includeTransport)}
            className={`bg-gray-800/60 border-2 p-4 rounded cursor-pointer hover:border-blue-400 transition-colors ${
              includeTransport ? 'border-blue-400' : 'border-gray-600'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-bold text-base">{includeTransport ? '✅' : '⬜'} {dynamicOptions.transport.label}</p>
                <p className="text-gray-300 text-xs">{dynamicOptions.transport.description}</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold text-lg">{formatPrice(dynamicOptions.transport.price)}</p>
                <p className="text-gray-400 text-xs">por persona</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comidas */}
        <div className="mb-4">
          <p className="text-white font-semibold mb-2">Alimentación (puedes seleccionar varias)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dynamicOptions.meals.map(meal => (
              <div 
                key={meal.id}
                onClick={() => toggleMeal(meal.id)}
                className={`bg-gray-800/60 border-2 p-3 rounded cursor-pointer hover:border-blue-400 transition-colors ${
                  selectedMeals.includes(meal.id) ? 'border-blue-400' : 'border-gray-600'
                }`}
              >
                <p className="text-white font-bold text-sm mb-1">{selectedMeals.includes(meal.id) ? '✅' : '⬜'} {meal.label}</p>
                <p className="text-yellow-400 font-bold text-base">{formatPrice(meal.price)}</p>
                <p className="text-gray-400 text-xs">por persona</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guías especializados */}
        <div>
          <p className="text-white font-semibold mb-2">Guía Especializado (opcional)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dynamicOptions.guides.map(guide => (
              <div 
                key={guide.id}
                onClick={() => setSelectedGuide(selectedGuide === guide.id ? null : guide.id)}
                className={`bg-gray-800/60 border-2 p-3 rounded cursor-pointer hover:border-blue-400 transition-colors ${
                  selectedGuide === guide.id ? 'border-blue-400' : 'border-gray-600'
                }`}
              >
                <p className="text-white font-bold text-sm mb-1">{selectedGuide === guide.id ? '✅' : '⬜'} {guide.label}</p>
                <p className="text-yellow-400 font-bold text-base">{formatPrice(guide.price)}</p>
                <p className="text-gray-400 text-xs">precio fijo</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen de extras */}
      {(includeTransport || selectedMeals.length > 0 || selectedGuide) && (
        <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5">
          <p className="text-white font-semibold mb-3">Servicios adicionales seleccionados</p>
          <div className="space-y-2">
            {includeTransport && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">🚐 Transporte x{totalPersons}</span>
                <span className="text-yellow-400 font-bold">{formatPrice(dynamicOptions.transport.price * totalPersons)}</span>
              </div>
            )}
            {selectedMeals.map(mealId => {
              const meal = dynamicOptions.meals.find(m => m.id === mealId);
              return meal ? (
                <div key={mealId} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">🍽️ {meal.label} x{totalPersons}</span>
                  <span className="text-yellow-400 font-bold">{formatPrice(meal.price * totalPersons)}</span>
                </div>
              ) : null;
            })}
            {selectedGuide && (() => {
              const guide = dynamicOptions.guides.find(g => g.id === selectedGuide);
              return guide ? (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">👨‍🏫 {guide.label}</span>
                  <span className="text-yellow-400 font-bold">{formatPrice(guide.price)}</span>
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
              <p className="text-gray-300 font-semibold">Total Plan Dinámico</p>
              <p className="text-gray-400 text-sm">{totalPersons} visitante{totalPersons !== 1 ? 's' : ''}</p>
            </div>
            <p className="text-yellow-400 font-bold text-4xl">{formatPrice(dynamicTotal)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
