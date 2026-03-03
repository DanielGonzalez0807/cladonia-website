/**
 * Re-exporta todos los templates de email desde lib/emails.
 * Los correos están separados por archivo en lib/emails/ para editar contenido y estilos de forma directa.
 */
export {
  formatPrice,
  formatVehicleCounts,
  generatePaymentConfirmationToken,
  generateClientEmail,
  generateAdminEmail,
  generateRegistrationEmail,
  generateInvoiceEmail,
  generateVisitorsConfirmationEmail,
} from './emails';
