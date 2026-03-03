/**
 * Re-exporta templates de email (flujo pago/visitantes) desde lib/emails.
 * Los correos están separados por archivo en lib/emails/ para editar contenido y estilos de forma directa.
 */
export {
  generateVisitorsConfirmationEmailWithButton,
  generatePaymentInstructionsEmail,
} from './emails';
