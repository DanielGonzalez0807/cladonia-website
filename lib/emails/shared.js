/**
 * Utilidades compartidas para todos los templates de email.
 */

export function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);
}

export function formatVehicleCounts(vc = {}) {
  if (!vc) return 'Ninguno';
  const parts = [];
  if (vc.car && vc.car > 0) parts.push(`${vc.car} automóvil(es)`);
  if (vc.minibus && vc.minibus > 0) parts.push(`${vc.minibus} microbus(es)`);
  if (vc.bus && vc.bus > 0) parts.push(`${vc.bus} bus(es)`);
  return parts.join(', ') || 'Ninguno';
}

export function generatePaymentConfirmationToken(rur, secret) {
  const crypto = require('crypto');
  return crypto
    .createHash('sha256')
    .update(`${rur}-payment-${secret}`)
    .digest('hex');
}
