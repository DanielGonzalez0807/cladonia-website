/**
 * Email al cliente: reserva atendida + link para registrar acompañantes.
 */
import { formatPrice } from './shared';
import { EmailHeader, EmailFooter, EmailButton } from './components';

export function generateRegistrationEmail(data) {
  const { nombre, apellido, rur, linkRegistro, total } = data;

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
          
          ${EmailHeader({ title: '✅ Reserva Atendida', rur, theme: 'green' })}

          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
                Hola <strong>${nombre} ${apellido}</strong>,
              </p>
              <p style="font-size: 14px; color: #6b7280; margin: 0 0 30px 0;">
                ¡Excelentes noticias! Tu reserva ha sido atendida y estamos listos para el siguiente paso.
              </p>
            </td>
          </tr>

          ${EmailButton({
    title: '📝 Completa tu Registro',
    description: 'Haz clic en el botón para registrar los datos de todos los acompañantes',
    buttonText: 'Registrar Acompañantes',
    href: linkRegistro,
    theme: 'yellow',
  })}

          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">💳 Información de Pago</h3>
                    <p style="color: #1e3a8a; margin: 0; font-size: 14px; line-height: 1.6;">
                      <strong>Total a pagar:</strong> ${formatPrice(total)}<br>
                      <strong>Métodos de pago:</strong> Transferencia bancaria, Nequi, Daviplata<br><br>
                      Los detalles completos de pago te serán enviados después de completar el registro.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${EmailFooter({ accentColor: '#EAB308' })}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
