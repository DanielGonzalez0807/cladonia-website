import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('activo', true)
        .order('fecha', { ascending: true })
        .limit(1);
      if (error) throw error;

      // Transformar datos para mantener compatibilidad
      const transformedEvents = data.map(event => ({
        id: event.id,
        title: event.titulo,
        date: event.fecha,
        totalCupos: event.total_cupos,
        cuposDisponibles: event.cupos_disponibles,
        description: event.descripcion,
        image: event.imagen,
        lugarPartida: event.lugar_partida,
        horaPartida: event.hora_partida,
        horaRegreso: event.hora_regreso,
        incluye: event.incluye || [],
        itinerarioDescripcion: event.itinerario_descripcion,
        precio: event.precio
      }));

      setEvents(transformedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return { events, loading, refetch: fetchEvents };
}
