/**
 * Email al admin: nueva reserva recibida, con botón "Atender reserva".
 * Reutiliza el HTML del email al cliente y añade el bloque de acción.
 */
import { generateClientEmail } from './client-reservation-received';
import { EmailButton } from './components';

export function generateAdminEmail(data) {
  const clientEmail = generateClientEmail(data);
  const { rur } = data;

  const crypto = require('crypto');
  const token = crypto
    .createHash('sha256')
    .update(`${rur}-${process.env.ADMIN_SECRET || 'default-secret'}`)
    .digest('hex');

  const atenderUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/atender-reserva?rur=${encodeURIComponent(rur)}&token=${token}`;

  const adminContent = clientEmail
    .replace('¡Reserva Confirmada!', 'Nueva Reserva Recibida')
    .replace(`Hola <strong>${data.nombre} ${data.apellido}</strong>,`, `<strong>Cliente:</strong> ${data.nombre} ${data.apellido}<br><strong>Email:</strong> ${data.email}<br><strong>Teléfono:</strong> ${data.telefono}`);

  const buttonHTML = EmailButton({
    title: '👉 Acción Requerida',
    description: 'Haz clic en el botón para atender esta reserva y enviar el link de registro al cliente.',
    buttonText: '✅ Atender Reserva',
    href: atenderUrl,
    theme: 'green',
    hint: 'Esto cambiará el estado a "atendida" y enviará el email de registro al cliente.',
  });

  return adminContent.replace('<!-- Footer -->', buttonHTML + '<!-- Footer -->');
}
