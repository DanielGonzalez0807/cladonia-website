/**
 * Email al cliente: pago verificado, reserva 100% confirmada (factura/confirmación final).
 */
import { formatPrice } from './shared';
import { EmailHeader, EmailFooter } from './components';

export function generateInvoiceEmail(data) {
  const { nombre, apellido, rur, montoPagado, metodoPago, referenciaPago, fecha } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          ${EmailHeader({ title: '🎉 ¡Reserva Confirmada!', rur, theme: 'purple' })}

          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
                Hola <strong>${nombre} ${apellido}</strong>,
              </p>
              <p style="font-size: 14px; color: #6b7280; margin: 0 0 30px 0;">
                ¡Todo listo! Tu pago ha sido verificado y tu reserva está <strong>100% confirmada</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #8b5cf6; margin: 0 0 15px 0; font-size: 18px;">💳 Detalles de Pago</h3>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; width: 40%;">Monto Pagado:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${formatPrice(montoPagado)}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Método de Pago:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${metodoPago}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Referencia:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${referenciaPago}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Fecha de Actividad:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${new Date(fecha).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dcfce7; border-radius: 8px; border-left: 4px solid #10b981;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #15803d; margin: 0 0 10px 0; font-size: 16px;">📋 Próximos Pasos</h3>
                    <p style="color: #166534; margin: 0; font-size: 14px; line-height: 1.6;">
                      • Recibirás un recordatorio 48 horas antes de tu actividad<br>
                      • Revisa tu email para las instrucciones de llegada<br>
                      • Guarda tu código ${rur} para cualquier consulta<br>
                      • ¡Prepárate para una experiencia inolvidable!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${EmailFooter({ accentColor: '#8b5cf6' })}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
