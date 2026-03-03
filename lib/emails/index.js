/**
 * Punto de entrada único para todos los templates de email.
 * Cada correo tiene su propio archivo en esta carpeta para ver contenido y estilos de forma directa.
 */

export { formatPrice, formatVehicleCounts, generatePaymentConfirmationToken } from './shared';
export { generateClientEmail } from './client-reservation-received';
export { generateAdminEmail } from './admin-new-reservation';
export { generateRegistrationEmail } from './client-registration-link';
export { generateInvoiceEmail } from './client-invoice-confirmed';
export { generatePaymentInstructionsEmail } from './client-payment-instructions';
export { generateVisitorsConfirmationEmail } from './admin-visitors-registered';
export { generateVisitorsConfirmationEmailWithButton } from './admin-visitors-with-button';
