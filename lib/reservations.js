import { supabase } from '@/lib/supabase';

/**
 * Guarda una reserva completa en Supabase según el plan seleccionado
 */
export async function saveReservation(formData, planDetails) {
  const {
    name,
    lastname,
    tel,
    email,
    date,
    children,
    adults,
    seniors,
    foreigners,
    description,
    selectedDestination,
    selectedActivity,
    selectedPlan,
    totalPrice,
    totalPersons
  } = formData;

  try {
    // 1. Insertar reserva principal
    const { data: reserva, error: reservaError } = await supabase
      .from('reservas')
      .insert([{
        nombre: name,
        apellido: lastname,
        telefono: tel,
        email: email,
        destino: selectedDestination,
        sendero_id: selectedActivity,
        plan_id: selectedPlan,
        fecha: date,
        estudiantes: parseInt(children) || 0,
        adultos: parseInt(adults) || 0,
        exentos: parseInt(seniors) || 0,
        extranjeros: parseInt(foreigners) || 0,
        total_personas: totalPersons,
        total_precio: totalPrice,
        observaciones: description || null,
        estado: 'pendiente'
      }])
      .select()
      .single();

    if (reservaError) throw reservaError;

    // 2. Guardar detalles específicos según el plan
    if (selectedPlan === 'basic') {
      await saveBasicPlanDetails(reserva.id, planDetails);
    } else if (selectedPlan === 'top') {
      await saveTopPlanDetails(reserva.id, planDetails);
    } else if (selectedPlan === 'dynamic') {
      await saveDynamicPlanDetails(reserva.id, planDetails);
    }

    return { success: true, reserva };
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || 'Error desconocido';
    console.error('Error al guardar reserva:', errorMessage);
    console.error('Error completo:', error);
    return { success: false, error: errorMessage };
  }
}

/**
 * Guarda detalles del Plan Básico
 */
async function saveBasicPlanDetails(reservaId, details) {
  const {
    vehicleCounts,
    costoEntradas,
    costoPolizas,
    costoGuia,
    costoVehiculos
  } = details;

  const { error } = await supabase
    .from('reservas_plan_basico')
    .insert([{
      reserva_id: reservaId,
      automoviles: vehicleCounts.car || 0,
      microbuses: vehicleCounts.minibus || 0,
      buses: vehicleCounts.bus || 0,
      costo_entradas: costoEntradas,
      costo_polizas: costoPolizas,
      costo_guia: costoGuia,
      costo_vehiculos: costoVehiculos
    }]);

  if (error) throw error;
}

/**
 * Guarda detalles del Plan Top y actualiza cupos
 */
async function saveTopPlanDetails(reservaId, details) {
  const { fechaProgramadaId, totalPersonas } = details;

  // 1. Obtener la fecha programada
  const { data: fechaProgramada, error: fetchError } = await supabase
    .from('fechas_programadas_top')
    .select('*')
    .eq('id', fechaProgramadaId)
    .single();

  if (fetchError) throw fetchError;

  // 2. Verificar cupos disponibles
  if (fechaProgramada.cupos_disponibles < totalPersonas) {
    throw new Error(`No hay suficientes cupos disponibles. Disponibles: ${fechaProgramada.cupos_disponibles}, Solicitados: ${totalPersonas}`);
  }

  // 3. Guardar relación con fecha programada
  const { error: insertError } = await supabase
    .from('reservas_plan_top')
    .insert([{
      reserva_id: reservaId,
      fecha_programada_id: fechaProgramadaId
    }]);

  if (insertError) throw insertError;

  // 4. Actualizar cupos disponibles
  const nuevosCupos = fechaProgramada.cupos_disponibles - totalPersonas;
  
  const { error: updateError } = await supabase
    .from('fechas_programadas_top')
    .update({
      cupos_disponibles: nuevosCupos
    })
    .eq('id', fechaProgramadaId);

  if (updateError) throw updateError;
}

/**
 * Guarda detalles del Plan Dinámico con opciones adicionales
 */
async function saveDynamicPlanDetails(reservaId, details) {
  const { precioBase, opcionesSeleccionadas } = details;

  // 1. Guardar registro del plan dinámico
  const { data: planDinamico, error: planError } = await supabase
    .from('reservas_plan_dinamico')
    .insert([{
      reserva_id: reservaId,
      precio_base: precioBase
    }])
    .select()
    .single();

  if (planError) throw planError;

  // 2. Guardar opciones adicionales si existen
  if (opcionesSeleccionadas && opcionesSeleccionadas.length > 0) {
    const opcionesData = opcionesSeleccionadas.map(opcion => ({
      reserva_dinamico_id: planDinamico.id,
      opcion_id: opcion.id,
      cantidad: opcion.cantidad,
      precio_unitario: opcion.precioUnitario,
      precio_total: opcion.precioTotal
    }));

    const { error: opcionesError } = await supabase
      .from('reservas_opciones_dinamicas')
      .insert(opcionesData);

    if (opcionesError) throw opcionesError;
  }
}

/**
 * Obtiene el ID de una fecha programada
 */
export async function getFechaProgramadaId(senderoId, fecha) {
  // Convertir fecha a formato YYYY-MM-DD si es necesario
  let fechaFormateada = fecha;
  if (fecha instanceof Date) {
    fechaFormateada = fecha.toISOString().split('T')[0];
  }
  
  const { data, error } = await supabase
    .from('fechas_programadas_top')
    .select('*')
    .eq('sendero_id', senderoId)
    .eq('fecha', fechaFormateada)
    .single();

  if (error) {
    console.error('Error al buscar fecha programada:', error);
    throw new Error(`No se encontró la fecha programada: ${error.message || JSON.stringify(error)}`);
  }
  
  if (!data) {
    throw new Error('No se encontró la fecha programada para este sendero');
  }
  
  return data.id;
}

/**
 * Obtiene fechas programadas con cupos disponibles
 */
export async function getFechasProgramadas(senderoId) {
  const { data, error } = await supabase
    .from('fechas_programadas_top')
    .select('*')
    .eq('sendero_id', senderoId)
    .eq('activo', true)
    .gt('cupos_disponibles', 0)
    .order('fecha', { ascending: true });

  if (error) throw error;
  return data;
}
