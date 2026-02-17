/**
 * Utilidades para manejo de fechas en zona horaria de Colombia (UTC-5)
 */

/**
 * Convierte una fecha string (YYYY-MM-DD) a objeto Date sin problemas de timezone
 * @param {string} dateString - Fecha en formato 'YYYY-MM-DD'
 * @returns {Date} Date objeto en zona horaria local
 */
export function parseColombianDate(dateString) {
  const [year, month, day] = dateString.split('-');
  // Crear fecha como local, no UTC
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

/**
 * Formatea una fecha para mostrar en Colombia
 * @param {string|Date} date - Fecha a formatear
 * @param {object} options - Opciones de formato
 * @returns {string} Fecha formateada
 */
export function formatDateColombian(date, options = {}) {
  const dateObj = typeof date === 'string' ? parseColombianDate(date) : date;
  return dateObj.toLocaleDateString('es-CO', options);
}

/**
 * Obtiene la fecha de hoy en Colombia (sin considerar hora)
 * @returns {Date} Fecha de hoy a las 00:00
 */
export function getTodayInColombia() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}
