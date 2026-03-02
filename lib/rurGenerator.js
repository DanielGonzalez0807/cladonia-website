import { supabase } from './supabase';

/**
 * Genera el código RUR (Registro Único de Reserva)
 * Formato: RUR-EESSAAMMDD###
 * - EE: Experiencia (01 = Chingaza)
 * - SS: Sendero (01-07)
 * - AAMMDD: Fecha de creación (año, mes, día)
 * - ###: Consecutivo de reservas (001-999)
 */
export async function generateRUR(selectedActivity) {
  try {
    // 1. Experiencia (siempre 01 para Chingaza)
    const experiencia = '01';

    // 2. Sendero - extraer número del value (sendero_1 -> 01, sendero_7 -> 07)
    const senderoMatch = selectedActivity.match(/sendero_(\d+)/);
    const senderoNum = senderoMatch ? senderoMatch[1].padStart(2, '0') : '00';

    // 3. Fecha actual (AAMMDD)
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Últimos 2 dígitos del año
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const fecha = `${year}${month}${day}`;

    // 4. Obtener el consecutivo total (desde siempre)
    const { count, error } = await supabase
      .from('reservas')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    const consecutivo = ((count || 0) + 1).toString().padStart(3, '0');

    // 5. Construir RUR completo
    const rur = `RUR-${experiencia}${senderoNum}${fecha}${consecutivo}`;

    return rur;
  } catch (error) {
    console.error('Error generando RUR:', error);
    throw error;
  }
}

/**
 * Valida si un RUR ya existe en la base de datos
 */
export async function validateRUR(rur) {
  const { data, error } = await supabase
    .from('reservas')
    .select('id')
    .eq('rur', rur)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no encontrado
    throw error;
  }

  return !data; // Retorna true si NO existe (es válido)
}
