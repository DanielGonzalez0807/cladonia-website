'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { formatDateColombian } from '@/lib/dateUtils';

export default function TopPlan({ 
  plans, 
  activities, 
  selectedActivity, 
  topPlanDates, 
  selectedTopDate, 
  setSelectedTopDate, 
  calculation, 
  formatPrice, 
  watch 
}) {
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar fechas desde Supabase cuando cambia el sendero
  useEffect(() => {
    if (!selectedActivity) return;

    const cargarFechas = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('fechas_programadas_top')
          .select('*')
          .eq('sendero_id', selectedActivity)
          .eq('activo', true)
          .gt('cupos_disponibles', 0)
          .order('fecha', { ascending: true });

        if (error) throw error;

        // Formatear datos para el componente
        const fechasFormateadas = data.map(f => ({
          id: f.id,
          date: f.fecha,
          cupos: f.cupos_totales,
          disponibles: f.cupos_disponibles
        }));

        setFechasDisponibles(fechasFormateadas);
      } catch (error) {
        console.error('Error al cargar fechas:', error);
        // Fallback a datos locales si falla
        setFechasDisponibles(topPlanDates[selectedActivity] || []);
      } finally {
        setLoading(false);
      }
    };

    cargarFechas();
  }, [selectedActivity, topPlanDates]);

  return (
    <div className="mt-6 p-6 bg-gray-800/60 border-2 border-yellow-400 rounded-xl">
      {/* Header con nombre, slogan y fecha */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h4 className="text-3xl font-bold text-white">{plans.top.name}</h4>
          <p className="text-yellow-400 text-xl font-bold">{plans.top.subtitle}</p>
        </div>
        <div className="text-right bg-gray-700/50 border border-gray-600 px-3 py-2 rounded">
          <p className="text-yellow-400 font-bold text-xs mb-1">Fecha seleccionada</p>
          <p className="text-white font-bold text-base">
            {selectedTopDate ? formatDateColombian(selectedTopDate) : 'No seleccionada'}
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

      {/* Fechas disponibles */}
      {selectedActivity && fechasDisponibles.length > 0 && (
        <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5">
          <p className="text-white font-semibold mb-3">
            {loading ? 'Cargando fechas...' : 'Fechas disponibles para este sendero'}
          </p>
          <div className="flex w-full justify-between gap-4">
            {fechasDisponibles.map((dateInfo, index) => (
              <div 
                key={dateInfo.id || index}
                onClick={() => setSelectedTopDate(dateInfo.date)}
                className={`w-full bg-gray-800/60 border-2 p-4 rounded cursor-pointer hover:border-yellow-400 transition-colors ${
                  selectedTopDate === dateInfo.date ? 'border-yellow-400' : 'border-gray-600'
                }`}
              >
                <p className="text-yellow-400 font-bold text-sm text-center">
                  {formatDateColombian(dateInfo.date, { day: '2-digit', month: 'short' })}
                </p>
                <p className="text-white font-bold text-lg text-center">
                  {dateInfo.disponibles}/{dateInfo.cupos}
                </p>
                <p className="text-white-400 text-s text-center">Cupos</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{width: `${(dateInfo.disponibles / dateInfo.cupos) * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Todo incluido */}
      <div className="bg-green-500/10 border border-green-500 p-5 rounded mb-5">
        <p className="text-green-400 text-2xl font-bold mt-2 mb-2 text-center">✅ TODO INCLUIDO - Inmersión Total</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-800/60 border border-gray-600 p-4 rounded text-center">
            <p className="text-green-400 font-bold text-sm">✅ Entrada</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-4 rounded text-center">
            <p className="text-green-400 font-bold text-sm">✅ Seguro</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-4 rounded text-center">
            <p className="text-green-400 font-bold text-sm">✅ Transporte</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-4 rounded text-center">
            <p className="text-green-400 font-bold text-sm">✅ Refrigerio</p>
          </div>
        </div>
        <p className="text-white-300 text-sm text-center mt-4 mb-2">No te preocupes por nada, nosotros nos encargamos de todo</p>
      </div>

      {/* Precio por persona */}
      <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5 text-center">
        <p className="text-yellow-400 font-bold text-sm mb-2">Precio por persona (Todo incluido)</p>
        <p className="text-white font-bold text-3xl">{formatPrice(plans.top.prices[selectedActivity])}</p>

        <p className="text-white-400 text-xs mt-1">Mismo precio para todos los visitantes</p>
      </div>

      {/* Total */}
      {calculation && (
        <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300 font-semibold">Total Plan Top</p>
              <p className="text-gray-400 text-sm">{calculation.totalPersons} visitante{calculation.totalPersons !== 1 ? 's' : ''}</p>
            </div>
            <p className="text-yellow-400 font-bold text-4xl">{formatPrice(calculation.total)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
